'use client'

import { useEffect, useState } from 'react'

type Produk = {
  id: number
  nama: string
  harga: number
  stok: number
  kategori?: {
    nama: string
  }
}

type Kategori = {
  id: number
  nama: string
}

export default function ProdukPage() {
  const [produkList, setProdukList] = useState<Produk[]>([])
  const [kategoriList, setKategoriList] = useState<Kategori[]>([])
  const [form, setForm] = useState({
    nama: '',
    harga: '',
    stok: '',
    kategoriId: '',
  })

  const fetchProduk = async () => {
    const res = await fetch('/api/produk')
    const data = await res.json()
    setProdukList(data)
  }

  const fetchKategori = async () => {
    const res = await fetch('/api/kategori')
    const data = await res.json()
    setKategoriList(data)
  }

  useEffect(() => {
    fetchProduk()
    fetchKategori()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/produk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nama: form.nama,
        harga: parseInt(form.harga),
        stok: parseInt(form.stok),
        kategoriId: parseInt(form.kategoriId),
      }),
    })
    setForm({ nama: '', harga: '', stok: '', kategoriId: '' })
    fetchProduk()
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📦 Daftar Produk</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          name="nama"
          placeholder="Nama Produk"
          value={form.nama}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="harga"
          type="number"
          placeholder="Harga"
          value={form.harga}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="stok"
          type="number"
          placeholder="Stok"
          value={form.stok}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <select
          name="kategoriId"
          value={form.kategoriId}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Pilih Kategori</option>
          {kategoriList.map((kategori) => (
            <option key={kategori.id} value={kategori.id}>
              {kategori.nama}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Tambah Produk
        </button>
      </form>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Harga</th>
            <th className="border px-4 py-2">Stok</th>
            <th className="border px-4 py-2">Kategori</th>
          </tr>
        </thead>
        <tbody>
          {produkList.map((p) => (
            <tr key={p.id}>
              <td className="border px-4 py-2">{p.id}</td>
              <td className="border px-4 py-2">{p.nama}</td>
              <td className="border px-4 py-2">Rp {p.harga.toLocaleString()}</td>
              <td className="border px-4 py-2">{p.stok}</td>
              <td className="border px-4 py-2">{p.kategori?.nama || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
