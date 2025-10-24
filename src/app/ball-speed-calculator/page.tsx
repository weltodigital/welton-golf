'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Zap } from 'lucide-react'

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

export default function BallSpeedCalculator() {
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
  const calculateBallSpeed = () => {
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
  }

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
  }, [currentCalc.clubheadSpeed, currentCalc.smashFactor, currentCalc.launchAngle, currentCalc.spinRate, currentCalc.clubType, calculateBallSpeed])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-600 mb-4">
            <ol className="flex space-x-2">
              <li><Link href="/" className="hover:text-green-600">Home</Link></li>
              <li className="before:content-['/'] before:mx-2 text-gray-900">Ball Speed Calculator</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#9CC69B'}}>
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Golf Ball Speed Calculator
                </h1>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  Calculate ball speed, carry distance, and total distance based on clubhead speed and launch conditions.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className="mt-6 p-6 rounded-lg border-2" style={{backgroundColor: '#9CC69B', borderColor: '#183a37'}}>
              <h2 className="text-xl font-semibold mb-3" style={{color: '#183a37'}}>
                Professional Ball Speed Calculator - Free & Accurate
              </h2>
              <p className="mb-3" style={{color: '#183a37'}}>
                Our ball speed calculator uses advanced physics models to calculate ball speed, carry distance, and total distance
                based on your clubhead speed, smash factor, launch angle, and spin rate. Perfect for club fitting and swing analysis.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm" style={{color: '#183a37'}}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#183a37'}}></span>
                  Physics-Based Calculations
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#183a37'}}></span>
                  Multiple Club Types
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#183a37'}}></span>
                  Smash Factor Analysis
                </div>
              </div>
            </div>

            {/* Current Results Display */}
            {results.ballSpeed > 0 && (
              <div className="mt-6 grid md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg border-2" style={{backgroundColor: '#9CC69B', borderColor: '#183a37'}}>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold mb-1" style={{color: '#183a37'}}>Ball Speed</h3>
                    <div className="text-2xl font-bold" style={{color: '#183a37'}}>{results.ballSpeed}</div>
                    <div className="text-xs" style={{color: '#183a37'}}>mph</div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border-2" style={{backgroundColor: '#9CC69B', borderColor: '#183a37'}}>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold mb-1" style={{color: '#183a37'}}>Carry Distance</h3>
                    <div className="text-2xl font-bold" style={{color: '#183a37'}}>{results.carryDistance}</div>
                    <div className="text-xs" style={{color: '#183a37'}}>yards</div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border-2" style={{backgroundColor: '#9CC69B', borderColor: '#183a37'}}>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold mb-1" style={{color: '#183a37'}}>Total Distance</h3>
                    <div className="text-2xl font-bold" style={{color: '#183a37'}}>{results.totalDistance}</div>
                    <div className="text-xs" style={{color: '#183a37'}}>yards</div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border-2" style={{backgroundColor: '#9CC69B', borderColor: '#183a37'}}>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold mb-1" style={{color: '#183a37'}}>Efficiency</h3>
                    <div className="text-2xl font-bold" style={{color: '#183a37'}}>{results.efficiency}%</div>
                    <div className="text-xs" style={{color: '#183a37'}}>smash factor</div>
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
                  className="w-full text-white hover:opacity-90"
                  style={{backgroundColor: '#183a37'}}
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
                  <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                    <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No calculations saved yet.</p>
                    <p className="text-sm">Calculate your first ball speed above.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {calculations.map((calc) => (
                      <div key={calc.id} className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: '#9CC69B'}}>
                        <div className="flex-1">
                          <div className="font-medium text-sm" style={{color: '#183a37'}}>
                            {calc.clubType}
                          </div>
                          <div className="text-xs" style={{color: '#183a37'}}>
                            Clubhead: {calc.clubheadSpeed}mph • Smash: {calc.smashFactor}
                          </div>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs px-2 py-1 rounded text-white" style={{backgroundColor: '#183a37'}}>
                              Ball: {calc.ballSpeed}mph
                            </span>
                            <span className="text-xs px-2 py-1 rounded text-white" style={{backgroundColor: '#183a37'}}>
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

          {/* Information Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                How Ball Speed Calculation Works
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-black">
                  Complete Guide to Golf Ball Speed and Distance Calculation
                </h3>
                <p className="text-black mb-4">
                  Ball speed is one of the most important factors in determining golf shot distance. Our calculator uses physics-based
                  models to estimate ball speed, carry distance, and total distance based on your swing characteristics and launch conditions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-black">Key Calculations:</h4>
                  <ul className="text-sm space-y-2 text-black">
                    <li>• <strong>Ball Speed</strong> = Clubhead Speed × Smash Factor</li>
                    <li>• <strong>Smash Factor</strong> = Ball Speed ÷ Clubhead Speed</li>
                    <li>• <strong>Optimal Smash Factor:</strong> 1.50 for driver, lower for irons</li>
                    <li>• <strong>Distance</strong> depends on ball speed, launch angle, and spin</li>
                    <li>• <strong>Efficiency</strong> shows how close to optimal your smash factor is</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Factors Affecting Distance:</h4>
                  <ul className="text-sm space-y-2 text-black">
                    <li>• <strong>Ball Speed:</strong> Higher speed = more distance</li>
                    <li>• <strong>Launch Angle:</strong> Optimal angle varies by club</li>
                    <li>• <strong>Spin Rate:</strong> Too much spin reduces distance</li>
                    <li>• <strong>Attack Angle:</strong> Affects launch and spin</li>
                    <li>• <strong>Conditions:</strong> Wind, temperature, altitude</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-black">Typical Smash Factors:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Driver:</strong> 1.40-1.50 (Optimal: 1.50)</p>
                    <p><strong>3-Wood:</strong> 1.38-1.48</p>
                    <p><strong>5-Iron:</strong> 1.32-1.42</p>
                    <p><strong>7-Iron:</strong> 1.30-1.40</p>
                    <p><strong>Wedges:</strong> 1.25-1.35</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Performance Benchmarks:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Tour Average (Driver):</strong> 167 mph ball speed</p>
                    <p><strong>Scratch Golfer:</strong> 155 mph ball speed</p>
                    <p><strong>15 Handicap:</strong> 140 mph ball speed</p>
                    <p><strong>25 Handicap:</strong> 125 mph ball speed</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-3 text-black">Why Use Our Ball Speed Calculator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-black mb-2">
                      <strong>✓ Physics-Based Model:</strong> Accurate distance calculations
                    </p>
                    <p className="text-black mb-2">
                      <strong>✓ Multiple Clubs:</strong> Driver through wedges supported
                    </p>
                    <p className="text-black">
                      <strong>✓ Optimization Tool:</strong> Find your ideal launch conditions
                    </p>
                  </div>
                  <div>
                    <p className="text-black mb-2">
                      <strong>✓ Fitting Aid:</strong> Compare different equipment setups
                    </p>
                    <p className="text-black mb-2">
                      <strong>✓ Progress Tracking:</strong> Monitor improvements over time
                    </p>
                    <p className="text-black">
                      <strong>✓ Free Forever:</strong> No registration required
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-black">
                  <strong>Note:</strong> This calculator provides estimates based on typical conditions and physics models.
                  Actual distances may vary due to factors like course conditions, altitude, temperature, and individual
                  swing characteristics. For precise fitting, consult a certified club fitter with launch monitor data.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}