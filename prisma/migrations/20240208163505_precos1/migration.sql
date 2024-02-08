-- CreateTable
CREATE TABLE "store" (
    "id" TEXT NOT NULL,
    "amazon" JSONB,
    "americanas" JSONB,
    "carrefour" JSONB,
    "casas_bahia" JSONB,
    "dutra_maquinas" JSONB,
    "esab" JSONB,
    "ferramentas_kennedy" JSONB,
    "leroy_merlin" JSONB,
    "loja_do_mecanico" JSONB,
    "madeiramadeira" JSONB,
    "magalu" JSONB,
    "mercado_livre" JSONB,
    "ponto_frio" JSONB,
    "shopee" JSONB,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "title_product" TEXT,
    "price" DOUBLE PRECISION,
    "store" TEXT,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
