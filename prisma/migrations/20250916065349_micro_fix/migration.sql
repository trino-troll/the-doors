/*
  Warnings:

  - Made the column `clouseBox` on table `Двери` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Двери" ALTER COLUMN "clouseBox" SET NOT NULL;
