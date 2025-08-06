-- CreateTable
CREATE TABLE "ItemTransaksi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transaksiId" INTEGER NOT NULL,
    "produkId" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "subTotal" INTEGER NOT NULL,
    CONSTRAINT "ItemTransaksi_transaksiId_fkey" FOREIGN KEY ("transaksiId") REFERENCES "Transaksi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemTransaksi_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
