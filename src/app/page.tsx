import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Trophy } from 'lucide-react'

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
              Free Golf Apps & Handicap Calculator
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
              Professional golf tools and World Handicap System (WHS) calculator. Track your handicap index,
              calculate score differentials, and improve your golf game with our free golf apps.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3 text-white border-0 shadow-lg" style={{backgroundColor: '#183a37'}} asChild>
                <Link href="#golf-apps">Explore Golf Apps</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">

        {/* Featured Apps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 text-center font-cooper">
            Professional Golf Applications & Tools
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 text-center max-w-3xl mx-auto">
            Access professional-grade golf calculators and tools designed to help golfers of all levels improve their game.
            Our free golf apps follow official R&A and USGA standards for accurate handicap tracking and score analysis.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Handicap Calculator */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#9CC69B'}}>
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 text-center">
                WHS Handicap Calculator
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 text-center">
                Calculate your official World Handicap System index instantly. Track up to 20 rounds with automatic
                score differential calculations, course rating adjustments, and slope rating support.
              </p>
              <div className="mb-4">
                <div className="flex justify-center gap-2 text-xs text-white mb-2">
                  <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#183a37'}}>WHS Compliant</span>
                  <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#183a37'}}>Free Forever</span>
                </div>
              </div>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full text-white" style={{backgroundColor: '#183a37'}}>
                  <Link href="/handicap-calculator">
                    Calculate My Handicap
                  </Link>
                </Button>
              </div>
            </div>

            {/* Course Handicap Calculator */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#9CC69B'}}>
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 text-center">
                Course Handicap Calculator
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 text-center">
                Calculate your course handicap for any golf course using your handicap index.
                Get tournament-ready stroke allocations with official WHS formula.
              </p>
              <div className="mb-4">
                <div className="flex justify-center gap-2 text-xs text-white mb-2">
                  <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#183a37'}}>WHS Formula</span>
                  <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#183a37'}}>Tournament Ready</span>
                </div>
              </div>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full text-white" style={{backgroundColor: '#183a37'}}>
                  <Link href="/course-handicap-calculator">
                    Calculate Course Handicap
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stableford Calculator */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#9CC69B'}}>
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 text-center">
                Stableford Calculator
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 text-center">
                Calculate Stableford points with automatic handicap stroke allocation.
                Perfect for competitions and casual rounds with 18-hole scoring.
              </p>
              <div className="mb-4">
                <div className="flex justify-center gap-2 text-xs text-white mb-2">
                  <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#183a37'}}>Auto Strokes</span>
                  <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#183a37'}}>Competition Ready</span>
                </div>
              </div>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full text-white" style={{backgroundColor: '#183a37'}}>
                  <Link href="/stableford-calculator">
                    Calculate Stableford Points
                  </Link>
                </Button>
              </div>
            </div>

            {/* Ball Speed Calculator */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#9CC69B'}}>
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 text-center">
                Ball Speed Calculator
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 text-center">
                Calculate ball speed, carry distance, and total distance based on clubhead speed.
                Analyze smash factor and launch conditions for optimal performance.
              </p>
              <div className="mb-4">
                <div className="flex justify-center gap-2 text-xs text-white mb-2">
                  <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#183a37'}}>Physics Based</span>
                  <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#183a37'}}>Club Fitting</span>
                </div>
              </div>
              <div className="text-center">
                <Button asChild className="hover:opacity-90 w-full text-white" style={{backgroundColor: '#183a37'}}>
                  <Link href="/ball-speed-calculator">
                    Calculate Ball Speed
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Golf Apps Section */}
        <div id="golf-apps" className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center font-cooper">
            Golf Applications
          </h2>
          <div className="text-center py-12">
            <p className="text-slate-700 dark:text-slate-300 text-lg">
              Golf apps will be available here soon.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center font-cooper">
            Why Choose Welton Golf for Your Handicap Calculator Needs?
          </h2>
          <p className="text-center text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of golfers who trust our free golf handicap calculator and professional golf tools
            to track their World Handicap System index and improve their game performance.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#9CC69B'}}>
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">WHS Compliant Calculator</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Our golf handicap calculator follows exact World Handicap System rules implemented by R&A and USGA.
                Get accurate handicap index calculations with proper score differential formulas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Score Tracking & History</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Track up to 20 golf rounds with course ratings, slope ratings, and automatic score differential calculations.
                Monitor your handicap progress over time with detailed score history.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Free Forever Access</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                No registration required, no hidden fees. Use our professional golf handicap calculator completely free
                on any device. Mobile-friendly design for on-course calculations.
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
            Frequently Asked Questions About Golf Handicap Calculators
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
                What's the difference between course rating and slope rating?
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
          <h2 className="text-3xl font-bold mb-4 font-cooper">Start Calculating Your Golf Handicap Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of golfers using the UK's most trusted free World Handicap System calculator.
            Track your progress, improve your game, and maintain an accurate handicap index.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link href="/handicap-calculator">Calculate My Handicap Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-black" asChild>
              <Link href="#golf-apps">Explore All Golf Tools</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}