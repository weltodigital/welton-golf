import { Metadata } from 'next'
import { StablefordCalculator } from './StablefordCalculator'

export const metadata: Metadata = {
  title: 'Free Stableford Calculator 2026 - Golf Stableford Points Calculator | Welton Golf',
  description: 'Calculate your Stableford points with our free golf scoring calculator. Track your rounds, understand scoring system, and improve your competitive golf game. Complete guide included.',
  keywords: 'stableford calculator, golf stableford points, stableford scoring system, golf competition scoring, stableford points calculator, modified stableford, golf scoring',
  openGraph: {
    title: 'Free Stableford Calculator - Golf Stableford Points Calculator',
    description: 'Calculate your Stableford points and track your competitive golf rounds. Free calculator with complete scoring guide.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/stableford-calculator',
    images: [
      {
        url: 'https://www.weltongolf.com/golf-stableford-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Stableford Calculator - Points Scoring System',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/stableford-calculator',
  },
}

export default function StablefordCalculatorPage() {
  return <StablefordCalculator />
}