/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint:{
        ignoreDuringBuilds:true,
    },
    typescript:{
        ignoreBuildErrors:true,
    },
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"wamanharipethe.s3.amazonaws.com",
            },{
                protocol:"https",
                hostname:"wamanharipethe.s3.amazonaws.com/menu_images",
            }
        ],
    },
}

module.exports = nextConfig
