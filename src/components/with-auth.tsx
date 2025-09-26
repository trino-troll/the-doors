'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthProps {
    allowedRoles?: ('GOOD' | 'USER')[];
    fallback?: React.ReactNode;
}

export function withAuth<P extends object>(
    Component: React.ComponentType<P>,
    options: AuthProps = {}
) {
    return function AuthenticatedComponent(props: P) {
        const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
        const router = useRouter();

        useEffect(() => {
            async function checkAuth() {
                try {
                    const response = await fetch('/api/auth/check', {
                        credentials: 'include',
                    });

                    if (response.ok) {
                        const { user } = await response.json();

                        if (
                            options.allowedRoles &&
                            !options.allowedRoles.includes(user.role)
                        ) {
                            setIsAuthorized(false);
                            router.push('/unauthorized');
                        } else {
                            setIsAuthorized(true);
                        }
                    } else {
                        setIsAuthorized(false);
                        router.push('/login');
                    }
                } catch (error) {
                    setIsAuthorized(false);
                    router.push('/login');
                }
            }

            checkAuth();
        }, [router]);

        if (isAuthorized === null) {
            return options.fallback || <div>Проверка доступа...</div>;
        }

        if (!isAuthorized) {
            return null;
        }

        return <Component {...props} />;
    };
}
