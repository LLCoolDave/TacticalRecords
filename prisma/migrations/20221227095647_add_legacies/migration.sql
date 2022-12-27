-- AlterTable
ALTER TABLE `Run` ADD COLUMN `isLegacy` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Legacy` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `slot` INTEGER NOT NULL,
    `costFlat` INTEGER NOT NULL DEFAULT 0,
    `costPercent` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Legacy_id_key`(`id`),
    UNIQUE INDEX `Legacy_slot_key`(`slot`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
