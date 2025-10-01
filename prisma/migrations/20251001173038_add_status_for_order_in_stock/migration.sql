-- CreateEnum
CREATE TYPE "public"."StatusOrderInStock" AS ENUM ('ORDERED', 'IN_STOCK', 'DELIVERY_PROCESS', 'DELIVERED');

-- AlterTable
ALTER TABLE "public"."OrderInStock" ADD COLUMN     "statusInStock" "public"."StatusOrderInStock" NOT NULL DEFAULT 'ORDERED';
