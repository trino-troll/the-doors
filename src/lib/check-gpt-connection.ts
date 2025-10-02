export async function checkGptConnection() {
    try {
        const res = await fetch('/api/gpt', { cache: 'no-store' });
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            return {
                ok: false,
                message: `Эндпоинт вернул ${res.status}: ${text || 'без тела'}`,
            };
        }
        return res.json();
    } catch (error) {
        return { ok: false, message: 'Ошибка при обращении к эндпоинту' };
    }
}
