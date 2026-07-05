-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "features" TEXT[];

-- AlterTable
ALTER TABLE "settings" ADD COLUMN     "homeProjectsLimit" INTEGER NOT NULL DEFAULT 3;
