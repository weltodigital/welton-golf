import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Course Handicap Calculator (WHS) | Welton Golf',
  description: 'Calculate your golf course handicap using the World Handicap System formula. Course handicap calculator with index, course rating, and slope support.',
  keywords: [
    'golf course handicap calculator',
    'course handicap calculator',
    'WHS course handicap',
    'golf handicap course calculator',
    'course handicap formula',
    'golf course handicap chart',
    'handicap index to course handicap',
    'golf course strokes calculator',
    'course handicap WHS',
    'golf handicap adjustment',
    'course specific handicap',
    'golf course difficulty calculator',
    'slope rating handicap calculator',
    'course rating handicap calculator',
    'tournament handicap calculator'
  ].join(', '),
  authors: [{ name: 'Welton Golf', url: 'https://www.weltongolf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.weltongolf.com'),
  alternates: {
    canonical: '/tools/course-handicap-calculator',
  },
  openGraph: {
    title: 'Free Golf Course Handicap Calculator (WHS) - Calculate Course Handicap',
    description: 'Calculate your golf course handicap using the World Handicap System formula. Free course handicap calculator for tournaments and match play.',
    url: 'https://www.weltongolf.com/tools/course-handicap-calculator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-course-handicap-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Course Handicap Calculator - World Handicap System (WHS)',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Golf Course Handicap Calculator (WHS) - Calculate Course Handicap',
    description: 'Calculate your golf course handicap using the WHS formula. Free course handicap calculator.',
    images: ['/golf-course-handicap-calculator-twitter.jpg'],
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
  verification: {
    google: 'mb6qbP4ykod04up5ttlVGOuXtTJf90pBVZdsG6OmtcM',
  },
}

export default function CourseHandicapCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I calculate my course handicap?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To calculate your course handicap: 1) Take your current Handicap Index, 2) Multiply by the Slope Rating and divide by 113, 3) Add the difference between Course Rating and Par. The formula is: (Handicap Index × Slope Rating ÷ 113) + (Course Rating - Par). Round to the nearest whole number.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the difference between handicap index and course handicap?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Handicap Index is your portable handicap that represents your potential ability. Course Handicap is the number of strokes you receive on a specific course, adjusted for that course\'s difficulty using course rating and slope rating.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I need a different course handicap for each course?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, your course handicap changes based on the difficulty of each course and tee box. Courses with higher slope ratings will typically give you more strokes, while easier courses will give you fewer strokes relative to your handicap index.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this course handicap calculator approved for tournament play?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This calculator uses the World Handicap System formula and provides accurate results. However, for tournament play, verify your course handicap with the tournament committee or course pro shop, as some events may have specific handicap policies.'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}