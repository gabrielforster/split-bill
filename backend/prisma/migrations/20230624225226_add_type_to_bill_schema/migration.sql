/*
  Warnings:

  - Added the required column `type` to the `bills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bills" ADD COLUMN     "type" TEXT NOT NULL;
