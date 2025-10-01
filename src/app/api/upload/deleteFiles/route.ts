import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { unlink } from 'fs/promises';
import { prisma } from '@/lib/prisma';

type DeleteFilesBody = {
    orderId?: string;
    files: string[];
};

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as DeleteFilesBody;
        const files = Array.isArray(body.files) ? body.files : [];
        const orderId = body.orderId;

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'Не переданы файлы для удаления' },
                { status: 400 }
            );
        }

        const deleted: string[] = [];
        const errors: { file: string; error: string }[] = [];

        for (const fileUrl of files) {
            try {
                // Разрешаем удалять только из папки public/uploads
                if (!fileUrl.startsWith('/uploads/')) {
                    errors.push({ file: fileUrl, error: 'Запрещённый путь' });
                    continue;
                }
                const absolutePath = path.join(
                    process.cwd(),
                    'public',
                    fileUrl.replace(/^\/+/, '')
                );
                await unlink(absolutePath);
                deleted.push(fileUrl);
            } catch (e: unknown) {
                errors.push({
                    file: fileUrl,
                    error: e instanceof Error ? e.message : 'Unknown error',
                });
            }
        }

        // Опционально синхронизируем БД, если пришёл orderId
        if (orderId) {
            try {
                const order = await prisma.orderInStock.findFirst({
                    where: { id: orderId },
                });
                if (order) {
                    const currentUrls: string[] = Array.isArray(order.url)
                        ? (order.url as unknown as string[])
                        : [];
                    const updatedUrls = currentUrls.filter(
                        (u) => !deleted.includes(u)
                    );
                    if (updatedUrls.length !== currentUrls.length) {
                        await prisma.orderInStock.update({
                            where: { id: orderId },
                            data: { url: updatedUrls },
                        });
                    }
                }
            } catch (e) {
                errors.push({ file: 'db', error: 'Ошибка синхронизации БД' });
            }
        }

        return NextResponse.json({
            success: true,
            deleted,
            errors: errors.length ? errors : undefined,
        });
    } catch (err) {
        console.log('Ошибка удаления файла', err);
        return NextResponse.json(
            { error: 'Не удалось удалить файл/ы' },
            { status: 500 }
        );
    }
}
