"use client";

import { useState } from "react";

type RecordType = {
  id: string;
  title: string;
  description: string | null;
  quantity: number;
};

export function EditRow({
  record,
  onUpdate,
  onDelete,
}: {
  record: RecordType;
  onUpdate: (formData: FormData) => Promise<void>;
  onDelete: (formData: FormData) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <div className="flex gap-2">
        <button
          type="button"
          className="bg-blue-600 text-white rounded px-2 py-1"
          onClick={() => setOpen(true)}
        >
          Редактировать
        </button>
        <form action={onDelete}>
          <input type="hidden" name="id" value={record.id} />
          <button className="bg-red-600 text-white rounded px-2 py-1">
            Удалить
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <form action={onUpdate} className="flex flex-col gap-2 sm:flex-row">
        <input type="hidden" name="id" value={record.id} />
        <input
          name="title"
          defaultValue={record.title}
          className="border rounded p-1 w-40"
          required
        />
        <input
          name="description"
          defaultValue={record.description ?? ""}
          className="border rounded p-1 w-56"
        />
        <input
          name="quantity"
          type="number"
          defaultValue={record.quantity}
          className="border rounded p-1 w-24"
        />
        <button className="bg-blue-600 text-white rounded px-2 py-1">
          Сохранить
        </button>
      </form>
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded px-2 py-1 border"
          onClick={() => setOpen(false)}
        >
          Отмена
        </button>
      </div>
    </div>
  );
}
