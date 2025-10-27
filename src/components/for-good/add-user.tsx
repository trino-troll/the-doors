'use client';

import { createUser } from '@/app/(private)/for-good/actions';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

export default function AddUser() {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [role, setRole] = useState<'GOOD' | 'USER'>('USER');
    const [nickName, setNickName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function hendleAdd() {
        setName('');
        setEmail('');
        setPhone('');
        setRole('USER');
        setPassword('');
        createUser({
            name,
            phone,
            email,
            password,
            role,
            nickName,
        });
        setOpen(false);
    }

    return (
        <>
            <button
                className="px-1 text-white cursor-pointer bg-green-600 rounded"
                onClick={() => setOpen(true)}
            >
                <span className="block lg:hidden">
                    <Plus strokeWidth={3} size={14} />
                </span>
                <span className="hidden lg:block">
                    <Plus strokeWidth={3} size={16} />
                </span>
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
                                Добавить пользователя
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
                            action={hendleAdd}
                            onSubmit={() => setOpen(false)}
                            className="grid grid-cols-1 gap-4"
                        >
                            <div className="relative">
                                <label
                                    htmlFor="name"
                                    className="text-xs absolute bg-white -top-2 left-2 px-2"
                                >
                                    Название
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Имя"
                                    className="w-full border-2 border-gray-200 focus:ring-green-500 focus:ring-2 focus:outline-none peer rounded px-2 py-1"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="email"
                                    className="text-xs absolute px-2 bg-white -top-2 left-2"
                                >
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder="example@mail.ru"
                                    className="w-full border-2 border-gray-200 focus:ring-green-500 focus:ring-2 focus:outline-none rounded px-2 py-1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
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
                                    className="focus:ring-2 border-2 border-gray-200 focus:ring-green-500 focus:outline-none w-full rounded px-2 py-1"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
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
                                        setRole(
                                            e.target.value as 'USER' | 'GOOD'
                                        )
                                    }
                                >
                                    <option value="USER">Пользователь</option>
                                    <option value="ADMIN">Админ</option>
                                </select>
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="phone"
                                    className="text-xs absolute px-2 bg-white -top-2 left-2"
                                >
                                    Телефон
                                </label>
                                <input
                                    name="phone"
                                    type="text"
                                    placeholder="+79991234567"
                                    className="border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none w-full rounded px-2 py-1"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="nickName"
                                    className="text-xs absolute px-2 bg-white -top-2 left-2"
                                >
                                    Позывной
                                </label>
                                <input
                                    name="nickName"
                                    type="text"
                                    placeholder="Бурилло"
                                    className="border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none w-full rounded px-2 py-1"
                                    value={nickName}
                                    onChange={(e) =>
                                        setNickName(e.target.value)
                                    }
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
