'use client';

import { LogIn, LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from './button';
import { useState } from 'react';
import { routes } from './const';
import { NavigationProps } from './type';
import { logOut } from '@/app/(public)/login/actions';

export function NavbarMobile({ user }: NavigationProps) {
    // публичные страницы
    const navbarItemsMob = [
        { href: routes.MAIN, title: 'Главная' },
        { href: routes.INCOMMING, title: 'Входные' },
        { href: routes.BETWEEN_ROOM, title: 'Межкомнатные' },
        { href: routes.RECORDS, title: 'Записи' },
        { href: routes.ORDER_IN_STOCK, title: 'Заказы на складе' },
        { href: routes.ORDER_BN, title: 'Заказы БН' },
    ];

    // Добавляем админские пункты для GOOD пользователей
    if (user && user.role === 'GOOD') {
        navbarItemsMob.push({ href: routes.PRICES, title: 'Цены' });
    }

    const [openNav, setOpenNav] = useState<boolean>(false);
    return (
        <>
            {/* Резервируем место под кнопку, чтобы layout не дергался */}
            <div className="relative h-10">
                <Button
                    variant="outline"
                    className={`w-full py-2 rounded-none transition-all duration-300 ease-in-out ${
                        openNav
                            ? 'opacity-0 -translate-y-6 pointer-events-none'
                            : 'opacity-100 translate-y-0'
                    }`}
                    onClick={() => setOpenNav(true)}
                >
                    Навигация
                </Button>
            </div>

            {/* Верхнее выпадающее меню: фиксированное, не меняет высоту страницы */}
            <div
                className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-in-out ${
                    openNav ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="flex justify-between gap-8 px-4 py-2 bg-white border-b shadow-sm">
                    <div className="flex flex-col gap-1 w-full">
                        {navbarItemsMob.map((nav) => (
                            <Link
                                key={nav.href}
                                href={nav.href}
                                className="p-1 px-4 rounded-lg text-sm bg-blue-50 hover:bg-blue-100 transition-colors"
                                onClick={() => setOpenNav(false)}
                            >
                                {nav.title}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col w-auto justify-between">
                        <Button
                            variant="outline"
                            onClick={() => setOpenNav(false)}
                        >
                            <X />
                        </Button>
                        {user ? (
                            <form action={logOut}>
                                <Button variant="outline">
                                    <LogOut />
                                </Button>
                            </form>
                        ) : (
                            <Link href={routes.LOGIN}>
                                <Button variant="outline">
                                    <LogIn />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
