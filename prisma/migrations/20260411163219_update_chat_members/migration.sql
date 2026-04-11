/*
  Warnings:

  - Made the column `lastOpenAt` on table `ChatMember` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ChatMember" ADD COLUMN     "unreadCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "lastOpenAt" SET NOT NULL,
ALTER COLUMN "lastOpenAt" SET DEFAULT CURRENT_TIMESTAMP;
