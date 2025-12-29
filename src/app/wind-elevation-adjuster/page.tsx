'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Wind, Mountain } from 'lucide-react'

interface WindElevationAdjustment {
  id: string
  shotDescription: string
  baseDistance: number
  windSpeed: number
  windDirection: string
  elevation: number
  temperature: number
  adjustedDistance: number
  windEffect: number
  elevationEffect: number
  temperatureEffect: number
  createdAt: string
}

export default function WindElevationAdjuster() {
  const [adjustments, setAdjustments] = useState<WindElevationAdjustment[]>([])
  const [currentCalc, setCurrentCalc] = useState({
    shotDescription: '',
    baseDistance: '',
    windSpeed: '',
    windDirection: 'Headwind',
    elevation: '',
    temperature: '70'
  })

  useEffect(() => {
    const savedAdjustments = localStorage.getItem('wind-elevation-adjustments')
    if (savedAdjustments) {
      setAdjustments(JSON.parse(savedAdjustments))
    }
  }, [])

  useEffect(() => {
    if (adjustments.length > 0) {
      localStorage.setItem('wind-elevation-adjustments', JSON.stringify(adjustments))
    }
  }, [adjustments])

  const calculateAdjustment = () => {
    const baseDistance = parseFloat(currentCalc.baseDistance)
    const windSpeed = parseFloat(currentCalc.windSpeed)
    const elevation = parseFloat(currentCalc.elevation)
    const temperature = parseFloat(currentCalc.temperature)

    if (!baseDistance || !windSpeed || !elevation) return

    // Wind effect calculation
    let windEffect = 0
    const windFactor = windSpeed * 0.01 // 1% per mph as base

    switch (currentCalc.windDirection) {
      case 'Headwind':
        windEffect = -baseDistance * windFactor * 1.2 // Headwind has more effect
        break
      case 'Tailwind':
        windEffect = baseDistance * windFactor * 0.8 // Tailwind has less effect
        break
      case 'Left Crosswind':
      case 'Right Crosswind':
        windEffect = 0 // Crosswind affects direction, not distance significantly
        break
    }

    // Elevation effect calculation (approximately 2% per 100 feet)
    const elevationEffect = (elevation / 100) * baseDistance * 0.02

    // Temperature effect calculation (1 yard per 10 degrees from 70°F for 150 yard shot)
    const tempDifference = temperature - 70
    const temperatureEffect = (tempDifference / 10) * (baseDistance / 150)

    const totalAdjustment = windEffect + elevationEffect + temperatureEffect
    const adjustedDistance = Math.round(baseDistance + totalAdjustment)

    const newAdjustment: WindElevationAdjustment = {
      id: Date.now().toString(),
      shotDescription: currentCalc.shotDescription || `${baseDistance} yard shot`,
      baseDistance,
      windSpeed,
      windDirection: currentCalc.windDirection,
      elevation,
      temperature,
      adjustedDistance,
      windEffect: Math.round(windEffect),
      elevationEffect: Math.round(elevationEffect),
      temperatureEffect: Math.round(temperatureEffect),
      createdAt: new Date().toLocaleDateString()
    }

    setAdjustments(prev => [newAdjustment, ...prev.slice(0, 19)])

    // Clear form
    setCurrentCalc({
      shotDescription: '',
      baseDistance: '',
      windSpeed: '',
      windDirection: 'Headwind',
      elevation: '',
      temperature: '70'
    })
  }

  const removeAdjustment = (id: string) => {
    setAdjustments(prev => prev.filter(adj => adj.id !== id))
  }

  const clearAllAdjustments = () => {
    setAdjustments([])
    localStorage.removeItem('wind-elevation-adjustments')
  }

  const getWindIcon = (direction: string) => {
    switch (direction) {
      case 'Headwind': return '⬆️'
      case 'Tailwind': return '⬇️'
      case 'Left Crosswind': return '⬅️'
      case 'Right Crosswind': return '➡️'
      default: return '💨'
    }
  }

  const getAdjustmentColor = (effect: number) => {
    if (effect > 5) return 'text-green-600'
    if (effect < -5) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div className="min-h-screen bg-white ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-600 mb-4">
            <ol className="flex space-x-2">
              <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
              <li className="before:content-['/'] before:mx-2 text-slate-900">Wind & Elevation Adjuster</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" className="bg-emerald-100 rounded-xl">
                <Wind className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-2">
                  Wind & Elevation Adjuster
                </h1>
                <p className="text-slate-600 text-lg">
                  Calculate distance adjustments for wind, elevation, and temperature conditions on the golf course.
                </p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Environmental Golf Calculator - Free Course Management Tool
              </h2>
              <p className="text-slate-700 mb-3">
                Master challenging conditions with precise distance adjustments. Account for wind speed and direction,
                elevation changes, and temperature variations to improve your course management and shot selection.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" className="bg-emerald-600"></span>
                  Wind Speed & Direction
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" className="bg-emerald-600"></span>
                  Elevation Adjustments
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" className="bg-emerald-600"></span>
                  Temperature Effects
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
                  Distance Adjustment Calculator
                </CardTitle>
                <CardDescription>
                  Enter shot distance and environmental conditions for precise adjustments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="shotDescription">Shot Description</Label>
                  <Input
                    id="shotDescription"
                    type="text"
                    placeholder="e.g. 7-iron to pin"
                    value={currentCalc.shotDescription}
                    onChange={(e) => setCurrentCalc(prev => ({...prev, shotDescription: e.target.value}))}
                  />
                </div>

                <div>
                  <Label htmlFor="baseDistance">Base Distance (yards) *</Label>
                  <Input
                    id="baseDistance"
                    type="number"
                    step="1"
                    placeholder="e.g. 150"
                    value={currentCalc.baseDistance}
                    onChange={(e) => setCurrentCalc(prev => ({...prev, baseDistance: e.target.value}))}
                    required
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Wind Conditions</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="windSpeed">Wind Speed (mph) *</Label>
                      <Input
                        id="windSpeed"
                        type="number"
                        step="1"
                        placeholder="e.g. 15"
                        value={currentCalc.windSpeed}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, windSpeed: e.target.value}))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="windDirection">Wind Direction</Label>
                      <select
                        id="windDirection"
                        value={currentCalc.windDirection}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, windDirection: e.target.value}))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Headwind">Headwind (into)</option>
                        <option value="Tailwind">Tailwind (helping)</option>
                        <option value="Left Crosswind">Left Crosswind</option>
                        <option value="Right Crosswind">Right Crosswind</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Course Conditions</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="elevation">Elevation Change (feet) *</Label>
                      <Input
                        id="elevation"
                        type="number"
                        step="1"
                        placeholder="e.g. +20 or -15"
                        value={currentCalc.elevation}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, elevation: e.target.value}))}
                        required
                      />
                      <p className="text-xs text-gray-600 mt-1">Positive for uphill, negative for downhill</p>
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
                  onClick={calculateAdjustment}
                  className="w-full text-white hover:opacity-90"
                  className="bg-emerald-600"
                  disabled={!currentCalc.baseDistance || !currentCalc.windSpeed || !currentCalc.elevation}
                >
                  Calculate Adjusted Distance
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
                      Recent Adjustments
                    </CardTitle>
                    <CardDescription>
                      Your distance calculations ({adjustments.length} adjustments)
                    </CardDescription>
                  </div>
                  {adjustments.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllAdjustments}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {adjustments.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">
                    <Wind className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No adjustments calculated yet.</p>
                    <p className="text-sm">Calculate your first distance adjustment above.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {adjustments.map((adjustment) => (
                      <div key={adjustment.id} className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-slate-900">
                              {adjustment.shotDescription}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {adjustment.createdAt}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAdjustment(adjustment.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Base Distance:</p>
                            <p className="font-medium">{adjustment.baseDistance} yards</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Adjusted Distance:</p>
                            <p className="font-bold text-lg text-green-600">{adjustment.adjustedDistance} yards</p>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span>Wind {getWindIcon(adjustment.windDirection)}:</span>
                            <span className={getAdjustmentColor(adjustment.windEffect)}>
                              {adjustment.windEffect > 0 ? '+' : ''}{adjustment.windEffect} yds
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Elevation:</span>
                            <span className={getAdjustmentColor(adjustment.elevationEffect)}>
                              {adjustment.elevationEffect > 0 ? '+' : ''}{adjustment.elevationEffect} yds
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Temperature:</span>
                            <span className={getAdjustmentColor(adjustment.temperatureEffect)}>
                              {adjustment.temperatureEffect > 0 ? '+' : ''}{adjustment.temperatureEffect} yds
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Wind Speed:</span>
                            <span>{adjustment.windSpeed} mph</span>
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
                Understanding Environmental Golf Adjustments
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Complete Guide to Wind and Elevation</h3>
                <p className="text-slate-700 mb-4">
                  Environmental conditions significantly impact golf ball flight. Understanding how wind, elevation, and temperature
                  affect distance helps you make better club selections and improve your course management skills.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Wind Effects on Ball Flight:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Headwind:</strong> Reduces distance and creates more backspin</li>
                    <li>• <strong>Tailwind:</strong> Increases distance but reduces stopping power</li>
                    <li>• <strong>Crosswind:</strong> Affects ball direction more than distance</li>
                    <li>• <strong>Wind Speed:</strong> Approximately 1% distance change per mph</li>
                    <li>• <strong>Ball Height:</strong> Higher shots are more affected by wind</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Elevation Impact:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Uphill:</strong> Ball travels shorter due to gravity</li>
                    <li>• <strong>Downhill:</strong> Ball travels farther and lands softer</li>
                    <li>• <strong>Rule of Thumb:</strong> 2% distance change per 100 feet</li>
                    <li>• <strong>Altitude:</strong> Higher altitude = less air density = more distance</li>
                    <li>• <strong>Landing Angle:</strong> Affects how ball reacts on landing</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Temperature Effects:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Hot Weather:</strong> Ball travels farther (less air density)</p>
                    <p><strong>Cold Weather:</strong> Ball travels shorter (denser air)</p>
                    <p><strong>Rule:</strong> ~1 yard per 10°F from 70°F baseline</p>
                    <p><strong>Equipment:</strong> Cold affects ball compression</p>
                    <p><strong>Humidity:</strong> High humidity slightly reduces distance</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Course Management Tips:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Club Selection:</strong> Adjust based on total effect</p>
                    <p><strong>Shot Shape:</strong> Work with wind when possible</p>
                    <p><strong>Ball Position:</strong> Forward for headwind, back for tailwind</p>
                    <p><strong>Swing Tempo:</strong> Smooth swings handle wind better</p>
                    <p><strong>Landing Areas:</strong> Account for roll on elevation changes</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Wind Adjustment Guidelines:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>5-10 mph:</strong> 1 club difference</p>
                    <p><strong>10-15 mph:</strong> 1-2 club difference</p>
                    <p><strong>15-20 mph:</strong> 2-3 club difference</p>
                    <p><strong>20+ mph:</strong> Significant adjustments needed</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Elevation Guidelines:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>10 feet up:</strong> Add ~3 yards</p>
                    <p><strong>20 feet up:</strong> Add ~6 yards</p>
                    <p><strong>30 feet up:</strong> Add ~9 yards</p>
                    <p><strong>Downhill:</strong> Subtract equivalent amounts</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Combined Effects:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Multiple Factors:</strong> Add all adjustments</p>
                    <p><strong>Downwind + Downhill:</strong> Very long shots</p>
                    <p><strong>Upwind + Uphill:</strong> Much shorter shots</p>
                    <p><strong>Practice:</strong> Learn your personal adjustments</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-slate-900 mb-3">Why Use Our Wind & Elevation Adjuster?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-700 mb-2"><strong>✓ Precise Calculations:</strong> Based on proven golf physics</p>
                    <p className="text-slate-700 mb-2"><strong>✓ Multiple Factors:</strong> Wind, elevation, and temperature</p>
                    <p className="text-slate-700"><strong>✓ Course Management:</strong> Improve decision making</p>
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2"><strong>✓ Save History:</strong> Track your adjustments</p>
                    <p className="text-slate-700 mb-2"><strong>✓ Educational:</strong> Learn environmental effects</p>
                    <p className="text-slate-700"><strong>✓ Free Tool:</strong> No cost for calculations</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-slate-700">
                  <strong>Important:</strong> These calculations provide general estimates based on golf physics principles.
                  Actual results vary based on ball type, club specifications, swing characteristics, and specific course conditions.
                  Use as a starting point and adjust based on your experience and course observations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}