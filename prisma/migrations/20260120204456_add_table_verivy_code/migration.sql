-- CreateTable
CREATE TABLE "verifyCode" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verifyCode_pkey" PRIMARY KEY ("id")
);
