const redirects = require('./src/config/redirects.json');

/** @type {import('next').NextConfig} */
const nextConfig = ({
  reactStrictMode: false,
  async redirects() {
    // Load redirects from the JSON file
    return redirects.redirects;
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