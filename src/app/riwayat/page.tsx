'use client'

import { useEffect, useState } from 'react'

type Produk = {
  id: number
  nama: string
  harga: number
}

type ItemTransaksi = {
  id: number
  produk: Produk
  jumlah: number
  subTotal: number
}

type Transaksi = {
  id: number
  total: number
  bayar: number
  kembalian: number
  createdAt: string
  itemTransaksi: ItemTransaksi[]
}

export default function RiwayatPage() {
  const [data, setData] = useState<Transaksi[]>([])

  useEffect(() => {
    fetch('/api/transaksi/riwayat')
      .then(res => res.json())
      .then(setData)
  }, [])

  const cetakStruk = (trx: Transaksi) => {
    const win = window.open('', 'Struk', 'width=600,height=600')
    if (!win) return

    const isiStruk = `
      <h2>🧾 STRUK TRANSAKSI</h2>
      <p>Tanggal: ${new Date(trx.createdAt).toLocaleString()}</p>
      <ul>
        ${trx.itemTransaksi.map(i =>
          `<li>${i.produk.nama} x ${i.jumlah} = Rp ${i.subTotal.toLocaleString()}</li>`
        ).join('')}
      </ul>
      <p><b>Total:</b> Rp ${trx.total.toLocaleString()}</p>
      <p><b>Bayar:</b> Rp ${trx.bayar.toLocaleString()}</p>
      <p><b>Kembalian:</b> Rp ${trx.kembalian.toLocaleString()}</p>
      <hr/>
      <p>Terima kasih 🙏</p>
    `

    win.document.write(isiStruk)
    win.document.close()
    win.print()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">🕘 Riwayat Transaksi</h1>
      {data.length === 0 ? (
        <p>Belum ada transaksi.</p>
      ) : (
        <ul className="space-y-4">
          {data.map((trx) => (
            <li key={trx.id} className="border p-4 rounded shadow">
              <p><b>Tanggal:</b> {new Date(trx.createdAt).toLocaleString()}</p>
              <ul className="pl-4 list-disc">
                {trx.itemTransaksi.map((item) => (
                  <li key={item.id}>
                    {item.produk.nama} x {item.jumlah} = Rp {item.subTotal.toLocaleString()}
                  </li>
                ))}
              </ul>
              <p><b>Total:</b> Rp {trx.total.toLocaleString()}</p>
              <p><b>Bayar:</b> Rp {trx.bayar.toLocaleString()}</p>
              <p><b>Kembalian:</b> Rp {trx.kembalian.toLocaleString()}</p>
              <button
                onClick={() => cetakStruk(trx)}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                🖨️ Cetak Ulang Struk
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
