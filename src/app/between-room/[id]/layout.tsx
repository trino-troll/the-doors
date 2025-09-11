import React from "react";

export default function PolitraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="mt-4 pb-8 border-t-2 border-gray-400">
        <h2 className="mt-4 font-semibold text:base lg:text-lg">
          Политра цветов
        </h2>
        <p>Здесь должны быть обрасцы</p>
      </div>
    </>
  );
}
