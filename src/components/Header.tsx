'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false)
  const [isBlogOpen, setIsBlogOpen] = useState(false)

  return (
    <nav className="bg-white dark:bg-slate-800 border-b sticky top-0 z-50">
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
            {/* Calculators Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCalculatorsOpen(!isCalculatorsOpen)}
                className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:opacity-80 transition-colors text-sm font-medium"
              >
                Calculators
                <ChevronDown className={`h-4 w-4 transition-transform ${isCalculatorsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isCalculatorsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <Link
                      href="/handicap-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Handicap Calculator
                    </Link>
                    <Link
                      href="/course-handicap-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Course Handicap
                    </Link>
                    <Link
                      href="/stableford-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Stableford Calculator
                    </Link>
                    <div className="border-t border-slate-200 dark:border-slate-600 my-2"></div>
                    <Link
                      href="/ball-speed-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Ball Speed Calculator
                    </Link>
                    <Link
                      href="/swing-speed-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Swing Speed Calculator
                    </Link>
                    <Link
                      href="/club-distance-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Club Distance Calculator
                    </Link>
                    <div className="border-t border-slate-200 dark:border-slate-600 my-2"></div>
                    <Link
                      href="/club-fitting-estimator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Club Fitting Estimator
                    </Link>
                    <Link
                      href="/grip-size-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Grip Size Calculator
                    </Link>
                    <Link
                      href="/shaft-flex-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Shaft Flex Calculator
                    </Link>
                    <Link
                      href="/club-length-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Club Length Calculator
                    </Link>
                    <div className="border-t border-slate-200 dark:border-slate-600 my-2"></div>
                    <Link
                      href="/wind-elevation-adjuster"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Wind & Elevation Adjuster
                    </Link>
                    <Link
                      href="/playing-time-estimator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Playing Time Estimator
                    </Link>
                    <Link
                      href="/tee-recommendation-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Tee Recommendation
                    </Link>
                    <Link
                      href="/strokes-gained-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Strokes Gained Calculator
                    </Link>
                    <Link
                      href="/range-ball-distance-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Range Ball Distance
                    </Link>
                    <Link
                      href="/altitude-distance-calculator"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Altitude Distance
                    </Link>
                    <div className="border-t border-slate-200 dark:border-slate-600 my-2"></div>
                    <Link
                      href="/golf-trip-planner"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Golf Trip Planner
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Blog Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsBlogOpen(!isBlogOpen)}
                className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:opacity-80 transition-colors text-sm font-medium"
              >
                Blog
                <ChevronDown className={`h-4 w-4 transition-transform ${isBlogOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Blog Dropdown Menu */}
              {isBlogOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <Link
                      href="/blog/best-golf-breaks-uk"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsBlogOpen(false)}
                    >
                      Best Golf Breaks UK
                    </Link>
                    <Link
                      href="/blog/best-golf-breaks-wales"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsBlogOpen(false)}
                    >
                      Best Golf Breaks Wales
                    </Link>
                    <Link
                      href="/blog/best-golf-breaks-bournemouth"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsBlogOpen(false)}
                    >
                      Best Golf Breaks Bournemouth
                    </Link>
                    <div className="border-t border-slate-200 dark:border-slate-600 my-2"></div>
                    <Link
                      href="/blog/how-to-break-80"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsBlogOpen(false)}
                    >
                      How to Break 80
                    </Link>
                    <Link
                      href="/blog/how-to-break-90"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsBlogOpen(false)}
                    >
                      How to Break 90
                    </Link>
                    <Link
                      href="/blog/how-to-break-100"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setIsBlogOpen(false)}
                    >
                      How to Break 100
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/course-directory"
              className="text-slate-700 dark:text-slate-300 hover:opacity-80 transition-colors text-sm font-medium"
            >
              Course Directory
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}