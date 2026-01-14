'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Mountain, TrendingUp } from 'lucide-react'

interface AltitudeCalculation {
  id: string
  locationName: string
  club: string
  seaLevelDistance: number
  currentAltitude: number
  adjustedDistance: number
  distanceGain: number
  altitudeEffect: number
  temperatureAdjustment: number
  humidityAdjustment: number
  airDensityFactor: number
  createdAt: string
}

export default function AltitudeDistanceCalculator() {
  const [calculations, setCalculations] = useState<AltitudeCalculation[]>([])
  const [currentCalc, setCurrentCalc] = useState({
    locationName: '',
    club: 'Driver',
    seaLevelDistance: '',
    currentAltitude: '',
    temperature: '70',
    humidity: '50'
  })

  useEffect(() => {
    const savedCalculations = localStorage.getItem('altitude-distance-calculations')
    if (savedCalculations) {
      setCalculations(JSON.parse(savedCalculations))
    }
  }, [])

  useEffect(() => {
    if (calculations.length > 0) {
      localStorage.setItem('altitude-distance-calculations', JSON.stringify(calculations))
    }
  }, [calculations])

  const calculateAltitudeEffect = () => {
    const seaLevelDist = parseFloat(currentCalc.seaLevelDistance)
    const altitude = parseFloat(currentCalc.currentAltitude)
    const temperature = parseFloat(currentCalc.temperature)
    const humidity = parseFloat(currentCalc.humidity)

    if (!seaLevelDist || !altitude) return

    // Base altitude effect: approximately 2% increase per 1000 feet
    const baseAltitudeEffect = (altitude / 1000) * 0.02

    // Temperature effect: warmer air is less dense
    // Standard temperature at sea level is 59°F (15°C)
    const standardTemp = 59
    const tempDifference = temperature - standardTemp
    const temperatureEffect = (tempDifference / 100) * 0.05 // 5% per 100°F difference

    // Humidity effect: humid air is less dense (counterintuitive but true)
    // Standard humidity is 50%
    const humidityDifference = humidity - 50
    const humidityEffect = (humidityDifference / 100) * 0.02 // 2% per 100% humidity difference

    // Combined air density factor
    const airDensityFactor = 1 + baseAltitudeEffect + temperatureEffect + humidityEffect

    // Calculate adjusted distance
    const adjustedDistance = Math.round(seaLevelDist * airDensityFactor)
    const distanceGain = adjustedDistance - seaLevelDist

    // Individual effect calculations for display
    const altitudeAdjustment = Math.round(seaLevelDist * baseAltitudeEffect)
    const temperatureAdjustment = Math.round(seaLevelDist * temperatureEffect)
    const humidityAdjustment = Math.round(seaLevelDist * humidityEffect)

    const newCalculation: AltitudeCalculation = {
      id: Date.now().toString(),
      locationName: currentCalc.locationName || `${altitude}ft elevation`,
      club: currentCalc.club,
      seaLevelDistance: seaLevelDist,
      currentAltitude: altitude,
      adjustedDistance,
      distanceGain,
      altitudeEffect: altitudeAdjustment,
      temperatureAdjustment,
      humidityAdjustment,
      airDensityFactor: Number(airDensityFactor.toFixed(4)),
      createdAt: new Date().toLocaleDateString()
    }

    setCalculations(prev => [newCalculation, ...prev.slice(0, 19)])

    // Clear form
    setCurrentCalc({
      locationName: '',
      club: 'Driver',
      seaLevelDistance: '',
      currentAltitude: '',
      temperature: '70',
      humidity: '50'
    })
  }

  const removeCalculation = (id: string) => {
    setCalculations(prev => prev.filter(calc => calc.id !== id))
  }

  const clearAllCalculations = () => {
    setCalculations([])
    localStorage.removeItem('altitude-distance-calculations')
  }

  const getAltitudeCategory = (altitude: number) => {
    if (altitude < 1000) return { category: 'Low', color: 'text-blue-600', effect: 'Minimal' }
    if (altitude < 3000) return { category: 'Moderate', color: 'text-green-600', effect: 'Noticeable' }
    if (altitude < 5000) return { category: 'High', color: 'text-yellow-600', effect: 'Significant' }
    if (altitude < 7000) return { category: 'Very High', color: 'text-orange-600', effect: 'Major' }
    return { category: 'Extreme', color: 'text-red-600', effect: 'Dramatic' }
  }

  const getDistanceColor = (gain: number) => {
    if (gain <= 5) return 'text-blue-600'
    if (gain <= 15) return 'text-green-600'
    if (gain <= 30) return 'text-yellow-600'
    if (gain <= 50) return 'text-orange-600'
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

  const getAltitudeDescription = (altitude: number) => {
    if (altitude < 1000) return 'Sea level to low elevation'
    if (altitude < 3000) return 'Moderate mountain elevation'
    if (altitude < 5000) return 'High mountain elevation'
    if (altitude < 7000) return 'Very high elevation course'
    return 'Extreme high altitude course'
  }

  return (
    <div className="min-h-screen bg-white ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Mountain className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-2">
                  Golf Altitude Distance Calculator
                </h1>
                <p className="text-slate-600 text-lg">
                  Calculate how altitude affects your golf ball distance. Higher elevation means thinner air and longer shots.
                </p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                High Altitude Golf Calculator - Free Elevation Distance Tool
              </h2>
              <p className="text-slate-700 mb-3">
                Playing at elevation? Golf balls fly significantly farther in thinner air. Calculate precise distance
                adjustments for mountain courses, high-altitude destinations, and varying atmospheric conditions.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Air Density Analysis
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Temperature Effects
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Club Selection
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
                  Altitude Distance Calculator
                </CardTitle>
                <CardDescription>
                  Calculate distance changes due to elevation and atmospheric conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="locationName">Course/Location Name</Label>
                  <Input
                    id="locationName"
                    type="text"
                    placeholder="e.g. Whistling Straits, Colorado National"
                    value={currentCalc.locationName}
                    onChange={(e) => setCurrentCalc(prev => ({...prev, locationName: e.target.value}))}
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Shot Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="club">Club</Label>
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
                      <Label htmlFor="seaLevelDistance">Sea Level Distance (yards) *</Label>
                      <Input
                        id="seaLevelDistance"
                        type="number"
                        step="1"
                        placeholder="e.g. 250"
                        value={currentCalc.seaLevelDistance}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, seaLevelDistance: e.target.value}))}
                        required
                      />
                      <p className="text-xs text-gray-600 mt-1">Your normal distance at sea level</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Elevation & Conditions</h4>
                  <div>
                    <Label htmlFor="currentAltitude">Current Altitude (feet) *</Label>
                    <Input
                      id="currentAltitude"
                      type="number"
                      step="100"
                      placeholder="e.g. 5000"
                      value={currentCalc.currentAltitude}
                      onChange={(e) => setCurrentCalc(prev => ({...prev, currentAltitude: e.target.value}))}
                      required
                    />
                    <p className="text-xs text-gray-600 mt-1">Course elevation above sea level</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <Label htmlFor="temperature">Temperature (°F)</Label>
                      <Input
                        id="temperature"
                        type="number"
                        step="1"
                        placeholder="e.g. 75"
                        value={currentCalc.temperature}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, temperature: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="humidity">Humidity (%)</Label>
                      <Input
                        id="humidity"
                        type="number"
                        step="5"
                        placeholder="e.g. 40"
                        value={currentCalc.humidity}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, humidity: e.target.value}))}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={calculateAltitudeEffect}
                  className="w-full bg-emerald-600 text-white hover:opacity-90"
                  disabled={!currentCalc.seaLevelDistance || !currentCalc.currentAltitude}
                >
                  Calculate Altitude Distance
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
                      Altitude Calculations
                    </CardTitle>
                    <CardDescription>
                      Your elevation distance adjustments ({calculations.length} calculations)
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
                    <Mountain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No altitude calculations yet.</p>
                    <p className="text-sm">Calculate your first altitude adjustment above.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {calculations.map((calculation) => (
                      <div key={calculation.id} className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-slate-900 flex items-center gap-2">
                              🏔️ {calculation.locationName}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {calculation.createdAt} • {getClubIcon(calculation.club)} {calculation.club}
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
                            <p className="text-gray-600">Sea Level Distance:</p>
                            <p className="font-medium">{calculation.seaLevelDistance} yards</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Altitude Distance:</p>
                            <p className="font-bold text-lg text-green-600">{calculation.adjustedDistance} yards</p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Distance Gain:</span>
                            <span className={`font-semibold ${getDistanceColor(calculation.distanceGain)}`}>
                              +{calculation.distanceGain} yards
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Altitude:</span>
                            <span className={getAltitudeCategory(calculation.currentAltitude).color}>
                              {calculation.currentAltitude}ft ({getAltitudeCategory(calculation.currentAltitude).category})
                            </span>
                          </div>
                        </div>

                        <div className="text-xs space-y-1 pt-2 border-t">
                          <div className="flex justify-between">
                            <span>Altitude effect:</span>
                            <span className="text-green-600">
                              +{calculation.altitudeEffect} yards
                            </span>
                          </div>
                          {calculation.temperatureAdjustment !== 0 && (
                            <div className="flex justify-between">
                              <span>Temperature effect:</span>
                              <span className={calculation.temperatureAdjustment > 0 ? 'text-green-600' : 'text-red-600'}>
                                {calculation.temperatureAdjustment > 0 ? '+' : ''}{calculation.temperatureAdjustment} yards
                              </span>
                            </div>
                          )}
                          {calculation.humidityAdjustment !== 0 && (
                            <div className="flex justify-between">
                              <span>Humidity effect:</span>
                              <span className={calculation.humidityAdjustment > 0 ? 'text-green-600' : 'text-red-600'}>
                                {calculation.humidityAdjustment > 0 ? '+' : ''}{calculation.humidityAdjustment} yards
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span>Air density factor:</span>
                            <span className="font-medium">{calculation.airDensityFactor}</span>
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
                Understanding Altitude Effects on Golf Ball Flight
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Complete Guide to High Altitude Golf</h3>
                <p className="text-slate-700 mb-4">
                  Altitude dramatically affects golf ball flight due to changes in air density. Understanding these effects
                  is crucial for proper club selection and distance management when playing at elevation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Altitude Distance Effects:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>1,000 feet:</strong> ~2% increase (3-5 yards longer)</li>
                    <li>• <strong>3,000 feet:</strong> ~6% increase (12-15 yards longer)</li>
                    <li>• <strong>5,000 feet:</strong> ~10% increase (20-25 yards longer)</li>
                    <li>• <strong>7,000 feet:</strong> ~14% increase (30-35 yards longer)</li>
                    <li>• <strong>8,000+ feet:</strong> ~16%+ increase (40+ yards longer)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Why Golf Balls Fly Farther:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Thinner Air:</strong> Less air resistance (drag)</li>
                    <li>• <strong>Lower Air Density:</strong> Reduced atmospheric pressure</li>
                    <li>• <strong>Less Oxygen:</strong> Lighter air molecules</li>
                    <li>• <strong>Temperature:</strong> Often cooler, but varies by season</li>
                    <li>• <strong>Humidity:</strong> Generally lower at altitude</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Club-Specific Effects:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Driver:</strong> Largest distance gain (30-50+ yards)</p>
                    <p><strong>Fairway Woods:</strong> Significant gain (20-35 yards)</p>
                    <p><strong>Long Irons:</strong> Noticeable gain (15-25 yards)</p>
                    <p><strong>Mid Irons:</strong> Moderate gain (10-18 yards)</p>
                    <p><strong>Short Irons:</strong> Smaller gain (5-12 yards)</p>
                    <p><strong>Wedges:</strong> Minimal gain (3-8 yards)</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Temperature Effects:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Hot Weather:</strong> Ball flies even farther</p>
                    <p><strong>Cold Weather:</strong> Reduces altitude benefit</p>
                    <p><strong>Rule of Thumb:</strong> 1-2 yards per 10°F change</p>
                    <p><strong>Extreme Cold:</strong> Can negate altitude gains</p>
                    <p><strong>Extreme Heat:</strong> Compounds altitude effects</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Course Management:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Club Down:</strong> Use less club than normal</p>
                    <p><strong>Yardage Books:</strong> Adjust all distances</p>
                    <p><strong>Approach Shots:</strong> More club selection precision needed</p>
                    <p><strong>Green-side:</strong> Wedges still require precision</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Famous High Altitude Courses:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Crans-sur-Sierre:</strong> 5,000+ feet (Switzerland)</p>
                    <p><strong>Whistling Straits:</strong> 200+ feet (Wisconsin)</p>
                    <p><strong>Bandon Dunes:</strong> 150+ feet (Oregon)</p>
                    <p><strong>Colorado Courses:</strong> Many 5,000-8,000+ feet</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Playing Strategy:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Practice Round:</strong> Essential for distance calibration</p>
                    <p><strong>Range Session:</strong> Test all clubs at altitude</p>
                    <p><strong>Conservative Play:</strong> Avoid flying greens</p>
                    <p><strong>Wind Awareness:</strong> Altitude amplifies wind effects</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Additional Factors:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Humidity:</strong> Lower humidity = more distance</p>
                    <p><strong>Barometric Pressure:</strong> Lower pressure = more distance</p>
                    <p><strong>Ball Type:</strong> Some balls perform better at altitude</p>
                    <p><strong>Swing Speed:</strong> Higher speeds see bigger gains</p>
                    <p><strong>Launch Angle:</strong> Optimal launch may change</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Acclimatization Tips:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Arrive Early:</strong> Play practice rounds</p>
                    <p><strong>Hydration:</strong> Drink more water at altitude</p>
                    <p><strong>Breathing:</strong> May feel winded initially</p>
                    <p><strong>Mental Game:</strong> Trust the distance calculations</p>
                    <p><strong>Equipment:</strong> Consider ball and club adjustments</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-slate-900 mb-3">Why Use Our Altitude Distance Calculator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-700 mb-2"><strong>✓ Precise Calculations:</strong> Scientific air density formulas</p>
                    <p className="text-slate-700 mb-2"><strong>✓ Multiple Factors:</strong> Altitude, temperature, humidity</p>
                    <p className="text-slate-700"><strong>✓ Course Planning:</strong> Better distance management</p>
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2"><strong>✓ Club Selection:</strong> Accurate yardage adjustments</p>
                    <p className="text-slate-700 mb-2"><strong>✓ Performance Tracking:</strong> Compare different elevations</p>
                    <p className="text-slate-700"><strong>✓ Free Tool:</strong> No cost for altitude calculations</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-slate-700">
                  <strong>Important:</strong> Altitude effects can vary based on individual swing characteristics, equipment,
                  and specific atmospheric conditions. These calculations provide general estimates based on physics principles.
                  Always verify distances with practice rounds and range sessions when playing at significant elevation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}