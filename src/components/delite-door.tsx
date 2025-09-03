"use client";
import { deleteDoor } from "@/app/actions";
import { Trash2 } from "lucide-react";

export function DeleteDoor({ id }: { id: string }) {
  return (
    <form action={() => deleteDoor(id)}>
      <button className="p-2 py-1 rounded-lg bg-red-500 cursor-pointer">
        <span className="block lg:hidden">
          <Trash2 color="white" strokeWidth={3} size={14} />
        </span>
        <span className="hidden lg:block">
          <Trash2 color="white" strokeWidth={3} />
        </span>
      </button>
    </form>
  );
}
