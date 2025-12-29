'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, TrendingUp, Award } from 'lucide-react'

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

export default function StrokesGainedCalculator() {
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

  return (
    <div className="min-h-screen bg-white ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-600 mb-4">
            <ol className="flex space-x-2">
              <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
              <li className="before:content-['/'] before:mx-2 text-slate-900">Strokes Gained Calculator</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" className="bg-emerald-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-2">
                  Strokes Gained Calculator
                </h1>
                <p className="text-slate-600 text-lg">
                  Analyze your golf performance with advanced strokes gained statistics to identify strengths and improvement areas.
                </p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Professional Golf Analytics - Free Performance Analysis Tool
              </h2>
              <p className="text-slate-700 mb-3">
                Unlock insights into your game with strokes gained analysis. Compare your performance to tour averages
                across driving, approach, short game, and putting to identify where to focus your practice efforts.
              </p>
              <div className="grid md:grid-cols-4 gap-4 text-sm" className="text-slate-900">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" className="bg-emerald-600"></span>
                  Driving Analysis
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" className="bg-emerald-600"></span>
                  Approach Play
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" className="bg-emerald-600"></span>
                  Short Game
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" className="bg-emerald-600"></span>
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
                  <p className="text-sm text-slate-600 mb-4">
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
                  className="w-full text-white hover:opacity-90"
                  className="bg-emerald-600"
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
                            <h4 className="font-medium text-slate-900">
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
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Understanding Strokes Gained
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Complete Guide to Strokes Gained Analysis</h3>
                <p className="text-slate-700 mb-4">
                  Strokes gained is the most advanced golf statistic, measuring how many strokes better or worse you perform
                  compared to a baseline (typically PGA Tour averages) from any position on the golf course.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Four Main Categories:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Strokes Gained: Driving</strong> - Tee shots on par 4s and 5s</li>
                    <li>• <strong>Strokes Gained: Approach</strong> - Shots from 50+ yards to green</li>
                    <li>• <strong>Strokes Gained: Short Game</strong> - Shots from {'<'}50 yards around green</li>
                    <li>• <strong>Strokes Gained: Putting</strong> - All putts on the green</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">How It Works:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• Compares your result to statistical average from that position</li>
                    <li>• Positive numbers = better than average</li>
                    <li>• Negative numbers = worse than average</li>
                    <li>• Accounts for distance and lie conditions</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Interpretation Guide:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>+2.0 or better:</strong> Exceptional performance</p>
                    <p><strong>+1.0 to +2.0:</strong> Very good round</p>
                    <p><strong>0 to +1.0:</strong> Above average</p>
                    <p><strong>-1.0 to 0:</strong> Below average</p>
                    <p><strong>-2.0 or worse:</strong> Poor performance</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Benchmarks (vs PGA Tour):</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Scratch Golfer:</strong> -2.5 to -3.5 total</p>
                    <p><strong>5 Handicap:</strong> -4.0 to -5.0 total</p>
                    <p><strong>10 Handicap:</strong> -6.0 to -7.0 total</p>
                    <p><strong>15 Handicap:</strong> -8.0 to -9.0 total</p>
                    <p><strong>20+ Handicap:</strong> -10.0 or worse</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Key Insights:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Putting:</strong> Usually biggest differentiator</p>
                    <p><strong>Approach:</strong> Most important for scoring</p>
                    <p><strong>Driving:</strong> Sets up other shots</p>
                    <p><strong>Short Game:</strong> Saves strokes around green</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Common Patterns by Skill Level:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Beginners:</strong> Lose most strokes driving and approach</p>
                    <p><strong>Mid-handicap:</strong> Short game and putting weaknesses</p>
                    <p><strong>Low handicap:</strong> Small losses across all areas</p>
                    <p><strong>Scratch golfers:</strong> Strong approach, adequate putting</p>
                    <p><strong>Tour pros:</strong> Excel in approach and short game</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Practice Prioritization:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Biggest Losses:</strong> Focus practice time here first</p>
                    <p><strong>Approach Shots:</strong> Highest impact on scoring</p>
                    <p><strong>Putting:</strong> Easiest to improve quickly</p>
                    <p><strong>Short Game:</strong> High return on investment</p>
                    <p><strong>Driving:</strong> Distance vs. accuracy balance</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-slate-900 mb-3">Why Use Our Strokes Gained Calculator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-700 mb-2"><strong>✓ Advanced Analytics:</strong> Professional-level insights</p>
                    <p className="text-slate-700 mb-2"><strong>✓ Strength Identification:</strong> Know your best skills</p>
                    <p className="text-slate-700"><strong>✓ Weakness Analysis:</strong> Focus improvement efforts</p>
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2"><strong>✓ Performance Tracking:</strong> Monitor progress over time</p>
                    <p className="text-slate-700 mb-2"><strong>✓ Benchmarking:</strong> Compare to tour standards</p>
                    <p className="text-slate-700"><strong>✓ Free Analysis:</strong> No cost for insights</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-slate-700">
                  <strong>Important:</strong> This simplified calculator provides basic strokes gained estimates.
                  Professional strokes gained analysis requires detailed shot tracking with precise distances and lie conditions.
                  Use these results as general performance indicators and practice guidance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}