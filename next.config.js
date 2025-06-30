/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'foodsave.uz',
      },
      {
        protocol: 'https',
        hostname: 'api.foodsave.uz',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**', // разрешить любые домены для теста
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Настройки для PWA (Progressive Web App)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Оптимизация для продакшена
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig 