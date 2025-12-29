'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Ruler, Hand, Target, TrendingUp } from 'lucide-react'

interface GripSizeData {
  handLength: number
  handSpan: number
  playingStyle: string
  swingSpeed: string
  feelPreference: string
  handStrength: string
}

export default function GripSizeCalculator() {
  const [gripData, setGripData] = useState<GripSizeData>({
    handLength: 0,
    handSpan: 0,
    playingStyle: '',
    swingSpeed: '',
    feelPreference: '',
    handStrength: ''
  })

  const [showResults, setShowResults] = useState(false)

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('weltonGolf_gripSizeData')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setGripData(parsed)
        if (parsed.handLength > 0 && parsed.handSpan > 0) {
          setShowResults(true)
        }
      } catch (error) {
        console.error('Error loading saved grip size data:', error)
      }
    }
  }, [])

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem('weltonGolf_gripSizeData', JSON.stringify(gripData))
  }, [gripData])

  const gripRecommendation = useMemo(() => {
    if (gripData.handLength === 0 || gripData.handSpan === 0) {
      return null
    }

    // Base grip size calculation using hand measurements
    const handLengthInches = gripData.handLength / 25.4 // Convert mm to inches
    const handSpanInches = gripData.handSpan / 25.4 // Convert mm to inches

    // Primary sizing based on hand length (most important factor)
    let baseSize = 'Standard'
    if (handLengthInches < 7.0) {
      baseSize = 'Undersize'
    } else if (handLengthInches >= 7.0 && handLengthInches < 8.0) {
      baseSize = 'Standard'
    } else if (handLengthInches >= 8.0 && handLengthInches < 9.0) {
      baseSize = 'Midsize'
    } else {
      baseSize = 'Jumbo'
    }

    // Adjust based on hand span
    let spanAdjustment = 0
    if (handSpanInches < 8.5) {
      spanAdjustment = -0.5 // Smaller grip
    } else if (handSpanInches > 10.0) {
      spanAdjustment = 0.5 // Larger grip
    }

    // Factor in playing style
    let styleAdjustment = 0
    if (gripData.playingStyle === 'Control/Precision') {
      styleAdjustment = -0.25 // Slightly smaller for better feel
    } else if (gripData.playingStyle === 'Power/Distance') {
      styleAdjustment = 0.25 // Slightly larger for stability
    }

    // Factor in swing speed
    let speedAdjustment = 0
    if (gripData.swingSpeed === 'Slow (< 85 mph)') {
      speedAdjustment = 0.25 // Larger grip for stability
    } else if (gripData.swingSpeed === 'Very Fast (> 110 mph)') {
      speedAdjustment = 0.25 // Larger grip for control
    }

    // Factor in feel preference
    let feelAdjustment = 0
    if (gripData.feelPreference === 'Firm/Stable') {
      feelAdjustment = 0.25 // Larger grip
    } else if (gripData.feelPreference === 'Soft/Responsive') {
      feelAdjustment = -0.25 // Smaller grip
    }

    // Factor in hand strength
    let strengthAdjustment = 0
    if (gripData.handStrength === 'Weak') {
      strengthAdjustment = 0.5 // Larger grip requires less pressure
    } else if (gripData.handStrength === 'Very Strong') {
      strengthAdjustment = -0.25 // Can handle smaller grip
    }

    // Calculate total adjustment
    const totalAdjustment = spanAdjustment + styleAdjustment + speedAdjustment + feelAdjustment + strengthAdjustment

    // Determine final recommendation
    const sizeMap: { [key: string]: number } = {
      'Undersize': -1,
      'Standard': 0,
      'Midsize': 1,
      'Jumbo': 2
    }

    const baseSizeValue = sizeMap[baseSize]
    const finalSizeValue = Math.round(baseSizeValue + totalAdjustment)

    const finalSizeMap: { [key: number]: string } = {
      [-2]: 'Junior',
      [-1]: 'Undersize',
      [0]: 'Standard',
      [1]: 'Midsize',
      [2]: 'Jumbo',
      [3]: 'Jumbo Plus'
    }

    const recommendedSize = finalSizeMap[Math.max(-2, Math.min(3, finalSizeValue))] || 'Standard'

    // Calculate core size (internal diameter)
    const coreSizeMap: { [key: string]: string } = {
      'Junior': '0.560"',
      'Undersize': '0.580"',
      'Standard': '0.600"',
      'Midsize': '0.620"',
      'Jumbo': '0.640"',
      'Jumbo Plus': '0.660"'
    }

    // Performance benefits
    const getBenefits = (size: string) => {
      switch (size) {
        case 'Junior':
        case 'Undersize':
          return ['Enhanced feel and touch', 'Better wrist action', 'Increased shot shaping ability', 'Lighter swing weight feel']
        case 'Standard':
          return ['Balanced feel and control', 'Versatile for most golfers', 'Good for neutral grip pressure', 'Widely available options']
        case 'Midsize':
          return ['Reduced grip pressure', 'Better for arthritis/joint issues', 'More stability in hands', 'Reduced hook tendency']
        case 'Jumbo':
        case 'Jumbo Plus':
          return ['Maximum stability', 'Minimal grip pressure needed', 'Reduces overactive hands', 'Great for fast swingers']
        default:
          return []
      }
    }

    // Installation considerations
    const getInstallationTips = (size: string) => {
      if (size === 'Junior' || size === 'Undersize') {
        return 'May require thinner tape or no tape under grip. Professional installation recommended.'
      } else if (size === 'Jumbo' || size === 'Jumbo Plus') {
        return 'May require extra tape wraps. Ensure proper shaft preparation for larger core.'
      } else {
        return 'Standard installation with 1-2 wraps of grip tape depending on shaft size.'
      }
    }

    return {
      recommendedSize,
      coreSize: coreSizeMap[recommendedSize],
      handLengthInches: handLengthInches.toFixed(2),
      handSpanInches: handSpanInches.toFixed(2),
      benefits: getBenefits(recommendedSize),
      installationTips: getInstallationTips(recommendedSize),
      confidence: totalAdjustment === 0 ? 'High' : Math.abs(totalAdjustment) <= 0.5 ? 'Medium' : 'Low'
    }
  }, [gripData])

  const handleCalculate = () => {
    if (gripData.handLength > 0 && gripData.handSpan > 0) {
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setGripData({
      handLength: 0,
      handSpan: 0,
      playingStyle: '',
      swingSpeed: '',
      feelPreference: '',
      handStrength: ''
    })
    setShowResults(false)
    localStorage.removeItem('weltonGolf_gripSizeData')
  }

  return (
    <div className="min-h-screen bg-white ">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div>
          {/* Breadcrumbs */
        <nav className="text-sm text-slate-600 mb-4">
          <ol className="flex space-x-2">
            <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
            <li><span className="mx-2 text-slate-400">›</span>Grip Size Calculator</li>
          </ol>
        </nav>
        </div>

        <div className="text-center mb-8"> {/* Header */}
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Golf Grip Size Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Find your perfect golf grip size based on hand measurements, playing style, and preferences.
            Proper grip size improves feel, control, and overall performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Hand className="h-6 w-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Hand Measurements & Preferences
              </h2>
            </div>

            <div className="space-y-6">
              {/* Hand Length */}
              <div>
                <Label htmlFor="handLength" className="text-sm font-medium text-slate-600">
                  Hand Length (mm) *
                </Label>
                <p className="text-xs text-slate-600 mb-2">
                  Measure from wrist crease to tip of middle finger
                </p>
                <Input
                  id="handLength"
                  type="number"
                  placeholder="e.g., 180"
                  value={gripData.handLength || ''}
                  onChange={(e) => setGripData(prev => ({
                    ...prev,
                    handLength: parseFloat(e.target.value) || 0
                  }))}
                  className="w-full"
                />
              </div>

              {/* Hand Span */}
              <div>
                <Label htmlFor="handSpan" className="text-sm font-medium text-slate-600">
                  Hand Span (mm) *
                </Label>
                <p className="text-xs text-slate-600 mb-2">
                  Measure from thumb tip to pinky tip with hand spread wide
                </p>
                <Input
                  id="handSpan"
                  type="number"
                  placeholder="e.g., 220"
                  value={gripData.handSpan || ''}
                  onChange={(e) => setGripData(prev => ({
                    ...prev,
                    handSpan: parseFloat(e.target.value) || 0
                  }))}
                  className="w-full"
                />
              </div>

              {/* Playing Style */}
              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Playing Style
                </Label>
                <Select
                  value={gripData.playingStyle}
                  onValueChange={(value) => setGripData(prev => ({ ...prev, playingStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your playing style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Control/Precision">Control/Precision</SelectItem>
                    <SelectItem value="Balanced">Balanced</SelectItem>
                    <SelectItem value="Power/Distance">Power/Distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Swing Speed */}
              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Driver Swing Speed
                </Label>
                <Select
                  value={gripData.swingSpeed}
                  onValueChange={(value) => setGripData(prev => ({ ...prev, swingSpeed: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your swing speed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Slow (< 85 mph)">Slow (&lt; 85 mph)</SelectItem>
                    <SelectItem value="Moderate (85-95 mph)">Moderate (85-95 mph)</SelectItem>
                    <SelectItem value="Fast (95-110 mph)">Fast (95-110 mph)</SelectItem>
                    <SelectItem value="Very Fast (> 110 mph)">Very Fast (&gt; 110 mph)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Feel Preference */}
              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Feel Preference
                </Label>
                <Select
                  value={gripData.feelPreference}
                  onValueChange={(value) => setGripData(prev => ({ ...prev, feelPreference: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your feel preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Soft/Responsive">Soft/Responsive</SelectItem>
                    <SelectItem value="Balanced">Balanced</SelectItem>
                    <SelectItem value="Firm/Stable">Firm/Stable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hand Strength */}
              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Hand/Grip Strength
                </Label>
                <Select
                  value={gripData.handStrength}
                  onValueChange={(value) => setGripData(prev => ({ ...prev, handStrength: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your hand strength" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Weak">Weak</SelectItem>
                    <SelectItem value="Average">Average</SelectItem>
                    <SelectItem value="Strong">Strong</SelectItem>
                    <SelectItem value="Very Strong">Very Strong</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleCalculate}
                  disabled={!gripData.handLength || !gripData.handSpan}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg border-0"
                >
                  Calculate Grip Size
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
          {showResults && gripRecommendation && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Grip Size Recommendation
                </h2>
              </div>

              <div className="space-y-6">
                {/* Primary Recommendation */}
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Recommended Grip Size
                  </h3>
                  <div className="text-3xl font-bold text-emerald-700 mb-2">
                    {gripRecommendation.recommendedSize}
                  </div>
                  <div className="text-sm text-slate-700">
                    Core Size: {gripRecommendation.coreSize}
                  </div>
                  <div className="text-sm text-slate-700">
                    Confidence: {gripRecommendation.confidence}
                  </div>
                </div>

                {/* Hand Measurements Summary */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Your Hand Measurements
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-slate-100 rounded">
                      <div className="font-medium text-slate-900">Hand Length</div>
                      <div className="text-slate-700">
                        {gripData.handLength}mm ({gripRecommendation.handLengthInches}&quot;)
                      </div>
                    </div>
                    <div className="p-3 bg-slate-100 rounded">
                      <div className="font-medium text-slate-900">Hand Span</div>
                      <div className="text-slate-700">
                        {gripData.handSpan}mm ({gripRecommendation.handSpanInches}&quot;)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Benefits of This Grip Size
                  </h4>
                  <ul className="space-y-2">
                    {gripRecommendation.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                        <TrendingUp className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Installation Tips */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Installation Notes
                  </h4>
                  <p className="text-sm text-slate-600">
                    {gripRecommendation.installationTips}
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
              <Ruler className="h-5 w-5 text-emerald-600" />
              How to Measure Your Hands
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <strong className="text-slate-900">Hand Length:</strong>
                <p>Place your hand flat on a surface. Measure from the wrist crease (where your hand bends) to the tip of your middle finger. Use a ruler or measuring tape for accuracy.</p>
              </div>
              <div>
                <strong className="text-slate-900">Hand Span:</strong>
                <p>Spread your hand as wide as possible. Measure from the tip of your thumb to the tip of your pinky finger. This measurement helps determine grip circumference needs.</p>
              </div>
              <div>
                <strong className="text-slate-900">Tips:</strong>
                <p>Measure both hands and use the larger measurements. Consider having a professional measure you at a golf shop for the most accurate fitting.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-600" />
              Grip Size Impact on Performance
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <strong className="text-slate-900">Too Small:</strong>
                <p>Causes excessive grip pressure, promotes hooks, can lead to hand fatigue and inconsistent ball striking.</p>
              </div>
              <div>
                <strong className="text-slate-900">Too Large:</strong>
                <p>Reduces feel and touch, can promote slices, makes it harder to release the club properly through impact.</p>
              </div>
              <div>
                <strong className="text-slate-900">Proper Fit:</strong>
                <p>When gripping properly, your middle and ring fingers should just touch your palm. This allows for optimal grip pressure and club control.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="mt-8 p-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Professional Grip Fitting Recommendations
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">When to Get Fitted</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Buying new clubs</li>
                <li>Experiencing hand pain</li>
                <li>Inconsistent ball flight</li>
                <li>After significant weight change</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Grip Materials</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Rubber: Most common, versatile</li>
                <li>Cord: Added texture for grip</li>
                <li>Leather: Traditional feel</li>
                <li>Multi-compound: Performance features</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Maintenance Tips</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Clean regularly with mild soap</li>
                <li>Replace every 1-2 years</li>
                <li>Check for wear and slickness</li>
                <li>Store in dry conditions</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}