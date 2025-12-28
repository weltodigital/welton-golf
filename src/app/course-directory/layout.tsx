import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Golf Course Directory - Find Golf Courses Near You | Welton Golf',
  description: 'Discover golf courses across the UK with our comprehensive directory. Find detailed information, ratings, reviews, and booking options for golf courses near you.',
  keywords: 'golf course directory, golf courses near me, UK golf courses, golf course finder, golf course reviews, golf course ratings, book golf courses',
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/course-directory',
  },
  openGraph: {
    title: 'Golf Course Directory - Find Golf Courses Near You | Welton Golf',
    description: 'Discover golf courses across the UK with our comprehensive directory. Find detailed information, ratings, reviews, and booking options.',
    url: 'https://www.weltongolf.com/course-directory',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-course-directory.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Course Directory - Find Courses Near You',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Course Directory - Find Golf Courses Near You',
    description: 'Discover golf courses across the UK with our comprehensive directory. Find detailed information, ratings, and reviews.',
    images: ['/golf-course-directory-twitter.jpg'],
    creator: '@weltongolf',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function CourseDirectoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}