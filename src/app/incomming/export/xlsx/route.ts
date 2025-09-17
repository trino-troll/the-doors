import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";

export const dynamic = "force-dynamic";

export async function GET() {
  const doors = await prisma.door.findMany({
    where: { count: { gt: 0 } },
    orderBy: { name: "asc" },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Двери (склад)");

  // Колонки A..E
  sheet.columns = [
    { header: "", key: "a", width: 60 },
    { header: "", key: "b", width: 40 },
    { header: "", key: "c", width: 16 },
    { header: "", key: "d", width: 12 },
    { header: "", key: "e", width: 18 },
  ];

  // Ряд 1
  sheet.getCell("A1").value = "Место хранения";
  sheet.mergeCells("A1:B1");
  sheet.getCell("C1").value = "Количество";
  sheet.getCell("D1").value = "Резерв";
  sheet.getCell("E1").value = "Свободный остаток";

  // Ряд 2
  sheet.getCell("A2").value = "Номенклатура";
  sheet.getCell("B2").value = "Характеристики";

  // Ряд 3
  sheet.getCell("A3").value = "Новый склад";
  sheet.mergeCells("A3:B3");

  // Объединить вертикальные блоки для заголовков C/D/E
  sheet.mergeCells("C1:C3");
  sheet.mergeCells("D1:D3");
  sheet.mergeCells("E1:E3");

  // Стили шапки
  const headerFill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFF5E6CC" },
  } as const;
  const headerCells = ["A1", "C1", "D1", "E1", "A2", "B2", "A3"];
  for (const addr of headerCells) {
    const cell = sheet.getCell(addr);
    cell.fill = headerFill as any;
    cell.font = { bold: true } as any;
    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    } as any;
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    } as any;
  }

  // Данные с 4-й строки
  let rowIdx = 4;
  for (const d of doors) {
    const openingRu = d.opening === "LEFT" ? "Левое" : "Правое";
    const characteristicsParts: string[] = [];
    if (d.size) characteristicsParts.push(`Размер: ${d.size}`);
    if (d.color) characteristicsParts.push(`Цвет: ${d.color}`);
    if (d.innerPanelColor)
      characteristicsParts.push(`Внутр. панель: ${d.innerPanelColor}`);
    characteristicsParts.push(`Открывание: ${openingRu}`);
    if (d.description) characteristicsParts.push(d.description);

    sheet.getCell(`A${rowIdx}`).value = d.name;
    sheet.getCell(`B${rowIdx}`).value = characteristicsParts.join("; ");
    sheet.getCell(`C${rowIdx}`).value = d.count ?? 0;
    sheet.getCell(`D${rowIdx}`).value = 0;
    sheet.getCell(`E${rowIdx}`).value = d.count ?? 0;
    rowIdx++;
  }

  // Итоги: суммируем C и E, подпись в A
  const startDataRow = 4;
  const lastDataRow = rowIdx - 1;
  const totalRow = rowIdx;

  sheet.getCell(`A${totalRow}`).value = "Итого";
  sheet.getCell(`A${totalRow}`).font = { bold: true } as any;

  if (lastDataRow >= startDataRow) {
    sheet.getCell(`C${totalRow}`).value = {
      formula: `SUM(C${startDataRow}:C${lastDataRow})`,
    } as any;
    sheet.getCell(`E${totalRow}`).value = {
      formula: `SUM(E${startDataRow}:E${lastDataRow})`,
    } as any;
  } else {
    sheet.getCell(`C${totalRow}`).value = 0;
    sheet.getCell(`E${totalRow}`).value = 0;
  }

  sheet.getCell(`C${totalRow}`).font = { bold: true } as any;
  sheet.getCell(`E${totalRow}`).font = { bold: true } as any;

  const buffer = await workbook.xlsx.writeBuffer();
  const now = new Date().toLocaleDateString();
  return new NextResponse(buffer, {
    headers: {
      "content-type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "content-disposition": `attachment; filename="doors-incomming-${now}.xlsx"`,
    },
  });
}
