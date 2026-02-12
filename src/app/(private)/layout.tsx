import { getCurrentUser } from '@/lib/auth';
import { Navbar } from '@/shared/navbar';
import { NavbarMobile } from '@/shared/navbar-mobile';
import { redirect } from 'next/navigation';

export default async function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Проверяем авторизацию на сервере
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <>
            <div className="block lg:hidden w-full fixed top-0 z-50">
                <NavbarMobile user={user} />
            </div>
            <div className="lg:flex h-screen">
                <div className="flex-none p-2 w-64 hidden lg:block border-r-2 border-gray-200">
                    <Navbar user={user} />
                </div>
                <div className="grow p-6">{children}</div>
            </div>
        </>
    );
}
