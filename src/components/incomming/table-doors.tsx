"use client";
import clsx from "clsx";
import { useMemo, useState } from "react";
import EditDoorModal from "./edit-door";
import { Door } from "@/shared/type";
import { DeleteDoor } from "./delite-door";
import { CountUp } from "./count-up";
import { CountDown } from "./count-down";
import { IterationCcw } from "lucide-react";

export function TableDoors({ doors }: { doors: Door[] }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [filterWidth860, setFilterWidth860] = useState<boolean>(false);
  const [filterWidth960, setFilterWidth960] = useState<boolean>(false);
  const [filterLeft, setFilterLeft] = useState<boolean>(false);
  const [filterRight, setFilterRight] = useState<boolean>(false);
  const [searchColor, setSearchColor] = useState<string>("");
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const filteredDoors = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const color = searchColor.trim().toLowerCase();
    const activeWidths: string[] = [
      filterWidth860 ? "860" : "",
      filterWidth960 ? "960" : "",
    ].filter(Boolean);
    const activeOpenings: Door["opening"][] = [
      filterLeft ? "LEFT" : ("" as any),
      filterRight ? "RIGHT" : ("" as any),
    ].filter(Boolean) as Door["opening"][];

    const extractWidth = (size: string): string => {
      const [width] = size.split(/[xх]/i);
      return (width || "").trim();
    };

    return doors.filter((d) => {
      const matchesAvailability = !isAvailable || d.count > 0;
      const matchesSearch = !term || d.name.toLowerCase().includes(term);
      const matchesColor = !color || d.color.toLowerCase().includes(color);

      const width = extractWidth(d.size);
      const matchesWidth =
        activeWidths.length === 0 || activeWidths.includes(width);
      const matchesOpening =
        activeOpenings.length === 0 || activeOpenings.includes(d.opening);
      return (
        matchesAvailability &&
        matchesSearch &&
        matchesWidth &&
        matchesOpening &&
        matchesColor
      );
    });
  }, [
    doors,
    searchTerm,
    searchColor,
    isAvailable,
    filterWidth860,
    filterWidth960,
    filterLeft,
    filterRight,
  ]);

  function clearFilter() {
    setSearchTerm("");
    setIsAvailable(false);
    setFilterWidth860(false);
    setFilterWidth960(false);
    setFilterLeft(false);
    setFilterRight(false);
    setSearchColor("");
  }

  return (
    <>
      <button
        className="px-4 py-1 rounded-lg bg-green-600 text-white font-semibold w-[320px] my-2 cursor-pointer"
        onClick={() => setIsOpenFilter(!isOpenFilter)}
      >
        {isOpenFilter ? "Фильтры -" : "Фильтры +"}
      </button>
      {isOpenFilter && (
        <>
          <div className="flex gap-4 items-start">
            <div className="flex gap-4">
              <p>В наличии</p>
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              />
            </div>
            <div className="border-x px-4">
              <div className="flex gap-4">
                <p>860</p>
                <input
                  type="checkbox"
                  checked={filterWidth860}
                  onChange={(e) => setFilterWidth860(e.target.checked)}
                />
              </div>

              <div className="flex gap-4">
                <p>960</p>
                <input
                  type="checkbox"
                  checked={filterWidth960}
                  onChange={(e) => setFilterWidth960(e.target.checked)}
                />
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex gap-4">
                <p>Левая</p>
                <input
                  type="checkbox"
                  checked={filterLeft}
                  onChange={(e) => setFilterLeft(e.target.checked)}
                />
              </div>
              <div className="flex gap-4">
                <p>Правая</p>
                <input
                  type="checkbox"
                  checked={filterRight}
                  onChange={(e) => setFilterRight(e.target.checked)}
                />
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="searchColor" className="text-xs lg:text-sm">
                Поиск по цвету
              </label>
              <input
                name="searchColor"
                type="text"
                placeholder="Поиск по цвету"
                value={searchColor}
                onChange={(e) => setSearchColor(e.target.value)}
                className="w-[330px] p-1 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </>
      )}
      <div className="flex items-end gap-3">
        <div className="flex flex-col">
          <label htmlFor="searchTerm" className="text-xs lg:text-sm">
            Поиск по имени
          </label>
          <input
            name="searchTerm"
            type="text"
            placeholder="Поиск по названию"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[250px] lg:w-[350px] p-1 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          className="px-4 py-1 rounded-lg bg-green-600 text-white font-semibold cursor-pointer"
          onClick={clearFilter}
        >
          <IterationCcw />
        </button>
      </div>

      <div className="w-full overflow-x-auto text-sm lg:text-[18px]">
        <table className="border mt-4 min-w-[900px]">
          <thead>
            <tr className="border">
              <th className="px-2 ">№</th>
              <th className="px-2">Название</th>
              <th className="px-2">Открыв</th>
              <th className="px-2">Размер</th>
              <th className="px-2">Цвет</th>
              <th className="px-2">Панель</th>
              <th className="px-2">Кол-во</th>
              <th className="px-2">Описание</th>
              <th className="px-2">Ред</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoors.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center">
                  Пока нет записей
                </td>
              </tr>
            ) : (
              filteredDoors.map((d, i) => (
                <tr
                  className={clsx("border", {
                    "bg-gray-100": (i + 1) % 2 === 0,
                    "bg-gray-200": (i + 1) % 2 === 1,
                  })}
                  key={d.id}
                >
                  <td className="px-2 align-top">{i + 1}</td>
                  <td className="px-2 align-top">{d.name}</td>
                  <td className="px-2 align-top">{d.opening}</td>
                  <td className="px-2 align-top">{d.size}</td>
                  <td className="px-2 align-top">{d.color}</td>
                  <td className="px-2 align-top">{d.innerPanelColor}</td>
                  <td className="px-2 flex py-1 gap-2 items-center align-top">
                    <CountUp id={d.id} name={d.name} />
                    <p>{d.count}</p>
                    <CountDown id={d.id} name={d.name} />
                  </td>
                  <td className="px-2">{d.description}</td>
                  <td className="px-2 flex py-1 gap-2 items-center">
                    <EditDoorModal door={d} />
                    <DeleteDoor id={d.id} name={d.name} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
