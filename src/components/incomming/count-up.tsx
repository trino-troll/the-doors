"use client";
import { countUp } from "@/app/actions";
import { Loader2, Plus, X } from "lucide-react";
import { useState, useTransition } from "react";

export function CountUp({ id, name }: { id: string; name: string }) {
  const [openUp, setOpenUp] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleCountUp = async () => {
    setOpenUp(false);
    startTransition(async () => {
      await countUp(id);
    });
  };

  return (
    <>
      <button
        className="w-full max-w-md px-2 lg:px-3 py-1 text-white cursor-pointer bg-green-600 rounded"
        onClick={() => setOpenUp(true)}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <span className="block lg:hidden">
              <Plus size={14} strokeWidth={3} />
            </span>
            <span className="hidden lg:block">
              <Plus strokeWidth={3} />
            </span>
          </>
        )}
      </button>

      {openUp ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenUp(false)}
          />
          <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold">Увеличение количества</h2>
              <button
                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                onClick={() => setOpenUp(false)}
                aria-label="Закрыть"
              >
                <X />
              </button>
            </div>

            <h2>Увеличить количество дверей {name} ?</h2>

            <form className="grid grid-cols-2 gap-3" onSubmit={handleCountUp}>
              <button
                type="button"
                className="px-3 py-2 rounded border cursor-pointer"
                onClick={() => setOpenUp(false)}
              >
                Отмена
              </button>
              <button
                className="px-4 py-2 text-white bg-green-600 rounded cursor-pointer"
                disabled={isPending}
              >
                Увеличить
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
