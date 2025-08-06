'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import clsx from 'clsx'

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/produk', label: 'Produk' },
  { href: '/transaksi', label: 'Transaksi' },
  { href: '/riwayat', label: 'Riwayat' },
]

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          'fixed z-50 md:static top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4 transition-transform transform',
          {
            '-translate-x-full': !isOpen,
            'translate-x-0': isOpen,
            'md:translate-x-0': true,
          }
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">🧾 POS Warung</h1>
          <button onClick={onClose} className="md:hidden">
            <X />
          </button>
        </div>

        <nav className="space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded transition-colors ${
                pathname === link.href
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="mt-6 flex items-center gap-2 px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        )}
      </aside>
    </>
  )
}
