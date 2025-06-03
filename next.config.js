

/** @type {import('next').NextConfig} */
const redirectsFromFile = require("./src/config/redirects.json");
const nextConfig = ({
  reactStrictMode: false,
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
      // ...redirectsFromFile,
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