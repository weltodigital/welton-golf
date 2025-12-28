import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Golf Altitude Distance Calculator - High Elevation Course Adjustments | Welton Golf',
  description: 'Calculate distance adjustments for high-altitude golf courses. Account for air density, temperature, and humidity effects to improve your mountain golf game.',
  keywords: 'golf altitude calculator, high elevation golf, mountain golf calculator, golf distance adjustments, altitude distance calculator, golf course elevation',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/altitude-distance-calculator',
  },
  openGraph: {
    title: 'Golf Altitude Distance Calculator - High Elevation Course Adjustments',
    description: 'Calculate distance adjustments for high-altitude golf courses. Account for air density and environmental effects.',
    url: 'https://www.weltongolf.com/altitude-distance-calculator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-altitude-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Altitude Distance Calculator - Mountain Golf Adjustments',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Altitude Distance Calculator - High Elevation Adjustments',
    description: 'Calculate distance adjustments for high-altitude golf courses. Perfect for mountain golf.',
    images: ['/golf-altitude-calculator-twitter.jpg'],
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

export default function AltitudeDistanceCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}