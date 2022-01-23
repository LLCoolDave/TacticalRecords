/*
  Warnings:

  - Added the required column `medal` to the `Run` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Player` ADD COLUMN `bronze` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `diamond` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `gold` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `moon` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pfp` TEXT NULL,
    ADD COLUMN `platinum` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `silver` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `sunstones` INTEGER NOT NULL DEFAULT 0,
    MODIFY `id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ResourceUse` ADD COLUMN `sunstones` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Run` ADD COLUMN `comment` TEXT NULL,
    ADD COLUMN `medal` ENUM('NONE', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MOON') NOT NULL,
    ADD COLUMN `screenshot` TEXT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `authPassword` VARCHAR(191) NULL,
    `authDiscord` VARCHAR(191) NULL,
    `authGoogle` VARCHAR(191) NULL,

    INDEX `User_authDiscord_authGoogle_authPassword_idx`(`authDiscord`, `authGoogle`, `authPassword`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CacheValid` (
    `id` VARCHAR(191) NOT NULL,
    `lastUpdated` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Player_sunstones_idx` ON `Player`(`sunstones`);

-- CreateIndex
CREATE INDEX `ResourceUse_sunstones_runId_idx` ON `ResourceUse`(`sunstones`, `runId`);

-- CreateIndex
CREATE INDEX `Run_playerId_towerId_score_sunstones_medal_idx` ON `Run`(`playerId`, `towerId`, `score`, `sunstones`, `medal`);
