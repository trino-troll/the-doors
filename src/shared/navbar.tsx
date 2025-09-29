import Link from 'next/link';
import { routes } from './const';
import { LogIn, LogOut } from 'lucide-react';
import { NavigationProps } from './type';
import { logOut } from '@/app/(public)/login/actions';

export function Navbar({ user }: NavigationProps) {
    // публичные страницы
    const navbarItems = [
        { href: routes.MAIN, title: 'Главная' },
        { href: routes.INCOMMING, title: 'Входящие' },
        { href: routes.BETWEEN_ROOM, title: 'Межкомнатные' },
        { href: routes.RECORDS, title: 'Записи' },
        { href: routes.ORDER_IN_STOCK, title: 'Заказы на складе' },
    ];

    // Добавляем админские пункты для GOOD пользователей
    if (user && user.role === 'GOOD') {
        navbarItems.push({ href: routes.PRICES, title: 'Цены' });
    }
    return (
        <div className="flex flex-col h-[100%]">
            <div className="flex flex-col gap-1 flex-grow">
                {navbarItems.map((nav) => (
                    <Link
                        key={nav.href}
                        href={nav.href}
                        className="p-2 px-4 rounded-lg border border-gray-300 hover:border-gray-500 bg-blue-50"
                    >
                        {nav.title}
                    </Link>
                ))}
            </div>
            {user ? (
                <form action={logOut}>
                    <button className="cursor-pointer w-full flex justify-between p-2 px-4 rounded-lg border border-gray-200 hover:border-gray-300 ">
                        <span>Выход</span>
                        <LogOut color="gray" />
                    </button>
                </form>
            ) : (
                <Link
                    href={routes.LOGIN}
                    className="flex justify-between p-2 px-4 rounded-lg border border-gray-200 hover:border-gray-300 "
                >
                    <span>Вход</span>
                    <LogIn color="gray" />
                </Link>
            )}
        </div>
    );
}
