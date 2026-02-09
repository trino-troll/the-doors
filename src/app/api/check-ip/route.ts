import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    if (ip === 'unknown') {
        return NextResponse.json({ blocked: true });
    }

    const blockedRecord = await prisma.ipRateLimit.findFirst({
        where: {
            ip,
            manual_locking: true,
        },
    });

    if (blockedRecord) {
        return NextResponse.json({ blocked: true });
    }

    return NextResponse.json({ allowed: false });
}
