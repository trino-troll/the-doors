import { verifyToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Защищенные роуты (требуют авторизации)
const protectedRoutes = ['/admin', '/profile', '/api/protected'];
// Админские роуты (только для GOOD)
const adminRoutes = ['/admin', '/api/admin'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth-token')?.value;

    // Проверяем токен
    let isValidToken = false;
    if (token) {
        try {
            verifyToken(token);
            isValidToken = true;
        } catch (error) {
            isValidToken = false;
        }
    }

    // Редирект если авторизованный пользователь на login
    if (isValidToken && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Проверка защищенных роутов
    if (
        protectedRoutes.some((route) => pathname.startsWith(route)) &&
        !isValidToken
    ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Проверка админских роутов
    if (
        adminRoutes.some((route) => pathname.startsWith(route)) &&
        !isValidToken
    ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/profile/:path*',
        '/login',
        '/api/protected/:path*',
        '/api/admin/:path*',
    ],
};
