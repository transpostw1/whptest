/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE,
  },
  reactStrictMode: false,
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
};

module.exports = nextConfig;
