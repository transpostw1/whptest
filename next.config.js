/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"wamanharipethe.s3.amazonaws.com",
            }
        ]
    },
}

module.exports = nextConfig
