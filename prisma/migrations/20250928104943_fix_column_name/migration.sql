/*
  Warnings:

  - You are about to drop the column `numberOder` on the `OrderInStock` table. All the data in the column will be lost.
  - Added the required column `numberOrder` to the `OrderInStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."OrderInStock" DROP COLUMN "numberOder",
ADD COLUMN     "numberOrder" TEXT NOT NULL;
