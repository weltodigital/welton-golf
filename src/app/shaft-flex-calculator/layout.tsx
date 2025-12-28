import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Golf Shaft Flex Calculator - Find Your Perfect Shaft Flex | Welton Golf',
  description: 'Determine the ideal shaft flex for your golf clubs based on swing speed, tempo, and playing style. Get personalized shaft recommendations for optimal performance.',
  keywords: 'shaft flex calculator, golf shaft finder, shaft flex guide, swing speed shaft, golf club shaft, shaft flex recommendation, custom golf shafts',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/shaft-flex-calculator',
  },
  openGraph: {
    title: 'Golf Shaft Flex Calculator - Find Your Perfect Shaft Flex',
    description: 'Determine the ideal shaft flex for your golf clubs based on swing speed, tempo, and playing style. Get personalized recommendations.',
    url: 'https://www.weltongolf.com/shaft-flex-calculator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-shaft-flex-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Shaft Flex Calculator - Perfect Shaft Selection',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Shaft Flex Calculator - Find Your Perfect Shaft Flex',
    description: 'Determine the ideal shaft flex for your golf clubs based on swing speed and playing style.',
    images: ['/golf-shaft-flex-calculator-twitter.jpg'],
    creator: '@weltongolf',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ShaftFlexCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}