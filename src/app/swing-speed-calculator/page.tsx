'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, RotateCcw } from 'lucide-react'

interface SwingSpeedCalculation {
  id: string
  ballSpeed: number
  smashFactor: number
  clubType: string
  swingSpeed: number
  estimatedDistance: number
  efficiency: number
}

export default function SwingSpeedCalculator() {
  const [calculations, setCalculations] = useState<SwingSpeedCalculation[]>([])
  const [currentCalc, setCurrentCalc] = useState({
    ballSpeed: '',
    smashFactor: '',
    clubType: 'Driver'
  })
  const [results, setResults] = useState({
    swingSpeed: 0,
    estimatedDistance: 0,
    efficiency: 0,
    recommendation: ''
  })

  // Load calculations from localStorage
  useEffect(() => {
    const savedCalcs = localStorage.getItem('swing-speed-calculations')
    if (savedCalcs) {
      setCalculations(JSON.parse(savedCalcs))
    }
  }, [])

  // Save calculations to localStorage
  useEffect(() => {
    if (calculations.length > 0) {
      localStorage.setItem('swing-speed-calculations', JSON.stringify(calculations))
    }
  }, [calculations])

  // Calculate swing speed from ball speed
  const calculateSwingSpeed = useCallback(() => {
    const ballSpeed = parseFloat(currentCalc.ballSpeed)
    const smash = parseFloat(currentCalc.smashFactor) || getTypicalSmashFactor(currentCalc.clubType)

    if (!ballSpeed) {
      setResults({ swingSpeed: 0, estimatedDistance: 0, efficiency: 0, recommendation: '' })
      return
    }

    // Swing Speed = Ball Speed ÷ Smash Factor
    const swingSpeed = ballSpeed / smash

    // Estimate distance based on ball speed (simplified model)
    const estimatedDistance = calculateEstimatedDistance(ballSpeed, currentCalc.clubType)

    // Calculate efficiency vs optimal smash factor
    const optimalSmash = getOptimalSmashFactor(currentCalc.clubType)
    const efficiency = Math.min(100, (smash / optimalSmash) * 100)

    // Generate recommendation
    const recommendation = generateRecommendation(swingSpeed, smash, optimalSmash, currentCalc.clubType)

    setResults({
      swingSpeed: Math.round(swingSpeed * 10) / 10,
      estimatedDistance: Math.round(estimatedDistance),
      efficiency: Math.round(efficiency),
      recommendation
    })
  }, [currentCalc.ballSpeed, currentCalc.smashFactor, currentCalc.clubType])

  // Get typical smash factor for club type
  const getTypicalSmashFactor = (clubType: string): number => {
    const factors: { [key: string]: number } = {
      'Driver': 1.45,
      '3-Wood': 1.42,
      '5-Wood': 1.40,
      '3-Iron': 1.38,
      '5-Iron': 1.36,
      '7-Iron': 1.34,
      '9-Iron': 1.32,
      'Pitching Wedge': 1.30,
      'Sand Wedge': 1.28
    }
    return factors[clubType] || 1.40
  }

  // Get optimal smash factor for club type
  const getOptimalSmashFactor = (clubType: string): number => {
    const factors: { [key: string]: number } = {
      'Driver': 1.50,
      '3-Wood': 1.48,
      '5-Wood': 1.46,
      '3-Iron': 1.44,
      '5-Iron': 1.42,
      '7-Iron': 1.40,
      '9-Iron': 1.38,
      'Pitching Wedge': 1.36,
      'Sand Wedge': 1.34
    }
    return factors[clubType] || 1.45
  }

  // Calculate estimated distance from ball speed
  const calculateEstimatedDistance = (ballSpeed: number, clubType: string): number => {
    // Distance factors for different clubs (ball speed to total distance conversion)
    const distanceFactors: { [key: string]: number } = {
      'Driver': 2.4,
      '3-Wood': 2.2,
      '5-Wood': 2.0,
      '3-Iron': 1.8,
      '5-Iron': 1.6,
      '7-Iron': 1.4,
      '9-Iron': 1.2,
      'Pitching Wedge': 1.0,
      'Sand Wedge': 0.8
    }
    return ballSpeed * (distanceFactors[clubType] || 2.0)
  }

  // Generate recommendation based on swing speed and efficiency
  const generateRecommendation = (swingSpeed: number, smashFactor: number, optimalSmash: number, clubType: string): string => {
    const efficiency = (smashFactor / optimalSmash) * 100

    if (efficiency >= 95) {
      return "Excellent contact! Your smash factor is near optimal."
    } else if (efficiency >= 90) {
      return "Good contact. Small improvements could add distance."
    } else if (efficiency >= 85) {
      return "Room for improvement. Focus on center face contact."
    } else if (efficiency >= 80) {
      return "Significant improvement possible. Consider lessons or fitting."
    } else {
      return "Major gains possible with better contact quality."
    }
  }

  // Calculate whenever inputs change
  useEffect(() => {
    calculateSwingSpeed()
  }, [calculateSwingSpeed])

  const saveCalculation = () => {
    if (!currentCalc.ballSpeed || results.swingSpeed === 0) return

    const newCalc: SwingSpeedCalculation = {
      id: Date.now().toString(),
      ballSpeed: parseFloat(currentCalc.ballSpeed),
      smashFactor: parseFloat(currentCalc.smashFactor) || getTypicalSmashFactor(currentCalc.clubType),
      clubType: currentCalc.clubType,
      swingSpeed: results.swingSpeed,
      estimatedDistance: results.estimatedDistance,
      efficiency: results.efficiency
    }

    setCalculations(prev => [newCalc, ...prev])

    // Reset form
    setCurrentCalc({
      ballSpeed: '',
      smashFactor: '',
      clubType: 'Driver'
    })
    setResults({ swingSpeed: 0, estimatedDistance: 0, efficiency: 0, recommendation: '' })
  }

  const removeCalculation = (id: string) => {
    setCalculations(prev => prev.filter(calc => calc.id !== id))
  }

  const clearAllCalculations = () => {
    setCalculations([])
    localStorage.removeItem('swing-speed-calculations')
  }

  // Get swing speed benchmarks
  const getSwingSpeedCategory = (speed: number): string => {
    if (speed >= 115) return "Tour Professional"
    if (speed >= 105) return "Low Handicap"
    if (speed >= 95) return "Mid Handicap"
    if (speed >= 85) return "High Handicap"
    if (speed >= 75) return "Senior/Beginner"
    return "Beginner"
  }

  const clubTypes = ['Driver', '3-Wood', '5-Wood', '3-Iron', '5-Iron', '7-Iron', '9-Iron', 'Pitching Wedge', 'Sand Wedge']

  return (
    <div className="min-h-screen bg-white ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumbs */}
          <nav className="text-sm text-slate-600 mb-4">
            <ol className="flex space-x-2">
              <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
              <li className="before:content-['/'] before:mx-2 text-slate-900">Swing Speed Calculator</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-100 rounded-xl">
                <RotateCcw className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-2">
                  Golf Swing Speed Calculator
                </h1>
                <p className="text-slate-600 text-lg">
                  Calculate your swing speed from ball speed and smash factor measurements.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Professional Swing Speed Calculator - Free & Accurate
              </h2>
              <p className="text-slate-700 mb-3">
                Calculate your clubhead swing speed from ball speed data. Perfect for determining your swing speed category,
                equipment fitting, and tracking improvement. Works with launch monitor data or estimates.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Reverse Engineering from Ball Speed
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Swing Speed Categories
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Equipment Recommendations
                </div>
              </div>
            </div>

            {/* Current Results Display */}
            {results.swingSpeed > 0 && (
              <div className="mt-6">
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="text-center">
                      <h3 className="text-sm font-semibold mb-1 text-slate-900">Swing Speed</h3>
                      <div className="text-2xl font-black text-emerald-600">{results.swingSpeed}</div>
                      <div className="text-xs text-slate-900">mph</div>
                    </div>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="text-center">
                      <h3 className="text-sm font-semibold mb-1 text-slate-900">Category</h3>
                      <div className="text-lg font-black text-slate-900">{getSwingSpeedCategory(results.swingSpeed)}</div>
                      <div className="text-xs text-slate-900">player level</div>
                    </div>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="text-center">
                      <h3 className="text-sm font-semibold mb-1 text-slate-900">Est. Distance</h3>
                      <div className="text-2xl font-black text-emerald-600">{results.estimatedDistance}</div>
                      <div className="text-xs text-slate-900">yards</div>
                    </div>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="text-center">
                      <h3 className="text-sm font-semibold mb-1 text-slate-900">Efficiency</h3>
                      <div className="text-2xl font-black text-emerald-600">{results.efficiency}%</div>
                      <div className="text-xs text-slate-900">contact quality</div>
                    </div>
                  </div>
                </div>
                {results.recommendation && (
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <h3 className="text-sm font-semibold mb-1 text-slate-900">Recommendation</h3>
                    <p className="text-sm text-slate-700">{results.recommendation}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Calculate Swing Speed
                </CardTitle>
                <CardDescription>
                  Enter ball speed and smash factor to calculate your swing speed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">

                <div>
                  <Label htmlFor="clubType">Club Type *</Label>
                  <select
                    id="clubType"
                    value={currentCalc.clubType}
                    onChange={(e) => setCurrentCalc(prev => ({ ...prev, clubType: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    {clubTypes.map(club => (
                      <option key={club} value={club}>{club}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="ballSpeed">Ball Speed (mph) *</Label>
                  <Input
                    id="ballSpeed"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 150.5"
                    value={currentCalc.ballSpeed}
                    onChange={(e) => setCurrentCalc(prev => ({ ...prev, ballSpeed: e.target.value }))}
                    required
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    From launch monitor or ball speed radar
                  </p>
                </div>

                <div>
                  <Label htmlFor="smashFactor">Smash Factor</Label>
                  <Input
                    id="smashFactor"
                    type="number"
                    step="0.01"
                    placeholder={`Default: ${getTypicalSmashFactor(currentCalc.clubType)}`}
                    value={currentCalc.smashFactor}
                    onChange={(e) => setCurrentCalc(prev => ({ ...prev, smashFactor: e.target.value }))}
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Ball speed ÷ swing speed (leave blank for typical value)
                  </p>
                </div>

                <Button
                  onClick={saveCalculation}
                  className="w-full text-white hover:opacity-90 bg-emerald-600"
                  disabled={!currentCalc.ballSpeed || results.swingSpeed === 0}
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
                      Your recent swing speed calculations ({calculations.length} entries)
                    </CardDescription>
                  </div>
                  {calculations.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllCalculations}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {calculations.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">
                    <RotateCcw className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No calculations saved yet.</p>
                    <p className="text-sm">Calculate your first swing speed above.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {calculations.map((calc) => (
                      <div key={calc.id} className="flex items-center justify-between p-3 rounded-lg bg-emerald-100 rounded-xl">
                        <div className="flex-1">
                          <div className="font-medium text-sm text-slate-900">
                            {calc.clubType}
                          </div>
                          <div className="text-xs text-slate-900">
                            Ball: {calc.ballSpeed}mph • Smash: {calc.smashFactor}
                          </div>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs px-2 py-1 rounded text-white bg-emerald-600">
                              Swing: {calc.swingSpeed}mph
                            </span>
                            <span className="text-xs px-2 py-1 rounded text-white bg-emerald-600">
                              {getSwingSpeedCategory(calc.swingSpeed)}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCalculation(calc.id)}
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
                How Swing Speed Calculation Works
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Complete Guide to Golf Swing Speed Analysis
                </h3>
                <p className="text-slate-700 mb-4">
                  Swing speed is a fundamental measurement in golf that determines how fast your clubhead is moving at impact.
                  Our calculator reverse-engineers your swing speed from ball speed measurements, providing valuable insights
                  for equipment fitting and performance analysis.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Key Calculations:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Swing Speed</strong> = Ball Speed ÷ Smash Factor</li>
                    <li>• <strong>Smash Factor</strong> = Ball Speed ÷ Swing Speed</li>
                    <li>• <strong>Distance</strong> = Ball Speed × Distance Factor</li>
                    <li>• <strong>Efficiency</strong> = (Actual Smash ÷ Optimal Smash) × 100</li>
                    <li>• <strong>Category</strong> based on swing speed ranges</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Swing Speed Categories:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Tour Pro:</strong> 115+ mph</li>
                    <li>• <strong>Low Handicap:</strong> 105-114 mph</li>
                    <li>• <strong>Mid Handicap:</strong> 95-104 mph</li>
                    <li>• <strong>High Handicap:</strong> 85-94 mph</li>
                    <li>• <strong>Senior/Beginner:</strong> 75-84 mph</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Equipment Recommendations:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>115+ mph:</strong> X-Stiff shaft, tour balls</p>
                    <p><strong>105-114 mph:</strong> Stiff shaft, mid-compression balls</p>
                    <p><strong>95-104 mph:</strong> Regular shaft, standard balls</p>
                    <p><strong>85-94 mph:</strong> Senior/Regular shaft, soft balls</p>
                    <p><strong>75-84 mph:</strong> Senior shaft, low compression</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Distance Expectations (Driver):</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>115 mph:</strong> 280+ yards</p>
                    <p><strong>105 mph:</strong> 250-280 yards</p>
                    <p><strong>95 mph:</strong> 220-250 yards</p>
                    <p><strong>85 mph:</strong> 190-220 yards</p>
                    <p><strong>75 mph:</strong> 160-190 yards</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-slate-900 mb-3">Why Use Our Swing Speed Calculator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Reverse Engineering:</strong> Calculate from ball speed data
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Equipment Fitting:</strong> Find the right shaft and ball
                    </p>
                    <p className="text-slate-700">
                      <strong>✓ Performance Tracking:</strong> Monitor speed improvements
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Player Categories:</strong> Compare to handicap levels
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Contact Quality:</strong> Analyze smash factor efficiency
                    </p>
                    <p className="text-slate-700">
                      <strong>✓ Free Tool:</strong> No registration required
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-slate-700">
                  <strong>Note:</strong> This calculator provides estimates based on typical smash factors and distance models.
                  For the most accurate swing speed measurement, use a certified launch monitor. Consult a professional
                  for equipment fitting and swing analysis.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}