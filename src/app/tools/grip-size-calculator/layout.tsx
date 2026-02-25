import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Grip Size Calculator - Perfect Grip Size | Welton Golf',
  description: 'Calculate the ideal golf grip size based on your hand measurements and playing preferences. Get personalized grip recommendations for better control and comfort.',
  keywords: 'golf grip size calculator, grip size guide, golf grip fitting, hand measurement golf, golf grip recommendations, custom golf grips, grip size chart',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/grip-size-calculator',
  },
  openGraph: {
    title: 'Golf Grip Size Calculator - Find Your Perfect Grip Size',
    description: 'Calculate the ideal golf grip size based on your hand measurements and playing preferences. Get personalized recommendations.',
    url: 'https://www.weltongolf.com/grip-size-calculator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-grip-size-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Grip Size Calculator - Perfect Grip Fitting',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Grip Size Calculator - Find Your Perfect Grip Size',
    description: 'Calculate the ideal golf grip size based on your hand measurements and playing preferences.',
    images: ['/golf-grip-size-calculator-twitter.jpg'],
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

export default function GripSizeCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}