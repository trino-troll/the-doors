'use client';

import { updateDoor } from '@/app/actions';
import { Door } from '@/shared/type';
import { Loader2, Pencil, X } from 'lucide-react';
import { useState, useTransition } from 'react';

export default function EditDoorModal({ door }: { door: Door }) {
    const [open, setOpen] = useState(false);
    const [editDoor, setEditDoor] = useState<Door>(door);
    const [isPending, startTransition] = useTransition();

    async function handleEdit() {
        setOpen(false);
        startTransition(async () => {
            await updateDoor(editDoor);
        });
    }

    return (
        <>
            <button
                className="px-2 py-1 text-white bg-green-600 rounded cursor-pointer"
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
                                Редактирование дверь
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
                                    placeholder="Напр. Стальная 3К"
                                    className="border rounded px-2 py-1"
                                    required
                                    value={editDoor.name}
                                    onChange={(e) =>
                                        setEditDoor({
                                            ...editDoor,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="description"
                                    className="text-xs"
                                >
                                    Описание
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Опционально"
                                    className="border rounded px-2 py-1"
                                    value={editDoor.description ?? ''}
                                    onChange={(e) =>
                                        setEditDoor({
                                            ...editDoor,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="size" className="text-xs">
                                    Размер
                                </label>
                                <input
                                    name="size"
                                    type="text"
                                    placeholder="860x2050"
                                    className="border rounded px-2 py-1"
                                    required
                                    value={editDoor.size}
                                    onChange={(e) =>
                                        setEditDoor({
                                            ...editDoor,
                                            size: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="opening" className="text-xs">
                                    Открывание
                                </label>
                                <select
                                    name="opening"
                                    className="border rounded px-2 py-1"
                                    required
                                    value={editDoor.opening}
                                    onChange={(e) =>
                                        setEditDoor({
                                            ...editDoor,
                                            opening: e.target
                                                .value as Door['opening'],
                                        })
                                    }
                                >
                                    <option value="RIGHT">Правое</option>
                                    <option value="LEFT">Левое</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="color" className="text-xs">
                                    Цвет двери
                                </label>
                                <input
                                    name="color"
                                    type="text"
                                    placeholder="Антрацит"
                                    className="border rounded px-2 py-1"
                                    required
                                    value={editDoor.color}
                                    onChange={(e) =>
                                        setEditDoor({
                                            ...editDoor,
                                            color: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="innerPanelColor"
                                    className="text-xs"
                                >
                                    Цвет внутренней панели
                                </label>
                                <input
                                    name="innerPanelColor"
                                    type="text"
                                    placeholder="Белый матовый"
                                    className="border rounded px-2 py-1"
                                    required
                                    value={editDoor.innerPanelColor}
                                    onChange={(e) =>
                                        setEditDoor({
                                            ...editDoor,
                                            innerPanelColor: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 mt-1">
                                <button
                                    type="button"
                                    className="px-3 py-2 rounded border cursor-pointer"
                                    onClick={() => setOpen(false)}
                                >
                                    Отмена
                                </button>
                                <button
                                    disabled={isPending}
                                    className="px-4 py-2 text-white bg-green-600 rounded cursor-pointer"
                                >
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
