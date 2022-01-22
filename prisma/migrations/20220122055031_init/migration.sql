-- CreateTable
CREATE TABLE `Threshold` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `towerId` VARCHAR(191) NOT NULL,
    `bronze` INTEGER NULL,
    `silver` INTEGER NULL,
    `gold` INTEGER NULL,
    `platinum` INTEGER NULL,
    `diamond` INTEGER NULL,
    `moon` INTEGER NULL,
    `overscore` INTEGER NOT NULL,

    UNIQUE INDEX `Threshold_towerId_key`(`towerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clear` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `towerId` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `difficulty` INTEGER NULL,
    `volume` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tower` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `slot` INTEGER NOT NULL,
    `chapter` INTEGER NOT NULL,
    `ingameId` INTEGER NULL,
    `hasMysticGate` BOOLEAN NOT NULL,
    `hasLastInflator` BOOLEAN NOT NULL,

    UNIQUE INDEX `Tower_id_key`(`id`),
    UNIQUE INDEX `Tower_slot_key`(`slot`),
    UNIQUE INDEX `Tower_ingameId_key`(`ingameId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Player` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Player_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResourceUse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `runId` INTEGER NOT NULL,
    `atk` INTEGER NULL,
    `def` INTEGER NULL,
    `hp` INTEGER NULL,
    `bronze` INTEGER NULL,
    `silver` INTEGER NULL,
    `gold` INTEGER NULL,
    `platinum` INTEGER NULL,
    `diamond` INTEGER NULL,
    `moon` INTEGER NULL,

    UNIQUE INDEX `ResourceUse_runId_key`(`runId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Run` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerId` INTEGER NOT NULL,
    `towerId` VARCHAR(191) NOT NULL,
    `time` DATETIME(3) NOT NULL,
    `score` INTEGER NOT NULL,
    `pure` BOOLEAN NOT NULL,
    `impure` BOOLEAN NOT NULL,
    `mysticGate` BOOLEAN NOT NULL,
    `lastInflator` BOOLEAN NOT NULL,
    `hp` INTEGER NULL,
    `atk` INTEGER NULL,
    `def` INTEGER NULL,
    `hpMulti` INTEGER NULL,
    `expMulti` INTEGER NULL,
    `sunstones` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
