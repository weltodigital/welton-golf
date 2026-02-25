import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Break 100 in Golf - Beginner Tips | Welton Golf',
  description: 'Master the fundamentals to consistently break 100 in golf. Essential tips for beginners on swing basics, course strategy, and building confidence on the course.',
  alternates: {
    canonical: '/break-100',
  },
}

export default function Break100Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Break 100
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Master the fundamentals and build the confidence needed to consistently break 100.
            Your journey to better golf starts with solid basics and smart course management.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-light border border-brand-primary/20 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Coming Soon: Complete Break 100 Guide</h2>
            <p className="text-gray-700 mb-6">
              We're creating comprehensive guides to help beginners consistently break 100. This section will feature:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Golf swing fundamentals for beginners</li>
              <li>Essential rules and etiquette for new golfers</li>
              <li>Course management strategies for high handicappers</li>
              <li>Equipment recommendations for beginners</li>
              <li>Practice drills that build confidence</li>
              <li>Mental game tips for overcoming first-tee nerves</li>
              <li>How to track and celebrate your progress</li>
            </ul>
            <p className="text-gray-700">
              Start tracking your scores with our <Link href="/tools/handicap-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">handicap calculator</Link> to monitor your improvement.
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