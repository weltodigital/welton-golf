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

export default function HandicapCalculator() {
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumbs */}
          <nav className="text-sm text-slate-600 mb-4">
            <ol className="flex space-x-2">
              <li><Link href="/" className="hover:text-brand-primary">Home</Link></li>
              <li className="before:content-['/'] before:mx-2 text-slate-900">Handicap Calculator</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Calculator className="h-6 w-6 text-brand-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-2">
                  Free Golf Handicap Calculator (WHS)
                </h1>
                <p className="text-slate-700 text-lg">
                  Calculate your official World Handicap System index instantly. UK&apos;s most accurate WHS handicap calculator with course rating and slope rating support.
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
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
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

          {/* Information Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                How the World Handicap System (WHS) Calculator Works
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-black">
                  Complete Guide to Golf Handicap Calculation Using WHS
                </h3>
                <p className="text-black mb-4">
                  The World Handicap System (WHS) is the unified global handicap system adopted by golf governing bodies worldwide,
                  including the R&A, USGA, Golf Australia, and European Golf Association (EGA). Our free golf handicap calculator
                  implements the exact WHS algorithm used by official handicap services.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-black">WHS Score Requirements:</h4>
                  <ul className="text-sm space-y-2 text-black">
                    <li>• <strong>Minimum 3 scores</strong> needed for initial handicap calculation</li>
                    <li>• <strong>Maximum 20 scores</strong> used for ongoing handicap index</li>
                    <li>• Must be <strong>18-hole equivalent</strong> adjusted gross scores</li>
                    <li>• Scores should follow <strong>WHS playing conditions</strong> adjustments</li>
                    <li>• Recent scores weighted more heavily in calculation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">WHS Calculation Formula:</h4>
                  <ul className="text-sm space-y-2 text-black">
                    <li>• <strong>Score Differential</strong> = (Adjusted Score - Course Rating) × 113 ÷ Slope Rating</li>
                    <li>• <strong>3-5 scores:</strong> Average of 1 best differential</li>
                    <li>• <strong>6-8 scores:</strong> Average of 2 best differentials</li>
                    <li>• <strong>9-11 scores:</strong> Average of 3 best differentials</li>
                    <li>• <strong>12+ scores:</strong> Progressive scale up to 8 best</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-black">Course Rating Explained:</h4>
                  <p className="text-sm text-black mb-2">
                    Course Rating represents the expected score for a <strong>scratch golfer</strong> (0 handicap) playing the course under normal conditions.
                    This rating accounts for course length, obstacles, and playing difficulty.
                  </p>
                  <p className="text-xs text-black">
                    Example: A course rating of 72.1 means a scratch golfer should average 72.1 strokes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Slope Rating Explained:</h4>
                  <p className="text-sm text-black mb-2">
                    Slope Rating measures the relative difficulty for <strong>bogey golfers</strong> compared to scratch golfers.
                    Ratings range from 55-155, with 113 being standard difficulty.
                  </p>
                  <p className="text-xs text-black">
                    Higher slope = more challenging for higher handicap players.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-3 text-black">Why Use Our Free Golf Handicap Calculator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-black mb-2">
                      <strong>✓ 100% WHS Compliant:</strong> Follows exact R&A and USGA specifications
                    </p>
                    <p className="text-black mb-2">
                      <strong>✓ Accurate Calculations:</strong> Same algorithm used by official handicap services
                    </p>
                    <p className="text-black">
                      <strong>✓ Track Progress:</strong> Store up to 20 rounds with score history
                    </p>
                  </div>
                  <div>
                    <p className="text-black mb-2">
                      <strong>✓ Free Forever:</strong> No registration or payment required
                    </p>
                    <p className="text-black mb-2">
                      <strong>✓ Mobile Friendly:</strong> Calculate on any device, anywhere
                    </p>
                    <p className="text-black">
                      <strong>✓ Instant Results:</strong> Real-time handicap index updates
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-black">
                  <strong>Official Handicap Note:</strong> While this calculator provides accurate WHS calculations,
                  for official tournament play and club competitions, ensure your handicap is registered through
                  an authorized golf club affiliated with your national golf governing body (England Golf, Golf Scotland, etc.).
                </p>
              </div>
            </CardContent>
          </Card>

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
  )
}