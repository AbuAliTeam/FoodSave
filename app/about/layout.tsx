import type { Metadata } from 'next'

// Метаданные для SEO оптимизации страницы "О проекте"
export const metadata: Metadata = {
  title: 'О проекте | FoodSave',
  description: 'Узнайте о миссии FoodSave - первой в Узбекистане платформе для борьбы с фуд-вейстом. Мы помогаем экономить деньги и спасать продукты от утилизации.',
  keywords: [
    'FoodSave',
    'фуд-вейст',
    'Узбекистан',
    'экология',
    'экономия',
    'устойчивое развитие',
    'President Tech Award',
    'социальный проект'
  ],
  openGraph: {
    title: 'О проекте FoodSave - Борьба с фуд-вейстом в Узбекистане',
    description: 'Первая в Узбекистане социально-ориентированная платформа для борьбы с продовольственными отходами и поддержки устойчивого развития.',
    url: 'https://foodsave.uz/about',
    siteName: 'FoodSave',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'FoodSave - О проекте',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'О проекте FoodSave - Борьба с фуд-вейстом в Узбекистане',
    description: 'Первая в Узбекистане социально-ориентированная платформа для борьбы с продовольственными отходами.',
    images: ['/og-about.jpg'],
  },
  alternates: {
    canonical: '/about',
  },
}

// Layout для страницы "О проекте"
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 