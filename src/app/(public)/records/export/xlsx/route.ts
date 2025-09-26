import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";

export const dynamic = "force-dynamic";

export async function GET() {
  const records = await prisma.record.findMany({
    orderBy: { createdAt: "asc" },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Записи");

  // Колонки A..E
  sheet.columns = [
    { header: "", key: "a", width: 60 }, // Место хранения (объединённая шапка над A:B)
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

  // Стили шапки (бежевый фон)
  const headerFill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFF5E6CC" },
  }; // светло-бежевый
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
  for (const r of records) {
    sheet.getCell(`A${rowIdx}`).value = r.title;
    sheet.getCell(`B${rowIdx}`).value = r.description ?? "";
    sheet.getCell(`C${rowIdx}`).value = r.quantity;
    sheet.getCell(`D${rowIdx}`).value = 0;
    sheet.getCell(`E${rowIdx}`).value = r.quantity;
    rowIdx++;
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return new NextResponse(buffer, {
    headers: {
      "content-type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "content-disposition": `attachment; filename="records.xlsx"`,
    },
  });
}
