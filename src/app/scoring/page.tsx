import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Golf Scoring Tips & Strategies - Lower Your Scores - Welton Golf',
  description: 'Master golf scoring with expert strategies for course management, mental game, and shot selection. Learn proven techniques to consistently lower your golf scores.',
  keywords: 'golf scoring, lower golf scores, course management, golf strategy, golf mental game, scoring tips, golf improvement, break par',
  alternates: {
    canonical: '/scoring',
  },
}

export default function ScoringPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Scoring
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Master the art of scoring in golf. From course management to mental game strategies,
            discover the secrets to consistently lowering your scores.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Coming Soon: Comprehensive Scoring Guides</h2>
            <p className="text-gray-700 mb-6">
              We're developing detailed guides and strategies to help you master golf scoring. This section will include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Course management strategies for all skill levels</li>
              <li>Mental game techniques for pressure situations</li>
              <li>Shot selection and risk assessment</li>
              <li>Scoring formats: Stroke play, Stableford, Match play</li>
              <li>Recovery shots and damage control</li>
              <li>Pre-round preparation and course strategy</li>
              <li>Reading greens and lag putting for scoring</li>
              <li>Short game tactics around the green</li>
            </ul>
            <p className="text-gray-700">
              In the meantime, use our <Link href="/tools/stableford-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">Stableford calculator</Link> and <Link href="/tools/strokes-gained-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">Strokes Gained calculator</Link> to track and analyze your scoring performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Scoring Tools</h3>
              <p className="text-gray-700 mb-4">
                Use our professional scoring calculators to track and improve your performance.
              </p>
              <div className="space-y-2">
                <Link href="/tools/stableford-calculator" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → Stableford Points Calculator
                </Link>
                <Link href="/tools/strokes-gained-calculator" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → Strokes Gained Analytics
                </Link>
                <Link href="/tools/handicap-calculator" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → WHS Handicap Calculator
                </Link>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Related Categories</h3>
              <p className="text-gray-700 mb-4">
                Explore other areas to improve your overall game and scoring ability.
              </p>
              <div className="space-y-2">
                <Link href="/break-90" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → Break 90 Strategies
                </Link>
                <Link href="/break-80" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → Break 80 Techniques
                </Link>
                <Link href="/course-directory" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → Course Directory
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/tools"
              className="bg-brand-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-secondary transition-colors inline-flex items-center"
            >
              Explore Golf Tools
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}