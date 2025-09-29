import { OrderInStock } from '@/shared/type';
import { CardOrder } from './card-order';

export function ListOrders({ listOrder }: { listOrder: OrderInStock[] }) {
    return (
        <div>
            <div>
                {listOrder && listOrder.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {listOrder.map((order) => (
                            <CardOrder order={order} key={order.id} />
                        ))}
                    </div>
                ) : (
                    <div>Нет записей</div>
                )}
            </div>
        </div>
    );
}
