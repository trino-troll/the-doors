'use server';

import { prisma } from '@/lib/prisma';
import { routes } from '@/shared/const';
import { User } from '@/shared/type';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
    return await prisma.user.findMany();
}

export async function createUser({
    name,
    phone,
    email,
    password,
    role,
    nickName,
}: {
    name: string;
    phone: string | null;
    email: string;
    password: string;
    role: 'GOOD' | 'USER';
    nickName: string | null;
}) {
    if (!name || !email || !password) return;

    await prisma.user.create({
        data: { name, phone, email, password, role, nickName },
    });

    revalidatePath(routes.FOR_GOOD);
}

export async function editUser({ user }: { user: User }) {
    try {
        const editUser = await prisma.user.findFirst({
            where: { id: user.id },
        });
        if (!editUser) {
            console.log(
                `Не удалось найти пользователя с почтой ${user.email} и именем ${user.name}`,
            );
            throw new Error('Не удалось найти пользователя');
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: user.password,
                role: user.role,
                nickName: user.nickName,
            },
        });

        revalidatePath(routes.FOR_GOOD);
    } catch (err) {
        throw new Error('Не удалось обновить пользователя' + err);
    }
}

export async function deleteUser({ id }: { id: string }) {
    try {
        const findUser = prisma.user.findFirst({ where: { id } });

        if (!findUser) {
            throw new Error('Не удалось найти пользователя');
        }

        await prisma.user.delete({ where: { id } });
        revalidatePath(routes.FOR_GOOD);
    } catch (err) {
        throw new Error('Не удалось удалить пользователя' + err);
    }
}

export async function getNameUser() {
    return await prisma.user.findMany({ select: { nickName: true } });
}

export async function getIpUsers() {
    return prisma.ipRateLimit.findMany();
}

//Заготовка для ручной блокировки IP
export async function blockOneIP({
    ip,
    manual,
}: {
    ip: string;
    manual: boolean;
}) {
    if (!ip) return { success: false, message: 'IP не указан!' };

    const recordIp = await prisma.ipRateLimit.findMany({
        where: { ip },
    });

    if (recordIp.length === 0)
        return { success: false, message: `Нет записей для IP ${ip}` };

    await prisma.ipRateLimit.updateMany({
        where: { ip },
        data: { manual_locking: manual },
    });

    revalidatePath('/for-good');
    return { success: true, message: `IP ${ip} заблокирован` };
}

// Имя IP.
export async function editNameIP({ name, ip }: { name: string; ip: string }) {
    if (!name || !ip) {
        console.log(
            new Date().toLocaleString(),
            'Ошибка редактирования имени IP. Имя ',
            name,
            'IP ',
            ip,
        );
        return {
            success: false,
            error: `Что-то отсутствует! Имя = ${name}, ip = ${ip}`,
        };
    }

    try {
        const records = await prisma.ipRateLimit.findMany({ where: { ip } });

        if (records.length === 0) {
            console.log(
                new Date().toLocaleString(),
                'Не удалось найти запись по IP для редактирования имени. IP = ',
                ip,
            );
            return {
                success: false,
                error: 'Не удалось найти запись для редактирования',
            };
        }

        await prisma.ipRateLimit.updateMany({
            where: { ip },
            data: { client_name: name },
        });
        revalidatePath('/for-good');
    } catch (error) {
        return {
            success: false,
            error: error,
        };
    }
}
