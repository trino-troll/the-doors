import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Пропускаем некоторые пути
    if (
        request.nextUrl.pathname.startsWith('/api') ||
        request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/logout')
    ) {
        return NextResponse.next();
    }

    if (ip !== 'unknown') {
        const publicURL = process.env.PUBLIC_URL || request.nextUrl.origin;
        const apiUrl = `${publicURL}/api/check-ip`;

        const data = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-forwarded-for': ip,
            },
            body: JSON.stringify({
                path: request.nextUrl.pathname,
            }),
        });

        const res = await data.json();
        if (res.blocked) {
            const cookieStore = await cookies();
            cookieStore.delete('auth-token');
            // редирект на страницу входа
            const logoutUrl = new URL('/login', publicURL);
            return NextResponse.redirect(logoutUrl, 307); // 307 сохраняет метод POST
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
