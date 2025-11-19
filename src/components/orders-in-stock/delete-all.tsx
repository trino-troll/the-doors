'use client';

import { deleteAllRecords } from '@/app/(private)/orders-in-stock/actions';
import { Button } from '@/shared/button';
import { IterationCw, Loader2, X } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';

export function DeleteAll() {
    const [openDeleteAll, setOpenDeleteAll] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    async function handleDrop() {
        setOpenDeleteAll(false);
        startTransition(async () => {
            await deleteAllRecords();
        });
    }

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && openDeleteAll) {
                setOpenDeleteAll(false);
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [openDeleteAll]);

    return (
        <>
            <Button
                variant="destructive"
                disabled={isPending}
                onClick={() => setOpenDeleteAll(true)}
            >
                {isPending ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>
                        <span className="block lg:hidden">
                            <IterationCw strokeWidth={3} size={18} />
                        </span>
                        <span className="hidden lg:block">
                            <IterationCw strokeWidth={3} />
                        </span>
                    </>
                )}
            </Button>

            {openDeleteAll ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenDeleteAll(false)}
                    ></div>
                    <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                Удаление записей
                            </h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black cursor-pointer"
                                onClick={() => setOpenDeleteAll(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>
                        <h2>Удалить все записи на этой странице?</h2>
                        <p className="text-red-600 mt-2 font-semibold">
                            Это приведет к потере всех данных на странице!!!
                        </p>

                        <form
                            onSubmit={handleDrop}
                            className="grid grid-cols-2 gap-3 mt-2"
                        >
                            <button
                                className="px-3 py-2 rounded-lg  border cursor-pointer"
                                onClick={() => setOpenDeleteAll(false)}
                            >
                                Отмена
                            </button>
                            <button
                                disabled={isPending}
                                className="px-3 py-2 text-white bg-red-600 rounded-lg cursor-pointer"
                            >
                                Сбросить
                            </button>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
