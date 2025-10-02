'use client';

import { checkGptConnection } from '@/lib/check-gpt-connection';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CheckGptConnection() {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState<{ ok: boolean; message: string } | null>(
        null
    );
    useEffect(() => {
        setLoading(true);
        checkGptConnection()
            .then(setState)
            .finally(() => setLoading(false));
    }, []);
    if (loading) return <Loader2 className="animate-spin " color="black" />;

    if (state && !state.ok)
        return <div className="text-red-600">{state.message}</div>;
    return <div className="text-green-600">{state?.message}</div>;
}
