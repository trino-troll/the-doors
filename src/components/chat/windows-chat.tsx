'use client';
import { CurrentUser } from '@/lib/auth';
import { ChatMessage } from '@/shared/type';
import { useEffect, useRef, useState } from 'react';
import { ListMessages } from './list-messages';
import { FormSendMessage } from './form-send-message';
import { useStore } from '@/shared/store';

export function WindowsChat({ user }: { user: CurrentUser | null }) {
    const [msg, setMsg] = useState<string>('');
    const [messages, setMessages] = useState<ChatMessage[]>([]); //? Нужно сделать вывод списка сообщений
    const wsRef = useRef<WebSocket | null>(null);
    const { setUser } = useStore();

    useEffect(() => {
        const ws = new WebSocket(
            `ws://${process.env.NEXT_PUBLIC_WSS_URL}:${process.env.NEXT_PUBLIC_WSS_PORT}`,
        );

        wsRef.current = ws;

        if (user) {
            setUser(user);
        }
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setMessages((prev) => [...prev, data]);
            } catch (error) {
                console.error('❌ Ошибка парсинга:', event.data);
            }
        };

        ws.onclose = () => {
            ws.send(
                JSON.stringify({
                    type: 'system',
                    message: 'Пользователь покинул чат',
                }),
            );
        };

        ws.onerror = (error) => {
            console.log('Ошибка соединения', error);
        };

        return () => {
            ws.close();
        };
    }, [user]);

    function handleSendNewMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (wsRef.current !== null) {
            wsRef.current.send(
                JSON.stringify({
                    type: 'user',
                    message: msg,
                    userId: user?.id,
                    name: user?.name,
                    timestamp: new Date().toLocaleString(),
                }),
            );
        }
        setMsg('');
    }
    return (
        <section className="pb-8">
            <h1 className="text-center text-2xl lg:text-3xl font-semibold mb-2">
                Чат с друзьями
            </h1>
            <div className="w-full h-full min-h-[90vh] flex flex-col">
                <ListMessages messages={messages} />
                <FormSendMessage
                    msg={msg}
                    setMsg={setMsg}
                    handleSendNewMessage={handleSendNewMessage}
                />
            </div>
        </section>
    );
}
