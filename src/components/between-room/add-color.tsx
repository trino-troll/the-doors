"use client";

import { createColor } from "@/app/between-room/actions";
import { Button } from "@/shared/button";
import { Input } from "@/shared/input";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddColor() {
  const [openColor, setOpenColor] = useState<boolean>(false);
  const [colorName, setColorName] = useState<string>("");
  const [colorUrl, setColorUrl] = useState<string>("");

  function clearForm() {
    setColorUrl("");
    setColorName("");
    setOpenColor(false);
  }

  return (
    <>
      <Button
        onClick={() => setOpenColor(true)}
        size="sm"
        className="h-6 w-8 cursor-pointer"
      >
        <>
          <span className="block lg:hidden">
            <Plus strokeWidth={3} size={14} />
          </span>
          <span className="hidden lg:block">
            <Plus strokeWidth={3} />
          </span>
        </>
      </Button>

      {openColor ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenColor(false)}
          />
          <div className="relative z-10 w-[calc(100% -32px)] max-w-md rounded-lg bg-white p-4 shadow-lg ">
            <form
              onSubmit={clearForm}
              action={() => createColor({ name: colorName, url: colorUrl })}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col">
                <label htmlFor="nameColor" className="text-xs lg:text-sm">
                  Название
                </label>
                <Input
                  placeholder="название цвета"
                  name="nameColor"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="urlColor" className="text-xs lg:text-sm">
                  URL
                </label>
                <Input
                  placeholder="url"
                  name="urlColor"
                  value={colorUrl}
                  onChange={(e) => setColorUrl(e.target.value)}
                />
              </div>
              <Button size="sm" className="w-full cursor-pointer">
                Создать
              </Button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
