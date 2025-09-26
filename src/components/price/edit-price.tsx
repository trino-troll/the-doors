'use client';

import { updatePrice } from '@/app/(private)/price/action';
import { Button } from '@/shared/button';
import { Input } from '@/shared/input';
import { Price } from '@/shared/type';
import { Pencil, X } from 'lucide-react';
import { useState } from 'react';

export function EditPrice({ price }: { price: Price }) {
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [editPrice, setEditPrice] = useState<Price>(price);

    return (
        <>
            <Button onClick={() => setOpenEdit(true)} size="sm">
                <>
                    <span className="block lg:hidden">
                        <Pencil strokeWidth={3} size={14} />
                    </span>
                    <span className="hidden lg:block">
                        <Pencil strokeWidth={3} size={16} />
                    </span>
                </>
            </Button>

            {openEdit ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenEdit(false)}
                    />
                    <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                Редактирование цены
                            </h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                                onClick={() => setOpenEdit(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>

                        <form
                            action={() =>
                                updatePrice({
                                    price: {
                                        ...editPrice,
                                    },
                                })
                            }
                            onSubmit={() => setOpenEdit(false)}
                            className="grid grid-cols-1 gap-3"
                        >
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name" className="text-xs">
                                    Название
                                </label>
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder="Название товара или услуги"
                                    className="border rounded px-2 py-1"
                                    required
                                    value={editPrice.name}
                                    onChange={(e) =>
                                        setEditPrice({
                                            ...editPrice,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="price" className="text-xs">
                                    Цена
                                </label>
                                <Input
                                    name="price"
                                    placeholder="Цена"
                                    className="border rounded px-2 py-1"
                                    value={editPrice.price}
                                    onChange={(e) =>
                                        setEditPrice({
                                            ...editPrice,
                                            price: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 mt-1">
                                <button
                                    type="button"
                                    className="px-3 py-2 rounded border cursor-pointer"
                                    onClick={() => setOpenEdit(false)}
                                >
                                    Отмена
                                </button>
                                <button className="px-4 py-2 text-white bg-green-600 rounded cursor-pointer">
                                    Изменить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
