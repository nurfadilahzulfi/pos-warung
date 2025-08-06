'use client'

import { useState, useEffect, useRef } from 'react'

type Produk = {
  id: number
  nama: string
  harga: number
}

type ItemKeranjang = Produk & {
  qty: number
}

export default function TransaksiPage() {
  const [produkList, setProdukList] = useState<Produk[]>([])
  const [keranjang, setKeranjang] = useState<ItemKeranjang[]>([])
  const [produkId, setProdukId] = useState('')
  const [qty, setQty] = useState(1)
  const [bayar, setBayar] = useState('')
  const [kembalian, setKembalian] = useState<number | null>(null)
  const [showStruk, setShowStruk] = useState(false)
  const strukRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/produk')
      .then((res) => res.json())
      .then(setProdukList)
  }, [])

  const tambahKeKeranjang = () => {
    const produk = produkList.find((p) => p.id === parseInt(produkId))
    if (!produk || qty <= 0) return

    const existing = keranjang.find((item) => item.id === produk.id)
    if (existing) {
      setKeranjang((prev) =>
        prev.map((item) =>
          item.id === produk.id ? { ...item, qty: item.qty + qty } : item
        )
      )
    } else {
      setKeranjang([...keranjang, { ...produk, qty }])
    }

    setQty(1)
    setProdukId('')
  }

  const total = keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0)

  const handleSubmit = async () => {
    const bayarInt = parseInt(bayar)
    if (keranjang.length === 0 || bayarInt < total) {
      alert('Pastikan keranjang terisi dan uang bayar cukup!')
      return
    }

    const kembalianHitung = bayarInt - total
    setKembalian(kembalianHitung)

    const res = await fetch('/api/transaksi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        total,
        bayar: bayarInt,
        kembalian: kembalianHitung,
        items: keranjang.map(item => ({
          id: item.id,
          qty: item.qty,
          subTotal: item.qty * item.harga
        }))
      }),
    })

    if (res.ok) {
      setShowStruk(true)
    } else {
      alert('Gagal menyimpan transaksi.')
    }
  }

  const handlePrint = () => {
    if (strukRef.current) {
      const printWindow = window.open('', '', 'width=600,height=800')
      if (printWindow) {
        printWindow.document.write('<html><head><title>Struk Pembelian</title></head><body>')
        printWindow.document.write(strukRef.current.innerHTML)
        printWindow.document.write('</body></html>')
        printWindow.document.close()
        printWindow.print()
      }
    }

    // Reset setelah cetak
    setKeranjang([])
    setBayar('')
    setProdukId('')
    setKembalian(null)
    setShowStruk(false)
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🧾 Transaksi Kasir</h1>

      {!showStruk && (
        <>
          <div className="space-y-2">
            <select
              value={produkId}
              onChange={(e) => setProdukId(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Pilih Produk</option>
              {produkList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nama} - Rp {p.harga.toLocaleString()}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
              className="border p-2 w-full"
              placeholder="Qty"
              min="1"
            />

            <button
              onClick={tambahKeKeranjang}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Tambah ke Keranjang
            </button>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">🛒 Keranjang</h2>
            <ul className="border p-3 space-y-1">
              {keranjang.map((item) => (
                <li key={item.id}>
                  {item.nama} x {item.qty} = Rp {(item.qty * item.harga).toLocaleString()}
                </li>
              ))}
              {keranjang.length === 0 && <li>Belum ada item.</li>}
            </ul>

            <p className="font-bold mt-2">Total: Rp {total.toLocaleString()}</p>

            <input
              type="number"
              placeholder="Bayar"
              value={bayar}
              onChange={(e) => setBayar(e.target.value)}
              className="border p-2 w-full mt-2"
            />

            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 mt-3 rounded w-full"
              disabled={keranjang.length === 0 || !bayar}
            >
              Selesaikan Transaksi
            </button>
          </div>
        </>
      )}

      {/* Struk */}
      {showStruk && (
        <div ref={strukRef} className="mt-6 bg-white border p-4">
          <h2 className="text-lg font-bold mb-2">🧾 STRUK PEMBELIAN</h2>
          <ul className="text-sm space-y-1">
            {keranjang.map((item) => (
              <li key={item.id}>
                {item.nama} x {item.qty} = Rp {(item.harga * item.qty).toLocaleString()}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Total: Rp {total.toLocaleString()}</p>
          <p>Bayar: Rp {parseInt(bayar).toLocaleString()}</p>
          <p>Kembalian: Rp {kembalian?.toLocaleString()}</p>

          <button
            onClick={handlePrint}
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
          >
            Cetak Struk
          </button>
        </div>
      )}
    </div>
  )
}
