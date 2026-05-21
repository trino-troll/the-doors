-- CreateTable
CREATE TABLE "InfoIncommingDoor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "factory" TEXT NOT NULL DEFAULT 'Неизвестен',
    "price" INTEGER NOT NULL DEFAULT 0,
    "delivery" INTEGER NOT NULL DEFAULT 0,
    "innerPanel" TEXT NOT NULL DEFAULT 'Неизвестен',
    "mirror" BOOLEAN NOT NULL DEFAULT false,
    "externalPanel" TEXT NOT NULL DEFAULT 'Неизвестен',
    "stamp" BOOLEAN NOT NULL DEFAULT false,
    "thicknessCanvas" INTEGER NOT NULL DEFAULT 0,
    "thicknessBox" INTEGER NOT NULL DEFAULT 0,
    "typeBox" BOOLEAN NOT NULL DEFAULT false,
    "metalThickness" INTEGER NOT NULL DEFAULT 0,
    "coverage" TEXT NOT NULL DEFAULT 'Неизвестен',
    "color" TEXT NOT NULL DEFAULT 'Неизвестен',
    "purging" TEXT NOT NULL DEFAULT 'Неизвестен',
    "peephole" BOOLEAN NOT NULL DEFAULT false,
    "mainLock" TEXT NOT NULL DEFAULT 'Неизвестен',
    "mainNameLock" TEXT NOT NULL DEFAULT 'Неизвестен',
    "additionalLock" TEXT NOT NULL DEFAULT 'Неизвестен',
    "additionalNameLock" TEXT NOT NULL DEFAULT 'Неизвестен',
    "nightLatch" BOOLEAN NOT NULL DEFAULT false,
    "internalFilling" TEXT NOT NULL DEFAULT 'Неизвестен',
    "adjustingСlamp" BOOLEAN NOT NULL DEFAULT false,
    "antiRemovablePins" BOOLEAN NOT NULL DEFAULT false,
    "stainlessThreshold" BOOLEAN NOT NULL DEFAULT false,
    "loops" INTEGER NOT NULL DEFAULT 0,
    "packaging" TEXT NOT NULL DEFAULT 'Неизвестен',
    "thermalRupture" BOOLEAN NOT NULL DEFAULT false,
    "imgUrl" TEXT NOT NULL DEFAULT 'Неизвестен',

    CONSTRAINT "InfoIncommingDoor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalogIncommingDoor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "factory" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "innerPanel" TEXT NOT NULL,
    "doorId" TEXT NOT NULL,

    CONSTRAINT "AnalogIncommingDoor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnalogIncommingDoor" ADD CONSTRAINT "AnalogIncommingDoor_doorId_fkey" FOREIGN KEY ("doorId") REFERENCES "InfoIncommingDoor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
