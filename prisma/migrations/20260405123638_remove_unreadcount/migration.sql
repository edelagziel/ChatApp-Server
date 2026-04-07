/*
  Warnings:

  - You are about to drop the column `unreadCount` on the `ChatMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatMember" DROP COLUMN "unreadCount",
ALTER COLUMN "lastOpenAt" DROP NOT NULL;
