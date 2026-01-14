import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Golf Travel & Breaks - Welton Golf',
  description: 'Discover the best golf breaks and travel destinations across the UK. Expert guides to golf courses, accommodations, and unforgettable golfing experiences.',
  alternates: {
    canonical: '/travel',
  },
}

const travelArticles = [
  {
    title: 'Best Golf Breaks in the UK',
    description: 'Discover the finest golf destinations across England, Scotland, and Wales for your next golf holiday.',
    href: '/travel/best-golf-breaks-uk',
    image: '/golf-breaks-uk.jpg'
  },
  {
    title: 'Best Golf Breaks in Wales',
    description: 'Explore Wales\' stunning golf courses and discover the perfect Welsh golf break for your next trip.',
    href: '/travel/best-golf-breaks-wales',
    image: '/golf-breaks-wales.jpg'
  },
  {
    title: 'Best Golf Breaks in Bournemouth',
    description: 'Experience exceptional golf breaks in Bournemouth with our guide to the best courses and accommodations.',
    href: '/travel/best-golf-breaks-bournemouth',
    image: '/golf-breaks-bournemouth.jpg'
  }
]

export default function TravelPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Travel
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover exceptional golf destinations and plan unforgettable golf breaks across the UK.
            From championship courses to hidden gems, find your perfect golfing getaway.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelArticles.map((article) => (
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