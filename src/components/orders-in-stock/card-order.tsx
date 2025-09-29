import { OrderInStock } from '@/shared/type';
import clsx from 'clsx';
import { MoreButton } from './more-button';

export function CardOrder({ order }: { order: OrderInStock }) {
    return (
        <div
            className={clsx('p-3 rounded-2xl border-2 border-gray-300', {
                'bg-green-100': order.completed,
            })}
        >
            <div className="flex justify-between">
                <p className="font-semibold text-lg">№ {order.numberOrder}</p>
                <div
                    className={clsx('w-6 h-6 rounded-full', {
                        'bg-red-600': !order.completed,
                        'bg-green-600': order.completed,
                    })}
                ></div>
            </div>
            <div className="flex justify-between">
                <p>Состояние</p>
                <p>{order.completed ? 'Собран' : 'В работе'}</p>
            </div>
            <p className="my-2 text-sm">{order.shortDescription}</p>
            <MoreButton order={order} />
        </div>
    );
}
