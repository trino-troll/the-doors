import { User } from '@/shared/type';
import clsx from 'clsx';
import { EditUser } from './edit-user';
import { DeleteUser } from './delite-user';

export function CardUser({ user }: { user: User }) {
    return (
        <div
            className={clsx(
                'border-2 border-gray-400 shadow-lg shadow-amber-400 rounded-lg p-2',
                {
                    'shadow-amber-400': user.role === 'GOOD',
                    'shadow-green-400': user.role === 'USER',
                }
            )}
        >
            <div className="flex justify-between ">
                <h2 className="font-semibold">{user.name}</h2>
                <div className="flex gap-3">
                    <EditUser user={user} />
                    <DeleteUser id={user.id} name={user.name} />
                </div>
            </div>
            <div className="flex justify-between">
                <p>Телефон:</p>
                <p>{user.phone}</p>
            </div>
            <div className="flex justify-between">
                <p>Email:</p>
                <p>{user.email}</p>
            </div>
            <div className="flex justify-between">
                <p>Роль:</p>
                <p>{user.role}</p>
            </div>
            <div className="flex justify-between">
                <p>Позывной:</p>
                <p>{user.nickName}</p>
            </div>
            <div className="flex justify-between">
                <p>Пароль:</p>
                <p>
                    {user.password.length > 10
                        ? user.password.slice(0, 10) + '...'
                        : user.password}
                </p>
            </div>
        </div>
    );
}
