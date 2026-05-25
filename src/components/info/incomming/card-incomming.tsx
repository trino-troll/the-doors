'use client';
import { Button } from '@/shared/button';
import { routes } from '@/shared/const';
import { H1 } from '@/shared/h1';
import { IncommingDoor } from '@/shared/type';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function IncommingCard({ door }: { door: IncommingDoor }) {
    return (
        <div className=" rounded-2xl border p-2">
            <H1 as="h2" className="mb-2!">
                {door.name}
            </H1>
            <div>Цена: {door.price + (door.price * 55) / 100}</div>
            <div>Фабрика: {door.factory}</div>
            <Link
                href={routes.INFO_INCOMMING + '/' + door.id}
                className="flex justify-end"
            >
                <Button className="mt-2 px-4!">
                    <ArrowRight />
                </Button>
            </Link>
        </div>
    );
}
