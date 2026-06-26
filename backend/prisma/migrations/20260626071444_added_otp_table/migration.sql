/*
  Warnings:

  - You are about to drop the column `idEmailVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "idEmailVerified",
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false;
