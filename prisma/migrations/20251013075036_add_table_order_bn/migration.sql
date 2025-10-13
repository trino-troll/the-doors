-- CreateTable
CREATE TABLE "public"."OrderBN" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "in1C" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OrderBN_pkey" PRIMARY KEY ("id")
);
