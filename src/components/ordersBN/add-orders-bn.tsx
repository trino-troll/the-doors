'use client';

import { addOrderBN } from '@/app/(public)/ordersBN/actions';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

export default function AddOrderBN() {
    const [openBN, setOpenBN] = useState(false);
    const [name, setName] = useState<string>('');
    const [orderNumber, setOrderNumber] = useState<string>('');
    const [in1C, setIn1C] = useState<boolean>(false);

    function hendleDelete() {
        setName('');
        setOrderNumber('');
        setIn1C(false);
        addOrderBN({
            name,
            orderNumber,
            in1C,
        });
        setOpenBN(false);
    }

    return (
        <>
            <button
                className="px-2 lg:px-3 py-1 text-white cursor-pointer bg-green-600 rounded"
                onClick={() => setOpenBN(true)}
            >
                <span className="block lg:hidden">
                    <Plus strokeWidth={3} size={14} />
                </span>
                <span className="hidden lg:block">
                    <Plus strokeWidth={3} />
                </span>
            </button>

            {openBN ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenBN(false)}
                    />
                    <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                Добавить заказ БН
                            </h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                                onClick={() => setOpenBN(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>

                        <form
                            action={hendleDelete}
                            onSubmit={() => setOpenBN(false)}
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    value={orderNumber || ''}
                                    onChange={(e) =>
                                        setOrderNumber(e.target.value)
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
                                    checked={in1C}
                                    onChange={() => setIn1C(!in1C)}
                                    className="cursor-pointer"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 mt-1">
                                <button
                                    type="button"
                                    className="px-3 py-2 rounded border"
                                    onClick={() => setOpenBN(false)}
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
