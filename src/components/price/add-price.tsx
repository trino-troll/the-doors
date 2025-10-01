'use client';

import { createPrice } from '@/app/(private)/price/action';
import { Button } from '@/shared/button';
import { Input } from '@/shared/input';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

export function AddPrice() {
    const [openPrice, setOpenPrice] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    function clearState() {
        setName('');
        setPrice('');
        setOpenPrice(false);
    }

    return (
        <>
            <Button onClick={() => setOpenPrice(true)}>
                <>
                    <span className="block lg:hidden">
                        <Plus strokeWidth={3} size={14} />
                    </span>
                    <span className="hidden lg:block font-semibold">
                        Создать
                    </span>
                </>
            </Button>

            {openPrice ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenPrice(false)}
                    />
                    <div className="relative z-10 w-[calc(100% -32)] max-w-md rounded-lg bg-white p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                Добавление цены
                            </h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                                onClick={() => setOpenPrice(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>

                        <form
                            onSubmit={clearState}
                            action={() => createPrice({ name, price })}
                            className="grid grid-cols-1 gap-3"
                        >
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="name"
                                    className="text-xs lg:text-sm"
                                >
                                    Название
                                </label>
                                <Input
                                    placeholder="Название товара"
                                    type="text"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="name"
                                    className="text-xs lg:text-sm"
                                >
                                    Цена
                                </label>
                                <Input
                                    placeholder="Цена товара"
                                    type="text"
                                    required
                                    name="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    type="button"
                                    onClick={() => setOpenPrice(false)}
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
