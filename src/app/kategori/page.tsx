'use client'

import { useEffect, useState } from 'react'

type Kategori = {
  id: number
  nama: string
}

export default function KategoriPage() {
  const [kategoriList, setKategoriList] = useState<Kategori[]>([])
  const [nama, setNama] = useState('')

  const fetchKategori = async () => {
    const res = await fetch('/api/kategori')
    const data = await res.json()
    setKategoriList(data)
  }

  useEffect(() => {
    fetchKategori()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/kategori', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama }),
    })
    setNama('')
    fetchKategori()
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📂 Daftar Kategori</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Nama Kategori"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
          Tambah Kategori
        </button>
      </form>

      <ul className="space-y-2">
        {kategoriList.map((k) => (
          <li key={k.id} className="border p-3 rounded">
            {k.nama}
          </li>
        ))}
      </ul>
    </div>
  )
}
