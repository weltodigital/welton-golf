import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Swing Speed Calculator - Estimate Club Head Speed | Welton Golf',
  description: 'Calculate your golf swing speed from ball speed data. Free swing speed calculator with club recommendations and distance estimates. Improve your game with accurate measurements.',
  keywords: 'swing speed calculator, golf swing speed, clubhead speed calculator, ball speed to swing speed, golf club fitting, swing analysis, golf distance calculator, golf performance tools',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/swing-speed-calculator',
  },
  openGraph: {
    title: 'Swing Speed Calculator - Estimate Club Head Speed | Welton Golf',
    description: 'Calculate your golf swing speed from ball speed data. Free swing speed calculator with club recommendations and distance estimates.',
    url: 'https://www.weltongolf.com/swing-speed-calculator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-swing-speed-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Swing Speed Calculator - Clubhead Speed Analysis',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swing Speed Calculator - Estimate Club Head Speed | Welton Golf',
    description: 'Calculate your golf swing speed from ball speed data. Free swing speed calculator with club recommendations and distance estimates.',
    images: ['/golf-swing-speed-calculator-twitter.jpg'],
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

export default function SwingSpeedCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}