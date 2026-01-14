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
  title: 'Free Stableford Calculator 2026 - Golf Stableford Points Calculator | Welton Golf',
  description: 'Calculate your Stableford points with our free golf scoring calculator. Track your rounds, understand scoring system, and improve your competitive golf game. Complete guide included.',
  keywords: 'stableford calculator, golf stableford points, stableford scoring system, golf competition scoring, stableford points calculator, modified stableford, golf scoring',
  openGraph: {
    title: 'Free Stableford Calculator - Golf Stableford Points Calculator',
    description: 'Calculate your Stableford points and track your competitive golf rounds. Free calculator with complete scoring guide.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/stableford-calculator',
    images: [
      {
        url: 'https://www.weltongolf.com/golf-stableford-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Stableford Calculator - Points Scoring System',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/stableford-calculator',
  },
}

interface HoleScore {
  hole: number
  par: number
  grossScore: number
  handicapStrokes: number
  stablefordPoints: number
}

interface StablefordRound {
  id: string
  courseName: string
  courseHandicap: number
  holes: HoleScore[]
  totalPoints: number
}

export default function StablefordCalculator() {
  const [rounds, setRounds] = useState<StablefordRound[]>([])
  const [currentRound, setCurrentRound] = useState({
    courseName: '',
    courseHandicap: ''
  })
  const [holes, setHoles] = useState<HoleScore[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [currentHole, setCurrentHole] = useState({
    hole: 1,
    par: '',
    grossScore: '',
    handicapStrokes: 0
  })

  // Initialize 18 holes
  useEffect(() => {
    const initialHoles: HoleScore[] = Array.from({ length: 18 }, (_, i) => ({
      hole: i + 1,
      par: 4,
      grossScore: 0,
      handicapStrokes: 0,
      stablefordPoints: 0
    }))
    setHoles(initialHoles)
  }, [])

  // Load rounds from localStorage
  useEffect(() => {
    const savedRounds = localStorage.getItem('stableford-rounds')
    if (savedRounds) {
      setRounds(JSON.parse(savedRounds))
    }
  }, [])

  // Save rounds to localStorage
  useEffect(() => {
    if (rounds.length > 0) {
      localStorage.setItem('stableford-rounds', JSON.stringify(rounds))
    }
  }, [rounds])

  // Calculate handicap strokes allocation for each hole
  const calculateHandicapStrokes = useCallback((courseHandicap: number) => {
    const strokesPerHole = Math.floor(courseHandicap / 18)
    const extraStrokes = courseHandicap % 18

    return holes.map((hole, index) => {
      let strokes = strokesPerHole
      // Distribute extra strokes on hardest holes (typically holes 1-extraStrokes in handicap order)
      if (index < extraStrokes) {
        strokes += 1
      }
      return strokes
    })
  }, [holes])

  // Calculate Stableford points for a hole
  const calculateStablefordPoints = (grossScore: number, par: number, handicapStrokes: number): number => {
    if (grossScore === 0) return 0 // No score entered

    const netScore = grossScore - handicapStrokes
    const scoreToPar = netScore - par

    // Stableford scoring system
    if (scoreToPar <= -2) return 4 // Eagle or better
    if (scoreToPar === -1) return 3 // Birdie
    if (scoreToPar === 0) return 2  // Par
    if (scoreToPar === 1) return 1  // Bogey
    return 0 // Double bogey or worse
  }

  // Update hole data
  const updateHole = (holeIndex: number, field: keyof HoleScore, value: number) => {
    const updatedHoles = [...holes]
    updatedHoles[holeIndex] = { ...updatedHoles[holeIndex], [field]: value }

    // Recalculate Stableford points for this hole
    if (field === 'grossScore' || field === 'par' || field === 'handicapStrokes') {
      const hole = updatedHoles[holeIndex]
      hole.stablefordPoints = calculateStablefordPoints(hole.grossScore, hole.par, hole.handicapStrokes)
    }

    setHoles(updatedHoles)
  }

  // Calculate total points
  useEffect(() => {
    const total = holes.reduce((sum, hole) => sum + hole.stablefordPoints, 0)
    setTotalPoints(total)
  }, [holes])

  // Update handicap strokes when course handicap changes
  useEffect(() => {
    if (currentRound.courseHandicap) {
      const handicap = parseInt(currentRound.courseHandicap)
      const strokesAllocation = calculateHandicapStrokes(handicap)

      const updatedHoles = holes.map((hole, index) => ({
        ...hole,
        handicapStrokes: strokesAllocation[index],
        stablefordPoints: calculateStablefordPoints(hole.grossScore, hole.par, strokesAllocation[index])
      }))

      setHoles(updatedHoles)
    }
  }, [currentRound.courseHandicap, calculateHandicapStrokes, holes])

  const saveRound = () => {
    if (!currentRound.courseHandicap) return

    const newRound: StablefordRound = {
      id: Date.now().toString(),
      courseName: currentRound.courseName || 'Unknown Course',
      courseHandicap: parseInt(currentRound.courseHandicap),
      holes: [...holes],
      totalPoints
    }

    setRounds(prev => [newRound, ...prev])

    // Reset form
    setCurrentRound({
      courseName: '',
      courseHandicap: ''
    })

    // Reset holes
    const resetHoles: HoleScore[] = Array.from({ length: 18 }, (_, i) => ({
      hole: i + 1,
      par: 4,
      grossScore: 0,
      handicapStrokes: 0,
      stablefordPoints: 0
    }))
    setHoles(resetHoles)
    setTotalPoints(0)
  }

  const removeRound = (id: string) => {
    setRounds(prev => prev.filter(round => round.id !== id))
  }

  const clearAllRounds = () => {
    setRounds([])
    localStorage.removeItem('stableford-rounds')
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
            "name": "Stableford Calculator",
            "description": "Free golf Stableford points calculator with automatic handicap stroke allocation and competition scoring.",
            "url": "https://www.weltongolf.com/tools/stableford-calculator",
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
              "Stableford Points Calculation",
              "Handicap Stroke Allocation",
              "Round Tracking",
              "Competition Scoring",
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
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                  Free Stableford Points Calculator
                </h1>
                <p className="text-gray-600 text-lg">
                  Calculate Stableford points for your golf round with automatic handicap stroke allocation and scoring. Perfect for competitions and tracking performance.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Professional Stableford Points Calculator - Free & Accurate
              </h2>
              <p className="text-slate-700 mb-3">
                Our Stableford calculator automatically allocates handicap strokes and calculates points using the official
                scoring system. Perfect for competitions, casual rounds, and tracking your golf performance.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Official Stableford Scoring
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Auto Handicap Allocation
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  18-Hole Score Tracking
                </div>
              </div>
            </div>

            {/* Current Total Points Display */}
            {totalPoints > 0 && (
              <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
                <div className="text-center">
                  <h2 className="text-2xl font-black text-slate-900 mb-2">
                    Total Stableford Points
                  </h2>
                  <div className="text-5xl font-black text-emerald-600 mb-2">
                    {totalPoints}
                  </div>
                  <p className="text-sm text-slate-700">
                    Points for current round
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Round Setup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Round Setup
                </CardTitle>
                <CardDescription>
                  Enter player and course details to begin scoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input
                    id="courseName"
                    placeholder="e.g. St Andrews Old Course"
                    value={currentRound.courseName}
                    onChange={(e) => setCurrentRound(prev => ({ ...prev, courseName: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="courseHandicap">Course Handicap *</Label>
                  <Input
                    id="courseHandicap"
                    type="number"
                    placeholder="e.g. 18"
                    value={currentRound.courseHandicap}
                    onChange={(e) => setCurrentRound(prev => ({ ...prev, courseHandicap: e.target.value }))}
                  />
                </div>

              </CardContent>
            </Card>

            {/* Scorecard */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Scorecard
                </CardTitle>
                <CardDescription>
                  Enter your scores for each hole (Par, Gross Score)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Hole</th>
                        <th className="text-center p-2">Par</th>
                        <th className="text-center p-2">Score</th>
                        <th className="text-center p-2">Strokes</th>
                        <th className="text-center p-2">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holes.map((hole, index) => (
                        <tr key={hole.hole} className="border-b hover:bg-slate-50">
                          <td className="p-2 font-medium">{hole.hole}</td>
                          <td className="p-2 text-center">
                            <Input
                              type="number"
                              min="3"
                              max="6"
                              value={hole.par || ''}
                              onChange={(e) => updateHole(index, 'par', parseInt(e.target.value) || 0)}
                              className="w-16 text-center mx-auto"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <Input
                              type="number"
                              min="1"
                              max="15"
                              value={hole.grossScore || ''}
                              onChange={(e) => updateHole(index, 'grossScore', parseInt(e.target.value) || 0)}
                              className="w-16 text-center mx-auto"
                            />
                          </td>
                          <td className="p-2 text-center">{hole.handicapStrokes}</td>
                          <td className="p-2 text-center">
                            <span
                              className="px-2 py-1 rounded text-white font-medium"
                              style={{backgroundColor: hole.stablefordPoints > 0 ? '#10b981' : '#6b7280'}}
                            >
                              {hole.stablefordPoints}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="font-bold border-t-2">
                        <td className="p-2">Total</td>
                        <td className="p-2 text-center">{holes.reduce((sum, hole) => sum + hole.par, 0)}</td>
                        <td className="p-2 text-center">{holes.reduce((sum, hole) => sum + hole.grossScore, 0)}</td>
                        <td className="p-2 text-center">{parseInt(currentRound.courseHandicap) || 0}</td>
                        <td className="p-2 text-center">
                          <span
                            className="px-3 py-1 rounded text-white font-bold bg-emerald-600"
                          >
                            {totalPoints}
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Save Round Button */}
                <div className="mt-6 pt-4 border-t">
                  <Button
                    onClick={saveRound}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg border-0"
                    disabled={!currentRound.courseHandicap || totalPoints === 0}
                  >
                    Save Round ({totalPoints} points)
                  </Button>
                  <p className="text-xs text-slate-500 text-center mt-2">
                    Complete your scorecard before saving the round
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Round History */}
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Round History
                  </CardTitle>
                  <CardDescription>
                    Your recent Stableford rounds ({rounds.length} rounds)
                  </CardDescription>
                </div>
                {rounds.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllRounds}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {rounds.length === 0 ? (
                <div className="text-center py-8 text-slate-600">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No rounds recorded yet.</p>
                  <p className="text-sm">Complete your first Stableford round above.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {rounds.map((round) => (
                    <div key={round.id} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-slate-900">
                          {round.courseName}
                        </div>
                        <div className="text-xs text-slate-700">
                          Course Handicap: {round.courseHandicap}
                        </div>
                        <div className="text-sm font-medium px-2 py-1 bg-emerald-600 rounded inline-block text-white mt-1">
                          Total Points: {round.totalPoints}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRound(round.id)}
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

          {/* Information Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                How Stableford Scoring Works
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">
                  Complete Guide to Stableford Points Calculation
                </h3>
                <p className="text-slate-700 mb-4">
                  Stableford is a popular golf scoring system where players earn points based on their net score relative to par.
                  This system rewards good play and limits the damage from bad holes, making golf more enjoyable and encouraging.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Stableford Points System:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Double Eagle or better:</strong> 5 points (Net score 3+ under par)</li>
                    <li>• <strong>Eagle:</strong> 4 points (Net score 2 under par)</li>
                    <li>• <strong>Birdie:</strong> 3 points (Net score 1 under par)</li>
                    <li>• <strong>Par:</strong> 2 points (Net score equals par)</li>
                    <li>• <strong>Bogey:</strong> 1 point (Net score 1 over par)</li>
                    <li>• <strong>Double Bogey or worse:</strong> 0 points</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">How Handicap Strokes Work:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Stroke allocation</strong> is based on your course handicap</li>
                    <li>• <strong>Even distribution:</strong> Strokes spread across all 18 holes</li>
                    <li>• <strong>Extra strokes</strong> go to the hardest holes first</li>
                    <li>• <strong>Net score</strong> = Gross score - Handicap strokes</li>
                    <li>• Points calculated from net score vs. par</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Example Calculation:</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Hole:</strong> Par 4, 1 handicap stroke<br/>
                    <strong>Gross Score:</strong> 6<br/>
                    <strong>Net Score:</strong> 6 - 1 = 5 (1 over par)
                  </p>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Result:</strong> 1 Stableford point (Bogey)
                  </p>
                  <p className="text-xs text-slate-700">
                    Without the handicap stroke, this would be 0 points (Double Bogey).
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Competition Scoring:</h4>
                  <p className="text-sm text-slate-700 mb-2">
                    Stableford competitions are won by the player with the highest total points.
                    Typical winning scores range from 32-42 points depending on conditions.
                  </p>
                  <p className="text-xs text-slate-700">
                    36 points represents playing to your handicap (2 points per hole average).
                  </p>
                </div>
              </div>

              <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
                <h4 className="font-semibold mb-3 text-black">Why Use Our Stableford Calculator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Automatic Stroke Allocation:</strong> No manual calculation needed
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Real-time Scoring:</strong> See points update as you play
                    </p>
                    <p className="text-slate-700">
                      <strong>✓ Competition Ready:</strong> Official Stableford scoring rules
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Round History:</strong> Track your Stableford performance
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Mobile Friendly:</strong> Score on the course or at home
                    </p>
                    <p className="text-slate-700">
                      <strong>✓ Free Forever:</strong> No registration required
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-slate-700">
                  <strong>Competition Note:</strong> For official Stableford competitions, verify handicap stroke
                  allocation with the competition organizer, as some events may use different stroke index systems
                  or have specific local rules.
                </p>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </>
  )
}