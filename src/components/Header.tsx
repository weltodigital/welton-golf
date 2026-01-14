'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function Header() {

  return (
    <nav className="bg-emerald-600 border-b border-emerald-700 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/welton-golf-logo.png"
                alt="Welton Golf Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {/* Tools Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-white hover:text-emerald-100 transition-colors text-sm font-semibold">
                Tools
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link
                      href="/tools"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors border-b border-slate-100"
                    >
                      All Tools & Calculators
                    </Link>
                    <Link
                      href="/tools/handicap-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Handicap Calculator
                    </Link>
                    <Link
                      href="/tools/course-handicap-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Course Handicap
                    </Link>
                    <Link
                      href="/tools/stableford-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Stableford Calculator
                    </Link>
                    <div className="border-t border-slate-100 my-2"></div>
                    <Link
                      href="/tools/ball-speed-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Ball Speed Calculator
                    </Link>
                    <Link
                      href="/tools/swing-speed-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Swing Speed Calculator
                    </Link>
                    <Link
                      href="/club-distance-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Club Distance Calculator
                    </Link>
                    <div className="border-t border-slate-100 my-2"></div>
                    <Link
                      href="/tools/club-fitting-estimator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Club Fitting Estimator
                    </Link>
                    <Link
                      href="/tools/grip-size-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Grip Size Calculator
                    </Link>
                    <Link
                      href="/tools/shaft-flex-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Shaft Flex Calculator
                    </Link>
                    <Link
                      href="/tools/club-length-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Club Length Calculator
                    </Link>
                    <div className="border-t border-slate-100 my-2"></div>
                    <Link
                      href="/tools/wind-elevation-adjuster"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Wind & Elevation Adjuster
                    </Link>
                    <Link
                      href="/tools/playing-time-estimator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Playing Time Estimator
                    </Link>
                    <Link
                      href="/tee-recommendation-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Tee Recommendation
                    </Link>
                    <Link
                      href="/tools/strokes-gained-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Strokes Gained Calculator
                    </Link>
                    <Link
                      href="/tools/range-ball-distance-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Range Ball Distance
                    </Link>
                    <Link
                      href="/tools/altitude-distance-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Altitude Distance
                    </Link>
                    <div className="border-t border-slate-100 my-2"></div>
                    <Link
                      href="/tools/golf-trip-planner"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Golf Trip Planner
                    </Link>
                  </div>
                </div>
            </div>

            {/* Blog Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-white hover:text-emerald-100 transition-colors text-sm font-semibold">
                Blog
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>

              {/* Blog Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link
                    href="/blog"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors border-b border-slate-100"
                  >
                    All Blog Articles
                  </Link>
                  <Link
                    href="/blog/best-golf-breaks-uk"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                  >
                    Best Golf Breaks UK
                  </Link>
                  <Link
                    href="/blog/best-golf-breaks-wales"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                  >
                    Best Golf Breaks Wales
                  </Link>
                  <Link
                    href="/blog/best-golf-breaks-bournemouth"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                  >
                    Best Golf Breaks Bournemouth
                  </Link>
                  <div className="border-t border-slate-100 my-2"></div>
                  <Link
                    href="/blog/how-to-break-80-golf"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                  >
                    How to Break 80
                  </Link>
                  <Link
                    href="/blog/how-to-break-90-golf"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                  >
                    How to Break 90
                  </Link>
                  <Link
                    href="/blog/how-to-break-100-golf"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                  >
                    How to Break 100
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/course-directory"
              className="text-white hover:text-emerald-100 transition-colors text-sm font-semibold"
            >
              Course Directory
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}