import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Ball Speed Calculator - Golf Distance | Welton Golf',
  description: 'Calculate golf ball speed, carry distance, and total distance with physics-based calculator. Analyze smash factor and launch angle for performance.',
  keywords: [
    'golf ball speed calculator',
    'ball speed calculator',
    'golf distance calculator',
    'smash factor calculator',
    'golf ball flight calculator',
    'clubhead speed calculator',
    'golf swing speed calculator',
    'launch angle calculator',
    'golf spin rate calculator',
    'golf club fitting calculator',
    'golf performance calculator',
    'golf ball trajectory calculator',
    'golf swing analyzer',
    'golf ball speed distance',
    'free golf calculator'
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
    canonical: '/tools/ball-speed-calculator',
  },
  openGraph: {
    title: 'Free Golf Ball Speed Calculator - Distance & Smash Factor Calculator',
    description: 'Calculate golf ball speed and distance with physics-based models. Analyze smash factor and launch conditions for optimal performance.',
    url: 'https://www.weltongolf.com/tools/ball-speed-calculator',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/tools/ball-speed-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Ball Speed Calculator - Distance & Performance Analysis',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Golf Ball Speed Calculator - Distance & Smash Factor Calculator',
    description: 'Calculate golf ball speed and distance with physics-based models. Free golf performance calculator.',
    images: ['/tools/ball-speed-calculator-twitter.jpg'],
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

export default function BallSpeedCalculatorLayout({
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
        name: 'How do you calculate golf ball speed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Golf ball speed is calculated by multiplying clubhead speed by smash factor. Ball Speed = Clubhead Speed × Smash Factor. The smash factor represents the efficiency of energy transfer from club to ball, with optimal values around 1.50 for drivers.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is a good smash factor for different golf clubs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Optimal smash factors vary by club: Driver (1.50), 3-Wood (1.48), 5-Iron (1.42), 7-Iron (1.40), Wedges (1.35). Higher smash factors indicate more efficient energy transfer and better contact quality.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does launch angle affect golf ball distance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Launch angle significantly affects distance. Each club has an optimal launch angle: Driver (12-14°), 7-Iron (20-25°), Wedges (30-35°). Too low reduces carry, too high reduces distance due to excessive trajectory.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this ball speed calculator accurate for club fitting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This calculator provides good estimates using physics-based models, but for precise club fitting, use a certified launch monitor. Our calculator is excellent for understanding relationships between swing speed, smash factor, and distance.'
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