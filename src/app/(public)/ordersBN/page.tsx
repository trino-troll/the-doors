import AddOrderBN from '@/components/ordersBN/add-orders-bn';
import { ListOrderBN } from '@/components/ordersBN/listOrderBn';

export default function OrdersBN() {
    return (
        <div>
            <div className="flex gap-4">
                <h1 className="text-lg lg:text-2xl font-semibold">
                    Страница БН
                </h1>
                <AddOrderBN />
            </div>
            <ListOrderBN />
        </div>
    );
}
