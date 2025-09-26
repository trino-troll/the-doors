'use client';

import { addBetweenDoor } from '@/app/(public)/between-room/actions';
import { Button } from '@/shared/button';
import { Input } from '@/shared/input';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

export function AddDoorBetween() {
    const [openBetween, setOpenBetween] = useState<boolean>(false);
    const [name, setName] = useState<string>('');

    function clearState() {
        setName('');
        setOpenBetween(false);
    }

    return (
        <>
            <Button onClick={() => setOpenBetween(true)}>
                <>
                    <span className="block lg:hidden">
                        <Plus strokeWidth={3} size={14} />
                    </span>
                    <span className="hidden lg:block">
                        <Plus strokeWidth={3} />
                    </span>
                </>
            </Button>

            {openBetween ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenBetween(false)}
                    />
                    <div className="relative z-10 w-[calc(100% -32)] max-w-md rounded-lg bg-white p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                Добавление межкомнотной двери
                            </h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                                onClick={() => setOpenBetween(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>

                        <form
                            onSubmit={clearState}
                            action={() =>
                                addBetweenDoor({
                                    name,
                                })
                            }
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
                                    placeholder="Напр. Стиль 1"
                                    type="text"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    type="button"
                                    onClick={() => setOpenBetween(false)}
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
