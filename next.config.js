/** @type {import('next').NextConfig} */

module.exports = {
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
    },
}
