'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Zap, Target } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Golf Ball Speed Calculator 2026 - Distance & Smash Factor Calculator | Welton Golf',
  description: 'Calculate golf ball speed, carry distance, and smash factor with our free physics-based calculator. Optimize your swing speed and launch conditions for maximum distance.',
  keywords: 'ball speed calculator, golf ball speed, smash factor calculator, swing speed calculator, golf distance calculator, launch monitor calculator, carry distance, golf physics',
  openGraph: {
    title: 'Free Golf Ball Speed Calculator 2026 - Distance & Smash Factor Analysis',
    description: 'Calculate ball speed, carry distance, and smash factor using physics-based models. Optimize your swing for maximum distance and efficiency.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/ball-speed-calculator',
    images: [
      {
        url: 'https://www.weltongolf.com/ball-speed-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Golf Ball Speed Calculator - Distance Analysis',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/ball-speed-calculator',
  },
}

interface BallSpeedCalculation {
  id: string
  clubType: string
  clubheadSpeed: number
  smashFactor: number
  ballSpeed: number
  carryDistance: number
  totalDistance: number
  launchAngle: number
  spinRate: number
}

function BallSpeedCalculator() {
  const [calculations, setCalculations] = useState<BallSpeedCalculation[]>([])
  const [currentCalc, setCurrentCalc] = useState({
    clubType: 'Driver',
    clubheadSpeed: '',
    smashFactor: '',
    launchAngle: '',
    spinRate: ''
  })
  const [results, setResults] = useState({
    ballSpeed: 0,
    carryDistance: 0,
    totalDistance: 0,
    efficiency: 0
  })

  // Load calculations from localStorage
  useEffect(() => {
    const savedCalcs = localStorage.getItem('ball-speed-calculations')
    if (savedCalcs) {
      setCalculations(JSON.parse(savedCalcs))
    }
  }, [])

  // Save calculations to localStorage
  useEffect(() => {
    if (calculations.length > 0) {
      localStorage.setItem('ball-speed-calculations', JSON.stringify(calculations))
    }
  }, [calculations])

  // Calculate ball speed and distances
  const calculateBallSpeed = useCallback(() => {
    const clubSpeed = parseFloat(currentCalc.clubheadSpeed)
    const smash = parseFloat(currentCalc.smashFactor) || getTypicalSmashFactor(currentCalc.clubType)
    const launch = parseFloat(currentCalc.launchAngle) || getTypicalLaunchAngle(currentCalc.clubType)
    const spin = parseFloat(currentCalc.spinRate) || getTypicalSpinRate(currentCalc.clubType)

    if (!clubSpeed) {
      setResults({ ballSpeed: 0, carryDistance: 0, totalDistance: 0, efficiency: 0 })
      return
    }

    // Ball Speed = Clubhead Speed × Smash Factor
    const ballSpeed = clubSpeed * smash

    // Distance calculations (simplified physics model)
    // These are approximations based on typical golf ball flight data
    const carryDistance = calculateCarryDistance(ballSpeed, launch, spin)
    const rollDistance = calculateRollDistance(carryDistance, currentCalc.clubType)
    const totalDistance = carryDistance + rollDistance

    // Efficiency (how close to optimal smash factor)
    const optimalSmash = getOptimalSmashFactor(currentCalc.clubType)
    const efficiency = Math.min(100, (smash / optimalSmash) * 100)

    setResults({
      ballSpeed: Math.round(ballSpeed * 10) / 10,
      carryDistance: Math.round(carryDistance),
      totalDistance: Math.round(totalDistance),
      efficiency: Math.round(efficiency)
    })
  }, [currentCalc.clubheadSpeed, currentCalc.smashFactor, currentCalc.launchAngle, currentCalc.spinRate, currentCalc.clubType])

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

  // Get typical launch angle for club type
  const getTypicalLaunchAngle = (clubType: string): number => {
    const angles: { [key: string]: number } = {
      'Driver': 12,
      '3-Wood': 11,
      '5-Wood': 13,
      '3-Iron': 11,
      '5-Iron': 15,
      '7-Iron': 20,
      '9-Iron': 25,
      'Pitching Wedge': 30,
      'Sand Wedge': 35
    }
    return angles[clubType] || 15
  }

  // Get typical spin rate for club type
  const getTypicalSpinRate = (clubType: string): number => {
    const spins: { [key: string]: number } = {
      'Driver': 2500,
      '3-Wood': 3000,
      '5-Wood': 3500,
      '3-Iron': 4000,
      '5-Iron': 5000,
      '7-Iron': 6500,
      '9-Iron': 8000,
      'Pitching Wedge': 9500,
      'Sand Wedge': 11000
    }
    return spins[clubType] || 5000
  }

  // Calculate carry distance (simplified model)
  const calculateCarryDistance = (ballSpeed: number, launchAngle: number, spinRate: number): number => {
    // Simplified distance model based on ball speed, launch angle, and spin
    const baseDistance = ballSpeed * 2.5 // Base conversion factor
    const launchFactor = Math.sin(launchAngle * Math.PI / 180) * 1.2
    const spinFactor = Math.max(0.8, 1 - (spinRate - 2500) / 10000)

    return baseDistance * launchFactor * spinFactor
  }

  // Calculate roll distance
  const calculateRollDistance = (carryDistance: number, clubType: string): number => {
    const rollFactors: { [key: string]: number } = {
      'Driver': 0.25,
      '3-Wood': 0.20,
      '5-Wood': 0.15,
      '3-Iron': 0.15,
      '5-Iron': 0.10,
      '7-Iron': 0.08,
      '9-Iron': 0.05,
      'Pitching Wedge': 0.03,
      'Sand Wedge': 0.02
    }
    return carryDistance * (rollFactors[clubType] || 0.10)
  }

  // Calculate whenever inputs change
  useEffect(() => {
    calculateBallSpeed()
  }, [calculateBallSpeed])

  const saveCalculation = () => {
    if (!currentCalc.clubheadSpeed || results.ballSpeed === 0) return

    const newCalc: BallSpeedCalculation = {
      id: Date.now().toString(),
      clubType: currentCalc.clubType,
      clubheadSpeed: parseFloat(currentCalc.clubheadSpeed),
      smashFactor: parseFloat(currentCalc.smashFactor) || getTypicalSmashFactor(currentCalc.clubType),
      ballSpeed: results.ballSpeed,
      carryDistance: results.carryDistance,
      totalDistance: results.totalDistance,
      launchAngle: parseFloat(currentCalc.launchAngle) || getTypicalLaunchAngle(currentCalc.clubType),
      spinRate: parseFloat(currentCalc.spinRate) || getTypicalSpinRate(currentCalc.clubType)
    }

    setCalculations(prev => [newCalc, ...prev])

    // Reset form
    setCurrentCalc({
      clubType: 'Driver',
      clubheadSpeed: '',
      smashFactor: '',
      launchAngle: '',
      spinRate: ''
    })
    setResults({ ballSpeed: 0, carryDistance: 0, totalDistance: 0, efficiency: 0 })
  }

  const removeCalculation = (id: string) => {
    setCalculations(prev => prev.filter(calc => calc.id !== id))
  }

  const clearAllCalculations = () => {
    setCalculations([])
    localStorage.removeItem('ball-speed-calculations')
  }

  const clubTypes = ['Driver', '3-Wood', '5-Wood', '3-Iron', '5-Iron', '7-Iron', '9-Iron', 'Pitching Wedge', 'Sand Wedge']

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Ball Speed Calculator',
    applicationCategory: 'Sports Application',
    description: 'Calculate golf ball speed, carry distance, and smash factor using physics-based models for swing optimization.',
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
                <Zap className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                  Free Golf Ball Speed Calculator 2026
                </h1>
                <p className="text-gray-700 text-lg">
                  Calculate ball speed, carry distance, and total distance based on clubhead speed and launch conditions.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Professional Ball Speed Calculator - Free & Accurate
              </h2>
              <p className="text-gray-700 mb-3">
                Our ball speed calculator uses advanced physics models to calculate ball speed, carry distance, and total distance
                based on your clubhead speed, smash factor, launch angle, and spin rate. Perfect for club fitting and swing analysis.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Physics-Based Calculations
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Multiple Club Types
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Smash Factor Analysis
                </div>
              </div>
            </div>

            {/* Current Results Display */}
            {results.ballSpeed > 0 && (
              <div className="mt-6 grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Ball Speed</h3>
                    <div className="text-2xl font-black text-emerald-600">{results.ballSpeed}</div>
                    <div className="text-xs text-gray-700">mph</div>
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Carry Distance</h3>
                    <div className="text-2xl font-black text-emerald-600">{results.carryDistance}</div>
                    <div className="text-xs text-gray-700">yards</div>
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Total Distance</h3>
                    <div className="text-2xl font-black text-emerald-600">{results.totalDistance}</div>
                    <div className="text-xs text-gray-700">yards</div>
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Efficiency</h3>
                    <div className="text-2xl font-black text-emerald-600">{results.efficiency}%</div>
                    <div className="text-xs text-gray-700">smash factor</div>
                  </div>
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
                  Calculate Ball Speed
                </CardTitle>
                <CardDescription>
                  Enter your swing data to calculate ball speed and distances
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
                  <Label htmlFor="clubheadSpeed">Clubhead Speed (mph) *</Label>
                  <Input
                    id="clubheadSpeed"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 100.5"
                    value={currentCalc.clubheadSpeed}
                    onChange={(e) => setCurrentCalc(prev => ({ ...prev, clubheadSpeed: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                  </div>
                  <div>
                    <Label htmlFor="launchAngle">Launch Angle (°)</Label>
                    <Input
                      id="launchAngle"
                      type="number"
                      step="0.1"
                      placeholder={`Default: ${getTypicalLaunchAngle(currentCalc.clubType)}°`}
                      value={currentCalc.launchAngle}
                      onChange={(e) => setCurrentCalc(prev => ({ ...prev, launchAngle: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="spinRate">Spin Rate (rpm)</Label>
                  <Input
                    id="spinRate"
                    type="number"
                    placeholder={`Default: ${getTypicalSpinRate(currentCalc.clubType)} rpm`}
                    value={currentCalc.spinRate}
                    onChange={(e) => setCurrentCalc(prev => ({ ...prev, spinRate: e.target.value }))}
                  />
                </div>

                <Button
                  onClick={saveCalculation}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg border-0"
                  disabled={!currentCalc.clubheadSpeed || results.ballSpeed === 0}
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
                      Your recent ball speed calculations ({calculations.length} entries)
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
                    <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No calculations saved yet.</p>
                    <p className="text-sm">Calculate your first ball speed above.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {calculations.map((calc) => (
                      <div key={calc.id} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900">
                            {calc.clubType}
                          </div>
                          <div className="text-xs text-gray-700">
                            Clubhead: {calc.clubheadSpeed}mph • Smash: {calc.smashFactor}
                          </div>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-emerald-600 rounded text-white">
                              Ball: {calc.ballSpeed}mph
                            </span>
                            <span className="text-xs px-2 py-1 bg-emerald-600 rounded text-white">
                              Total: {calc.totalDistance}yds
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

          {/* Ball Speed Guide Section */}
          <div className="mt-12 space-y-12">
            {/* Ball Speed Fundamentals */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="h-6 w-6 text-emerald-600" />
                Understanding Golf Ball Speed and Its Impact
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Ball speed is the single most important factor in determining distance in golf. It's the velocity at which the golf ball
                leaves the clubface after impact. Unlike clubhead speed (which you control), ball speed depends on how efficiently
                energy transfers from club to ball - measured by smash factor.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">The Ball Speed Formula:</h3>
                  <div className="bg-emerald-50 p-4 rounded border mb-4">
                    <code className="text-emerald-900 font-mono">Ball Speed = Clubhead Speed × Smash Factor</code>
                  </div>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Clubhead Speed:</strong> How fast your club moves at impact</li>
                    <li>• <strong>Smash Factor:</strong> Efficiency of energy transfer (1.50 max for driver)</li>
                    <li>• <strong>Higher Ball Speed:</strong> Always equals more distance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Ball Speed Benchmarks:</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded border">
                      <p className="text-blue-900 font-medium">Tour Professional</p>
                      <p className="text-blue-800">165-180 mph ball speed</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded border">
                      <p className="text-green-900 font-medium">Scratch Golfer</p>
                      <p className="text-green-800">150-165 mph ball speed</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded border">
                      <p className="text-amber-900 font-medium">Average Golfer</p>
                      <p className="text-amber-800">125-145 mph ball speed</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Smash Factor Analysis */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-emerald-600" />
                Mastering Smash Factor for Maximum Distance
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Smash factor is your efficiency rating - how well you transfer energy from clubhead to ball. Perfect center face contact
                with optimal angle of attack produces the highest smash factors. Even small improvements in smash factor can add
                significant distance to your shots.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Optimal Smash Factors by Club:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Driver:</strong> 1.45-1.50</p>
                    <p><strong>3-Wood:</strong> 1.42-1.48</p>
                    <p><strong>Hybrid:</strong> 1.40-1.45</p>
                    <p><strong>7-Iron:</strong> 1.34-1.40</p>
                    <p><strong>Wedges:</strong> 1.25-1.35</p>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded border">
                    <p className="text-green-900 text-sm font-medium">Pro Tip:</p>
                    <p className="text-green-800 text-sm">Focus on center face contact rather than swing speed for better smash factor</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Factors Affecting Smash Factor:</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Contact Location:</strong> Center face is crucial</li>
                    <li>• <strong>Angle of Attack:</strong> Slightly upward for driver</li>
                    <li>• <strong>Club Face Angle:</strong> Square at impact</li>
                    <li>• <strong>Dynamic Loft:</strong> Optimal launch conditions</li>
                    <li>• <strong>Club Fitting:</strong> Proper shaft and lie angle</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Improving Your Smash Factor:</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Practice with impact tape for center contact</li>
                    <li>• Work on consistent tempo and rhythm</li>
                    <li>• Ensure proper weight transfer</li>
                    <li>• Get properly fitted for your equipment</li>
                    <li>• Focus on quality over quantity in practice</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Launch Conditions */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="h-6 w-6 text-emerald-600" />
                Optimizing Launch Conditions for Maximum Distance
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                While ball speed is king for distance, launch angle and spin rate determine how efficiently that speed translates
                to carry distance. The "window" for optimal launch conditions varies significantly between different clubs and
                swing speeds.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Launch Angle Guidelines:</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded border">
                      <p className="text-blue-900 font-medium">Driver (Ball Speed 150+ mph)</p>
                      <p className="text-blue-800">10-14° launch angle optimal</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded border">
                      <p className="text-green-900 font-medium">Driver (Ball Speed 130-150 mph)</p>
                      <p className="text-green-800">12-16° launch angle optimal</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded border">
                      <p className="text-amber-900 font-medium">Driver (Ball Speed <130 mph)</p>
                      <p className="text-amber-800">14-18° launch angle optimal</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mt-4">
                    <strong>Rule:</strong> Lower ball speeds need higher launch angles for optimal carry
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Spin Rate Targets:</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 rounded border">
                      <p className="text-emerald-900 font-medium">Driver Spin</p>
                      <p className="text-emerald-800">1,800-2,800 rpm ideal range</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded border">
                      <p className="text-blue-900 font-medium">Iron Spin (7-iron)</p>
                      <p className="text-blue-800">6,000-7,500 rpm typical</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded border">
                      <p className="text-purple-900 font-medium">Wedge Spin</p>
                      <p className="text-purple-800">8,000-12,000 rpm for control</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mt-4">
                    <strong>Note:</strong> Too much spin reduces distance; too little reduces accuracy
                  </p>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border">
                <h4 className="font-bold text-gray-900 mb-3">Distance Optimization Strategy:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p className="mb-2"><strong>1. Maximize Ball Speed:</strong> Focus on center face contact and proper technique</p>
                    <p className="mb-2"><strong>2. Optimize Launch:</strong> Use proper equipment and setup for your swing</p>
                  </div>
                  <div>
                    <p className="mb-2"><strong>3. Control Spin:</strong> Work with a fitter to find optimal shaft and clubhead</p>
                    <p><strong>4. Track Progress:</strong> Use launch monitor data to measure improvements</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default function BallSpeedCalculatorPage() {
  return <BallSpeedCalculator />
}