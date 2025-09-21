"use client";
import { deleteDoor } from "@/app/actions";
import { deletePrice } from "@/app/price/action";
import { Button } from "@/shared/button";
import { Loader2, Trash2, X } from "lucide-react";
import { useState, useTransition } from "react";

export function DeletePrice({ id, name }: { id: string; name: string }) {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  async function handleDeleteDoor() {
    setOpenDelete(false);
    startTransition(async () => {
      await deletePrice({ id });
    });
  }
  return (
    <>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => setOpenDelete(true)}
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <span className="block lg:hidden">
              <Trash2 color="white" strokeWidth={3} size={14} />
            </span>
            <span className="hidden lg:block">
              <Trash2 color="white" strokeWidth={3} size={16} />
            </span>
          </>
        )}
      </Button>

      {openDelete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenDelete(false)}
          />
          <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold">Удаление записи</h2>
              <button
                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                onClick={() => setOpenDelete(false)}
                aria-label="Закрыть"
              >
                <X />
              </button>
            </div>

            <h2>Удаление запеси о цена на {name} ?</h2>

            <form
              onSubmit={handleDeleteDoor}
              className="grid grid-cols-2 gap-3"
            >
              <button
                type="button"
                className="px-3 py-2 rounded border cursor-pointer"
                onClick={() => setOpenDelete(false)}
              >
                Отмена
              </button>
              <Button variant="destructive" disabled={isPending}>
                Удалить
              </Button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
