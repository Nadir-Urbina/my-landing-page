'use client'

import { useState } from 'react'
import Image from 'next/image'
import { track } from '@vercel/analytics'
import { Play } from 'lucide-react'
import { toEmbedUrl } from '@/lib/video-embed'

/**
 * Click-to-play facade: the heavy YouTube/Vimeo iframe is only mounted once
 * someone actually presses play, so the page does not pay for it on load.
 */
export function VideoTestimonial({
  videoUrl,
  posterUrl,
}: {
  videoUrl: string
  posterUrl?: string
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const embedUrl = toEmbedUrl(videoUrl)

  const handlePlay = () => {
    track('camp_testimonial_video_play', { location: 'testimonials' })
    if (embedUrl) {
      setIsPlaying(true)
    } else {
      window.open(videoUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#F5A44A]/20 bg-black shadow-[0_35px_80px_-20px_rgba(0,0,0,0.85)]">
      {isPlaying && embedUrl ? (
        <iframe
          src={embedUrl}
          title="CAMP member testimonials"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play CAMP member testimonials"
          className="group relative h-full w-full"
        >
          <Image
            src={posterUrl || '/ministry/camp-heroImg.webp'}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-80"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F5A44A] ring-8 ring-[#F5A44A]/15 transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 h-8 w-8 fill-[#1A1207] text-[#1A1207]" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
