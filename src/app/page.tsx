import { CheckGptConnection } from '@/components/home/check-gpt-connection';
import { SendAI } from '@/components/home/send-ai';
import { WarningNotifycation } from '@/components/home/warning-notifycation';

export default function MainPage() {
    return (
        <section className="flex flex-col h-full min-h-[700px]">
            <div>
                <h2 className="text-center text-lg lg:text-3xl font-semibold">
                    Спавочник продавца
                </h2>
                <CheckGptConnection />
            </div>
            <WarningNotifycation />

            <SendAI />
        </section>
    );
}
