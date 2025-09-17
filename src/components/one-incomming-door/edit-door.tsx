"use client";

import { Button } from "@/shared/button";
import { Door } from "@/shared/type";
import { PencilLine } from "lucide-react";

export function EditDoor({ door }: { door: Door }) {
  return (
    <Button>
      <PencilLine size={14} />
    </Button>
  );
}
