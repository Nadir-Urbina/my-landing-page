import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Footer } from '@/components/footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ReCaptchaProvider } from '@/components/ReCaptchaProvider'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dr. Joshua Todd',
  description: 'Dr. Joshua Todd - Fathering, Sonship, Kingdom Culture and more',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen bg-background antialiased')}>
        <ReCaptchaProvider>
          <main>{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ReCaptchaProvider>
      </body>
    </html>
  )
}
