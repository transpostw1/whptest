

/** @type {import('next').NextConfig} */
const nextConfig = ({
  reactStrictMode: false,
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react', 'react-icons', 'framer-motion'],
    optimizeCss: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Enable compression
  compress: true,
  // Optimize images aggressively
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'whpjewellers.s3.amazonaws.com',
      'wamanharipethe.s3.amazonaws.com',
      'wamanharipethe.s3.ap-south-1.amazonaws.com',
      'whpjewellers.s3.ap-south-1.amazonaws.com'
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wamanharipethe.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "whpjewellers.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "wamanharipethe.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "whpjewellers.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
  // Cache optimization
  generateEtags: false,
  // Optimize bundle aggressively
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Optimize CSS extraction
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: 'styles',
          test: /\.(css|scss)$/,
          chunks: 'all',
          enforce: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
      };
      
      // Minimize CSS
      config.optimization.minimize = true;
    }
    return config;
  },
  // Enhanced aggressive cache headers
  async headers() {
    return [
      // Static images - 1 year cache
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
      // Next.js static assets - 1 year cache
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Fonts - 1 year cache
      {
        source: '/:all*(woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // CSS/JS files - 1 year cache
      {
        source: '/:all*(css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // API routes - 5 minutes cache
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300',
          },
        ],
      },
      // Service worker - no cache
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      // HTML pages - 1 hour cache
      {
        source: '/((?!api/).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // Security headers
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // {
      //   source: "/profile/customerOrders",
      //   destination: "/profile",
      //   permanent: true,
      // },
        {
        source: "/coins-bullion/:path*/buy-1-gram-gold-coin-online.html",
        destination: "products?url=search-gold_coin&source=search",
        permanent: true,
      },
      
      {
        source:"/jewellery-for-women/earrings.html",
        destination:"/products?url=pc-earrings",
        permanent:true,
      },
      {
        source:"/jewellery-for-men.html",
        destination:"/products?url=pc-all_jewellery_mens_jewellery",
        permanent:true,
      },
      {
        source:"/jewellery-for-women/necklaces/gold-necklaces.html",
        destination:"/products?url=pc-necklace",
        permanent:true,
      },
      {
        source:"/jewellery-for-women/bracelet-bangles.html",
        destination:"/products?url=pc-bangles_and_bracelet",
        permanent:true,
      },
      {
        source:"/jewellery-for-women.html",
        destination:"/products?url=pc-womens_jewellery",
        permanent:true,
      },
      {
        source:"/about-waman-hari-pethe-jewellers",
        destination:"/about-whpjewellers",
        permanent:true,
      },
      {
        source:"/prime-products.html",
        destination:"/products?url=pc-womens_jewellery",
        permanent:true,

      },
      {
        source:"/about-waman-hari-pethe-jewellers",
        destination:"/about-whpjewellers",
        permanent:true,
      },
      {
        source:"/9-ratna/loose-stones.html",
        destination:"/products?url=pc-gemstone_loose_stones",
        permanent:true,
      },
      
      {
        source:"/silver-articles/utensils.html",
        destination:"/products?url=pc-all_jewellery_silver_article",
        permanent:true,
      },
      {
        source:"/jewellery-for-women/necklaces.html",
        destination:"/products?url=pc-necklace",
        permanent:true,
      },
      {
        source:"/section/silver-pooja-items.html",
        destination:"/products?url=pc-all_jewellery_silver_article_pooja_articles",
        permanent:true,
      },
    ];
  },
  productionBrowserSourceMaps: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});

module.exports = nextConfig;