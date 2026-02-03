import { headers } from 'next/headers';

export async function getClientIP(): Promise<string> {
    try {
        const headerList = await headers();

        //Полочение ip
        const forwardedFor = headerList.get('x-forwarded-for');
        const realIp = headerList.get('x-real-ip');
        const cfConnectigIp = headerList.get('cf-connecting-ip');

        const clientIp = forwardedFor?.split(',')[0]?.trim();

        return cfConnectigIp || realIp || clientIp || 'unknown';
    } catch (error) {
        console.error('Ошибка получения IP:', error);
        return 'unknown';
    }
}

// очистка ip от порта
export function normalizeIP(ip: string) {
    if (!ip || ip === 'unknown') return 'unknown';

    // отчищаем от порта
    if (ip.includes(':') && ip.split(':').length === 2) {
        return ip.split(':')[0];
    }

    return ip;
}
