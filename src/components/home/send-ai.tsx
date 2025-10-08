'use client';

import { askHuggingFace } from '@/app/actions';
import { Button } from '@/shared/button';
import { Input } from '@/shared/input';
import clsx from 'clsx';
import { Loader2, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';

type Message = {
    role: 'USER' | 'AI';
    text: string;
};

export function SendAI() {
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [dialog, setDialog] = useState<Message[]>([]);

    async function answerFunc(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        if (dialog.length > 8) {
            setDialog((prev) => [
                ...prev.slice(2),
                { role: 'USER', text: message },
            ]);
        } else {
            setDialog((prev) => [...prev, { role: 'USER', text: message }]);
        }
        try {
            const res = await askHuggingFace(message);
            setDialog((prev) => [...prev, { role: 'AI', text: res }]);
        } catch (error) {
            console.warn(error);
            setDialog((prev) => [
                ...prev,
                { role: 'AI', text: 'Произошла ошибка обращения к AI' },
            ]);
        } finally {
            setLoading(false);
            setMessage('');
        }
    }

    return (
        <section className="mt-4 flex flex-col pb-2 lg:pb-8 h-full min-h-[650px] border-2 border-gray-300 p-2 rounded-lg">
            <h2 className="text-center text-xl lg:text-2xl font-semibold">
                Задай вопрос AI
            </h2>

            <div className="flex-1 w-full mb-4 flex flex-col gap-2 overflow-auto">
                {dialog && dialog.length > 0 ? (
                    <>
                        {dialog.map((message) => (
                            <div
                                key={message.text}
                                className={clsx('flex', {
                                    'justify-end ': message.role === 'USER',
                                })}
                            >
                                <p
                                    className={clsx('max-w-[90%]', {
                                        'text-end bg-gray-200 p-2 rounded-lg rounded-br-none':
                                            message.role === 'USER',
                                        'bg-green-200 p-2 rounded-lg rounded-bl-none':
                                            message.role === 'AI',
                                    })}
                                >
                                    {message.text}
                                </p>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex gap-4 items-center">
                                Думает... <Loader2 className="animate-spin" />
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center">Напиши мне, бро!</p>
                )}
            </div>

            <form
                onSubmit={answerFunc}
                className="flex gap-2 items-center pt-4 pb-2 border-t"
            >
                <Input
                    placeholder="Спроси меня"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                />
                <Button>
                    <Send />
                </Button>
            </form>
        </section>
    );
}
