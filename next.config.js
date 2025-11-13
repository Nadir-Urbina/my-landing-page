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
}

module.exports = nextConfig
