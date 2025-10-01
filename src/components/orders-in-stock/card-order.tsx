import { OrderInStock } from '@/shared/type';
import clsx from 'clsx';
import { MoreButton } from './more-button';

export const statusOrder = {
    ORDERED: 'Заказан',
    IN_STOCK: 'На складе',
    DELIVERY_PROCESS: 'На доставке',
    DELIVERED: 'Доставлен',
};

export function CardOrder({ order }: { order: OrderInStock }) {
    return (
        <div
            className={clsx(
                'p-3 rounded-2xl border-2 border-gray-300 text-xs md:text-sm',
                {
                    'bg-green-100': order.completed,
                }
            )}
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
                <p>Статус</p>
                <p
                    className={clsx('px-2 py-1 rounded-lg ', {
                        'bg-green-100': order.statusInStock === 'DELIVERED',
                        'bg-amber-100': order.statusInStock !== 'DELIVERED',
                    })}
                >
                    {statusOrder[order.statusInStock]}
                </p>
            </div>
            <p className="my-2 text-sm py-2 px-4 rounded-2xl border border-gray-300">
                {order.shortDescription}
            </p>
            <MoreButton order={order} />
        </div>
    );
}
