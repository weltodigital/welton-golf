'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Target } from 'lucide-react'
import { Metadata } from 'next'

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
        url: 'https://www.weltongolf.com/course-handicap-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Course Handicap Calculator - WHS Formula',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/course-handicap-calculator',
  },
}

interface CourseEntry {
  id: string
  courseName: string
  handicapIndex: number
  courseRating: number
  slopeRating: number
  par: number
  courseHandicap: number
}

function CourseHandicapCalculator() {
  const [courses, setCourses] = useState<CourseEntry[]>([])
  const [currentEntry, setCurrentEntry] = useState({
    courseName: '',
    handicapIndex: '',
    courseRating: '',
    slopeRating: '',
    par: ''
  })
  const [calculatedHandicap, setCalculatedHandicap] = useState<number | null>(null)

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('golf-course-handicap-entries')
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries)
      setCourses(parsedEntries)
    }
  }, [])

  // Save entries to localStorage whenever courses change
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem('golf-course-handicap-entries', JSON.stringify(courses))
    }
  }, [courses])

  const calculateCourseHandicap = useCallback(() => {
    if (!currentEntry.handicapIndex || !currentEntry.courseRating || !currentEntry.slopeRating || !currentEntry.par) {
      setCalculatedHandicap(null)
      return
    }

    const handicapIndex = parseFloat(currentEntry.handicapIndex)
    const courseRating = parseFloat(currentEntry.courseRating)
    const slopeRating = parseInt(currentEntry.slopeRating)
    const par = parseInt(currentEntry.par)

    // Course Handicap Formula: (Handicap Index × Slope Rating ÷ 113) + (Course Rating - Par)
    const courseHandicap = Math.round((handicapIndex * slopeRating / 113) + (courseRating - par))

    setCalculatedHandicap(courseHandicap)
  }, [currentEntry.handicapIndex, currentEntry.courseRating, currentEntry.slopeRating, currentEntry.par])

  // Calculate whenever relevant fields change
  useEffect(() => {
    calculateCourseHandicap()
  }, [calculateCourseHandicap])

  const addEntry = () => {
    if (!currentEntry.handicapIndex || !currentEntry.courseRating || !currentEntry.slopeRating || !currentEntry.par) {
      return
    }

    if (calculatedHandicap === null) return

    const newEntry: CourseEntry = {
      id: Date.now().toString(),
      courseName: currentEntry.courseName || 'Unknown Course',
      handicapIndex: parseFloat(currentEntry.handicapIndex),
      courseRating: parseFloat(currentEntry.courseRating),
      slopeRating: parseInt(currentEntry.slopeRating),
      par: parseInt(currentEntry.par),
      courseHandicap: calculatedHandicap
    }

    setCourses(prev => [newEntry, ...prev])

    // Reset form
    setCurrentEntry({
      courseName: '',
      handicapIndex: '',
      courseRating: '',
      slopeRating: '',
      par: ''
    })
    setCalculatedHandicap(null)
  }

  const removeEntry = (id: string) => {
    setCourses(prev => prev.filter(entry => entry.id !== id))
  }

  const clearAllEntries = () => {
    setCourses([])
    localStorage.removeItem('golf-course-handicap-entries')
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Course Handicap Calculator',
    applicationCategory: 'Sports Application',
    description: 'Calculate your golf course handicap using the official World Handicap System formula with handicap index, course rating, and slope rating.',
    operatingSystem: 'Any',
    permissions: 'browser',
    isAccessibleForFree: true,
    creator: {
      '@type': 'Organization',
      name: 'Welton Golf',
      url: 'https://www.weltongolf.com'
    },
    dateModified: '2026-01-14',
    version: '2.0'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">


          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Calculator className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                  Free Course Handicap Calculator 2026
                </h1>
                <p className="text-gray-700 text-lg">
                  Calculate your exact course handicap for any golf course using the official WHS formula. Get accurate stroke allocations instantly.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Professional Course Handicap Calculator - Free & Accurate
              </h2>
              <p className="text-gray-700 mb-3">
                Our course handicap calculator follows the exact WHS formula to determine how many strokes you receive
                on a specific golf course. Calculate your course handicap using your current handicap index with
                automatic adjustments for course rating and slope rating.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  WHS Course Handicap Formula
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Instant Course-Specific Results
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Free - No Registration Required
                </div>
              </div>
            </div>

            {/* Current Course Handicap Display */}
            {calculatedHandicap !== null && (
              <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2 text-gray-900">
                    Your Course Handicap
                  </h2>
                  <div className="text-5xl font-bold mb-2 text-emerald-600">
                    {calculatedHandicap}
                  </div>
                  <p className="text-sm text-gray-700">
                    Strokes you receive on this course
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Calculate Course Handicap
                </CardTitle>
                <CardDescription>
                  Enter your handicap index and course details to calculate your course handicap
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input
                    id="courseName"
                    placeholder="e.g. St Andrews Old Course"
                    value={currentEntry.courseName}
                    onChange={(e) => setCurrentEntry(prev => ({ ...prev, courseName: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="handicapIndex">Your Handicap Index *</Label>
                  <Input
                    id="handicapIndex"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 12.4"
                    value={currentEntry.handicapIndex}
                    onChange={(e) => setCurrentEntry(prev => ({ ...prev, handicapIndex: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="courseRating">Course Rating *</Label>
                    <Input
                      id="courseRating"
                      type="number"
                      step="0.1"
                      placeholder="e.g. 72.1"
                      value={currentEntry.courseRating}
                      onChange={(e) => setCurrentEntry(prev => ({ ...prev, courseRating: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slopeRating">Slope Rating *</Label>
                    <Input
                      id="slopeRating"
                      type="number"
                      placeholder="e.g. 125"
                      value={currentEntry.slopeRating}
                      onChange={(e) => setCurrentEntry(prev => ({ ...prev, slopeRating: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="par">Course Par *</Label>
                  <Input
                    id="par"
                    type="number"
                    placeholder="e.g. 72"
                    value={currentEntry.par}
                    onChange={(e) => setCurrentEntry(prev => ({ ...prev, par: e.target.value }))}
                    required
                  />
                </div>

                <Button
                  onClick={addEntry}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  disabled={!currentEntry.handicapIndex || !currentEntry.courseRating || !currentEntry.slopeRating || !currentEntry.par}
                >
                  Save Calculation
                </Button>
              </CardContent>
            </Card>

            {/* Calculation History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      Calculation History
                    </CardTitle>
                    <CardDescription>
                      Your recent course handicap calculations ({courses.length} entries)
                    </CardDescription>
                  </div>
                  {courses.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllEntries}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {courses.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">
                    <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No calculations saved yet.</p>
                    <p className="text-sm">Calculate your first course handicap above.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {courses.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900">
                            {entry.courseName}
                          </div>
                          <div className="text-xs text-gray-700">
                            HI: {entry.handicapIndex} • CR: {entry.courseRating} • SR: {entry.slopeRating} • Par: {entry.par}
                          </div>
                          <div className="text-sm font-medium px-2 py-1 bg-emerald-600 rounded inline-block text-white mt-1">
                            Course Handicap: {entry.courseHandicap}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEntry(entry.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Course Handicap Guide Section */}
          <div className="mt-12 space-y-12">
            {/* What is Course Handicap */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="h-6 w-6 text-emerald-600" />
                What is Course Handicap and Why It Matters
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Course Handicap is the number of strokes a player receives on a specific golf course, calculated using your Handicap Index
                adjusted for the course's difficulty. Unlike your Handicap Index (which is universal), Course Handicap varies for each
                course and tee you play, ensuring fair competition regardless of course difficulty.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Course Handicap vs Handicap Index:</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Handicap Index:</strong> Universal measure of skill (e.g., 15.2)</li>
                    <li>• <strong>Course Handicap:</strong> Course-specific strokes (e.g., 17 on tough course)</li>
                    <li>• <strong>Playing Handicap:</strong> Final strokes after additional adjustments</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">When You Need Course Handicap:</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Tournament and competition play</li>
                    <li>• Match play stroke allocation</li>
                    <li>• Playing different tees or courses</li>
                    <li>• Fair handicap in group games</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* WHS Formula Explained */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="h-6 w-6 text-emerald-600" />
                Official WHS Course Handicap Formula Explained
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                The World Handicap System uses a precise formula that accounts for both course difficulty (Slope Rating)
                and how the course plays compared to par (Course Rating). This ensures accurate handicap calculation
                across all golf courses worldwide.
              </p>

              <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200 mb-6">
                <h3 className="font-bold text-gray-900 mb-4 text-xl">The Official Formula:</h3>
                <div className="text-center p-4 bg-white rounded border">
                  <code className="text-lg font-mono text-gray-900">
                    Course Handicap = (Handicap Index × Slope Rating ÷ 113) + (Course Rating - Par)
                  </code>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Formula Components:</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Handicap Index:</strong> Your official handicap</li>
                    <li>• <strong>Slope Rating:</strong> Course difficulty (55-155)</li>
                    <li>• <strong>113:</strong> Standard slope baseline</li>
                    <li>• <strong>Course Rating:</strong> Expected score for scratch golfer</li>
                    <li>• <strong>Par:</strong> Course par</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Example Calculation:</h4>
                  <div className="text-gray-700 space-y-1">
                    <p><strong>Given:</strong></p>
                    <p>• Handicap Index: 15.2</p>
                    <p>• Slope Rating: 125</p>
                    <p>• Course Rating: 72.1</p>
                    <p>• Par: 72</p>
                    <p className="mt-3"><strong>Result:</strong></p>
                    <p>(15.2 × 125 ÷ 113) + (72.1 - 72) = 17</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Important Notes:</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Result rounded to nearest whole number</li>
                    <li>• Maximum usually 36 (men) or 40 (women)</li>
                    <li>• Recalculate for each course/tee</li>
                    <li>• Use current Handicap Index</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Course Rating and Slope */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-emerald-600" />
                Understanding Course Rating and Slope Rating
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Course Rating and Slope Rating are the two key numbers that determine course difficulty. These ratings
                are established by official course rating teams and represent how challenging a course plays for
                different skill levels.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Course Rating:</h3>
                  <ul className="text-gray-700 space-y-2 mb-4">
                    <li>• Expected score for a scratch golfer (0 handicap)</li>
                    <li>• Usually close to par but can vary significantly</li>
                    <li>• Accounts for length, obstacles, and conditions</li>
                    <li>• Example: 72.1 means scratch golfer expects to shoot 72.1</li>
                  </ul>
                  <div className="bg-blue-50 p-4 rounded border">
                    <p className="text-blue-900 font-medium">Typical Course Ratings:</p>
                    <p className="text-blue-800">• Easy course: Below par (e.g., 70.5 for par 72)</p>
                    <p className="text-blue-800">• Average course: Near par (e.g., 71.8 for par 72)</p>
                    <p className="text-blue-800">• Difficult course: Above par (e.g., 74.2 for par 72)</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Slope Rating:</h3>
                  <ul className="text-gray-700 space-y-2 mb-4">
                    <li>• Measures relative difficulty for higher handicap players</li>
                    <li>• Scale from 55 (easiest) to 155 (hardest)</li>
                    <li>• 113 is the standard/average slope</li>
                    <li>• Higher slope = bigger difference between skill levels</li>
                  </ul>
                  <div className="bg-emerald-50 p-4 rounded border">
                    <p className="text-emerald-900 font-medium">Slope Rating Guide:</p>
                    <p className="text-emerald-800">• 55-113: Easier for high handicappers</p>
                    <p className="text-emerald-800">• 113: Standard difficulty</p>
                    <p className="text-emerald-800">• 113-155: Harder for high handicappers</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Using Course Handicap */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Info className="h-6 w-6 text-emerald-600" />
                How to Use Your Course Handicap Effectively
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Once you have your Course Handicap, it's essential to understand how to apply it correctly in different
                playing situations. The strokes are allocated based on the stroke index of each hole.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Stroke Allocation by Hole:</h3>
                  <ul className="text-gray-700 space-y-2 mb-4">
                    <li>• Strokes given on holes ranked by stroke index</li>
                    <li>• Stroke Index 1 = hardest hole (first stroke received)</li>
                    <li>• Stroke Index 18 = easiest hole (last stroke received)</li>
                    <li>• Course handicap determines how many strokes you get</li>
                  </ul>
                  <div className="bg-amber-50 p-4 rounded border">
                    <p className="text-amber-900 font-medium">Example: Course Handicap 12</p>
                    <p className="text-amber-800">You receive strokes on the 12 hardest holes (stroke index 1-12)</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Competition Applications:</h3>
                  <ul className="text-gray-700 space-y-2 mb-4">
                    <li>• <strong>Stroke Play:</strong> Subtract course handicap from gross score</li>
                    <li>• <strong>Match Play:</strong> Give/receive strokes on designated holes</li>
                    <li>• <strong>Stableford:</strong> Use course handicap for points calculation</li>
                    <li>• <strong>Team Events:</strong> Combined course handicaps divided as required</li>
                  </ul>
                  <div className="bg-green-50 p-4 rounded border">
                    <p className="text-green-900 font-medium">Tournament Reminder:</p>
                    <p className="text-green-800">Always verify course handicap calculations with tournament committee</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function CourseHandicapCalculatorPage() {
  return <CourseHandicapCalculator />
}