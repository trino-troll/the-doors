'use client';

import { Button } from '@/shared/button';
import { EcoshponPDK } from '@/shared/type';
import { X } from 'lucide-react';
import { useState } from 'react';

export function DetailsButton({ door }: { door: EcoshponPDK }) {
    const [openDetails, setOpenDetails] = useState<boolean>(false);

    return (
        <>
            <Button variant="outline" onClick={() => setOpenDetails(true)}>
                Подробнее...
            </Button>

            {openDetails ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center h-full max-h-[80] overflow-auto">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenDetails(false)}
                    />
                    <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                Описание модели
                            </h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                                onClick={() => setOpenDetails(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="h-[calc(100%-50px)] overflow-y-auto text-xs md:text-sm lg:text-base">
                            <div className="flex justify-between gap-2">
                                <h2 className="relative w-full my-2 border-2 border-green-500 p-2 rounded-xl">
                                    <div className="absolute px-2 -top-3 left-3 bg-white text-gray-400">
                                        Модель
                                    </div>
                                    <strong>{door.model}</strong>
                                </h2>
                                <div className="relative w-full my-2 border-2 border-green-500 p-2 rounded-xl">
                                    <div className="absolute px-2 -top-3 left-3 bg-white text-gray-400">
                                        Цена
                                    </div>
                                    {+door.price_opt +
                                        (+door.price_opt * 45) / 100}
                                </div>

                                <div className="relative w-full my-2 border-2 border-green-500 p-2 rounded-xl">
                                    <div className="absolute px-2 -top-3 left-3 bg-white text-gray-400">
                                        Материал
                                    </div>
                                    {door.coating}
                                </div>
                            </div>
                            <div className="relative my-2 border-2 border-green-500 p-2 rounded-xl">
                                <div className="absolute px-2 -top-3 left-3 bg-white text-gray-400">
                                    Доступные цвета
                                </div>
                                {door.available_colors}
                            </div>
                            <div className="relative my-4 border-2 border-green-500 p-2 rounded-xl">
                                <div className="absolute px-2 -top-3 left-3 bg-white text-gray-400">
                                    Звета под заказ
                                </div>
                                {door.other_colors}
                            </div>
                            <div className="relative my-4 border-2 border-green-500 p-2 rounded-xl">
                                <div className="absolute px-2 -top-3 left-3 bg-white text-gray-400">
                                    Тип двери
                                </div>
                                {door.construction}
                            </div>
                            <div className="relative my-4 border-2 border-green-500 p-2 rounded-xl">
                                <div className="absolute px-2 -top-3 left-3 bg-white text-gray-400">
                                    Особенности
                                </div>
                                {door.features}
                            </div>

                            <div className="relative my-4 border-2 border-green-500 p-2 rounded-xl">
                                <div className="absolute px-2 -top-3 left-3 bg-white text-gray-400">
                                    Рахмеры
                                </div>
                                <div>
                                    <div>
                                        Высота:{' '}
                                        <span className="font-semibold">
                                            {door.height}
                                        </span>
                                    </div>
                                    <div>
                                        Ширины:{' '}
                                        <span className="font-semibold">
                                            {door.width}
                                        </span>
                                    </div>
                                    <div>
                                        Толщина:{' '}
                                        <span className="font-semibold">
                                            {door.thickness}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative my-4 border-2 border-green-500 p-2 rounded-xl">
                                <div className="absolute px-2 -top-3 left-3 bg-white text-gray-400">
                                    Изменение размера
                                </div>
                                {door.custom_sizes}
                            </div>

                            <div className="relative my-4 border-2 border-green-500 p-2 rounded-xl">
                                <div className="absolute px-2 -top-3 left-3 bg-white text-gray-400">
                                    Аналоги
                                </div>
                                {door.analogs.length > 0 ? (
                                    <ul>
                                        {door.analogs.map((analog) => (
                                            <li key={analog.model}>
                                                <p className="underline">
                                                    {analog.factory}{' '}
                                                    <strong>
                                                        {analog.model}
                                                    </strong>
                                                </p>
                                                <p>{analog.available_colors}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    'НЕТ'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
