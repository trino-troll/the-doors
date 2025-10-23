import {
  createRecord,
  deleteRecord,
  listRecords,
  updateRecord,
} from "./actions";
import { revalidatePath } from "next/cache";
import { EditRow } from "@/components/records/edit-row";

export const dynamic = "force-dynamic";

export default async function RecordsPage() {
  const records = await listRecords();

  async function onCreate(formData: FormData) {
    "use server";
    const title = String(formData.get("title") || "").trim();
    const description =
      String(formData.get("description") || "").trim() || null;
    const quantity = Number(formData.get("quantity") || 0);
    if (!title) return;
    await createRecord({
      title,
      description,
      quantity: Number.isFinite(quantity) ? quantity : 0,
    });
    revalidatePath("/records");
  }

  async function onUpdate(formData: FormData) {
    "use server";
    const id = String(formData.get("id") || "");
    const title = String(formData.get("title") || "").trim();
    const description =
      String(formData.get("description") || "").trim() || null;
    const quantity = Number(formData.get("quantity") || 0);
    if (!id || !title) return;
    await updateRecord(id, {
      title,
      description,
      quantity: Number.isFinite(quantity) ? quantity : 0,
    });
    revalidatePath("/records");
  }

  async function onDelete(formData: FormData) {
    "use server";
    const id = String(formData.get("id") || "");
    if (!id) return;
    await deleteRecord(id);
    revalidatePath("/records");
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">Записи</h1>

      <form action={onCreate} className="grid gap-2 max-w-md">
        <input
          name="title"
          placeholder="Название"
          className="border rounded p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Описание"
          className="border rounded p-2"
          rows={3}
        />
        <input
          name="quantity"
          placeholder="Количество"
          type="number"
          className="border rounded p-2"
          defaultValue={0}
        />
        <button className="bg-black text-white rounded px-3 py-2 w-fit">
          Добавить
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 border">Название</th>
              <th className="p-2 border">Описание</th>
              <th className="p-2 border">Кол-во</th>
              <th className="p-2 border w-[220px]">Действия</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td className="p-2 border align-top">{r.title}</td>
                <td className="p-2 border align-top whitespace-pre-wrap">
                  {r.description}
                </td>
                <td className="p-2 border align-top">{r.quantity}</td>
                <td className="p-2 border">
                  <EditRow record={r} onUpdate={onUpdate} onDelete={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <form action="/records/export/xlsx" method="get">
          <button className="bg-amber-600 text-white rounded px-3 py-2">
            Экспорт XLSX
          </button>
        </form>
      </div>
    </div>
  );
}
