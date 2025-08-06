import './globals.css'
import { Inter } from 'next/font/google'
import SidebarWrapper from '@/components/SidebarWrapper'
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'POS Warung',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <ThemeProvider>
          <SidebarWrapper>
            {children}
          </SidebarWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
