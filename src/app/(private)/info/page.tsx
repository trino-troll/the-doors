import { Button } from '@/shared/button';
import { routes } from '@/shared/const';
import { H1 } from '@/shared/h1';
import Link from 'next/link';

export default function InfoPage() {
    return (
        <section>
            <H1>Страницы выбора справочника</H1>
            <div className="flex flex-col gap-4">
                <Link href={routes.INFO_BETWEEN}>
                    <Button variant={'outline'} size={'lg'} className="w-full">
                        Межкомнатные
                    </Button>
                </Link>
                <Link href={routes.INFO_INCOMMING}>
                    <Button variant={'outline'} size={'lg'} className="w-full">
                        Входные
                    </Button>
                </Link>
            </div>
        </section>
    );
}
