import { getUsers } from '@/app/(private)/for-good/actions';
import { CardUser } from './card-user';
import AddUser from './add-user';

export async function ListUsers() {
    const users = await getUsers();

    return (
        <div>
            <div className="flex gap-4 mb-4">
                <h2 className="font-semibold">Список пользователе</h2>
                <AddUser />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {users && users.length > 0 ? (
                    users.map((user) => <CardUser key={user.id} user={user} />)
                ) : (
                    <div>Пока нет пользователей</div>
                )}
            </div>
        </div>
    );
}
