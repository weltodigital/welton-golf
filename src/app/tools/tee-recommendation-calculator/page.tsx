import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Golf Tee Recommendation Calculator 2026 - Choose the Right Tees | Welton Golf',
  description: 'Find the perfect tees for your game based on handicap, driving distance, and skill level. Free calculator for optimal course enjoyment and challenge.',
  keywords: 'golf tee recommendation, tee selection, golf tees, course management, handicap tees, golf yardage, driving distance',
  openGraph: {
    title: 'Free Golf Tee Recommendation Calculator 2026 - Choose the Right Tees',
    description: 'Choose the perfect tees for your skill level and driving distance. Optimize your course experience with our free calculator.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/tee-recommendation-calculator',
    images: [
      {
        url: 'https://www.weltongolf.com/tee-recommendation-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Tee Recommendation Calculator - Choose the Right Tees',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/tee-recommendation-calculator',
  },
}

export default function TeeRecommendationCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Free Golf Tee Recommendation Calculator
          </h1>
          <p className="text-gray-700 text-lg">
            Choose the perfect tees based on your handicap, driving distance, and skill level for optimal course enjoyment.
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