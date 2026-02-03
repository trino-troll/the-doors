// app/api/admin/cleanup/route.ts
import { cleanupRateLimits } from '@/lib/cron/cleanup-rate-limit';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            );
        }

        const result = await cleanupRateLimits();

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Cleanup failed' },
            { status: 500 },
        );
    }
}
