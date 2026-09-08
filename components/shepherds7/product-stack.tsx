'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { track } from '@vercel/analytics'
import { ClipboardList, Play, Users, X } from 'lucide-react'

/**
 * Turns a normal YouTube/Vimeo share URL into an embeddable one.
 * Returns null for anything unrecognised, so the caller can fall back to
 * opening the link rather than embedding a page that refuses to frame.
 */
function toEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}?autoplay=1&rel=0`
    }
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = parsed.searchParams.get('v') || parsed.pathname.split('/').pop()
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null
    }
    if (host === 'vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : null
    }
    if (host === 'player.vimeo.com' || host === 'youtube-nocookie.com') {
      return url
    }
    return null
  } catch {
    return null
  }
}

/**
 * Hero visual for the masterclass. The video frame leads because the recorded
 * teaching carries most of the value; the book sits alongside it as one
 * component rather than standing in for the whole offer.
 */
export function ProductStack({
  videoHours,
  videoUrl,
}: {
  videoHours: string
  videoUrl?: string
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const embedUrl = videoUrl ? toEmbedUrl(videoUrl) : null
  const isInteractive = Boolean(videoUrl)

  // Close the lightbox on Escape, and stop the page scrolling behind it
  useEffect(() => {
    if (!isPlaying) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsPlaying(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isPlaying])

  const handlePlay = () => {
    if (!videoUrl) return
    track('shepherds7_video_play', { location: 'hero' })
    if (embedUrl) {
      setIsPlaying(true)
    } else {
      window.open(videoUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const Frame = isInteractive ? 'button' : 'div'

  return (
    <div className="relative">
      <Frame
        {...(isInteractive
          ? { type: 'button' as const, onClick: handlePlay, 'aria-label': 'Play the masterclass preview' }
          : {})}
        className={`group relative block aspect-video w-full overflow-hidden rounded-xl border border-[#E3B457]/25 bg-black text-left shadow-[0_35px_80px_-20px_rgba(0,0,0,0.9)] ${
          isInteractive ? 'cursor-pointer transition-colors hover:border-[#E3B457]/50' : ''
        }`}
      >
        <Image
          src="/shepherds7/banner.png"
          alt="Shepherds and Wolves masterclass"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full bg-[#E3B457] ring-8 ring-[#E3B457]/15 sm:h-20 sm:w-20 ${
              isInteractive ? 'transition-transform duration-300 group-hover:scale-110' : ''
            }`}
          >
            <Play className="ml-1 h-7 w-7 fill-[#17110A] text-[#17110A] sm:h-8 sm:w-8" />
          </div>
        </div>

        <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#E3B457] backdrop-blur">
          {videoHours} hours of teaching
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-montserrat text-sm font-bold uppercase tracking-wide text-[#F5EEE0] sm:text-base">
            The Shepherd’s Process — all seven stages
          </p>
        </div>
      </Frame>

      {/* The other three components */}
      <div className="mt-4 flex items-stretch gap-3">
        <div className="relative -mt-14 aspect-[2/3] w-[4.5rem] shrink-0 -rotate-3 rounded shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9)] ring-1 ring-[#E3B457]/30 sm:w-24">
          <Image
            src="/shepherds7/cover.png"
            alt="Shepherds and Wolves book"
            fill
            sizes="96px"
            className="rounded object-cover"
          />
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3">
          {[
            { icon: ClipboardList, label: 'Workbook', sub: 'Apply it yourself' },
            { icon: Users, label: 'Community', sub: 'Private access' },
          ].map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col justify-center rounded-lg border border-[#E3B457]/20 bg-[#100C08] px-3 py-3"
            >
              <Icon className="h-5 w-5 text-[#E3B457]" />
              <p className="mt-2 font-montserrat text-sm font-bold text-[#F0E6D2]">{label}</p>
              <p className="text-[11px] text-[#8A7F6E]">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isPlaying && embedUrl && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setIsPlaying(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Masterclass preview"
        >
          <button
            type="button"
            onClick={() => setIsPlaying(false)}
            aria-label="Close video"
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="aspect-video w-full max-w-4xl overflow-hidden rounded-xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedUrl}
              title="Shepherds and Wolves masterclass preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </div>
  )
}
