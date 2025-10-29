'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Clock, Users } from 'lucide-react'

interface PlayingTimeEstimate {
  id: string
  sessionName: string
  groupSize: number
  courseType: string
  pace: string
  courseConditions: string
  teeTime: string
  estimatedTime: number
  finishTime: string
  basePace: number
  groupAdjustment: number
  conditionsAdjustment: number
  createdAt: string
}

export default function PlayingTimeEstimator() {
  const [estimates, setEstimates] = useState<PlayingTimeEstimate[]>([])
  const [currentCalc, setCurrentCalc] = useState({
    sessionName: '',
    groupSize: '4',
    courseType: '18 Holes',
    pace: 'Average',
    courseConditions: 'Normal',
    teeTime: ''
  })

  useEffect(() => {
    const savedEstimates = localStorage.getItem('playing-time-estimates')
    if (savedEstimates) {
      setEstimates(JSON.parse(savedEstimates))
    }
  }, [])

  useEffect(() => {
    if (estimates.length > 0) {
      localStorage.setItem('playing-time-estimates', JSON.stringify(estimates))
    }
  }, [estimates])

  const getBasePace = (courseType: string, pace: string) => {
    const baseTimes = {
      '9 Holes': {
        'Fast': 120,      // 2 hours
        'Average': 135,   // 2.25 hours
        'Slow': 150       // 2.5 hours
      },
      '18 Holes': {
        'Fast': 240,      // 4 hours
        'Average': 270,   // 4.5 hours
        'Slow': 300       // 5 hours
      },
      'Executive': {
        'Fast': 150,      // 2.5 hours
        'Average': 180,   // 3 hours
        'Slow': 210       // 3.5 hours
      }
    }
    return baseTimes[courseType as keyof typeof baseTimes][pace as keyof typeof baseTimes['18 Holes']] || 270
  }

  const getGroupAdjustment = (groupSize: number) => {
    // Time adjustment per player beyond 2
    const adjustments = {
      1: -30,  // Solo play is faster
      2: 0,    // Base time for 2 players
      3: 15,   // Add 15 minutes for 3rd player
      4: 30,   // Add 30 minutes for 4th player
      5: 60,   // Add 60 minutes for 5th player
      6: 90    // Add 90 minutes for 6th player
    }
    return adjustments[groupSize as keyof typeof adjustments] || 30
  }

  const getConditionsAdjustment = (conditions: string) => {
    const adjustments = {
      'Excellent': -15,    // Perfect conditions, faster play
      'Good': -5,          // Good conditions, slightly faster
      'Normal': 0,         // Standard conditions
      'Busy': 30,          // Crowded course, slower
      'Poor Weather': 45,  // Rain, wind, cold
      'Very Busy': 60      // Peak times, very slow
    }
    return adjustments[conditions as keyof typeof adjustments] || 0
  }

  const calculatePlayingTime = () => {
    const groupSize = parseInt(currentCalc.groupSize)

    if (!groupSize || !currentCalc.teeTime) return

    const basePace = getBasePace(currentCalc.courseType, currentCalc.pace)
    const groupAdjustment = getGroupAdjustment(groupSize)
    const conditionsAdjustment = getConditionsAdjustment(currentCalc.courseConditions)

    const totalMinutes = basePace + groupAdjustment + conditionsAdjustment

    // Calculate finish time
    const [hours, minutes] = currentCalc.teeTime.split(':').map(Number)
    const teeTimeMinutes = hours * 60 + minutes
    const finishTimeMinutes = teeTimeMinutes + totalMinutes

    const finishHours = Math.floor(finishTimeMinutes / 60) % 24
    const finishMins = finishTimeMinutes % 60
    const finishTime = `${finishHours.toString().padStart(2, '0')}:${finishMins.toString().padStart(2, '0')}`

    const newEstimate: PlayingTimeEstimate = {
      id: Date.now().toString(),
      sessionName: currentCalc.sessionName || `${currentCalc.courseType} - ${groupSize} players`,
      groupSize,
      courseType: currentCalc.courseType,
      pace: currentCalc.pace,
      courseConditions: currentCalc.courseConditions,
      teeTime: currentCalc.teeTime,
      estimatedTime: totalMinutes,
      finishTime,
      basePace,
      groupAdjustment,
      conditionsAdjustment,
      createdAt: new Date().toLocaleDateString()
    }

    setEstimates(prev => [newEstimate, ...prev.slice(0, 19)])

    // Clear form
    setCurrentCalc({
      sessionName: '',
      groupSize: '4',
      courseType: '18 Holes',
      pace: 'Average',
      courseConditions: 'Normal',
      teeTime: ''
    })
  }

  const removeEstimate = (id: string) => {
    setEstimates(prev => prev.filter(est => est.id !== id))
  }

  const clearAllEstimates = () => {
    setEstimates([])
    localStorage.removeItem('playing-time-estimates')
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getPaceColor = (pace: string) => {
    switch (pace) {
      case 'Fast': return 'text-green-600'
      case 'Average': return 'text-blue-600'
      case 'Slow': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  const getConditionsColor = (conditions: string) => {
    switch (conditions) {
      case 'Excellent':
      case 'Good': return 'text-green-600'
      case 'Normal': return 'text-blue-600'
      case 'Busy':
      case 'Poor Weather':
      case 'Very Busy': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-4">
            <ol className="flex space-x-2">
              <li><Link href="/" className="hover:text-green-600">Home</Link></li>
              <li className="before:content-['/'] before:mx-2 text-gray-900">Playing Time Estimator</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#9CC69B'}}>
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Golf Playing Time Estimator
                </h1>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  Calculate accurate playing times for your golf rounds based on group size, course conditions, and pace of play.
                </p>
              </div>
            </div>

            <div className="mt-6 p-6 rounded-lg border-2" style={{backgroundColor: '#9CC69B', borderColor: '#183a37'}}>
              <h2 className="text-xl font-semibold mb-3" style={{color: '#183a37'}}>
                Round Planning Tool - Free Golf Time Calculator
              </h2>
              <p className="mb-3" style={{color: '#183a37'}}>
                Plan your golf day perfectly with accurate time estimates. Factor in group size, playing pace, course conditions,
                and busy periods to know exactly when your round will finish and plan your day accordingly.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm" style={{color: '#183a37'}}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#183a37'}}></span>
                  Group Size Impact
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#183a37'}}></span>
                  Course Conditions
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#183a37'}}></span>
                  Pace Analysis
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Playing Time Calculator
                </CardTitle>
                <CardDescription>
                  Enter your round details to get an accurate time estimate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sessionName">Round Description</Label>
                  <Input
                    id="sessionName"
                    type="text"
                    placeholder="e.g. Saturday morning round"
                    value={currentCalc.sessionName}
                    onChange={(e) => setCurrentCalc(prev => ({...prev, sessionName: e.target.value}))}
                  />
                </div>

                <div>
                  <Label htmlFor="teeTime">Tee Time *</Label>
                  <Input
                    id="teeTime"
                    type="time"
                    value={currentCalc.teeTime}
                    onChange={(e) => setCurrentCalc(prev => ({...prev, teeTime: e.target.value}))}
                    required
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Round Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="groupSize">Group Size *</Label>
                      <select
                        id="groupSize"
                        value={currentCalc.groupSize}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, groupSize: e.target.value}))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="1">1 Player (Solo)</option>
                        <option value="2">2 Players</option>
                        <option value="3">3 Players</option>
                        <option value="4">4 Players</option>
                        <option value="5">5 Players</option>
                        <option value="6">6 Players</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="courseType">Course Type</Label>
                      <select
                        id="courseType"
                        value={currentCalc.courseType}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, courseType: e.target.value}))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="9 Holes">9 Holes</option>
                        <option value="18 Holes">18 Holes</option>
                        <option value="Executive">Executive Course</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Playing Conditions</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pace">Expected Pace</Label>
                      <select
                        id="pace"
                        value={currentCalc.pace}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, pace: e.target.value}))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Fast">Fast Players</option>
                        <option value="Average">Average Pace</option>
                        <option value="Slow">Leisurely Pace</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="courseConditions">Course Conditions</Label>
                      <select
                        id="courseConditions"
                        value={currentCalc.courseConditions}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, courseConditions: e.target.value}))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Excellent">Excellent (Perfect day)</option>
                        <option value="Good">Good (Nice conditions)</option>
                        <option value="Normal">Normal (Typical day)</option>
                        <option value="Busy">Busy (Moderate crowds)</option>
                        <option value="Poor Weather">Poor Weather</option>
                        <option value="Very Busy">Very Busy (Peak times)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={calculatePlayingTime}
                  className="w-full text-white hover:opacity-90"
                  style={{backgroundColor: '#183a37'}}
                  disabled={!currentCalc.groupSize || !currentCalc.teeTime}
                >
                  Calculate Playing Time
                </Button>
              </CardContent>
            </Card>

            {/* Results History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      Time Estimates
                    </CardTitle>
                    <CardDescription>
                      Your playing time calculations ({estimates.length} estimates)
                    </CardDescription>
                  </div>
                  {estimates.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllEstimates}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {estimates.length === 0 ? (
                  <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No time estimates calculated yet.</p>
                    <p className="text-sm">Calculate your first playing time above.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {estimates.map((estimate) => (
                      <div key={estimate.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {estimate.sessionName}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {estimate.createdAt}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEstimate(estimate.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Tee Time:</p>
                            <p className="font-medium">{estimate.teeTime}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Estimated Finish:</p>
                            <p className="font-bold text-lg text-green-600">{estimate.finishTime}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Total Time:</p>
                            <p className="font-medium">{formatDuration(estimate.estimatedTime)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Group Size:</p>
                            <p className="font-medium">{estimate.groupSize} players</p>
                          </div>
                        </div>

                        <div className="text-xs space-y-1 pt-2 border-t">
                          <div className="flex justify-between">
                            <span>Base pace ({estimate.courseType}):</span>
                            <span className={getPaceColor(estimate.pace)}>
                              {formatDuration(estimate.basePace)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Group adjustment:</span>
                            <span className={estimate.groupAdjustment >= 0 ? 'text-red-600' : 'text-green-600'}>
                              {estimate.groupAdjustment > 0 ? '+' : ''}{formatDuration(Math.abs(estimate.groupAdjustment))}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Conditions ({estimate.courseConditions}):</span>
                            <span className={getConditionsColor(estimate.courseConditions)}>
                              {estimate.conditionsAdjustment > 0 ? '+' : ''}{formatDuration(Math.abs(estimate.conditionsAdjustment))}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Educational Content */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Understanding Golf Playing Times
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-black">Complete Guide to Golf Pace of Play</h3>
                <p className="text-black mb-4">
                  Playing time varies significantly based on multiple factors. Understanding these variables helps you
                  plan your golf day better, book appropriate tee times, and manage expectations for your round duration.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-black">Group Size Impact:</h4>
                  <ul className="text-sm space-y-2 text-black">
                    <li>• <strong>Solo Play:</strong> Fastest option, 30min less than pairs</li>
                    <li>• <strong>2 Players:</strong> Optimal pace, baseline timing</li>
                    <li>• <strong>3 Players:</strong> Add ~15 minutes to round</li>
                    <li>• <strong>4 Players:</strong> Add ~30 minutes (standard group)</li>
                    <li>• <strong>5-6 Players:</strong> Significantly slower, avoid if possible</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Course Type Differences:</h4>
                  <ul className="text-sm space-y-2 text-black">
                    <li>• <strong>9 Holes:</strong> 2-2.5 hours typically</li>
                    <li>• <strong>18 Holes:</strong> 4-5 hours standard</li>
                    <li>• <strong>Executive:</strong> 2.5-3.5 hours (shorter holes)</li>
                    <li>• <strong>Championship:</strong> Longer than standard courses</li>
                    <li>• <strong>Resort Courses:</strong> Often slower due to scenery</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-black">Playing Pace Factors:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Fast Players:</strong> Experienced, decisive, good walkers</p>
                    <p><strong>Average Pace:</strong> Most recreational golfers</p>
                    <p><strong>Slow Players:</strong> Beginners, lots of ball searching</p>
                    <p><strong>Cart vs Walking:</strong> Carts can be faster on long courses</p>
                    <p><strong>Skill Level:</strong> Lower handicaps typically play faster</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Course Conditions Impact:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Excellent:</strong> Perfect weather, light play</p>
                    <p><strong>Good:</strong> Nice conditions, normal pace</p>
                    <p><strong>Normal:</strong> Typical day conditions</p>
                    <p><strong>Busy:</strong> Crowded course, waiting on shots</p>
                    <p><strong>Poor Weather:</strong> Rain, wind, cold slow play</p>
                    <p><strong>Very Busy:</strong> Peak times, significant delays</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-black">Time Management Tips:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Ready Golf:</strong> Play when ready, safely</p>
                    <p><strong>Pre-shot Routine:</strong> Consistent, not lengthy</p>
                    <p><strong>Ball Searching:</strong> 3-minute rule maximum</p>
                    <p><strong>Course Knowledge:</strong> Speeds up decision making</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Optimal Tee Times:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Early Morning:</strong> Fastest rounds, less crowded</p>
                    <p><strong>Mid-Morning:</strong> Good pace, warming up</p>
                    <p><strong>Afternoon:</strong> Can be slower, more players</p>
                    <p><strong>Late Afternoon:</strong> Often faster, fewer groups</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-black">Seasonal Variations:</h4>
                  <div className="text-sm text-black space-y-1">
                    <p><strong>Summer:</strong> Longer days, more daylight</p>
                    <p><strong>Winter:</strong> Shorter rounds, fewer players</p>
                    <p><strong>Peak Season:</strong> Busier, slower rounds</p>
                    <p><strong>Weekends:</strong> Always busier than weekdays</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-3 text-black">Why Use Our Playing Time Estimator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-black mb-2"><strong>✓ Accurate Planning:</strong> Know when you&apos;ll finish</p>
                    <p className="text-black mb-2"><strong>✓ Multiple Factors:</strong> Considers all timing variables</p>
                    <p className="text-black"><strong>✓ Day Planning:</strong> Schedule other activities confidently</p>
                  </div>
                  <div>
                    <p className="text-black mb-2"><strong>✓ Group Coordination:</strong> Share finish times</p>
                    <p className="text-black mb-2"><strong>✓ Tee Time Selection:</strong> Choose optimal start times</p>
                    <p className="text-black"><strong>✓ Free Tool:</strong> No cost for time estimates</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-black">
                  <strong>Important:</strong> These estimates are based on typical playing conditions and pace standards.
                  Actual playing time can vary based on specific course layout, weather conditions, group dynamics, and
                  individual playing abilities. Use these estimates as a planning guide and adjust based on your experience.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}