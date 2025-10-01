'use server';

import { prisma } from '@/lib/prisma';
import { routes } from '@/shared/const';
import { OrderInStock } from '@/shared/type';
import { revalidatePath } from 'next/cache';

export async function addOrder({
    numberOrder,
    shortDescription,
    fullDescription,
}: {
    numberOrder: string;
    shortDescription: string;
    fullDescription: string;
}) {
    await prisma.orderInStock.create({
        data: {
            numberOrder,
            shortDescription,
            fullDescription,
        },
    });

    revalidatePath(routes.ORDER_IN_STOCK);
}

export async function getOrdersInStock() {
    return await prisma.orderInStock.findMany({
        orderBy: { numberOrder: 'desc' },
    });
}

export async function updateOrderInStock({ order }: { order: OrderInStock }) {
    if (!order) return;

    const updatedOrder = await prisma.orderInStock.findFirst({
        where: { id: order.id },
    });

    if (!updatedOrder)
        throw new Error('Не удалось найти запись для обновления');

    const complet = order.statusInStock === 'DELIVERED';

    await prisma.orderInStock.update({
        where: { id: order.id },
        data: {
            numberOrder: order.numberOrder,
            shortDescription: order.shortDescription,
            fullDescription: order.fullDescription,
            url: order.url || [],
            completed: complet || order.completed,
            statusInStock: order.statusInStock,
        },
    });

    revalidatePath(routes.ORDER_IN_STOCK);
}
