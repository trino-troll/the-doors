import { prisma } from '@/lib/prisma';
export type RateLimitAction = 'verify_code' | 'login_attempt' | 'admin_verify';

export class RateLimiter {
    private static readonly limits = {
        verify_code: { max: 5, windowMs: 60 * 60 * 1000 }, // 5 в час
        login_attempt: { max: 10, windowMs: 15 * 60 * 1000 }, // 10 в 15 мин
        admin_verify: { max: 3, windowMs: 60 * 60 * 1000 }, // 3 в час
    } as const;

    static async check(
        ip: string,
        action: RateLimitAction,
    ): Promise<{ allowed: boolean; retryAfter?: number; remaining?: number }> {
        if (ip === 'unknown') return { allowed: true, remaining: Infinity };

        const limit = this.limits[action];
        const windowStart = new Date(Date.now() - limit.windowMs);

        try {
            await prisma.ipRateLimit.deleteMany({
                where: {
                    ip,
                    action,
                    createdAt: { lt: windowStart },
                },
            });

            const record = await prisma.ipRateLimit.upsert({
                where: { ip_action: { ip, action } },
                create: {
                    ip,
                    action,
                    count: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                update: {
                    count: { increment: 1 },
                    updatedAt: new Date(),
                },
            });

            if (record.count > limit.max) {
                const oldest = await prisma.ipRateLimit.findFirst({
                    where: { ip, action, createdAt: { gte: windowStart } },
                    orderBy: { createdAt: 'asc' },
                    select: { createdAt: true },
                });
                if (oldest) {
                    const retryAfter = Math.ceil(
                        (oldest.createdAt.getTime() +
                            limit.windowMs -
                            Date.now()) /
                            1000,
                    );
                    return {
                        allowed: false,
                        retryAfter,
                        remaining: 0,
                    };
                }
            }

            return {
                allowed: true,
                remaining: Math.max(0, limit.max - record.count),
            };
        } catch (error) {
            console.error('Ошибка проверки лимитов доступа', error);
            return {
                allowed: true,
                remaining: Infinity,
            };
        }
    }

    //Сброс лимитов
    static async reset(ip: string, action?: RateLimitAction): Promise<void> {
        try {
            await prisma.ipRateLimit.deleteMany({
                where: {
                    ip,
                    ...(action ? { action } : {}),
                },
            });
        } catch (error) {
            console.error('Ошибка сброса лимитов', error);
        }
    }
}
