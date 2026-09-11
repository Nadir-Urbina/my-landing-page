import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'
import {
  ArrowLeft,
  BookOpen,
  Compass,
  Globe,
  Library,
  Mic,
  Tent as TentIcon,
  Users,
} from 'lucide-react'
import type { CampTent, Testimonial } from '@/types/sanity'
import { getCampPage, getCampTents, getTestimonials } from '@/lib/sanity.client'
import {
  CAMP_CHECKOUT_URL_FALLBACK,
  DEFAULT_CAMP_FAQS,
  HOW_IT_WORKS,
  LEARN_ROTATION,
  MEMBERSHIP_BENEFITS,
  TENT_SEED,
} from '@/lib/camp-content'
import { CampCta } from '@/components/camp/camp-cta'
import { CampFaq } from '@/components/camp/camp-faq'
import { CampStickyCta } from '@/components/camp/camp-sticky-cta'
import { TentCard } from '@/components/camp/tent-card'
import { TypingRotator } from '@/components/camp/typing-rotator'
import { VideoTestimonial } from '@/components/camp/video-testimonial'
import { CarouselWrapper, CarouselItem } from '@/components/CarouselWrapper'
import { TestimonialCard } from '@/components/testimonial-card'

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', variable: '--font-montserrat' })

export const revalidate = 3600

const DESCRIPTION =
  'CAMP is an open prophetic community — eight specialization tents, twice-monthly calls with Dr. Joshua Todd and the CAMP leadership team, and access to his full library of resources. $20 a month.'

export const metadata: Metadata = {
  title: 'CAMP Season 4 | Dr. Joshua Todd',
  description: DESCRIPTION,
  alternates: { canonical: '/camp' },
  openGraph: {
    title: 'CAMP Season 4 — Calling, Activating & Maturing the Prophetic',
    description: DESCRIPTION,
    type: 'website',
    url: '/camp',
    images: [{ url: '/ministry/camp-heroImg.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CAMP Season 4 — Calling, Activating & Maturing the Prophetic',
    description: DESCRIPTION,
    images: ['/ministry/camp-heroImg.webp'],
  },
}

const BENEFIT_ICONS = {
  tents: TentIcon,
  calls: Mic,
  leaders: Users,
  library: Library,
  missions: Globe,
  books: BookOpen,
} as const

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#F5A44A]">
      {children}
    </p>
  )
}

