'use client';

import { User } from '@/shared/type';
import { Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { editUser } from '@/app/(private)/for-good/actions';

export function EditUser({ user }: { user: User }) {
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User>(user);

    return (
        <>
            <button
                className="px-2 py-1 text-white bg-green-600 rounded cursor-pointer"
                onClick={() => setOpenEdit(true)}
            >
                <Pencil strokeWidth={2} size={16} />
            </button>

            {openEdit ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenEdit(false)}
                    />
                    <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                Редактирование пользователя
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
                            action={() => editUser({ user: currentUser })}
                            onSubmit={() => setOpenEdit(false)}
                            className="grid grid-cols-1 gap-3"
                        >
                            <div className="relative">
                                <label
                                    htmlFor="name"
                                    className="text-xs absolute -top-2 left-2 px-2 bg-white"
                                >
                                    Название
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Имя"
                                    className="focus:ring-2 focus:ring-green-500 focus:outline-none w-full border border-gray-200 rounded px-2 py-1"
                                    required
                                    value={currentUser.name}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="email"
                                    className="text-xs absolute -top-2 left-2 px-2 bg-white"
                                >
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    className="focus:ring-2 focus:ring-green-500 focus:outline-none w-full border border-gray-200 rounded px-2 py-1"
                                    required
                                    value={currentUser.email}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="phone"
                                    className="text-xs absolute -top-2 left-2 px-2 bg-white"
                                >
                                    Телефон
                                </label>
                                <input
                                    name="phone"
                                    type="text"
                                    placeholder="Телефон"
                                    className="focus:ring-2 focus:ring-green-500 focus:outline-none w-full border border-gray-200 rounded px-2 py-1"
                                    value={currentUser.phone || ''}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            phone: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className="text-xs absolute -top-2 left-2 px-2 bg-white"
                                >
                                    Пароль
                                </label>
                                <input
                                    name="password"
                                    type="text"
                                    placeholder="Пароль"
                                    className="focus:ring-2 focus:ring-green-500 focus:outline-none w-full border border-gray-200 rounded px-2 py-1"
                                    required
                                    value={currentUser.password}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="role"
                                    className="text-xs absolute -top-2 left-2 px-2 bg-white"
                                >
                                    Роль
                                </label>
                                <select
                                    name="role"
                                    id=""
                                    className="w-full border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none px-2 py-1 rounded"
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            role: e.target.value as
                                                | 'USER'
                                                | 'GOOD',
                                        })
                                    }
                                >
                                    <option value="USER">Пользователь</option>
                                    <option value="ADMIN">Админ</option>
                                </select>
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
