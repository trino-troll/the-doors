/*
  Warnings:

  - You are about to drop the column `user` on the `verifyCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "verifyCode" DROP COLUMN "user",
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;
