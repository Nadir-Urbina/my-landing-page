import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'
import { BookOpen, Check, ClipboardList, PlayCircle, Quote, ShieldCheck, Users, X } from 'lucide-react'
import { getShepherdsPage } from '@/lib/sanity.client'
import {
  AUDIENCE,
  CHAPTER_ANATOMY,
  CHECKOUT_URL_FALLBACK,
  DEFAULT_FAQS,
  FAILURE_MODES,
  PACKAGE_INCLUDES,
  PROCESS_STAGES,
  WHAT_IT_IS_NOT,
} from '@/lib/shepherds7-content'
import { CheckoutCta } from '@/components/shepherds7/checkout-cta'
import { FaqAccordion } from '@/components/shepherds7/faq-accordion'
import { ProcessTimeline } from '@/components/shepherds7/process-timeline'
import { ProductStack } from '@/components/shepherds7/product-stack'
import { StickyCta } from '@/components/shepherds7/sticky-cta'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const revalidate = 3600

const TITLE = 'Shepherds and Wolves Masterclass | Dr. Joshua Todd'
const DESCRIPTION =
  'You knew something was wrong long before you knew what to do about it. The Shepherd’s Process masterclass — 12 hours of teaching, the book, a workbook, and a private community of shepherds carrying the same weight.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/shepherds7' },
  openGraph: {
    title: 'Shepherds and Wolves Masterclass — A Biblical Guide to Protecting the Church',
    description: DESCRIPTION,
    type: 'website',
    url: '/shepherds7',
    images: [{ url: '/shepherds7/banner.png', width: 1672, height: 941 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shepherds and Wolves Masterclass — A Biblical Guide to Protecting the Church',
    description: DESCRIPTION,
    images: ['/shepherds7/banner.png'],
  },
}

const PACKAGE_ICONS = {
  video: PlayCircle,
  book: BookOpen,
  workbook: ClipboardList,
  community: Users,
} as const

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#E3B457]">
      {children}
    </p>
  )
}