export default async function CampPage() {
  const [settings, sanityTents, testimonials] = await Promise.all([
    getCampPage(),
    getCampTents(),
    getTestimonials(),
  ])

  const checkoutUrl = settings?.checkoutUrl || CAMP_CHECKOUT_URL_FALLBACK
  const ctaLabel = settings?.ctaLabel || 'Join CAMP'
  const seasonLabel = settings?.seasonLabel || 'Season 4'
  const price = settings?.price || '$20'
  const priceNote = settings?.priceNote || 'per month · cancel anytime'
  const memberCount = settings?.memberCount || '120+'
  const tentPrice = settings?.tentPrice || '$300'
  const tentPriceNote = settings?.tentPriceNote || 'per 12-week tent'
  const faqs = settings?.faqs?.length ? settings.faqs : DEFAULT_CAMP_FAQS
  const isOpeningSoon = Boolean(settings?.openingSoon)

  // Sanity tents win outright when any exist; otherwise fall back to the
  // Season 4 planning document so the page is never empty.
  const tents: CampTent[] = sanityTents.length
    ? sanityTents
    : TENT_SEED.map((tent, index) => ({
        name: tent.name,
        leader: tent.leader,
        description: tent.description,
        duration: tent.duration,
        order: index,
      }))

  const describedTents = tents.filter((t) => t.description?.trim()).length

  return (
    <div className={`${montserrat.variable} min-h-screen bg-[#0E1417] text-[#B6C2BE]`}>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/ministry/camp-heroImg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1417]/80 via-[#0E1417]/88 to-[#0E1417]" />

        <div className="container relative z-10 py-24 sm:py-28 lg:py-32">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#9BA8A4] transition-colors hover:text-[#F5A44A]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F5A44A]/30 bg-[#F5A44A]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#F5A44A]">
              {seasonLabel} · Now open
            </span>

            <h1 className="mt-6 font-montserrat text-4xl font-extrabold leading-[1.08] text-[#F4F8F6] sm:text-5xl lg:text-6xl">
              You were never meant to grow in the prophetic{' '}
              <span className="bg-gradient-to-r from-[#F5A44A] to-[#D9652A] bg-clip-text text-transparent">
                on your own.
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-[#B6C2BE] sm:text-xl">
              CAMP — Calling, Activating &amp; Maturing the Prophetic — is an open community of
              people learning to carry what God has given them. Live calls twice a month with Dr.
              Joshua Todd and the leadership team, his full library of resources, and members-only
              access to register for eight specialization tents.
            </p>

            <p className="mt-5 font-montserrat text-lg font-semibold text-[#EEF3F1] sm:text-xl">
              No application to be approved for. Just {price} a month.
            </p>

            <div className="mt-8 rounded-xl border border-[#F5A44A]/15 bg-[#161E21]/70 px-5 py-5 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A9995]">
                What can you learn in CAMP?
              </p>
              <p className="mt-2 font-montserrat text-2xl font-bold leading-snug text-[#EEF3F1] sm:text-3xl">
                <TypingRotator phrases={LEARN_ROTATION} />
              </p>
            </div>

            {isOpeningSoon && settings?.openingSoonNote && (
              <p className="mt-6 rounded-xl border border-[#F5A44A]/25 bg-[#F5A44A]/5 px-5 py-4 text-sm text-[#F5A44A]">
                {settings.openingSoonNote}
              </p>
            )}

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <CampCta href={checkoutUrl} label={ctaLabel} location="hero" size="large" />
              <div className="text-sm text-[#9BA8A4]">
                <span className="font-montserrat text-lg font-bold text-[#EEF3F1]">{price}</span>
                <span className="ml-2">{priceNote}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Stat band */}
      <section className="border-y border-[#F5A44A]/15 bg-[#121A1D]">
        <div className="container">
          <dl className="grid grid-cols-2 divide-[#F5A44A]/10 sm:grid-cols-4 sm:divide-x">
            {[
              { value: String(tents.length), label: 'Specialization tents' },
              { value: memberCount, label: 'Members in CAMP' },
              { value: '2x', label: 'Live calls a month' },
              { value: '12wk', label: 'Tent intensives' },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-8 text-center">
                <dt className="font-montserrat text-3xl font-extrabold text-[#F5A44A] sm:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.15em] text-[#8A9995]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* --------------------------------------------------------- What you get */}
      <section className="py-20 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>What {price} a month includes</SectionLabel>
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-[#F4F8F6] sm:text-4xl lg:text-5xl">
              What your membership actually covers
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MEMBERSHIP_BENEFITS.map((benefit) => {
              const Icon = BENEFIT_ICONS[benefit.icon as keyof typeof BENEFIT_ICONS] ?? Compass
              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-[#F5A44A]/15 bg-[#161E21] p-7 transition-colors duration-300 hover:border-[#F5A44A]/35"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5A44A]/10 ring-1 ring-[#F5A44A]/25">
                    <Icon className="h-6 w-6 text-[#F5A44A]" />
                  </div>
                  <h3 className="mt-6 font-montserrat text-lg font-bold leading-snug text-[#EEF3F1]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#9BA8A4]">{benefit.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Tents */}
      <section className="border-t border-[#F5A44A]/10 bg-[#121A1D] py-20 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>The tents</SectionLabel>
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-[#F4F8F6] sm:text-4xl lg:text-5xl">
              {tents.length} specializations, each led by someone who has walked it
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#9BA8A4]">
              Tents are focused twelve-week intensives inside CAMP. {describedTents} are detailed
              below, with the rest announced soon.
            </p>
            <p className="mx-auto mt-6 max-w-xl rounded-xl border border-[#F5A44A]/20 bg-[#F5A44A]/5 px-5 py-4 text-sm leading-relaxed text-[#B6C2BE]">
              Tents are priced separately from membership at{' '}
              <span className="font-semibold text-[#F5A44A]">{tentPrice} {tentPriceNote}</span>.
              CAMP membership is what makes you eligible to register.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tents.map((tent) => (
              <TentCard key={tent._id ?? tent.name} tent={tent} defaultPrice={tentPrice} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <CampCta href={checkoutUrl} label={`${ctaLabel} — ${price}/month`} location="after_tents" size="large" />
            <p className="mt-4 text-sm text-[#8A9995]">Membership first, then register for any tent you want.</p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- How it works */}
      <section className="py-20 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-[#F4F8F6] sm:text-4xl">
              Three steps in
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="rounded-2xl border border-[#F5A44A]/15 bg-[#161E21] p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5A44A] font-montserrat text-lg font-bold text-[#1A1207]">
                  {step.step}
                </span>
                <h3 className="mt-6 font-montserrat text-lg font-bold text-[#EEF3F1]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#9BA8A4]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Testimonials */}
      {(testimonials.length > 0 || settings?.testimonialVideoUrl) && (
        <section className="border-t border-[#F5A44A]/10 bg-[#121A1D] py-20 sm:py-24">
          <div className="container px-0">
            <div className="container mx-auto max-w-3xl text-center">
              <SectionLabel>From the community</SectionLabel>
              <h2 className="font-montserrat text-3xl font-bold text-[#F4F8F6] sm:text-4xl">
                Hear it from people in CAMP
              </h2>
            </div>

            {settings?.testimonialVideoUrl && (
              <div className="container mt-12">
                <div className="mx-auto max-w-4xl">
                  <VideoTestimonial
                    videoUrl={settings.testimonialVideoUrl}
                    posterUrl={settings.testimonialVideoPosterUrl}
                  />
                  {settings.testimonialVideoCaption && (
                    <p className="mt-4 text-center text-sm text-[#8A9995]">
                      {settings.testimonialVideoCaption}
                    </p>
                  )}
                </div>
              </div>
            )}

            {testimonials.length > 0 && (
              <div className="mt-12">
                <CarouselWrapper showDots>
                  {testimonials.map((testimonial: Testimonial) => (
                    <CarouselItem
                      key={testimonial._id}
                      className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <TestimonialCard testimonial={testimonial} />
                    </CarouselItem>
                  ))}
                </CarouselWrapper>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- FAQ */}
      <section className="py-20 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <SectionLabel>Questions</SectionLabel>
              <h2 className="font-montserrat text-3xl font-bold text-[#F4F8F6] sm:text-4xl">
                Before you join
              </h2>
            </div>
            <div className="mt-12">
              <CampFaq faqs={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Final CTA */}
      <section className="relative overflow-hidden border-t border-[#F5A44A]/20">
        <Image
          src="/ministry/camp-heroImg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1417] via-[#0E1417]/90 to-[#0E1417]" />

        <div className="container relative z-10 py-24 text-center sm:py-28">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-[#F4F8F6] sm:text-4xl">
              The fire is already lit. Come sit down.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#9BA8A4]">
              {memberCount} people are already in CAMP, learning to carry the prophetic with
              maturity, accountability, and people around them.
            </p>

            <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-[#F5A44A]/25 bg-[#161E21] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A9995]">
                Membership
              </p>
              <p className="mt-1 font-montserrat text-5xl font-extrabold text-[#F4F8F6]">{price}</p>
              <p className="mt-2 text-sm text-[#9BA8A4]">{priceNote}</p>
              <div className="mt-6">
                <CampCta href={checkoutUrl} label={ctaLabel} location="final" size="large" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CampStickyCta href={checkoutUrl} label={ctaLabel} price={price} />
    </div>
  )
}
