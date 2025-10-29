'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Target, Zap } from 'lucide-react'

interface RangeBallCalculation {
  id: string
  sessionName: string
  club: string
  rangeBallDistance: number
  ballType: string
  estimatedOnCourseDistance: number
  distanceLoss: number
  qualityFactor: number
  altitudeAdjustment: number
  temperatureAdjustment: number
  createdAt: string
}

export default function RangeBallDistanceCalculator() {
  const [calculations, setCalculations] = useState<RangeBallCalculation[]>([])
  const [currentCalc, setCurrentCalc] = useState({
    sessionName: '',
    club: 'Driver',
    rangeBallDistance: '',
    ballType: 'Range Ball (Standard)',
    altitude: '0',
    temperature: '70'
  })

  useEffect(() => {
    const savedCalculations = localStorage.getItem('range-ball-calculations')
    if (savedCalculations) {
      setCalculations(JSON.parse(savedCalculations))
    }
  }, [])

  useEffect(() => {
    if (calculations.length > 0) {
      localStorage.setItem('range-ball-calculations', JSON.stringify(calculations))
    }
  }, [calculations])

  const getBallTypeFactor = (ballType: string) => {
    const factors = {
      'Range Ball (Standard)': 0.85,      // 15% distance loss
      'Range Ball (Premium)': 0.90,       // 10% distance loss
      'Range Ball (Striped)': 0.82,       // 18% distance loss
      'Range Ball (Limited Flight)': 0.75, // 25% distance loss
      'Practice Ball (2-piece)': 0.88,     // 12% distance loss
      'Premium Golf Ball': 1.00            // No loss (reference)
    }
    return factors[ballType as keyof typeof factors] || 0.85
  }

  const getQualityDescription = (factor: number) => {
    if (factor >= 0.95) return 'Excellent (Premium balls)'
    if (factor >= 0.90) return 'Good (Premium range balls)'
    if (factor >= 0.85) return 'Average (Standard range balls)'
    if (factor >= 0.80) return 'Below Average (Striped/worn balls)'
    return 'Poor (Limited flight balls)'
  }

  const calculateOnCourseDistance = () => {
    const rangeDist = parseFloat(currentCalc.rangeBallDistance)
    const altitude = parseFloat(currentCalc.altitude)
    const temperature = parseFloat(currentCalc.temperature)

    if (!rangeDist) return

    // Get ball type factor
    const ballFactor = getBallTypeFactor(currentCalc.ballType)

    // Calculate base on-course distance (compensate for ball quality)
    const baseOnCourseDistance = rangeDist / ballFactor

    // Altitude adjustment (approximately 2% per 1000 feet)
    const altitudeAdjustment = (altitude / 1000) * baseOnCourseDistance * 0.02

    // Temperature adjustment (1 yard per 10°F from 70°F for 150-yard shot baseline)
    const tempDifference = temperature - 70
    const temperatureAdjustment = (tempDifference / 10) * (baseOnCourseDistance / 150)

    // Final on-course distance
    const estimatedOnCourseDistance = Math.round(baseOnCourseDistance + altitudeAdjustment + temperatureAdjustment)

    const distanceLoss = Math.round(baseOnCourseDistance - rangeDist)

    const newCalculation: RangeBallCalculation = {
      id: Date.now().toString(),
      sessionName: currentCalc.sessionName || `${currentCalc.club} Practice`,
      club: currentCalc.club,
      rangeBallDistance: rangeDist,
      ballType: currentCalc.ballType,
      estimatedOnCourseDistance,
      distanceLoss,
      qualityFactor: ballFactor,
      altitudeAdjustment: Math.round(altitudeAdjustment),
      temperatureAdjustment: Math.round(temperatureAdjustment),
      createdAt: new Date().toLocaleDateString()
    }

    setCalculations(prev => [newCalculation, ...prev.slice(0, 19)])

    // Clear form
    setCurrentCalc({
      sessionName: '',
      club: 'Driver',
      rangeBallDistance: '',
      ballType: 'Range Ball (Standard)',
      altitude: '0',
      temperature: '70'
    })
  }

  const removeCalculation = (id: string) => {
    setCalculations(prev => prev.filter(calc => calc.id !== id))
  }

  const clearAllCalculations = () => {
    setCalculations([])
    localStorage.removeItem('range-ball-calculations')
  }

  const getPerformanceColor = (distanceLoss: number) => {
    if (distanceLoss <= 10) return 'text-green-600'
    if (distanceLoss <= 20) return 'text-yellow-600'
    if (distanceLoss <= 30) return 'text-orange-600'
    return 'text-red-600'
  }

  const getClubIcon = (club: string) => {
    if (club.includes('Driver')) return '🏌️'
    if (club.includes('Wood')) return '🌲'
    if (club.includes('Hybrid')) return '⚡'
    if (club.includes('Iron')) return '🔧'
    if (club.includes('Wedge')) return '📐'
    return '🏌️'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-4">
            <ol className="flex space-x-2">
              <li><Link href="/" className="hover:text-green-600">Home</Link></li>
              <li className="before:content-['/'] before:mx-2 text-gray-900">Range Ball Distance Calculator</li>
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
                  Range Ball Distance Calculator
                </h1>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  Convert your driving range distances to accurate on-course yardages by accounting for ball quality differences.
                </p>
              </div>
            </div>

            <div className="mt-6 p-6 rounded-lg border-2" style={{backgroundColor: '#9CC69B', borderColor: '#183a37'}}>
              <h2 className="text-xl font-semibold mb-3" style={{color: '#183a37'}}>
                Practice Range Calibration - Free Golf Distance Tool
              </h2>
              <p className="mb-3" style={{color: '#183a37'}}>
                Bridge the gap between range practice and course performance. Range balls typically fly 10-25% shorter
                than premium golf balls. Know your true distances for better club selection and course management.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm" style={{color: '#183a37'}}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#183a37'}}></span>
                  Ball Quality Analysis
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#183a37'}}></span>
                  Distance Conversion
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#183a37'}}></span>
                  Environmental Factors
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
                  Distance Converter
                </CardTitle>
                <CardDescription>
                  Convert range ball distances to on-course equivalents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sessionName">Practice Session</Label>
                  <Input
                    id="sessionName"
                    type="text"
                    placeholder="e.g. Tuesday range session"
                    value={currentCalc.sessionName}
                    onChange={(e) => setCurrentCalc(prev => ({...prev, sessionName: e.target.value}))}
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Shot Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="club">Club Used</Label>
                      <select
                        id="club"
                        value={currentCalc.club}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, club: e.target.value}))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Driver">Driver</option>
                        <option value="3-Wood">3-Wood</option>
                        <option value="5-Wood">5-Wood</option>
                        <option value="3-Hybrid">3-Hybrid</option>
                        <option value="4-Hybrid">4-Hybrid</option>
                        <option value="5-Hybrid">5-Hybrid</option>
                        <option value="4-Iron">4-Iron</option>
                        <option value="5-Iron">5-Iron</option>
                        <option value="6-Iron">6-Iron</option>
                        <option value="7-Iron">7-Iron</option>
                        <option value="8-Iron">8-Iron</option>
                        <option value="9-Iron">9-Iron</option>
                        <option value="PW">Pitching Wedge</option>
                        <option value="GW">Gap Wedge</option>
                        <option value="SW">Sand Wedge</option>
                        <option value="LW">Lob Wedge</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="rangeBallDistance">Range Distance (yards) *</Label>
                      <Input
                        id="rangeBallDistance"
                        type="number"
                        step="1"
                        placeholder="e.g. 240"
                        value={currentCalc.rangeBallDistance}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, rangeBallDistance: e.target.value}))}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Ball & Conditions</h4>
                  <div>
                    <Label htmlFor="ballType">Range Ball Type</Label>
                    <select
                      id="ballType"
                      value={currentCalc.ballType}
                      onChange={(e) => setCurrentCalc(prev => ({...prev, ballType: e.target.value}))}
                      className="w-full p-2 border rounded-md mb-3"
                    >
                      <option value="Range Ball (Standard)">Range Ball (Standard) - ~15% shorter</option>
                      <option value="Range Ball (Premium)">Range Ball (Premium) - ~10% shorter</option>
                      <option value="Range Ball (Striped)">Range Ball (Striped/Worn) - ~18% shorter</option>
                      <option value="Range Ball (Limited Flight)">Limited Flight Ball - ~25% shorter</option>
                      <option value="Practice Ball (2-piece)">Practice Ball (2-piece) - ~12% shorter</option>
                      <option value="Premium Golf Ball">Premium Golf Ball (Reference)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="altitude">Altitude (feet)</Label>
                      <Input
                        id="altitude"
                        type="number"
                        step="100"
                        placeholder="e.g. 1000"
                        value={currentCalc.altitude}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, altitude: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="temperature">Temperature (°F)</Label>
                      <Input
                        id="temperature"
                        type="number"
                        step="1"
                        placeholder="e.g. 85"
                        value={currentCalc.temperature}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, temperature: e.target.value}))}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={calculateOnCourseDistance}
                  className="w-full text-white hover:opacity-90"
                  style={{backgroundColor: '#183a37'}}
                  disabled={!currentCalc.rangeBallDistance}
                >
                  Calculate On-Course Distance
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
                      Distance Conversions
                    </CardTitle>
                    <CardDescription>
                      Your range-to-course calculations ({calculations.length} sessions)
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
                    <p>No distance calculations yet.</p>
                    <p className="text-sm">Convert your first range distance above.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {calculations.map((calculation) => (
                      <div key={calculation.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                              {getClubIcon(calculation.club)} {calculation.sessionName}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {calculation.createdAt} • {calculation.club}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCalculation(calculation.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Range Distance:</p>
                            <p className="font-medium">{calculation.rangeBallDistance} yards</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">On-Course Estimate:</p>
                            <p className="font-bold text-lg text-green-600">{calculation.estimatedOnCourseDistance} yards</p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs text-gray-600 dark:text-gray-400">Ball Quality:</p>
                          <p className="text-sm">{getQualityDescription(calculation.qualityFactor)}</p>
                        </div>

                        <div className="text-xs space-y-1 pt-2 border-t">
                          <div className="flex justify-between">
                            <span>Distance Loss (ball quality):</span>
                            <span className={getPerformanceColor(calculation.distanceLoss)}>
                              +{calculation.distanceLoss} yards
                            </span>
                          </div>
                          {calculation.altitudeAdjustment !== 0 && (
                            <div className="flex justify-between">
                              <span>Altitude adjustment:</span>
                              <span className={calculation.altitudeAdjustment > 0 ? 'text-green-600' : 'text-red-600'}>
                                {calculation.altitudeAdjustment > 0 ? '+' : ''}{calculation.altitudeAdjustment} yards
                              </span>
                            </div>
                          )}
                          {calculation.temperatureAdjustment !== 0 && (
                            <div className="flex justify-between">
                              <span>Temperature adjustment:</span>
                              <span className={calculation.temperatureAdjustment > 0 ? 'text-green-600' : 'text-red-600'}>
                                {calculation.temperatureAdjustment > 0 ? '+' : ''}{calculation.temperatureAdjustment} yards
                              </span>
                            </div>
                          )}
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
                Understanding Range Ball Distance Differences
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-black">Complete Guide to Range Ball Performance</h3>
                <p className="text-black mb-4">
                  Range balls are designed differently than premium golf balls to reduce distance for safety and cost reasons.
                  Understanding these differences is crucial for accurate practice and proper club selection on the course.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-black">Range Ball Types & Distance Loss:</h4>
                  <ul className="text-sm space-y-2 text-black">
                    <li>• <strong>Limited Flight Balls:</strong> 20-30% shorter (safety ranges)</li>
                    <li>• <strong>Striped Range Balls:</strong> 15-20% shorter (worn/older balls)</li>
                    <li>• <strong>Standard Range Balls:</strong> 10-18% shorter (typical ranges)</li>
                    <li>• <strong>Premium Range Balls:</strong> 8-12% shorter (better facilities)</li>
                    <li>• <strong>Practice Balls (2-piece):</strong> 10-15% shorter (basic construction)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Why Range Balls Fly Shorter:</h4>
                  <ul className="text-sm space-y-2 text-black">
                    <li>• <strong>Construction:</strong> Harder, less responsive cores</li>
                    <li>• <strong>Dimple Pattern:</strong> Different aerodynamics for reduced flight</li>
                    <li>• <strong>Compression:</strong> Lower compression for durability</li>
                    <li>• <strong>Age/Wear:</strong> Repeated impacts reduce performance</li>
                    <li>• <strong>Safety Design:</strong> Intentionally limited flight characteristics</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-black">Distance Loss by Club:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Driver:</strong> 20-40 yard loss typical</p>
                    <p><strong>Fairway Woods:</strong> 15-30 yard loss</p>
                    <p><strong>Long Irons:</strong> 10-20 yard loss</p>
                    <p><strong>Mid Irons:</strong> 8-15 yard loss</p>
                    <p><strong>Short Irons:</strong> 5-12 yard loss</p>
                    <p><strong>Wedges:</strong> 3-8 yard loss</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Environmental Factors:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Altitude:</strong> +2% distance per 1000 feet</p>
                    <p><strong>Temperature:</strong> +1 yard per 10°F above 70°F</p>
                    <p><strong>Humidity:</strong> Slight distance reduction in high humidity</p>
                    <p><strong>Wind:</strong> Affects range balls more than premium balls</p>
                    <p><strong>Air Density:</strong> Hot, high altitude = more distance</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-black">Practice Tips:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Focus on Contact:</strong> Ball quality affects distance, not strike quality</p>
                    <p><strong>Swing Tempo:</strong> Maintain course swing speed on range</p>
                    <p><strong>Ball Position:</strong> Practice same setup as on course</p>
                    <p><strong>Mental Game:</strong> Visualize course distances, not range</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Club Selection Impact:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Underestimation:</strong> Range practice may lead to longer clubs on course</p>
                    <p><strong>Timing Issues:</strong> Different ball flight affects rhythm</p>
                    <p><strong>Confidence:</strong> Know your true distances for better decisions</p>
                    <p><strong>Yardage Books:</strong> Use actual course distances, not range estimates</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Conversion Guidelines:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Quick Rule:</strong> Add 15% to range distances</p>
                    <p><strong>Long Clubs:</strong> Add more (20-25% for driver)</p>
                    <p><strong>Short Clubs:</strong> Add less (5-10% for wedges)</p>
                    <p><strong>Track Performance:</strong> Note differences between facilities</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-3 text-black">Why Use Our Range Ball Distance Calculator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-black mb-2"><strong>✓ Accurate Conversion:</strong> Scientific ball quality analysis</p>
                    <p className="text-black mb-2"><strong>✓ Multiple Ball Types:</strong> Accounts for different range balls</p>
                    <p className="text-black"><strong>✓ Environmental Factors:</strong> Altitude and temperature adjustments</p>
                  </div>
                  <div>
                    <p className="text-black mb-2"><strong>✓ Club-Specific:</strong> Track all clubs in your bag</p>
                    <p className="text-black mb-2"><strong>✓ Practice Optimization:</strong> Better range session planning</p>
                    <p className="text-black"><strong>✓ Free Tool:</strong> No cost for distance conversions</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-black">
                  <strong>Important:</strong> Range ball performance varies significantly between facilities and ball conditions.
                  These calculations provide general estimates based on typical range ball characteristics. For most accurate
                  results, test your actual distances on the course and adjust calculations based on your experience.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}