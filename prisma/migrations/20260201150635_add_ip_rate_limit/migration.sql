-- CreateTable
CREATE TABLE "IpRateLimit" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IpRateLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ip_action_time" ON "IpRateLimit"("ip", "action", "createdAt");

-- CreateIndex
CREATE INDEX "created_at_idx" ON "IpRateLimit"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "IpRateLimit_ip_action_key" ON "IpRateLimit"("ip", "action");
