'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History } from 'lucide-react'

interface CourseEntry {
  id: string
  courseName: string
  handicapIndex: number
  courseRating: number
  slopeRating: number
  par: number
  courseHandicap: number
}

export default function CourseHandicapCalculator() {
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

  return (
    <div className="min-h-screen bg-white ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumbs */}
          <nav className="text-sm text-slate-600 mb-4">
            <ol className="flex space-x-2">
              <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
              <li className="before:content-['/'] before:mx-2 text-slate-900">Course Handicap Calculator</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Calculator className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
                  Golf Course Handicap Calculator
                </h1>
                <p className="text-slate-700 text-lg">
                  Calculate your course handicap for any golf course using your handicap index, course rating, and slope rating.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Professional Course Handicap Calculator - Free & Accurate
              </h2>
              <p className="text-slate-700 mb-3">
                Our course handicap calculator follows the exact WHS formula to determine how many strokes you receive
                on a specific golf course. Calculate your course handicap using your current handicap index with
                automatic adjustments for course rating and slope rating.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-700">
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
                  <h2 className="text-2xl font-bold mb-2 text-slate-900">
                    Your Course Handicap
                  </h2>
                  <div className="text-5xl font-bold mb-2 text-emerald-600">
                    {calculatedHandicap}
                  </div>
                  <p className="text-sm text-slate-700">
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
                          <div className="font-medium text-sm text-slate-900">
                            {entry.courseName}
                          </div>
                          <div className="text-xs text-slate-700">
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

          {/* Information Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                How Course Handicap Calculation Works
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Complete Guide to Course Handicap Calculation
                </h3>
                <p className="text-slate-700 mb-4">
                  Course Handicap represents the number of strokes a player receives on a specific golf course.
                  It adjusts your Handicap Index to account for the difficulty of the particular course and tees you&apos;re playing.
                  This ensures fair play regardless of which course you&apos;re playing.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Course Handicap Formula:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Course Handicap</strong> = (Handicap Index × Slope Rating ÷ 113) + (Course Rating - Par)</li>
                    <li>• <strong>Slope Rating 113</strong> is the standard difficulty baseline</li>
                    <li>• <strong>Course Rating - Par</strong> adjusts for course difficulty relative to par</li>
                    <li>• Result is <strong>rounded to nearest whole number</strong></li>
                    <li>• Maximum course handicap is typically <strong>36 for men, 40 for women</strong></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">When to Use Course Handicap:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Tournament Play:</strong> Determines strokes received in competitions</li>
                    <li>• <strong>Match Play:</strong> Calculate stroke allocation between players</li>
                    <li>• <strong>Different Tees:</strong> Adjust handicap when playing different tee boxes</li>
                    <li>• <strong>Course Comparison:</strong> Compare difficulty across different courses</li>
                    <li>• <strong>Stroke Index:</strong> Determine which holes you receive strokes on</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Example Calculation:</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Player:</strong> Handicap Index 15.2<br/>
                    <strong>Course:</strong> Rating 72.1, Slope 125, Par 72
                  </p>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Calculation:</strong><br/>
                    (15.2 × 125 ÷ 113) + (72.1 - 72) = 16.8 + 0.1 = 16.9
                  </p>
                  <p className="text-xs text-slate-700">
                    <strong>Course Handicap:</strong> 17 (rounded to nearest whole number)
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Important Notes:</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Your Course Handicap may differ from your Handicap Index because it accounts for the specific
                    difficulty of the course and tees you&apos;re playing from.
                  </p>
                  <p className="text-xs text-slate-700">
                    Always use your most current Handicap Index for accurate calculations.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
                <h4 className="font-bold text-slate-900 mb-3">Why Use Our Course Handicap Calculator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Official WHS Formula:</strong> Uses exact course handicap calculation method
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Instant Results:</strong> Calculate course handicap in real-time
                    </p>
                    <p className="text-slate-700">
                      <strong>✓ Save History:</strong> Track calculations for different courses
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Tournament Ready:</strong> Get accurate stroke allocations
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Mobile Friendly:</strong> Calculate on the course or at home
                    </p>
                    <p className="text-slate-700">
                      <strong>✓ Free Forever:</strong> No registration or payment required
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-slate-700">
                  <strong>Tournament Note:</strong> For official tournament play, verify course handicap calculations
                  with the tournament committee or course pro shop, as some competitions may have specific
                  handicap adjustments or maximums.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}