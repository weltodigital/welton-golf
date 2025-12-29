'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Zap, TrendingUp, Target, Activity } from 'lucide-react'

interface ShaftFlexData {
  swingSpeed: number
  ballFlight: string
  distance: number
  tempo: string
  age: number
  strength: string
  ballStriking: string
  clubType: string
}

export default function ShaftFlexCalculator() {
  const [flexData, setFlexData] = useState<ShaftFlexData>({
    swingSpeed: 0,
    ballFlight: '',
    distance: 0,
    tempo: '',
    age: 0,
    strength: '',
    ballStriking: '',
    clubType: ''
  })

  const [showResults, setShowResults] = useState(false)

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('weltonGolf_shaftFlexData')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFlexData(parsed)
        if (parsed.swingSpeed > 0) {
          setShowResults(true)
        }
      } catch (error) {
        console.error('Error loading saved shaft flex data:', error)
      }
    }
  }, [])

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem('weltonGolf_shaftFlexData', JSON.stringify(flexData))
  }, [flexData])

  const shaftRecommendation = useMemo(() => {
    if (flexData.swingSpeed === 0) {
      return null
    }

    // Base flex determination by swing speed
    let baseFlex = 'Regular'
    if (flexData.swingSpeed < 75) {
      baseFlex = 'Ladies'
    } else if (flexData.swingSpeed >= 75 && flexData.swingSpeed < 85) {
      baseFlex = 'Senior'
    } else if (flexData.swingSpeed >= 85 && flexData.swingSpeed < 95) {
      baseFlex = 'Regular'
    } else if (flexData.swingSpeed >= 95 && flexData.swingSpeed < 105) {
      baseFlex = 'Stiff'
    } else {
      baseFlex = 'Extra Stiff'
    }

    // Adjustments based on other factors
    let flexAdjustment = 0

    // Ball flight adjustment
    if (flexData.ballFlight === 'Too Low') {
      flexAdjustment -= 1 // Softer flex for higher launch
    } else if (flexData.ballFlight === 'Too High') {
      flexAdjustment += 1 // Stiffer flex for lower launch
    }

    // Distance vs swing speed analysis
    const expectedDistance = flexData.swingSpeed * 2.4 // Rough formula
    if (flexData.distance > 0) {
      if (flexData.distance < expectedDistance * 0.9) {
        flexAdjustment -= 0.5 // Might need softer flex
      } else if (flexData.distance > expectedDistance * 1.1) {
        flexAdjustment += 0.5 // Might need stiffer flex
      }
    }

    // Tempo adjustment
    if (flexData.tempo === 'Very Smooth') {
      flexAdjustment -= 0.5 // Softer flex
    } else if (flexData.tempo === 'Very Aggressive') {
      flexAdjustment += 0.5 // Stiffer flex
    }

    // Age adjustment
    if (flexData.age > 60) {
      flexAdjustment -= 0.5 // Generally softer for older players
    } else if (flexData.age < 25) {
      flexAdjustment += 0.25 // Might handle stiffer flex
    }

    // Strength adjustment
    if (flexData.strength === 'Below Average') {
      flexAdjustment -= 0.5
    } else if (flexData.strength === 'Above Average') {
      flexAdjustment += 0.5
    }

    // Ball striking adjustment
    if (flexData.ballStriking === 'Inconsistent') {
      flexAdjustment -= 0.25 // Softer might help
    } else if (flexData.ballStriking === 'Very Consistent') {
      flexAdjustment += 0.25 // Can handle stiffer
    }

    // Club type adjustment
    if (flexData.clubType === 'Fairway Woods') {
      flexAdjustment -= 0.25 // Generally softer than driver
    } else if (flexData.clubType === 'Hybrids') {
      flexAdjustment -= 0.5 // Generally softer
    } else if (flexData.clubType === 'Irons') {
      flexAdjustment += 0.25 // Generally stiffer than woods
    }

    // Convert to flex scale
    const flexScale: { [key: string]: number } = {
      'Ladies': 1,
      'Senior': 2,
      'Regular': 3,
      'Stiff': 4,
      'Extra Stiff': 5
    }

    const baseFlexValue = flexScale[baseFlex]
    const adjustedFlexValue = Math.round(baseFlexValue + flexAdjustment)
    const finalFlexValue = Math.max(1, Math.min(5, adjustedFlexValue))

    const flexMap: { [key: number]: string } = {
      1: 'Ladies',
      2: 'Senior',
      3: 'Regular',
      4: 'Stiff',
      5: 'Extra Stiff'
    }

    const recommendedFlex = flexMap[finalFlexValue]

    // Alternative recommendations
    const getAlternatives = (primary: string) => {
      const alternatives = []
      const primaryValue = flexScale[primary]

      if (primaryValue > 1) {
        alternatives.push(flexMap[primaryValue - 1])
      }
      if (primaryValue < 5) {
        alternatives.push(flexMap[primaryValue + 1])
      }

      return alternatives
    }

    // Performance characteristics
    const getCharacteristics = (flex: string) => {
      switch (flex) {
        case 'Ladies':
          return {
            launch: 'High',
            spin: 'High',
            feel: 'Very Soft',
            control: 'Moderate',
            distance: 'Maximized for slower speeds'
          }
        case 'Senior':
          return {
            launch: 'High',
            spin: 'Medium-High',
            feel: 'Soft',
            control: 'Good',
            distance: 'Good for moderate speeds'
          }
        case 'Regular':
          return {
            launch: 'Medium',
            spin: 'Medium',
            feel: 'Balanced',
            control: 'Good',
            distance: 'Versatile performance'
          }
        case 'Stiff':
          return {
            launch: 'Medium-Low',
            spin: 'Medium-Low',
            feel: 'Firm',
            control: 'Excellent',
            distance: 'Good for faster speeds'
          }
        case 'Extra Stiff':
          return {
            launch: 'Low',
            spin: 'Low',
            feel: 'Very Firm',
            control: 'Maximum',
            distance: 'Tour-level performance'
          }
        default:
          return {
            launch: 'Medium',
            spin: 'Medium',
            feel: 'Balanced',
            control: 'Good',
            distance: 'Versatile'
          }
      }
    }

    // Fitting confidence
    const getConfidence = () => {
      if (Math.abs(flexAdjustment) <= 0.25) return 'High'
      if (Math.abs(flexAdjustment) <= 0.75) return 'Medium'
      return 'Low - Professional fitting recommended'
    }

    return {
      recommendedFlex,
      alternatives: getAlternatives(recommendedFlex),
      characteristics: getCharacteristics(recommendedFlex),
      swingSpeedRange: getSwingSpeedRange(recommendedFlex),
      confidence: getConfidence(),
      adjustmentFactor: flexAdjustment.toFixed(1)
    }
  }, [flexData])

  const getSwingSpeedRange = (flex: string) => {
    switch (flex) {
      case 'Ladies': return '< 75 mph'
      case 'Senior': return '75-85 mph'
      case 'Regular': return '85-95 mph'
      case 'Stiff': return '95-105 mph'
      case 'Extra Stiff': return '> 105 mph'
      default: return '85-95 mph'
    }
  }

  const handleCalculate = () => {
    if (flexData.swingSpeed > 0) {
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setFlexData({
      swingSpeed: 0,
      ballFlight: '',
      distance: 0,
      tempo: '',
      age: 0,
      strength: '',
      ballStriking: '',
      clubType: ''
    })
    setShowResults(false)
    localStorage.removeItem('weltonGolf_shaftFlexData')
  }

  return (
    <div className="min-h-screen bg-white ">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div>
          {/* Breadcrumbs */
        <nav className="text-sm text-slate-600 mb-4">
          <ol className="flex space-x-2">
            <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
            <li><span className="mx-2 text-slate-400">›</span>Shaft Flex Calculator</li>
          </ol>
        </nav>
        </div>

        <div className="text-center mb-8"> {/* Header */}
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Golf Shaft Flex Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Find your optimal shaft flex based on swing speed, ball flight, and playing characteristics.
            Proper shaft flex improves distance, accuracy, and overall performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Swing Analysis
              </h2>
            </div>

            <div className="space-y-6">
              {/* Swing Speed */}
              <div>
                <Label htmlFor="swingSpeed" className="text-sm font-medium text-slate-600">
                  Driver Swing Speed (mph) *
                </Label>
                <p className="text-xs text-slate-600 mb-2">
                  Use a launch monitor or estimate based on distance
                </p>
                <Input
                  id="swingSpeed"
                  type="number"
                  placeholder="e.g., 95"
                  value={flexData.swingSpeed || ''}
                  onChange={(e) => setFlexData(prev => ({
                    ...prev,
                    swingSpeed: parseFloat(e.target.value) || 0
                  }))}
                  className="w-full"
                />
              </div>

              {/* Ball Flight */}
              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Current Ball Flight
                </Label>
                <Select
                  value={flexData.ballFlight}
                  onValueChange={(value) => setFlexData(prev => ({ ...prev, ballFlight: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your typical ball flight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Too Low">Too Low</SelectItem>
                    <SelectItem value="Good">Good Height</SelectItem>
                    <SelectItem value="Too High">Too High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Distance */}
              <div>
                <Label htmlFor="distance" className="text-sm font-medium text-slate-600">
                  Average Driver Distance (yards)
                </Label>
                <p className="text-xs text-slate-600 mb-2">
                  Total distance including roll
                </p>
                <Input
                  id="distance"
                  type="number"
                  placeholder="e.g., 240"
                  value={flexData.distance || ''}
                  onChange={(e) => setFlexData(prev => ({
                    ...prev,
                    distance: parseFloat(e.target.value) || 0
                  }))}
                  className="w-full"
                />
              </div>

              {/* Tempo */}
              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Swing Tempo
                </Label>
                <Select
                  value={flexData.tempo}
                  onValueChange={(value) => setFlexData(prev => ({ ...prev, tempo: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your swing tempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Very Smooth">Very Smooth</SelectItem>
                    <SelectItem value="Smooth">Smooth</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Aggressive">Aggressive</SelectItem>
                    <SelectItem value="Very Aggressive">Very Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Age */}
              <div>
                <Label htmlFor="age" className="text-sm font-medium text-slate-600">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g., 35"
                  value={flexData.age || ''}
                  onChange={(e) => setFlexData(prev => ({
                    ...prev,
                    age: parseFloat(e.target.value) || 0
                  }))}
                  className="w-full"
                />
              </div>

              {/* Strength */}
              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Physical Strength
                </Label>
                <Select
                  value={flexData.strength}
                  onValueChange={(value) => setFlexData(prev => ({ ...prev, strength: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your strength level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Below Average">Below Average</SelectItem>
                    <SelectItem value="Average">Average</SelectItem>
                    <SelectItem value="Above Average">Above Average</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ball Striking */}
              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Ball Striking Consistency
                </Label>
                <Select
                  value={flexData.ballStriking}
                  onValueChange={(value) => setFlexData(prev => ({ ...prev, ballStriking: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your ball striking" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inconsistent">Inconsistent</SelectItem>
                    <SelectItem value="Average">Average</SelectItem>
                    <SelectItem value="Consistent">Consistent</SelectItem>
                    <SelectItem value="Very Consistent">Very Consistent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Club Type */}
              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Primary Club Type
                </Label>
                <Select
                  value={flexData.clubType}
                  onValueChange={(value) => setFlexData(prev => ({ ...prev, clubType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select club type for fitting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Driver">Driver</SelectItem>
                    <SelectItem value="Fairway Woods">Fairway Woods</SelectItem>
                    <SelectItem value="Hybrids">Hybrids</SelectItem>
                    <SelectItem value="Irons">Irons</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleCalculate}
                  disabled={!flexData.swingSpeed}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg border-0"
                >
                  Calculate Shaft Flex
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="px-6"
                >
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          {/* Results */}
          {showResults && shaftRecommendation && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Shaft Flex Recommendation
                </h2>
              </div>

              <div className="space-y-6">
                {/* Primary Recommendation */}
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Recommended Shaft Flex
                  </h3>
                  <div className="text-3xl font-bold text-emerald-700 mb-2">
                    {shaftRecommendation.recommendedFlex}
                  </div>
                  <div className="text-sm text-slate-700">
                    Swing Speed Range: {shaftRecommendation.swingSpeedRange}
                  </div>
                  <div className="text-sm text-slate-700">
                    Confidence: {shaftRecommendation.confidence}
                  </div>
                </div>

                {/* Performance Characteristics */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Performance Characteristics
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-slate-100 rounded">
                      <div className="font-medium text-slate-900">Launch</div>
                      <div className="text-slate-700">
                        {shaftRecommendation.characteristics.launch}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-100 rounded">
                      <div className="font-medium text-slate-900">Spin</div>
                      <div className="text-slate-700">
                        {shaftRecommendation.characteristics.spin}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-100 rounded">
                      <div className="font-medium text-slate-900">Feel</div>
                      <div className="text-slate-700">
                        {shaftRecommendation.characteristics.feel}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-100 rounded">
                      <div className="font-medium text-slate-900">Control</div>
                      <div className="text-slate-700">
                        {shaftRecommendation.characteristics.control}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alternative Options */}
                {shaftRecommendation.alternatives.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">
                      Alternative Options
                    </h4>
                    <div className="flex gap-2">
                      {shaftRecommendation.alternatives.map((alt, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-600 rounded text-sm text-white"
                        >
                          {alt}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 mt-2">
                      Consider testing these alternatives during a professional fitting
                    </p>
                  </div>
                )}

                {/* Expected Performance */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Expected Performance
                  </h4>
                  <p className="text-sm text-slate-600">
                    {shaftRecommendation.characteristics.distance}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Educational Content */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-600" />
              Understanding Shaft Flex
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <strong className="text-slate-900">Shaft Flex Basics:</strong>
                <p>Shaft flex refers to how much the shaft bends during the swing. The right flex helps optimize launch conditions, spin rate, and overall performance.</p>
              </div>
              <div>
                <strong className="text-slate-900">Flex Options:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Ladies (L): Softest flex, highest launch</li>
                  <li>Senior (A): Soft flex for moderate speeds</li>
                  <li>Regular (R): Most common, balanced performance</li>
                  <li>Stiff (S): Firm flex for faster speeds</li>
                  <li>Extra Stiff (X): Firmest, for tour-level speeds</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Impact of Wrong Flex
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <strong className="text-slate-900">Too Stiff:</strong>
                <p>Low ball flight, slice tendency, loss of distance, harsh feel, difficulty getting ball airborne.</p>
              </div>
              <div>
                <strong className="text-slate-900">Too Soft:</strong>
                <p>High ball flight, hook tendency, loss of accuracy, inconsistent contact, loss of control.</p>
              </div>
              <div>
                <strong className="text-slate-900">Proper Fit:</strong>
                <p>Optimal launch angle, good feel, improved accuracy, maximum distance for your swing speed.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Professional Fitting Info */}
        <Card className="mt-8 p-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Professional Shaft Fitting Recommendations
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Key Measurements</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Swing speed with launch monitor</li>
                <li>Ball flight analysis</li>
                <li>Spin rate measurements</li>
                <li>Launch angle optimization</li>
                <li>Dispersion patterns</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Shaft Properties</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Flex profile (tip/butt flex)</li>
                <li>Kick point (bend location)</li>
                <li>Weight considerations</li>
                <li>Torque characteristics</li>
                <li>Material composition</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">When to Get Fitted</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>New equipment purchase</li>
                <li>Significant swing changes</li>
                <li>Inconsistent ball flight</li>
                <li>Age-related strength changes</li>
                <li>Performance plateau</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}