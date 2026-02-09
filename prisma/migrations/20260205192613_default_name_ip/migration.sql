/*
  Warnings:

  - Made the column `client_name` on table `IpRateLimit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "IpRateLimit" ALTER COLUMN "client_name" SET NOT NULL,
ALTER COLUMN "client_name" SET DEFAULT 'Не известный';
