'use client'

import { track } from '@vercel/analytics'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckoutCtaProps {
  href: string
  label: string
  /** Where on the page this button sits — recorded with the click event */
  location: string
  size?: 'default' | 'large'
  className?: string
}

export function CheckoutCta({
  href,
  label,
  location,
  size = 'default',
  className,
}: CheckoutCtaProps) {
  return (
    <a
      href={href}
      onClick={() => track('shepherds7_cta_click', { location })}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wide',
        'bg-gradient-to-b from-[#E3B457] to-[#C08A2A] text-[#17110A]',
        'shadow-[0_8px_30px_-8px_rgba(227,180,87,0.6)] ring-1 ring-[#E3B457]/40',
        'transition-all duration-300 hover:shadow-[0_10px_40px_-8px_rgba(227,180,87,0.85)] hover:brightness-110',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E3B457]',
        size === 'large' ? 'px-9 py-4 text-base sm:text-lg' : 'px-7 py-3 text-sm',
        className
      )}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  )
}
