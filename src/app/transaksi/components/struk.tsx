'use client'
import React from 'react'

interface Item {
  produk: { nama: string; harga: number }
  jumlah: number
  subTotal: number
}

interface StrukProps {
  transaksi: {
    id: number
    total: number
    bayar: number
    kembalian: number
    createdAt: string
    itemTransaksi: Item[]
  }
  onClose: () => void
}

const Struk: React.FC<StrukProps> = ({ transaksi, onClose }) => {
  return (
    <div className="p-4 border rounded-md shadow-md bg-white max-w-sm mx-auto print:max-w-full print:shadow-none">
      <h2 className="text-lg font-bold text-center mb-2">STRUK PEMBELIAN</h2>
      <p>Tanggal: {new Date(transaksi.createdAt).toLocaleString()}</p>
      <hr className="my-2" />

      {transaksi.itemTransaksi.map((item, idx) => (
        <div key={idx} className="flex justify-between text-sm">
          <span>{item.produk.nama} x{item.jumlah}</span>
          <span>Rp{item.subTotal.toLocaleString()}</span>
        </div>
      ))}

      <hr className="my-2" />
      <div className="text-sm">
        <p>Total: Rp{transaksi.total.toLocaleString()}</p>
        <p>Bayar: Rp{transaksi.bayar.toLocaleString()}</p>
        <p>Kembalian: Rp{transaksi.kembalian.toLocaleString()}</p>
      </div>

      <div className="mt-4 flex gap-2 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Cetak
        </button>
        <button
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-1 rounded"
        >
          Tutup
        </button>
      </div>
    </div>
  )
}

export default Struk
