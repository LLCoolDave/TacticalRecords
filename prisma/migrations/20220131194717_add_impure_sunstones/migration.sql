-- AlterTable
ALTER TABLE `Run` ADD COLUMN `clear` INTEGER NULL,
    ADD COLUMN `impureSunstones` INTEGER NOT NULL DEFAULT 0;