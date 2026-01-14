import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Break 90 in Golf - Expert Tips & Strategies - Welton Golf',
  description: 'Learn proven strategies and techniques to consistently break 90 in golf. Expert tips on course management, practice routines, and mental game improvements.',
  alternates: {
    canonical: '/break-90',
  },
}

export default function Break90Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Break 90 in Golf
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Master the strategies and techniques needed to consistently shoot under 90.
            From course management to mental game, discover the path to better golf.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-light border border-brand-primary/20 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Coming Soon: Comprehensive Break 90 Guide</h2>
            <p className="text-gray-700 mb-6">
              We're developing detailed guides and strategies to help you consistently break 90. This section will include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Course management strategies for mid-handicap golfers</li>
              <li>Short game fundamentals to save strokes</li>
              <li>Practice routines that deliver real results</li>
              <li>Mental game techniques for consistent performance</li>
              <li>Equipment recommendations for breaking 90</li>
              <li>Common mistakes and how to avoid them</li>
            </ul>
            <p className="text-gray-700">
              In the meantime, use our <Link href="/tools/handicap-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">handicap calculator</Link> and other tools to track your progress.
            </p>
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