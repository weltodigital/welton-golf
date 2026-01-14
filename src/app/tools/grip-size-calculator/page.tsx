'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Hand, Target } from 'lucide-react'

export default function GripSizeCalculator() {
  const [handLength, setHandLength] = useState('')
  const [handSpan, setHandSpan] = useState('')
  const [playingStyle, setPlayingStyle] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [recommendedSize, setRecommendedSize] = useState('')

  const calculateGripSize = () => {
    if (!handLength || !handSpan) return

    const lengthMm = parseFloat(handLength)
    const spanMm = parseFloat(handSpan)

    // Basic grip size calculation
    if (lengthMm < 170) {
      setRecommendedSize('Undersize')
    } else if (lengthMm < 190) {
      setRecommendedSize('Standard')
    } else if (lengthMm < 210) {
      setRecommendedSize('Midsize')
    } else {
      setRecommendedSize('Jumbo')
    }

    setShowResults(true)
  }

  const handleReset = () => {
    setHandLength('')
    setHandSpan('')
    setPlayingStyle('')
    setShowResults(false)
    setRecommendedSize('')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm text-slate-600 mb-4">
          <ol className="flex space-x-2">
            <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
            <li><span className="mx-2 text-slate-400">Grip Size Calculator</span></li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-4">
            Golf Grip Size Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Find your perfect golf grip size based on hand measurements, playing style, and preferences.
            Proper grip size improves feel, control, and overall performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Hand className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-semibold text-slate-900">
                Hand Measurements
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="handLength" className="text-sm font-medium text-slate-600">
                  Hand Length (mm)
                </Label>
                <p className="text-xs text-slate-600 mb-2">
                  Measure from wrist crease to tip of middle finger
                </p>
                <Input
                  id="handLength"
                  type="number"
                  placeholder="e.g., 180"
                  value={handLength}
                  onChange={(e) => setHandLength(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="handSpan" className="text-sm font-medium text-slate-600">
                  Hand Span (mm)
                </Label>
                <p className="text-xs text-slate-600 mb-2">
                  Measure from thumb tip to pinky tip with hand spread wide
                </p>
                <Input
                  id="handSpan"
                  type="number"
                  placeholder="e.g., 220"
                  value={handSpan}
                  onChange={(e) => setHandSpan(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Playing Style
                </Label>
                <Select value={playingStyle} onValueChange={setPlayingStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your playing style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Control">Control/Precision</SelectItem>
                    <SelectItem value="Balanced">Balanced</SelectItem>
                    <SelectItem value="Power">Power/Distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={calculateGripSize}
                  disabled={!handLength || !handSpan}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
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

          {showResults && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Target className="h-6 w-6 text-emerald-600" />
                <h2 className="text-2xl font-semibold text-slate-900">
                  Grip Size Recommendation
                </h2>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Recommended Grip Size
                  </h3>
                  <div className="text-3xl font-bold text-emerald-700 mb-2">
                    {recommendedSize}
                  </div>
                  <div className="text-sm text-slate-700">
                    Based on hand length: {handLength}mm
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Your Hand Measurements
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-slate-100 rounded">
                      <div className="font-medium text-slate-900">Hand Length</div>
                      <div className="text-slate-700">{handLength}mm</div>
                    </div>
                    <div className="p-3 bg-slate-100 rounded">
                      <div className="font-medium text-slate-900">Hand Span</div>
                      <div className="text-slate-700">{handSpan}mm</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Benefits of This Grip Size
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Enhanced feel and control</li>
                    <li>• Improved consistency</li>
                    <li>• Better comfort during play</li>
                    <li>• Reduced grip pressure needed</li>
                  </ul>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              How to Measure Your Hands
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <strong className="text-slate-900">Hand Length:</strong>
                <p>Place your hand flat on a surface. Measure from the wrist crease to the tip of your middle finger.</p>
              </div>
              <div>
                <strong className="text-slate-900">Hand Span:</strong>
                <p>Spread your hand as wide as possible. Measure from the tip of your thumb to the tip of your pinky finger.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Grip Size Impact
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <strong className="text-slate-900">Too Small:</strong>
                <p>Causes excessive grip pressure, promotes hooks, leads to hand fatigue.</p>
              </div>
              <div>
                <strong className="text-slate-900">Too Large:</strong>
                <p>Reduces feel and touch, can promote slices, makes release difficult.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}