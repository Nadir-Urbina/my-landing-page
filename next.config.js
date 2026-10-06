/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_CAMP_PRICE_100: process.env.CAMP_PRICE_100,
    NEXT_PUBLIC_CAMP_PRICE_150: process.env.CAMP_PRICE_150,
    NEXT_PUBLIC_CAMP_PRICE_200: process.env.CAMP_PRICE_200,
  },
  async redirects() {
    return [
      // CAMP now lives in the Content Creator Machine funnel, where the Meta
      // pixel and CAPI are installed. Temporary (307) on purpose: a permanent
      // redirect is cached by browsers indefinitely and would be painful to
      // undo. Switch `permanent` to true once the funnel is settled.
      // Note: this does NOT affect /camp-admin — that is a separate path.
      {
        source: '/camp',
        destination: 'https://ccm.drjoshuatodd.com/campv4-checkout',
        permanent: false,
      },
      {
        source: '/camp/:path*',
        destination: 'https://ccm.drjoshuatodd.com/campv4-checkout',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
