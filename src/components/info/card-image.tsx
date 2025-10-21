'use client';
import { useState } from 'react';

export function CardImage({ imageName }: { imageName: string }) {
    const [openImage, setOpenImage] = useState<boolean>(false);
    return (
        <>
            <div className="min-h-[200px] rounded-t-lg p-2 pb-0 ">
                {imageName && (
                    <div className="h-full cursor-pointer">
                        <img
                            src={'/info/' + imageName}
                            className="rounded-lg"
                            onClick={() => setOpenImage(true)}
                        />
                    </div>
                )}
            </div>
            {openImage && (
                <div className="fixed inset-0 flex items-center justify-center ">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenImage(false)}
                    />

                    <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg flex items-center justify-center">
                        <img
                            src={'/info/' + imageName}
                            className="rounded-lg h-[80%]"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
