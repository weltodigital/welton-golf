import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Strokes Gained Calculator 2026 - Golf Performance Analytics | Welton Golf',
  description: 'Analyze your golf performance with strokes gained metrics. Track driving, approach, short game, and putting to identify strengths and improvement areas.',
  keywords: 'strokes gained calculator, golf analytics, golf performance tracker, strokes gained driving, strokes gained putting, golf statistics',
  openGraph: {
    title: 'Free Strokes Gained Calculator 2026 - Golf Performance Analytics',
    description: 'Track your golf performance with advanced strokes gained analytics. Identify strengths and areas for improvement.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/strokes-gained-calculator',
    images: [
      {
        url: 'https://www.weltongolf.com/strokes-gained-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Strokes Gained Calculator - Golf Performance Analytics',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/strokes-gained-calculator',
  },
}

export default function StrokesGainedCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Free Strokes Gained Calculator
          </h1>
          <p className="text-gray-700 text-lg">
            Analyze your golf performance with strokes gained metrics for driving, approach, short game, and putting.
          </p>
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <p className="text-blue-900">
              This calculator is currently being rebuilt. Please check back soon for the full functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}