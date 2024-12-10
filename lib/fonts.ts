import { Inter, Montserrat } from 'next/font/google'
import localFont from 'next/font/local'

export const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
})

export const geistMono = localFont({
  src: [
    {
      path: '../public/fonts/GeistMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/GeistMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
}) 