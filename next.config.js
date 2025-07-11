

/** @type {import('next').NextConfig} */
const nextConfig = ({
  reactStrictMode: false,
  // Enable experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled due to critters dependency issue
  },
  // Enable compression
  compress: true,
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
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
  // Optimize bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.chunks = 'all';
    }
    return config;
  },
  // Add cache headers
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
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