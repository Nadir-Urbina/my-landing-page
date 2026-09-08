'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProcessStage } from '@/lib/shepherds7-content'

export function ProcessTimeline({ stages }: { stages: ProcessStage[] }) {
  // First stage open so the pattern is obvious without a click
  const [openStage, setOpenStage] = useState<number | null>(1)

  return (
    <ol className="relative space-y-3">
      {stages.map((stage, index) => {
        const isOpen = openStage === stage.number
        const isLast = index === stages.length - 1

        return (
          <li key={stage.number} className="relative">
            {/* Connecting rail between stage markers */}
            {!isLast && (
              <span
                aria-hidden
                className="absolute left-6 top-14 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[#E3B457]/40 to-[#E3B457]/5 sm:left-8"
              />
            )}

            <div
              className={cn(
                'rounded-2xl border transition-colors duration-300',
                isOpen
                  ? 'border-[#E3B457]/35 bg-[#17110A]'
                  : 'border-[#E3B457]/10 bg-[#100C08] hover:border-[#E3B457]/25'
              )}
            >
              <button
                type="button"
                onClick={() => setOpenStage(isOpen ? null : stage.number)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 p-4 text-left sm:gap-5 sm:p-5"
              >
                <span
                  className={cn(
                    'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors duration-300 sm:h-12 sm:w-12 sm:text-base',
                    isOpen
                      ? 'border-[#E3B457] bg-[#E3B457] text-[#17110A]'
                      : 'border-[#E3B457]/30 bg-[#0A0806] text-[#E3B457]'
                  )}
                >
                  {stage.number}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-montserrat text-lg font-bold uppercase tracking-wide text-[#F0E6D2] sm:text-xl">
                    {stage.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-[#A69B8C]">{stage.subtitle}</span>
                </span>

                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-[#E3B457]/70 transition-transform duration-300',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>

              <div
                className={cn(
                  'grid transition-all duration-300 ease-in-out',
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-5 pl-[4.5rem] sm:px-5 sm:pb-6 sm:pl-[5.5rem]">
                    <p className="border-l-2 border-[#E3B457]/50 pl-4 font-montserrat text-base italic leading-snug text-[#E3B457] sm:text-lg">
                      “{stage.pullQuote}”
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-[#C4B9A8]">{stage.body}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#8A7F6E]">
                      {stage.scripture}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
