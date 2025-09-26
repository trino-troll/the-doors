'use client';

import { login } from '@/app/(public)/login/actions';
import { Button } from '@/shared/button';
import { routes } from '@/shared/const';
import { Input } from '@/shared/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    async function loginHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login({ email, password });

            if (result.success) {
                router.push(routes.MAIN);
                router.refresh(); // Обновляем данные страницы
            } else {
                setError(result.error || 'Ошибка входа');
            }
        } catch (err) {
            setError('Произошла ошибка');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={loginHandler} className="flex flex-col gap-6">
            {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div className="relative">
                <label
                    htmlFor="email"
                    className="text-[10px] absolute bg-white -top-4 left-2 px-2"
                >
                    Email
                </label>
                <Input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>

            <div className="relative">
                <label
                    htmlFor="password"
                    className="text-[10px] absolute bg-white -top-4 left-2 px-2"
                >
                    Пароль
                </label>
                <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? 'Вход...' : 'Войти'}
            </Button>
        </form>
    );
}
