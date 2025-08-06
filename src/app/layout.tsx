import './globals.css'
import Sidebar from '@/components/Sidebar'

export const metadata = {
  title: 'POS Warung',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
      <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </body>
    </html>
  )
}
