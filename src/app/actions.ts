"use server";
import { prisma } from "@/lib/prisma";
import { Door } from "@/shared/type";
import { revalidatePath } from "next/cache";

export async function countUp(id: string) {
  if (!id) return;
  await prisma.door.update({
    where: { id },
    data: { count: { increment: 1 } },
  });
  revalidatePath("/");
}

export async function countDown(id: string) {
  if (!id) return;
  await prisma.door.update({
    where: { id },
    data: { count: { decrement: 1 } },
  });
  revalidatePath("/");
}

export async function updateDoor(door: Door) {
  if (!door) return;
  await prisma.door.update({
    where: { id: door.id },
    data: {
      name: door.name,
      description: door.description,
      size: door.size,
      opening: door.opening,
      color: door.color,
      innerPanelColor: door.innerPanelColor,
    },
  });

  revalidatePath("/");
}
