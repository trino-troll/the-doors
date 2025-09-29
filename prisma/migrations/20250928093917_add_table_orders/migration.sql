-- CreateTable
CREATE TABLE "public"."OrderInStock" (
    "id" TEXT NOT NULL,
    "numberOder" TEXT NOT NULL,
    "shortDescription" TEXT,
    "fullDescription" TEXT,
    "url" TEXT,

    CONSTRAINT "OrderInStock_pkey" PRIMARY KEY ("id")
);
