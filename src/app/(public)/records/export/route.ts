import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const records = await prisma.record.findMany({
    orderBy: { createdAt: "asc" },
  });
  const delimiter = ";";
  const csvRows: string[] = [];

  // Ряд 1: "Место хранения" (занимает 2 колонки), затем Количество, Резерв, Свободный остаток
  // Всего 5 столбцов: A,B,C,D,E
  csvRows.push(
    ["Место хранения", "", "Количество", "Резерв", "Свободный остаток"].join(
      delimiter
    )
  );

  // Ряд 2: подзаголовки под A/B
  csvRows.push(["Номенклатура", "Характеристики", "", "", ""].join(delimiter));

  // Ряд 3: Новый склад
  csvRows.push(["Новый склад", "", "", "", ""].join(delimiter));
  for (const r of records) {
    const reserve = 0;
    const free = r.quantity - reserve;
    const row = [
      escapeCsv(r.title), // A: Номенклатура
      escapeCsv(r.description ?? ""), // B: Характеристики
      String(r.quantity), // C: Количество
      String(reserve), // D: Резерв
      String(free), // E: Свободный остаток
    ];
    csvRows.push(row.join(delimiter));
  }
  const csv = "\uFEFF" + csvRows.join("\n");
  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="records.csv"`,
    },
  });
}

function escapeCsv(value: string) {
  if (
    value.includes("\n") ||
    value.includes(";") ||
    value.includes(",") ||
    value.includes('"')
  ) {
    return '"' + value.replaceAll('"', '""') + '"';
  }
  return value;
}
