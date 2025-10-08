import { OrderInStock } from '@/shared/type';
import clsx from 'clsx';
import { Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function LoadeFiles({
    setEditOrder,
    order,
}: {
    setEditOrder: (order: OrderInStock) => void;
    order: OrderInStock;
}) {
    const [openImage, setOpenImage] = useState<boolean>(false);
    const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

    async function removePhoto(index: number) {
        const photos = order.url || [];
        const fileUrl = photos[index];
        if (!fileUrl) return;

        try {
            setDeletingIndex(index);
            const resp = await fetch('/api/upload/deleteFiles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: order.id,
                    files: [fileUrl],
                }),
            });

            const result = await resp.json();
            if (!resp.ok || !result.success) {
                const msg = result?.error || 'Не удалось удалить файл';
                alert(msg);
                return;
            }

            const updatedPhotos = photos.filter((_, i) => i !== index);
            setEditOrder({ ...order, url: updatedPhotos });
        } catch (e) {
            console.error(e);
            alert('Ошибка при удалении файла');
        } finally {
            setDeletingIndex(null);
        }
    }
    return (
        <div className="grid grid-cols-3 gap-2 mb-3">
            {order.url &&
                order.url.map((photo, index) => (
                    <div key={index} className="relative group">
                        {openImage && (
                            <div
                                onClick={() => setOpenImage(false)}
                                className="bg-red-400 fixed inset-0 z-20 h-[100] w-full flex justify-center items-center"
                            >
                                <img
                                    className="h-[90%]"
                                    src={photo}
                                    alt="Информационное фото"
                                    onClick={() => setOpenImage(false)}
                                />
                            </div>
                        )}
                        <Image
                            src={photo}
                            alt={`Фото ${index + 1}`}
                            width={100}
                            height={100}
                            className="w-full h-24 object-cover rounded border"
                            onClick={() => setOpenImage(!openImage)}
                        />
                        <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            disabled={deletingIndex === index}
                            className={clsx(
                                'absolute -top-2 -right-2 rounded-full p-1 transition-opacity',
                                'bg-red-500 text-white',
                                'opacity-0 group-hover:opacity-100',
                                {
                                    'opacity-50 cursor-not-allowed group-hover:opacity-50':
                                        deletingIndex === index,
                                }
                            )}
                        >
                            {deletingIndex === index ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <Trash2 size={14} />
                            )}
                        </button>
                    </div>
                ))}
        </div>
    );
}
