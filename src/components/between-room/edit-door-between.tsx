"use client";

import { updateBetweenDoor } from "@/app/between-room/actions";
import { Input } from "@/shared/input";
import { BetweenDoor } from "@/shared/type";
import { Pencil, X } from "lucide-react";
import { useState } from "react";

export function EditBetweenDoor({ door }: { door: BetweenDoor }) {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editDoor, setEditDoor] = useState<BetweenDoor>(door);
  const [sizes, setSizes] = useState<{
    is600: string;
    is700: string;
    is800: string;
    is900: string;
  }>({
    is600: door.is600?.toString() ?? "",
    is700: door.is700?.toString() ?? "",
    is800: door.is800?.toString() ?? "",
    is900: door.is900?.toString() ?? "",
  });

  return (
    <>
      <button
        className="px-2 py-1 text-white bg-green-600 rounded cursor-pointer"
        onClick={() => setOpenEdit(true)}
      >
        <>
          <span className="block lg:hidden">
            <Pencil strokeWidth={3} size={14} />
          </span>
          <span className="hidden lg:block">
            <Pencil strokeWidth={3} />
          </span>
        </>
      </button>

      {openEdit ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenEdit(false)}
          />
          <div className="relative z-10 w-[calc(100%-32px)] max-w-md rounded-lg bg-white p-4 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold">Редактирование дверь</h2>
              <button
                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                onClick={() => setOpenEdit(false)}
                aria-label="Закрыть"
              >
                <X />
              </button>
            </div>

            <form
              action={() =>
                updateBetweenDoor({
                  door: {
                    ...editDoor,
                    is600: Number(sizes.is600),
                    is700: Number(sizes.is700),
                    is800: Number(sizes.is800),
                    is900: Number(sizes.is900),
                  },
                })
              }
              onSubmit={() => setOpenEdit(false)}
              className="grid grid-cols-1 gap-3"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-xs">
                  Название
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Напр. Стальная 3К"
                  className="border rounded px-2 py-1"
                  required
                  value={editDoor.name}
                  onChange={(e) =>
                    setEditDoor({ ...editDoor, name: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="factory" className="text-xs">
                  Завод
                </label>
                <Input
                  name="factory"
                  placeholder="Завод"
                  className="border rounded px-2 py-1"
                  value={editDoor.factory ?? ""}
                  onChange={(e) =>
                    setEditDoor({ ...editDoor, factory: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="is600" className="text-xs lg:text-sm">
                    600
                  </label>
                  <Input
                    className="w-16"
                    placeholder="Кол-во "
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="is600"
                    value={sizes.is600}
                    onChange={(e) =>
                      setSizes({ ...sizes, is600: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="is700" className="text-xs lg:text-sm">
                    700
                  </label>
                  <Input
                    className="w-16"
                    placeholder="Кол-во"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="is700"
                    value={sizes.is700}
                    onChange={(e) =>
                      setSizes({ ...sizes, is700: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="is800" className="text-xs lg:text-sm">
                    800
                  </label>
                  <Input
                    className="w-16"
                    placeholder="Кол-во"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="is800"
                    value={sizes.is800}
                    onChange={(e) =>
                      setSizes({ ...sizes, is800: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="is900" className="text-xs lg:text-sm ">
                    900
                  </label>
                  <Input
                    className="w-16"
                    placeholder="Кол-во"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="is900"
                    value={sizes.is900}
                    onChange={(e) =>
                      setSizes({ ...sizes, is900: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="materials" className="text-xs">
                  Материал
                </label>
                <Input
                  name="materials"
                  placeholder="Завод"
                  className="border rounded px-2 py-1"
                  value={editDoor.materials ?? ""}
                  onChange={(e) =>
                    setEditDoor({ ...editDoor, materials: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="colors" className="text-xs">
                  Доступные цвета
                </label>
                <textarea
                  name="colors"
                  placeholder="Капучино"
                  className="border rounded px-2 py-1"
                  value={editDoor.colors ?? ""}
                  onChange={(e) =>
                    setEditDoor({ ...editDoor, colors: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="innerFilling" className="text-xs">
                  Внутреннее наполнение
                </label>
                <textarea
                  name="innerFilling"
                  placeholder="Полнотелое"
                  className="border rounded px-2 py-1"
                  value={editDoor.innerFilling ?? ""}
                  onChange={(e) =>
                    setEditDoor({ ...editDoor, innerFilling: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="comment" className="text-xs">
                  Комментарий
                </label>
                <textarea
                  name="comment"
                  placeholder="Комментарий"
                  className="border rounded px-2 py-1"
                  value={editDoor.comment ?? ""}
                  onChange={(e) =>
                    setEditDoor({ ...editDoor, comment: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="analog" className="text-xs">
                  Аналог
                </label>
                <textarea
                  name="analog"
                  placeholder="PV-02"
                  className="border rounded px-2 py-1"
                  value={editDoor.analog ?? ""}
                  onChange={(e) =>
                    setEditDoor({ ...editDoor, analog: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="fotoUrl" className="text-xs">
                  Ссылка на фото
                </label>
                <Input
                  name="fotoUrl"
                  type="text"
                  placeholder="Ссылка на фото"
                  className="border rounded px-2 py-1"
                  value={editDoor.fotoUrl ?? ""}
                  onChange={(e) =>
                    setEditDoor({
                      ...editDoor,
                      fotoUrl: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-end gap-2 mt-1">
                <button
                  type="button"
                  className="px-3 py-2 rounded border cursor-pointer"
                  onClick={() => setOpenEdit(false)}
                >
                  Отмена
                </button>
                <button className="px-4 py-2 text-white bg-green-600 rounded cursor-pointer">
                  Изменить
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
