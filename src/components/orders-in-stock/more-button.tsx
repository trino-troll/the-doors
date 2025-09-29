'use client';

import { updateOrderInStock } from '@/app/(public)/orders-in-stock/actions';
import { Button } from '@/shared/button';
import { Input } from '@/shared/input';
import { OrderInStock } from '@/shared/type';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { useRef, useState } from 'react';

export function MoreButton({ order }: { order: OrderInStock }) {
    const [openMore, setOpenMore] = useState<boolean>(false);
    const [editOrder, setEditOrder] = useState<OrderInStock>(order);
    const inputRef = useRef<HTMLInputElement | null>(null);

    function clearState() {
        setOpenMore(false);
    }

    function changeCompleted() {
        if (inputRef.current) {
            setEditOrder({
                ...editOrder,
                completed: !inputRef.current.checked,
            });
            inputRef.current.checked = !inputRef.current.checked;
        }
    }

    return (
        <>
            <Button variant="outline" onClick={() => setOpenMore(true)}>
                Поддробнее...
            </Button>

            {openMore ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenMore(false)}
                    />
                    <div className="relative z-10 min-w-[300px] w-full max-w-[90%] lg:max-w-md rounded-lg bg-white p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                Описание заказа
                            </h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                                onClick={() => setOpenMore(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>

                        <form
                            onSubmit={clearState}
                            action={() =>
                                updateOrderInStock({ order: editOrder })
                            }
                            className="grid grid-cols-1 gap-3"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="numOrder"
                                        className="text-xs lg:text-sm"
                                    >
                                        Номер заказа
                                    </label>
                                    <Input
                                        placeholder="Номер заказа"
                                        type="text"
                                        required
                                        name="numOrder"
                                        value={editOrder.numberOrder}
                                        onChange={(e) =>
                                            setEditOrder({
                                                ...editOrder,
                                                numberOrder: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="completedOrder"
                                        className="text-xs lg:text-sm"
                                    >
                                        Состояние
                                    </label>
                                    <input
                                        ref={inputRef}
                                        type="checkbox"
                                        name="completedOrder"
                                        className="hidden"
                                        defaultChecked={editOrder.completed}
                                    />
                                    <div
                                        className="relative w-16 h-8 rounded-full border-2 border-gray-500 cursor-pointer transition-colors duration-300"
                                        onClick={changeCompleted}
                                    >
                                        <div
                                            className={clsx(
                                                'absolute top-[2px] h-6 w-7 rounded-full transition-all duration-300 transform',
                                                {
                                                    'left-[2px] bg-red-600':
                                                        !editOrder.completed,
                                                    'left-[calc(100%-2px)] translate-x-[-100%] bg-green-600':
                                                        editOrder.completed,
                                                }
                                            )}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="shortDesc"
                                    className="text-xs lg:text-sm"
                                >
                                    Короткое описание
                                </label>
                                <Input
                                    placeholder="Альбера Браш 600 одна"
                                    type="text"
                                    name="shortDesc"
                                    value={editOrder.shortDescription ?? ''}
                                    onChange={(e) =>
                                        setEditOrder({
                                            ...editOrder,
                                            shortDescription: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="fullDesc"
                                    className="text-xs lg:text-sm"
                                >
                                    Полное описание
                                </label>
                                <textarea
                                    name="fullDesc"
                                    placeholder="Полное описание заказа"
                                    className="flex px-2 py-1 rounded-md border border-gray-200 bg-white text-[16px] ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                                    value={editOrder.fullDescription ?? ''}
                                    onChange={(e) =>
                                        setEditOrder({
                                            ...editOrder,
                                            fullDescription: e.target.value,
                                        })
                                    }
                                    rows={5}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    type="button"
                                    onClick={() => setOpenMore(false)}
                                    variant="outline"
                                >
                                    Отмена
                                </Button>
                                <Button>Изменить</Button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
