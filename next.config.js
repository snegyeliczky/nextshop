/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.gettyimages.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
