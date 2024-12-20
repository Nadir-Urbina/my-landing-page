'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/components/footer'

export function FooterWrapper() {
  const isStudioPage = usePathname()?.startsWith('/studio')
  
  if (isStudioPage) {
    return null
  }

  return <Footer />
} 