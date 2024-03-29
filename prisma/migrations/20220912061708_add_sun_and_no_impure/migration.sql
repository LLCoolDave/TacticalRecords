-- AlterTable
ALTER TABLE `Player` ADD COLUMN `sun` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `ResourceUse` ADD COLUMN `sun` INTEGER NULL;

-- AlterTable
ALTER TABLE `Run` MODIFY `medal` ENUM('NONE', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MOON', 'SUN') NOT NULL;

-- AlterTable
ALTER TABLE `Threshold` ADD COLUMN `sun` INTEGER NULL;

-- AlterTable
ALTER TABLE `Tower` ADD COLUMN `hasNoImpure` BOOLEAN NOT NULL DEFAULT false;
