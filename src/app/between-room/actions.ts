"use server";

import { prisma } from "@/lib/prisma";
import { routes } from "@/shared/const";
import { BetweenDoor } from "@/shared/type";
import { revalidatePath } from "next/cache";

export async function addBetweenDoor({ name }: { name: string }) {
  await prisma.betweenDoor.create({
    data: { name },
  });

  revalidatePath(routes.BENWEEN_ROOM); // обновить список всех межкомнатных дверей
}

export async function getBetweenDoors() {
  return await prisma.betweenDoor.findMany({ orderBy: { name: "asc" } });
}

export async function updateBetweenDoor({ door }: { door: BetweenDoor }) {
  if (!door) return;

  await prisma.betweenDoor.update({
    where: { id: door.id },
    data: {
      name: door.name,
      factory: door.factory,
      is600: door.is600,
      is700: door.is700,
      is800: door.is800,
      is900: door.is900,
      analog: door.analog,
      colors: door.colors,
      innerFilling: door.innerFilling,
      comment: door.comment,
      fotoUrl: door.fotoUrl,
      materials: door.materials,
    },
  });

  revalidatePath(routes.BENWEEN_ROOM);
}

export async function oneBetweenDoor({ id }: { id: string }) {
  if (!id) return;
  return await prisma.betweenDoor.findFirst({ where: { id } });
}

export async function createColor({
  name,
  url,
}: {
  name: string;
  url: string | null;
}) {
  await prisma.color.create({ data: { name, url } });
}

export async function getColors() {
  return await prisma.color.findMany();
}
