export type Door = {
  id: string;
  name: string;
  opening: "LEFT" | "RIGHT";
  size: string;
  color: string;
  innerPanelColor: string;
  count: number;
  description: string | null;
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
