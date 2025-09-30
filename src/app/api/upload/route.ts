import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('files') as File[];
        const orderId = formData.get('orderId') as string;

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'Нет файлов для загрузки' },
                { status: 400 }
            );
        }

        if (!orderId) {
            return NextResponse.json(
                { error: 'Не указан ID заказа' },
                { status: 400 }
            );
        }

        // Валидация типов файлов
        const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp',
        ];
        const invalidFiles = files.filter(
            (file) => !allowedTypes.includes(file.type)
        );

        if (invalidFiles.length > 0) {
            return NextResponse.json(
                {
                    error: `Неподдерживаемые типы файлов: ${invalidFiles
                        .map((f) => f.name)
                        .join(', ')}`,
                },
                { status: 400 }
            );
        }
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (err) {
            console.log('Папка уже существует');
        }

        const uploadedFiles: string[] = [];
        const errors: string[] = [];

        for (const file of files) {
            try {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);

                // Проверка размера файла (максимум 10MB)
                if (buffer.length > 10 * 1024 * 1024) {
                    errors.push(
                        `Файл ${file.name} слишком большой (максимум 10MB)`
                    );
                    continue;
                }

                const timestamp = Date.now();
                const randomSuffix = Math.random().toString(36).substring(2, 8);
                const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
                const fileName = `${timestamp}_${randomSuffix}_${originalName}`;
                const filePath = path.join(uploadDir, fileName);

                await writeFile(filePath, buffer);
                uploadedFiles.push(`/uploads/${fileName}`);
            } catch (fileError) {
                console.error(`Ошибка загрузки файла ${file.name}:`, fileError);
                errors.push(`Не удалось загрузить файл ${file.name}`);
            }
        }

        if (uploadedFiles.length === 0) {
            return NextResponse.json(
                {
                    error: 'Не удалось загрузить ни одного файла',
                    details: errors,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            files: uploadedFiles,
            errors: errors.length > 0 ? errors : undefined,
        });
    } catch (error) {
        console.error('Ошибка загрузки файлов:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера при загрузке файлов' },
            { status: 500 }
        );
    }
}
