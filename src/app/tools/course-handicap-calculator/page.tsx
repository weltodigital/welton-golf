import { Metadata } from 'next'
import { CourseHandicapCalculatorComponent } from './CourseHandicapCalculatorComponent'

export const metadata: Metadata = {
  title: 'Free Course Handicap Calculator 2026 - WHS Formula | Calculate Golf Course Handicap | Welton Golf',
  description: 'Calculate your exact course handicap for any golf course using the official WHS formula. Free calculator with handicap index, course rating, and slope rating. Get accurate stroke allocations.',
  keywords: 'course handicap calculator, golf course handicap, WHS course handicap, handicap index calculator, slope rating calculator, course rating, golf strokes, handicap formula, free golf calculator',
  openGraph: {
    title: 'Free Course Handicap Calculator 2026 - Official WHS Formula Calculator',
    description: 'Calculate your course handicap for any golf course using the official World Handicap System formula. Free, accurate, and includes stroke allocation guide.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/course-handicap-calculator',
    images: [
      {
        url: 'https://www.weltongolf.com/golf-course-handicap-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Course Handicap Calculator - WHS Formula Calculator',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/course-handicap-calculator',
  },
}

export default function CourseHandicapCalculatorPage() {
  return <CourseHandicapCalculatorComponent />
}