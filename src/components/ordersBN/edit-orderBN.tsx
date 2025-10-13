'use client';

import { editOrderBN } from '@/app/(public)/ordersBN/actions';
import { OrderBN } from '@/shared/type';
import { Loader2, Pencil, X } from 'lucide-react';
import { useState, useTransition } from 'react';

export default function EditOrderBN({ orderBN }: { orderBN: OrderBN }) {
    const [open, setOpen] = useState(false);
    const [editOrder, setEditOrder] = useState<OrderBN>(orderBN);
    const [isPending, startTransition] = useTransition();

    async function handleEdit() {
        setOpen(false);
        startTransition(async () => {
            await editOrderBN({ orderBN: editOrder });
        });
    }

    return (
        <>
            <button
                className="px-2 py-1 text-white bg-green-600 rounded-lg cursor-pointer"
                onClick={() => setOpen(true)}
            >
                {isPending ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>
                        <span className="block lg:hidden">
                            <Pencil strokeWidth={3} size={14} />
                        </span>
                        <span className="hidden lg:block">
                            <Pencil strokeWidth={3} />
                        </span>
                    </>
                )}
            </button>

            {open ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpen(false)}
                    />
                    <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                Редактирование записи
                            </h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                                onClick={() => setOpen(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>

                        <form
                            action={handleEdit}
                            onSubmit={() => setOpen(false)}
                            className="grid grid-cols-1 gap-3"
                        >
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name" className="text-xs">
                                    Название
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="БН-123"
                                    className="border rounded px-2 py-1"
                                    value={editOrder.name}
                                    onChange={(e) =>
                                        setEditOrder({
                                            ...editOrder,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="orderNumber"
                                    className="text-xs"
                                >
                                    Номер счета
                                </label>
                                <input
                                    name="orderNumber"
                                    type="text"
                                    placeholder="2334"
                                    className="border rounded px-2 py-1"
                                    value={editOrder.orderNumber || ''}
                                    onChange={(e) =>
                                        setEditOrder({
                                            ...editOrder,
                                            orderNumber: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="flex gap-4">
                                <label htmlFor="in1c" className="text-xs">
                                    Занесено в 1С:
                                </label>
                                <input
                                    id="in1c"
                                    name="in1c"
                                    type="checkbox"
                                    checked={editOrder.in1C}
                                    onChange={() =>
                                        setEditOrder({
                                            ...editOrder,
                                            in1C: !editOrder.in1C,
                                        })
                                    }
                                    className="cursor-pointer"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 mt-1">
                                <button
                                    type="button"
                                    className="px-3 py-2 rounded border"
                                    onClick={() => setOpen(false)}
                                >
                                    Отмена
                                </button>
                                <button className="px-4 py-2 text-white bg-green-600 rounded">
                                    Сохранить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
