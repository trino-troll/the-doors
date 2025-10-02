'use client';
import { Button } from '@/shared/button';
import { Input } from '@/shared/input';
import { IterationCw } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { statusOrder } from './card-order';

export function SearchOrder() {
    const searchParamsOrder = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [orderValue, setOrderValue] = useState<string>('');
    const [shortValue, setShortValue] = useState<string>('');
    const [statusValue, setStatusValue] = useState<string>('');

    useEffect(() => {
        setOrderValue(searchParamsOrder.get('order')?.toString() ?? '');
        setShortValue(searchParamsOrder.get('short')?.toString() ?? '');
        setStatusValue(searchParamsOrder.get('status')?.toString() ?? '');
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

    function handleSearchStatus(status: string) {
        setStatusValue(status);
        const params = new URLSearchParams(searchParamsOrder);
        if (status) {
            params.set('status', status);
        } else {
            params.delete('status');
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
                <div className="flex flex-col">
                    <label htmlFor="status" className="mt-1 text-xs">
                        Фильтр по статусу
                    </label>
                    <select
                        name="status"
                        id=""
                        value={statusValue}
                        onChange={(e) => handleSearchStatus(e.target.value)}
                        className="flex px-2 py-1 rounded-md border border-gray-200 bg-white text-[16px] ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    >
                        <option value="">Все</option>
                        <option value="ORDERED">{statusOrder.ORDERED}</option>
                        <option value="IN_STOCK">{statusOrder.IN_STOCK}</option>
                        <option value="DELIVERY_PROCESS">
                            {statusOrder.DELIVERY_PROCESS}
                        </option>
                        <option value="DELIVERED">
                            {statusOrder.DELIVERED}
                        </option>
                    </select>
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
