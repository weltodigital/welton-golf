/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '/maps/api/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // Old root-level calculator URLs → new /tools/ paths
      {
        source: '/stableford-calculator',
        destination: '/tools/stableford-calculator',
        permanent: true,
      },
      {
        source: '/handicap-calculator',
        destination: '/tools/handicap-calculator',
        permanent: true,
      },
      {
        source: '/course-handicap-calculator',
        destination: '/tools/course-handicap-calculator',
        permanent: true,
      },
      {
        source: '/ball-speed-calculator',
        destination: '/tools/ball-speed-calculator',
        permanent: true,
      },
      {
        source: '/swing-speed-calculator',
        destination: '/tools/swing-speed-calculator',
        permanent: true,
      },
      {
        source: '/club-distance-calculator',
        destination: '/tools/club-distance-calculator',
        permanent: true,
      },
      // Old Shopify blog URLs → homepage (or relevant new pages if they exist)
      {
        source: '/blogs/:path*',
        destination: '/',
        permanent: true,
      },
      // Old Shopify collection/product paths (catch-all for any remaining Shopify URLs)
      {
        source: '/collections/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/products/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig