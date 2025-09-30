'use client';

import { updateOrderInStock } from '@/app/(public)/orders-in-stock/actions';
import { Button } from '@/shared/button';
import { Input } from '@/shared/input';
import { OrderInStock } from '@/shared/type';
import clsx from 'clsx';
import { X, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import Image from 'next/image';

export function MoreButton({ order }: { order: OrderInStock }) {
    const [openMore, setOpenMore] = useState<boolean>(false);
    const [editOrder, setEditOrder] = useState<OrderInStock>(order);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    function clearState() {
        setOpenMore(false);
    }

    function changeCompleted() {
        if (inputRef.current) {
            setEditOrder({
                ...editOrder,
                completed: !inputRef.current.checked,
            });
            inputRef.current.checked = !inputRef.current.checked;
        }
    }

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // Валидация файлов на фронтенде
        const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp',
        ];
        const maxSize = 10 * 1024 * 1024; // 10MB

        const invalidFiles = Array.from(files).filter((file) => {
            return !allowedTypes.includes(file.type) || file.size > maxSize;
        });

        if (invalidFiles.length > 0) {
            const errorMessages = invalidFiles.map((file) => {
                if (!allowedTypes.includes(file.type)) {
                    return `${file.name}: неподдерживаемый тип файла`;
                }
                if (file.size > maxSize) {
                    return `${file.name}: файл слишком большой (максимум 10MB)`;
                }
                return `${file.name}: неизвестная ошибка`;
            });
            alert(`Ошибки валидации:\n${errorMessages.join('\n')}`);
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
            formData.append('orderId', editOrder.id);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                // Добавляем новые фото к существующим
                const currentPhotos = editOrder.url || [];
                setEditOrder({
                    ...editOrder,
                    url: [...currentPhotos, ...result.files],
                });

                // Показываем предупреждения, если есть
                if (result.errors && result.errors.length > 0) {
                    alert(
                        `Загружено ${
                            result.files.length
                        } файлов, но есть ошибки:\n${result.errors.join('\n')}`
                    );
                }
            } else {
                const errorMessage = result.error || 'Ошибка при загрузке фото';
                const details = result.details
                    ? `\nДетали: ${result.details.join('\n')}`
                    : '';
                alert(errorMessage + details);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Ошибка при загрузке фото');
        } finally {
            setIsUploading(false);
            // Очищаем input чтобы можно было загружать те же файлы снова
            if (fileRef.current) {
                fileRef.current.value = '';
            }
        }
    }

    function handleDownloadFiles() {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    function removePhoto(index: number) {
        const updatedPhotos = [...(editOrder.url || [])];
        updatedPhotos.splice(index, 1);
        setEditOrder({
            ...editOrder,
            url: updatedPhotos,
        });
    }

    return (
        <>
            <Button variant="outline" onClick={() => setOpenMore(true)}>
                Подробнее...
            </Button>

            {openMore ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenMore(false)}
                    />
                    <div className="relative z-10 min-w-[300px] w-full max-w-[90%] lg:max-w-2xl rounded-lg bg-white p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                Описание заказа
                            </h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                                onClick={() => setOpenMore(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>

                        <form
                            onSubmit={clearState}
                            action={() =>
                                updateOrderInStock({ order: editOrder })
                            }
                            className="grid grid-cols-1 gap-3"
                        >
                            {/* Остальные поля остаются как были */}
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="numOrder"
                                        className="text-xs lg:text-sm"
                                    >
                                        Номер заказа
                                    </label>
                                    <Input
                                        placeholder="Номер заказа"
                                        type="text"
                                        required
                                        name="numOrder"
                                        value={editOrder.numberOrder}
                                        onChange={(e) =>
                                            setEditOrder({
                                                ...editOrder,
                                                numberOrder: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="completedOrder"
                                        className="text-xs lg:text-sm"
                                    >
                                        Состояние
                                    </label>
                                    <input
                                        ref={inputRef}
                                        type="checkbox"
                                        name="completedOrder"
                                        className="hidden"
                                        defaultChecked={editOrder.completed}
                                    />
                                    <div
                                        className="relative w-16 h-8 rounded-full border-2 border-gray-500 cursor-pointer transition-colors duration-300"
                                        onClick={changeCompleted}
                                    >
                                        <div
                                            className={clsx(
                                                'absolute top-[2px] h-6 w-7 rounded-full transition-all duration-300 transform',
                                                {
                                                    'left-[2px] bg-red-600':
                                                        !editOrder.completed,
                                                    'left-[calc(100%-2px)] translate-x-[-100%] bg-green-600':
                                                        editOrder.completed,
                                                }
                                            )}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="shortDesc"
                                    className="text-xs lg:text-sm"
                                >
                                    Короткое описание
                                </label>
                                <Input
                                    placeholder="Альбера Браш 600 одна"
                                    type="text"
                                    name="shortDesc"
                                    value={editOrder.shortDescription ?? ''}
                                    onChange={(e) =>
                                        setEditOrder({
                                            ...editOrder,
                                            shortDescription: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="fullDesc"
                                    className="text-xs lg:text-sm"
                                >
                                    Полное описание
                                </label>
                                <textarea
                                    name="fullDesc"
                                    placeholder="Полное описание заказа"
                                    className="flex px-2 py-1 rounded-md border border-gray-200 bg-white text-[16px] ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                                    value={editOrder.fullDescription ?? ''}
                                    onChange={(e) =>
                                        setEditOrder({
                                            ...editOrder,
                                            fullDescription: e.target.value,
                                        })
                                    }
                                    rows={5}
                                />
                            </div>

                            {/* Секция для загрузки фото */}
                            <div className="border-t pt-4">
                                <h3 className="text-sm font-medium mb-3">
                                    Фотографии
                                </h3>

                                {/* Превью загруженных фото */}
                                {editOrder.url && editOrder.url.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mb-3">
                                        {editOrder.url.map((photo, index) => (
                                            <div
                                                key={index}
                                                className="relative group"
                                            >
                                                <Image
                                                    src={photo}
                                                    alt={`Фото ${index + 1}`}
                                                    width={100}
                                                    height={100}
                                                    className="w-full h-24 object-cover rounded border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removePhoto(index)
                                                    }
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <input
                                    type="file"
                                    ref={fileRef}
                                    className="hidden"
                                    accept=".png,.jpg,.jpeg,.webp,image/*"
                                    multiple
                                    onChange={handleFileUpload}
                                    capture="environment" // Это позволит на телефоне сразу открыть камеру
                                />
                                <Button
                                    type="button"
                                    className="w-full"
                                    onClick={handleDownloadFiles}
                                    disabled={isUploading}
                                >
                                    {isUploading
                                        ? 'Загрузка...'
                                        : 'Загрузить фото'}
                                </Button>
                                <p className="text-xs text-gray-500 text-center mt-1">
                                    Поддерживаются: PNG, JPG, JPEG, WebP
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    type="button"
                                    onClick={() => setOpenMore(false)}
                                    variant="outline"
                                >
                                    Отмена
                                </Button>
                                <Button>Изменить</Button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
