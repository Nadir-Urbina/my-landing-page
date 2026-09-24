import Image from 'next/image'
import { Clock } from 'lucide-react'
import type { CampTent } from '@/types/sanity'
import { ClampedText } from '@/components/clamped-text'

/** Connectors and honorifics that should not become an initial */
const INITIALS_SKIP = /^(and|dr\.?|ps\.?|pastor|rev\.?|apostle|prophet)$/i

function initialsOf(leader: string) {
  return leader
    .replace(/&/g, ' ')
    .split(/\s+/)
    .filter((part) => part && !INITIALS_SKIP.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function TentCard({
  tent,
  defaultPrice,
}: {
  tent: CampTent
  /** Standard tent price from CAMP Page settings; a tent can override it */
  defaultPrice?: string
}) {
  const isComingSoon = !tent.description?.trim()
  const price = tent.price || defaultPrice

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#F5A44A]/15 bg-[#161E21] p-7 transition-colors duration-300 hover:border-[#F5A44A]/35">
      <div className="flex items-start gap-4">
        {tent.leaderImageUrl ? (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[#F5A44A]/25">
            <Image
              src={tent.leaderImageUrl}
              alt={tent.leader}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F5A44A]/10 font-montserrat text-sm font-bold text-[#F5A44A] ring-1 ring-[#F5A44A]/25">
            {initialsOf(tent.leader)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="font-montserrat text-lg font-bold leading-snug text-[#EEF3F1]">
            {tent.name}
          </h3>
          <p className="mt-1 text-sm text-[#9BA8A4]">Led by {tent.leader}</p>
        </div>
      </div>

      {isComingSoon ? (
        <div className="mt-6 flex flex-1 items-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F5A44A]/25 bg-[#F5A44A]/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#F5A44A]">
            Details coming soon
          </span>
        </div>
      ) : (
        <>
          {(tent.duration || price) && (
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-wider">
              {tent.duration && (
                <span className="flex items-center gap-1.5 text-[#8A9995]">
                  <Clock className="h-3.5 w-3.5" />
                  {tent.duration}
                </span>
              )}
              {price && (
                <span className="rounded-full border border-[#F5A44A]/30 bg-[#F5A44A]/10 px-2.5 py-1 text-[#F5A44A]">
                  {price} to enrol
                </span>
              )}
            </div>
          )}
          <ClampedText
            text={tent.description!}
            lines={4}
            className="mt-4 flex-1"
            triggerLabel="Read the full tent"
            dialog={{
              variant: 'article',
              title: tent.name,
              subtitle: `Led by ${tent.leader}`,
              imageUrl: tent.leaderImageUrl,
            }}
          />
        </>
      )}
    </div>
  )
}
