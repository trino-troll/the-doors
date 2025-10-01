import { AddOrder } from '@/components/orders-in-stock/add-order';
import { ListOrders } from '@/components/orders-in-stock/list-orders';
import { getOrdersInStock } from './actions';
import { SearchOrder } from '@/components/orders-in-stock/search-order';
import { Suspense } from 'react';

export default async function OrderInStock(props: {
    searchParams?: Promise<{
        order?: string;
        short?: string;
    }>;
}) {
    const listOrder = await getOrdersInStock();
    const searchParams = await props.searchParams;
    const order = searchParams?.order || '';
    const short = searchParams?.short || '';

    let filtered = listOrder;

    if (order) {
        filtered = filtered.filter((item) =>
            item.numberOrder.toLowerCase().includes(order)
        );
    }
    if (short) {
        filtered = filtered.filter((item) =>
            item.shortDescription?.toLowerCase().includes(short.toLowerCase())
        );
    }

    return (
        <div>
            <div className="flex gap-4 items-center mb-3">
                <h2 className="text-lg font-semibold ">
                    Страница заказов на складе
                </h2>
                <AddOrder />
            </div>

            <SearchOrder />
            <p className="mb-2 text-red-600">В разработке</p>

            <Suspense>
                <ListOrders listOrder={filtered} />
            </Suspense>
        </div>
    );
}
