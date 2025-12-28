import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wind & Elevation Golf Calculator - Course Condition Adjustments | Welton Golf',
  description: 'Calculate distance adjustments for wind speed, direction, and elevation changes on the golf course. Factor in environmental conditions for more accurate club selection.',
  keywords: 'wind golf calculator, elevation golf calculator, golf course conditions, wind distance calculator, golf club selection, course management, environmental golf factors',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/wind-elevation-adjuster',
  },
  openGraph: {
    title: 'Wind & Elevation Golf Calculator - Course Condition Adjustments',
    description: 'Calculate distance adjustments for wind speed, direction, and elevation changes. Factor in environmental conditions for accurate club selection.',
    url: 'https://www.weltongolf.com/wind-elevation-adjuster',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-wind-elevation-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Wind & Elevation Golf Calculator - Course Condition Adjustments',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wind & Elevation Golf Calculator - Course Condition Adjustments',
    description: 'Calculate distance adjustments for wind speed, direction, and elevation changes on the golf course.',
    images: ['/golf-wind-elevation-calculator-twitter.jpg'],
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

export default function WindElevationAdjusterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}