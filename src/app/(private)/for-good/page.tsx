import { ListBlocked } from '@/components/for-good/list-blocked';
import { ListUsers } from '@/components/for-good/list-users';

export default function ForGoodPage() {
    return (
        <section>
            <ListUsers />
            <ListBlocked />
        </section>
    );
}
