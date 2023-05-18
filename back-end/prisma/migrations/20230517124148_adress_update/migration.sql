/*
  Warnings:

  - You are about to drop the `adress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `adress` DROP FOREIGN KEY `Adress_userId_fkey`;

-- DropTable
DROP TABLE `adress`;

-- CreateTable
CREATE TABLE `Address` (
    `userEmail` VARCHAR(191) NOT NULL,
    `wojewodztwo` VARCHAR(191) NOT NULL,
    `powiat` VARCHAR(191) NOT NULL,
    `miejscowosc` VARCHAR(191) NOT NULL,
    `ulica` VARCHAR(191) NULL,
    `nr_mieszkania` VARCHAR(191) NOT NULL,
    `kod_pocztowy` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Address_userEmail_key`(`userEmail`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
