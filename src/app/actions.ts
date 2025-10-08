'use server';
import { prisma } from '@/lib/prisma';
import { routes } from '@/shared/const';
import { Door } from '@/shared/type';
import { revalidatePath } from 'next/cache';

export async function countUp(id: string) {
    if (!id) return;
    await prisma.door.update({
        where: { id },
        data: { count: { increment: 1 } },
    });
    revalidatePath(routes.INCOMMING);
}

export async function countDown(id: string) {
    if (!id) return;
    await prisma.door.update({
        where: { id },
        data: { count: { decrement: 1 } },
    });
    revalidatePath(routes.INCOMMING);
}

export async function updateDoor(door: Door) {
    if (!door) return;
    await prisma.door.update({
        where: { id: door.id },
        data: {
            name: door.name,
            description: door.description,
            size: door.size,
            opening: door.opening,
            color: door.color,
            innerPanelColor: door.innerPanelColor,
            uplotnitel: door.uplotnitel,
            zamki: door.zamki,
            protivosem: door.protivosem,
            vneshPanel: door.vneshPanel,
            clouseBox: door.clouseBox,
            porog: door.porog,
            inner: door.inner,
            sizesDoor: door.sizesDoor,
        },
    });

    revalidatePath(routes.INCOMMING);
}

export async function deleteDoor(id: string) {
    if (!id) return;
    await prisma.door.delete({ where: { id } });

    revalidatePath(routes.INCOMMING);
}

export async function dropCountAll() {
    await prisma.door.updateMany({
        data: { count: 0 },
    });

    revalidatePath(routes.INCOMMING);
}

export async function getDoor({ id }: { id: string }) {
    if (!id) return;

    return await prisma.door.findFirst({ where: { id } });
}

export async function askHuggingFace(question: string) {
    try {
        const response = await fetch(
            'https://router.huggingface.co/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'moonshotai/Kimi-K2-Instruct-0905',
                    messages: [
                        {
                            role: 'user',
                            content: question,
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const completion = await response.json();
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
