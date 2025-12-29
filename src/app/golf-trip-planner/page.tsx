'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, DollarSign } from 'lucide-react'

export default function GolfTripPlanner() {
  const [destination, setDestination] = useState('')
  const [duration, setDuration] = useState('')
  const [groupSize, setGroupSize] = useState('')
  const [budget, setBudget] = useState('')
  const [showResults, setShowResults] = useState(false)

  const handleCalculate = () => {
    if (destination && duration) {
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setDestination('')
    setDuration('')
    setGroupSize('')
    setBudget('')
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <nav className="text-sm text-slate-600 mb-4">
          <ol className="flex space-x-2">
            <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
            <li><span className="mx-2 text-slate-400">Golf Trip Planner</span></li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-4">
            Golf Trip Planner
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Plan your perfect golf getaway with detailed cost breakdowns, recommendations, and itineraries.
            Get accurate budgets for destinations worldwide and optimize your golf travel experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-semibold text-slate-900">
                Trip Details
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-slate-600">
                  Destination
                </Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your golf destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scotland">Scotland</SelectItem>
                    <SelectItem value="Ireland">Ireland</SelectItem>
                    <SelectItem value="Spain">Spain</SelectItem>
                    <SelectItem value="Portugal">Portugal</SelectItem>
                    <SelectItem value="England">England</SelectItem>
                    <SelectItem value="Wales">Wales</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration" className="text-sm font-medium text-slate-600">
                  Trip Duration (nights)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="e.g., 5"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="groupSize" className="text-sm font-medium text-slate-600">
                  Group Size
                </Label>
                <Input
                  id="groupSize"
                  type="number"
                  placeholder="e.g., 4"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="budget" className="text-sm font-medium text-slate-600">
                  Estimated Budget (£)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="e.g., 2000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleCalculate}
                  disabled={!destination || !duration}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Plan Trip
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
                <DollarSign className="h-6 w-6 text-emerald-600" />
                <h2 className="text-2xl font-semibold text-slate-900">
                  Trip Plan & Budget
                </h2>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <h3 className="text-xl font-bold mb-2 text-slate-900">
                    Estimated Trip Cost
                  </h3>
                  <div className="text-3xl font-bold text-emerald-700 mb-2">
                    £{budget || '2,500'}
                  </div>
                  <div className="text-lg font-semibold text-slate-900">
                    £{Math.round((parseFloat(budget) || 2500) / (parseFloat(groupSize) || 4))} per person
                  </div>
                  <div className="text-sm text-slate-700">
                    {groupSize || '4'} people × {duration || '5'} nights
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Trip Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>Destination</span>
                      <span className="font-medium">{destination}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>Duration</span>
                      <span className="font-medium">{duration} nights</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span>Group Size</span>
                      <span className="font-medium">{groupSize || '4'} people</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Planning Tips
            </h3>
            <div className="space-y-3 text-sm text-slate-600">
              <p><strong>Book Early:</strong> Reserve tee times and accommodation 3-6 months in advance.</p>
              <p><strong>Travel Insurance:</strong> Essential for international golf trips.</p>
              <p><strong>Weather Backup:</strong> Have indoor alternatives planned.</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Transport Guide
            </h3>
            <div className="space-y-3 text-sm text-slate-600">
              <p><strong>Car Rental:</strong> Most flexible option for golf courses.</p>
              <p><strong>Private Transfer:</strong> Convenient but more expensive.</p>
              <p><strong>Golf Packages:</strong> Often include transfers between courses.</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Accommodation Tips
            </h3>
            <div className="space-y-3 text-sm text-slate-600">
              <p><strong>Golf Resorts:</strong> Convenient but can be limiting.</p>
              <p><strong>Central Location:</strong> Choose accommodation near courses.</p>
              <p><strong>Self-Catering:</strong> Can reduce meal costs significantly.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}