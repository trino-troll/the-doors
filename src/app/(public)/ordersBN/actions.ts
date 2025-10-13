'use server';

import { prisma } from '@/lib/prisma';
import { routes } from '@/shared/const';
import { revalidatePath } from 'next/cache';
import { OrderBN } from '@/shared/type';

export async function addOrderBN({
    name,
    orderNumber,
    in1C,
}: {
    name: string;
    orderNumber?: string;
    in1C: boolean;
}) {
    if (!name) return;

    await prisma.orderBN.create({ data: { name, orderNumber, in1C } });
    revalidatePath(routes.ORDER_BN);
}

export async function getOrderBN() {
    return prisma.orderBN.findMany();
}

export async function editOrderBN({ orderBN }: { orderBN: OrderBN }) {
    if (!orderBN) return;

    try {
        const record = prisma.orderBN.findFirst({ where: { id: orderBN.id } });
        if (!record) {
            throw new Error('Не удалось найти заказ БН для редактирования');
        }

        await prisma.orderBN.update({
            where: { id: orderBN.id },
            data: {
                name: orderBN.name,
                orderNumber: orderBN.orderNumber,
                in1C: orderBN.in1C,
            },
        });
        revalidatePath(routes.ORDER_BN);
    } catch (error) {
        console.log('Ошибка редактирования заказа БН');
        throw new Error('Ошибка редактирования заказа БН');
    }
}

export async function deleteOrderBN({ id }: { id: string }) {
    try {
        const record = await prisma.orderBN.findFirst({ where: { id } });
        if (!record) throw new Error('Не удалось найти запись для удаления');

        await prisma.orderBN.delete({ where: { id } });
        revalidatePath(routes.ORDER_BN);
    } catch (error) {
        console.log(`Не удалось удалить запись ${id}`);
        throw new Error('Ошибка удаления заказа БН');
    }
}
