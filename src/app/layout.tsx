import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Free Golf Handicap Calculator (WHS) & Golf Apps | Welton Golf',
  description: 'Free World Handicap System calculator and professional golf tools. Calculate your WHS handicap index instantly with course rating and slope rating support. UK\'s most trusted golf handicap calculator.',
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
    canonical: '/',
  },
  openGraph: {
    title: 'Free Golf Handicap Calculator (WHS) & Professional Golf Tools',
    description: 'Calculate your World Handicap System index for free. Professional golf handicap calculator with course rating, slope rating, and score tracking.',
    url: 'https://welton-golf.com',
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
    title: 'Free Golf Handicap Calculator (WHS) & Professional Golf Tools',
    description: 'Calculate your World Handicap System index for free. Professional golf handicap calculator.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
