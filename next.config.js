/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
