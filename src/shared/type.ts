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
