/*
  Warnings:

  - A unique constraint covering the columns `[authPassword]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authDiscord]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authGoogle]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_authPassword_key` ON `User`(`authPassword`);

-- CreateIndex
CREATE UNIQUE INDEX `User_authDiscord_key` ON `User`(`authDiscord`);

-- CreateIndex
CREATE UNIQUE INDEX `User_authGoogle_key` ON `User`(`authGoogle`);
