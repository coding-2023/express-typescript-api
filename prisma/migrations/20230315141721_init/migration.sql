/*
  Warnings:

  - You are about to drop the `ShppingCartItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "product_id" DROP NOT NULL;

-- DropTable
DROP TABLE "ShppingCartItem";

-- CreateTable
CREATE TABLE "OrderItemReturn" (
    "id" SERIAL NOT NULL,
    "return_id" INTEGER NOT NULL,
    "issued_by" VARCHAR NOT NULL,
    "issue_at" TIMESTAMP NOT NULL,
    "order_item_id" INTEGER,

    CONSTRAINT "OrderItemReturn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingCartItem" (
    "id" SERIAL NOT NULL,
    "customer_id" VARCHAR(255) NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "ShoppingCartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingCartHistory" (
    "id" SERIAL NOT NULL,
    "ocurred_at" TIMESTAMP NOT NULL,
    "customer_id" VARCHAR(255) NOT NULL,
    "product_id" INTEGER NOT NULL,
    "action_id" INTEGER,

    CONSTRAINT "ShoppingCartHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingCartHistoryAction" (
    "id" SERIAL NOT NULL,
    "action_constant" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "ShoppingCartHistoryAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipment" (
    "id" SERIAL NOT NULL,
    "to_address" VARCHAR NOT NULL,
    "from_address" VARCHAR NOT NULL,
    "tracking_no" VARCHAR NOT NULL,
    "sent_at" TIMESTAMP NOT NULL,
    "order_id" INTEGER,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipmentItem" (
    "shipmnent_id" INTEGER NOT NULL,
    "order_item_id" INTEGER NOT NULL,

    CONSTRAINT "ShipmentItem_pkey" PRIMARY KEY ("shipmnent_id","order_item_id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItemReturn" ADD CONSTRAINT "OrderItemReturn_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingCartItem" ADD CONSTRAINT "ShoppingCartItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingCartHistory" ADD CONSTRAINT "ShoppingCartHistory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingCartHistory" ADD CONSTRAINT "ShoppingCartHistory_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "ShoppingCartHistoryAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipmentItem" ADD CONSTRAINT "ShipmentItem_shipmnent_id_fkey" FOREIGN KEY ("shipmnent_id") REFERENCES "Shipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipmentItem" ADD CONSTRAINT "ShipmentItem_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
