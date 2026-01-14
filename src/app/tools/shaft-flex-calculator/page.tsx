'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Zap, Target } from 'lucide-react'

export default function ShaftFlexCalculator() {
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

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm text-slate-600 mb-4">
          <ol className="flex space-x-2">
            <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
            <li><span className="mx-2 text-slate-400">Shaft Flex Calculator</span></li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-4">
            Golf Shaft Flex Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Find your optimal shaft flex based on swing speed, ball flight, and playing characteristics.
            Proper shaft flex improves distance, accuracy, and overall performance.
          </p>
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
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Recommended Shaft Flex
                  </h3>
                  <div className="text-3xl font-bold text-emerald-700 mb-2">
                    {recommendedFlex}
                  </div>
                  <div className="text-sm text-slate-700">
                    Swing Speed Range: {getSwingSpeedRange(recommendedFlex)}
                  </div>
                  <div className="text-sm text-slate-700">
                    Your Speed: {swingSpeed} mph
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Performance Characteristics
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-slate-100 rounded">
                      <div className="font-medium text-slate-900">Launch</div>
                      <div className="text-slate-700">
                        {recommendedFlex === 'Ladies' || recommendedFlex === 'Senior' ? 'High' :
                         recommendedFlex === 'Regular' ? 'Medium' : 'Low'}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-100 rounded">
                      <div className="font-medium text-slate-900">Feel</div>
                      <div className="text-slate-700">
                        {recommendedFlex === 'Ladies' || recommendedFlex === 'Senior' ? 'Soft' :
                         recommendedFlex === 'Regular' ? 'Balanced' : 'Firm'}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Expected Performance
                  </h4>
                  <p className="text-sm text-slate-600">
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

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Understanding Shaft Flex
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <strong className="text-slate-900">Shaft Flex Basics:</strong>
                <p>Shaft flex refers to how much the shaft bends during the swing. The right flex helps optimize launch conditions and overall performance.</p>
              </div>
              <div>
                <strong className="text-slate-900">Flex Options:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
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
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Impact of Wrong Flex
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <strong className="text-slate-900">Too Stiff:</strong>
                <p>Low ball flight, slice tendency, loss of distance, difficulty getting ball airborne.</p>
              </div>
              <div>
                <strong className="text-slate-900">Too Soft:</strong>
                <p>High ball flight, hook tendency, loss of accuracy, inconsistent contact.</p>
              </div>
              <div>
                <strong className="text-slate-900">Proper Fit:</strong>
                <p>Optimal launch angle, good feel, improved accuracy, maximum distance for your swing speed.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}