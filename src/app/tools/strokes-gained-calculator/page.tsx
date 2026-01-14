'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, TrendingUp, Award, Target, BarChart3 } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Golf Strokes Gained Calculator 2026 - Advanced Performance Analysis | Welton Golf',
  description: 'Analyze your golf performance with our free strokes gained calculator. Compare driving, approach, short game, and putting to PGA Tour benchmarks for targeted practice insights.',
  keywords: 'strokes gained calculator, golf performance analysis, golf statistics, PGA tour benchmarks, golf improvement, driving stats, putting analysis, golf analytics tool',
  openGraph: {
    title: 'Free Golf Strokes Gained Calculator 2026 - Performance Analytics Tool',
    description: 'Advanced golf performance analysis using strokes gained methodology. Compare your driving, approach, short game, and putting to tour standards.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/strokes-gained-calculator',
    images: [
      {
        url: 'https://www.weltongolf.com/strokes-gained-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Golf Strokes Gained Calculator - Performance Analysis',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/strokes-gained-calculator',
  },
}

interface StrokesGainedAnalysis {
  id: string
  roundName: string
  totalStrokes: number
  sgTotal: number
  sgDriving: number
  sgApproach: number
  sgShortGame: number
  sgPutting: number
  par3Performance: number
  par4Performance: number
  par5Performance: number
  strengthArea: string
  weaknessArea: string
  createdAt: string
}

interface HoleData {
  par: number
  startDistance: number
  approachDistance: number
  chipPutts: number
  totalPutts: number
  holed: boolean
}

function StrokesGainedCalculator() {
  const [analyses, setAnalyses] = useState<StrokesGainedAnalysis[]>([])
  const [currentRound, setCurrentRound] = useState({
    roundName: '',
    holes: Array(18).fill(null).map(() => ({
      par: 4,
      startDistance: 150,
      approachDistance: 20,
      chipPutts: 0,
      totalPutts: 2,
      holed: false
    })) as HoleData[]
  })

  useEffect(() => {
    const savedAnalyses = localStorage.getItem('strokes-gained-analyses')
    if (savedAnalyses) {
      setAnalyses(JSON.parse(savedAnalyses))
    }
  }, [])

  useEffect(() => {
    if (analyses.length > 0) {
      localStorage.setItem('strokes-gained-analyses', JSON.stringify(analyses))
    }
  }, [analyses])

  // Simplified strokes gained baselines (PGA Tour averages)
  const getBaselineStrokes = (distance: number, lie: string = 'fairway') => {
    // Distance-based stroke expectation (simplified)
    if (distance <= 3) return 1.0 // Inside 3 feet
    if (distance <= 10) return 1.1
    if (distance <= 25) return 1.3
    if (distance <= 50) return 1.6
    if (distance <= 100) return 2.8
    if (distance <= 150) return 3.2
    if (distance <= 200) return 3.6
    if (distance <= 250) return 4.0
    return 4.5 + (distance - 250) * 0.01
  }

  const calculateStrokesGained = () => {
    let sgDriving = 0
    let sgApproach = 0
    let sgShortGame = 0
    let sgPutting = 0
    let totalStrokes = 0

    let par3Strokes = 0, par4Strokes = 0, par5Strokes = 0
    let par3Count = 0, par4Count = 0, par5Count = 0

    currentRound.holes.forEach((hole) => {
      const par = hole.par
      const startDistance = hole.startDistance
      const approachDistance = hole.approachDistance
      const chipPutts = hole.chipPutts
      const totalPutts = hole.totalPutts

      // Calculate actual strokes for this hole
      let holeStrokes = 0

      // Tee shot (driving)
      holeStrokes += 1
      const baselineFromTee = getBaselineStrokes(startDistance)
      const baselineAfterDrive = getBaselineStrokes(approachDistance)
      sgDriving += (baselineFromTee - baselineAfterDrive - 1)

      // Approach shot
      if (approachDistance > 30) {
        holeStrokes += 1
        const baselineBeforeApproach = getBaselineStrokes(approachDistance)
        const baselineAfterApproach = getBaselineStrokes(chipPutts > 0 ? 20 : 5)
        sgApproach += (baselineBeforeApproach - baselineAfterApproach - 1)
      }

      // Short game (chipping/pitching)
      if (chipPutts > 0) {
        holeStrokes += chipPutts
        const baselineBeforeChip = getBaselineStrokes(20)
        const baselineAfterChip = getBaselineStrokes(5)
        sgShortGame += (baselineBeforeChip - baselineAfterChip - chipPutts)
      }

      // Putting
      holeStrokes += totalPutts
      const baselineBeforePutt = getBaselineStrokes(chipPutts > 0 ? 5 : (approachDistance <= 30 ? approachDistance : 5))
      sgPutting += (baselineBeforePutt - totalPutts)

      totalStrokes += holeStrokes

      // Track par performance
      if (par === 3) {
        par3Strokes += holeStrokes - par
        par3Count++
      } else if (par === 4) {
        par4Strokes += holeStrokes - par
        par4Count++
      } else if (par === 5) {
        par5Strokes += holeStrokes - par
        par5Count++
      }
    })

    const sgTotal = sgDriving + sgApproach + sgShortGame + sgPutting

    // Determine strengths and weaknesses
    const categories = [
      { name: 'Driving', value: sgDriving },
      { name: 'Approach', value: sgApproach },
      { name: 'Short Game', value: sgShortGame },
      { name: 'Putting', value: sgPutting }
    ]

    const strengthArea = categories.reduce((max, cat) => cat.value > max.value ? cat : max).name
    const weaknessArea = categories.reduce((min, cat) => cat.value < min.value ? cat : min).name

    const newAnalysis: StrokesGainedAnalysis = {
      id: Date.now().toString(),
      roundName: currentRound.roundName || `Round ${analyses.length + 1}`,
      totalStrokes,
      sgTotal: Number(sgTotal.toFixed(2)),
      sgDriving: Number(sgDriving.toFixed(2)),
      sgApproach: Number(sgApproach.toFixed(2)),
      sgShortGame: Number(sgShortGame.toFixed(2)),
      sgPutting: Number(sgPutting.toFixed(2)),
      par3Performance: par3Count > 0 ? Number((par3Strokes / par3Count).toFixed(2)) : 0,
      par4Performance: par4Count > 0 ? Number((par4Strokes / par4Count).toFixed(2)) : 0,
      par5Performance: par5Count > 0 ? Number((par5Strokes / par5Count).toFixed(2)) : 0,
      strengthArea,
      weaknessArea,
      createdAt: new Date().toLocaleDateString()
    }

    setAnalyses(prev => [newAnalysis, ...prev.slice(0, 19)])

    // Reset form
    setCurrentRound({
      roundName: '',
      holes: Array(18).fill(null).map(() => ({
        par: 4,
        startDistance: 150,
        approachDistance: 20,
        chipPutts: 0,
        totalPutts: 2,
        holed: false
      }))
    })
  }

  const updateHole = (index: number, field: keyof HoleData, value: any) => {
    setCurrentRound(prev => ({
      ...prev,
      holes: prev.holes.map((hole, i) =>
        i === index ? { ...hole, [field]: value } : hole
      )
    }))
  }

  const removeAnalysis = (id: string) => {
    setAnalyses(prev => prev.filter(analysis => analysis.id !== id))
  }

  const clearAllAnalyses = () => {
    setAnalyses([])
    localStorage.removeItem('strokes-gained-analyses')
  }

  const getPerformanceColor = (value: number) => {
    if (value > 0.5) return 'text-green-600 font-semibold'
    if (value > 0) return 'text-green-500'
    if (value > -0.5) return 'text-yellow-600'
    if (value > -1) return 'text-orange-600'
    return 'text-red-600 font-semibold'
  }

  const formatSG = (value: number) => {
    return value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2)
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Strokes Gained Calculator',
    applicationCategory: 'Sports Application',
    description: 'Advanced golf performance analysis using strokes gained methodology to compare driving, approach, short game, and putting performance to PGA Tour benchmarks.',
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
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                  Free Golf Strokes Gained Calculator 2026
                </h1>
                <p className="text-gray-700 text-lg">
                  Analyze your golf performance with advanced strokes gained statistics to identify strengths and improvement areas.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Professional Golf Analytics - Free Performance Analysis Tool
              </h2>
              <p className="text-gray-700 mb-3">
                Unlock insights into your game with advanced strokes gained analysis. Compare your performance to PGA Tour benchmarks
                across driving, approach, short game, and putting to identify exactly where to focus your practice efforts for maximum improvement.
              </p>
              <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Driving Analysis
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Approach Play
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Short Game
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Putting Stats
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Round Analysis
                </CardTitle>
                <CardDescription>
                  Enter your round data for detailed strokes gained analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="roundName">Round Name</Label>
                  <Input
                    id="roundName"
                    type="text"
                    placeholder="e.g. Saturday at Pebble Beach"
                    value={currentRound.roundName}
                    onChange={(e) => setCurrentRound(prev => ({...prev, roundName: e.target.value}))}
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Hole-by-Hole Data (Simplified)</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Enter basic data for each hole. Full strokes gained requires detailed shot tracking.
                  </p>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {currentRound.holes.map((hole, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded border">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">Hole {index + 1}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <Label>Par</Label>
                            <select
                              value={hole.par}
                              onChange={(e) => updateHole(index, 'par', parseInt(e.target.value))}
                              className="w-full p-1 border rounded text-xs"
                            >
                              <option value={3}>Par 3</option>
                              <option value={4}>Par 4</option>
                              <option value={5}>Par 5</option>
                            </select>
                          </div>
                          <div>
                            <Label>Start Distance (yds)</Label>
                            <Input
                              type="number"
                              value={hole.startDistance}
                              onChange={(e) => updateHole(index, 'startDistance', parseInt(e.target.value))}
                              className="text-xs"
                            />
                          </div>
                          <div>
                            <Label>Approach Distance (yds)</Label>
                            <Input
                              type="number"
                              value={hole.approachDistance}
                              onChange={(e) => updateHole(index, 'approachDistance', parseInt(e.target.value))}
                              className="text-xs"
                            />
                          </div>
                          <div>
                            <Label>Total Putts</Label>
                            <Input
                              type="number"
                              value={hole.totalPutts}
                              onChange={(e) => updateHole(index, 'totalPutts', parseInt(e.target.value))}
                              className="text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={calculateStrokesGained}
                  className="w-full text-white hover:opacity-90 bg-emerald-600"
                >
                  Analyze Round Performance
                </Button>
              </CardContent>
            </Card>

            {/* Results History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      Performance Analysis
                    </CardTitle>
                    <CardDescription>
                      Your strokes gained results ({analyses.length} rounds)
                    </CardDescription>
                  </div>
                  {analyses.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllAnalyses}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {analyses.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No performance analysis yet.</p>
                    <p className="text-sm">Analyze your first round above.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {analyses.map((analysis) => (
                      <div key={analysis.id} className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {analysis.roundName}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {analysis.createdAt} • {analysis.totalStrokes} strokes
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAnalysis(analysis.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-gray-600">Total Strokes Gained:</p>
                          <p className={`text-lg font-bold ${getPerformanceColor(analysis.sgTotal)}`}>
                            {formatSG(analysis.sgTotal)}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="flex justify-between">
                            <span>Driving:</span>
                            <span className={getPerformanceColor(analysis.sgDriving)}>
                              {formatSG(analysis.sgDriving)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Approach:</span>
                            <span className={getPerformanceColor(analysis.sgApproach)}>
                              {formatSG(analysis.sgApproach)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Short Game:</span>
                            <span className={getPerformanceColor(analysis.sgShortGame)}>
                              {formatSG(analysis.sgShortGame)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Putting:</span>
                            <span className={getPerformanceColor(analysis.sgPutting)}>
                              {formatSG(analysis.sgPutting)}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t text-xs">
                          <div className="flex justify-between mb-1">
                            <span>🏆 Strength:</span>
                            <span className="text-green-600 font-medium">{analysis.strengthArea}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>📈 Focus Area:</span>
                            <span className="text-orange-600 font-medium">{analysis.weaknessArea}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Educational Content */}
          <div className="mt-12 space-y-12">
            {/* Strokes Gained Fundamentals */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
                Understanding Strokes Gained: The Ultimate Golf Statistic
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Strokes gained is the most sophisticated golf analytics tool used by PGA Tour professionals and top instructors.
                It measures how many strokes better or worse you perform compared to a statistical baseline from any position
                on the golf course, revealing exactly where your game excels and where it needs improvement.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">The Four Pillars of Strokes Gained:</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 rounded border">
                      <p className="text-emerald-900 font-medium">Strokes Gained: Driving</p>
                      <p className="text-emerald-800 text-sm">Tee shots on par 4s and par 5s - distance and accuracy</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded border">
                      <p className="text-blue-900 font-medium">Strokes Gained: Approach</p>
                      <p className="text-blue-800 text-sm">Shots from 50+ yards to the green - proximity and accuracy</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded border">
                      <p className="text-amber-900 font-medium">Strokes Gained: Short Game</p>
                      <p className="text-amber-800 text-sm">Shots from within 50 yards around the green</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded border">
                      <p className="text-purple-900 font-medium">Strokes Gained: Putting</p>
                      <p className="text-purple-800 text-sm">All putts on the green from any distance</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">How Strokes Gained Works:</h3>
                  <ul className="text-gray-700 space-y-2 mb-4">
                    <li>• Compares your performance to PGA Tour average from each position</li>
                    <li>• Positive numbers = better than tour average</li>
                    <li>• Negative numbers = worse than tour average</li>
                    <li>• Accounts for distance, lie conditions, and pin position</li>
                  </ul>
                  <div className="p-4 bg-green-50 rounded border">
                    <p className="text-green-900 text-sm font-medium">Example:</p>
                    <p className="text-green-800 text-sm">From 150 yards, PGA Tour average is 2.8 strokes to hole. If you take 3 strokes, your Strokes Gained: Approach = 2.8 - 3 = -0.2</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Performance Benchmarks */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
                Strokes Gained Benchmarks and Performance Levels
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Understanding where you stand compared to different skill levels helps set realistic goals and track improvement.
                These benchmarks represent typical strokes gained totals compared to PGA Tour averages across all categories.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Handicap Benchmarks (Total SG):</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded border">
                      <p className="text-green-900 font-medium">Scratch Golfer (0 HCP)</p>
                      <p className="text-green-800">-2.5 to -3.5 strokes gained</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded border">
                      <p className="text-blue-900 font-medium">5 Handicap</p>
                      <p className="text-blue-800">-4.0 to -5.0 strokes gained</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded border">
                      <p className="text-amber-900 font-medium">10 Handicap</p>
                      <p className="text-amber-800">-6.0 to -7.0 strokes gained</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded border">
                      <p className="text-red-900 font-medium">20+ Handicap</p>
                      <p className="text-red-800">-10.0 or worse strokes gained</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Performance Interpretation:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>+2.0 or better:</strong> Exceptional round, tour-level performance</p>
                    <p><strong>+1.0 to +2.0:</strong> Very strong round, well above average</p>
                    <p><strong>0 to +1.0:</strong> Above average performance</p>
                    <p><strong>-1.0 to 0:</strong> Slightly below average</p>
                    <p><strong>-2.0 or worse:</strong> Below average round</p>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded border">
                    <p className="text-blue-900 text-sm font-medium">Remember:</p>
                    <p className="text-blue-800 text-sm">Even PGA Tour players average 0.0 strokes gained by definition - negative numbers don't mean poor golf!</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Category Insights:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Putting:</strong> Usually the biggest differentiator between skill levels</p>
                    <p><strong>Approach:</strong> Most important for consistent scoring</p>
                    <p><strong>Driving:</strong> Sets up opportunities for other shots</p>
                    <p><strong>Short Game:</strong> High impact on final score</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Common Patterns:</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p><strong>Beginners:</strong> Lose strokes in all areas, especially driving</p>
                      <p><strong>Mid-handicap:</strong> Weak short game and putting</p>
                      <p><strong>Low-handicap:</strong> Minor losses across categories</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Using Data for Improvement */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-emerald-600" />
                Using Strokes Gained Data to Transform Your Game
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                The real power of strokes gained analysis lies in how you use the data to prioritize practice time and
                make strategic improvements. Focus your efforts where you'll see the biggest return on investment.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Practice Prioritization Strategy:</h3>
                  <ol className="text-gray-700 space-y-3">
                    <li><strong>1. Identify Your Biggest Loss:</strong> Focus practice time on the category where you lose the most strokes</li>
                    <li><strong>2. Consider Impact Potential:</strong> Approach shots typically offer the highest improvement potential</li>
                    <li><strong>3. Quick Wins:</strong> Putting improvements often show results fastest</li>
                    <li><strong>4. Long-term Development:</strong> Driving accuracy and distance require sustained effort</li>
                    <li><strong>5. Track Progress:</strong> Monitor changes in each category over multiple rounds</li>
                  </ol>

                  <div className="mt-6 p-4 bg-emerald-50 rounded border">
                    <h4 className="font-medium text-emerald-900 mb-2">Pro Tip:</h4>
                    <p className="text-emerald-800 text-sm">Even a 0.5 stroke improvement in one category can lower your handicap by 2-3 strokes over 18 holes!</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Category-Specific Improvement:</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Driving (SG: Off-the-Tee):</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Work on distance and accuracy balance</li>
                        <li>• Practice with different tee heights</li>
                        <li>• Focus on course management and club selection</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Approach (SG: Approach):</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Practice proximity control to pin</li>
                        <li>• Work on consistent contact and distance control</li>
                        <li>• Improve yardage knowledge and club selection</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Short Game:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Practice variety of lies and distances</li>
                        <li>• Develop consistent setup and technique</li>
                        <li>• Work on up-and-down percentages</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Putting:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Focus on speed control first, then line</li>
                        <li>• Practice from 3-8 feet extensively</li>
                        <li>• Work on lag putting from long distances</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border">
                <h4 className="font-bold text-gray-900 mb-3">Why Our Strokes Gained Calculator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>✓ Professional Analytics:</strong> Tour-level insights for your game</p>
                    <p className="text-gray-700 mb-2"><strong>✓ Targeted Practice:</strong> Know exactly where to improve</p>
                    <p className="text-gray-700"><strong>✓ Progress Tracking:</strong> Monitor improvement over time</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>✓ Benchmarking:</strong> Compare to relevant skill levels</p>
                    <p className="text-gray-700 mb-2"><strong>✓ Free Analysis:</strong> No cost for professional insights</p>
                    <p className="text-gray-700"><strong>✓ Easy to Use:</strong> Simplified data entry process</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-gray-700">
                  <strong>Important Note:</strong> This simplified calculator provides basic strokes gained estimates based on limited data inputs.
                  Professional strokes gained analysis requires detailed shot tracking with precise distances, lie conditions, and pin positions.
                  Use these results as general performance indicators and practice guidance rather than exact statistical analysis.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default function StrokesGainedCalculatorPage() {
  return <StrokesGainedCalculator />
}