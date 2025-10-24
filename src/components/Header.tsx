import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Header() {
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
            <Link
              href="/handicap-calculator"
              className="text-slate-700 dark:text-slate-300 hover:opacity-80 transition-colors text-sm font-medium"
            >
              Handicap Calculator
            </Link>
            <Link
              href="/course-handicap-calculator"
              className="text-slate-700 dark:text-slate-300 hover:opacity-80 transition-colors text-sm font-medium"
            >
              Course Handicap
            </Link>
            <Link
              href="/stableford-calculator"
              className="text-slate-700 dark:text-slate-300 hover:opacity-80 transition-colors text-sm font-medium"
            >
              Stableford
            </Link>
            <Link
              href="/ball-speed-calculator"
              className="text-slate-700 dark:text-slate-300 hover:opacity-80 transition-colors text-sm font-medium"
            >
              Ball Speed
            </Link>
            <Link
              href="/course-directory"
              className="text-slate-700 dark:text-slate-300 hover:opacity-80 transition-colors text-sm font-medium"
            >
              Course Directory
            </Link>
            <Link
              href="#golf-apps"
              className="text-slate-700 dark:text-slate-300 hover:opacity-80 transition-colors text-sm font-medium"
            >
              Golf Apps
            </Link>
            <Link
              href="#features"
              className="text-slate-700 dark:text-slate-300 hover:opacity-80 transition-colors text-sm font-medium"
            >
              Features
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button size="sm" asChild>
              <Link href="#golf-apps">Explore Apps</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}