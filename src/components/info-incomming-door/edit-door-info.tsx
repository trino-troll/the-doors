'use client';
import { editInfoIncommingDoor } from '@/app/(private)/info/actions';
import { Button } from '@/shared/button';
import { Input } from '@/shared/input';
import { IncommingDoor } from '@/shared/type';
import { PenSquare, X } from 'lucide-react';
import { useState } from 'react';

export function EditDoorInfo({ door }: { door: IncommingDoor }) {
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [currentDoor, setCurrentDoor] = useState<IncommingDoor>(door);

    function closeEdit() {
        setOpenEdit(false);
        setCurrentDoor(door);
    }

    return (
        <>
            <Button onClick={() => setOpenEdit(true)}>
                <>
                    <span className="block lg:hidden">
                        <PenSquare strokeWidth={3} size={14} />
                    </span>
                    <span className="hidden lg:block">
                        <PenSquare strokeWidth={3} />
                    </span>
                </>
            </Button>

            {openEdit ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenEdit(false)}
                    />
                    <div className="relative z-10 w-[90%] md:w-[calc(100% -32)] max-w-md rounded-lg bg-white p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">
                                Редактирование справочной информации
                            </h2>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 hover:text-black"
                                onClick={() => setOpenEdit(false)}
                                aria-label="Закрыть"
                            >
                                <X />
                            </button>
                        </div>

                        <form
                            action={() =>
                                editInfoIncommingDoor({ door: currentDoor })
                            }
                            onSubmit={closeEdit}
                            className="grid grid-cols-1 gap-3 h-full max-h-[80vh] my-auto overflow-y-auto"
                        >
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="name"
                                    className="text-xs lg:text-sm"
                                >
                                    Название
                                </label>
                                <Input
                                    placeholder="Название двери"
                                    type="text"
                                    required
                                    name="name"
                                    value={currentDoor.name}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="price"
                                    className="text-xs lg:text-sm"
                                >
                                    Цена
                                </label>
                                <Input
                                    placeholder="Цена"
                                    type="number"
                                    required
                                    name="price"
                                    value={currentDoor.price}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            price: +e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="factory"
                                    className="text-xs lg:text-sm"
                                >
                                    Фабрика
                                </label>
                                <Input
                                    placeholder="Фабрика"
                                    type="text"
                                    required
                                    name="factory"
                                    value={currentDoor.factory}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            factory: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="delivery"
                                    className="text-xs lg:text-sm"
                                >
                                    Доставка
                                </label>
                                <Input
                                    placeholder="Доставка"
                                    type="number"
                                    required
                                    name="delivery"
                                    value={currentDoor.delivery}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            delivery: +e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="innerPanel"
                                    className="text-xs lg:text-sm"
                                >
                                    Внутренняя панель
                                </label>
                                <Input
                                    placeholder="Внутренняя панель"
                                    type="text"
                                    required
                                    name="innerPanel"
                                    value={currentDoor.innerPanel}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            innerPanel: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="mirror"
                                    className="text-xs lg:text-sm"
                                >
                                    Зеркало
                                </label>
                                <select
                                    name="mirror"
                                    className="rounded-lg border border-gray-200 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-2 py-1"
                                    required
                                    value={currentDoor.mirror ? 'Да' : 'Нет'}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            mirror:
                                                e.target.value === 'Да'
                                                    ? true
                                                    : false,
                                        })
                                    }
                                >
                                    <option value={'Да'}>Да</option>
                                    <option value={'Нет'}>Нет</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="externalPanel"
                                    className="text-xs lg:text-sm"
                                >
                                    Внешняя панель
                                </label>
                                <Input
                                    placeholder="Внешняя панель"
                                    type="text"
                                    required
                                    name="externalPanel"
                                    value={currentDoor.externalPanel}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            externalPanel: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="stamp"
                                    className="text-xs lg:text-sm"
                                >
                                    Зеркало
                                </label>
                                <select
                                    name="stamp"
                                    className="rounded-lg border border-gray-200 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-2 py-1"
                                    required
                                    value={currentDoor.stamp ? 'Да' : 'Нет'}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            stamp:
                                                e.target.value === 'Да'
                                                    ? true
                                                    : false,
                                        })
                                    }
                                >
                                    <option value={'Да'}>Да</option>
                                    <option value={'Нет'}>Нет</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="thicknessCanvas"
                                    className="text-xs lg:text-sm"
                                >
                                    Толщина полотна
                                </label>
                                <Input
                                    placeholder="Толщина полотна"
                                    type="number"
                                    required
                                    name="thicknessCanvas"
                                    value={currentDoor.thicknessCanvas}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            thicknessCanvas: +e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="thicknessBox"
                                    className="text-xs lg:text-sm"
                                >
                                    Толщина коробки
                                </label>
                                <Input
                                    placeholder="Толщина коробки"
                                    type="number"
                                    required
                                    name="thicknessBox"
                                    value={currentDoor.thicknessBox}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            thicknessBox: +e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="typeBox"
                                    className="text-xs lg:text-sm"
                                >
                                    Тип короба
                                </label>
                                <select
                                    name="typeBox"
                                    className="rounded-lg border border-gray-200 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-2 py-1"
                                    required
                                    value={
                                        currentDoor.typeBox
                                            ? 'Закрытый'
                                            : 'Открытый'
                                    }
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            typeBox:
                                                e.target.value === 'Закрытый'
                                                    ? true
                                                    : false,
                                        })
                                    }
                                >
                                    <option value={'Открытый'}>Открытый</option>
                                    <option value={'Закрытый'}>Закрытый</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="metalThickness"
                                    className="text-xs lg:text-sm"
                                >
                                    Толщина металла
                                </label>
                                <Input
                                    placeholder="Толщина металла"
                                    type="number"
                                    required
                                    name="metalThickness"
                                    value={currentDoor.metalThickness}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            metalThickness: +e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="coverage"
                                    className="text-xs lg:text-sm"
                                >
                                    Покрытие
                                </label>
                                <Input
                                    placeholder="Покрытие"
                                    type="text"
                                    required
                                    name="coverage"
                                    value={currentDoor.coverage}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            coverage: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="color"
                                    className="text-xs lg:text-sm"
                                >
                                    Цвет покрытия
                                </label>
                                <Input
                                    placeholder="Цвет покрытия"
                                    type="text"
                                    required
                                    name="color"
                                    value={currentDoor.color}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            color: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="purging"
                                    className="text-xs lg:text-sm"
                                >
                                    Контура уплотнения
                                </label>
                                <Input
                                    placeholder="Контура уплотнения"
                                    type="text"
                                    required
                                    name="purging"
                                    value={currentDoor.purging}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            purging: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="peephole"
                                    className="text-xs lg:text-sm"
                                >
                                    Глазок
                                </label>
                                <select
                                    name="peephole"
                                    className="rounded-lg border border-gray-200 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-2 py-1"
                                    required
                                    value={currentDoor.peephole ? 'Да' : 'Нет'}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            peephole:
                                                e.target.value === 'Да'
                                                    ? true
                                                    : false,
                                        })
                                    }
                                >
                                    <option value={'Да'}>Да</option>
                                    <option value={'Нет'}>Нет</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="mainLock"
                                    className="text-xs lg:text-sm"
                                >
                                    Основной замок
                                </label>
                                <Input
                                    placeholder="Основной замок"
                                    type="text"
                                    required
                                    name="mainLock"
                                    value={currentDoor.mainLock}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            mainLock: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="mainNameLock"
                                    className="text-xs lg:text-sm"
                                >
                                    Модель основного замка
                                </label>
                                <Input
                                    placeholder="Модель основного замка"
                                    type="text"
                                    required
                                    name="mainNameLock"
                                    value={currentDoor.mainNameLock}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            mainNameLock: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="additionalLock"
                                    className="text-xs lg:text-sm"
                                >
                                    Дополнительный замок
                                </label>
                                <Input
                                    placeholder="Дополнительный замок"
                                    type="text"
                                    required
                                    name="additionalLock"
                                    value={currentDoor.additionalLock}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            additionalLock: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="additionalNameLock"
                                    className="text-xs lg:text-sm"
                                >
                                    Модель дополнительного замка
                                </label>
                                <Input
                                    placeholder="Модель дополнительного замка"
                                    type="text"
                                    required
                                    name="additionalNameLock"
                                    value={currentDoor.additionalNameLock}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            additionalNameLock: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="nightLatch"
                                    className="text-xs lg:text-sm"
                                >
                                    Ночная задвижка
                                </label>
                                <select
                                    name="nightLatch"
                                    className="rounded-lg border border-gray-200 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-2 py-1"
                                    required
                                    value={
                                        currentDoor.nightLatch ? 'Да' : 'Нет'
                                    }
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            nightLatch:
                                                e.target.value === 'Да'
                                                    ? true
                                                    : false,
                                        })
                                    }
                                >
                                    <option value={'Да'}>Да</option>
                                    <option value={'Нет'}>Нет</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="internalFilling"
                                    className="text-xs lg:text-sm"
                                >
                                    Внутреннее наполнение
                                </label>
                                <Input
                                    placeholder="Внутреннее наполнение"
                                    type="text"
                                    required
                                    name="internalFilling"
                                    value={currentDoor.internalFilling}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            internalFilling: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="adjustingСlamp"
                                    className="text-xs lg:text-sm"
                                >
                                    Регулировка прижима
                                </label>
                                <select
                                    name="adjustingСlamp"
                                    className="rounded-lg border border-gray-200 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-2 py-1"
                                    required
                                    value={
                                        currentDoor.adjustingСlamp
                                            ? 'Да'
                                            : 'Нет'
                                    }
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            adjustingСlamp:
                                                e.target.value === 'Да'
                                                    ? true
                                                    : false,
                                        })
                                    }
                                >
                                    <option value={'Да'}>Да</option>
                                    <option value={'Нет'}>Нет</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="antiRemovablePins"
                                    className="text-xs lg:text-sm"
                                >
                                    Противосъемные штыри
                                </label>
                                <select
                                    name="antiRemovablePins"
                                    className="rounded-lg border border-gray-200 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-2 py-1"
                                    required
                                    value={
                                        currentDoor.antiRemovablePins
                                            ? 'Да'
                                            : 'Нет'
                                    }
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            antiRemovablePins:
                                                e.target.value === 'Да'
                                                    ? true
                                                    : false,
                                        })
                                    }
                                >
                                    <option value={'Да'}>Да</option>
                                    <option value={'Нет'}>Нет</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="stainlessThreshold"
                                    className="text-xs lg:text-sm"
                                >
                                    Порог из нержавеющей стали
                                </label>
                                <select
                                    name="stainlessThreshold"
                                    className="rounded-lg border border-gray-200 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-2 py-1"
                                    required
                                    value={
                                        currentDoor.stainlessThreshold
                                            ? 'Да'
                                            : 'Нет'
                                    }
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            stainlessThreshold:
                                                e.target.value === 'Да'
                                                    ? true
                                                    : false,
                                        })
                                    }
                                >
                                    <option value={'Да'}>Да</option>
                                    <option value={'Нет'}>Нет</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="loops"
                                    className="text-xs lg:text-sm"
                                >
                                    Петли
                                </label>
                                <Input
                                    placeholder="Петли"
                                    type="number"
                                    required
                                    name="loops"
                                    value={currentDoor.loops}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            loops: +e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="packaging"
                                    className="text-xs lg:text-sm"
                                >
                                    Упаковка
                                </label>
                                <Input
                                    placeholder="Упаковка"
                                    type="text"
                                    required
                                    name="packaging"
                                    value={currentDoor.packaging}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            packaging: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="thermalRupture"
                                    className="text-xs lg:text-sm"
                                >
                                    Терморазрыв
                                </label>
                                <select
                                    name="thermalRupture"
                                    className="rounded-lg border border-gray-200 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-2 py-1"
                                    required
                                    value={
                                        currentDoor.thermalRupture
                                            ? 'Да'
                                            : 'Нет'
                                    }
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            thermalRupture:
                                                e.target.value === 'Да'
                                                    ? true
                                                    : false,
                                        })
                                    }
                                >
                                    <option value={'Да'}>Да</option>
                                    <option value={'Нет'}>Нет</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="imgUrl"
                                    className="text-xs lg:text-sm"
                                >
                                    Путь до картинки
                                </label>
                                <Input
                                    placeholder="Путь до картинки"
                                    type="text"
                                    required
                                    name="imgUrl"
                                    value={currentDoor.imgUrl}
                                    onChange={(e) =>
                                        setCurrentDoor({
                                            ...currentDoor,
                                            imgUrl: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <Button
                                    type="button"
                                    onClick={closeEdit}
                                    variant="outline"
                                >
                                    Отмена
                                </Button>
                                <Button>Создать</Button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
