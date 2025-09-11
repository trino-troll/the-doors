"use client";

import Image from "next/image";
import { useState } from "react";

export function Art({ url }: { url: string | null }) {
  const [openArt, setOpenArt] = useState<boolean>(false);

  if (!url) return <div>Изображения нет</div>;
  return (
    <>
      <button className="cursor-pointer" onClick={() => setOpenArt(!openArt)}>
        <Image
          src={`/door-${url}.jpg`}
          alt={`Арт №${url}`}
          width={100}
          height={200}
        />
      </button>

      {openArt ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenArt(false)}
          />
          <div className="relative z-10 w-[cals(100% - 32px)] max-w-md rounded-lg bg-white p-4 shadow-lg">
            <Image
              src={`/door-${url}.jpg`}
              alt={`Арт №${url}`}
              width={400}
              height={800}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
