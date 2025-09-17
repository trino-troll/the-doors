-- AlterTable
ALTER TABLE "public"."Двери" ADD COLUMN     "clouseBox" BOOLEAN DEFAULT false,
ADD COLUMN     "inner" TEXT,
ADD COLUMN     "porog" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "protivosem" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sizesDoor" TEXT,
ADD COLUMN     "uplotnitel" TEXT,
ADD COLUMN     "vneshPanel" TEXT,
ADD COLUMN     "zamki" TEXT;
