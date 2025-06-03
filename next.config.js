// /** @type {import('next').NextConfig} */
// const nextConfig = ({
//   reactStrictMode: false,
//   productionBrowserSourceMaps: false,
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     domains: [
//       'whpjewellers.s3.amazonaws.com',
//       'wamanharipethe.s3.amazonaws.com',
//       'wamanharipethe.s3.ap-south-1.amazonaws.com',
//       'whpjewellers.s3.ap-south-1.amazonaws.com'
//     ],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "wamanharipethe.s3.amazonaws.com",
//       },
//       {
//         protocol: "https",
//         hostname: "whpjewellers.s3.amazonaws.com",
//       },
//       {
//         protocol: "https",
//         hostname: "wamanharipethe.s3.ap-south-1.amazonaws.com",
//       },
//       {
//         protocol: "https",
//         hostname: "whpjewellers.s3.ap-south-1.amazonaws.com",
//       },
//     ],
//   },
// });

// module.exports = nextConfig;





/** @type {import('next').NextConfig} */
const redirectsConfig = require('./src/config/redirects.json');

const nextConfig = ({
  reactStrictMode: false,
  async redirects() {
    return [
      ...redirectsConfig.redirects,
      // Add dynamic route handling for query parameters
      {
        source: '/jewellery-for-women/mangalsutra.html',
        has: [
          {
            type: 'query',
            key: 'availablein',
          },
          {
            type: 'query',
            key: 'sortby',
          },
        ],
        destination: '/products?url=pc-mangalsutra',
        permanent: true,
      },
      {
        source: '/jewellery-for-women/mangalsutra.html',
        has: [
          {
            type: 'query',
            key: 'price',
          },
          {
            type: 'query',
            key: 'sortby',
          },
        ],
        destination: '/products?url=pc-mangalsutra',
        permanent: true,
      },
      {
        source: '/product/:path*',
        has: [
          {
            type: 'query',
            key: 'gQT',
          },
        ],
        destination: '/products?url=pc-mangalsutra',
        permanent: true,
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
  images: {
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
});

module.exports = nextConfig;