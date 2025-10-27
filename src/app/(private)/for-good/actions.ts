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
}: {
    name: string;
    phone: string | null;
    email: string;
    password: string;
    role: 'GOOD' | 'USER';
}) {
    if (!name || !email || !password) return;

    await prisma.user.create({
        data: { name, phone, email, password, role },
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
                `Не удалось найти пользователя с почтой ${user.email} и именем ${user.name}`
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
