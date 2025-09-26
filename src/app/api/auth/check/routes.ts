import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function GET() {
    try {
        const user = await requireAuth(); // Базовая проверка авторизации

        return NextResponse.json({
            success: true,
            user,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Не авторизован' },
            { status: 401 }
        );
    }
}

// Для проверки ролей
export async function POST(request: Request) {
    try {
        const { allowedRoles } = await request.json();
        const user = await requireAuth(allowedRoles);

        return NextResponse.json({
            success: true,
            user,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Доступ запрещен' },
            { status: 403 }
        );
    }
}
