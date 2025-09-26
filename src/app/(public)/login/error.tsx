"use client";

import { Button } from "@/shared/button";
import { routes } from "@/shared/const";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center h-full font-semibold">
      <h2>ИДИ СВОЕЙ ДОРОГОЙ,</h2>
      <h2>СТАЛКЕР</h2>
      <Link href={routes.MAIN}>
        <Button>На главную</Button>
      </Link>
    </div>
  );
}
