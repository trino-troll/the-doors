/*
  Warnings:

  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Opening" AS ENUM ('LEFT', 'RIGHT');

-- DropTable
DROP TABLE "public"."products";

-- CreateTable
CREATE TABLE "public"."Двери" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "size" TEXT NOT NULL,
    "opening" "public"."Opening" NOT NULL,
    "color" TEXT NOT NULL,
    "innerPanelColor" TEXT NOT NULL,

    CONSTRAINT "Двери_pkey" PRIMARY KEY ("id")
);
