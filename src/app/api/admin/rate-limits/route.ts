// app/api/admin/rate-limits/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        // Простая проверка авторизации
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            );
        }

        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        // Статистика за последние 24 часа
        const stats = await prisma.ipRateLimit.groupBy({
            by: ['action', 'ip'],
            where: {
                createdAt: { gt: dayAgo },
                count: { gt: 3 }, // Только подозрительные (> 3 попыток)
            },
            _sum: { count: true },
            _max: { updatedAt: true },
            orderBy: {
                _sum: { count: 'desc' },
            },
            take: 100,
        });

        // Топ IP нарушителей
        const topOffenders = await prisma.ipRateLimit.groupBy({
            by: ['ip'],
            where: {
                createdAt: { gt: dayAgo },
            },
            _sum: { count: true },
            having: {
                count: {
                    _sum: { gt: 20 }, // Более 20 запросов за день
                },
            },
        });

        return NextResponse.json({
            success: true,
            data: {
                stats: stats.map((s) => ({
                    ip: s.ip,
                    action: s.action,
                    attempts: s._sum.count,
                    lastAttempt: s._max.updatedAt,
                })),
                topOffenders: topOffenders.map((o) => ({
                    ip: o.ip,
                    totalAttempts: o._sum.count,
                })),
            },
        });
    } catch (error) {
        console.error('Rate limits admin error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 },
        );
    }
}
