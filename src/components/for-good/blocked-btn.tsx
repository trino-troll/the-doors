'use client';

import { blockOneIP } from '@/app/(private)/for-good/actions';
import clsx from 'clsx';
import { CircleCheckBig, OctagonX, X } from 'lucide-react';
import { useState } from 'react';

export function BlockedBtn({ ip, manual }: { ip: string; manual: boolean }) {
    const [openBlock, setOpenBlock] = useState<boolean>(false);

    function handleBlock() {
        blockOneIP({ ip, manual: !manual });
        setOpenBlock(false);
    }

    return (
        <>
            <button
                className={clsx(
                    'flex items-center justify-center text-white cursor-pointer rounded w-full h-6',
                    {
                        'bg-green-600 hover:bg-green-500': !manual,
                        'bg-red-600 hover:bg-red-500': manual,
                    },
                )}
                onClick={() => setOpenBlock(true)}
            >
                {manual ? (
                    <OctagonX size={16} strokeWidth={3} />
                ) : (
                    <CircleCheckBig size={18} strokeWidth={3} />
                )}
            </button>
            {openBlock ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenBlock(false)}
                    />
                    <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                {manual ? 'Разблокировать ' : 'Заблокировать '}{' '}
                                пользователя
                            </h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black cursor-pointer"
                                onClick={() => setOpenBlock(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>

                        <form
                            action={handleBlock}
                            onSubmit={() => setOpenBlock(false)}
                            className="grid grid-cols-1 gap-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    className="px-3 py-2 rounded border cursor-pointer hover:bg-gray-200"
                                    onClick={() => setOpenBlock(false)}
                                >
                                    Отмена
                                </button>
                                <button
                                    className={clsx(
                                        'px-4 py-2 text-white rounded cursor-pointer',
                                        {
                                            'bg-green-600  hover:bg-green-500 ':
                                                manual,
                                            'bg-red-600 hover:bg-red-500':
                                                !manual,
                                        },
                                    )}
                                >
                                    {manual
                                        ? 'Разблокировать '
                                        : 'Заблокировать '}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
