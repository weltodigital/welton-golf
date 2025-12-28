import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Golf Playing Time Estimator - Calculate Round Duration | Welton Golf',
  description: 'Estimate how long your golf round will take based on course difficulty, group size, playing pace, and course conditions. Plan your golf schedule accurately.',
  keywords: 'golf time calculator, golf round duration, playing time estimator, golf pace calculator, golf scheduling, round time planner, golf course timing',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/playing-time-estimator',
  },
  openGraph: {
    title: 'Golf Playing Time Estimator - Calculate Round Duration',
    description: 'Estimate how long your golf round will take based on course difficulty, group size, and playing pace. Plan your schedule accurately.',
    url: 'https://www.weltongolf.com/playing-time-estimator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-playing-time-estimator.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Playing Time Estimator - Round Duration Calculator',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Playing Time Estimator - Calculate Round Duration',
    description: 'Estimate how long your golf round will take based on course difficulty and group size.',
    images: ['/golf-playing-time-estimator-twitter.jpg'],
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

export default function PlayingTimeEstimatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}