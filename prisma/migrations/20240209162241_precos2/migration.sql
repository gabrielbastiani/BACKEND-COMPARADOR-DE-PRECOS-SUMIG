/*
  Warnings:

  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `store` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `title_product` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `store` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "price",
DROP COLUMN "store",
DROP COLUMN "title_product",
ADD COLUMN     "category_id" TEXT,
ADD COLUMN     "storeProduct_id" TEXT;

-- DropTable
DROP TABLE "store";

-- CreateTable
CREATE TABLE "storeproducts" (
    "id" TEXT NOT NULL,
    "store" TEXT,
    "image" TEXT,
    "title_product" TEXT,
    "price" DOUBLE PRECISION,
    "brand" TEXT,
    "link" TEXT,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "storeproducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_storeProduct_id_fkey" FOREIGN KEY ("storeProduct_id") REFERENCES "storeproducts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
