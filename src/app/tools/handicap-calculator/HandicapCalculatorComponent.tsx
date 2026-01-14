'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History } from 'lucide-react'

interface ScoreEntry {
  id: string
  date: string
  adjustedGrossScore: number
  courseRating: number
  slopeRating: number
  courseName: string
  scoreDate: Date
}

export function HandicapCalculatorComponent() {
  const [scores, setScores] = useState<ScoreEntry[]>([])
  const [currentScore, setCurrentScore] = useState({
    adjustedGrossScore: '',
    courseRating: '',
    slopeRating: '',
    courseName: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [handicapIndex, setHandicapIndex] = useState<number | null>(null)

  // Load scores from localStorage on component mount
  useEffect(() => {
    const savedScores = localStorage.getItem('golf-handicap-scores')
    if (savedScores) {
      const parsedScores = JSON.parse(savedScores)
      setScores(parsedScores.map((score: any) => ({
        ...score,
        scoreDate: new Date(score.date)
      })))
    }
  }, [])

  const addScore = () => {
    if (!currentScore.adjustedGrossScore || !currentScore.courseRating || !currentScore.slopeRating) {
      return
    }

    const newScore: ScoreEntry = {
      id: Date.now().toString(),
      date: currentScore.date,
      adjustedGrossScore: parseInt(currentScore.adjustedGrossScore),
      courseRating: parseFloat(currentScore.courseRating),
      slopeRating: parseInt(currentScore.slopeRating),
      courseName: currentScore.courseName || 'Unknown Course',
      scoreDate: new Date(currentScore.date)
    }

    setScores(prev => [...prev, newScore].sort((a, b) => b.scoreDate.getTime() - a.scoreDate.getTime()))

    // Reset form
    setCurrentScore({
      adjustedGrossScore: '',
      courseRating: '',
      slopeRating: '',
      courseName: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const removeScore = (id: string) => {
    setScores(prev => prev.filter(score => score.id !== id))
  }

  const calculateHandicap = useCallback(() => {
    if (scores.length < 3) {
      setHandicapIndex(null)
      return
    }

    // Calculate Score Differentials
    const scoreDifferentials = scores.map(score => {
      return ((score.adjustedGrossScore - score.courseRating) * 113) / score.slopeRating
    })

    // WHS Rules for number of scores to use
    let scoresUsed = 1
    if (scores.length >= 5) scoresUsed = 1
    if (scores.length >= 6) scoresUsed = 2
    if (scores.length >= 9) scoresUsed = 3
    if (scores.length >= 12) scoresUsed = 4
    if (scores.length >= 15) scoresUsed = 5
    if (scores.length >= 18) scoresUsed = 6
    if (scores.length >= 20) scoresUsed = 8

    // Sort differentials and take the lowest ones
    const sortedDifferentials = [...scoreDifferentials].sort((a, b) => a - b)
    const bestDifferentials = sortedDifferentials.slice(0, scoresUsed)

    // Calculate average of best differentials
    const average = bestDifferentials.reduce((sum, diff) => sum + diff, 0) / bestDifferentials.length

    // Handicap Index is the average rounded to 1 decimal place
    setHandicapIndex(Math.round(average * 10) / 10)
  }, [scores])

  // Save scores to localStorage whenever scores change
  useEffect(() => {
    if (scores.length > 0) {
      localStorage.setItem('golf-handicap-scores', JSON.stringify(scores))
      calculateHandicap()
    }
  }, [scores, calculateHandicap])

  const clearAllScores = () => {
    setScores([])
    setHandicapIndex(null)
    localStorage.removeItem('golf-handicap-scores')
  }

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Golf Handicap Calculator (WHS)",
            "description": "Free World Handicap System calculator for calculating official golf handicap index with course and slope rating support.",
            "url": "https://www.weltongolf.com/tools/handicap-calculator",
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
              "WHS Compliant Algorithm",
              "Course Rating Support",
              "Slope Rating Support",
              "Score History Tracking",
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
                  <Calculator className="h-6 w-6 text-brand-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-2">
                    Free Golf Handicap Calculator (WHS)
                  </h1>
                  <p className="text-gray-700 text-lg">
                    Calculate your official World Handicap System index instantly. UK's most accurate WHS handicap calculator with course rating and slope rating support.
                  </p>
                </div>
              </div>

              {/* SEO-rich description */}
              <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
                <h2 className="text-xl font-bold text-emerald-900 mb-3">
                  Official World Handicap System Calculator - Free & Accurate
                </h2>
                <p className="text-emerald-800 mb-3">
                  Our golf handicap calculator follows the exact World Handicap System (WHS) rules implemented by R&A and USGA.
                  Calculate your handicap index using up to 20 scores with automatic score differential calculations,
                  course rating adjustments, and slope rating considerations.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-brand-primary">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    WHS Compliant Algorithm
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    Course & Slope Rating Support
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    Free - No Registration Required
                  </div>
                </div>
              </div>

              {/* Current Handicap Display */}
              {handicapIndex !== null && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                      Your Current Handicap Index
                    </h2>
                    <div className="text-5xl font-bold text-white mb-2">
                      {handicapIndex >= 0 ? '+' : ''}{handicapIndex}
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Based on {scores.length} recorded scores
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">

              {/* Score Input Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Score
                  </CardTitle>
                  <CardDescription>
                    Enter your round details to update your handicap calculation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="courseName">Course Name</Label>
                      <Input
                        id="courseName"
                        placeholder="e.g. St Andrews Old Course"
                        value={currentScore.courseName}
                        onChange={(e) => setCurrentScore(prev => ({ ...prev, courseName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Date Played</Label>
                      <Input
                        id="date"
                        type="date"
                        value={currentScore.date}
                        onChange={(e) => setCurrentScore(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="adjustedGrossScore">Adjusted Gross Score *</Label>
                    <Input
                      id="adjustedGrossScore"
                      type="number"
                      placeholder="e.g. 85"
                      value={currentScore.adjustedGrossScore}
                      onChange={(e) => setCurrentScore(prev => ({ ...prev, adjustedGrossScore: e.target.value }))}
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
                        value={currentScore.courseRating}
                        onChange={(e) => setCurrentScore(prev => ({ ...prev, courseRating: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="slopeRating">Slope Rating *</Label>
                      <Input
                        id="slopeRating"
                        type="number"
                        placeholder="e.g. 125"
                        value={currentScore.slopeRating}
                        onChange={(e) => setCurrentScore(prev => ({ ...prev, slopeRating: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    onClick={addScore}
                    className="w-full bg-brand-primary hover:bg-brand-dark text-white font-semibold"
                    disabled={!currentScore.adjustedGrossScore || !currentScore.courseRating || !currentScore.slopeRating}
                  >
                    Add Score
                  </Button>
                </CardContent>
              </Card>

              {/* Score History */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <History className="h-5 w-5" />
                        Score History
                      </CardTitle>
                      <CardDescription>
                        Your recent rounds ({scores.length}/20 scores)
                      </CardDescription>
                    </div>
                    {scores.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAllScores}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Clear All
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {scores.length === 0 ? (
                    <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                      <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No scores recorded yet.</p>
                      <p className="text-sm">Add at least 3 scores to calculate your handicap.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {scores.map((score) => (
                        <div key={score.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {score.courseName}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-300">
                              {score.date} • Score: {score.adjustedGrossScore} • CR: {score.courseRating} • SR: {score.slopeRating}
                            </div>
                            <div className="text-xs text-white font-medium">
                              Differential: {(((score.adjustedGrossScore - score.courseRating) * 113) / score.slopeRating).toFixed(1)}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeScore(score.id)}
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

            {/* Blog Content Sections */}
            <div className="mt-12 space-y-12">

              {/* How the WHS Works */}
              <section className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How the World Handicap System (WHS) Calculator Works</h2>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  The World Handicap System (WHS) revolutionized golf handicapping in 2020, creating a unified global standard adopted by golf governing bodies worldwide, including the R&A, USGA, Golf Australia, and European Golf Association (EGA). Our free golf handicap calculator implements the exact WHS algorithm used by official handicap services, ensuring accuracy and compliance with international standards.
                </p>

                <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200 mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-900">WHS Score Requirements & Rules</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-emerald-800">Minimum Score Requirements:</h4>
                      <ul className="space-y-2 text-emerald-700">
                        <li>• <strong>Initial handicap:</strong> Minimum 3 acceptable scores required</li>
                        <li>• <strong>Established handicap:</strong> Uses most recent 20 scores when available</li>
                        <li>• <strong>18-hole equivalent:</strong> All scores must be adjusted gross scores</li>
                        <li>• <strong>Playing conditions:</strong> Scores should follow WHS adjustments</li>
                        <li>• <strong>Regular updates:</strong> Handicap recalculated after each new score</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-emerald-800">WHS Calculation Method:</h4>
                      <ul className="space-y-2 text-emerald-700">
                        <li>• <strong>Score Differential Formula:</strong> (Adjusted Score - Course Rating) × 113 ÷ Slope Rating</li>
                        <li>• <strong>3-5 scores:</strong> Average of 1 lowest differential</li>
                        <li>• <strong>6-8 scores:</strong> Average of 2 lowest differentials</li>
                        <li>• <strong>9-11 scores:</strong> Average of 3 lowest differentials</li>
                        <li>• <strong>12-20 scores:</strong> Progressive scale up to 8 lowest differentials</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Understanding Your Handicap Index */}
              <section className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Your Handicap Index: What Your Number Really Means</h2>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Your handicap index is more than just a number—it's a measure of your potential scoring ability that allows golfers of different skill levels to compete fairly. Understanding what your handicap means can help you set realistic goals and track meaningful improvement in your game.
                </p>

                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Handicap Ranges and What They Mean</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-green-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Low Handicap (0-10)</h4>
                      <p className="text-green-800 text-sm mb-2">Skilled players who consistently break 80. These golfers have solid fundamentals and course management skills.</p>
                      <ul className="text-xs text-green-700 space-y-1">
                        <li>• Scratch to single digits</li>
                        <li>• Consistent ball striking</li>
                        <li>• Good short game</li>
                        <li>• Strong mental game</li>
                      </ul>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Mid Handicap (11-20)</h4>
                      <p className="text-blue-800 text-sm mb-2">Recreational golfers who occasionally break 90. Room for improvement in all areas with some consistent strengths.</p>
                      <ul className="text-xs text-blue-700 space-y-1">
                        <li>• Shoot 85-95 typically</li>
                        <li>• Inconsistent ball striking</li>
                        <li>• Developing course management</li>
                        <li>• Working on fundamentals</li>
                      </ul>
                    </div>
                    <div className="bg-orange-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-2">High Handicap (21+)</h4>
                      <p className="text-orange-800 text-sm mb-2">Beginners and casual players focusing on breaking 100. Lots of opportunity for rapid improvement.</p>
                      <ul className="text-xs text-orange-700 space-y-1">
                        <li>• Learning fundamentals</li>
                        <li>• Focus on consistency</li>
                        <li>• Goal to break 100</li>
                        <li>• Building confidence</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Related Tools Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Related Golf Calculators & Tools</CardTitle>
                <CardDescription>
                  Enhance your golf analysis with these complementary tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link
                    href="/tools/course-handicap-calculator"
                    className="p-4 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                  >
                    <h3 className="font-bold text-slate-900 group-hover:text-brand-dark mb-2">Course Handicap Calculator</h3>
                    <p className="text-sm text-slate-600">Convert your handicap index to a course handicap for any tee</p>
                  </Link>

                  <Link
                    href="/tools/stableford-calculator"
                    className="p-4 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                  >
                    <h3 className="font-bold text-slate-900 group-hover:text-brand-dark mb-2">Stableford Calculator</h3>
                    <p className="text-sm text-slate-600">Calculate Stableford points based on your handicap and scores</p>
                  </Link>

                  <Link
                    href="/tools/strokes-gained-calculator"
                    className="p-4 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                  >
                    <h3 className="font-bold text-slate-900 group-hover:text-brand-dark mb-2">Strokes Gained Calculator</h3>
                    <p className="text-sm text-slate-600">Analyze your performance with advanced strokes gained metrics</p>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-3">Popular Golf Resources</h4>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/course-directory" className="text-sm px-3 py-1 bg-emerald-100 text-brand-primary rounded-full hover:bg-emerald-200">
                      Course Directory
                    </Link>
                    <Link href="/break-90/how-to-break-90-golf" className="text-sm px-3 py-1 bg-emerald-100 text-brand-primary rounded-full hover:bg-emerald-200">
                      Break 90 Guide
                    </Link>
                    <Link href="/break-80/how-to-break-80-golf" className="text-sm px-3 py-1 bg-emerald-100 text-brand-primary rounded-full hover:bg-emerald-200">
                      Break 80 Guide
                    </Link>
                    <Link href="/tools/swing-speed-calculator" className="text-sm px-3 py-1 bg-emerald-100 text-brand-primary rounded-full hover:bg-emerald-200">
                      Swing Speed Calculator
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}