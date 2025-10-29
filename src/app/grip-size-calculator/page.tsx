'use client'

import { useState, useEffect, useMemo } from 'react'
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
      'Junior': '0.560&quot;',
      'Undersize': '0.580&quot;',
      'Standard': '0.600&quot;',
      'Midsize': '0.620&quot;',
      'Jumbo': '0.640&quot;',
      'Jumbo Plus': '0.660&quot;'
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
    <div className=&quot;min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-900 dark:to-slate-800&quot;>
      <div className=&quot;container mx-auto px-4 py-8 max-w-4xl&quot;>
        {/* Header */}
        <div className=&quot;text-center mb-8&quot;>
          <h1 className=&quot;text-4xl font-bold text-slate-900 dark:text-white mb-4 font-cooper&quot;>
            Golf Grip Size Calculator
          </h1>
          <p className=&quot;text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto&quot;>
            Find your perfect golf grip size based on hand measurements, playing style, and preferences.
            Proper grip size improves feel, control, and overall performance.
          </p>
        </div>

        <div className=&quot;grid lg:grid-cols-2 gap-8&quot;>
          {/* Input Form */}
          <Card className=&quot;p-6&quot;>
            <div className=&quot;flex items-center gap-2 mb-6&quot;>
              <Hand className=&quot;h-6 w-6&quot; style={{color: '#9CC69B'}} />
              <h2 className=&quot;text-2xl font-semibold text-slate-900 dark:text-white&quot;>
                Hand Measurements & Preferences
              </h2>
            </div>

            <div className=&quot;space-y-6&quot;>
              {/* Hand Length */}
              <div>
                <Label htmlFor=&quot;handLength&quot; className=&quot;text-sm font-medium text-slate-700 dark:text-slate-300&quot;>
                  Hand Length (mm) *
                </Label>
                <p className=&quot;text-xs text-slate-500 dark:text-slate-400 mb-2&quot;>
                  Measure from wrist crease to tip of middle finger
                </p>
                <Input
                  id=&quot;handLength&quot;
                  type=&quot;number&quot;
                  placeholder=&quot;e.g., 180&quot;
                  value={gripData.handLength || ''}
                  onChange={(e) => setGripData(prev => ({
                    ...prev,
                    handLength: parseFloat(e.target.value) || 0
                  }))}
                  className=&quot;w-full&quot;
                />
              </div>

              {/* Hand Span */}
              <div>
                <Label htmlFor=&quot;handSpan&quot; className=&quot;text-sm font-medium text-slate-700 dark:text-slate-300&quot;>
                  Hand Span (mm) *
                </Label>
                <p className=&quot;text-xs text-slate-500 dark:text-slate-400 mb-2&quot;>
                  Measure from thumb tip to pinky tip with hand spread wide
                </p>
                <Input
                  id=&quot;handSpan&quot;
                  type=&quot;number&quot;
                  placeholder=&quot;e.g., 220&quot;
                  value={gripData.handSpan || ''}
                  onChange={(e) => setGripData(prev => ({
                    ...prev,
                    handSpan: parseFloat(e.target.value) || 0
                  }))}
                  className=&quot;w-full&quot;
                />
              </div>

              {/* Playing Style */}
              <div>
                <Label className=&quot;text-sm font-medium text-slate-700 dark:text-slate-300&quot;>
                  Playing Style
                </Label>
                <Select
                  value={gripData.playingStyle}
                  onValueChange={(value) => setGripData(prev => ({ ...prev, playingStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder=&quot;Select your playing style&quot; />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=&quot;Control/Precision&quot;>Control/Precision</SelectItem>
                    <SelectItem value=&quot;Balanced&quot;>Balanced</SelectItem>
                    <SelectItem value=&quot;Power/Distance&quot;>Power/Distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Swing Speed */}
              <div>
                <Label className=&quot;text-sm font-medium text-slate-700 dark:text-slate-300&quot;>
                  Driver Swing Speed
                </Label>
                <Select
                  value={gripData.swingSpeed}
                  onValueChange={(value) => setGripData(prev => ({ ...prev, swingSpeed: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder=&quot;Select your swing speed&quot; />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=&quot;Slow (< 85 mph)&quot;>Slow (&lt; 85 mph)</SelectItem>
                    <SelectItem value=&quot;Moderate (85-95 mph)&quot;>Moderate (85-95 mph)</SelectItem>
                    <SelectItem value=&quot;Fast (95-110 mph)&quot;>Fast (95-110 mph)</SelectItem>
                    <SelectItem value=&quot;Very Fast (> 110 mph)&quot;>Very Fast (&gt; 110 mph)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Feel Preference */}
              <div>
                <Label className=&quot;text-sm font-medium text-slate-700 dark:text-slate-300&quot;>
                  Feel Preference
                </Label>
                <Select
                  value={gripData.feelPreference}
                  onValueChange={(value) => setGripData(prev => ({ ...prev, feelPreference: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder=&quot;Select your feel preference&quot; />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=&quot;Soft/Responsive&quot;>Soft/Responsive</SelectItem>
                    <SelectItem value=&quot;Balanced&quot;>Balanced</SelectItem>
                    <SelectItem value=&quot;Firm/Stable&quot;>Firm/Stable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hand Strength */}
              <div>
                <Label className=&quot;text-sm font-medium text-slate-700 dark:text-slate-300&quot;>
                  Hand/Grip Strength
                </Label>
                <Select
                  value={gripData.handStrength}
                  onValueChange={(value) => setGripData(prev => ({ ...prev, handStrength: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder=&quot;Select your hand strength&quot; />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=&quot;Weak&quot;>Weak</SelectItem>
                    <SelectItem value=&quot;Average&quot;>Average</SelectItem>
                    <SelectItem value=&quot;Strong&quot;>Strong</SelectItem>
                    <SelectItem value=&quot;Very Strong&quot;>Very Strong</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Buttons */}
              <div className=&quot;flex gap-3 pt-4&quot;>
                <Button
                  onClick={handleCalculate}
                  disabled={!gripData.handLength || !gripData.handSpan}
                  className=&quot;flex-1 text-white&quot;
                  style={{backgroundColor: '#183a37'}}
                >
                  Calculate Grip Size
                </Button>
                <Button
                  onClick={handleReset}
                  variant=&quot;outline&quot;
                  className=&quot;px-6&quot;
                >
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          {/* Results */}
          {showResults && gripRecommendation && (
            <Card className=&quot;p-6&quot;>
              <div className=&quot;flex items-center gap-2 mb-6&quot;>
                <Target className=&quot;h-6 w-6&quot; style={{color: '#9CC69B'}} />
                <h2 className=&quot;text-2xl font-semibold text-slate-900 dark:text-white&quot;>
                  Grip Size Recommendation
                </h2>
              </div>

              <div className=&quot;space-y-6&quot;>
                {/* Primary Recommendation */}
                <div className=&quot;p-4 rounded-lg border-2&quot; style={{backgroundColor: '#9CC69B', borderColor: '#183a37'}}>
                  <h3 className=&quot;text-xl font-bold mb-2&quot; style={{color: '#183a37'}}>
                    Recommended Grip Size
                  </h3>
                  <div className=&quot;text-3xl font-bold text-white mb-2&quot;>
                    {gripRecommendation.recommendedSize}
                  </div>
                  <div className=&quot;text-sm&quot; style={{color: '#183a37'}}>
                    Core Size: {gripRecommendation.coreSize}
                  </div>
                  <div className=&quot;text-sm&quot; style={{color: '#183a37'}}>
                    Confidence: {gripRecommendation.confidence}
                  </div>
                </div>

                {/* Hand Measurements Summary */}
                <div>
                  <h4 className=&quot;font-semibold text-slate-900 dark:text-white mb-3&quot;>
                    Your Hand Measurements
                  </h4>
                  <div className=&quot;grid grid-cols-2 gap-4 text-sm&quot;>
                    <div className=&quot;p-3 bg-slate-100 dark:bg-slate-700 rounded&quot;>
                      <div className=&quot;font-medium text-slate-900 dark:text-white&quot;>Hand Length</div>
                      <div className=&quot;text-slate-600 dark:text-slate-300&quot;>
                        {gripData.handLength}mm ({gripRecommendation.handLengthInches}&quot;)
                      </div>
                    </div>
                    <div className=&quot;p-3 bg-slate-100 dark:bg-slate-700 rounded&quot;>
                      <div className=&quot;font-medium text-slate-900 dark:text-white&quot;>Hand Span</div>
                      <div className=&quot;text-slate-600 dark:text-slate-300&quot;>
                        {gripData.handSpan}mm ({gripRecommendation.handSpanInches}&quot;)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className=&quot;font-semibold text-slate-900 dark:text-white mb-3&quot;>
                    Benefits of This Grip Size
                  </h4>
                  <ul className=&quot;space-y-2&quot;>
                    {gripRecommendation.benefits.map((benefit, index) => (
                      <li key={index} className=&quot;flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300&quot;>
                        <TrendingUp className=&quot;h-4 w-4 mt-0.5 flex-shrink-0&quot; style={{color: '#9CC69B'}} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Installation Tips */}
                <div>
                  <h4 className=&quot;font-semibold text-slate-900 dark:text-white mb-2&quot;>
                    Installation Notes
                  </h4>
                  <p className=&quot;text-sm text-slate-700 dark:text-slate-300&quot;>
                    {gripRecommendation.installationTips}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Educational Content */}
        <div className=&quot;mt-12 grid md:grid-cols-2 gap-8&quot;>
          <Card className=&quot;p-6&quot;>
            <h3 className=&quot;text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2&quot;>
              <Ruler className=&quot;h-5 w-5&quot; style={{color: '#9CC69B'}} />
              How to Measure Your Hands
            </h3>
            <div className=&quot;space-y-4 text-sm text-slate-700 dark:text-slate-300&quot;>
              <div>
                <strong className=&quot;text-slate-900 dark:text-white&quot;>Hand Length:</strong>
                <p>Place your hand flat on a surface. Measure from the wrist crease (where your hand bends) to the tip of your middle finger. Use a ruler or measuring tape for accuracy.</p>
              </div>
              <div>
                <strong className=&quot;text-slate-900 dark:text-white&quot;>Hand Span:</strong>
                <p>Spread your hand as wide as possible. Measure from the tip of your thumb to the tip of your pinky finger. This measurement helps determine grip circumference needs.</p>
              </div>
              <div>
                <strong className=&quot;text-slate-900 dark:text-white&quot;>Tips:</strong>
                <p>Measure both hands and use the larger measurements. Consider having a professional measure you at a golf shop for the most accurate fitting.</p>
              </div>
            </div>
          </Card>

          <Card className=&quot;p-6&quot;>
            <h3 className=&quot;text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2&quot;>
              <Target className=&quot;h-5 w-5&quot; style={{color: '#9CC69B'}} />
              Grip Size Impact on Performance
            </h3>
            <div className=&quot;space-y-4 text-sm text-slate-700 dark:text-slate-300&quot;>
              <div>
                <strong className=&quot;text-slate-900 dark:text-white&quot;>Too Small:</strong>
                <p>Causes excessive grip pressure, promotes hooks, can lead to hand fatigue and inconsistent ball striking.</p>
              </div>
              <div>
                <strong className=&quot;text-slate-900 dark:text-white&quot;>Too Large:</strong>
                <p>Reduces feel and touch, can promote slices, makes it harder to release the club properly through impact.</p>
              </div>
              <div>
                <strong className=&quot;text-slate-900 dark:text-white&quot;>Proper Fit:</strong>
                <p>When gripping properly, your middle and ring fingers should just touch your palm. This allows for optimal grip pressure and club control.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className=&quot;mt-8 p-6&quot;>
          <h3 className=&quot;text-xl font-semibold text-slate-900 dark:text-white mb-4&quot;>
            Professional Grip Fitting Recommendations
          </h3>
          <div className=&quot;grid md:grid-cols-3 gap-6 text-sm text-slate-700 dark:text-slate-300&quot;>
            <div>
              <h4 className=&quot;font-semibold text-slate-900 dark:text-white mb-2&quot;>When to Get Fitted</h4>
              <ul className=&quot;space-y-1 list-disc list-inside&quot;>
                <li>Buying new clubs</li>
                <li>Experiencing hand pain</li>
                <li>Inconsistent ball flight</li>
                <li>After significant weight change</li>
              </ul>
            </div>
            <div>
              <h4 className=&quot;font-semibold text-slate-900 dark:text-white mb-2&quot;>Grip Materials</h4>
              <ul className=&quot;space-y-1 list-disc list-inside&quot;>
                <li>Rubber: Most common, versatile</li>
                <li>Cord: Added texture for grip</li>
                <li>Leather: Traditional feel</li>
                <li>Multi-compound: Performance features</li>
              </ul>
            </div>
            <div>
              <h4 className=&quot;font-semibold text-slate-900 dark:text-white mb-2&quot;>Maintenance Tips</h4>
              <ul className=&quot;space-y-1 list-disc list-inside&quot;>
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