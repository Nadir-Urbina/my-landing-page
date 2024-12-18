import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen bg-background antialiased')}>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
