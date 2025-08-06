'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menu = [
  { name: 'Dashboard', path: '/' },
  { name: 'Produk', path: '/produk' },
  { name: 'Kategori', path: '/kategori' },
  { name: 'Transaksi', path: '/transaksi' },
  { name: 'Riwayat', path: '/riwayat' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen bg-white shadow-md">
      <div className="p-4 text-2xl font-bold text-blue-600">POS Warung</div>
      <nav className="mt-4">
        {menu.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${
                pathname === item.path ? 'bg-blue-200 font-semibold' : ''
              }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
