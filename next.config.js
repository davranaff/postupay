/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ['https://education07.pythonanywhere.com/media/'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'education07.pythonanywhere.com',
        port: '',
        pathname: '/media/**'
      }
    ]
  }
}

module.exports = nextConfig
