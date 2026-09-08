'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/components/footer'

// Routes that supply their own footer, or deliberately have none
const ROUTES_WITHOUT_FOOTER = ['/studio', '/shepherds7']

export function FooterWrapper() {
  const pathname = usePathname()

  if (ROUTES_WITHOUT_FOOTER.some((route) => pathname?.startsWith(route))) {
    return null
  }

  return <Footer />
} 