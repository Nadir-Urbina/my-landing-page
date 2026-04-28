# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 14 personal landing page for Dr. Joshua Todd with Sanity CMS. Features ministry content, events, blog, calendar, Healing Streams resources, School of Encounter program, and a CAMP Season 3 management system with Stripe subscription payments.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run linter (ESLint does NOT block builds — ignoreDuringBuilds: true in next.config.js)
npm run lint
```

No test suite exists in this project.

## Architecture

### Next.js App Router Structure
- [app/](app/) - Pages and layouts
- [app/api/](app/api/) - API routes
- [app/studio/](app/studio/) - Sanity Studio mounted at `/studio`
- [components/](components/) - Shared React components; shadcn/ui primitives in [components/ui/](components/ui/)
- [lib/](lib/) - Shared utilities and clients
- [sanity/schemas/](sanity/schemas/) - All Sanity content type schemas (**active**; root-level `schemas/` is legacy/unused)

### Content Management (Sanity CMS)

[lib/sanity.client.ts](lib/sanity.client.ts) is the primary data-fetching layer. It exports:
- `client` — published content only (`useCdn: true` in production). Also used for **writes** (blog comments and like counts), so `SANITY_API_TOKEN` must have write permission.
- `urlFor(source)` / `urlForMobile(source, width)` — image URL builders (auto-format, quality 85/80)
- Typed fetch helpers: `getTestimonials`, `getEvents`, `getBooks`, `getMissions`, `getPosts`, `getPost(slug)`, `getCalendarEvents`, `getHealingStreamsContent`, `getHealingStreamsTestimonials`, `getHealingStreamsEvents`, `getMinistryLife`

For admin operations requiring draft access, create a separate Sanity client with `perspective: 'previewDrafts'`.

**On-demand ISR via Sanity webhook**: [app/api/revalidate/route.ts](app/api/revalidate/route.ts) receives Sanity webhooks and calls `revalidatePath()` for the affected content type. Requires `SANITY_REVALIDATE_SECRET` env var.

### Blog Comment & Like System

- Comments submitted to `POST /api/blog/[slug]/comments` are created in Sanity with `isApproved: false` — they must be manually approved in Sanity Studio before appearing on the site.
- Likes are stored directly as `likeCount` on the post document and incremented via `PATCH` using the same `client` (requires write token).

### CAMP Season 3 Management System

- Public application form: [app/camp-application/](app/camp-application/)
- Admin dashboard (password-protected via `CAMP_ADMIN_PWD` env var, **not session-based**): [app/camp-admin/](app/camp-admin/)
- Payment portal: [app/camp-payment/](app/camp-payment/)
- Admin API routes: [app/api/camp-admin/](app/api/camp-admin/) — fetch applications/interests, update status, send payment links and emails

**Schema** ([sanity/schemas/camp-application.ts](sanity/schemas/camp-application.ts)) tracks:
- Application status: `pending | under_review | accepted | rejected | waitlisted`
- Payment status: `not_started | active | past_due | cancelled | incomplete`
- Stripe fields: `stripeCustomerId`, `stripeSubscriptionId`
- Communication log for applicant interactions

### School of Encounter

[app/school-of-encounter/](app/school-of-encounter/) — Courses and instructors managed via Sanity (`course`, `instructor` schemas). Interest form submissions stored as `interestForm` documents in Sanity and synced to Mailchimp via [app/api/school-interest/route.ts](app/api/school-interest/route.ts).

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
SANITY_API_TOKEN          # Must have write permission (used for blog comments & likes)
SANITY_API_READ_TOKEN
SANITY_REVALIDATE_SECRET  # Protects /api/revalidate webhook endpoint

# Stripe
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
CAMP_PRICE_100            # Stripe Price ID for $100/month tier
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

# CAMP Admin
CAMP_ADMIN_PWD            # Plain-text password for CAMP admin dashboard

# Application
NEXT_PUBLIC_BASE_URL
```

### Styling

Tailwind CSS with custom config ([tailwind.config.ts](tailwind.config.ts)), shadcn/ui components, Framer Motion for animations. Global styles in [app/globals.css](app/globals.css). Inter is the global font; Montserrat is used on select pages.

### TypeScript Types

Sanity content types in [types/sanity.ts](types/sanity.ts). All types follow the Sanity schema structure defined in [sanity/schemas/](sanity/schemas/).
