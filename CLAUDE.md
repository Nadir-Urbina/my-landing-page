# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 personal landing page for Dr. Joshua Todd with integrated Sanity CMS for content management. The site features ministry content, events, blog posts, a calendar, Healing Streams resources, School of Encounter program information, and a comprehensive CAMP Season 3 management system with Stripe payment integration.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run linter (ESLint is configured to not block builds)
npm run lint
```

## Architecture

### Next.js App Router Structure
- [app/](app/) - Pages and layouts
- [app/api/](app/api/) - API routes
- [app/studio/](app/studio/) - Sanity Studio mounted at `/studio`
- [components/](components/) - Shared React components; shadcn/ui primitives in [components/ui/](components/ui/)
- [lib/](lib/) - Shared utilities and clients
- [sanity/schemas/](sanity/schemas/) - All Sanity content type schemas

### Content Management (Sanity CMS)

[lib/sanity.client.ts](lib/sanity.client.ts) is the primary data-fetching layer. It exports:
- `client` — published content only (`useCdn: true` in production)
- `urlFor(source)` / `urlForMobile(source, width)` — image URL builders (auto-format, quality 85/80)
- Typed fetch helpers: `getTestimonials`, `getEvents`, `getBooks`, `getMissions`, `getPosts`, `getPost(slug)`, `getCalendarEvents`, `getHealingStreamsContent`, `getHealingStreamsTestimonials`, `getHealingStreamsEvents`, `getMinistryLife`

For admin operations requiring draft access, create a separate Sanity client with `perspective: 'previewDrafts'`.

**On-demand ISR via Sanity webhook**: [app/api/revalidate/route.ts](app/api/revalidate/route.ts) receives Sanity webhooks and calls `revalidatePath()` for the affected content type. Requires `SANITY_REVALIDATE_SECRET` env var.

### CAMP Season 3 Management System

- Public application form: [app/camp-application/](app/camp-application/)
- Admin dashboard (auth-protected): [app/camp-admin/](app/camp-admin/)
- Payment portal: [app/camp-payment/](app/camp-payment/)
- Admin API routes: [app/api/camp-admin/](app/api/camp-admin/) — fetch applications/interests, update status, send payment links and emails

**Schema** ([sanity/schemas/camp-application.ts](sanity/schemas/camp-application.ts)) tracks:
- Application status: `pending | under_review | accepted | rejected | waitlisted`
- Payment status: `not_started | active | past_due | cancelled | incomplete`
- Stripe fields: `stripeCustomerId`, `stripeSubscriptionId`
- Communication log for applicant interactions

### Bot & Spam Protection

All public forms use three layers of protection:
1. **reCAPTCHA v3** — `useGoogleReCaptcha` hook on client; `verifyRecaptcha()` from [lib/recaptcha.ts](lib/recaptcha.ts) on server (score threshold 0.5)
2. **Rate limiting** — [lib/rate-limit.ts](lib/rate-limit.ts) provides `rateLimit(request)` and `rateLimitFormSubmission(request, email)`. **In-memory only** — not shared across multiple server instances.
3. **Spam detection** — [lib/spam-detection.ts](lib/spam-detection.ts) validates name/email content, honeypot field, and minimum form-fill time (3s)

[components/ReCaptchaProvider.tsx](components/ReCaptchaProvider.tsx) wraps the entire app in [app/layout.tsx](app/layout.tsx), so all pages have reCAPTCHA available.

#### Adding reCAPTCHA to new forms

Client-side: call `executeRecaptcha('action_name')` from `useGoogleReCaptcha` and include the token in the submission body.

Server-side:
```typescript
import { verifyRecaptcha } from '@/lib/recaptcha'
const isValid = await verifyRecaptcha(recaptchaToken)
if (!isValid) return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
```

### Key Integrations

**Stripe**: Subscription payments (not one-time). Checkout via [app/api/camp-payment/create-checkout/route.ts](app/api/camp-payment/create-checkout/route.ts); webhook at [app/api/camp-payment/webhook/route.ts](app/api/camp-payment/webhook/route.ts). Three monthly tiers: $100, $150, $200.

**Email**: Resend for transactional emails (contact form, CAMP notifications); Mailchimp for newsletter/interest form subscriptions.

### Environment Variables

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_TOKEN
SANITY_API_READ_TOKEN
SANITY_REVALIDATE_SECRET   # Protects /api/revalidate webhook endpoint

# Stripe
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
CAMP_PRICE_100   # Stripe Price ID for $100/month tier
CAMP_PRICE_150
CAMP_PRICE_200

# Email Services
RESEND_API_KEY
MAILCHIMP_API_KEY
MAILCHIMP_LIST_ID
MAILCHIMP_SERVER_PREFIX

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY
RECAPTCHA_SECRET_KEY

# Application
NEXT_PUBLIC_BASE_URL
```

### Styling

Tailwind CSS with custom config ([tailwind.config.ts](tailwind.config.ts)), shadcn/ui components, Framer Motion for animations. Global styles in [app/globals.css](app/globals.css).

### TypeScript Types

Sanity content types in [types/sanity.ts](types/sanity.ts). All types follow the Sanity schema structure defined in [sanity/schemas/](sanity/schemas/).
