import AddOrderBN from '@/components/ordersBN/add-orders-bn';
import { ListOrderBN } from '@/components/ordersBN/listOrderBn';
import { SearchOrderBN } from '@/components/ordersBN/search-orderBN';
import { getOrderBN } from './actions';

export default async function OrdersBN(props: {
    searchParams?: Promise<{
        BN: string;
    }>;
}) {
    let filtered = await getOrderBN();
    const searchParams = await props.searchParams;
    const bn = searchParams?.BN || '';

    if (bn) {
        filtered = filtered.filter((item) =>
            item.name.toLowerCase().includes(bn.toLowerCase())
        );
    }

    return (
        <div>
            <div className="flex gap-4">
                <h1 className="text-lg lg:text-2xl font-semibold">
                    Страница БН
                </h1>
                <AddOrderBN />
            </div>
            <SearchOrderBN />
            <ListOrderBN list={filtered} />
        </div>
    );
}
