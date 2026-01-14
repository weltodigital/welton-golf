import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Golf Club Fitting Calculator - Custom Club Recommendations | Welton Golf',
  description: 'Get personalized golf club fitting recommendations with our comprehensive calculator. Analyze swing speed, height, and preferences for optimal club specifications.',
  keywords: 'golf club fitting calculator, custom golf clubs, club fitting recommendations, golf club specifications, club fitting analysis, golf equipment fitting',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/club-fitting-estimator',
  },
  openGraph: {
    title: 'Golf Club Fitting Calculator - Custom Club Recommendations | Welton Golf',
    description: 'Get personalized golf club fitting recommendations with our comprehensive calculator. Analyze swing and preferences for optimal specs.',
    url: 'https://www.weltongolf.com/club-fitting-estimator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-club-fitting-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Club Fitting Calculator - Custom Club Recommendations',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Club Fitting Calculator - Custom Club Recommendations',
    description: 'Get personalized golf club fitting recommendations with our comprehensive calculator.',
    images: ['/golf-club-fitting-calculator-twitter.jpg'],
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

export default function ClubFittingEstimatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}