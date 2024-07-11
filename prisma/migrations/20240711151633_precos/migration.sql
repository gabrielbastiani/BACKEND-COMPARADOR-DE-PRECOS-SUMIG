-- CreateEnum
CREATE TYPE "StatusCategory" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateEnum
CREATE TYPE "StatusProductCategory" AS ENUM ('Disponivel', 'Indisponivel');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(295) NOT NULL,
    "slug" VARCHAR(295),
    "email" VARCHAR(180) NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passwordrecoveryusers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "passwordrecoveryusers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(300),
    "slug" VARCHAR(300),
    "nivel" INTEGER,
    "parentId" TEXT,
    "order" INTEGER,
    "type_category" TEXT,
    "status" "StatusCategory" NOT NULL DEFAULT 'Disponivel',
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storeproducts" (
    "id" TEXT NOT NULL,
    "type_product" TEXT,
    "slug_type" TEXT,
    "store" TEXT,
    "slug" TEXT,
    "link_search" TEXT,
    "image" TEXT,
    "title_product" TEXT,
    "slug_title_product" TEXT,
    "price" DOUBLE PRECISION,
    "brand" TEXT,
    "link" TEXT,
    "register" TEXT DEFAULT 'Nao',
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "storeproducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productcategories" (
    "id" TEXT NOT NULL,
    "storeProduct_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "parentId" TEXT,
    "name" TEXT,
    "slug" TEXT,
    "order" INTEGER,
    "store" TEXT,
    "slug_title_product" TEXT,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "productcategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "productcategories" ADD CONSTRAINT "productcategories_storeProduct_id_fkey" FOREIGN KEY ("storeProduct_id") REFERENCES "storeproducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productcategories" ADD CONSTRAINT "productcategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
