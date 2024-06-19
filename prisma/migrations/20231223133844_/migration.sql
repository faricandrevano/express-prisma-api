-- CreateTable
CREATE TABLE `kelas` (
    `id_kelas` INTEGER NOT NULL AUTO_INCREMENT,
    `tgl` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `kelas` VARCHAR(191) NULL,
    `jurusan` VARCHAR(191) NULL,
    `count_kesehatan` VARCHAR(191) NULL,

    PRIMARY KEY (`id_kelas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kesehatan` (
    `id_kesehatan` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `kelas_id` INTEGER NOT NULL,
    `tgl` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bb` VARCHAR(191) NULL,
    `tb` VARCHAR(191) NULL,
    `sistol` VARCHAR(191) NULL,
    `diastol` VARCHAR(191) NULL,
    `status_darah` VARCHAR(191) NULL,
    `imt` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `pesan_imt` VARCHAR(191) NULL,
    `pesan_tkd` VARCHAR(191) NULL,

    PRIMARY KEY (`id_kesehatan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hemoglobin` (
    `id_hemoglobin` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `kelas_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_hemoglobin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `kelas_id` INTEGER NOT NULL,
    `tgl` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nis` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `nama` VARCHAR(191) NULL,
    `level` ENUM('PMR', 'ADMIN', 'OLAHRAGA', 'SISWA') NOT NULL DEFAULT 'SISWA',
    `jk` ENUM('L', 'P') NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blackListToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kesehatan` ADD CONSTRAINT `kesehatan_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id_kelas`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kesehatan` ADD CONSTRAINT `kesehatan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hemoglobin` ADD CONSTRAINT `hemoglobin_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id_kelas`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hemoglobin` ADD CONSTRAINT `hemoglobin_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id_kelas`) ON DELETE CASCADE ON UPDATE CASCADE;
