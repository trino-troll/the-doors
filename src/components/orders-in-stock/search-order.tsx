'use client';
import { Button } from '@/shared/button';
import { Input } from '@/shared/input';
import { IterationCw } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SearchOrder() {
    const searchParamsOrder = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [orderValue, setOrderValue] = useState('');
    const [shortValue, setShortValue] = useState('');

    useEffect(() => {
        setOrderValue(searchParamsOrder.get('order')?.toString() ?? '');
        setShortValue(searchParamsOrder.get('short')?.toString() ?? '');
    }, [searchParamsOrder]);

    function handleSearchOrder(order: string) {
        setOrderValue(order);
        const params = new URLSearchParams(searchParamsOrder);
        if (order) {
            params.set('order', order);
        } else {
            params.delete('order');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    function handleSearchShortDesc(short: string) {
        setShortValue(short);
        const params = new URLSearchParams(searchParamsOrder);
        if (short) {
            params.set('short', short);
        } else {
            params.delete('short');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    function handleClear() {
        setOrderValue('');
        setShortValue('');
        replace(`${pathname}`);
    }
    return (
        <div className="flex gap-2 md:gap-4 md:items-center text-sm md:text-base">
            <div className="flex flex-col md:flex-row gap-1 md:gap-4 flex-1">
                <div className="flex flex-col">
                    <label htmlFor="order" className="mt-1 text-xs">
                        Поиск по номеру
                    </label>
                    <Input
                        name="order"
                        placeholder="Поиск по номеру"
                        onChange={(e) => handleSearchOrder(e.target.value)}
                        value={orderValue}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="short" className="mt-1 text-xs">
                        Поиск по краткому описанию
                    </label>
                    <Input
                        name="short"
                        placeholder="ПО краткому описанию"
                        onChange={(e) => handleSearchShortDesc(e.target.value)}
                        value={shortValue}
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
