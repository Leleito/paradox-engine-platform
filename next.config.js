/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
        },
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
        },
      ],
    },
    // Suppress hydration warnings in development
    reactStrictMode: true,
    // Enable experimental features for better performance
    experimental: {
      optimizePackageImports: ['lucide-react', '@headlessui/react'],
    },
    
    // Turbopack configuration (moved from experimental.turbo)
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },

    // Redirects for better user experience
    async redirects() {
      return [
        {
          source: '/Studio',
          destination: '/studio',
          permanent: true,
        },
        {
          source: '/studio/',
          destination: '/studio',
          permanent: true,
        },
        {
          source: '/subscribe',
          destination: '/signup',
          permanent: false,
        },
        {
          source: '/framework',
          destination: '/lead-magnet',
          permanent: false,
        },
        {
          source: '/book',
          destination: '/content',
          permanent: false,
        }
      ]
    },

    // Headers for better security and performance
    async headers() {
      return [
        {
          source: '/studio/:path*',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
          ],
        },
      ]
    },
}

module.exports = nextConfig