# Performance Improvement Plan for drjoshuatodd.com

Based on Speed Insights analysis showing Real Experience Score of 73 (mobile) with poor INP of 672ms.

## Priority 1: Critical Issues (Immediate)

### 1. Remove Unused Imports
**File**: `app/page.tsx`
- Remove unused `motion` import from framer-motion (line 6)
- Remove unused `useState, useEffect` imports (line 13) - these are for client components only
- **Impact**: Reduces client-side JavaScript bundle by ~50KB

**Action**:
```typescript
// Remove these lines:
import { motion } from "framer-motion"
import { useState, useEffect } from 'react'
```

### 2. Optimize Image Loading
**Current Issue**: Images from Sanity CDN may not be optimized for mobile
**Solution**: Add image optimization parameters

**File**: `lib/sanity.client.ts`
Update the `urlFor` function:
```typescript
export function urlFor(source: SanityImageSource): string {
  return builder
    .image(source)
    .auto('format') // Auto-format (WebP when supported)
    .quality(85)     // Reduce quality slightly for smaller files
    .url()
}

// Add a mobile-optimized version
export function urlForMobile(source: SanityImageSource, width: number = 800): string {
  return builder
    .image(source)
    .width(width)
    .auto('format')
    .quality(80)
    .url()
}
```

### 3. Enable Next.js Image Optimization
**File**: `next.config.js`
Add image optimization settings:
```javascript
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // ... rest of config
}
```

### 4. Implement Code Splitting for Heavy Components
**Issue**: Carousel and UI components load immediately
**Solution**: Dynamic imports with loading states

**Example**:
```typescript
import dynamic from 'next/dynamic'

const CarouselWrapper = dynamic(() =>
  import('@/components/CarouselWrapper').then(mod => ({ default: mod.CarouselWrapper })),
  { loading: () => <div className="h-64 bg-gray-100 animate-pulse" /> }
)
```

## Priority 2: Important (This Week)

### 5. Reduce Console.log Statements in Production
**File**: `app/page.tsx`
Remove or conditionally execute console.log statements (lines 34, 37, 39, 41, 44)
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Testimonials:', JSON.stringify(testimonials, null, 2))
}
```

### 6. Add Incremental Static Regeneration (ISR)
**File**: `app/page.tsx`
Change from `revalidate = 0` to a reasonable interval:
```typescript
// Instead of:
export const revalidate = 0

// Use ISR with 1 hour revalidation:
export const revalidate = 3600 // 1 hour in seconds
```

### 7. Implement Lazy Loading for Below-the-Fold Content
Use Next.js `loading` attribute for images below the fold:
```typescript
<Image
  src={imageUrl}
  alt={title}
  loading="lazy"  // Add this
  // ... other props
/>
```

### 8. Reduce Font Loading Impact
**File**: `app/page.tsx`
Optimize font loading:
```typescript
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',        // Add this
  preload: true,          // Add this
  variable: '--font-montserrat'  // CSS variable
})
```

## Priority 3: Optimization (This Month)

### 9. Implement React Server Components Properly
Move client-side interactivity to separate client components:
- Extract any interactive elements into `'use client'` components
- Keep server components pure for data fetching

### 10. Add Resource Hints
**File**: `app/layout.tsx`
```typescript
<head>
  <link rel="preconnect" href="https://cdn.sanity.io" />
  <link rel="dns-prefetch" href="https://cdn.sanity.io" />
  <link rel="preconnect" href="https://www.google.com" />
</head>
```

### 11. Optimize Third-Party Scripts
**Current**: reCAPTCHA, Vercel Analytics, Speed Insights all load on page load
**Solution**: Load reCAPTCHA only on pages with forms

Create a form-specific layout:
```typescript
// app/contact/layout.tsx
import { ReCaptchaProvider } from '@/components/ReCaptchaProvider'

export default function ContactLayout({ children }) {
  return <ReCaptchaProvider>{children}</ReCaptchaProvider>
}
```

Then remove ReCaptchaProvider from root layout for non-form pages.

### 12. Implement Caching Strategy
Add proper caching headers for static assets in `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ]
}
```

### 13. Reduce JavaScript Bundle Size
Run bundle analyzer:
```bash
npm install @next/bundle-analyzer
```

Add to `next.config.js`:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

Then run: `ANALYZE=true npm run build`

### 14. Optimize Sanity Queries
**File**: `lib/sanity.client.ts`
Add projection to limit data:
```typescript
export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
      _id,
      name,
      location,
      text[0..200], // Limit text to 200 chars
      "imageUrl": image.asset->url
    }[0..10]` // Limit to 10 testimonials
  )
}
```

## Expected Impact

| Optimization | Expected INP Improvement | Expected RES Improvement |
|-------------|-------------------------|-------------------------|
| Remove unused imports | -50ms | +3 points |
| Image optimization | -100ms | +5 points |
| Code splitting | -150ms | +8 points |
| ISR instead of revalidate=0 | -200ms | +10 points |
| Lazy loading | -50ms | +2 points |
| Font optimization | -100ms | +4 points |

**Total Expected Improvement**: INP from 672ms → ~320ms, RES from 73 → ~95+

## Monitoring

After implementing changes, monitor:
1. Vercel Speed Insights dashboard
2. Google PageSpeed Insights
3. Web Vitals in production

## Implementation Order

**Week 1** (Quick Wins):
1. Remove unused imports
2. Add image optimization
3. Remove console.logs

**Week 2** (Medium Impact):
4. Implement ISR
5. Add lazy loading
6. Optimize fonts

**Week 3** (High Impact):
7. Code splitting
8. Optimize third-party scripts
9. Bundle analysis and optimization

**Week 4** (Polish):
10. Resource hints
11. Caching strategy
12. Final testing and monitoring
