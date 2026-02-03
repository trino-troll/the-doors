'use server';

import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { routes } from '@/shared/const';
import { SendEmail } from '@/lib/mailer';
import { randomInt, randomBytes } from 'crypto';
import { getClientIP, normalizeIP } from '@/lib/ip-utils';
import { RateLimiter } from '@/lib/rate-limiter';

const LIMIT_TIME = 10 * 60 * 1000;

// генерация случайного пароля и запиь в бд
export async function verifyCode({ email }: { email: string }) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    //Получаю IP
    const rawIp = await getClientIP();
    const ip = normalizeIP(rawIp);

    //Проверка лимитов
    const limitCheck = await RateLimiter.check(ip, 'verify_code');

    if (!limitCheck.allowed) {
        console.log(
            normalDate(),
            'IP лимит verify_code',
            ip,
            'retryAfter:',
            limitCheck.retryAfter,
        );

        await new Promise((resolve) => setTimeout(resolve, 3000));
        return {
            success: false,
            message: 'Слишком много запросов. Попробуйте позже.',
        };
    }

    // Логируем если мало попыток осталось
    if (limitCheck.remaining && limitCheck.remaining < 2) {
        console.log(`⚠️ IP ${ip} осталось попыток: ${limitCheck.remaining}`);
    }

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
        console.log(normalDate(), 'Попытка войти по почте', email);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return { success: true, message: 'Код отправлен' };
    }

    const lastCode = await prisma.verifyCode.findFirst({
        where: {
            email,
            createdAt: {
                gt: new Date(Date.now() - LIMIT_TIME), // последние 10 минут
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    if (lastCode) {
        const leftTime = Math.ceil(
            (LIMIT_TIME - (Date.now() - lastCode.createdAt.getTime())) /
                1000 /
                60,
        );
        console.log(normalDate(), 'Попытка получения повторного когда ', email);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return {
            success: false,
            message: `Новый код можно запросить через ${leftTime} минут`,
        };
    }

    const code = randomInt(1000000000, 9999999999).toString(); // случайное число

    await prisma.verifyCode.create({
        data: {
            email,
            code,
            expiresAt: new Date(Date.now() + LIMIT_TIME),
            attempts: 0,
            used: false,
        },
    });

    const sendResult = await SendEmail({ email, code });
    console.log(
        normalDate(),
        `Отправлен новый код на почту ${email}`,
        sendResult,
    );
    return { success: true, message: 'Код отправлен на почту' };
}

export async function login({ email, code }: { email: string; code: string }) {
    try {
        // Получаем IP
        const rawIp = await getClientIP();
        const ip = normalizeIP(rawIp);

        // Проверяем лимиты на вход
        const limitCheck = await RateLimiter.check(ip, 'login_attempt');

        if (!limitCheck.allowed) {
            console.log(
                normalDate(),
                'IP лимит login_attempt:',
                ip,
                'retryAfter:',
                limitCheck.retryAfter,
            );

            await new Promise((resolve) => setTimeout(resolve, 5000));

            return {
                success: false,
                error: `Слишком много попыток входа. Подождите ${limitCheck.retryAfter} секунд`,
            };
        }

        if (!email || !code) {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            throw new Error('Не достаточно данных для входа');
        }

        const activeCode = await checkVerifyRecord({
            email,
            code,
            isAdmin: false,
        });

        if (activeCode && 'error' in activeCode) {
            return {
                success: false,
                error: activeCode.error,
            };
        }

        // 4. Если код верный
        return await createRecordAdminCode();
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Ошибка входа',
        };
    }
}

export async function logOut() {
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');
    redirect(routes.MAIN);
}

// админский код и почта пользователя
export async function verifyAdmin({
    adminCode,
    email,
}: {
    adminCode: string;
    email: string;
}) {
    const admin = await prisma.user.findFirst({ where: { role: 'GOOD' } });

    if (!admin) {
        return {
            success: false,
            error: 'Не удалось проверить код доступа',
        };
    }

    const activeCode = await checkVerifyRecord({
        email: admin.email,
        code: adminCode,
        isAdmin: true,
    });

    if (activeCode && 'error' in activeCode) {
        return {
            success: false,
            error: activeCode.error,
        };
    }

    //4 если код верный
    if (activeCode && 'id' in activeCode) {
        await prisma.verifyCode.update({
            where: { id: activeCode.id },
            data: {
                used: true,
            },
        });
    }

    // 5. Ищим пользователя
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
        console.log(
            normalDate(),
            'Не удалось найти пользователя с почтой ',
            email,
        );
        return { success: true, message: 'Код отправлен' };
    }

    // 6. Генерируем JWT токен
    const token = generateToken(user.id);

    // 7. Сохраняем токен в cookie
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 14 * 24 * 60 * 60, // 14 дней
        path: '/',
    });

    // 8 Удаление использованных и просроченных кодов
    await prisma.verifyCode.deleteMany({
        where: {
            email,
            OR: [{ used: true }, { expiresAt: { lt: new Date() } }],
        },
    });

    // 9. Возвращаем данные пользователя (без пароля)
    return {
        success: true,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
    };
}

