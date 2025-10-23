'use client';
import { deleteOrderBN } from '@/app/(private)/ordersBN/actions';
import { Loader2, Trash2, X } from 'lucide-react';
import { useState, useTransition } from 'react';

export function DeleteOrderBN({ id, name }: { id: string; name: string }) {
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    async function handleDeleteDoor() {
        setOpenDelete(false);
        startTransition(async () => {
            await deleteOrderBN({ id });
        });
    }
    return (
        <>
            <button
                className="p-2 py-1 rounded-lg bg-red-600 cursor-pointer"
                onClick={() => setOpenDelete(true)}
            >
                {isPending ? (
                    <Loader2
                        className="animate-spin"
                        strokeWidth={3}
                        color="white"
                    />
                ) : (
                    <>
                        <span className="block lg:hidden">
                            <Trash2 color="white" strokeWidth={3} size={14} />
                        </span>
                        <span className="hidden lg:block">
                            <Trash2 color="white" strokeWidth={3} />
                        </span>
                    </>
                )}
            </button>

            {openDelete ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenDelete(false)}
                    />
                    <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                Удаление записи
                            </h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                                onClick={() => setOpenDelete(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>

                        <h2>Удаление запеси о двери {name} ?</h2>

                        <form
                            onSubmit={handleDeleteDoor}
                            className="grid grid-cols-2 gap-3"
                        >
                            <button
                                type="button"
                                className="px-3 py-2 rounded border cursor-pointer"
                                onClick={() => setOpenDelete(false)}
                            >
                                Отмена
                            </button>
                            <button
                                disabled={isPending}
                                className="px-4 py-2 text-white bg-green-600 rounded cursor-pointer"
                            >
                                Удалить
                            </button>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
