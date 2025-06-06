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
}

module.exports = nextConfig