import { WindowsChat } from '@/components/chat/windows-chat';
import { getCurrentUser } from '@/lib/auth';

export default async function ChatPage() {
    const user = await getCurrentUser();

    return <WindowsChat user={user} />;
}
