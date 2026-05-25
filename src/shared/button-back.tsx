'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { useRouter } from 'next/navigation';

export function ButtonBack() {
    const router = useRouter();

    return (
        <>
            <Button onClick={() => router.back()}>
                <ArrowLeft />
            </Button>
        </>
    );
}
