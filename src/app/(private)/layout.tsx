import { getCurrentUser } from '@/lib/auth';
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
        <div className="min-h-screen bg-gray-50 flex">
            {/* Основной контент */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
