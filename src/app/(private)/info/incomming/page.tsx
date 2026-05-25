import { Button } from '@/shared/button';
import { routes } from '@/shared/const';
import { H1 } from '@/shared/h1';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getInfoIncommingDoors } from '../actions';
import IncommingCard from '@/components/info/incomming/card-incomming';

export default async function InfoIncommingDoorsPage() {
    const doors = await getInfoIncommingDoors();
    return (
        <>
            <div className="flex items-center mb-2">
                <H1 className="mb-0!">
                    Справочная информация по входным дверям
                </H1>
                <Link href={routes.INFO_INCOMMING_ADD}>
                    <Button>
                        <Plus />
                    </Button>
                </Link>
            </div>
            <p className="font-semibold">Нужно сделать: </p>
            <ul className="list-decimal pl-5">
                <li>Добавление фото к двери</li>
                <li>Сделать ограничение для добавление только АДМИНОМ</li>
            </ul>
            <section className="pb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {doors.map((door) => (
                        <IncommingCard key={door.id} door={door} />
                    ))}
                </div>
            </section>
        </>
    );
}
