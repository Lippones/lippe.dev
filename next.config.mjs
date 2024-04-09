/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'https://github.com',
      },
    ],
  },
}

export default nextConfig
