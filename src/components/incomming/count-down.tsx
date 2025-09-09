"use client";
import { countDown } from "@/app/actions";
import { Loader2, Minus, X } from "lucide-react";
import { useState, useTransition } from "react";

export function CountDown({ id, name }: { id: string; name: string }) {
  const [openDown, setOpenDown] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleCountDown = async () => {
    setOpenDown(false);
    startTransition(async () => {
      await countDown(id);
    });
  };

  return (
    <>
      <button
        className="w-full max-w-md px-2 lg:px-3 py-1 text-white cursor-pointer bg-red-600 rounded"
        onClick={() => setOpenDown(true)}
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <span className="block lg:hidden">
              <Minus size={14} strokeWidth={3} />
            </span>
            <span className="hidden lg:block">
              <Minus strokeWidth={3} />
            </span>
          </>
        )}
      </button>

      {openDown ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenDown(false)}
          />
          <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold">Уменьшение количества</h2>
              <button
                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                onClick={() => setOpenDown(false)}
                aria-label="Закрыть"
              >
                <X />
              </button>
            </div>

            <h2>Уменьшить количество дверей {name} ?</h2>

            <form onSubmit={handleCountDown} className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="px-3 py-2 rounded border cursor-pointer"
                onClick={() => setOpenDown(false)}
              >
                Отмена
              </button>
              <button
                disabled={isPending}
                className="px-4 py-2 text-white bg-green-600 rounded cursor-pointer"
              >
                Уменьшить
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
