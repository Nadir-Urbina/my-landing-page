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

# Start production server
npm start

# Run linter (ESLint is configured to not block builds)
npm run lint
```

## Architecture

### Next.js App Router Structure
- [app/](app/) - Next.js 14 App Router pages and layouts
- [app/api/](app/api/) - API routes for backend functionality
- [app/studio/](app/studio/) - Sanity Studio mounted at `/studio`

### Content Management (Sanity CMS)
- [sanity/](sanity/) - Sanity configuration and structure
- [sanity/schemas/](sanity/schemas/) - Sanity schema definitions
- [schemas/](schemas/) - Additional schema type definitions
- [lib/sanity.client.ts](lib/sanity.client.ts) - Sanity client configuration and data fetching functions
- Sanity Studio is accessible at `/studio` route
- Use [sanity.config.ts](sanity.config.ts) for Sanity Studio configuration

### Key Integrations

**Sanity CMS**: Headless CMS for all content (blog posts, events, testimonials, courses, CAMP applications)
- Project ID and dataset configured via environment variables
- Two clients: standard `client` (published content) and `adminClient` (includes drafts)
- Image optimization via `@sanity/image-url`

**Stripe Payments**: CAMP Season 3 subscription payment processing
- Checkout sessions created via [app/api/camp-payment/create-checkout/route.ts](app/api/camp-payment/create-checkout/route.ts)
- Webhook handling for payment events at [app/api/camp-payment/webhook/route.ts](app/api/camp-payment/webhook/route.ts)
- Three payment tiers: $100, $150, $200 monthly (configured in environment)

**Email Services**:
- Resend API for transactional emails (contact form, CAMP notifications)
- Mailchimp for newsletter subscriptions

**Bot Protection (reCAPTCHA v3)**:
- Google reCAPTCHA v3 integrated on all public forms
- Client-side: [components/ReCaptchaProvider.tsx](components/ReCaptchaProvider.tsx) wraps the entire app
- Server-side: [lib/recaptcha.ts](lib/recaptcha.ts) provides `verifyRecaptcha()` function
- Forms protected: Contact form, CAMP application, School of Encounter interest form
- Score threshold: 0.5 (configurable in verification utility)

### CAMP Season 3 Management System

The CAMP Season 3 program includes:
- Public application form: [app/camp-application/](app/camp-application/)
- Admin dashboard: [app/camp-admin/](app/camp-admin/)
- Payment portal: [app/camp-payment/](app/camp-payment/)

**Admin API Routes** (all in [app/api/camp-admin/](app/api/camp-admin/)):
- `applications/route.ts` - Fetch all applications (including drafts)
- `interests/route.ts` - Fetch camp interest submissions
- `update-status/route.ts` - Update application status
- `send-payment-link/route.ts` - Send payment links to applicants
- `send-email/route.ts` - Send emails to applicants
- `auth/route.ts` - Simple authentication for admin dashboard

**CAMP Application Schema** ([sanity/schemas/camp-application.ts](sanity/schemas/camp-application.ts)):
- Tracks application status: pending, under_review, accepted, rejected, waitlisted
- Payment status: not_started, active, past_due, cancelled, incomplete
- Stripe integration fields: stripeCustomerId, stripeSubscriptionId
- Communication log for tracking all applicant interactions

### Content Types

**Core Content** (defined in [sanity/schemas/](sanity/schemas/)):
- `book` - Published books
- `testimonial` - General testimonials
- `event` - Ministry events
- `mission` - Mission trips
- `post` - Blog posts with comments and likes
- `calendarEvent` - Calendar events
- `comment` - Blog post comments (requires approval)

**Specialized Programs**:
- `healingStreamsTestimonial` - Healing Streams specific testimonials
- `healingStreamsEvent` - Healing Streams events
- `course` - School of Encounter courses
- `instructor` - School of Encounter instructors
- `interestForm` - School of Encounter interest form submissions
- `ministry` - Ministry life sections

**CAMP Season 3**:
- `campApplication` - CAMP applications with full lifecycle management
- `campInterest` - Info request submissions

### API Routes

**Blog Features**:
- `blog/[slug]/comments/route.ts` - POST new comments, GET approved comments
- `blog/[slug]/like/route.ts` - POST to increment like count

**Forms** (all protected with reCAPTCHA v3):
- `contact/route.ts` - Contact form submissions (Resend email)
- `newsletter/route.ts` - Newsletter signup (Mailchimp)
- `subscribe/route.ts` - Subscription handling
- `school-interest/route.ts` - School of Encounter interest form (Mailchimp + Sanity)
- `camp-application/route.ts` - CAMP application submission (Sanity + email notifications)

**Admin Operations**:
- CAMP admin routes require authentication (check auth/route.ts)
- Use `perspective: 'previewDrafts'` in Sanity client to see draft documents

### Environment Variables

Required environment variables (see [.env.local](.env.local)):

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_TOKEN
SANITY_API_READ_TOKEN

# Stripe
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
CAMP_PRICE_100  # Price ID for $100/month tier
CAMP_PRICE_150  # Price ID for $150/month tier
CAMP_PRICE_200  # Price ID for $200/month tier

# Email Services
RESEND_API_KEY
MAILCHIMP_API_KEY
MAILCHIMP_LIST_ID
MAILCHIMP_SERVER_PREFIX

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY  # Public site key for client-side
RECAPTCHA_SECRET_KEY            # Secret key for server-side verification

# Application
NEXT_PUBLIC_BASE_URL
```

### Styling

- Tailwind CSS with custom configuration ([tailwind.config.ts](tailwind.config.ts))
- shadcn/ui components in [components/ui/](components/ui/)
- Global styles in [app/globals.css](app/globals.css)
- Framer Motion for animations

### TypeScript Types

- Sanity content types defined in [types/sanity.ts](types/sanity.ts)
- Type definitions follow Sanity schema structure

## Data Fetching Patterns

Use the helper functions in [lib/sanity.client.ts](lib/sanity.client.ts):
- `getTestimonials()` - Fetch all testimonials
- `getEvents()` - Fetch ministry events
- `getBooks()` - Fetch books
- `getMissions()` - Fetch mission trips
- `getPosts()` - Fetch blog posts
- `getPost(slug)` - Fetch single blog post
- `getCalendarEvents()` - Fetch calendar events
- `getHealingStreamsContent()` - Fetch Healing Streams data
- `getMinistryLife()` - Fetch ministry sections

For admin operations requiring draft access, create a separate client with `perspective: 'previewDrafts'`.

## Important Notes

- ESLint errors do not block production builds (see [next.config.js](next.config.js))
- Images from Sanity CDN are configured in Next.js config
- Blog comments require approval before display
- CAMP applications use Stripe subscriptions, not one-time payments
- Admin dashboard has basic authentication (check implementation before production)
- All public forms are protected with reCAPTCHA v3 to prevent bot submissions

## Adding reCAPTCHA to New Forms

When creating new public forms:

1. **Client-side**: Use the `useGoogleReCaptcha` hook from `react-google-recaptcha-v3`
   ```typescript
   import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

   const { executeRecaptcha } = useGoogleReCaptcha()
   const token = await executeRecaptcha('form_action_name')
   // Include token in form submission
   ```

2. **Server-side**: Import and use the verification utility
   ```typescript
   import { verifyRecaptcha } from '@/lib/recaptcha'

   const isValid = await verifyRecaptcha(recaptchaToken)
   if (!isValid) {
     return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
   }
   ```

3. The ReCaptchaProvider is already configured in [app/layout.tsx](app/layout.tsx), so all pages have access to reCAPTCHA
