/*
  Warnings:

  - The values [TEXT] on the enum `EntryType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EntryType_new" AS ENUM ('SUCCESS', 'WARNING', 'INFO', 'ERROR');
ALTER TABLE "Entry" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Entry" ALTER COLUMN "type" TYPE "EntryType_new" USING ("type"::text::"EntryType_new");
ALTER TYPE "EntryType" RENAME TO "EntryType_old";
ALTER TYPE "EntryType_new" RENAME TO "EntryType";
DROP TYPE "EntryType_old";
ALTER TABLE "Entry" ALTER COLUMN "type" SET DEFAULT 'SUCCESS';
COMMIT;

-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "type" SET DEFAULT E'SUCCESS';
