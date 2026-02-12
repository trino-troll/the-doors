'use client';
import { editNameIP } from '@/app/(private)/for-good/actions';
import clsx from 'clsx';
import { Loader2, Pencil, X } from 'lucide-react';
import { useState } from 'react';

export function EditNameIp({ name, ip }: { name: string; ip: string }) {
    const [currentName, setCurrentName] = useState<string>(name);
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function hadlerEdit() {
        setLoading(true);

        const res = await editNameIP({ name: currentName, ip });
        if (res && res.error) {
            setError(res.error as string);
            setLoading(false);
            return;
        }
        setLoading(false);
        setOpen(false);
    }
    return (
        <>
            <button
                className="px-2 py-1 text-white mt-1 w-8 h-7  bg-green-600 rounded cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <Pencil strokeWidth={2} size={16} />
            </button>

            {open ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpen(false)}
                    />
                    <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">Имя IP</h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                                onClick={() => setOpen(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>

                        {error && (
                            <div className="text-red-400 font-semibold mb-4 text-center text-base">
                                {error}
                            </div>
                        )}

                        <form
                            action={hadlerEdit}
                            className="grid grid-cols-1 gap-3 text-base"
                        >
                            <div className="relative">
                                <label
                                    htmlFor="name"
                                    className="text-xs absolute -top-2 left-2 px-2 bg-white"
                                >
                                    Имя
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Имя"
                                    className="focus:ring-2 focus:ring-green-500 focus:outline-none w-full border border-gray-200 rounded px-2 py-1"
                                    required
                                    value={currentName}
                                    onChange={(e) =>
                                        setCurrentName(e.target.value)
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
                                    disabled={loading}
                                    className={clsx(
                                        'px-4 py-2 text-white rounded cursor-pointer',
                                        {
                                            'bg-green-600': !loading,
                                            'bg-green-300': loading,
                                        },
                                    )}
                                >
                                    {loading ? (
                                        <span className="flex gap-2">
                                            <Loader2 className="animate-spin" />{' '}
                                            Обработка
                                        </span>
                                    ) : (
                                        'Изменить'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
