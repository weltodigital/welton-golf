import { Metadata } from 'next'
import { ClubFittingEstimator } from './ClubFittingEstimator'

export const metadata: Metadata = {
  title: 'Free Golf Club Fitting Calculator 2026 - Equipment Fitting Guide | Welton Golf',
  description: 'Get personalized golf club fitting recommendations with our free calculator. Determine optimal shaft flex, club length, lie angle, and grip size based on your measurements and swing.',
  keywords: 'golf club fitting, golf equipment fitting, shaft flex calculator, club length calculator, golf club fitting guide, custom golf clubs, golf fitting recommendations',
  openGraph: {
    title: 'Free Golf Club Fitting Calculator - Equipment Fitting Guide',
    description: 'Get personalized golf club fitting recommendations. Free calculator for shaft flex, club length, lie angle, and grip size.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/club-fitting-estimator',
    images: [
      {
        url: 'https://www.weltongolf.com/golf-club-fitting-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Club Fitting Calculator - Equipment Recommendations',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/club-fitting-estimator',
  },
}

export default function ClubFittingEstimatorPage() {
  return <ClubFittingEstimator />
}