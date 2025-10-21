'use client';
import { Button } from '@/shared/button';
import { Input } from '@/shared/input';
import { IterationCw } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SearchOrderBN() {
    const searchParamsOrder = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [orderBN, setOrderBN] = useState<string>('');

    useEffect(() => {
        setOrderBN(searchParamsOrder.get('BN')?.toString() ?? '');
    }, [searchParamsOrder]);

    function handleSearchOrderBN(order: string) {
        setOrderBN(order);
        const params = new URLSearchParams(searchParamsOrder);
        if (order) {
            params.set('BN', order);
        } else {
            params.delete('BN');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    function handleClear() {
        setOrderBN('');
        replace(`${pathname}`);
    }
    return (
        <div className="flex gap-2 md:gap-4 md:items-center text-sm md:text-base">
            <div className="flex flex-col md:flex-row gap-1 md:gap-4 flex-1">
                <div className="flex flex-col">
                    <label htmlFor="orderBN" className="mt-1 text-xs">
                        Поиск по номеру
                    </label>
                    <Input
                        name="orderBN"
                        placeholder="Поиск по БН"
                        onChange={(e) => handleSearchOrderBN(e.target.value)}
                        value={orderBN}
                    />
                </div>
            </div>
            <div onClick={handleClear} className="pt-5">
                <Button>
                    <IterationCw />
                </Button>
            </div>
        </div>
    );
}
