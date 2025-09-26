import { Art } from '@/components/between-room/art';
import { oneBetweenDoor } from '../actions';
import { Button } from '@/shared/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/shared/const';
import clsx from 'clsx';

interface DoorPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function DoorPage({ params }: DoorPageProps) {
    const { id } = await params;
    const door = await oneBetweenDoor({ id });

    const arrAnalog = door?.analog?.split('\n');

    if (!door) {
        return (
            <div className="flex h-screen items-center justify-center font-semibold">
                Дверь не найдена.
            </div>
        );
    }

    return (
        <div className="text-sm">
            <div className="flex gap-3 mb-2">
                <Link href={routes.BETWEEN_ROOM}>
                    <Button>
                        <ArrowLeft />
                    </Button>
                </Link>
                <h2 className="text-lg lg:text-2xl font-semibold">
                    {door.name}
                </h2>
            </div>
            <Art url={door.fotoUrl} />
            <table className="mt-3">
                <tbody className="border-2">
                    <tr className="border">
                        <td className="px-1 border-r align-top">Завод</td>
                        <td className="px-1 font-semibold align-top">
                            {door.factory}
                        </td>
                    </tr>
                    <tr className="border">
                        <td className="px-1 border-r align-top">Материал</td>
                        <td className="px-1 font-semibold align-top">
                            {door.materials}
                        </td>
                    </tr>
                    <tr className="border">
                        <td className="px-1 border-r align-top">
                            Доступные цвета:
                        </td>
                        <td className="px-1 font-semibold align-top">
                            {door.colors && door.colors.length > 0 ? (
                                <ul>
                                    {door.colors.split('\n').map((line, i) => (
                                        <li key={line + i}>{line}</li>
                                    ))}
                                </ul>
                            ) : (
                                door.colors
                            )}
                        </td>
                    </tr>
                    <tr className="border">
                        <td className="px-1 border-r align-top">
                            Внутреннее наполнение:
                        </td>
                        <td className="px-1 font-semibold align-top">
                            {door.innerFilling}
                        </td>
                    </tr>
                    <tr className="border">
                        <td className="px-1 border-r align-top">Аналог:</td>
                        <td className="px-1 font-semibold align-top">
                            {arrAnalog && arrAnalog.length > 0 ? (
                                <ul>
                                    {arrAnalog.map((line, i) => (
                                        <li key={line + (i + 1)}>{line}</li>
                                    ))}
                                </ul>
                            ) : (
                                ''
                            )}
                        </td>
                    </tr>
                    <tr className="border">
                        <td className="px-1 border-r align-top">Коммент:</td>
                        <td className="px-1 font-semibold align-top">
                            {door.comment && door.comment.length > 0 ? (
                                <ul>
                                    {door.comment.split('\n').map((line, i) => (
                                        <li
                                            className={clsx({
                                                'text-red-600':
                                                    line.includes('Нестандарт'),
                                            })}
                                            key={line + i}
                                        >
                                            {line}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                door.comment
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2 className="text-lg lg:text-2xl font-semibold mt-3">
                Наличие на складе
            </h2>
            <table>
                <thead>
                    <tr className="border">
                        <th className="px-2 border-r">600</th>
                        <th className="px-2 border-r">700</th>
                        <th className="px-2 border-r">800</th>
                        <th className="px-2">900</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border">
                        <td className="px-2 border-r text-center">
                            {door.is600}
                        </td>
                        <td className="px-2 border-r text-center">
                            {door.is700}
                        </td>
                        <td className="px-2 border-r text-center">
                            {door.is800}
                        </td>
                        <td className="px-2 text-center">{door.is900}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
