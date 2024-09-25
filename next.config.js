// Import next-pwa
const withPWA = require('next-pwa')({
  dest: 'public', 
  register: true, 
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wamanharipethe.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "wamanharipethe.s3.amazonaws.com/menu_images",
      },
      {
        protocol: "https",
        hostname: "wamanharipethe.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
  // Optionally, you can add more configurations here
});

module.exports = nextConfig;
