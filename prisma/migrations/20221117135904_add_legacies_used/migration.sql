-- AlterTable
ALTER TABLE `ResourceUse` ADD COLUMN `legacies` JSON NULL,
    ADD COLUMN `legacyStones` INTEGER NULL,
    ADD COLUMN `maxHp` INTEGER NULL;
