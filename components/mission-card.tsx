import Link from 'next/link'
import { Calendar, Globe } from 'lucide-react'
import type { Mission } from '@/types/sanity'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FallbackImage } from '@/components/ui/fallback-image'
import { ClampedText } from '@/components/clamped-text'
import { CardDateBadge, CardMetaRow } from '@/components/card-parts'

const statusStyles: Record<string, string> = {
  open: 'bg-green-100 text-green-800',
  full: 'bg-red-100 text-red-800',
}

export function MissionCard({ mission }: { mission: Mission }) {
  const title = mission.title || 'Untitled Mission'

  const dateLabel =
    mission.startDate && mission.endDate
      ? `${new Date(mission.startDate).toLocaleDateString()} - ${new Date(mission.endDate).toLocaleDateString()}`
      : undefined

  const statusLabel = mission.status
    ? mission.status.charAt(0).toUpperCase() + mission.status.slice(1)
    : undefined

  const meta = (
    <>
      {dateLabel && <CardMetaRow icon={<Calendar className="h-4 w-4" />} text={dateLabel} />}
      {mission.location && <CardMetaRow icon={<Globe className="h-4 w-4" />} text={mission.location} />}
    </>
  )

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div className="relative h-[220px] shrink-0 overflow-hidden">
        <FallbackImage
          src={mission.imageUrl}
          alt={title}
          fallbackSrc="/placeholder-image.jpg"
          fill
          sizes="(max-width: 768px) 88vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <CardDateBadge date={mission.startDate} />

        {statusLabel && (
          <div className="absolute right-4 top-4 z-10">
            <span
              className={cn(
                'rounded-full px-3 py-1 text-sm font-medium',
                statusStyles[mission.status ?? ''] ?? 'bg-gray-100 text-gray-800'
              )}
            >
              {statusLabel}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col border-t border-gray-100 p-6">
        <h3 className="text-xl font-semibold leading-tight">{title}</h3>

        {(dateLabel || mission.location) && (
          <div className="mt-3 space-y-2">{meta}</div>
        )}

        <ClampedText
          text={mission.description || 'No description available'}
          lines={3}
          className="mt-4 flex-1"
          dialog={{
            variant: 'article',
            title,
            imageUrl: mission.imageUrl,
            badge: statusLabel && (
              <span
                className={cn(
                  'inline-block rounded-full px-3 py-1 text-xs font-medium',
                  statusStyles[mission.status ?? ''] ?? 'bg-gray-100 text-gray-800'
                )}
              >
                {statusLabel}
              </span>
            ),
            meta: (
              <>
                {meta}
                {mission.cost && (
                  <p className="pt-1 font-semibold text-foreground">Cost: ${mission.cost}</p>
                )}
              </>
            ),
          }}
        />

        <div className="mt-6">
          {mission.cost && <p className="mb-4 font-semibold">Cost: ${mission.cost}</p>}
          {mission.status === 'open' && mission.registrationLink && (
            <Button className="w-full" asChild>
              <Link href={mission.registrationLink}>Register Now</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
