import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Montserrat } from 'next/font/google'
import { PortableText } from '@portabletext/react'
import { components } from '@/components/portable-text'
import { MainNav } from '@/components/MainNav'
import { MinistryIcon } from '@/components/ministry-icon'
import { TrackableLink } from '@/components/TrackableLink'
import { getMinistryBySlug, getMinistrySlugs } from '@/lib/sanity.client'

const montserrat = Montserrat({ subsets: ['latin'] })

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getMinistrySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const ministry = await getMinistryBySlug(params.slug)

  if (!ministry) {
    return { title: 'Ministry Not Found | Dr. Joshua Todd' }
  }

  const title = `${ministry.title} | Dr. Joshua Todd`

  return {
    title,
    description: ministry.description,
    alternates: {
      canonical: `/ministry/${params.slug}`,
    },
    openGraph: {
      title,
      description: ministry.description,
      type: 'article',
      url: `/ministry/${params.slug}`,
      images: ministry.imageUrl ? [{ url: ministry.imageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: ministry.description,
      images: ministry.imageUrl ? [ministry.imageUrl] : undefined,
    },
  }
}

export default async function MinistryPage({
  params,
}: {
  params: { slug: string }
}) {
  const ministry = await getMinistryBySlug(params.slug)

  if (!ministry) {
    notFound()
  }

  const isExternalCta = ministry.learnMoreLink?.startsWith('http')

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <MainNav />
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[55vh] flex items-end">
          <div className="absolute inset-0">
            {ministry.imageUrl && (
              <Image
                src={ministry.imageUrl}
                alt={ministry.title}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          </div>

          <div className="container relative z-10 pb-12 pt-24 text-white">
            {ministry.registrationBadge?.isActive && (
              <div className="mb-4 inline-block bg-gradient-to-r from-green-500/90 to-blue-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                {ministry.registrationBadge.text}
              </div>
            )}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold ${montserrat.className}`}>
              {ministry.title}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-lg text-white/90">
              <MinistryIcon name={ministry.icon} />
              {ministry.role}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container max-w-3xl">
            <Link
              href="/#ministry"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Ministry Life
            </Link>

            <p className="mt-8 text-xl leading-relaxed text-gray-600">
              {ministry.description}
            </p>

            <div
              className="mt-10 text-lg
                [&>p]:mb-6 [&>p]:leading-relaxed [&>p]:text-gray-700
                [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6
                [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6
                [&_li]:mb-2 [&_li]:leading-relaxed [&_li]:text-gray-700"
            >
              <PortableText value={ministry.body} components={components} />
            </div>

            {/* External / related link CTA */}
            {ministry.learnMoreLink && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <TrackableLink
                  href={ministry.learnMoreLink}
                  eventName="ministry_cta_click"
                  eventProps={{
                    location: 'ministry_detail',
                    ministry_slug: params.slug,
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-2xl font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Visit {ministry.title}
                  {isExternalCta && <ExternalLink className="h-4 w-4" />}
                </TrackableLink>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
