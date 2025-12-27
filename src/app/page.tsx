import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calculator, BookOpen, MapPin, TrendingUp, Users, Trophy, Calendar } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-900 dark:to-slate-800">

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image Placeholder */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(135deg, #183a37 0%, #9CC69B 100%)',
          }}
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6 font-cooper drop-shadow-lg">
              Your Complete Golf Companion
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
              Everything you need to improve your golf game. From handicap tracking and course directories
              to expert guides and professional tools - all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3 text-white border-0 shadow-lg" style={{backgroundColor: '#183a37'}} asChild>
                <Link href="/handicap-calculator">Track Your Handicap</Link>
              </Button>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-slate-800 hover:bg-white/90" asChild>
                <Link href="/blog/best-golf-breaks-uk">Discover Golf Breaks</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">

        {/* Main Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 text-center font-cooper">
            Everything Golf in One Place
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 text-center max-w-3xl mx-auto">
            Whether you&apos;re tracking your handicap, planning your next golf trip, or looking to improve your game,
            we&apos;ve got you covered with professional tools and expert content.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Golf Tools & Calculators */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#9CC69B'}}>
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 text-center">
                Golf Tools & Calculators
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-6 text-center">
                Professional WHS handicap calculator, club fitting tools, distance calculators, and performance analyzers.
                Everything you need to track and improve your game.
              </p>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full text-white" style={{backgroundColor: '#183a37'}}>
                  <Link href="/handicap-calculator">
                    Explore Golf Tools
                  </Link>
                </Button>
              </div>
            </div>

            {/* Golf Travel & Breaks */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#9CC69B'}}>
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 text-center">
                Golf Travel & Breaks
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-6 text-center">
                Discover the best golf breaks in the UK and beyond. From Scotland&apos;s championship links to Wales&apos;
                hidden gems, plan your perfect golf getaway.
              </p>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full text-white" style={{backgroundColor: '#183a37'}}>
                  <Link href="/blog/best-golf-breaks-uk">
                    Plan Your Golf Trip
                  </Link>
                </Button>
              </div>
            </div>

            {/* Golf Guides & Tips */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#9CC69B'}}>
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 text-center">
                Golf Guides & Tips
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-6 text-center">
                Master your game with expert guides and proven strategies. Learn how to break 90, 80, and beyond
                with comprehensive tutorials and professional insights.
              </p>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full text-white" style={{backgroundColor: '#183a37'}}>
                  <Link href="/blog/how-to-break-90-golf">
                    Explore Golf Guides
                  </Link>
                </Button>
              </div>
            </div>

            {/* Course Directory */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#9CC69B'}}>
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 text-center">
                Course Directory
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-6 text-center">
                Discover golf courses near you with detailed information, ratings, reviews, and booking options.
                Find your perfect round from championship links to local favorites.
              </p>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full text-white" style={{backgroundColor: '#183a37'}}>
                  <Link href="/course-directory">
                    Find Golf Courses
                  </Link>
                </Button>
              </div>
            </div>

            {/* Performance Tracking */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#9CC69B'}}>
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 text-center">
                Performance Tracking
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-6 text-center">
                Track your progress with professional handicap calculations, scoring analytics, and performance insights.
                Monitor your improvement and achieve your golfing goals.
              </p>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full text-white" style={{backgroundColor: '#183a37'}}>
                  <Link href="/handicap-calculator">
                    Track Your Game
                  </Link>
                </Button>
              </div>
            </div>

            {/* Golf Community */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#9CC69B'}}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 text-center">
                Golf Community
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-6 text-center">
                Connect with fellow golfers, share experiences, and discover amazing golf destinations.
                Join our community of passionate players across the UK and beyond.
              </p>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full text-white" style={{backgroundColor: '#183a37'}}>
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
          <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-6 font-cooper">
              Trusted by Golfers Across the UK
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-green-100">Professional Tools</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-green-100">WHS Compliant</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-green-100">Golf Courses Listed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-green-100">Access Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center font-cooper">
            Why Golfers Choose Welton Golf
          </h2>
          <p className="text-center text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Your complete golf companion offering professional tools, course directories, expert guides,
            and travel inspiration all in one trusted platform.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#9CC69B'}}>
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Professional Tools</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Access WHS-compliant handicap calculators, club fitting tools, and performance analyzers.
                All built to professional standards and trusted by golfers across the UK.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Expert Content & Guides</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Learn from comprehensive guides on breaking 90, 80, and beyond. Discover the best golf breaks,
                courses, and destinations with expert insights and recommendations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Always Free Access</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                No registration required, no hidden fees. Access all tools, guides, and course information completely free
                on any device. Mobile-friendly design for on-the-go golf planning.
              </p>
            </div>
          </div>

          {/* Additional SEO content */}
          <div className="mt-8 p-6 rounded-lg border-2" style={{backgroundColor: '#9CC69B', borderColor: '#183a37'}}>
            <h3 className="text-lg font-semibold mb-4 text-center" style={{color: '#183a37'}}>
              Trusted by Golf Clubs and Players Across the UK
            </h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm text-center" style={{color: '#183a37'}}>
              <div>
                <strong className="block text-white text-lg">100%</strong>
                WHS Compliant
              </div>
              <div>
                <strong className="block text-blue-600 text-lg">20</strong>
                Rounds Tracking
              </div>
              <div>
                <strong className="block text-purple-600 text-lg">0</strong>
                Cost Forever
              </div>
              <div>
                <strong className="block text-orange-600 text-lg">24/7</strong>
                Access Available
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center font-cooper">
            Frequently Asked Questions About Golf
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                How accurate is this golf handicap calculator?
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                Our calculator follows the exact World Handicap System formula used by official golf organizations.
                It calculates score differentials using (Adjusted Score - Course Rating) × 113 ÷ Slope Rating,
                ensuring 100% accuracy for WHS compliance.
              </p>

              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Do I need to register to use the handicap calculator?
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                No registration required! Our free golf handicap calculator works instantly in your browser.
                Your scores are saved locally on your device for privacy and convenience.
              </p>

              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                How many scores do I need for a golf handicap?
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Under the World Handicap System, you need minimum 3 scores to establish a handicap index.
                For most accurate results, submit up to 20 of your most recent rounds with course and slope ratings.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                What&apos;s the difference between course rating and slope rating?
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                Course Rating is the expected score for a scratch golfer (0 handicap). Slope Rating (55-155)
                measures difficulty for higher handicap players compared to scratch golfers, with 113 being standard.
              </p>

              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Can I use this for official tournament handicaps?
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                While our calculator provides accurate WHS calculations, official tournament play requires
                handicaps registered through authorized golf clubs affiliated with national governing bodies
                like England Golf or Golf Scotland.
              </p>

              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Does this work on mobile devices?
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Yes! Our golf handicap calculator is fully responsive and works perfectly on phones, tablets,
                and desktop computers. Calculate your handicap on the course or at home.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center rounded-lg p-12 text-white" style={{background: `linear-gradient(135deg, #183a37 0%, #9CC69B 100%)`}}>
          <h2 className="text-3xl font-bold mb-4 font-cooper">Start Your Golf Journey Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of golfers using the UK&apos;s most trusted golf platform.
            Track your handicap, discover amazing courses, and improve your game with expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link href="/handicap-calculator">Track Your Handicap</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-black hover:bg-white hover:text-black" asChild>
              <Link href="/course-directory">Find Golf Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}