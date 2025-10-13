import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const filters = Object.fromEntries(searchParams.entries());

        const doors = await prisma.door.findMany({
            where: buildWhereClause(filters),
            take: 50,
        });

        return NextResponse.json(doors);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch doors' },
            { status: 500 }
        );
    }
}

function buildWhereClause(filters: Record<string, string>) {
    const where: any = {};

    // Поиск по имени (основной)
    if (filters.name) {
        where.name = { contains: filters.name, mode: 'insensitive' };
    }

    // Остальные фильтры
    if (filters.color) {
        where.color = { contains: filters.color, mode: 'insensitive' };
    }

    if (filters.size) {
        where.size = { contains: filters.size, mode: 'insensitive' };
    }

    if (filters.opening) {
        where.opening = filters.opening;
    }

    if (filters.protivosem !== undefined) {
        where.protivosem = filters.protivosem === 'true';
    }

    if (filters.porog !== undefined) {
        where.porog = filters.porog === 'true';
    }

    if (filters.innerPanelColor) {
        where.innerPanelColor = {
            contains: filters.innerPanelColor,
            mode: 'insensitive',
        };
    }

    return where;
}
