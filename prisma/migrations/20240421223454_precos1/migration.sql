-- CreateEnum
CREATE TYPE "StatusProductCategory" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "MainCategory" AS ENUM ('Sim', 'Nao');

-- CreateTable
CREATE TABLE "productcategories" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER,
    "status" "StatusProductCategory" NOT NULL DEFAULT 'Disponivel',
    "mainCategory" "MainCategory" NOT NULL DEFAULT 'Nao',
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "productcategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productcategories" ADD CONSTRAINT "productcategories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productcategories" ADD CONSTRAINT "productcategories_name_fkey" FOREIGN KEY ("name") REFERENCES "categories"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
