// lib/cron/cleanup-rate-limits.ts
import { prisma } from '@/lib/prisma';

export async function cleanupRateLimits() {
    try {
        // Удаляем записи старше 7 дней
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const deleted = await prisma.ipRateLimit.deleteMany({
            where: {
                createdAt: { lt: weekAgo },
            },
        });

        console.log(`🧹 Cleaned up ${deleted.count} old rate limit records`);

        return { success: true, deleted: deleted.count };
    } catch (error) {
        console.error('Cleanup rate limits error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

// Можно запускать по cron (например, каждый день в 3 ночи)
// Или добавить в API route для ручного запуска
