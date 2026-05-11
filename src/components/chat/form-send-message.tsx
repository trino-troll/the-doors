import { Button } from '@/shared/button';
import { Input } from '@/shared/input';
import { Send } from 'lucide-react';

export function FormSendMessage({
    msg,
    setMsg,
    handleSendNewMessage,
}: {
    msg: string;
    setMsg: (str: string) => void;
    handleSendNewMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
    return (
        <form
            action=""
            className="flex gap-2 pt-4 mt-4 border-blue-200 border-t-2"
            onSubmit={handleSendNewMessage}
        >
            <Input
                type="text"
                placeholder="Начни ввод..."
                className="focus:ring-blue-200! grow"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
            />
            <Button variant={'chat'}>
                <Send />
            </Button>
        </form>
    );
}
