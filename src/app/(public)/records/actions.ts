"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createRecord(data: {
  title: string;
  description?: string | null;
  quantity?: number | null;
}) {
  const record = await prisma.record.create({
    data: {
      title: data.title,
      description: data?.description ?? null,
      quantity: data?.quantity ?? 0,
    },
  });
  revalidatePath("/records");
  return record;
}

export async function updateRecord(
  id: string,
  data: {
    title?: string;
    description?: string | null;
    quantity?: number | null;
  }
) {
  const record = await prisma.record.update({
    where: { id },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined
        ? { description: data.description }
        : {}),
      ...(data.quantity !== undefined ? { quantity: data.quantity ?? 0 } : {}),
    },
  });
  revalidatePath("/records");
  return record;
}

export async function deleteRecord(id: string) {
  await prisma.record.delete({ where: { id } });
  revalidatePath("/records");
}

export async function listRecords() {
  return prisma.record.findMany({ orderBy: { createdAt: "desc" } });
}
