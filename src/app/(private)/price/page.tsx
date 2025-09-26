import { AddPrice } from '@/components/price/add-price';
import { SearchPrice } from '@/components/price/search';
import { TablePrice } from '@/components/price/table-price';
import { Suspense } from 'react';

export default async function PricePage(props: {
    searchParams?: Promise<{ query?: string }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    return (
        <div>
            <div className="flex items-center gap-8">
                <AddPrice />
                <SearchPrice />
            </div>

            <p className="text-red-600 font-semibold">
                Точная цена монтажа - при замере
            </p>
            <Suspense key={query}>
                <TablePrice query={query} />
            </Suspense>
        </div>
    );
}
