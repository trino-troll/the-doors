-- AlterTable
ALTER TABLE "IpRateLimit" ADD COLUMN     "manual_locking" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "IpRateLimit_manual_locking_idx" ON "IpRateLimit"("manual_locking");
