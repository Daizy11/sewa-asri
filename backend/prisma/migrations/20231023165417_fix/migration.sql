/*
  Warnings:

  - Added the required column `passwordResetExpires` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `passwordResetExpires` DATETIME(3)  NULL;
