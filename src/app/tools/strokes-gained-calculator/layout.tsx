import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Strokes Gained Calculator - Performance | Welton Golf',
  description: 'Analyze your golf performance with advanced strokes gained statistics. Compare your game to tour averages and identify areas for improvement with detailed analytics.',
  keywords: 'strokes gained calculator, golf performance analysis, golf statistics, strokes gained putting, strokes gained driving, golf analytics, golf improvement',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/strokes-gained-calculator',
  },
  openGraph: {
    title: 'Free Strokes Gained Calculator - Performance | Welton Golf',
    description: 'Analyze your golf performance with advanced strokes gained statistics. Compare your game to tour averages and identify improvement areas.',
    url: 'https://www.weltongolf.com/strokes-gained-calculator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-strokes-gained-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Strokes Gained Calculator - Golf Performance Analysis',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strokes Gained Calculator - Golf Performance Analysis',
    description: 'Analyze your golf performance with advanced strokes gained statistics. Compare your game to tour averages.',
    images: ['/golf-strokes-gained-calculator-twitter.jpg'],
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

export default function StrokesGainedCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}