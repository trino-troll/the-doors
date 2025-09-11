-- CreateTable
CREATE TABLE "public"."BetweenDoor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "factory" TEXT,
    "is600" INTEGER NOT NULL DEFAULT 0,
    "is700" INTEGER NOT NULL DEFAULT 0,
    "is800" INTEGER NOT NULL DEFAULT 0,
    "is900" INTEGER NOT NULL DEFAULT 0,
    "analog" TEXT,
    "colors" TEXT,
    "innerFilling" TEXT,
    "comment" TEXT,
    "fotoUrl" TEXT,

    CONSTRAINT "BetweenDoor_pkey" PRIMARY KEY ("id")
);
