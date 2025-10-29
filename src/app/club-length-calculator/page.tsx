'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Ruler, Target, TrendingUp, Settings } from 'lucide-react'

interface ClubLengthData {
  height: number
  wristToFloor: number
  armLength: number
  swingPlane: string
  playingStyle: string
  physicalLimitations: string
  clubType: string
  currentLength: number
}

interface ClubRecommendations {
  [key: string]: {
    standardLength: number
    recommendedLength: number
    adjustment: number
  }
}

export default function ClubLengthCalculator() {
  const [lengthData, setLengthData] = useState<ClubLengthData>({
    height: 0,
    wristToFloor: 0,
    armLength: 0,
    swingPlane: '',
    playingStyle: '',
    physicalLimitations: '',
    clubType: '',
    currentLength: 0
  })

  const [showResults, setShowResults] = useState(false)

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('weltonGolf_clubLengthData')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setLengthData(parsed)
        if (parsed.height > 0 && parsed.wristToFloor > 0) {
          setShowResults(true)
        }
      } catch (error) {
        console.error('Error loading saved club length data:', error)
      }
    }
  }, [])

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem('weltonGolf_clubLengthData', JSON.stringify(lengthData))
  }, [lengthData])

  const clubRecommendations = useMemo(() => {
    if (lengthData.height === 0 || lengthData.wristToFloor === 0) {
      return null
    }

    // Convert measurements to inches if needed
    const heightInches = lengthData.height > 100 ? lengthData.height / 2.54 : lengthData.height
    const wristToFloorInches = lengthData.wristToFloor > 50 ? lengthData.wristToFloor / 2.54 : lengthData.wristToFloor

    // Standard club lengths (in inches)
    const standardLengths = {
      'Driver': 45.0,
      '3-Wood': 43.0,
      '5-Wood': 42.0,
      '3-Hybrid': 40.0,
      '4-Hybrid': 39.5,
      '5-Hybrid': 39.0,
      '3-Iron': 39.0,
      '4-Iron': 38.5,
      '5-Iron': 38.0,
      '6-Iron': 37.5,
      '7-Iron': 37.0,
      '8-Iron': 36.5,
      '9-Iron': 36.0,
      'Pitching Wedge': 35.5,
      'Sand Wedge': 35.25,
      'Lob Wedge': 35.0,
      'Putter': 35.0
    }

    // Height and wrist-to-floor based adjustment
    let baseAdjustment = 0

    // Primary method: Wrist-to-floor measurement
    if (wristToFloorInches < 29) {
      baseAdjustment = -1.5 // Much shorter clubs
    } else if (wristToFloorInches < 31) {
      baseAdjustment = -1.0 // Shorter clubs
    } else if (wristToFloorInches < 33) {
      baseAdjustment = -0.5 // Slightly shorter
    } else if (wristToFloorInches <= 36) {
      baseAdjustment = 0 // Standard length
    } else if (wristToFloorInches <= 38) {
      baseAdjustment = 0.5 // Slightly longer
    } else if (wristToFloorInches <= 40) {
      baseAdjustment = 1.0 // Longer clubs
    } else {
      baseAdjustment = 1.5 // Much longer clubs
    }

    // Height-based cross-check and adjustment
    let heightAdjustment = 0
    if (heightInches < 62) {
      heightAdjustment = -0.5
    } else if (heightInches < 66) {
      heightAdjustment = -0.25
    } else if (heightInches <= 72) {
      heightAdjustment = 0
    } else if (heightInches <= 76) {
      heightAdjustment = 0.25
    } else {
      heightAdjustment = 0.5
    }

    // Swing plane adjustment
    let swingPlaneAdjustment = 0
    if (lengthData.swingPlane === 'Very Upright') {
      swingPlaneAdjustment = -0.25 // Shorter clubs for upright swing
    } else if (lengthData.swingPlane === 'Very Flat') {
      swingPlaneAdjustment = 0.25 // Longer clubs for flat swing
    }

    // Playing style adjustment
    let styleAdjustment = 0
    if (lengthData.playingStyle === 'Control/Accuracy') {
      styleAdjustment = -0.25 // Shorter for better control
    } else if (lengthData.playingStyle === 'Distance/Power') {
      styleAdjustment = 0.25 // Longer for distance
    }

    // Physical limitations adjustment
    let limitationsAdjustment = 0
    if (lengthData.physicalLimitations === 'Back Issues') {
      limitationsAdjustment = 0.5 // Longer clubs for less bending
    } else if (lengthData.physicalLimitations === 'Arthritis/Joint Issues') {
      limitationsAdjustment = -0.25 // Shorter for easier handling
    } else if (lengthData.physicalLimitations === 'Limited Flexibility') {
      limitationsAdjustment = 0.25 // Slightly longer
    }

    // Calculate total adjustment
    const totalAdjustment = baseAdjustment + heightAdjustment + swingPlaneAdjustment +
                           styleAdjustment + limitationsAdjustment

    // Apply adjustments to all clubs
    const recommendations: ClubRecommendations = {}

    Object.entries(standardLengths).forEach(([club, standardLength]) => {
      let clubSpecificAdjustment = totalAdjustment

      // Club-specific adjustments
      if (club === 'Driver') {
        // Driver can handle more length variation
        clubSpecificAdjustment = totalAdjustment * 1.2
      } else if (club.includes('Wood') || club.includes('Hybrid')) {
        // Woods and hybrids moderate adjustment
        clubSpecificAdjustment = totalAdjustment * 1.1
      } else if (club.includes('Iron') || club.includes('Wedge')) {
        // Irons and wedges more conservative
        clubSpecificAdjustment = totalAdjustment * 0.9
      } else if (club === 'Putter') {
        // Putter adjustment based mainly on height and posture
        if (heightInches < 66) {
          clubSpecificAdjustment = -1.0
        } else if (heightInches > 74) {
          clubSpecificAdjustment = 1.0
        } else {
          clubSpecificAdjustment = 0
        }
      }

      const recommendedLength = standardLength + clubSpecificAdjustment

      recommendations[club] = {
        standardLength,
        recommendedLength: Math.round(recommendedLength * 4) / 4, // Round to nearest 1/4 inch
        adjustment: Math.round(clubSpecificAdjustment * 4) / 4
      }
    })

    // Calculate fitting confidence
    const getConfidence = () => {
      if (Math.abs(totalAdjustment) <= 0.5) return 'High'
      if (Math.abs(totalAdjustment) <= 1.0) return 'Medium'
      return 'Low - Professional fitting strongly recommended'
    }

    // Get primary recommendations for display
    const getPrimaryClubs = () => {
      return {
        'Driver': recommendations['Driver'],
        '7-Iron': recommendations['7-Iron'],
        'Pitching Wedge': recommendations['Pitching Wedge'],
        'Putter': recommendations['Putter']
      }
    }

    return {
      recommendations,
      primaryClubs: getPrimaryClubs(),
      totalAdjustment: Math.round(totalAdjustment * 4) / 4,
      confidence: getConfidence(),
      heightInches: Math.round(heightInches * 10) / 10,
      wristToFloorInches: Math.round(wristToFloorInches * 10) / 10
    }
  }, [lengthData])

  const handleCalculate = () => {
    if (lengthData.height > 0 && lengthData.wristToFloor > 0) {
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setLengthData({
      height: 0,
      wristToFloor: 0,
      armLength: 0,
      swingPlane: '',
      playingStyle: '',
      physicalLimitations: '',
      clubType: '',
      currentLength: 0
    })
    setShowResults(false)
    localStorage.removeItem('weltonGolf_clubLengthData')
  }

  return (
    <div className=&quot;min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-900 dark:to-slate-800&quot;>
      <div className=&quot;container mx-auto px-4 py-8 max-w-6xl&quot;>
        {/* Header */}
        <div className=&quot;text-center mb-8&quot;>
          <h1 className=&quot;text-4xl font-bold text-slate-900 dark:text-white mb-4 font-cooper&quot;>
            Golf Club Length Calculator
          </h1>
          <p className=&quot;text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto&quot;>
            Determine your optimal club lengths based on body measurements, swing characteristics, and playing style.
            Proper club length improves consistency, accuracy, and overall performance.
          </p>
        </div>

        <div className=&quot;grid lg:grid-cols-2 gap-8&quot;>
          {/* Input Form */}
          <Card className=&quot;p-6&quot;>
            <div className=&quot;flex items-center gap-2 mb-6&quot;>
              <Ruler className=&quot;h-6 w-6&quot; style={{color: '#9CC69B'}} />
              <h2 className=&quot;text-2xl font-semibold text-slate-900 dark:text-white&quot;>
                Body Measurements & Preferences
              </h2>
            </div>

            <div className=&quot;space-y-6&quot;>
              {/* Height */}
              <div>
                <Label htmlFor=&quot;height&quot; className=&quot;text-sm font-medium text-slate-700 dark:text-slate-300&quot;>
                  Height *
                </Label>
                <p className=&quot;text-xs text-slate-500 dark:text-slate-400 mb-2&quot;>
                  Enter in inches (e.g., 70) or centimeters (e.g., 178)
                </p>
                <Input
                  id=&quot;height&quot;
                  type=&quot;number&quot;
                  placeholder=&quot;e.g., 70 inches or 178 cm&quot;
                  value={lengthData.height || ''}
                  onChange={(e) => setLengthData(prev => ({
                    ...prev,
                    height: parseFloat(e.target.value) || 0
                  }))}
                  className=&quot;w-full&quot;
                />
              </div>

              {/* Wrist to Floor */}
              <div>
                <Label htmlFor=&quot;wristToFloor&quot; className=&quot;text-sm font-medium text-slate-700 dark:text-slate-300&quot;>
                  Wrist to Floor Distance *
                </Label>
                <p className=&quot;text-xs text-slate-500 dark:text-slate-400 mb-2&quot;>
                  Stand naturally, arms at sides. Measure from wrist crease to floor (inches or cm)
                </p>
                <Input
                  id=&quot;wristToFloor&quot;
                  type=&quot;number&quot;
                  placeholder=&quot;e.g., 34 inches or 86 cm&quot;
                  value={lengthData.wristToFloor || ''}
                  onChange={(e) => setLengthData(prev => ({
                    ...prev,
                    wristToFloor: parseFloat(e.target.value) || 0
                  }))}
                  className=&quot;w-full&quot;
                />
              </div>

              {/* Swing Plane */}
              <div>
                <Label className=&quot;text-sm font-medium text-slate-700 dark:text-slate-300&quot;>
                  Natural Swing Plane
                </Label>
                <Select
                  value={lengthData.swingPlane}
                  onValueChange={(value) => setLengthData(prev => ({ ...prev, swingPlane: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder=&quot;Select your natural swing plane&quot; />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=&quot;Very Upright&quot;>Very Upright</SelectItem>
                    <SelectItem value=&quot;Upright&quot;>Upright</SelectItem>
                    <SelectItem value=&quot;Standard&quot;>Standard</SelectItem>
                    <SelectItem value=&quot;Flat&quot;>Flat</SelectItem>
                    <SelectItem value=&quot;Very Flat&quot;>Very Flat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Playing Style */}
              <div>
                <Label className=&quot;text-sm font-medium text-slate-700 dark:text-slate-300&quot;>
                  Playing Style Priority
                </Label>
                <Select
                  value={lengthData.playingStyle}
                  onValueChange={(value) => setLengthData(prev => ({ ...prev, playingStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder=&quot;Select your playing priority&quot; />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=&quot;Control/Accuracy&quot;>Control/Accuracy</SelectItem>
                    <SelectItem value=&quot;Balanced&quot;>Balanced</SelectItem>
                    <SelectItem value=&quot;Distance/Power&quot;>Distance/Power</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Physical Limitations */}
              <div>
                <Label className=&quot;text-sm font-medium text-slate-700 dark:text-slate-300&quot;>
                  Physical Considerations
                </Label>
                <Select
                  value={lengthData.physicalLimitations}
                  onValueChange={(value) => setLengthData(prev => ({ ...prev, physicalLimitations: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder=&quot;Select any physical considerations&quot; />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=&quot;None&quot;>None</SelectItem>
                    <SelectItem value=&quot;Back Issues&quot;>Back Issues</SelectItem>
                    <SelectItem value=&quot;Arthritis/Joint Issues&quot;>Arthritis/Joint Issues</SelectItem>
                    <SelectItem value=&quot;Limited Flexibility&quot;>Limited Flexibility</SelectItem>
                    <SelectItem value=&quot;Shoulder Issues&quot;>Shoulder Issues</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Current Club Length (Optional) */}
              <div>
                <Label htmlFor=&quot;currentLength&quot; className=&quot;text-sm font-medium text-slate-700 dark:text-slate-300&quot;>
                  Current 7-Iron Length (Optional)
                </Label>
                <p className=&quot;text-xs text-slate-500 dark:text-slate-400 mb-2&quot;>
                  If known, enter your current 7-iron length for comparison
                </p>
                <Input
                  id=&quot;currentLength&quot;
                  type=&quot;number&quot;
                  step=&quot;0.25&quot;
                  placeholder=&quot;e.g., 37.0&quot;
                  value={lengthData.currentLength || ''}
                  onChange={(e) => setLengthData(prev => ({
                    ...prev,
                    currentLength: parseFloat(e.target.value) || 0
                  }))}
                  className=&quot;w-full&quot;
                />
              </div>

              {/* Buttons */}
              <div className=&quot;flex gap-3 pt-4&quot;>
                <Button
                  onClick={handleCalculate}
                  disabled={!lengthData.height || !lengthData.wristToFloor}
                  className=&quot;flex-1 text-white&quot;
                  style={{backgroundColor: '#183a37'}}
                >
                  Calculate Club Lengths
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
          {showResults && clubRecommendations && (
            <Card className=&quot;p-6&quot;>
              <div className=&quot;flex items-center gap-2 mb-6&quot;>
                <Target className=&quot;h-6 w-6&quot; style={{color: '#9CC69B'}} />
                <h2 className=&quot;text-2xl font-semibold text-slate-900 dark:text-white&quot;>
                  Club Length Recommendations
                </h2>
              </div>

              <div className=&quot;space-y-6&quot;>
                {/* Summary */}
                <div className=&quot;p-4 rounded-lg border-2&quot; style={{backgroundColor: '#9CC69B', borderColor: '#183a37'}}>
                  <h3 className=&quot;text-xl font-bold mb-2&quot; style={{color: '#183a37'}}>
                    Length Adjustment Summary
                  </h3>
                  <div className=&quot;text-2xl font-bold text-white mb-2&quot;>
                    {clubRecommendations.totalAdjustment > 0 ? '+' : ''}{clubRecommendations.totalAdjustment}&quot;
                  </div>
                  <div className=&quot;text-sm&quot; style={{color: '#183a37'}}>
                    {clubRecommendations.totalAdjustment > 0 ? 'Longer than standard' :
                     clubRecommendations.totalAdjustment < 0 ? 'Shorter than standard' : 'Standard length'}
                  </div>
                  <div className=&quot;text-sm&quot; style={{color: '#183a37'}}>
                    Confidence: {clubRecommendations.confidence}
                  </div>
                </div>

                {/* Body Measurements Summary */}
                <div>
                  <h4 className=&quot;font-semibold text-slate-900 dark:text-white mb-3&quot;>
                    Your Measurements
                  </h4>
                  <div className=&quot;grid grid-cols-2 gap-4 text-sm&quot;>
                    <div className=&quot;p-3 bg-slate-100 dark:bg-slate-700 rounded&quot;>
                      <div className=&quot;font-medium text-slate-900 dark:text-white&quot;>Height</div>
                      <div className=&quot;text-slate-600 dark:text-slate-300&quot;>
                        {clubRecommendations.heightInches}&quot; ({Math.round(clubRecommendations.heightInches * 2.54)}cm)
                      </div>
                    </div>
                    <div className=&quot;p-3 bg-slate-100 dark:bg-slate-700 rounded&quot;>
                      <div className=&quot;font-medium text-slate-900 dark:text-white&quot;>Wrist to Floor</div>
                      <div className=&quot;text-slate-600 dark:text-slate-300&quot;>
                        {clubRecommendations.wristToFloorInches}&quot; ({Math.round(clubRecommendations.wristToFloorInches * 2.54)}cm)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Club Recommendations */}
                <div>
                  <h4 className=&quot;font-semibold text-slate-900 dark:text-white mb-3&quot;>
                    Key Club Recommendations
                  </h4>
                  <div className=&quot;space-y-3&quot;>
                    {Object.entries(clubRecommendations.primaryClubs).map(([club, data]) => (
                      <div key={club} className=&quot;flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded&quot;>
                        <div>
                          <div className=&quot;font-medium text-slate-900 dark:text-white&quot;>{club}</div>
                          <div className=&quot;text-xs text-slate-600 dark:text-slate-400&quot;>
                            Standard: {data.standardLength}&quot;
                          </div>
                        </div>
                        <div className=&quot;text-right&quot;>
                          <div className=&quot;font-bold&quot; style={{color: '#183a37'}}>
                            {data.recommendedLength}&quot;
                          </div>
                          <div className=&quot;text-xs text-slate-600 dark:text-slate-400&quot;>
                            ({data.adjustment > 0 ? '+' : ''}{data.adjustment}&quot;)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Club Comparison */}
                {lengthData.currentLength > 0 && (
                  <div>
                    <h4 className=&quot;font-semibold text-slate-900 dark:text-white mb-2&quot;>
                      Current vs Recommended 7-Iron
                    </h4>
                    <div className=&quot;p-3 bg-slate-50 dark:bg-slate-700 rounded&quot;>
                      <div className=&quot;flex justify-between&quot;>
                        <span>Current Length:</span>
                        <span>{lengthData.currentLength}&quot;</span>
                      </div>
                      <div className=&quot;flex justify-between&quot;>
                        <span>Recommended:</span>
                        <span className=&quot;font-bold&quot; style={{color: '#183a37'}}>
                          {clubRecommendations.primaryClubs['7-Iron'].recommendedLength}&quot;
                        </span>
                      </div>
                      <div className=&quot;flex justify-between text-sm&quot;>
                        <span>Difference:</span>
                        <span>
                          {(clubRecommendations.primaryClubs['7-Iron'].recommendedLength - lengthData.currentLength).toFixed(2)}&quot;
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Full Club Set Recommendations */}
        {showResults && clubRecommendations && (
          <Card className=&quot;mt-8 p-6&quot;>
            <div className=&quot;flex items-center gap-2 mb-6&quot;>
              <Settings className=&quot;h-6 w-6&quot; style={{color: '#9CC69B'}} />
              <h3 className=&quot;text-2xl font-semibold text-slate-900 dark:text-white&quot;>
                Complete Club Set Recommendations
              </h3>
            </div>

            <div className=&quot;grid md:grid-cols-2 lg:grid-cols-3 gap-4&quot;>
              {Object.entries(clubRecommendations.recommendations).map(([club, data]) => (
                <div key={club} className=&quot;p-4 border border-slate-200 dark:border-slate-600 rounded-lg&quot;>
                  <div className=&quot;font-semibold text-slate-900 dark:text-white mb-2&quot;>{club}</div>
                  <div className=&quot;space-y-1 text-sm&quot;>
                    <div className=&quot;flex justify-between&quot;>
                      <span className=&quot;text-slate-600 dark:text-slate-400&quot;>Standard:</span>
                      <span>{data.standardLength}&quot;</span>
                    </div>
                    <div className=&quot;flex justify-between&quot;>
                      <span className=&quot;text-slate-600 dark:text-slate-400&quot;>Recommended:</span>
                      <span className=&quot;font-bold&quot; style={{color: '#183a37'}}>{data.recommendedLength}&quot;</span>
                    </div>
                    <div className=&quot;flex justify-between&quot;>
                      <span className=&quot;text-slate-600 dark:text-slate-400&quot;>Adjustment:</span>
                      <span className={data.adjustment >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {data.adjustment > 0 ? '+' : ''}{data.adjustment}&quot;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Educational Content */}
        <div className=&quot;mt-12 grid md:grid-cols-2 gap-8&quot;>
          <Card className=&quot;p-6&quot;>
            <h3 className=&quot;text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2&quot;>
              <Ruler className=&quot;h-5 w-5&quot; style={{color: '#9CC69B'}} />
              How to Measure Properly
            </h3>
            <div className=&quot;space-y-4 text-sm text-slate-700 dark:text-slate-300&quot;>
              <div>
                <strong className=&quot;text-slate-900 dark:text-white&quot;>Wrist-to-Floor Measurement:</strong>
                <p>Stand upright in golf shoes (or add 1&quot; if barefoot). Let arms hang naturally at your sides. Measure from the prominent wrist bone to the floor. This is the most important measurement for club length.</p>
              </div>
              <div>
                <strong className=&quot;text-slate-900 dark:text-white&quot;>Height Measurement:</strong>
                <p>Stand against a wall without shoes. Mark the top of your head and measure from floor to mark. Used as a cross-check with wrist-to-floor measurement.</p>
              </div>
              <div>
                <strong className=&quot;text-slate-900 dark:text-white&quot;>Professional Measurement:</strong>
                <p>For best results, have a golf professional measure you during a fitting session with proper equipment and technique.</p>
              </div>
            </div>
          </Card>

          <Card className=&quot;p-6&quot;>
            <h3 className=&quot;text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2&quot;>
              <TrendingUp className=&quot;h-5 w-5&quot; style={{color: '#9CC69B'}} />
              Impact of Club Length
            </h3>
            <div className=&quot;space-y-4 text-sm text-slate-700 dark:text-slate-300&quot;>
              <div>
                <strong className=&quot;text-slate-900 dark:text-white&quot;>Too Long:</strong>
                <p>Difficulty making solid contact, inconsistent ball striking, tendency to hit fat shots, loss of accuracy and control.</p>
              </div>
              <div>
                <strong className=&quot;text-slate-900 dark:text-white&quot;>Too Short:</strong>
                <p>Hunched posture, back strain, inconsistent swing plane, reduced distance potential, early fatigue.</p>
              </div>
              <div>
                <strong className=&quot;text-slate-900 dark:text-white&quot;>Proper Length:</strong>
                <p>Natural posture, consistent contact, optimal swing plane, better accuracy, reduced physical strain, improved performance.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className=&quot;mt-8 p-6&quot;>
          <h3 className=&quot;text-xl font-semibold text-slate-900 dark:text-white mb-4&quot;>
            Professional Club Fitting Considerations
          </h3>
          <div className=&quot;grid md:grid-cols-3 gap-6 text-sm text-slate-700 dark:text-slate-300&quot;>
            <div>
              <h4 className=&quot;font-semibold text-slate-900 dark:text-white mb-2&quot;>Length Affects</h4>
              <ul className=&quot;space-y-1 list-disc list-inside&quot;>
                <li>Swing plane and posture</li>
                <li>Contact consistency</li>
                <li>Distance and accuracy</li>
                <li>Comfort and fatigue</li>
                <li>Ball flight characteristics</li>
              </ul>
            </div>
            <div>
              <h4 className=&quot;font-semibold text-slate-900 dark:text-white mb-2&quot;>Fitting Process</h4>
              <ul className=&quot;space-y-1 list-disc list-inside&quot;>
                <li>Static measurements</li>
                <li>Dynamic swing analysis</li>
                <li>Ball striking assessment</li>
                <li>Impact tape testing</li>
                <li>Launch monitor data</li>
              </ul>
            </div>
            <div>
              <h4 className=&quot;font-semibold text-slate-900 dark:text-white mb-2&quot;>Adjustment Methods</h4>
              <ul className=&quot;space-y-1 list-disc list-inside&quot;>
                <li>Shaft extension/trimming</li>
                <li>Grip adjustment</li>
                <li>Lie angle changes</li>
                <li>Swing weight balancing</li>
                <li>Progressive length matching</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}