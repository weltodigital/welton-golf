import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Range Ball Calculator - Practice Distance | Welton Golf',
  description: 'Convert practice range ball distances to real golf ball distances. Account for range ball compression differences and improve your distance accuracy.',
  keywords: 'range ball calculator, practice ball distance, golf range calculator, range ball conversion, practice distance calculator, golf ball compression',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/range-ball-distance-calculator',
  },
  openGraph: {
    title: 'Range Ball Distance Calculator - Practice Ball Distance Conversion',
    description: 'Convert practice range ball distances to real golf ball distances. Account for range ball compression differences.',
    url: 'https://www.weltongolf.com/range-ball-distance-calculator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-range-ball-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Range Ball Distance Calculator - Practice Ball Conversion',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Range Ball Distance Calculator - Practice Ball Distance Conversion',
    description: 'Convert practice range ball distances to real golf ball distances. Account for compression differences.',
    images: ['/golf-range-ball-calculator-twitter.jpg'],
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

export default function RangeBallDistanceCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}