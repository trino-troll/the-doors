'use server';
import { prisma } from '@/lib/prisma';
import { routes } from '@/shared/const';
import { IncommingDoor } from '@/shared/type';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';

export async function createNewInfoIncDoor({ name }: { name: string }) {
    if (!name) throw new Error('Нет названия двери');

    try {
        await prisma.infoIncommingDoor.create({ data: { name } });

        revalidatePath(routes.INFO_INCOMMING_ADD);
    } catch (err) {
        console.log(err);
    }
}

// получение конкретной информации по двери
export async function getInfoIncommingDoor({ id }: { id: string }) {
    'use cache';
    cacheTag(`infoIncommingDoor-${id}`);
    if (!id) return;

    const info = await prisma.infoIncommingDoor.findFirst({ where: { id } });
    if (!info) {
        console.log(
            new Date().toLocaleString(),
            'Запрос несуществующей двери',
            id,
        );
        return;
    }
    return info;
}

// Редактирование справочной информации о двери
export async function editInfoIncommingDoor({ door }: { door: IncommingDoor }) {
    if (!door) return;

    await prisma.infoIncommingDoor.update({
        where: { id: door.id },
        data: { ...door },
    });
    console.log(
        new Date().toLocaleString(),
        'Обновление записи справочной информации',
        door.name,
    );
    revalidateTag(`infoIncommingDoor-${door.id}`);
}
