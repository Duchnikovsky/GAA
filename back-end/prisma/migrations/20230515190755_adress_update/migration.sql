-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `Role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `lastname` VARCHAR(191) NULL,
    `phone` INTEGER NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Adress` (
    `userId` VARCHAR(191) NOT NULL,
    `wojewodztwo` VARCHAR(191) NOT NULL,
    `powiat` VARCHAR(191) NOT NULL,
    `miejscowosc` VARCHAR(191) NOT NULL,
    `ulica` VARCHAR(191) NOT NULL,
    `nr_mieszkania` VARCHAR(191) NOT NULL,
    `kod_pocztowy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Adress` ADD CONSTRAINT `Adress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
