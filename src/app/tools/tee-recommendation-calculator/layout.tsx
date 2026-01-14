import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Golf Tee Recommendation Calculator - Find Your Perfect Tee Height | Welton Golf',
  description: 'Calculate the optimal tee height for your golf clubs based on club type, swing characteristics, and playing preferences. Improve your tee shot consistency.',
  keywords: 'golf tee calculator, tee height calculator, golf tee recommendations, optimal tee height, golf tee selection, driver tee height, iron tee height',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/tee-recommendation-calculator',
  },
  openGraph: {
    title: 'Golf Tee Recommendation Calculator - Find Your Perfect Tee Height',
    description: 'Calculate the optimal tee height for your golf clubs based on club type and swing characteristics. Improve your tee shot consistency.',
    url: 'https://www.weltongolf.com/tee-recommendation-calculator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-tee-recommendation-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Tee Recommendation Calculator - Perfect Tee Height',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Tee Recommendation Calculator - Find Your Perfect Tee Height',
    description: 'Calculate the optimal tee height for your golf clubs based on club type and swing characteristics.',
    images: ['/golf-tee-recommendation-calculator-twitter.jpg'],
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

export default function TeeRecommendationCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}