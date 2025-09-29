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
    url: string | null;
    completed: boolean;
};
