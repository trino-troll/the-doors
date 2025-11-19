import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import AddDoorModal from '@/components/incomming/AddDoorModal';

import { DropCountAll } from '@/components/incomming/drop-count-all';
import { TableDoors } from '@/components/incomming/table-doors';
import { Download } from 'lucide-react';
import { Button } from '@/shared/button';
import { getIncommingDoors } from './actions';

export const revalidate = 300;

async function createDoor(formData: FormData) {
    'use server';

    const name = String(formData.get('name') || '').trim();
    const description =
        String(formData.get('description') || '').trim() || null;
    const size = String(formData.get('size') || '').trim();
    const opening = String(formData.get('opening') || '').trim();
    const color = String(formData.get('color') || '').trim();
    const innerPanelColor = String(
        formData.get('innerPanelColor') || ''
    ).trim();

    if (!name || !size || !opening || !color || !innerPanelColor) {
        return;
    }

    await prisma.door.create({
        data: {
            name,
            description,
            size,
            opening: opening === 'LEFT' ? 'LEFT' : 'RIGHT',
            color,
            innerPanelColor,
            count: 1,
        },
    });

    revalidatePath('/');
}

export default async function IncommingPage() {
    const doors = await getIncommingDoors();
    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="flex gap-2 mb-3">
                <h1 className="text-lg md:text-xl font-semibold">
                    Двери в наличии на складе
                </h1>
                <AddDoorModal action={createDoor} />
                <DropCountAll />
                <form action="/incomming/export/xlsx" method="get">
                    <span className="block lg:hidden">
                        <Button variant="outline">
                            <Download size={14} />
                        </Button>
                    </span>
                    <span className="hidden lg:block">
                        <Button variant="outline">
                            <Download />
                        </Button>
                    </span>
                </form>
            </div>

            {doors === null ? (
                <p>Нет списка дверей</p>
            ) : (
                <TableDoors doors={doors} />
            )}
        </div>
    );
}
