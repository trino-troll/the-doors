/*
  Warnings:

  - Added the required column `expiresAt` to the `verifyCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "verifyCode" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "blockedUntil" TIMESTAMP(3),
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "code" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "verifyCode_email_createdAt_idx" ON "verifyCode"("email", "createdAt");

-- CreateIndex
CREATE INDEX "verifyCode_expiresAt_idx" ON "verifyCode"("expiresAt");
