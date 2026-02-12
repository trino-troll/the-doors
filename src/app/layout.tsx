import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Мой справочник',
    description: 'Справочник для облегчения жизни',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased text-sm lg:text-[18px] relative pt-6 lg:pt-0`}
            >
                <div className="lg:flex h-screen">{children}</div>
            </body>
        </html>
    );
}
