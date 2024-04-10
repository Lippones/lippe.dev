/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        hostname: 'media.istockphoto.com',
        protocol: 'https',
      },
      {
        hostname: 'images.pexels.com',
        protocol: 'https',
      },
    ],
  },
}

export default nextConfig
