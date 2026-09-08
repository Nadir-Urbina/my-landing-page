'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { CheckoutCta } from './checkout-cta'

/**
 * Appears once the hero call to action has scrolled out of view, so there is
 * always a way to buy without scrolling back up.
 */
export function StickyCta({
  href,
  label,
  price,
}: {
  href: string
  label: string
  price?: string
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 border-t border-[#E3B457]/20 bg-[#0A0806]/95 px-4 py-3 backdrop-blur',
        'transition-transform duration-300 lg:hidden',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
      aria-hidden={!isVisible}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#F0E6D2]">Shepherds and Wolves</p>
          <p className="truncate text-xs text-[#8A7F6E]">{price ? `${price} · Full masterclass access` : 'Full masterclass access'}</p>
        </div>
        <CheckoutCta
          href={href}
          label={label}
          location="sticky_bar"
          className="shrink-0 px-5 py-2.5 text-xs"
        />
      </div>
    </div>
  )
}