// генерация пароля админа и отправка на почту
async function createRecordAdminCode() {
    const admin = await prisma.user.findFirst({ where: { role: 'GOOD' } });

    if (!admin)
        return {
            success: false,
            error: 'Не удалось отправить письмо. Попробуйте позже.',
        };
    // от 5 до 10 знаков
    const randomLength = Math.floor(Math.random() * 6) + 5;
    const adminCode = generateCodeAdmin(randomLength);

    await prisma.verifyCode.create({
        data: {
            email: admin.email,
            code: adminCode,
            expiresAt: new Date(Date.now() + LIMIT_TIME),
            attempts: 0,
            used: false,
        },
    });

    await SendEmail({ email: admin.email, code: adminCode });

    console.log(
        normalDate(),
        'Отправлено письмо на админскую почту для подтверждения входа пользователя',
        admin.email,
    );

    return { success: true, message: 'Письмо отправлено на админскую почту' };
}

// генерация случайного пароля длинной от 5 до 10 знаков
function generateCodeAdmin(length = 8) {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return randomBytes(length).reduce(
        (str, byte) => str + chars[byte % chars.length],
        '',
    );
}

function normalDate() {
    return new Date().toLocaleString();
}

// проверка записи в verifyCode на активный пароль для почты
async function checkVerifyRecord({
    email,
    code,
    isAdmin,
}: {
    email: string;
    code: string;
    isAdmin: boolean;
}) {
    const startTime = Date.now();

    //1. Находим последний пароль
    const activeCode = await prisma.verifyCode.findFirst({
        where: {
            email: email,
            expiresAt: { gt: new Date() },
            used: false,
            OR: [{ blockedUntil: null }, { blockedUntil: { lt: new Date() } }],
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const queryTime = Date.now() - startTime;
    if (queryTime > 100) {
        console.log('Медленный запрос', queryTime, 'для почты', email);
    }

    if (!activeCode) {
        return {
            success: false,
            error: 'Действительный код не найден. Запросите новый',
        };
    }

    // 2. Проверяю блокировку после неудачных попыток
    if (activeCode.blockedUntil && activeCode.blockedUntil > new Date()) {
        const minutesLeft = Math.ceil(
            (activeCode.blockedUntil.getTime() - Date.now()) / 1000 / 60,
        );
        console.log(normalDate(), 'Осталось до окончания блокировки ', email);
        throw new Error(
            `Слишком много попыток.\nПопробуй через ${minutesLeft} минут`,
        );
    }

    // 4. Проверка кода для админа
    if (activeCode.code !== code) {
        if (isAdmin) {
            await prisma.verifyCode.update({
                where: { id: activeCode.id },
                data: { used: true },
            });

            throw new Error('Админский код неверен. Запросите новый.');
        } else {
            const updatedCode = await prisma.verifyCode.update({
                where: { id: activeCode.id },
                data: {
                    attempts: { increment: 1 },
                    ...(activeCode.attempts + 1 >= 3
                        ? {
                              blockedUntil: new Date(Date.now() + LIMIT_TIME),
                              used: true,
                          }
                        : {}),
                },
            });

            const attemptsLeft = 3 - updatedCode.attempts;
            throw new Error(
                attemptsLeft > 0
                    ? `Неверный код. Осталось попыток: ${attemptsLeft}`
                    : 'Слишком много попыток. Запросите новый код.',
            );
        }
    }

    return activeCode;
}
