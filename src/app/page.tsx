import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calculator, BookOpen, MapPin, TrendingUp, Users, Trophy, Calendar } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-50">

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Your Complete Golf Companion
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Everything you need to improve your golf game. From handicap tracking and course directories
              to expert guides and professional tools - all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg border-0" asChild>
                <Link href="/tools/handicap-calculator">Track Your Handicap</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg" asChild>
                <Link href="/blog/best-golf-breaks-uk">Discover Golf Breaks</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">

        {/* Main Categories */}
        <div className="mb-16">
          <h2 className="text-4xl font-black text-slate-900  mb-4 text-center tracking-tight">
            Everything Golf in One Place
          </h2>
          <p className="text-lg text-slate-700 mb-8 text-center max-w-3xl mx-auto">
            Whether you&apos;re tracking your handicap, planning your next golf trip, or looking to improve your game,
            we&apos;ve got you covered with professional tools and expert content.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Golf Tools & Calculators */}
            <div className="bg-white  rounded-lg p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Calculator className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900  mb-4 text-center">
                Golf Tools & Calculators
              </h3>
              <p className="text-slate-700 mb-6 text-center">
                Professional WHS handicap calculator, club fitting tools, distance calculators, and performance analyzers.
                Everything you need to track and improve your game.
              </p>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg border-0">
                  <Link href="/tools/handicap-calculator">
                    Explore Golf Tools
                  </Link>
                </Button>
              </div>
            </div>

            {/* Golf Travel & Breaks */}
            <div className="bg-white  rounded-lg p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900  mb-4 text-center">
                Golf Travel & Breaks
              </h3>
              <p className="text-slate-700 mb-6 text-center">
                Discover the best golf breaks in the UK and beyond. From Scotland&apos;s championship links to Wales&apos;
                hidden gems, plan your perfect golf getaway.
              </p>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg border-0">
                  <Link href="/blog/best-golf-breaks-uk">
                    Plan Your Golf Trip
                  </Link>
                </Button>
              </div>
            </div>

            {/* Golf Guides & Tips */}
            <div className="bg-white  rounded-lg p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900  mb-4 text-center">
                Golf Guides & Tips
              </h3>
              <p className="text-slate-700 mb-6 text-center">
                Master your game with expert guides and proven strategies. Learn how to break 90, 80, and beyond
                with comprehensive tutorials and professional insights.
              </p>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg border-0">
                  <Link href="/blog/how-to-break-90-golf">
                    Explore Golf Guides
                  </Link>
                </Button>
              </div>
            </div>

            {/* Course Directory */}
            <div className="bg-white  rounded-lg p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900  mb-4 text-center">
                Course Directory
              </h3>
              <p className="text-slate-700 mb-6 text-center">
                Discover golf courses near you with detailed information, ratings, reviews, and booking options.
                Find your perfect round from championship links to local favorites.
              </p>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg border-0">
                  <Link href="/course-directory">
                    Find Golf Courses
                  </Link>
                </Button>
              </div>
            </div>

            {/* Performance Tracking */}
            <div className="bg-white  rounded-lg p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900  mb-4 text-center">
                Performance Tracking
              </h3>
              <p className="text-slate-700 mb-6 text-center">
                Track your progress with professional handicap calculations, scoring analytics, and performance insights.
                Monitor your improvement and achieve your golfing goals.
              </p>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg border-0">
                  <Link href="/tools/handicap-calculator">
                    Track Your Game
                  </Link>
                </Button>
              </div>
            </div>

            {/* Golf Community */}
            <div className="bg-white  rounded-lg p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900  mb-4 text-center">
                Golf Community
              </h3>
              <p className="text-slate-700 mb-6 text-center">
                Connect with fellow golfers, share experiences, and discover amazing golf destinations.
                Join our community of passionate players across the UK and beyond.
              </p>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg border-0">
                  <Link href="/blog/best-golf-breaks-uk">
                    Join the Community
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Golf Stats Section */}
        <div className="mb-16">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-12 text-center">
            <h2 className="text-4xl font-black mb-8 text-slate-900 tracking-tight">
              Trusted by Golfers Across the UK
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-5xl font-black mb-2 text-emerald-600">15+</div>
                <div className="text-slate-700 font-medium">Professional Tools</div>
              </div>
              <div>
                <div className="text-5xl font-black mb-2 text-emerald-600">100%</div>
                <div className="text-slate-700 font-medium">WHS Compliant</div>
              </div>
              <div>
                <div className="text-5xl font-black mb-2 text-emerald-600">1000+</div>
                <div className="text-slate-700 font-medium">Golf Courses Listed</div>
              </div>
              <div>
                <div className="text-5xl font-black mb-2 text-emerald-600">24/7</div>
                <div className="text-slate-700 font-medium">Access Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-white rounded-lg p-8 shadow-lg mb-16">
          <h2 className="text-4xl font-black text-slate-900  mb-6 text-center tracking-tight">
            Why Golfers Choose Welton Golf
          </h2>
          <p className="text-center text-slate-700 mb-8 max-w-2xl mx-auto">
            Your complete golf companion offering professional tools, course directories, expert guides,
            and travel inspiration all in one trusted platform.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900  mb-2">Professional Tools</h3>
              <p className="text-sm text-slate-700">
                Access WHS-compliant handicap calculators, club fitting tools, and performance analyzers.
                All built to professional standards and trusted by golfers across the UK.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900  mb-2">Expert Content & Guides</h3>
              <p className="text-sm text-slate-700">
                Learn from comprehensive guides on breaking 90, 80, and beyond. Discover the best golf breaks,
                courses, and destinations with expert insights and recommendations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900  mb-2">Always Free Access</h3>
              <p className="text-sm text-slate-700">
                No registration required, no hidden fees. Access all tools, guides, and course information completely free
                on any device. Mobile-friendly design for on-the-go golf planning.
              </p>
            </div>
          </div>

          {/* Additional SEO content */}
          <div className="mt-8 p-8 rounded-xl border-2 border-emerald-200 bg-emerald-50">
            <h3 className="text-xl font-bold mb-6 text-center text-slate-900">
              Trusted by Golf Clubs and Players Across the UK
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-sm text-center">
              <div>
                <strong className="block text-emerald-600 text-2xl font-black mb-1">100%</strong>
                <span className="text-slate-700 font-medium">WHS Compliant</span>
              </div>
              <div>
                <strong className="block text-emerald-600 text-2xl font-black mb-1">20</strong>
                <span className="text-slate-700 font-medium">Rounds Tracking</span>
              </div>
              <div>
                <strong className="block text-emerald-600 text-2xl font-black mb-1">0</strong>
                <span className="text-slate-700 font-medium">Cost Forever</span>
              </div>
              <div>
                <strong className="block text-emerald-600 text-2xl font-black mb-1">24/7</strong>
                <span className="text-slate-700 font-medium">Access Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Golf Tools Directory */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-8 text-center tracking-tight">
            Complete Golf Calculator Suite
          </h2>
          <p className="text-center text-slate-700 mb-8 max-w-3xl mx-auto">
            Professional golf tools and calculators to track performance, plan equipment, and improve your game.
            All tools are WHS compliant and completely free to use.
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {/* Handicap & Scoring */}
            <div className="p-4 border border-slate-200 rounded-lg hover:border-emerald-300 transition-colors">
              <h4 className="font-bold text-emerald-600 mb-2">Handicap & Scoring</h4>
              <ul className="space-y-1 text-sm">
                <li><Link href="/tools/handicap-calculator" className="text-slate-700 hover:text-emerald-600">WHS Handicap Calculator</Link></li>
                <li><Link href="/tools/course-handicap-calculator" className="text-slate-700 hover:text-emerald-600">Course Handicap Calculator</Link></li>
                <li><Link href="/tools/stableford-calculator" className="text-slate-700 hover:text-emerald-600">Stableford Calculator</Link></li>
                <li><Link href="/strokes-gained-calculator" className="text-slate-700 hover:text-emerald-600">Strokes Gained Calculator</Link></li>
              </ul>
            </div>

            {/* Distance & Performance */}
            <div className="p-4 border border-slate-200 rounded-lg hover:border-emerald-300 transition-colors">
              <h4 className="font-bold text-emerald-600 mb-2">Distance & Performance</h4>
              <ul className="space-y-1 text-sm">
                <li><Link href="/tools/swing-speed-calculator" className="text-slate-700 hover:text-emerald-600">Swing Speed Calculator</Link></li>
                <li><Link href="/ball-speed-calculator" className="text-slate-700 hover:text-emerald-600">Ball Speed Calculator</Link></li>
                <li><Link href="/club-distance-calculator" className="text-slate-700 hover:text-emerald-600">Club Distance Calculator</Link></li>
                <li><Link href="/altitude-distance-calculator" className="text-slate-700 hover:text-emerald-600">Altitude Distance Calculator</Link></li>
                <li><Link href="/wind-elevation-adjuster" className="text-slate-700 hover:text-emerald-600">Wind & Elevation Adjuster</Link></li>
                <li><Link href="/range-ball-distance-calculator" className="text-slate-700 hover:text-emerald-600">Range Ball Distance</Link></li>
              </ul>
            </div>

            {/* Equipment & Fitting */}
            <div className="p-4 border border-slate-200 rounded-lg hover:border-emerald-300 transition-colors">
              <h4 className="font-bold text-emerald-600 mb-2">Equipment & Fitting</h4>
              <ul className="space-y-1 text-sm">
                <li><Link href="/club-fitting-estimator" className="text-slate-700 hover:text-emerald-600">Club Fitting Estimator</Link></li>
                <li><Link href="/club-length-calculator" className="text-slate-700 hover:text-emerald-600">Club Length Calculator</Link></li>
                <li><Link href="/grip-size-calculator" className="text-slate-700 hover:text-emerald-600">Grip Size Calculator</Link></li>
                <li><Link href="/shaft-flex-calculator" className="text-slate-700 hover:text-emerald-600">Shaft Flex Calculator</Link></li>
              </ul>
            </div>

            {/* Course & Planning */}
            <div className="p-4 border border-slate-200 rounded-lg hover:border-emerald-300 transition-colors">
              <h4 className="font-bold text-emerald-600 mb-2">Course & Planning</h4>
              <ul className="space-y-1 text-sm">
                <li><Link href="/tee-recommendation-calculator" className="text-slate-700 hover:text-emerald-600">Tee Recommendation</Link></li>
                <li><Link href="/playing-time-estimator" className="text-slate-700 hover:text-emerald-600">Playing Time Estimator</Link></li>
                <li><Link href="/golf-trip-planner" className="text-slate-700 hover:text-emerald-600">Golf Trip Planner</Link></li>
                <li><Link href="/course-directory" className="text-slate-700 hover:text-emerald-600">Course Directory</Link></li>
              </ul>
            </div>
          </div>

          {/* Golf Guides Section */}
          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Expert Golf Guides & Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-bold text-emerald-700 mb-3">Improve Your Scoring</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog/how-to-break-100-golf" className="text-slate-700 hover:text-emerald-600">How to Break 100 in Golf</Link></li>
                  <li><Link href="/blog/how-to-break-90-golf" className="text-slate-700 hover:text-emerald-600">How to Break 90 in Golf</Link></li>
                  <li><Link href="/blog/how-to-break-80-golf" className="text-slate-700 hover:text-emerald-600">How to Break 80 in Golf</Link></li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-blue-700 mb-3">Best Golf Destinations</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog/best-golf-breaks-uk" className="text-slate-700 hover:text-blue-600">Best Golf Breaks in the UK</Link></li>
                  <li><Link href="/blog/best-golf-breaks-wales" className="text-slate-700 hover:text-blue-600">Best Golf Breaks in Wales</Link></li>
                  <li><Link href="/blog/best-golf-breaks-bournemouth" className="text-slate-700 hover:text-blue-600">Best Golf Breaks in Bournemouth</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-16">
          <h2 className="text-4xl font-black text-slate-900  mb-8 text-center tracking-tight">
            Frequently Asked Questions About Golf
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-slate-900  mb-3 text-lg">
                How accurate is this golf handicap calculator?
              </h3>
              <p className="text-sm text-slate-700 mb-4">
                Our calculator follows the exact World Handicap System formula used by official golf organizations.
                It calculates score differentials using (Adjusted Score - Course Rating) × 113 ÷ Slope Rating,
                ensuring 100% accuracy for WHS compliance.
              </p>

              <h3 className="font-bold text-slate-900  mb-3 text-lg">
                Do I need to register to use the handicap calculator?
              </h3>
              <p className="text-sm text-slate-700 mb-4">
                No registration required! Our free golf handicap calculator works instantly in your browser.
                Your scores are saved locally on your device for privacy and convenience.
              </p>

              <h3 className="font-bold text-slate-900  mb-3 text-lg">
                How many scores do I need for a golf handicap?
              </h3>
              <p className="text-sm text-slate-700">
                Under the World Handicap System, you need minimum 3 scores to establish a handicap index.
                For most accurate results, submit up to 20 of your most recent rounds with course and slope ratings.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900  mb-3 text-lg">
                What&apos;s the difference between course rating and slope rating?
              </h3>
              <p className="text-sm text-slate-700 mb-4">
                Course Rating is the expected score for a scratch golfer (0 handicap). Slope Rating (55-155)
                measures difficulty for higher handicap players compared to scratch golfers, with 113 being standard.
              </p>

              <h3 className="font-bold text-slate-900  mb-3 text-lg">
                Can I use this for official tournament handicaps?
              </h3>
              <p className="text-sm text-slate-700 mb-4">
                While our calculator provides accurate WHS calculations, official tournament play requires
                handicaps registered through authorized golf clubs affiliated with national governing bodies
                like England Golf or Golf Scotland.
              </p>

              <h3 className="font-bold text-slate-900  mb-3 text-lg">
                Does this work on mobile devices?
              </h3>
              <p className="text-sm text-slate-700">
                Yes! Our golf handicap calculator is fully responsive and works perfectly on phones, tablets,
                and desktop computers. Calculate your handicap on the course or at home.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center rounded-xl p-12 bg-emerald-50 border-2 border-emerald-200">
          <h2 className="text-4xl font-black mb-6 text-slate-900 tracking-tight">Start Your Golf Journey Today</h2>
          <p className="text-xl mb-8 text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Join thousands of golfers using the UK&apos;s most trusted golf platform.
            Track your handicap, discover amazing courses, and improve your game with expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg border-0" asChild>
              <Link href="/tools/handicap-calculator">Track Your Handicap</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white font-semibold rounded-lg" asChild>
              <Link href="/course-directory">Find Golf Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}