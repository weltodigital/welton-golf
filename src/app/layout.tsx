import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Welton Golf - Your Complete Golf Companion | Tools, Guides & Course Directory',
  description: 'Your complete golf companion offering professional handicap tools, course directories, expert guides, and golf travel inspiration. Everything you need to improve your game in one place.',
  keywords: [
    'free golf handicap calculator',
    'WHS handicap calculator',
    'world handicap system calculator',
    'golf handicap index calculator',
    'course rating calculator',
    'slope rating calculator',
    'golf apps UK',
    'handicap tracker',
    'golf score calculator',
    'R&A handicap calculator',
    'USGA handicap calculator',
    'golf tools',
    'handicap differential calculator',
    'golf handicap tracker free',
    'WHS calculator UK'
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
    canonical: '/',
  },
  openGraph: {
    title: 'Welton Golf - Your Complete Golf Companion | Tools, Guides & Course Directory',
    description: 'Your complete golf companion offering professional handicap tools, course directories, expert guides, and golf travel inspiration. Everything you need to improve your game in one place.',
    url: 'https://www.weltongolf.com',
    siteName: 'Welton Golf',
    images: [
      {
        url: '/golf-apps-homepage-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Golf Handicap Calculator - World Handicap System (WHS)',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welton Golf - Your Complete Golf Companion | Tools, Guides & Course Directory',
    description: 'Your complete golf companion offering professional handicap tools, course directories, expert guides, and golf travel inspiration.',
    images: ['/golf-apps-homepage-twitter.jpg'],
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
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
      }
    ],
    apple: [
      {
        url: '/favicon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ]
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#099669" />
      </head>
      <body className={inter.className}>
        <StructuredData
          organization={{
            name: 'Welton Golf',
            url: 'https://www.weltongolf.com',
            description: 'Your complete golf companion offering professional handicap tools, course directories, expert guides, and golf travel inspiration. Everything you need to improve your game in one place.',
            sameAs: [
              'https://twitter.com/weltongolf'
            ]
          }}
          website={{
            name: 'Welton Golf',
            url: 'https://www.weltongolf.com',
            description: 'Your complete golf companion offering professional handicap tools, course directories, expert guides, and golf travel inspiration. Everything you need to improve your game in one place.',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://www.weltongolf.com?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
