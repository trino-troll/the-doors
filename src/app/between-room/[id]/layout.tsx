import { Palitra } from "@/components/between-room/palitra";
import React from "react";

export default function PolitraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Palitra />
    </>
  );
}
