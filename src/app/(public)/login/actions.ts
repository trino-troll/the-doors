'use server';

import { prisma } from '@/lib/prisma';
import { verifyPassword, hashPassword } from '@/lib/auth-utils';
import { generateToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { routes } from '@/shared/const';

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    try {
        if (!email || !password) {
            throw new Error('Заполните все поля');
        }

        // 1. Находим пользователя
        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            throw new Error('Нет такого пользователя');
        }

        // 2. Проверяем пароль
        let isPasswordValid = false;

        if (user.password.startsWith('$2b$')) {
            // Пароль уже хэширован
            isPasswordValid = await verifyPassword(password, user.password);
        } else {
            // Пароль в открытом виде
            isPasswordValid = user.password === password;

            // Хэшируем пароль при первом входе
            if (isPasswordValid) {
                const hashedPassword = await hashPassword(password);
                await prisma.user.update({
                    where: { id: user.id },
                    data: { password: hashedPassword },
                });
                console.log('Пароль захэширован для:', user.email);
            }
        }

        if (!isPasswordValid) {
            throw new Error('Пароль не верный');
        }

        // 3. Генерируем JWT токен
        const token = generateToken(user.id);

        // 4. Сохраняем токен в cookie
        const cookieStore = await cookies();
        cookieStore.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 дней
            path: '/',
        });

        // 5. Возвращаем данные пользователя (без пароля)
        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
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
