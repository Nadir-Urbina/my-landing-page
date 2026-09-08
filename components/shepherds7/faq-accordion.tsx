'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ShepherdsFaq } from '@/types/sanity'

export function FaqAccordion({ faqs }: { faqs: ShepherdsFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-[#E3B457]/10 border-y border-[#E3B457]/10">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index

        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 py-5 text-left"
            >
              <span className="font-montserrat text-base font-semibold text-[#F0E6D2] sm:text-lg">
                {faq.question}
              </span>
              <Plus
                className={cn(
                  'mt-0.5 h-5 w-5 shrink-0 text-[#E3B457] transition-transform duration-300',
                  isOpen && 'rotate-45'
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
                <p className="pb-6 pr-9 text-[15px] leading-relaxed text-[#C4B9A8]">{faq.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
