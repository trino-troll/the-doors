'use client';

import { login, verifyAdmin, verifyCode } from '@/app/(public)/login/actions';
import { Button } from '@/shared/button';
import { routes } from '@/shared/const';
import { Input } from '@/shared/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
    const [email, setEmail] = useState<string>(''); // сохраняется пароль, после нажатия кнопи шаг2
    const [step2, setStep2] = useState<boolean>(false);
    const [step3, setStep3] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');
    const [adminCode, setAdminCode] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    async function verification(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await verifyCode({ email });
            if (result && !result.success) {
                setError(result.message);
                return;
            }
        } catch {
            setError('Произошла ошибка получения кода');
        } finally {
            setLoading(false);
        }

        setStep2(true);
    }

    async function loginHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login({ email, code });

            if (result.success) {
                setStep2(false);
                setStep3(true);
            } else {
                setError(result.error || 'Ошибка входа');
            }
        } catch {
            setError('Произошла ошибка');
        } finally {
            setLoading(false);
        }
    }

    async function verifityAdminCode(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await verifyAdmin({ email, adminCode });
            if (result.success) {
                router.push(routes.MAIN);
                router.refresh(); // Обновляем данные страницы
            } else {
                setError(result.error || 'Ошибка входа');
            }
        } catch {
            setError('Произошла ошибка');
        } finally {
            setLoading(false);
        }
    }

    if (!step2 && !step3) {
        return (
            <form onSubmit={verification} className="flex flex-col gap-6">
                {error && (
                    <div className="text-red-500 text-sm text-center">
                        {error}
                    </div>
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

                {/* Пока просто кнопка */}
                <Button type="submit" loading={loading}>
                    {loading ? 'Загрузка...' : 'Получить пароль'}
                </Button>
            </form>
        );
    }

    if (step2) {
        return (
            <form onSubmit={loginHandler} className="flex flex-col gap-6">
                {error && (
                    <div className="text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="relative">
                    <label
                        htmlFor="code"
                        className="text-[10px] absolute bg-white -top-4 left-2 px-2"
                    >
                        Код подтверждения
                    </label>
                    <Input
                        type="password"
                        placeholder="Пароль"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full"
                    />
                </div>

                <Button type="submit" disabled={loading}>
                    Войти
                </Button>
            </form>
        );
    }

    if (step3) {
        return (
            <form onSubmit={verifityAdminCode} className="flex flex-col gap-6">
                {error && (
                    <div className="text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="relative">
                    <label
                        htmlFor="code"
                        className="text-[10px] absolute bg-white -top-[21px] left-2 px-2"
                    >
                        Код подтверждения<br></br>администратора
                    </label>
                    <Input
                        type="password"
                        placeholder="Пароль администратора"
                        value={adminCode}
                        onChange={(e) => setAdminCode(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full"
                        maxLength={10}
                    />
                </div>

                <Button type="submit" disabled={loading}>
                    Подтвердить
                </Button>
            </form>
        );
    }
}
