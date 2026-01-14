import Link from 'next/link'
import { Calculator, BookOpen, MapPin, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Golf Authority
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Professional golf tools, expert guides, and comprehensive resources to master every aspect of your game.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Golf Tools & Calculators Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Calculator className="h-8 w-8 text-brand-primary mr-4" />
            <h2 className="text-3xl font-bold text-gray-900">Golf Tools & Calculators</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Professional WHS-compliant tools for tracking handicaps, optimizing equipment, and analyzing performance.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link href="/tools/handicap-calculator" className="p-4 border rounded-lg hover:border-brand-primary hover:shadow-md transition-all">
              <div className="font-medium text-gray-900">Handicap Calculator</div>
              <div className="text-sm text-gray-600">WHS compliant tracking</div>
            </Link>
            <Link href="/tools/course-handicap-calculator" className="p-4 border rounded-lg hover:border-brand-primary hover:shadow-md transition-all">
              <div className="font-medium text-gray-900">Course Handicap</div>
              <div className="text-sm text-gray-600">Course-specific calculations</div>
            </Link>
            <Link href="/tools/stableford-calculator" className="p-4 border rounded-lg hover:border-brand-primary hover:shadow-md transition-all">
              <div className="font-medium text-gray-900">Stableford Calculator</div>
              <div className="text-sm text-gray-600">Points-based scoring</div>
            </Link>
            <Link href="/tools/ball-speed-calculator" className="p-4 border rounded-lg hover:border-brand-primary hover:shadow-md transition-all">
              <div className="font-medium text-gray-900">Ball Speed Calculator</div>
              <div className="text-sm text-gray-600">Distance optimization</div>
            </Link>
            <Link href="/tools/swing-speed-calculator" className="p-4 border rounded-lg hover:border-brand-primary hover:shadow-md transition-all">
              <div className="font-medium text-gray-900">Swing Speed Calculator</div>
              <div className="text-sm text-gray-600">Performance analysis</div>
            </Link>
            <Link href="/tools/club-distance-calculator" className="p-4 border rounded-lg hover:border-brand-primary hover:shadow-md transition-all">
              <div className="font-medium text-gray-900">Club Distance</div>
              <div className="text-sm text-gray-600">Yardage tracking</div>
            </Link>
          </div>
          <div className="mt-6">
            <Link href="/tools" className="inline-flex items-center text-brand-primary font-medium hover:text-brand-secondary">
              View all 18+ golf tools
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Golf Travel Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <MapPin className="h-8 w-8 text-brand-primary mr-4" />
            <h2 className="text-3xl font-bold text-gray-900">Golf Travel & Breaks</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Discover the finest golf destinations across the UK. Expert guides to championship courses, hidden gems, and unforgettable golf experiences.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/travel/best-golf-breaks-uk" className="group">
              <article className="border rounded-lg p-6 hover:border-brand-primary hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-primary">Best Golf Breaks in the UK</h3>
                <p className="text-gray-600 text-sm">Championship courses and luxury accommodations across England, Scotland, and Wales.</p>
              </article>
            </Link>
            <Link href="/travel/best-golf-breaks-wales" className="group">
              <article className="border rounded-lg p-6 hover:border-brand-primary hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-primary">Best Golf Breaks in Wales</h3>
                <p className="text-gray-600 text-sm">Stunning coastal links and mountain courses in the heart of Wales.</p>
              </article>
            </Link>
            <Link href="/travel/best-golf-breaks-bournemouth" className="group">
              <article className="border rounded-lg p-6 hover:border-brand-primary hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-primary">Best Golf Breaks in Bournemouth</h3>
                <p className="text-gray-600 text-sm">Exceptional golf experiences on England's south coast.</p>
              </article>
            </Link>
          </div>
          <div className="mt-6">
            <Link href="/travel" className="inline-flex items-center text-brand-primary font-medium hover:text-brand-secondary">
              Explore all travel guides
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Golf Improvement Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <TrendingUp className="h-8 w-8 text-brand-primary mr-4" />
            <h2 className="text-3xl font-bold text-gray-900">Golf Improvement</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Master your game with expert strategies and proven techniques. From fundamentals to advanced tactics, achieve your scoring goals.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/break-100" className="group">
              <article className="border rounded-lg p-6 hover:border-brand-primary hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-primary">Break 100</h3>
                <p className="text-gray-600 text-sm">Master the fundamentals and build confidence to consistently break 100.</p>
              </article>
            </Link>
            <Link href="/break-90" className="group">
              <article className="border rounded-lg p-6 hover:border-brand-primary hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-primary">Break 90</h3>
                <p className="text-gray-600 text-sm">Advanced course management and strategies for shooting in the 80s.</p>
              </article>
            </Link>
            <Link href="/break-80" className="group">
              <article className="border rounded-lg p-6 hover:border-brand-primary hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-primary">Break 80</h3>
                <p className="text-gray-600 text-sm">Elite techniques and precision strategies for competitive-level golf.</p>
              </article>
            </Link>
          </div>
        </section>

        {/* Course Directory Section */}
        <section>
          <div className="flex items-center mb-8">
            <BookOpen className="h-8 w-8 text-brand-primary mr-4" />
            <h2 className="text-3xl font-bold text-gray-900">Course Directory</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Comprehensive database of golf courses across the UK. Find detailed information, ratings, and booking options for your next round.
          </p>
          <Link href="/course-directory" className="inline-flex items-center bg-brand-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-secondary transition-colors">
            Explore Golf Courses
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  )
}