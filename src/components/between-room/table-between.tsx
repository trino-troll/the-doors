'use client';
import { BetweenDoor } from '@/shared/type';
import clsx from 'clsx';
import { ArrowRight, Search, Trash2 } from 'lucide-react';
import { EditBetweenDoor } from './edit-door-between';
import { Input } from '@/shared/input';
import { Button } from '@/shared/button';
import { useState } from 'react';
import Link from 'next/link';
import { routes } from '@/shared/const';

export function TableBetween({
    betweenDoors,
}: {
    betweenDoors: BetweenDoor[];
}) {
    const [search, setSearch] = useState<string>('');

    const filteredDoors = betweenDoors.filter((door) =>
        door.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <>
            <div>
                <form action="" className="flex gap-2 mb-1">
                    <Input
                        type="text"
                        placeholder="Поиск"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button type="submit">
                        <Search />
                    </Button>
                </form>
            </div>
            <div className="w-full overflow-x-auto text-sm lg:text-[18px]">
                <table className="border mt-4 min-w-[900px] w-full">
                    <thead>
                        <tr className="border">
                            <th className="border-r">№</th>
                            <th className="border-r">Название</th>
                            <th className="border-r">600</th>
                            <th className="border-r">700</th>
                            <th className="border-r">800</th>
                            <th className="border-r">900</th>
                            <th className="border-r">Comment</th>
                            <th className="border-r">URL</th>
                            <th>Ред</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoors.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="text-center">
                                    Пока нет записей
                                </td>
                            </tr>
                        ) : (
                            filteredDoors.map((d: BetweenDoor, i: number) => (
                                <tr
                                    className={clsx('border', {
                                        'bg-gray-100': (i + 1) % 2 === 0,
                                        'bg-gray-200': (i + 1) % 2 === 1,
                                    })}
                                    key={d.id}
                                >
                                    <td className="text-center align-top border-r">
                                        {i + 1}
                                    </td>
                                    <td className="px-1 align-top border-r">
                                        {d.name}
                                    </td>
                                    <td className="px-1 align-top text-center border-r">
                                        {d.is600}
                                    </td>
                                    <td className="px-1 align-top text-center border-r">
                                        {d.is700}
                                    </td>
                                    <td className="px-1 align-top text-center border-r">
                                        {d.is800}
                                    </td>
                                    <td className="px-1 align-top text-center border-r">
                                        {d.is900}
                                    </td>
                                    <td className="px-1 align-top border-r text-sm">
                                        {d.comment && d.comment.length > 40
                                            ? `${d.comment.slice(0, 40)}...`
                                            : d.comment}
                                    </td>
                                    <td className="px-1 align-top border-r pt-1">
                                        <Link
                                            href={
                                                routes.BETWEEN_ROOM + '/' + d.id
                                            }
                                        >
                                            <Button size="sm">
                                                <ArrowRight />
                                            </Button>
                                        </Link>
                                    </td>
                                    <td className="flex justify-center px-1 py-1 gap-2 items-center">
                                        <EditBetweenDoor door={d} /> <Trash2 />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
