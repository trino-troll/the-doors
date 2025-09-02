import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import AddDoorModal from "@/components/AddDoorModal";
import { TableDoors } from "@/components/table-doors";

async function createDoor(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const size = String(formData.get("size") || "").trim();
  const opening = String(formData.get("opening") || "").trim();
  const color = String(formData.get("color") || "").trim();
  const innerPanelColor = String(formData.get("innerPanelColor") || "").trim();

  if (!name || !size || !opening || !color || !innerPanelColor) {
    return;
  }

  await prisma.door.create({
    data: {
      name,
      description,
      size,
      opening: opening === "LEFT" ? "LEFT" : "RIGHT",
      color,
      innerPanelColor,
      count: 1,
    },
  });

  revalidatePath("/");
}

export default async function Home() {
  const doors = await prisma.door.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <div className="flex gap-4">
        <h1 className="text-xl font-semibold">Двери в наличии на складе</h1>
        <AddDoorModal action={createDoor} />
      </div>

      {doors === null ? <p>Нет списка дверей</p> : <TableDoors doors={doors} />}
    </div>
  );
}
