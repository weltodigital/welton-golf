import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Club Length Calculator - Perfect Sizing | Welton Golf',
  description: 'Calculate the optimal golf club length based on your height, arm length, swing characteristics, and posture. Get custom club length recommendations.',
  keywords: 'golf club length calculator, custom club length, club fitting length, golf club sizing, club length guide, golf club measurements, personalized club length',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/club-length-calculator',
  },
  openGraph: {
    title: 'Golf Club Length Calculator - Find Your Perfect Club Length',
    description: 'Calculate the optimal golf club length based on your height, arm length, and swing characteristics. Get custom recommendations.',
    url: 'https://www.weltongolf.com/club-length-calculator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-club-length-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Club Length Calculator - Perfect Club Sizing',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Club Length Calculator - Find Your Perfect Club Length',
    description: 'Calculate the optimal golf club length based on your height and swing characteristics.',
    images: ['/golf-club-length-calculator-twitter.jpg'],
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

export default function ClubLengthCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}