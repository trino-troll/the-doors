"use server";

import { prisma } from "@/lib/prisma";
import { routes } from "@/shared/const";
import { Price } from "@/shared/type";
import { revalidatePath } from "next/cache";

export async function createPrice({
  name,
  price,
}: {
  name: string;
  price: string;
}) {
  await prisma.price.create({
    data: {
      name,
      price,
    },
  });

  revalidatePath(routes.PRICES);
}

export async function getPrices() {
  return await prisma.price.findMany({ orderBy: { name: "asc" } });
}

export async function updatePrice({ price }: { price: Price }) {
  if (!price) return;
  await prisma.price.update({
    where: { id: price.id },
    data: { name: price.name, price: price.price },
  });
  revalidatePath(routes.PRICES);
}

export async function deletePrice({ id }: { id: string }) {
  if (!id) return;
  await prisma.price.delete({ where: { id } });

  revalidatePath(routes.PRICES);
}

export async function fetchFilteredPrice({ query }: { query: string }) {
  return prisma.price.findMany({
    where: {
      name: {
        contains: query, // Ищет вхождения query в поле name
        mode: "insensitive", // Делает поиск без учета регистра (опционально, но рекомендуется)
      },
    },
  });
}
