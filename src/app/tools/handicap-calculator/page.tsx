import { Metadata } from 'next'
import { HandicapCalculatorComponent } from './HandicapCalculatorComponent'

export const metadata: Metadata = {
  title: 'Free Golf Handicap Calculator (WHS) 2026 - WHS-Compliant Handicap Calculator | Welton Golf',
  description: 'Calculate your World Handicap System index instantly with our free WHS-compliant calculator. Track scores, understand your handicap, and improve your game. Complete guide included.',
  keywords: 'golf handicap calculator, WHS calculator, World Handicap System, golf handicap index, calculate golf handicap, free handicap calculator, WHS compliant, R&A handicap, USGA handicap',
  openGraph: {
    title: 'Free Golf Handicap Calculator (WHS) - WHS-Compliant Handicap Calculator',
    description: 'Calculate your handicap index with our WHS-compliant calculator. Free, accurate, and includes complete handicap improvement guide.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/handicap-calculator',
    images: [
      {
        url: 'https://www.weltongolf.com/golf-handicap-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Golf Handicap Calculator - World Handicap System',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/handicap-calculator',
  },
}

export default function HandicapCalculatorPage() {
  return <HandicapCalculatorComponent />
}