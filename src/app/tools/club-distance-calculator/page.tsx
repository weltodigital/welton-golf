'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Target } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Golf Club Distance Calculator 2026 - Build Your Personal Yardage Chart | Welton Golf',
  description: 'Create personalized golf club distance charts with carry and total distances. Generate estimated distances based on swing speed or input your actual course measurements.',
  keywords: 'club distance calculator, golf yardage chart, club distance chart, golf club distances, carry distance calculator, golf course management, yardage book, distance tracking',
  openGraph: {
    title: 'Free Golf Club Distance Calculator 2026 - Personal Yardage Charts',
    description: 'Build personalized club distance charts for better course management. Calculate carry and total distances for all your clubs.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/club-distance-calculator',
    images: [
      {
        url: 'https://www.weltongolf.com/club-distance-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Golf Club Distance Calculator - Yardage Charts',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/club-distance-calculator',
  },
}

interface ClubDistance {
  club: string
  carry: number
  total: number
}

interface DistanceSet {
  id: string
  name: string
  swingSpeed: number
  playerLevel: string
  distances: ClubDistance[]
  createdAt: string
}

function ClubDistanceCalculator() {
  const [distanceSets, setDistanceSets] = useState<DistanceSet[]>([])
  const [currentSet, setCurrentSet] = useState({
    name: '',
    swingSpeed: '',
    playerLevel: 'Mid Handicap'
  })
  const [distances, setDistances] = useState<ClubDistance[]>([])
  const [selectedClub, setSelectedClub] = useState('')
  const [carryDistance, setCarryDistance] = useState('')
  const [totalDistance, setTotalDistance] = useState('')

  // Load distance sets from localStorage
  useEffect(() => {
    const savedSets = localStorage.getItem('club-distance-sets')
    if (savedSets) {
      setDistanceSets(JSON.parse(savedSets))
    }
  }, [])

  // Save distance sets to localStorage
  useEffect(() => {
    if (distanceSets.length > 0) {
      localStorage.setItem('club-distance-sets', JSON.stringify(distanceSets))
    }
  }, [distanceSets])

  // Auto-calculate total distance when carry is entered
  useEffect(() => {
    if (carryDistance && selectedClub) {
      const carry = parseFloat(carryDistance)
      if (!isNaN(carry)) {
        const rollFactor = getRollFactor(selectedClub)
        const calculatedTotal = carry + (carry * rollFactor)
        setTotalDistance(Math.round(calculatedTotal).toString())
      }
    }
  }, [carryDistance, selectedClub])

  // Generate distances based on swing speed and player level
  const generateDistances = () => {
    const speed = parseFloat(currentSet.swingSpeed)
    if (!speed) return

    const baseDistances = getBaseDistances(speed, currentSet.playerLevel)
    setDistances(baseDistances)
  }

  // Get base distances for swing speed and skill level
  const getBaseDistances = (swingSpeed: number, playerLevel: string): ClubDistance[] => {
    // Base driver distance calculation
    const driverCarry = Math.round(swingSpeed * 2.3) // Approximate carry distance
    const driverRoll = Math.round(driverCarry * 0.25) // 25% roll for driver
    const driverTotal = driverCarry + driverRoll

    // Skill level modifiers
    const skillModifiers = {
      'Tour Professional': 1.0,
      'Low Handicap': 0.95,
      'Mid Handicap': 0.90,
      'High Handicap': 0.85,
      'Senior/Beginner': 0.80
    }

    const modifier = skillModifiers[playerLevel as keyof typeof skillModifiers] || 0.90

    // Club distance ratios (relative to driver)
    const clubRatios = {
      'Driver': 1.0,
      '3-Wood': 0.85,
      '5-Wood': 0.80,
      '3-Hybrid': 0.75,
      '4-Hybrid': 0.72,
      '5-Hybrid': 0.70,
      '4-Iron': 0.68,
      '5-Iron': 0.65,
      '6-Iron': 0.62,
      '7-Iron': 0.58,
      '8-Iron': 0.54,
      '9-Iron': 0.50,
      'Pitching Wedge': 0.46,
      'Gap Wedge': 0.42,
      'Sand Wedge': 0.38,
      'Lob Wedge': 0.34
    }

    const rollFactors = {
      'Driver': 0.25,
      '3-Wood': 0.20,
      '5-Wood': 0.15,
      '3-Hybrid': 0.12,
      '4-Hybrid': 0.12,
      '5-Hybrid': 0.10,
      '4-Iron': 0.10,
      '5-Iron': 0.08,
      '6-Iron': 0.08,
      '7-Iron': 0.06,
      '8-Iron': 0.05,
      '9-Iron': 0.04,
      'Pitching Wedge': 0.03,
      'Gap Wedge': 0.02,
      'Sand Wedge': 0.02,
      'Lob Wedge': 0.01
    }

    return Object.entries(clubRatios).map(([club, ratio]) => {
      const baseCarry = Math.round(driverCarry * ratio * modifier)
      const rollDistance = Math.round(baseCarry * (rollFactors[club as keyof typeof rollFactors] || 0.05))
      return {
        club,
        carry: baseCarry,
        total: baseCarry + rollDistance
      }
    })
  }

  // Get roll factor for club type
  const getRollFactor = (club: string): number => {
    const rollFactors: { [key: string]: number } = {
      'Driver': 0.25,
      '3-Wood': 0.20,
      '5-Wood': 0.15,
      '3-Hybrid': 0.12,
      '4-Hybrid': 0.12,
      '5-Hybrid': 0.10,
      '4-Iron': 0.10,
      '5-Iron': 0.08,
      '6-Iron': 0.08,
      '7-Iron': 0.06,
      '8-Iron': 0.05,
      '9-Iron': 0.04,
      'Pitching Wedge': 0.03,
      'Gap Wedge': 0.02,
      'Sand Wedge': 0.02,
      'Lob Wedge': 0.01
    }
    return rollFactors[club] || 0.05
  }

  const addClubDistance = () => {
    if (!selectedClub || !carryDistance) return

    const carry = parseFloat(carryDistance)
    const total = parseFloat(totalDistance) || carry

    const newDistance: ClubDistance = {
      club: selectedClub,
      carry: Math.round(carry),
      total: Math.round(total)
    }

    // Remove existing distance for this club if it exists
    const updatedDistances = distances.filter(d => d.club !== selectedClub)
    setDistances([...updatedDistances, newDistance].sort((a, b) => {
      const clubOrder = ['Driver', '3-Wood', '5-Wood', '3-Hybrid', '4-Hybrid', '5-Hybrid',
                         '4-Iron', '5-Iron', '6-Iron', '7-Iron', '8-Iron', '9-Iron',
                         'Pitching Wedge', 'Gap Wedge', 'Sand Wedge', 'Lob Wedge']
      return clubOrder.indexOf(a.club) - clubOrder.indexOf(b.club)
    }))

    // Reset form
    setSelectedClub('')
    setCarryDistance('')
    setTotalDistance('')
  }

  const removeClubDistance = (club: string) => {
    setDistances(prev => prev.filter(d => d.club !== club))
  }

  const saveDistanceSet = () => {
    if (!currentSet.name || distances.length === 0) return

    const newSet: DistanceSet = {
      id: Date.now().toString(),
      name: currentSet.name,
      swingSpeed: parseFloat(currentSet.swingSpeed) || 0,
      playerLevel: currentSet.playerLevel,
      distances: [...distances],
      createdAt: new Date().toLocaleDateString()
    }

    setDistanceSets(prev => [newSet, ...prev])

    // Reset form
    setCurrentSet({ name: '', swingSpeed: '', playerLevel: 'Mid Handicap' })
    setDistances([])
  }

  const loadDistanceSet = (set: DistanceSet) => {
    setCurrentSet({
      name: set.name,
      swingSpeed: set.swingSpeed.toString(),
      playerLevel: set.playerLevel
    })
    setDistances([...set.distances])
  }

  const removeDistanceSet = (id: string) => {
    setDistanceSets(prev => prev.filter(set => set.id !== id))
  }

  const clearAllSets = () => {
    setDistanceSets([])
    localStorage.removeItem('club-distance-sets')
  }

  const clubTypes = [
    'Driver', '3-Wood', '5-Wood', '3-Hybrid', '4-Hybrid', '5-Hybrid',
    '4-Iron', '5-Iron', '6-Iron', '7-Iron', '8-Iron', '9-Iron',
    'Pitching Wedge', 'Gap Wedge', 'Sand Wedge', 'Lob Wedge'
  ]

  const playerLevels = [
    'Tour Professional', 'Low Handicap', 'Mid Handicap', 'High Handicap', 'Senior/Beginner'
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Club Distance Calculator',
    applicationCategory: 'Sports Application',
    description: 'Create personalized golf club distance charts with carry and total distances for better course management.',
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
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-100 rounded-xl">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">
                  Free Club Distance Calculator 2026
                </h1>
                <p className="text-gray-700 text-lg">
                  Create and track your personal club distance chart for better course management.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Professional Club Distance Calculator - Free Golf Tool
              </h2>
              <p className="text-gray-700 mb-3">
                Build your personalized club distance chart with carry and total distances. Generate estimated distances
                based on swing speed and skill level, or input your actual on-course distances for precise yardage management.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Personalized Distance Charts
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Swing Speed Based Estimates
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Course Management Tool
                </div>
              </div>
            </div>

            {/* Current Distance Chart */}
            {distances.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Your Distance Chart ({distances.length} clubs)
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {distances.map((distance) => (
                    <div key={distance.club} className="p-3 rounded-lg border-2 relative bg-emerald-50 border border-emerald-100">
                      <button
                        onClick={() => removeClubDistance(distance.club)}
                        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                      <div className="text-center">
                        <h4 className="text-sm font-semibold mb-1 text-slate-900">{distance.club}</h4>
                        <div className="text-xs text-slate-900">
                          Carry: {distance.carry}y • Total: {distance.total}y
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Distance Set Builder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Build Distance Chart
                </CardTitle>
                <CardDescription>
                  Create your personalized club distance chart
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">

                <div>
                  <Label htmlFor="setName">Chart Name *</Label>
                  <Input
                    id="setName"
                    type="text"
                    placeholder="e.g. My 2024 Distances"
                    value={currentSet.name}
                    onChange={(e) => setCurrentSet(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="swingSpeed">Driver Swing Speed (mph)</Label>
                    <Input
                      id="swingSpeed"
                      type="number"
                      step="0.1"
                      placeholder="e.g. 95"
                      value={currentSet.swingSpeed}
                      onChange={(e) => setCurrentSet(prev => ({ ...prev, swingSpeed: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="playerLevel">Player Level</Label>
                    <select
                      id="playerLevel"
                      value={currentSet.playerLevel}
                      onChange={(e) => setCurrentSet(prev => ({ ...prev, playerLevel: e.target.value }))}
                      className="w-full p-2 border rounded-md"
                    >
                      {playerLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  onClick={generateDistances}
                  className="w-full text-white hover:opacity-90 bg-emerald-600"
                  disabled={!currentSet.swingSpeed}
                >
                  Generate Estimated Distances
                </Button>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Add/Edit Individual Club</h4>

                  <div>
                    <Label htmlFor="clubType">Club Type</Label>
                    <select
                      id="clubType"
                      value={selectedClub}
                      onChange={(e) => setSelectedClub(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select Club</option>
                      {clubTypes.map(club => (
                        <option key={club} value={club}>{club}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <Label htmlFor="carry">Carry Distance (yards)</Label>
                      <Input
                        id="carry"
                        type="number"
                        placeholder="e.g. 150"
                        value={carryDistance}
                        onChange={(e) => setCarryDistance(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="total">Total Distance (yards)</Label>
                      <Input
                        id="total"
                        type="number"
                        placeholder="Auto-calculated"
                        value={totalDistance}
                        onChange={(e) => setTotalDistance(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={addClubDistance}
                    className="w-full mt-3 bg-emerald-600 text-white hover:opacity-90"
                    disabled={!selectedClub || !carryDistance}
                  >
                    Add/Update Club Distance
                  </Button>
                </div>

                <Button
                  onClick={saveDistanceSet}
                  className="w-full text-white hover:opacity-90 bg-emerald-600"
                  disabled={!currentSet.name || distances.length === 0}
                >
                  Save Distance Chart
                </Button>
              </CardContent>
            </Card>

            {/* Saved Distance Sets */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      Saved Distance Charts
                    </CardTitle>
                    <CardDescription>
                      Your saved club distance charts ({distanceSets.length} sets)
                    </CardDescription>
                  </div>
                  {distanceSets.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllSets}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {distanceSets.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No distance charts saved yet.</p>
                    <p className="text-sm">Create your first chart above.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {distanceSets.map((set) => (
                      <div key={set.id} className="p-3 rounded-lg bg-emerald-100 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm text-slate-900">
                            {set.name}
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => loadDistanceSet(set)}
                              className="text-blue-600 hover:text-blue-700 p-1"
                            >
                              Load
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDistanceSet(set.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-slate-900">
                          {set.swingSpeed > 0 && `${set.swingSpeed}mph • `}{set.playerLevel} • {set.distances.length} clubs
                        </div>
                        <div className="text-xs text-slate-900">
                          Created: {set.createdAt}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Club Distance Guide Section */}
          <div className="mt-12 space-y-12">
            {/* Distance Chart Fundamentals */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-emerald-600" />
                Why Every Golfer Needs a Personal Distance Chart
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Knowing your accurate club distances is the foundation of good course management and lower scores. A personal distance
                chart eliminates guesswork, builds confidence, and helps you make better strategic decisions on every shot. Tour professionals
                know their exact distances - and so should you.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Benefits of Accurate Distance Knowledge:</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Better Club Selection:</strong> Choose the right club with confidence</li>
                    <li>• <strong>Improved Course Management:</strong> Plan shots strategically</li>
                    <li>• <strong>Lower Scores:</strong> Fewer mis-clubbed shots and penalty strokes</li>
                    <li>• <strong>Gap Analysis:</strong> Identify and fill distance gaps in your set</li>
                    <li>• <strong>Equipment Optimization:</strong> Make informed club fitting decisions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Common Distance Mistakes:</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded border border-red-200">
                      <p className="text-red-900 font-medium">Using "Best Ever" Distances</p>
                      <p className="text-red-800 text-sm">That one perfect 7-iron that went 170 yards isn't your real distance</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded border border-amber-200">
                      <p className="text-amber-900 font-medium">Ignoring Conditions</p>
                      <p className="text-amber-800 text-sm">Not accounting for wind, elevation, and course conditions</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-blue-900 font-medium">Outdated Information</p>
                      <p className="text-blue-800 text-sm">Not updating distances as your swing or equipment changes</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Building Your Distance Chart */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="h-6 w-6 text-emerald-600" />
                Building Your Personal Distance Chart
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                There are multiple approaches to creating your distance chart. The key is consistency in measurement and regular
                updates as your swing and equipment evolve. Our calculator supports both automated estimation and manual input
                for maximum flexibility.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Method 1: Auto-Generation</h3>
                  <div className="p-4 bg-emerald-50 rounded border border-emerald-200 mb-4">
                    <p className="text-emerald-900 font-medium">Quick & Easy Start</p>
                    <p className="text-emerald-800 text-sm">Input swing speed and skill level for instant estimates</p>
                  </div>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Enter driver swing speed</li>
                    <li>• Select skill level</li>
                    <li>• Get complete set estimates</li>
                    <li>• Refine with real data later</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Method 2: Manual Input</h3>
                  <div className="p-4 bg-blue-50 rounded border border-blue-200 mb-4">
                    <p className="text-blue-900 font-medium">Most Accurate</p>
                    <p className="text-blue-800 text-sm">Input your actual measured distances</p>
                  </div>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Measure each club individually</li>
                    <li>• Record carry and total distances</li>
                    <li>• Update club by club</li>
                    <li>• Track seasonal changes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Method 3: Hybrid Approach</h3>
                  <div className="p-4 bg-purple-50 rounded border border-purple-200 mb-4">
                    <p className="text-purple-900 font-medium">Best of Both</p>
                    <p className="text-purple-800 text-sm">Start with estimates, refine with measurements</p>
                  </div>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Generate baseline estimates</li>
                    <li>• Measure key clubs first (7-iron, driver)</li>
                    <li>• Adjust estimates based on real data</li>
                    <li>• Fill gaps over time</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Measuring Techniques */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Info className="h-6 w-6 text-emerald-600" />
                How to Accurately Measure Your Club Distances
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Accurate measurement is crucial for building a reliable distance chart. Different environments and tools offer
                varying levels of precision. Here's how to get the most accurate data for each club in your bag.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Measurement Locations & Tools:</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">Launch Monitor (Most Accurate)</h4>
                      <p className="text-green-800 text-sm mb-2">Indoor/outdoor facilities with Trackman, FlightScope</p>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li>• Precise carry distance measurement</li>
                        <li>• Weather-independent conditions</li>
                        <li>• Multiple data points per session</li>
                        <li>• Cost: £30-50 per session</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50 rounded border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">On-Course with GPS</h4>
                      <p className="text-blue-800 text-sm mb-2">GPS watch, rangefinder, or course app</p>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Real playing conditions</li>
                        <li>• Account for roll and bounces</li>
                        <li>• Multiple rounds of data</li>
                        <li>• Weather and course impact</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50 rounded border border-amber-200">
                      <h4 className="font-medium text-amber-900 mb-2">Driving Range</h4>
                      <p className="text-amber-800 text-sm mb-2">GPS-enabled range or marked targets</p>
                      <ul className="text-amber-800 text-sm space-y-1">
                        <li>• Convenient and accessible</li>
                        <li>• Range balls may fly differently</li>
                        <li>• Use GPS or marked distances</li>
                        <li>• Good for relative comparisons</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Measurement Best Practices:</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded border">
                      <h4 className="font-medium text-gray-900 mb-2">Data Collection Guidelines:</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Take 8-10 good swings per club</li>
                        <li>• Exclude obvious mishits</li>
                        <li>• Record both carry and total distance</li>
                        <li>• Note wind and temperature conditions</li>
                        <li>• Use your normal swing tempo</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded border border-emerald-200">
                      <h4 className="font-medium text-emerald-900 mb-2">Creating Your Chart:</h4>
                      <ul className="text-emerald-800 text-sm space-y-1">
                        <li>• Use average distances, not maximum</li>
                        <li>• Start with key clubs (7-iron, driver)</li>
                        <li>• Fill gaps with shorter clubs</li>
                        <li>• Test at different times of year</li>
                        <li>• Update as equipment changes</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50 rounded border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Gap Analysis:</h4>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Ideal gaps: 10-15 yards between clubs</li>
                        <li>• Look for distance overlaps</li>
                        <li>• Consider adding hybrids or wedges</li>
                        <li>• Account for partial swings</li>
                        <li>• Plan for different conditions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default function ClubDistanceCalculatorPage() {
  return <ClubDistanceCalculator />
}