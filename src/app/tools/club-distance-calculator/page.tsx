import { Metadata } from 'next'
import { ClubDistanceCalculatorComponent } from './ClubDistanceCalculatorComponent'

export const metadata: Metadata = {
  title: 'Free Golf Club Distance Calculator 2026 - Distance Chart Builder | Welton Golf',
  description: 'Create your personal golf club distance chart with carry and total distances. Free tool with swing speed estimation and gap analysis for better course management.',
  keywords: 'club distance calculator, golf distance chart, club distances, golf club yardage, distance gaps, course management, golf club selection, swing speed distances',
  openGraph: {
    title: 'Free Golf Club Distance Calculator 2026 - Personal Distance Chart Builder',
    description: 'Build your personal club distance chart for better course management. Free calculator with carry and total distance tracking.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/club-distance-calculator',
    images: [
      {
        url: 'https://www.weltongolf.com/club-distance-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Club Distance Calculator - Personal Distance Chart Builder',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/club-distance-calculator',
  },
}

export default function ClubDistanceCalculatorPage() {
  return <ClubDistanceCalculatorComponent />
}