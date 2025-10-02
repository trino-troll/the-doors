import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch('https://api.openai.com/v1/models', {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });

        if (!res.ok) {
            return NextResponse.json(
                { ok: false, message: 'Не удалось подключиться к GPT' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { ok: true, message: 'Соединение установлено' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { ok: false, message: 'Ошибка соединения с API GPT' },
            { status: 500 }
        );
    }
}
