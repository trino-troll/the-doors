"use client";

import { dropCountAll } from "@/app/actions";
import { IterationCcw, Loader2, X } from "lucide-react";
import { useState, useTransition } from "react";

export function DropCountAll() {
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  async function handleDrop() {
    setOpenDrop(false);
    startTransition(async () => {
      await dropCountAll();
    });
  }

  return (
    <>
      <button
        disabled={isPending}
        onClick={() => setOpenDrop(true)}
        className="px-2 lg:px-3 py-1 text-white cursor-pointer bg-red-600 rounded"
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <span className="block lg:hidden">
              <IterationCcw strokeWidth={3} size={14} />
            </span>
            <span className="hidden lg:block">
              <IterationCcw strokeWidth={3} />
            </span>
          </>
        )}
      </button>

      {openDrop ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenDrop(false)}
          ></div>
          <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold">
                Сброс количества дверей на 0
              </h2>
              <button
                className="px-2 py-1 text-sm text-gray-600 hover:text-black cursor-pointer"
                onClick={() => setOpenDrop(false)}
                aria-label="Закрыть"
              >
                <X />
              </button>
            </div>
            <h2>
              Сбросить количество дверей на 0 для инвентаризации дверей на
              складе?
            </h2>
            <p className="text-red-600 mt-2 font-semibold">
              Это приведет все двери к количеству равному 0
            </p>

            <form onSubmit={handleDrop} className="grid grid-cols-2 gap-3 mt-2">
              <button
                className="px-3 py-2 rounded-lg  border cursor-pointer"
                onClick={() => setOpenDrop(false)}
              >
                Отмена
              </button>
              <button
                disabled={isPending}
                className="px-3 py-2 text-white bg-red-600 rounded-lg cursor-pointer"
              >
                Обнулить
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
