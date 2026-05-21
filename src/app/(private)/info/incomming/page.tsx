import { Button } from '@/shared/button';
import { routes } from '@/shared/const';
import { H1 } from '@/shared/h1';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function InfoIncommingDoorsPage() {
    return (
        <>
            <div className="flex">
                <H1 className="grow">Страница информации по входным дверям</H1>
                <Link href={routes.INFO_INCOMMING_ADD}>
                    <Button>
                        <Plus />
                    </Button>
                </Link>
            </div>
            <p className="font-semibold">Нужно сделать: </p>
            <ul className="list-decimal pl-5">
                <li>Модель стартовую</li>
                <li>Форму Добавления Информации</li>
                <li>Вывести список искомых дверей</li>
                <li>Дополнить модель</li>
                <li>Исправить форму добавления информации</li>
                <li>Добавление фото к двери</li>
                <li>Сделать ограничение для добавление только АДМИНОМ</li>
            </ul>
        </>
    );
}
