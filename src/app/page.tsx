import Aquarium from '@/components/home/aquarium';
import { SendAI } from '@/components/home/send-ai';
import { WarningNotifycation } from '@/components/home/warning-notifycation';
import { getCurrentUser } from '@/lib/auth';
import { getUsers } from './(private)/for-good/actions';

export default async function MainPage() {
    const users = await getUsers();
    const user = await getCurrentUser();

    if (!user) {
        return <Aquarium fishes={users.length} />;
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
