import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/shared/navbar';
import { NavbarMobile } from '@/shared/navbar-mobile';
import { getCurrentUser } from '@/lib/auth';

export const metadata: Metadata = {
    title: 'Мой справочник',
    description: 'Справочник для облегчения жизни',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser();
    return (
        <html lang="en">
            <body className={`antialiased text-sm lg:text-[18px]`}>
                <div className="block lg:hidden">
                    <NavbarMobile user={user} />
                </div>
                <div className="lg:flex h-screen">
                    <div className="flex-none p-2 w-64 hidden lg:block border-r-2 border-gray-200">
                        <Navbar user={user} />
                    </div>
                    <div className="grow p-6">{children}</div>
                </div>
            </body>
        </html>
    );
}
