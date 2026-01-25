import { SendAI } from '@/components/home/send-ai';
import { WarningNotifycation } from '@/components/home/warning-notifycation';
import { getCurrentUser } from '@/lib/auth';
import { routes } from '@/shared/const';
import { redirect } from 'next/navigation';

export default async function MainPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect(routes.LOGIN);
    }

    return (
        <section className="flex flex-col h-full min-h-[700px]">
            <div>
                <h2 className="text-center text-lg lg:text-3xl font-semibold">
                    Спавочник продавца
                </h2>
            </div>
            <WarningNotifycation />

            <SendAI />
        </section>
    );
}
