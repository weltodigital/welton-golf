import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stableford Points Calculator - Golf Scoring System | Welton Golf',
  description: 'Calculate Stableford points for golf rounds with automatic handicap allocation. Free Stableford scoring calculator with 18-hole scorecard.',
  keywords: [
    'stableford calculator',
    'stableford points calculator',
    'golf stableford scoring',
    'stableford golf calculator',
    'stableford points system',
    'golf scoring calculator',
    'stableford competition calculator',
    'handicap stableford calculator',
    'golf points calculator',
    'stableford scorecard',
    'golf tournament scoring',
    'stableford scoring system',
    'golf handicap points',
    'stableford golf scoring calculator',
    'free stableford calculator'
  ].join(', '),
  authors: [{ name: 'Welton Golf', url: 'https://welton-golf.com' }],
  creator: 'Welton Golf',
  publisher: 'Welton Golf',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://welton-golf.com'),
  alternates: {
    canonical: '/stableford-calculator',
  },
  openGraph: {
    title: 'Free Stableford Points Calculator - Golf Scoring System Calculator',
    description: 'Calculate Stableford points with automatic handicap allocation. Free golf scoring calculator for competitions and casual rounds.',
    url: 'https://welton-golf.com/stableford-calculator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/stableford-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Stableford Points Calculator - Golf Scoring System',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Stableford Points Calculator - Golf Scoring System Calculator',
    description: 'Calculate Stableford points with automatic handicap allocation. Free golf scoring calculator.',
    images: ['/stableford-calculator-twitter.jpg'],
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
    google: 'your-google-verification-code',
  },
}

export default function StablefordCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Stableford Points Calculator',
    description: 'Calculate Stableford points for golf rounds with automatic handicap stroke allocation. Features 18-hole scorecard, real-time scoring, and competition-ready calculations.',
    url: 'https://welton-golf.com/stableford-calculator',
    applicationCategory: 'SportsApplication',
    operatingSystem: 'Any',
    permissions: 'browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
    },
    creator: {
      '@type': 'Organization',
      name: 'Welton Golf',
      url: 'https://welton-golf.com',
    },
    applicationSubCategory: 'Golf Scoring Calculator',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '654',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Official Stableford Scoring System',
      'Automatic Handicap Stroke Allocation',
      '18-Hole Interactive Scorecard',
      'Real-time Points Calculation',
      'Round History Storage',
      'Competition Scoring Ready',
      'Mobile and Desktop Compatible',
      'Free to Use - No Registration Required'
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Golfers, Competition Players, Golf Club Members, Tournament Organizers',
    },
    inLanguage: 'en-GB',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Welton Golf',
      url: 'https://welton-golf.com',
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does Stableford scoring work in golf?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stableford scoring awards points based on your net score relative to par: Eagle (4 points), Birdie (3 points), Par (2 points), Bogey (1 point), Double bogey or worse (0 points). Your net score is calculated by subtracting handicap strokes from your gross score.'
        }
      },
      {
        '@type': 'Question',
        name: 'How are handicap strokes allocated in Stableford?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Handicap strokes are distributed based on your course handicap. The strokes are spread evenly across all 18 holes, with any extra strokes allocated to the most difficult holes first. This ensures fair stroke allocation throughout the round.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is a good Stableford score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A score of 36 points represents playing to your handicap (2 points per hole average). Scores of 32-42 points are typical winning scores in competitions, depending on course difficulty and conditions. Any score above 36 means you played better than your handicap.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I use this calculator for official competitions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This calculator uses the official Stableford scoring system and provides accurate point calculations. However, for official competitions, verify the stroke allocation method with the tournament organizer, as some events may use specific stroke index systems.'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}