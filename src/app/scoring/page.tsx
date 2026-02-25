import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Golf Scoring Tips - Lower Your Scores | Welton Golf',
  description: 'Master golf scoring with expert strategies for course management, mental game, and shot selection. Learn proven techniques to consistently lower your golf scores.',
  keywords: 'golf scoring, lower golf scores, course management, golf strategy, golf mental game, scoring tips, golf improvement, break par',
  alternates: {
    canonical: '/scoring',
  },
}

const scoringArticles = [
  {
    title: 'How Golf Scoring Works',
    description: 'Master the fundamentals of golf scoring systems and start playing with confidence. Complete guide to stroke play, Stableford, match play and handicaps.',
    href: '/scoring/how-golf-scoring-works',
  },
  {
    title: 'Handicap Index Explained',
    description: 'Understanding your handicap index made simple. Learn how the WHS handicap system works, what your handicap index means, and how to use it effectively.',
    href: '/scoring/handicap-index-explained',
  },
  {
    title: 'Course Handicap vs Playing Handicap',
    description: 'Understand the crucial difference between course handicap and playing handicap. Learn when to use each and how they affect your golf scoring and competition play.',
    href: '/scoring/course-handicap-vs-playing-handicap',
  }
]

export default function ScoringPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Scoring
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Master the art of scoring in golf with expert strategies and proven techniques.
            Learn how to consistently lower your scores and play smarter golf.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scoringArticles.map((article) => (
            <article key={article.href} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-gray-900">
                  <Link href={article.href} className="hover:text-brand-primary transition-colors">
                    {article.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.description}
                </p>
                <Link
                  href={article.href}
                  className="inline-flex items-center text-brand-primary font-medium hover:text-brand-secondary transition-colors"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}