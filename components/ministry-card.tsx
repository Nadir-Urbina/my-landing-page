import Link from 'next/link'
import type { Ministry } from '@/types/sanity'
import { Button } from '@/components/ui/button'
import { FallbackImage } from '@/components/ui/fallback-image'
import { ClampedText } from '@/components/clamped-text'

export function MinistryCard({ ministry }: { ministry: Ministry }) {
  // Ministries with page content get their own SEO-friendly page;
  // the rest keep pointing at their existing external/internal link.
  const learnMoreHref =
    ministry.hasBody && ministry.slug
      ? `/ministry/${ministry.slug}`
      : ministry.learnMoreLink

  const badge = ministry.registrationBadge?.isActive
    ? ministry.registrationBadge.text
    : undefined

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div className="relative h-[220px] shrink-0 overflow-hidden">
        <FallbackImage
          src={ministry.imageUrl || '/placeholder-image.jpg'}
          alt={ministry.title}
          fallbackSrc="/placeholder-image.jpg"
          fill
          sizes="(max-width: 768px) 88vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />

        {badge && (
          <div className="absolute left-4 top-4 z-10 max-w-[calc(100%-2rem)] rounded-full bg-gradient-to-r from-green-500/90 to-blue-500/90 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            {badge}
          </div>
        )}

        {learnMoreHref && (
          <div className="absolute bottom-4 right-4 z-10 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
            <Button variant="secondary" size="sm" asChild className="rounded-full bg-white/90 hover:bg-white">
              <Link href={learnMoreHref}>Learn More</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col border-t border-gray-100 p-6">
        <h3 className="text-lg font-semibold leading-tight transition-colors duration-300 group-hover:text-blue-600">
          {ministry.role}
        </h3>

        <ClampedText
          text={ministry.description}
          lines={4}
          className="mt-2 flex-1"
          dialog={{
            variant: 'article',
            title: ministry.title,
            subtitle: ministry.role,
            imageUrl: ministry.imageUrl,
            badge: badge && (
              <span className="inline-block rounded-full bg-gradient-to-r from-green-500/90 to-blue-500/90 px-3 py-1 text-xs font-medium text-white">
                {badge}
              </span>
            ),
          }}
        />
      </div>
    </div>
  )
}
