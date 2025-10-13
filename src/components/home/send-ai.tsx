'use client';

import { askHuggingFace } from '@/app/actions-ai';
import { Button } from '@/shared/button';
import { Input } from '@/shared/input';
import { Message } from '@/shared/type';
import clsx from 'clsx';
import { Loader2, Send, Volume2, VolumeX } from 'lucide-react';
import { FormEvent, useState } from 'react';
// import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';

export function SendAI() {
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [dialog, setDialog] = useState<Message[]>([]);
    const [isSpeech, setIsSpeech] = useState<boolean>(true);

    // const elevenlabs = new ElevenLabsClient();

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
            // const audioStream = await elevenlabs.textToSpeech.convert(
            //     'JBFqnCBsd6RMkjVDRZzb',
            //     {
            //         text: res,
            //         modelId: 'eleven_multilingual_v2',
            //         outputFormat: 'mp3_44100_128',
            //     }
            // );
            if (isSpeech) {
                speakText(res);
            }
            // await play(audioStream as any);
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

    function speakText(text: string) {
        if ('speechSynthesis' in window) {
            let utterance = new SpeechSynthesisUtterance(text);

            let voices = speechSynthesis.getVoices();
            let russianVoice = voices.find((voice) =>
                voice.lang.includes('ru')
            );
            if (russianVoice) {
                utterance.voice = russianVoice;
            }
            // Настраиваем параметры
            utterance.rate = 1.5; // Скорость (0.1 - 10)
            utterance.pitch = 1.0; // Высота (0 - 2)
            utterance.volume = 1.0; // Громкость (0 - 1)

            speechSynthesis.speak(utterance);
        } else {
            console.log('Браузер не поддерживает синтез речи');
        }
    }

    return (
        <section className="relative mt-4 flex flex-col pb-2 lg:pb-8 h-full min-h-[650px] border-2 border-gray-300 p-2 rounded-lg">
            <div className="absolute top-2 left-2">
                {isSpeech ? (
                    <button
                        className="p-2 rounded-lg bg-green-100"
                        onClick={() => setIsSpeech(false)}
                    >
                        <Volume2 />
                    </button>
                ) : (
                    <button
                        className="p-2 rounded-lg bg-gray-100"
                        onClick={() => setIsSpeech(true)}
                    >
                        <VolumeX />
                    </button>
                )}
            </div>
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
