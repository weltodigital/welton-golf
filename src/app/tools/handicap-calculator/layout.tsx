import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Free Golf Handicap Calculator (WHS) | Welton Golf',
  description: 'Calculate your World Handicap System index for free. Accurate golf handicap calculator with course rating and slope rating support.',
  keywords: [
    'golf handicap calculator',
    'WHS handicap calculator',
    'world handicap system calculator',
    'calculate golf handicap',
    'UK golf handicap',
    'free golf handicap calculator',
    'official golf handicap',
    'handicap index calculator',
    'course rating calculator',
    'slope rating calculator',
    'golf handicap tracker',
    'WHS calculator UK',
    'golf scoring calculator',
    'handicap differential calculator',
    'EGA handicap calculator',
    'R&A handicap system'
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
    canonical: '/tools/handicap-calculator',
  },
  openGraph: {
    title: 'Golf Handicap Calculator (WHS) - WHS-Compliant Calculator | Welton Golf',
    description: 'Calculate your World Handicap System index for free. Accurate golf handicap calculator with course rating and slope rating support.',
    url: 'https://www.weltongolf.com/tools/handicap-calculator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-handicap-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Handicap Calculator - World Handicap System (WHS)',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Handicap Calculator (WHS) - WHS-Compliant Calculator | Welton Golf',
    description: 'Calculate your World Handicap System index for free. Accurate golf handicap calculator with course rating support.',
    images: ['/golf-handicap-calculator-twitter.jpg'],
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

export default function HandicapCalculatorLayout({
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
        name: 'How do I calculate my golf handicap using the World Handicap System?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To calculate your golf handicap using WHS: 1) Enter your adjusted gross scores from recent rounds, 2) Input the course rating and slope rating for each course, 3) The calculator automatically computes score differentials using the formula (Adjusted Score - Course Rating) × 113 ÷ Slope Rating, 4) Your handicap index is calculated from the average of your best score differentials.'
        }
      },
      {
        '@type': 'Question',
        name: 'How many scores do I need for a golf handicap?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under the World Handicap System, you need a minimum of 3 scores to establish a handicap index. However, for the most accurate handicap, you should submit up to 20 of your most recent scores. The system uses different numbers of your best differentials depending on how many scores you have submitted.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the difference between course rating and slope rating?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Course Rating represents the expected score for a scratch golfer (0 handicap) on that course under normal conditions. Slope Rating measures the relative difficulty of a course for higher handicap golfers compared to scratch golfers, ranging from 55 to 155, with 113 being standard.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this golf handicap calculator officially recognized?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This calculator follows World Handicap System rules and provides accurate handicap calculations. However, for official handicap certification, you must submit scores through an authorized golf club or association that is affiliated with your national golf governing body.'
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