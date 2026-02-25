import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Break 80 in Golf - Advanced Strategies | Welton Golf',
  description: 'Learn advanced techniques and strategies to break 80 in golf. Expert tips on precision play, advanced course management, and competitive golf mindset.',
  alternates: {
    canonical: '/break-80',
  },
}

export default function Break80Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Break 80
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Master advanced strategies and precision techniques to consistently break 80.
            Take your game to the next level with expert insights and competitive strategies.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-light border border-brand-primary/20 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Coming Soon: Advanced Break 80 Strategies</h2>
            <p className="text-gray-700 mb-6">
              We're developing advanced guides for serious golfers aiming to break 80. This section will include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Advanced course management and strategy</li>
              <li>Precision iron play and approach shots</li>
              <li>Competitive mental game techniques</li>
              <li>Advanced short game mastery</li>
              <li>Tournament preparation strategies</li>
              <li>Data-driven practice methodologies</li>
              <li>Equipment optimization for low scores</li>
              <li>Reading greens like a professional</li>
            </ul>
            <p className="text-gray-700">
              Use our <Link href="/tools/handicap-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">handicap calculator</Link> and <Link href="/tools/stableford-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">stableford calculator</Link> to track your competitive rounds.
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