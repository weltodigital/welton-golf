import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Golf Trip Planner - Perfect Golf Holiday | Welton Golf',
  description: 'Plan the ultimate golf trip with our comprehensive trip planner. Find courses, accommodation, calculate costs, and create detailed itineraries for your golf holiday.',
  keywords: 'golf trip planner, golf holiday planner, golf vacation planner, golf travel guide, golf trip calculator, golf break planner, golf tour planner',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/golf-trip-planner',
  },
  openGraph: {
    title: 'Golf Trip Planner - Plan Your Perfect Golf Holiday',
    description: 'Plan the ultimate golf trip with our comprehensive trip planner. Find courses, accommodation, and create detailed itineraries.',
    url: 'https://www.weltongolf.com/golf-trip-planner',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-trip-planner.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Trip Planner - Perfect Golf Holiday Planning',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Trip Planner - Plan Your Perfect Golf Holiday',
    description: 'Plan the ultimate golf trip with our comprehensive trip planner. Find courses and create itineraries.',
    images: ['/golf-trip-planner-twitter.jpg'],
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

export default function GolfTripPlannerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}