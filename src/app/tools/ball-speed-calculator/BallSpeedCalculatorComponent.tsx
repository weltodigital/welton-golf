'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Zap, Target } from 'lucide-react'

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

export function BallSpeedCalculatorComponent() {
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

    if (!clubSpeed || clubSpeed <= 0) {
      setResults({ ballSpeed: 0, carryDistance: 0, totalDistance: 0, efficiency: 0 })
      return
    }

    // Ball speed = Clubhead speed × Smash factor
    const ballSpeed = clubSpeed * smash

    // Calculate carry distance using simplified physics model
    // Basic formula: Distance = (Ball Speed²) × sin(2 × Launch Angle) / 32.174 × (1 - Spin Factor)
    const launchRad = launch * (Math.PI / 180)
    const spinFactor = Math.max(0.1, (1 - (spin - 2000) / 10000)) // Simplified spin effect
    const carryDistance = Math.round((Math.pow(ballSpeed, 2) * Math.sin(2 * launchRad)) / 32.174 * spinFactor)

    // Total distance (carry + roll)
    const rollFactor = currentCalc.clubType === 'Driver' ? 1.15 : (currentCalc.clubType === '7 Iron' ? 1.05 : 1.1)
    const totalDistance = Math.round(carryDistance * rollFactor)

    // Efficiency (smash factor as percentage)
    const efficiency = Math.round(smash * 100)

    setResults({
      ballSpeed: Math.round(ballSpeed),
      carryDistance,
      totalDistance,
      efficiency
    })
  }, [currentCalc])

  // Get typical smash factor for club type
  const getTypicalSmashFactor = (clubType: string) => {
    switch (clubType) {
      case 'Driver': return 1.45
      case '3 Wood': return 1.42
      case '5 Wood': return 1.40
      case '3 Iron': return 1.38
      case '5 Iron': return 1.38
      case '7 Iron': return 1.35
      case '9 Iron': return 1.32
      case 'PW': return 1.25
      case 'SW': return 1.20
      default: return 1.40
    }
  }

  // Get typical launch angle for club type
  const getTypicalLaunchAngle = (clubType: string) => {
    switch (clubType) {
      case 'Driver': return 12
      case '3 Wood': return 10
      case '5 Wood': return 12
      case '3 Iron': return 8
      case '5 Iron': return 12
      case '7 Iron': return 16
      case '9 Iron': return 22
      case 'PW': return 26
      case 'SW': return 30
      default: return 15
    }
  }

  // Get typical spin rate for club type
  const getTypicalSpinRate = (clubType: string) => {
    switch (clubType) {
      case 'Driver': return 2500
      case '3 Wood': return 3000
      case '5 Wood': return 3500
      case '3 Iron': return 4000
      case '5 Iron': return 5000
      case '7 Iron': return 6500
      case '9 Iron': return 8000
      case 'PW': return 9500
      case 'SW': return 10000
      default: return 5000
    }
  }

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateBallSpeed()
  }, [calculateBallSpeed])

  const saveCalculation = () => {
    if (results.ballSpeed > 0) {
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
    }
  }

  const deleteCalculation = (id: string) => {
    setCalculations(prev => prev.filter(calc => calc.id !== id))
  }

  const clearAll = () => {
    setCalculations([])
    localStorage.removeItem('ball-speed-calculations')
  }

  const clubTypes = ['Driver', '3 Wood', '5 Wood', '3 Iron', '5 Iron', '7 Iron', '9 Iron', 'PW', 'SW']

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Ball Speed Calculator",
            "description": "Free golf ball speed calculator with carry distance estimation and smash factor analysis. Calculate optimal launch conditions.",
            "url": "https://www.weltongolf.com/tools/ball-speed-calculator",
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
              "Ball Speed Calculation",
              "Distance Estimation",
              "Smash Factor Analysis",
              "Launch Condition Optimization",
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
                  <Zap className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                    Free Golf Ball Speed Calculator
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Calculate ball speed, carry distance, and smash factor using physics-based models. Optimize your swing for maximum distance and efficiency.
                  </p>
                </div>
              </div>
            </div>

            {/* Calculator */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-emerald-600" />
                  Ball Speed & Distance Calculator
                </CardTitle>
                <CardDescription>
                  Enter your swing data to calculate ball speed, carry distance, and optimize your launch conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Input Section */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="club-type" className="text-sm font-medium">
                        Club Type
                      </Label>
                      <select
                        id="club-type"
                        value={currentCalc.clubType}
                        onChange={(e) => setCurrentCalc(prev => ({ ...prev, clubType: e.target.value }))}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        {clubTypes.map(club => (
                          <option key={club} value={club}>{club}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="clubhead-speed" className="text-sm font-medium">
                        Clubhead Speed (mph) *
                      </Label>
                      <Input
                        id="clubhead-speed"
                        type="number"
                        step="0.1"
                        value={currentCalc.clubheadSpeed}
                        onChange={(e) => setCurrentCalc(prev => ({ ...prev, clubheadSpeed: e.target.value }))}
                        placeholder="e.g., 105"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Required field</p>
                    </div>

                    <div>
                      <Label htmlFor="smash-factor" className="text-sm font-medium">
                        Smash Factor (optional)
                      </Label>
                      <Input
                        id="smash-factor"
                        type="number"
                        step="0.01"
                        value={currentCalc.smashFactor}
                        onChange={(e) => setCurrentCalc(prev => ({ ...prev, smashFactor: e.target.value }))}
                        placeholder={`Default: ${getTypicalSmashFactor(currentCalc.clubType)}`}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Ball speed ÷ clubhead speed</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="launch-angle" className="text-sm font-medium">
                          Launch Angle (°)
                        </Label>
                        <Input
                          id="launch-angle"
                          type="number"
                          step="0.1"
                          value={currentCalc.launchAngle}
                          onChange={(e) => setCurrentCalc(prev => ({ ...prev, launchAngle: e.target.value }))}
                          placeholder={`Default: ${getTypicalLaunchAngle(currentCalc.clubType)}°`}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="spin-rate" className="text-sm font-medium">
                          Spin Rate (rpm)
                        </Label>
                        <Input
                          id="spin-rate"
                          type="number"
                          value={currentCalc.spinRate}
                          onChange={(e) => setCurrentCalc(prev => ({ ...prev, spinRate: e.target.value }))}
                          placeholder={`Default: ${getTypicalSpinRate(currentCalc.clubType)}`}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Results Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Results</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                        <div className="text-2xl font-bold text-emerald-600">
                          {results.ballSpeed}
                        </div>
                        <div className="text-sm text-emerald-800">Ball Speed (mph)</div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600">
                          {results.efficiency}%
                        </div>
                        <div className="text-sm text-blue-800">Efficiency</div>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-2xl font-bold text-purple-600">
                          {results.carryDistance}
                        </div>
                        <div className="text-sm text-purple-800">Carry (yards)</div>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="text-2xl font-bold text-orange-600">
                          {results.totalDistance}
                        </div>
                        <div className="text-sm text-orange-800">Total (yards)</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={saveCalculation}
                        disabled={results.ballSpeed === 0}
                        className="flex-1"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Save Calculation
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-gray-600" />
                    <h4 className="font-medium text-gray-900">How It Works</h4>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Ball Speed:</strong> Calculated as clubhead speed × smash factor</p>
                    <p><strong>Distance:</strong> Estimated using launch angle, spin rate, and ball speed</p>
                    <p><strong>Efficiency:</strong> Your smash factor as a percentage (higher is better)</p>
                    <p><strong>Note:</strong> Distance calculations are estimates. Actual distances vary with conditions.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Saved Calculations */}
            {calculations.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <History className="h-5 w-5 text-emerald-600" />
                      <CardTitle>Saved Calculations</CardTitle>
                    </div>
                    <Button onClick={clearAll} variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {calculations.map((calc) => (
                      <div key={calc.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{calc.clubType}</span>
                          <Button
                            onClick={() => deleteCalculation(calc.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Club Speed:</span>
                            <div className="font-medium">{calc.clubheadSpeed} mph</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Ball Speed:</span>
                            <div className="font-medium">{calc.ballSpeed} mph</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Carry:</span>
                            <div className="font-medium">{calc.carryDistance} yds</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Total:</span>
                            <div className="font-medium">{calc.totalDistance} yds</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm mt-2 pt-2 border-t border-gray-100">
                          <div>
                            <span className="text-gray-600">Smash Factor:</span>
                            <div className="font-medium">{calc.smashFactor.toFixed(2)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Launch Angle:</span>
                            <div className="font-medium">{calc.launchAngle}°</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Spin Rate:</span>
                            <div className="font-medium">{calc.spinRate} rpm</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Educational Content */}
            <div className="mt-12 space-y-10">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Ball Speed: The Foundation of Distance</h2>
                <p className="text-gray-700 mb-6">
                  Ball speed is the primary driver of distance in golf. It's the velocity at which the golf ball leaves the clubface after impact, measured in miles per hour (mph). Understanding and optimizing ball speed is crucial for maximizing your driving distance and overall performance.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-blue-900">Ball Speed by Skill Level & Club</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-blue-200">
                          <th className="text-left p-2 text-blue-800">Player Level</th>
                          <th className="text-left p-2 text-blue-800">Driver Ball Speed</th>
                          <th className="text-left p-2 text-blue-800">7 Iron Ball Speed</th>
                          <th className="text-left p-2 text-blue-800">Typical Carry Distance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-blue-100">
                          <td className="p-2 font-medium">Tour Professional</td>
                          <td className="p-2">175-185 mph</td>
                          <td className="p-2">125-135 mph</td>
                          <td className="p-2">290-320 yards</td>
                        </tr>
                        <tr className="border-b border-blue-100">
                          <td className="p-2 font-medium">Scratch Golfer</td>
                          <td className="p-2">165-175 mph</td>
                          <td className="p-2">115-125 mph</td>
                          <td className="p-2">270-290 yards</td>
                        </tr>
                        <tr className="border-b border-blue-100">
                          <td className="p-2 font-medium">Single Digit Handicap</td>
                          <td className="p-2">155-165 mph</td>
                          <td className="p-2">105-115 mph</td>
                          <td className="p-2">245-270 yards</td>
                        </tr>
                        <tr className="border-b border-blue-100">
                          <td className="p-2 font-medium">Mid Handicap (10-20)</td>
                          <td className="p-2">140-155 mph</td>
                          <td className="p-2">95-105 mph</td>
                          <td className="p-2">210-245 yards</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">High Handicap (20+)</td>
                          <td className="p-2">&lt;140 mph</td>
                          <td className="p-2">&lt;95 mph</td>
                          <td className="p-2">&lt;210 yards</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Science of Smash Factor: Measuring Impact Efficiency</h2>
                <p className="text-gray-700 mb-6">
                  Smash factor is the ratio of ball speed to clubhead speed, measuring how efficiently you transfer energy from the club to the ball. A higher smash factor indicates better impact quality and more distance per unit of swing speed.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Optimal Smash Factors by Club</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Driver:</span>
                        <span className="font-medium">1.45-1.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>3 Wood:</span>
                        <span className="font-medium">1.42-1.45</span>
                      </div>
                      <div className="flex justify-between">
                        <span>7 Iron:</span>
                        <span className="font-medium">1.35-1.40</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wedges:</span>
                        <span className="font-medium">1.15-1.25</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Improving Your Smash Factor</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>• Center face contact consistently</p>
                      <p>• Proper angle of attack (slightly up with driver)</p>
                      <p>• Optimal launch conditions</p>
                      <p>• Quality equipment fitting</p>
                      <p>• Regular practice with feedback</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Launch Conditions: Optimizing Flight for Distance</h2>
                <p className="text-gray-700 mb-6">
                  Beyond ball speed, launch angle and spin rate significantly impact carry distance and total distance. Understanding optimal launch conditions helps you achieve maximum distance with your current swing speed.
                </p>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-green-900">Driver Optimization Guidelines</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-green-800 mb-2">Swing Speed &lt;90 mph</h4>
                      <p>Launch Angle: 14-17°</p>
                      <p>Spin Rate: 2800-3200 rpm</p>
                      <p>Focus: Higher launch, lower spin</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 mb-2">Swing Speed 90-105 mph</h4>
                      <p>Launch Angle: 12-15°</p>
                      <p>Spin Rate: 2400-2800 rpm</p>
                      <p>Focus: Balanced launch conditions</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 mb-2">Swing Speed &gt;105 mph</h4>
                      <p>Launch Angle: 10-13°</p>
                      <p>Spin Rate: 2000-2400 rpm</p>
                      <p>Focus: Lower launch, minimal spin</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Practical Tips for Increasing Ball Speed</h2>
                <p className="text-gray-700 mb-6">
                  While technique improvements take time, there are several practical strategies you can implement immediately to increase your ball speed and optimize your equipment for maximum performance.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Equipment Optimization</h4>
                    <div className="space-y-3 text-gray-700">
                      <div>
                        <p className="mb-2"><strong>1. Driver Fitting:</strong> Find optimal loft, shaft, and head combination</p>
                        <p className="mb-2"><strong>2. Fresh Grooves:</strong> Clean clubs perform better at impact</p>
                      </div>
                      <div>
                        <p className="mb-2"><strong>3. Control Spin:</strong> Work with a fitter to find optimal shaft and clubhead</p>
                        <p><strong>4. Track Progress:</strong> Use launch monitor data to measure improvements</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Technique Focus Areas</h4>
                    <div className="space-y-3 text-gray-700">
                      <div>
                        <p className="mb-2"><strong>1. Impact Position:</strong> Square clubface at impact</p>
                        <p className="mb-2"><strong>2. Center Contact:</strong> Hit the sweet spot consistently</p>
                      </div>
                      <div>
                        <p className="mb-2"><strong>3. Sequence:</strong> Proper kinetic chain from ground up</p>
                        <p><strong>4. Speed Training:</strong> Use overspeed training aids safely</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Related Tools */}
            <div className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-emerald-600" />
                    Related Golf Calculators
                  </CardTitle>
                  <CardDescription>
                    Explore our other golf calculators to optimize your equipment and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                      href="/tools/swing-speed-calculator"
                      className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                    >
                      <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 mb-2">Swing Speed Calculator</h3>
                      <p className="text-sm text-gray-600">Calculate and track your clubhead speed across different clubs</p>
                    </Link>

                    <Link
                      href="/tools/club-distance-calculator"
                      className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                    >
                      <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 mb-2">Club Distance Calculator</h3>
                      <p className="text-sm text-gray-600">Determine your distance gaps and optimal club selection</p>
                    </Link>

                    <Link
                      href="/tools/shaft-flex-calculator"
                      className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                    >
                      <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 mb-2">Shaft Flex Calculator</h3>
                      <p className="text-sm text-gray-600">Find the right shaft flex based on your swing characteristics</p>
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
                      <Link href="/tools/handicap-calculator" className="text-sm px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200">
                        Handicap Calculator
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