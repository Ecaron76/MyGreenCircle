/*
  Warnings:

  - Added the required column `createdById` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_groupId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "isGlobal" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "groupId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
