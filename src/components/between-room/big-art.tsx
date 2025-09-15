import { Color } from "@/shared/type";
import Image from "next/image";

export function BigArt({ colors }: { colors: Color[] }) {
  return (
    <div className="flex gap-3">
      {colors.map((art) => (
        <div className="" key={art.id}>
          <div className="h-20 w-20">
            <Image
              src={`/${art.url}`}
              alt={art.name}
              width={100}
              height={150}
            />
          </div>
          <p className="text-center">{art.name}</p>
        </div>
      ))}
    </div>
  );
}
