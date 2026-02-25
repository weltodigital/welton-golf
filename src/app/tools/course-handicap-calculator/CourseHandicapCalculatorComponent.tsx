'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Target } from 'lucide-react'

interface CourseEntry {
  id: number
  name: string
  courseRating: number
  slopeRating: number
  courseHandicap: number | null
}

export function CourseHandicapCalculatorComponent() {
  const [handicapIndex, setHandicapIndex] = useState<number | ''>('')
  const [courses, setCourses] = useState<CourseEntry[]>([
    {
      id: 1,
      name: '',
      courseRating: 0,
      slopeRating: 113,
      courseHandicap: null
    }
  ])

  const calculateCourseHandicap = useCallback((handicapIndex: number, courseRating: number, par: number, slopeRating: number) => {
    // WHS Formula: Course Handicap = Handicap Index × (Slope Rating ÷ 113) + (Course Rating - Par)
    const courseHandicap = Math.round(handicapIndex * (slopeRating / 113) + (courseRating - par))
    return Math.max(courseHandicap, 0) // Course handicap cannot be negative
  }, [])

  const updateCourseHandicaps = useCallback(() => {
    if (handicapIndex && typeof handicapIndex === 'number') {
      setCourses(prevCourses =>
        prevCourses.map(course => ({
          ...course,
          courseHandicap: course.courseRating > 0
            ? calculateCourseHandicap(handicapIndex, course.courseRating, 72, course.slopeRating)
            : null
        }))
      )
    }
  }, [handicapIndex, calculateCourseHandicap])

  useEffect(() => {
    updateCourseHandicaps()
  }, [updateCourseHandicaps])

  const addCourse = () => {
    const newCourse: CourseEntry = {
      id: Date.now(),
      name: '',
      courseRating: 0,
      slopeRating: 113,
      courseHandicap: null
    }
    setCourses([...courses, newCourse])
  }

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id))
    }
  }

  const updateCourse = (id: number, field: keyof CourseEntry, value: string | number) => {
    setCourses(courses.map(course =>
      course.id === id
        ? { ...course, [field]: value }
        : course
    ))
  }

  const clearAll = () => {
    setHandicapIndex('')
    setCourses([{
      id: 1,
      name: '',
      courseRating: 0,
      slopeRating: 113,
      courseHandicap: null
    }])
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Course Handicap Calculator (WHS)",
            "description": "Free World Handicap System calculator for calculating course handicap using WHS formula with course rating and slope rating.",
            "url": "https://www.weltongolf.com/tools/course-handicap-calculator",
            "applicationCategory": "Sports",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "GBP"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Welton Golf",
              "url": "https://www.weltongolf.com"
            },
            "featureList": [
              "Course Handicap Calculation",
              "WHS Formula Implementation",
              "Multiple Course Comparison",
              "Slope Rating Support",
              "Free to Use"
            ]
          })
        }}
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
                    Free Course Handicap Calculator (WHS)
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Calculate your course handicap for any golf course using the World Handicap System formula. Get accurate stroke allocations for fair competition play.
                  </p>
                </div>
              </div>
            </div>

            {/* Calculator */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-600" />
                  Course Handicap Calculator
                </CardTitle>
                <CardDescription>
                  Enter your handicap index and course details to calculate your course handicap using the WHS formula
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Handicap Index Input */}
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <Label htmlFor="handicap-index" className="text-base font-medium text-emerald-900">
                    Your Handicap Index
                  </Label>
                  <Input
                    id="handicap-index"
                    type="number"
                    step="0.1"
                    value={handicapIndex}
                    onChange={(e) => setHandicapIndex(e.target.value ? parseFloat(e.target.value) : '')}
                    placeholder="e.g., 18.5"
                    className="mt-2 text-lg font-medium"
                  />
                  <p className="text-sm text-emerald-700 mt-1">
                    This is your WHS handicap index from your golf club or handicap provider
                  </p>
                </div>

                {/* Course Information */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Golf Courses</h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={addCourse}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        Add Course
                      </Button>
                      <Button
                        onClick={clearAll}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Clear All
                      </Button>
                    </div>
                  </div>

                  {courses.map((course) => (
                    <div key={course.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <Input
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                          placeholder="Course name (optional)"
                          className="max-w-xs"
                        />
                        {courses.length > 1 && (
                          <Button
                            onClick={() => removeCourse(course.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            Course Rating
                          </Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={course.courseRating || ''}
                            onChange={(e) => updateCourse(course.id, 'courseRating', parseFloat(e.target.value) || 0)}
                            placeholder="e.g., 72.5"
                            className="mt-1"
                          />
                          <p className="text-xs text-gray-500 mt-1">From the scorecard</p>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            Slope Rating
                          </Label>
                          <Input
                            type="number"
                            value={course.slopeRating || ''}
                            onChange={(e) => updateCourse(course.id, 'slopeRating', parseInt(e.target.value) || 113)}
                            placeholder="e.g., 125"
                            className="mt-1"
                          />
                          <p className="text-xs text-gray-500 mt-1">Usually 55-155</p>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            Course Handicap
                          </Label>
                          <div className="mt-1 p-3 bg-gray-50 rounded border text-lg font-bold text-center">
                            {course.courseHandicap !== null ? course.courseHandicap : '—'}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Calculated strokes</p>
                        </div>
                      </div>

                      {course.courseHandicap !== null && (
                        <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                          <p className="text-blue-900 text-sm">
                            <strong>Your course handicap:</strong> {course.courseHandicap} strokes
                            {course.name && ` at ${course.name}`}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Formula Explanation */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-gray-600" />
                    <h4 className="font-medium text-gray-900">WHS Formula</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Course Handicap = Handicap Index × (Slope Rating ÷ 113) + (Course Rating - Par)</strong>
                  </p>
                  <p className="text-xs text-gray-600">
                    This calculator assumes a par of 72. The course handicap is rounded to the nearest whole number and cannot be negative.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Educational Content */}
            <div className="mt-12 space-y-10">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Course Handicaps in the World Handicap System</h2>
                <p className="text-gray-700 mb-6">
                  Course handicap is a crucial component of the World Handicap System (WHS) that ensures fair play across different golf courses. Unlike your handicap index, which remains constant, your course handicap varies depending on the specific course you're playing, taking into account the course's difficulty and rating.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-blue-900">Key Components of Course Handicap Calculation</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="text-blue-600 font-bold">•</span>
                      <div>
                        <strong className="text-blue-800">Handicap Index:</strong> Your official handicap calculated from your scoring history
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-600 font-bold">•</span>
                      <div>
                        <strong className="text-blue-800">Course Rating:</strong> Expected score for a scratch golfer on the course
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-600 font-bold">•</span>
                      <div>
                        <strong className="text-blue-800">Slope Rating:</strong> Measure of course difficulty for bogey golfers versus scratch golfers (55-155 scale)
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use Your Course Handicap in Competition</h2>
                <p className="text-gray-700 mb-6">
                  Your course handicap determines how many strokes you receive during a round of golf. In stroke play competitions, you subtract your course handicap from your gross score to calculate your net score. In match play, strokes are allocated based on the stroke index of each hole.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Stroke Play Example</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Gross Score:</span>
                        <span className="font-medium">90</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Course Handicap:</span>
                        <span className="font-medium">18</span>
                      </div>
                      <div className="border-t pt-1 flex justify-between font-bold">
                        <span>Net Score:</span>
                        <span>72</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Match Play Example</h4>
                    <p className="text-sm text-gray-600">
                      With an 18 course handicap, you receive one stroke on each of the 18 most difficult holes (stroke index 1-18). Your net score on each hole is used for match play scoring.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Handicap vs Playing Handicap</h2>
                <p className="text-gray-700 mb-6">
                  It's important to understand the difference between course handicap and playing handicap. While course handicap is calculated using the standard WHS formula, playing handicap may be adjusted for specific competition formats or conditions.
                </p>

                <div className="bg-amber-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-amber-900">Playing Handicap Adjustments</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-amber-800"><strong>Individual Stroke Play:</strong></span>
                      <span className="text-amber-900">95% of course handicap</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-800"><strong>Individual Match Play:</strong></span>
                      <span className="text-amber-900">100% of course handicap</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-800"><strong>Four-Ball Stroke Play:</strong></span>
                      <span className="text-amber-900">85% of course handicap</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-800"><strong>Four-Ball Match Play:</strong></span>
                      <span className="text-amber-900">90% of course handicap</span>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Course Rating and Slope Examples</h2>
                <p className="text-gray-700 mb-6">
                  Understanding typical course ratings and slope ratings can help you better interpret your course handicap. Championship courses tend to have higher ratings, while shorter or easier courses have lower ratings.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Course Type</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Typical Course Rating</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Typical Slope Rating</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Difficulty Level</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-t">
                        <td className="px-4 py-2">Championship Course</td>
                        <td className="px-4 py-2">74-76</td>
                        <td className="px-4 py-2">130-140</td>
                        <td className="px-4 py-2">Very Difficult</td>
                      </tr>
                      <tr className="border-t bg-gray-50">
                        <td className="px-4 py-2">Standard Resort Course</td>
                        <td className="px-4 py-2">71-73</td>
                        <td className="px-4 py-2">115-125</td>
                        <td className="px-4 py-2">Moderate</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2">Municipal Course</td>
                        <td className="px-4 py-2">69-72</td>
                        <td className="px-4 py-2">105-115</td>
                        <td className="px-4 py-2">Easy-Moderate</td>
                      </tr>
                      <tr className="border-t bg-gray-50">
                        <td className="px-4 py-2">Executive/Short Course</td>
                        <td className="px-4 py-2">65-69</td>
                        <td className="px-4 py-2">95-110</td>
                        <td className="px-4 py-2">Easy</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Related Tools */}
            <div className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5 text-emerald-600" />
                    Related Golf Calculators
                  </CardTitle>
                  <CardDescription>
                    Explore our other golf calculators to improve your game and understanding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                      href="/tools/handicap-calculator"
                      className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                    >
                      <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 mb-2">Handicap Calculator</h3>
                      <p className="text-sm text-gray-600">Calculate your WHS handicap index from your scores</p>
                    </Link>

                    <Link
                      href="/tools/stableford-calculator"
                      className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                    >
                      <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 mb-2">Stableford Calculator</h3>
                      <p className="text-sm text-gray-600">Calculate Stableford points based on your handicap and scores</p>
                    </Link>

                    <Link
                      href="/tools/slope-rating-calculator"
                      className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                    >
                      <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 mb-2">Slope Rating Calculator</h3>
                      <p className="text-sm text-gray-600">Understand how slope rating affects your course handicap</p>
                    </Link>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3">Popular Golf Resources</h4>
                    <div className="flex flex-wrap gap-2">
                      <Link href="/course-directory" className="text-sm px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200">
                        Course Directory
                      </Link>
                      <Link href="/break-90/how-to-break-90-golf" className="text-sm px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200">
                        Break 90 Guide
                      </Link>
                      <Link href="/break-80/how-to-break-80-golf" className="text-sm px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200">
                        Break 80 Guide
                      </Link>
                      <Link href="/tools/swing-speed-calculator" className="text-sm px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200">
                        Swing Speed Calculator
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}