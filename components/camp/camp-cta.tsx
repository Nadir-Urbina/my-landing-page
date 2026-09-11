'use client'

import { track } from '@vercel/analytics'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CampCtaProps {
  href: string
  label: string
  /** Where on the page this button sits — recorded with the click event */
  location: string
  size?: 'default' | 'large'
  className?: string
}

export function CampCta({ href, label, location, size = 'default', className }: CampCtaProps) {
  return (
    <a
      href={href}
      onClick={() => track('camp_cta_click', { location })}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wide',
        'bg-gradient-to-b from-[#F5A44A] to-[#D9652A] text-[#1A1207]',
        'shadow-[0_8px_30px_-8px_rgba(245,164,74,0.55)] ring-1 ring-[#F5A44A]/40',
        'transition-all duration-300 hover:shadow-[0_10px_40px_-8px_rgba(245,164,74,0.8)] hover:brightness-110',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5A44A]',
        size === 'large' ? 'px-9 py-4 text-base sm:text-lg' : 'px-7 py-3 text-sm',
        className
      )}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  )
}
