/*
  Warnings:

  - You are about to drop the column `mainCategory` on the `productcategories` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `productcategories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "productcategories" DROP COLUMN "mainCategory",
DROP COLUMN "status",
ADD COLUMN     "slug" TEXT;

-- DropEnum
DROP TYPE "MainCategory";
