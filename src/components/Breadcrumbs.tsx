'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null

  const pathSegments = pathname.split('/').filter(Boolean)

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ]

  // Build breadcrumbs from path segments
  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // Convert segment to readable label
    let label = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

    // Custom labels for specific paths
    if (segment === 'tools') {
      label = 'Golf Tools'
    } else if (segment === 'travel') {
      label = 'Golf Travel'
    } else if (segment === 'break-80') {
      label = 'Break 80'
    } else if (segment === 'break-90') {
      label = 'Break 90'
    } else if (segment === 'break-100') {
      label = 'Break 100'
    } else if (segment === 'course-directory') {
      label = 'Course Directory'
    } else if (segment === 'handicap-calculator') {
      label = 'Handicap Calculator'
    } else if (segment === 'course-handicap-calculator') {
      label = 'Course Handicap Calculator'
    } else if (segment === 'stableford-calculator') {
      label = 'Stableford Calculator'
    } else if (segment === 'ball-speed-calculator') {
      label = 'Ball Speed Calculator'
    } else if (segment === 'swing-speed-calculator') {
      label = 'Swing Speed Calculator'
    } else if (segment === 'club-distance-calculator') {
      label = 'Club Distance Calculator'
    } else if (segment === 'best-golf-breaks-uk') {
      label = 'Best Golf Breaks UK'
    } else if (segment === 'best-golf-breaks-wales') {
      label = 'Best Golf Breaks Wales'
    } else if (segment === 'best-golf-breaks-bournemouth') {
      label = 'Best Golf Breaks Bournemouth'
    }

    breadcrumbs.push({
      label,
      href: currentPath
    })
  })

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200 py-3">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index === 0 && (
                <Home className="w-4 h-4 mr-1 text-gray-500" />
              )}

              {index < breadcrumbs.length - 1 ? (
                <>
                  <Link
                    href={item.href}
                    className="text-brand-primary hover:text-brand-secondary transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                </>
              ) : (
                <span className="text-gray-600 font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}