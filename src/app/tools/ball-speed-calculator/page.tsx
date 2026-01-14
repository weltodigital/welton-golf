import { Metadata } from 'next'
import { BallSpeedCalculatorComponent } from './BallSpeedCalculatorComponent'

export const metadata: Metadata = {
  title: 'Free Golf Ball Speed Calculator 2026 - Distance & Smash Factor Calculator | Welton Golf',
  description: 'Calculate golf ball speed, carry distance, and smash factor with our free physics-based calculator. Optimize your swing speed and launch conditions for maximum distance.',
  keywords: 'ball speed calculator, golf ball speed, smash factor calculator, swing speed calculator, golf distance calculator, launch monitor calculator, carry distance, golf physics',
  openGraph: {
    title: 'Free Golf Ball Speed Calculator 2026 - Distance & Smash Factor Analysis',
    description: 'Calculate ball speed, carry distance, and smash factor using physics-based models. Optimize your swing for maximum distance and efficiency.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/ball-speed-calculator',
    images: [
      {
        url: 'https://www.weltongolf.com/ball-speed-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Golf Ball Speed Calculator - Distance Analysis',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/ball-speed-calculator',
  },
}

export default function BallSpeedCalculatorPage() {
  return <BallSpeedCalculatorComponent />
}