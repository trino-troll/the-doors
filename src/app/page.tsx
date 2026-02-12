import { SendAI } from '@/components/home/send-ai';
import { WarningNotifycation } from '@/components/home/warning-notifycation';
import { getCurrentUser } from '@/lib/auth';
import { routes } from '@/shared/const';
import { Navbar } from '@/shared/navbar';
import { NavbarMobile } from '@/shared/navbar-mobile';
import { redirect } from 'next/navigation';

export default async function MainPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect(routes.LOGIN);
    }

    return (
        <>
            <div className="block lg:hidden w-full fixed top-0 z-50">
                <NavbarMobile user={user} />
            </div>
            <div className="flex-none p-2 w-64 hidden lg:block border-r-2 border-gray-200">
                <Navbar user={user} />
            </div>
            <section className="flex flex-col h-full min-h-[700px] w-full pt-8 md:pt-0">
                <div>
                    <h2 className="text-center text-lg lg:text-3xl font-semibold">
                        Спавочник продавца
                    </h2>
                </div>
                <WarningNotifycation />

                <SendAI />
            </section>
        </>
    );
}
