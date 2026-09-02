'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import { ClampedText } from '@/components/clamped-text'

const FALLBACK_IMAGE = '/placeholder-image.jpg'

export interface TestimonialCardData {
  _id: string
  name?: string
  location?: string
  text?: string
  imageUrl?: string
}

export function TestimonialCard({
  testimonial,
  badge,
}: {
  testimonial: TestimonialCardData
  /** Optional pill under the quote (e.g. Healing Streams' healing type) */
  badge?: string
}) {
  const [imgSrc, setImgSrc] = useState(testimonial.imageUrl || FALLBACK_IMAGE)

  const name = testimonial.name || 'Anonymous'
  const text = testimonial.text || 'No testimonial text available'

  return (
    <div className="flex h-[460px] flex-col items-center rounded-xl border border-gray-100/80 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl">
      {/* Fixed-size wrapper guarantees a true circle regardless of source aspect ratio */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
        <Image
          src={imgSrc}
          alt={`${name}, testimonial`}
          fill
          sizes="96px"
          className="object-cover"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-tight">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {testimonial.location || 'Location not specified'}
      </p>

      {badge && (
        <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
          {badge}
        </span>
      )}

      <Quote className="mt-4 h-5 w-5 shrink-0 text-blue-500/40" />

      <ClampedText
        text={text}
        lines={6}
        italic
        className="mt-3 flex-1"
        triggerLabel="Read full testimonial"
        dialog={{
          variant: 'quote',
          title: name,
          subtitle: testimonial.location,
          imageUrl: imgSrc,
          badge: badge && (
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
              {badge}
            </span>
          ),
        }}
      />
    </div>
  )
}
