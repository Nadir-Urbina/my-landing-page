import Link from 'next/link'
import { Calendar, Globe } from 'lucide-react'
import type { Event } from '@/types/sanity'
import { Button } from '@/components/ui/button'
import { FallbackImage } from '@/components/ui/fallback-image'
import { ClampedText } from '@/components/clamped-text'
import { CardDateBadge, CardMetaRow } from '@/components/card-parts'

export function EventCard({ event }: { event: Event }) {
  const title = event.title || 'Untitled Event'
  const dateLabel = event.startDate
    ? new Date(event.startDate).toLocaleDateString()
    : undefined

  const meta = (
    <>
      {dateLabel && <CardMetaRow icon={<Calendar className="h-4 w-4" />} text={dateLabel} />}
      {event.location && <CardMetaRow icon={<Globe className="h-4 w-4" />} text={event.location} />}
    </>
  )

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div className="relative h-[220px] shrink-0 overflow-hidden">
        <FallbackImage
          src={event.imageUrl}
          alt={title}
          fallbackSrc="/placeholder-image.jpg"
          fill
          sizes="(max-width: 768px) 88vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <CardDateBadge date={event.startDate} />
      </div>

      <div className="flex flex-1 flex-col border-t border-gray-100 p-6">
        <h3 className="text-xl font-semibold leading-tight">{title}</h3>

        {(dateLabel || event.location) && (
          <div className="mt-3 space-y-2">{meta}</div>
        )}

        <ClampedText
          text={event.description || 'No description available'}
          lines={3}
          className="mt-4 flex-1"
          dialog={{
            variant: 'article',
            title,
            imageUrl: event.imageUrl,
            meta,
          }}
        />

        {(event.learnMoreLink || event.registrationLink) && (
          <div className="mt-6 flex gap-2">
            {event.learnMoreLink && (
              <Button variant="outline" asChild className="flex-1">
                <Link href={event.learnMoreLink}>Learn More</Link>
              </Button>
            )}
            {event.registrationLink && (
              <Button asChild className="flex-1">
                <Link href={event.registrationLink}>Register Now</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
