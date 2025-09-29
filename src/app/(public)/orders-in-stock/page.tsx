import { AddOrder } from '@/components/orders-in-stock/add-order';
import { ListOrders } from '@/components/orders-in-stock/list-orders';
import { getOrdersInStock } from './actions';

export default async function OrderInStock() {
    const listOrder = await getOrdersInStock();

    return (
        <div>
            <div className="flex gap-4 items-center mb-3">
                <h2 className="text-lg font-semibold">
                    Страница заказов на складе
                </h2>
                <AddOrder />
            </div>

            <ListOrders listOrder={listOrder} />
        </div>
    );
}
