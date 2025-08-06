'use client'

import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [totalProduk, setTotalProduk] = useState(0)
  const [totalTransaksi, setTotalTransaksi] = useState(0)
  const [totalPenjualan, setTotalPenjualan] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const resProduk = await fetch('/api/produk')
      const produk = await resProduk.json()
      setTotalProduk(produk.length)

      const resTransaksi = await fetch('/api/transaksi')
      const transaksi = await resTransaksi.json()
      setTotalTransaksi(transaksi.length)

      const total = transaksi.reduce((sum: number, t: any) => sum + t.total, 0)
      setTotalPenjualan(total)
    }

    fetchData()
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg text-gray-600">Total Produk</h2>
          <p className="text-3xl font-bold text-blue-600">{totalProduk}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg text-gray-600">Total Transaksi</h2>
          <p className="text-3xl font-bold text-green-600">{totalTransaksi}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg text-gray-600">Total Penjualan</h2>
          <p className="text-3xl font-bold text-rose-600">Rp {totalPenjualan.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-10 p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold">Selamat datang di POS Warung 🎉</h2>
        <p className="mt-2">Kelola produk, transaksi, dan laporan penjualan kamu dengan mudah.</p>
      </div>
    </main>
  )
}