export default async function Shepherds7Page() {
  const settings = await getShepherdsPage()

  const checkoutUrl = settings?.checkoutUrl || CHECKOUT_URL_FALLBACK
  const ctaLabel = settings?.ctaLabel || 'Get Instant Access'
  const videoHours = settings?.videoHours || '12'
  const price = settings?.price || '$499'
  const faqs = settings?.faqs?.length ? settings.faqs : DEFAULT_FAQS
  const endorsements = settings?.endorsements ?? []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Shepherds and Wolves Masterclass',
    description: DESCRIPTION,
    image: 'https://drjoshuatodd.com/shepherds7/banner.png',
    url: 'https://drjoshuatodd.com/shepherds7',
    inLanguage: 'en',
    provider: { '@type': 'Person', name: 'Dr. Joshua Todd', url: 'https://drjoshuatodd.com/about' },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `PT${videoHours}H`,
    },
  }

  return (
    <div className={`${montserrat.variable} min-h-screen bg-[#0A0806] text-[#C4B9A8]`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Logo-only header — no nav links, so nothing pulls a reader off the page */}
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="container flex h-20 items-center">
          <Link
            href="/"
            className="font-montserrat text-lg font-bold tracking-wide text-[#F0E6D2]/90 transition-colors hover:text-[#E3B457]"
          >
            Dr. Joshua Todd
          </Link>
        </div>
      </header>

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/shepherds7/banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0806]/85 via-[#0A0806]/90 to-[#0A0806]" />

        <div className="container relative z-10 py-28 sm:py-32 lg:py-36">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div className="max-w-2xl">
              <SectionLabel>A new masterclass from Dr. Joshua Todd</SectionLabel>

              {/* The hook: names the reader's experience. Recognition, not motion. */}
              <p className="font-montserrat text-xl italic leading-snug text-[#E3B457] sm:text-2xl">
                “You knew something was wrong long before you knew what to do about it.”
              </p>

              {/* The promise: what actually changes, carrying the both/and the book is built on */}
              <h1 className="mt-5 font-montserrat text-4xl font-extrabold leading-[1.08] text-[#F5EEE0] sm:text-5xl lg:text-[3.5rem]">
                Now you’ll know exactly what to do{' '}
                <span className="bg-gradient-to-r from-[#E3B457] to-[#C08A2A] bg-clip-text text-transparent">
                  — without crushing the person involved.
                </span>
              </h1>

              {/* Framed as symptoms so the reader diagnoses themselves rather than
                  reading a description of someone else's church */}
              <div className="mt-7 rounded-xl border border-[#E3B457]/15 bg-[#100C08]/60 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E3B457]">
                  Symptoms you may be seeing
                </p>
                <ul className="mt-4 space-y-2.5">
                  {[
                    'Influence quietly gathering around one personality',
                    'Conversations shifting in tone beneath the surface',
                    'Trust drifting away from your leadership team',
                    'Confusion spreading through people you love',
                  ].map((symptom) => (
                    <li key={symptom} className="flex gap-3 text-[15px] leading-snug text-[#C4B9A8]">
                      <span aria-hidden className="mt-2 h-1 w-4 shrink-0 rounded-full bg-[#E3B457]/50" />
                      {symptom}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-[#E3B457]/10 pt-4 text-[15px] leading-relaxed text-[#B9AE9D]">
                  You can feel it. And confronting it without wisdom could do more damage than the
                  problem itself.
                </p>
              </div>

              <p className="mt-6 font-montserrat text-lg font-semibold text-[#F0E6D2] sm:text-xl">
                What most leaders lack is not courage. It is a clear process.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <CheckoutCta
                  href={checkoutUrl}
                  label={ctaLabel}
                  location="hero"
                  size="large"
                />
                {(price || settings?.priceNote) && (
                  <div className="text-sm text-[#A69B8C]">
                    <span className="font-montserrat text-lg font-bold text-[#F0E6D2]">{price}</span>
                    {settings?.compareAtPrice && (
                      <span className="ml-2 text-[#8A7F6E] line-through">
                        {settings.compareAtPrice}
                      </span>
                    )}
                    {settings?.priceNote && (
                      <span className="ml-2 block sm:ml-3 sm:inline">{settings.priceNote}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full">
              <ProductStack videoHours={videoHours} videoUrl={settings?.promoVideoUrl} />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Stat band */}
      <section className="border-y border-[#E3B457]/15 bg-[#0C0906]">
        <div className="container">
          <dl className="grid grid-cols-2 divide-[#E3B457]/10 sm:grid-cols-4 sm:divide-x">
            {[
              { value: `${videoHours}h`, label: 'Of video teaching' },
              { value: '7', label: 'Stages of the process' },
              { value: '4', label: 'Components included' },
              { value: '20+', label: 'Years of shepherding' },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-8 text-center">
                <dt className="font-montserrat text-3xl font-extrabold text-[#E3B457] sm:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.15em] text-[#8A7F6E]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------- Problem */}
      <section className="border-t border-[#E3B457]/10 py-20 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>The problem</SectionLabel>
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-[#F5EEE0] sm:text-4xl">
              Without a process, every leader defaults to one of three mistakes
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {FAILURE_MODES.map((mode) => (
              <div
                key={mode.title}
                className="rounded-2xl border border-[#E3B457]/10 bg-[#100C08] p-7"
              >
                <X className="h-6 w-6 text-[#B3452F]" />
                <h3 className="mt-5 font-montserrat text-lg font-bold text-[#F0E6D2]">
                  {mode.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#A69B8C]">{mode.body}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center font-montserrat text-xl italic text-[#E3B457] sm:text-2xl">
            “Neither response serves the flock or the individual well.”
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- The framework */}
      <section className="relative border-t border-[#E3B457]/10 bg-[#0C0906] py-20 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>The framework</SectionLabel>
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-[#F5EEE0] sm:text-4xl lg:text-5xl">
              The Shepherd’s Process
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#A69B8C]">
              Seven stages that move at the pace of wisdom — protecting the flock while still
              believing the best about people and leaving room for repentance at every step. Taught
              in full across roughly {videoHours} hours of video.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            <ProcessTimeline stages={PROCESS_STAGES} />
          </div>

          <div className="mt-14 text-center">
            <CheckoutCta
              href={checkoutUrl}
              label={`${ctaLabel} — All Seven Stages`}
              location="after_framework"
              size="large"
            />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Everything included */}
      <section className="border-t border-[#E3B457]/10 py-20 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Everything included</SectionLabel>
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-[#F5EEE0] sm:text-4xl lg:text-5xl">
              This is not a book. It is a full masterclass.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#A69B8C]">
              Four parts, built to work together — so you do not just understand the process, you
              can actually run it in your community, with your team, alongside other leaders.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
            {PACKAGE_INCLUDES.map((item) => {
              const Icon = PACKAGE_ICONS[item.icon]
              const isPrimary = item.icon === 'video'
              const title =
                item.icon === 'video'
                  ? item.title.replace('12', videoHours)
                  : item.title

              return (
                <div
                  key={item.icon}
                  className={`flex flex-col rounded-2xl border bg-[#100C08] p-8 transition-colors duration-300 ${
                    isPrimary
                      ? 'border-[#E3B457]/40 md:col-span-2 md:flex-row md:items-start md:gap-8'
                      : 'border-[#E3B457]/15 hover:border-[#E3B457]/35'
                  }`}
                >
                  <div
                    className={`flex shrink-0 items-center justify-center rounded-full bg-[#E3B457]/10 ring-1 ring-[#E3B457]/25 ${
                      isPrimary ? 'h-16 w-16' : 'h-12 w-12'
                    }`}
                  >
                    <Icon className={isPrimary ? 'h-8 w-8 text-[#E3B457]' : 'h-6 w-6 text-[#E3B457]'} />
                  </div>
                  <div className={isPrimary ? 'md:flex-1' : ''}>
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-[#8A7F6E] ${isPrimary ? 'mt-6 md:mt-0' : 'mt-6'}`}>
                    {item.eyebrow}
                  </p>
                  <h3 className={`mt-2 font-montserrat font-bold leading-snug text-[#F0E6D2] ${isPrimary ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                    {title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#A69B8C]">
                    {item.icon === 'community' && settings?.communityName
                      ? item.body.replace('Private access to', `Private access to ${settings.communityName} and`)
                      : item.body}
                  </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-14 text-center">
            <CheckoutCta
              href={checkoutUrl}
              label={ctaLabel}
              location="after_includes"
              size="large"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- What it's not */}
      <section className="border-t border-[#E3B457]/10 py-20 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Read this before you buy</SectionLabel>
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-[#F5EEE0] sm:text-4xl">
              What this masterclass is not
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#A69B8C]">
              Teaching about wolves in the church can be misused. This is built specifically so it
              cannot be.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
            {WHAT_IT_IS_NOT.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E3B457]/15 bg-[#100C08] p-7"
              >
                <ShieldCheck className="h-6 w-6 text-[#E3B457]" />
                <h3 className="mt-5 font-montserrat text-lg font-bold text-[#F0E6D2]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#A69B8C]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Chapter anatomy */}
      <section className="border-t border-[#E3B457]/10 bg-[#0C0906] py-20 sm:py-24">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <SectionLabel>How it works</SectionLabel>
              <h2 className="font-montserrat text-3xl font-bold leading-tight text-[#F5EEE0] sm:text-4xl">
                Every stage works the same four ways
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#A69B8C]">
                These are not seven disconnected lessons. One story runs the length of the material
                and escalates with each stage, so you see the framework applied rather than
                described.
              </p>

              <dl className="mt-10 space-y-6">
                {CHAPTER_ANATOMY.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-[#E3B457]" />
                    <div>
                      <dt className="font-montserrat font-bold text-[#F0E6D2]">{item.label}</dt>
                      <dd className="mt-1 text-[15px] leading-relaxed text-[#A69B8C]">
                        {item.body}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {/* Excerpt from the Discern case study */}
            <div className="rounded-2xl border border-[#E3B457]/15 bg-[#100C08] p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-[#E3B457]" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A7F6E]">
                  From the book — Chapter One
                </p>
              </div>

              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#C4B9A8]">
                <p>
                  “One afternoon, Rachel mentioned that Craig had helped her understand ‘what was
                  really happening’ within the church. She was not complaining, yet her words
                  carried a quiet certainty that Daniel had not heard from her before.
                </p>
                <p>
                  Still, nothing had erupted into conflict. No accusations had been made publicly.
                  No one had openly challenged leadership. If Daniel were not paying attention, he
                  could easily dismiss the situation as enthusiasm or personality.
                </p>
                <p className="font-montserrat text-lg italic text-[#E3B457]">
                  Yet discernment often begins with noticing what others overlook.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Audience */}
      <section className="border-t border-[#E3B457]/10 py-20 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Who this is for</SectionLabel>
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-[#F5EEE0] sm:text-4xl">
              Wherever God entrusts people into someone’s care
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#A69B8C]">
              Shepherding is not limited to a single office. The New Testament consistently
              portrays it as a broader function within the body of Christ.
            </p>
          </div>

          <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {AUDIENCE.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-[#E3B457]/10 bg-[#100C08] px-5 py-4"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#E3B457]" />
                <span className="text-[15px] text-[#C4B9A8]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- Endorsements */}
      {endorsements.length > 0 && (
        <section className="border-t border-[#E3B457]/10 bg-[#0C0906] py-20 sm:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel>What leaders are saying</SectionLabel>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {endorsements.map((item) => (
                <figure
                  key={item.name}
                  className="rounded-2xl border border-[#E3B457]/15 bg-[#100C08] p-7"
                >
                  <Quote className="h-6 w-6 text-[#E3B457]/50" />
                  <blockquote className="mt-4 text-[15px] italic leading-relaxed text-[#C4B9A8]">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-[#E3B457]/10 pt-4">
                    <p className="font-montserrat font-bold text-[#F0E6D2]">{item.name}</p>
                    {item.role && <p className="mt-0.5 text-sm text-[#8A7F6E]">{item.role}</p>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------- The author */}
      <section className="border-t border-[#E3B457]/10 py-20 sm:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-[200px_1fr] sm:items-start sm:gap-12">
            <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-full ring-2 ring-[#E3B457]/25 sm:mx-0 sm:w-full">
              <Image
                src="/drJosh/drJoshSeriousLook.jpg"
                alt="Dr. Joshua Todd"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>

            <div>
              <SectionLabel>The author</SectionLabel>
              <h2 className="font-montserrat text-3xl font-bold text-[#F5EEE0]">Dr. Joshua Todd</h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#A69B8C]">
                <p>
                  Dr. Joshua Todd is the Founder and Chancellor of Kingdom Champions College and
                  the Senior Leader of East Gate Jacksonville. For more than twenty years he has
                  walked leaders through situations most never hope to face, yet nearly every
                  kingdom leader eventually encounters.
                </p>
                <p>
                  The patterns taught in this masterclass were not learned from theory. They were learned in
                  prayer meetings where tension quietly rose in the room, in long conversations
                  where wounded hearts slowly revealed themselves, and in nights of prayer asking
                  the Lord for wisdom — not merely to remove a problem, but to handle people in a
                  way that reflects the heart of the Father.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ FAQ */}
      <section className="border-t border-[#E3B457]/10 bg-[#0C0906] py-20 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <SectionLabel>Questions</SectionLabel>
              <h2 className="font-montserrat text-3xl font-bold text-[#F5EEE0] sm:text-4xl">
                Before you decide
              </h2>
            </div>
            <div className="mt-12">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Final CTA */}
      <section className="relative overflow-hidden border-t border-[#E3B457]/20">
        <Image
          src="/shepherds7/banner.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0806] via-[#0A0806]/92 to-[#0A0806]" />

        <div className="container relative z-10 py-24 text-center sm:py-28">
          <div className="mx-auto max-w-2xl">
            <SectionLabel>A concerned leader’s charge</SectionLabel>

            <div className="space-y-2 font-montserrat text-lg text-[#C4B9A8] sm:text-xl">
              <p>Scripture never pretends that wolves do not exist.</p>
              <p>Jesus warned about them.</p>
              <p>Paul prepared leaders for them.</p>
              <p>Peter reminded elders that the flock must be guarded with vigilance.</p>
            </div>

            <p className="mt-10 font-montserrat text-2xl font-bold leading-tight text-[#F5EEE0] sm:text-3xl">
              The flock must be guarded. And wolves hiding within the hearts are in season for
              hunting.
            </p>

            <div className="mt-12">
              <CheckoutCta
                href={checkoutUrl}
                label={ctaLabel}
                location="final"
                size="large"
              />
              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[#E3B457]/25 bg-[#100C08] p-7">
                {settings?.valueStack && settings.valueStack.length > 0 && (
                  <>
                    <ul className="space-y-2.5 text-left">
                      {settings.valueStack.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-baseline justify-between gap-4 text-sm"
                        >
                          <span className="text-[#C4B9A8]">{item.label}</span>
                          <span className="shrink-0 font-montserrat font-semibold text-[#8A7F6E]">
                            {item.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {settings.totalValue && (
                      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-[#E3B457]/15 pt-4 text-sm">
                        <span className="font-montserrat font-semibold text-[#C4B9A8]">
                          Total value
                        </span>
                        <span className="font-montserrat font-bold text-[#8A7F6E] line-through">
                          {settings.totalValue}
                        </span>
                      </div>
                    )}
                  </>
                )}

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A7F6E]">
                  Your price today
                </p>
                <p className="mt-1 flex items-baseline justify-center gap-3">
                  <span className="font-montserrat text-5xl font-extrabold text-[#F5EEE0]">
                    {price}
                  </span>
                  {settings?.compareAtPrice && (
                    <span className="font-montserrat text-xl text-[#8A7F6E] line-through">
                      {settings.compareAtPrice}
                    </span>
                  )}
                </p>
                {settings?.priceNote && (
                  <p className="mt-2 text-sm text-[#A69B8C]">{settings.priceNote}</p>
                )}
                {settings?.priceAnchor && (
                  <p className="mt-3 text-sm italic text-[#8A7F6E]">{settings.priceAnchor}</p>
                )}
              </div>

              {settings?.guarantee && (
                <p className="mt-3 text-sm text-[#8A7F6E]">{settings.guarantee}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Minimal funnel footer */}
      <footer className="border-t border-[#E3B457]/10 py-10 pb-24 lg:pb-10">
        <div className="container flex flex-col items-center gap-3 text-center">
          <Link
            href="/"
            className="font-montserrat text-sm font-bold tracking-wide text-[#F0E6D2]/80 transition-colors hover:text-[#E3B457]"
          >
            Dr. Joshua Todd
          </Link>
          <p className="text-xs text-[#6E6558]">
            © {new Date().getFullYear()} Dr. Joshua F. Todd. All rights reserved.
          </p>
        </div>
      </footer>

      <StickyCta href={checkoutUrl} label={ctaLabel} price={price} />
    </div>
  )
}
