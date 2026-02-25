import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Club Distance Calculator - Golf Yardage | Welton Golf',
  description: 'Create a personalized golf club distance chart with our free calculator. Track your distances for better course management and improved scoring.',
  keywords: 'golf club distance calculator, golf distance chart, club yardage calculator, golf course management, golf club distances, personalized golf distances',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/club-distance-calculator',
  },
  openGraph: {
    title: 'Free Club Distance Calculator - Golf Yardage | Welton Golf',
    description: 'Create a personalized golf club distance chart with our free calculator. Track your distances for better course management.',
    url: 'https://www.weltongolf.com/club-distance-calculator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-club-distance-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Club Distance Calculator - Personal Yardage Chart',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Club Distance Calculator - Build Your Golf Distance Chart',
    description: 'Create a personalized golf club distance chart with our free calculator. Track your distances for better course management.',
    images: ['/golf-club-distance-calculator-twitter.jpg'],
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

export default function ClubDistanceCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}