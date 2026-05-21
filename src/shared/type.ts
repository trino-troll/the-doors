import { StatusOrderInStock } from '@/generated/prisma';

export type Door = {
    id: string;
    name: string;
    opening: 'LEFT' | 'RIGHT';
    size: string;
    color: string;
    innerPanelColor: string;
    count: number;
    description: string | null;
    uplotnitel: string | null;
    zamki: string | null;
    protivosem: boolean;
    vneshPanel: string | null;
    clouseBox: boolean;
    porog: boolean;
    inner: string | null;
    sizesDoor: string | null;
};

export type BetweenDoor = {
    id: string;
    name: string;
    factory: string | null;
    is600: number;
    is700: number;
    is800: number;
    is900: number;
    materials: string | null;
    analog: string | null;
    colors: string | null;
    innerFilling: string | null;
    comment: string | null;
    fotoUrl: string | null;
};

export type Color = {
    id: string;
    name: string;
    url: string | null;
};

export type Price = {
    id: string;
    name: string;
    price: string;
};

export type UserRole = 'GOOD' | 'USER';

export interface NavigationProps {
    user: {
        name: string;
        role: UserRole;
    } | null;
}

export type OrderInStock = {
    id: string;
    numberOrder: string;
    shortDescription: string | null;
    fullDescription: string | null;
    url: string[] | null;
    completed: boolean;
    statusInStock: StatusOrderInStock;
};

export type Message = {
    role: 'USER' | 'AI';
    text: string;
};

export type OrderBN = {
    id: string;
    name: string;
    orderNumber: string | null;
    in1C: boolean;
};

export type EcoshponPDK = {
    model: string;
    price_opt: number;
    available_colors: string;
    other_colors: string;
    construction: string;
    coating: string;
    features: string;
    height: string;
    width: string;
    thickness: string;
    custom_sizes: string;
    image: string | null;
    analogs: Analog[];
};

export type User = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    password: string;
    role: 'GOOD' | 'USER';
    nickName: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type Analog = {
    factory: string;
    model: string;
    available_colors: string;
    other_colors: string;
};

export type ChatMessage = {
    type: 'user' | 'system';
    message: string;
    userId: string;
    name: string;
    timestamp: Date;
};

export type IncommingDoor = {
    id: string;
    name: string; // название
    factory: string; // фабрика
    price: number; // цена
    delivery: number; // доставка
    innerPanel: string; // внутренняя панель
    mirror: boolean; // зеркало
    externalPanel: string; // внешняя панель
    stamp: boolean; // штамповка на полотне
    thicknessCanvas: number; // толщина полотна
    thicknessBox: number; // толщина коробки
    typeBox: boolean; // тип короба true - закрытый, false - открытый
    metalThickness: number; // толщина металла
    coverage: string; // покрытие
    color: string; // цвет покрытия
    purging: string; // контура уплотнения
    peephole: boolean; // глазок
    mainLock: string; // основной замок
    mainNameLock: string; // модель основного замка
    additionalLock: string; // дополнительный замок
    additionalNameLock: string; // модель дополнительного замка
    nightLatch: boolean; // ночная задвижка
    internalFilling: string; // внутреннее наполнение
    adjustingСlamp: boolean; // регулировка прижима
    antiRemovablePins: boolean; // противосъемные штыри
    stainlessThreshold: boolean; // порог из нержавеющей стали
    loops: number; // петли
    packaging: string; // упаковка
    thermalRupture: boolean; // терморазрыв
    imgUrl: string; // путь до картинки
    // analog: AnalogIncommingDoor;
};

export type AnalogIncommingDoor = {
    name: string;
    factory: string;
    price: number;
    innerPanel: string;
};
