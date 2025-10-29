'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Target } from 'lucide-react'

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

export default function ClubDistanceCalculator() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-600 mb-4">
            <ol className="flex space-x-2">
              <li><Link href="/" className="hover:text-green-600">Home</Link></li>
              <li className="before:content-['/'] before:mx-2 text-gray-900">Club Distance Calculator</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#9CC69B'}}>
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Golf Club Distance Calculator
                </h1>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  Create and track your personal club distance chart for better course management.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className="mt-6 p-6 rounded-lg border-2" style={{backgroundColor: '#9CC69B', borderColor: '#183a37'}}>
              <h2 className="text-xl font-semibold mb-3" style={{color: '#183a37'}}>
                Professional Club Distance Calculator - Free Golf Tool
              </h2>
              <p className="mb-3" style={{color: '#183a37'}}>
                Build your personalized club distance chart with carry and total distances. Generate estimated distances
                based on swing speed and skill level, or input your actual on-course distances for precise yardage management.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm" style={{color: '#183a37'}}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#183a37'}}></span>
                  Personalized Distance Charts
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#183a37'}}></span>
                  Swing Speed Based Estimates
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#183a37'}}></span>
                  Course Management Tool
                </div>
              </div>
            </div>

            {/* Current Distance Chart */}
            {distances.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Your Distance Chart ({distances.length} clubs)
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {distances.map((distance) => (
                    <div key={distance.club} className="p-3 rounded-lg border-2 relative" style={{backgroundColor: '#9CC69B', borderColor: '#183a37'}}>
                      <button
                        onClick={() => removeClubDistance(distance.club)}
                        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                      <div className="text-center">
                        <h4 className="text-sm font-semibold mb-1" style={{color: '#183a37'}}>{distance.club}</h4>
                        <div className="text-xs" style={{color: '#183a37'}}>
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
                  className="w-full text-white hover:opacity-90"
                  style={{backgroundColor: '#183a37'}}
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
                    className="w-full mt-3 text-white hover:opacity-90"
                    style={{backgroundColor: '#183a37'}}
                    disabled={!selectedClub || !carryDistance}
                  >
                    Add/Update Club Distance
                  </Button>
                </div>

                <Button
                  onClick={saveDistanceSet}
                  className="w-full text-white hover:opacity-90"
                  style={{backgroundColor: '#183a37'}}
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
                  <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No distance charts saved yet.</p>
                    <p className="text-sm">Create your first chart above.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {distanceSets.map((set) => (
                      <div key={set.id} className="p-3 rounded-lg" style={{backgroundColor: '#9CC69B'}}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm" style={{color: '#183a37'}}>
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
                        <div className="text-xs" style={{color: '#183a37'}}>
                          {set.swingSpeed > 0 && `${set.swingSpeed}mph • `}{set.playerLevel} • {set.distances.length} clubs
                        </div>
                        <div className="text-xs" style={{color: '#183a37'}}>
                          Created: {set.createdAt}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Information Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                How to Use the Club Distance Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-black">
                  Complete Guide to Golf Club Distance Management
                </h3>
                <p className="text-black mb-4">
                  Knowing your accurate club distances is crucial for course management and scoring. Our calculator helps you
                  build personalized distance charts based on your swing speed and skill level, or input your actual distances
                  from practice sessions and course play.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-black">Two Ways to Build Your Chart:</h4>
                  <ul className="text-sm space-y-2 text-black">
                    <li>• <strong>Auto-Generate:</strong> Enter swing speed and skill level for estimated distances</li>
                    <li>• <strong>Manual Entry:</strong> Input your actual measured distances</li>
                    <li>• <strong>Hybrid Approach:</strong> Generate estimates then fine-tune with real data</li>
                    <li>• <strong>Multiple Charts:</strong> Save different sets for various conditions</li>
                    <li>• <strong>Easy Updates:</strong> Modify individual clubs as your game improves</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Distance Factors:</h4>
                  <ul className="text-sm space-y-2 text-black">
                    <li>• <strong>Carry Distance:</strong> Ball flight distance in the air</li>
                    <li>• <strong>Total Distance:</strong> Carry plus roll (conditions dependent)</li>
                    <li>• <strong>Weather:</strong> Wind, temperature, humidity effects</li>
                    <li>• <strong>Course Conditions:</strong> Firm vs soft fairways</li>
                    <li>• <strong>Altitude:</strong> Higher elevation = more distance</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-black">Measuring Your Distances:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Driving Range:</strong> Use GPS or marked targets</p>
                    <p><strong>On Course:</strong> GPS watches or rangefinders</p>
                    <p><strong>Launch Monitor:</strong> Most accurate carry distances</p>
                    <p><strong>Multiple Shots:</strong> Average 5-10 good strikes</p>
                    <p><strong>Ideal Conditions:</strong> Calm wind, normal temperature</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Using Your Chart:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Course Management:</strong> Choose the right club for each shot</p>
                    <p><strong>Gap Analysis:</strong> Identify distance gaps in your set</p>
                    <p><strong>Club Selection:</strong> Account for pin position and hazards</p>
                    <p><strong>Practice Focus:</strong> Work on consistent distances</p>
                    <p><strong>Equipment Decisions:</strong> Optimize your club setup</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-black">Typical Distance Gaps:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Driver to 3-Wood:</strong> 20-30 yards</p>
                    <p><strong>Woods to Hybrids:</strong> 15-20 yards</p>
                    <p><strong>Long Irons:</strong> 12-15 yards between clubs</p>
                    <p><strong>Mid Irons:</strong> 10-12 yards between clubs</p>
                    <p><strong>Short Irons/Wedges:</strong> 8-12 yards</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Pro Tips:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>80% Rule:</strong> Use 80% swing for better accuracy</p>
                    <p><strong>Pin Position:</strong> Adjust for front/back pins</p>
                    <p><strong>Wind Compensation:</strong> Club up/down accordingly</p>
                    <p><strong>Uphill/Downhill:</strong> Add/subtract for elevation</p>
                    <p><strong>Regular Updates:</strong> Reassess distances seasonally</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-3 text-black">Why Use Our Club Distance Calculator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-black mb-2">
                      <strong>✓ Personalized Charts:</strong> Tailored to your swing and skill level
                    </p>
                    <p className="text-black mb-2">
                      <strong>✓ Multiple Sets:</strong> Save charts for different conditions
                    </p>
                    <p className="text-black">
                      <strong>✓ Easy Updates:</strong> Modify distances as you improve
                    </p>
                  </div>
                  <div>
                    <p className="text-black mb-2">
                      <strong>✓ Course Management:</strong> Make smarter club selections
                    </p>
                    <p className="text-black mb-2">
                      <strong>✓ Gap Analysis:</strong> Optimize your club setup
                    </p>
                    <p className="text-black">
                      <strong>✓ Free Forever:</strong> No subscription required
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-black">
                  <strong>Note:</strong> Distance calculations are estimates based on typical conditions. Actual distances
                  will vary based on weather, course conditions, altitude, and individual swing characteristics. Use this
                  tool as a starting point and adjust based on your on-course experience.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}