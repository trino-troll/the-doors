'use server';

import { prisma } from '@/lib/prisma';

export async function getIncommingDoors() {
    return await prisma.door.findMany({ orderBy: { name: 'asc' } });
}
