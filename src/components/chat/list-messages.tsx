import { useStore } from '@/shared/store';
import { ChatMessage } from '@/shared/type';
import clsx from 'clsx';

export function ListMessages({ messages }: { messages: ChatMessage[] }) {
    const { user } = useStore();

    return (
        <div className="overflow-y-hidden border border-blue-200 rounded-lg p-2 grow flex flex-col gap-2">
            {messages.length === 0 && <p>Пока нет сообщений</p>}
            {messages.length > 0 &&
                messages.map((curMsg, i) => (
                    <div
                        key={i + 1}
                        className={clsx('flex', {
                            'justify-end ': user!.id === curMsg.userId,
                            'justify-center ': curMsg.type === 'system',
                        })}
                    >
                        <div
                            className={clsx(
                                'w-fit max-w-[70%] px-2 py-1 rounded-lg ',
                                {
                                    'bg-blue-200 rounded-br-none':
                                        user!.id === curMsg.userId,
                                    'bg-gray-200 rounded-bl-none':
                                        user!.id !== curMsg.userId &&
                                        curMsg.type === 'user',
                                },
                            )}
                        >
                            {curMsg.message}
                        </div>
                    </div>
                ))}
        </div>
    );
}
