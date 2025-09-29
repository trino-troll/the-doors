'use client';

import { addOrder } from '@/app/(public)/orders-in-stock/actions';
import { Button } from '@/shared/button';
import { Input } from '@/shared/input';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

export function AddOrder() {
    const [openAddOrder, setOpenAddOrder] = useState<boolean>(false);
    const [numberOrder, setNumberOrder] = useState<string>('');
    const [shortDescription, setShortDescription] = useState<string>('');
    const [fullDescription, setFullDescription] = useState<string>('');

    function clearState() {
        setNumberOrder('');
        setShortDescription('');
        setFullDescription('');
        setOpenAddOrder(false);
    }

    return (
        <>
            <Button onClick={() => setOpenAddOrder(true)}>
                <>
                    <span className="block lg:hidden">
                        <Plus strokeWidth={3} size={14} />
                    </span>
                    <span className="hidden lg:block">
                        <Plus strokeWidth={3} />
                    </span>
                </>
            </Button>

            {openAddOrder ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenAddOrder(false)}
                    />
                    <div className="relative z-10 min-w-[300px] w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                Добавление заказа
                            </h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                                onClick={() => setOpenAddOrder(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>

                        <form
                            onSubmit={clearState}
                            action={() =>
                                addOrder({
                                    numberOrder,
                                    shortDescription,
                                    fullDescription,
                                })
                            }
                            className="grid grid-cols-1 gap-3"
                        >
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="numOrder"
                                    className="text-xs lg:text-sm"
                                >
                                    Название
                                </label>
                                <Input
                                    placeholder="Номер заказа"
                                    type="text"
                                    required
                                    name="numOrder"
                                    value={numberOrder}
                                    onChange={(e) =>
                                        setNumberOrder(e.target.value)
                                    }
                                />
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
                                    value={shortDescription}
                                    onChange={(e) =>
                                        setShortDescription(e.target.value)
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
                                    value={fullDescription}
                                    onChange={(e) =>
                                        setFullDescription(e.target.value)
                                    }
                                    rows={5}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    type="button"
                                    onClick={() => setOpenAddOrder(false)}
                                    variant="outline"
                                >
                                    Отмена
                                </Button>
                                <Button>Создать</Button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
