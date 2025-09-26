import { cookies } from 'next/headers';
import { verifyToken } from './jwt';
import { prisma } from './prisma';
import { UserRole } from '@/shared/type';

export interface CurrentUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

// Базовая проверка авторизации
export async function getCurrentUser(): Promise<CurrentUser | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) return null;

        const decoded = verifyToken(token);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, name: true, role: true },
        });

        return user as CurrentUser;
    } catch (error) {
        return null;
    }
}

// Проверка роли
export async function checkUserRole(
    allowedRoles: UserRole[]
): Promise<boolean> {
    const user = await getCurrentUser();
    return user ? allowedRoles.includes(user.role) : false;
}

// Проверка является ли пользователь админом
export async function isAdmin(): Promise<boolean> {
    return await checkUserRole(['GOOD']);
}

// Утилита для защиты API роутов
export async function requireAuth(allowedRoles?: UserRole[]) {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error('Не авторизован');
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        throw new Error('Недостаточно прав');
    }

    return user;
}
