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
            <Link
              href="/tools"
              className="text-white hover:text-emerald-50 transition-colors text-sm font-semibold"
            >
              Tools
            </Link>

            <Link
              href="/travel"
              className="text-white hover:text-emerald-50 transition-colors text-sm font-semibold"
            >
              Travel
            </Link>

            <Link
              href="/break-100"
              className="text-white hover:text-emerald-50 transition-colors text-sm font-semibold"
            >
              Break 100
            </Link>

            <Link
              href="/break-90"
              className="text-white hover:text-emerald-50 transition-colors text-sm font-semibold"
            >
              Break 90
            </Link>

            <Link
              href="/break-80"
              className="text-white hover:text-emerald-50 transition-colors text-sm font-semibold"
            >
              Break 80
            </Link>

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