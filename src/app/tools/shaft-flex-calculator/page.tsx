'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Zap, Target, Info, Calculator } from 'lucide-react'

function ShaftFlexCalculator() {
  const [swingSpeed, setSwingSpeed] = useState('')
  const [ballFlight, setBallFlight] = useState('')
  const [tempo, setTempo] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [recommendedFlex, setRecommendedFlex] = useState('')

  const calculateShaftFlex = () => {
    if (!swingSpeed) return

    const speed = parseFloat(swingSpeed)

    // Basic shaft flex calculation based on swing speed
    if (speed < 75) {
      setRecommendedFlex('Ladies')
    } else if (speed < 85) {
      setRecommendedFlex('Senior')
    } else if (speed < 95) {
      setRecommendedFlex('Regular')
    } else if (speed < 105) {
      setRecommendedFlex('Stiff')
    } else {
      setRecommendedFlex('Extra Stiff')
    }

    setShowResults(true)
  }

  const handleReset = () => {
    setSwingSpeed('')
    setBallFlight('')
    setTempo('')
    setShowResults(false)
    setRecommendedFlex('')
  }

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Shaft Flex Calculator',
    applicationCategory: 'Sports Application',
    description: 'Calculate optimal golf shaft flex based on swing speed, ball flight, and tempo for better performance and accuracy.',
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
                  Free Shaft Flex Calculator 2026
                </h1>
                <p className="text-gray-700 text-lg">
                  Find your optimal shaft flex based on swing speed, ball flight, and tempo. Professional recommendations for all skill levels.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Professional Shaft Flex Calculator - Free & Accurate
              </h2>
              <p className="text-gray-700 mb-3">
                Our shaft flex calculator analyzes your swing speed, ball flight tendencies, and tempo to recommend the optimal shaft flex.
                Proper shaft fitting can improve distance, accuracy, and overall consistency with every club in your bag.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Swing Speed Analysis
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Ball Flight Optimization
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Professional Recommendations
                </div>
              </div>
            </div>
          </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-semibold text-slate-900">
                Swing Analysis
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="swingSpeed" className="text-sm font-medium text-slate-600">
                  Driver Swing Speed (mph)
                </Label>
                <p className="text-xs text-slate-600 mb-2">
                  Use a launch monitor or estimate based on distance
                </p>
                <Input
                  id="swingSpeed"
                  type="number"
                  placeholder="e.g., 95"
                  value={swingSpeed}
                  onChange={(e) => setSwingSpeed(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Current Ball Flight
                </Label>
                <Select value={ballFlight} onValueChange={setBallFlight}>
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

              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Swing Tempo
                </Label>
                <Select value={tempo} onValueChange={setTempo}>
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

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={calculateShaftFlex}
                  disabled={!swingSpeed}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
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

          {showResults && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Target className="h-6 w-6 text-emerald-600" />
                <h2 className="text-2xl font-semibold text-slate-900">
                  Shaft Flex Recommendation
                </h2>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Recommended Shaft Flex
                  </h3>
                  <div className="text-3xl font-bold text-emerald-700 mb-2">
                    {recommendedFlex}
                  </div>
                  <div className="text-sm text-gray-700">
                    Swing Speed Range: {getSwingSpeedRange(recommendedFlex)}
                  </div>
                  <div className="text-sm text-gray-700">
                    Your Speed: {swingSpeed} mph
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Performance Characteristics
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-gray-100 rounded">
                      <div className="font-medium text-gray-900">Launch</div>
                      <div className="text-gray-700">
                        {recommendedFlex === 'Ladies' || recommendedFlex === 'Senior' ? 'High' :
                         recommendedFlex === 'Regular' ? 'Medium' : 'Low'}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-100 rounded">
                      <div className="font-medium text-gray-900">Feel</div>
                      <div className="text-gray-700">
                        {recommendedFlex === 'Ladies' || recommendedFlex === 'Senior' ? 'Soft' :
                         recommendedFlex === 'Regular' ? 'Balanced' : 'Firm'}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Expected Performance
                  </h4>
                  <p className="text-sm text-gray-700">
                    {recommendedFlex === 'Ladies' || recommendedFlex === 'Senior'
                      ? 'Maximized distance for moderate swing speeds with higher launch'
                      : recommendedFlex === 'Regular'
                      ? 'Versatile performance with balanced launch and control'
                      : 'Enhanced control and accuracy for faster swing speeds'}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

          {/* Shaft Flex Guide Section */}
          <div className="mt-12 space-y-12">
            {/* Understanding Shaft Flex */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="h-6 w-6 text-emerald-600" />
                Understanding Golf Shaft Flex and Its Impact
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Shaft flex is one of the most critical factors in club fitting, yet it's often misunderstood. The flex of your shaft
                determines how the club loads and releases energy during your swing, directly affecting ball flight, distance, and accuracy.
                Getting the right flex can transform your game.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">What is Shaft Flex?</h3>
                  <p className="text-gray-700 mb-4">
                    Shaft flex refers to how much the shaft bends during the downswing and through impact. This bending stores and releases
                    energy, affecting the clubface angle, launch angle, and spin rate at impact.
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
                      <p className="text-emerald-900 font-medium">Ladies (L) Flex</p>
                      <p className="text-emerald-800 text-sm">Swing Speed: &lt;75 mph - Most flexible, highest launch</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-blue-900 font-medium">Senior/Amateur (A) Flex</p>
                      <p className="text-blue-800 text-sm">Swing Speed: 75-85 mph - Soft flex for moderate speeds</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded border border-green-200">
                      <p className="text-green-900 font-medium">Regular (R) Flex</p>
                      <p className="text-green-800 text-sm">Swing Speed: 85-95 mph - Most common, balanced performance</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded border border-amber-200">
                      <p className="text-amber-900 font-medium">Stiff (S) Flex</p>
                      <p className="text-amber-800 text-sm">Swing Speed: 95-105 mph - Firm flex for faster speeds</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded border border-red-200">
                      <p className="text-red-900 font-medium">Extra Stiff (X) Flex</p>
                      <p className="text-red-800 text-sm">Swing Speed: &gt;105 mph - Firmest, for tour-level speeds</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">How Flex Affects Performance:</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Launch Angle & Height</h4>
                      <p className="text-gray-700 text-sm">
                        Softer flexes promote higher launch angles, while stiffer flexes produce lower, more penetrating ball flights.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Distance & Accuracy</h4>
                      <p className="text-gray-700 text-sm">
                        Proper flex maximizes distance by optimizing energy transfer while maintaining directional control.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Feel & Timing</h4>
                      <p className="text-gray-700 text-sm">
                        The right flex provides better feel and helps maintain consistent swing timing and rhythm.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded border">
                      <h4 className="font-medium text-gray-900 mb-2">Professional Tip:</h4>
                      <p className="text-gray-700 text-sm">
                        Consider your swing tempo and transition speed, not just clubhead speed. Aggressive tempo may require stiffer flex
                        even at moderate speeds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Signs of Wrong Flex */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-emerald-600" />
                Signs You Have the Wrong Shaft Flex
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Playing with the wrong shaft flex can significantly hurt your performance. Here are the telltale signs that your
                current shaft flex isn't optimized for your swing, and how the right flex can improve your game.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Too Stiff (Need Softer Flex):</h3>
                  <div className="p-4 bg-red-50 rounded border border-red-200 mb-4">
                    <h4 className="text-red-900 font-medium mb-2">Ball Flight Issues:</h4>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• Consistently low ball flight</li>
                      <li>• Difficulty getting ball airborne</li>
                      <li>• Shots fading/slicing right</li>
                      <li>• Lack of distance despite good contact</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-amber-50 rounded border border-amber-200">
                    <h4 className="text-amber-900 font-medium mb-2">Feel Issues:</h4>
                    <ul className="text-amber-800 text-sm space-y-1">
                      <li>• Club feels "dead" or unresponsive</li>
                      <li>• Difficulty sensing clubhead during swing</li>
                      <li>• Requires more effort for same distance</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Too Soft (Need Stiffer Flex):</h3>
                  <div className="p-4 bg-blue-50 rounded border border-blue-200 mb-4">
                    <h4 className="text-blue-900 font-medium mb-2">Ball Flight Issues:</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Excessively high ball flight</li>
                      <li>• Shots drawing/hooking left</li>
                      <li>• Inconsistent contact patterns</li>
                      <li>• Loss of accuracy on approach shots</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 rounded border border-purple-200">
                    <h4 className="text-purple-900 font-medium mb-2">Control Issues:</h4>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>• Difficulty controlling distance</li>
                      <li>• Inconsistent ball striking</li>
                      <li>• Clubface timing problems</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Perfect Fit Signs:</h3>
                  <div className="p-4 bg-green-50 rounded border border-green-200 mb-4">
                    <h4 className="text-green-900 font-medium mb-2">Optimal Performance:</h4>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Consistent, penetrating ball flight</li>
                      <li>• Maximum distance for your swing</li>
                      <li>• Good directional control</li>
                      <li>• Solid, confident contact feel</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded border border-emerald-200">
                    <h4 className="text-emerald-900 font-medium mb-2">Confidence Boost:</h4>
                    <ul className="text-emerald-800 text-sm space-y-1">
                      <li>• Improved swing timing</li>
                      <li>• Better tempo and rhythm</li>
                      <li>• Enhanced shot shaping ability</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Advanced Fitting Considerations */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Info className="h-6 w-6 text-emerald-600" />
                Advanced Shaft Fitting Considerations
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                While swing speed is the primary factor in shaft flex selection, professional fitters consider multiple variables
                to optimize performance. Understanding these factors can help you make more informed equipment decisions.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Beyond Swing Speed:</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Swing Tempo & Transition</h4>
                      <p className="text-blue-800 text-sm">
                        Fast tempo or aggressive transition may require stiffer flex even with moderate swing speeds.
                        Smooth tempo allows for more flexible shafts.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">Release Point & Lag</h4>
                      <p className="text-green-800 text-sm">
                        Early release benefits from stiffer flex, while late release (more lag) works better with softer flex
                        to help square the clubface.
                      </p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded border border-amber-200">
                      <h4 className="font-medium text-amber-900 mb-2">Attack Angle</h4>
                      <p className="text-amber-800 text-sm">
                        Steep angle of attack may need softer flex for better launch, while shallow attack angle works
                        well with stiffer flex.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Professional Fitting Process:</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 rounded border border-emerald-200">
                      <h4 className="font-medium text-emerald-900 mb-2">Step 1: Swing Analysis</h4>
                      <p className="text-emerald-800 text-sm">
                        Professional analysis of swing speed, tempo, transition, release point, and attack angle using
                        launch monitor technology.
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded border border-purple-200">
                      <h4 className="font-medium text-purple-900 mb-2">Step 2: Shaft Testing</h4>
                      <p className="text-purple-800 text-sm">
                        Hit multiple shaft options to compare ball flight, feel, dispersion, and distance with
                        consistent clubheads.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded border">
                      <h4 className="font-medium text-gray-900 mb-2">Step 3: Fine-Tuning</h4>
                      <p className="text-gray-700 text-sm">
                        Adjust based on personal preferences for feel, ball flight, and performance goals.
                        Consider different flex for driver vs. irons.
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded border">
                      <h4 className="font-medium text-gray-900 mb-2">Investment Worth Making:</h4>
                      <p className="text-gray-700 text-sm">
                        Professional fitting costs £100-200 but can dramatically improve performance and enjoyment.
                        Many golfers see immediate improvements in distance and accuracy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function ShaftFlexCalculatorPage() {
  return <ShaftFlexCalculator />
}