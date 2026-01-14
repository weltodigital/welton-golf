'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function Header() {

  return (
    <nav className="bg-brand-primary border-b border-brand-dark sticky top-0 z-50 backdrop-blur-sm">
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
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link href="/tools" className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-brand-primary font-medium transition-colors border-b border-slate-100">
                    All Tools
                  </Link>
                  <Link href="/tools/handicap-calculator" className="block px-4 py-2 text-sm text-slate-900 hover:bg-emerald-50 hover:text-brand-primary font-medium transition-colors">
                    Handicap Calculator
                  </Link>
                  <Link href="/tools/course-handicap-calculator" className="block px-4 py-2 text-sm text-slate-900 hover:bg-emerald-50 hover:text-brand-primary font-medium transition-colors">
                    Course Handicap Calculator
                  </Link>
                  <Link href="/tools/stableford-calculator" className="block px-4 py-2 text-sm text-slate-900 hover:bg-emerald-50 hover:text-brand-primary font-medium transition-colors">
                    Stableford Calculator
                  </Link>
                  <Link href="/tools/ball-speed-calculator" className="block px-4 py-2 text-sm text-slate-900 hover:bg-emerald-50 hover:text-brand-primary font-medium transition-colors">
                    Ball Speed Calculator
                  </Link>
                  <Link href="/tools/swing-speed-calculator" className="block px-4 py-2 text-sm text-slate-900 hover:bg-emerald-50 hover:text-brand-primary font-medium transition-colors">
                    Swing Speed Calculator
                  </Link>
                  <Link href="/tools/club-distance-calculator" className="block px-4 py-2 text-sm text-slate-900 hover:bg-emerald-50 hover:text-brand-primary font-medium transition-colors">
                    Club Distance Calculator
                  </Link>
                </div>
              </div>
            </div>

            {/* Travel Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-white hover:text-emerald-100 transition-colors text-sm font-semibold">
                Travel
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link href="/travel" className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-brand-primary font-medium transition-colors border-b border-slate-100">
                    All Travel Guides
                  </Link>
                  <Link href="/travel/best-golf-breaks-uk" className="block px-4 py-2 text-sm text-slate-900 hover:bg-emerald-50 hover:text-brand-primary font-medium transition-colors">
                    Best Golf Breaks UK
                  </Link>
                  <Link href="/travel/best-golf-breaks-wales" className="block px-4 py-2 text-sm text-slate-900 hover:bg-emerald-50 hover:text-brand-primary font-medium transition-colors">
                    Best Golf Breaks Wales
                  </Link>
                  <Link href="/travel/best-golf-breaks-bournemouth" className="block px-4 py-2 text-sm text-slate-900 hover:bg-emerald-50 hover:text-brand-primary font-medium transition-colors">
                    Best Golf Breaks Bournemouth
                  </Link>
                </div>
              </div>
            </div>

            {/* Break 100 - Simple Link (no dropdown needed for single page) */}
            <Link
              href="/break-100"
              className="text-white hover:text-emerald-50 transition-colors text-sm font-semibold"
            >
              Break 100
            </Link>

            {/* Break 90 - Simple Link (no dropdown needed for single page) */}
            <Link
              href="/break-90"
              className="text-white hover:text-emerald-50 transition-colors text-sm font-semibold"
            >
              Break 90
            </Link>

            {/* Break 80 - Simple Link (no dropdown needed for single page) */}
            <Link
              href="/break-80"
              className="text-white hover:text-emerald-50 transition-colors text-sm font-semibold"
            >
              Break 80
            </Link>

            {/* Course Directory - Simple Link */}
            <Link
              href="/course-directory"
              className="text-white hover:text-emerald-50 transition-colors text-sm font-semibold"
            >
              Course Directory
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}