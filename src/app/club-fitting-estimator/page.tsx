'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Settings, AlertTriangle } from 'lucide-react'

interface FittingRecommendation {
  category: string
  recommendation: string
  reasoning: string
  priority: 'High' | 'Medium' | 'Low'
}

interface FittingSession {
  id: string
  name: string
  playerProfile: {
    handicap: number
    swingSpeed: number
    height: number
    age: number
    playingFrequency: string
    primaryGoal: string
  }
  measurements: {
    wristToFloor: number
    currentClubLength: string
    ballFlight: string
    missPattern: string
    currentShaft: string
  }
  recommendations: FittingRecommendation[]
  createdAt: string
}

export default function ClubFittingEstimator() {
  const [fittingSessions, setFittingSessions] = useState<FittingSession[]>([])
  const [currentSession, setCurrentSession] = useState({
    name: '',
    handicap: '',
    swingSpeed: '',
    height: '',
    age: '',
    playingFrequency: 'Weekly',
    primaryGoal: 'Lower Scores',
    wristToFloor: '',
    currentClubLength: 'Standard',
    ballFlight: 'Mid',
    missPattern: 'Straight',
    currentShaft: 'Regular'
  })
  const [recommendations, setRecommendations] = useState<FittingRecommendation[]>([])

  // Load fitting sessions from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('club-fitting-sessions')
    if (savedSessions) {
      setFittingSessions(JSON.parse(savedSessions))
    }
  }, [])

  // Save fitting sessions to localStorage
  useEffect(() => {
    if (fittingSessions.length > 0) {
      localStorage.setItem('club-fitting-sessions', JSON.stringify(fittingSessions))
    }
  }, [fittingSessions])

  // Generate fitting recommendations
  const generateRecommendations = useCallback(() => {
    const recommendations: FittingRecommendation[] = []

    const handicap = parseFloat(currentSession.handicap) || 0
    const swingSpeed = parseFloat(currentSession.swingSpeed) || 0
    const height = parseFloat(currentSession.height) || 0
    const age = parseFloat(currentSession.age) || 0
    const wristToFloor = parseFloat(currentSession.wristToFloor) || 0

    // Shaft Flex Recommendation
    const shaftRecommendation = getShaftFlexRecommendation(swingSpeed, age, currentSession.ballFlight)
    recommendations.push(shaftRecommendation)

    // Club Length Recommendation
    if (height > 0 && wristToFloor > 0) {
      const lengthRecommendation = getClubLengthRecommendation(height, wristToFloor, currentSession.currentClubLength)
      recommendations.push(lengthRecommendation)
    }

    // Lie Angle Recommendation
    if (height > 0 && wristToFloor > 0) {
      const lieAngleRecommendation = getLieAngleRecommendation(height, wristToFloor, currentSession.missPattern)
      recommendations.push(lieAngleRecommendation)
    }

    // Grip Size Recommendation
    const gripRecommendation = getGripSizeRecommendation(height, age, currentSession.playingFrequency)
    recommendations.push(gripRecommendation)

    // Club Head Type Recommendation
    const clubHeadRecommendation = getClubHeadRecommendation(handicap, swingSpeed, currentSession.primaryGoal)
    recommendations.push(clubHeadRecommendation)

    // Ball Recommendation
    const ballRecommendation = getBallRecommendation(swingSpeed, handicap, currentSession.ballFlight)
    recommendations.push(ballRecommendation)

    setRecommendations(recommendations)
  }, [currentSession])

  // Shaft flex recommendation logic
  const getShaftFlexRecommendation = (swingSpeed: number, age: number, ballFlight: string): FittingRecommendation => {
    let flex = 'Regular'
    let reasoning = ''

    if (swingSpeed >= 105) {
      flex = 'X-Stiff'
      reasoning = 'High swing speed requires extra stiff shaft for control and accuracy.'
    } else if (swingSpeed >= 95) {
      flex = 'Stiff'
      reasoning = 'Above average swing speed benefits from stiffer shaft for better control.'
    } else if (swingSpeed >= 85) {
      flex = 'Regular'
      reasoning = 'Average swing speed works well with regular flex for optimal feel and distance.'
    } else if (swingSpeed >= 75) {
      flex = 'Senior'
      reasoning = 'Moderate swing speed benefits from more flexible shaft for increased distance.'
    } else {
      flex = 'Ladies'
      reasoning = 'Lower swing speed requires most flexible shaft for maximum distance.'
    }

    // Adjust for age and ball flight
    if (age > 60 && flex === 'Regular') {
      flex = 'Senior'
      reasoning += ' Age factor suggests softer flex for easier launch.'
    }

    if (ballFlight === 'Low' && (flex === 'Stiff' || flex === 'X-Stiff')) {
      reasoning += ' Consider mid-high kick point to increase launch angle.'
    }

    return {
      category: 'Shaft Flex',
      recommendation: flex,
      reasoning,
      priority: 'High'
    }
  }

  // Club length recommendation logic
  const getClubLengthRecommendation = (height: number, wristToFloor: number, currentLength: string): FittingRecommendation => {
    // Standard club length calculation
    const ratio = wristToFloor / height
    let lengthAdjustment = ''
    let reasoning = ''

    if (ratio < 0.42) {
      lengthAdjustment = '+1 to +1.5 inches'
      reasoning = 'Your wrist-to-floor measurement suggests longer clubs for proper posture and swing plane.'
    } else if (ratio > 0.46) {
      lengthAdjustment = '-0.5 to -1 inch'
      reasoning = 'Your proportions indicate shorter clubs would improve control and consistency.'
    } else {
      lengthAdjustment = 'Standard length'
      reasoning = 'Your measurements are well-suited for standard length clubs.'
    }

    return {
      category: 'Club Length',
      recommendation: lengthAdjustment,
      reasoning,
      priority: 'High'
    }
  }

  // Lie angle recommendation logic
  const getLieAngleRecommendation = (height: number, wristToFloor: number, missPattern: string): FittingRecommendation => {
    const ratio = wristToFloor / height
    let lieAdjustment = ''
    let reasoning = ''

    if (ratio < 0.42 || missPattern === 'Left') {
      lieAdjustment = '+2° to +4° upright'
      reasoning = 'Taller setup or left miss pattern suggests more upright lie angles.'
    } else if (ratio > 0.46 || missPattern === 'Right') {
      lieAdjustment = '1° to 2° flat'
      reasoning = 'Shorter setup or right miss pattern indicates flatter lie angles needed.'
    } else {
      lieAdjustment = 'Standard lie angle'
      reasoning = 'Your setup and ball flight suggest standard lie angles are appropriate.'
    }

    if (missPattern === 'Left') {
      reasoning += ' Left misses often indicate lie angles are too upright.'
    } else if (missPattern === 'Right') {
      reasoning += ' Right misses may indicate lie angles are too flat.'
    }

    return {
      category: 'Lie Angle',
      recommendation: lieAdjustment,
      reasoning,
      priority: 'Medium'
    }
  }

  // Grip size recommendation logic
  const getGripSizeRecommendation = (height: number, age: number, playingFrequency: string): FittingRecommendation => {
    let gripSize = 'Standard'
    let reasoning = ''

    if (height >= 72) {
      gripSize = 'Midsize or +1 wrap'
      reasoning = 'Taller players typically have larger hands and benefit from bigger grips.'
    } else if (height <= 66) {
      gripSize = 'Undersize or -1 wrap'
      reasoning = 'Shorter players often have smaller hands and need smaller grips for proper feel.'
    } else {
      gripSize = 'Standard'
      reasoning = 'Your height suggests standard grip size would be appropriate.'
    }

    // Adjust for age and arthritis
    if (age > 65) {
      if (gripSize === 'Standard') {
        gripSize = 'Midsize'
      }
      reasoning += ' Larger grips can help reduce grip pressure and joint stress.'
    }

    if (playingFrequency === 'Daily' || playingFrequency === 'Multiple times per week') {
      reasoning += ' Consider cord grips for better traction and durability.'
    }

    return {
      category: 'Grip Size',
      recommendation: gripSize,
      reasoning,
      priority: 'Medium'
    }
  }

  // Club head type recommendation logic
  const getClubHeadRecommendation = (handicap: number, swingSpeed: number, primaryGoal: string): FittingRecommendation => {
    let clubType = ''
    let reasoning = ''

    if (handicap <= 5 && swingSpeed >= 100) {
      clubType = 'Players/Tour clubs'
      reasoning = 'Low handicap and high swing speed suits traditional, workable club heads with less forgiveness but more control.'
    } else if (handicap <= 15 && swingSpeed >= 90) {
      clubType = 'Players Distance/Improved'
      reasoning = 'Moderate handicap benefits from clubs that balance forgiveness with workability and distance.'
    } else {
      clubType = 'Game Improvement/Super Game Improvement'
      reasoning = 'Higher handicap players benefit most from maximum forgiveness, larger sweet spots, and distance technology.'
    }

    if (primaryGoal === 'More Distance') {
      reasoning += ' Distance-focused club heads with stronger lofts and low CG would help achieve your goal.'
    } else if (primaryGoal === 'Better Accuracy') {
      reasoning += ' More forgiving club heads with perimeter weighting would improve consistency.'
    }

    return {
      category: 'Club Head Type',
      recommendation: clubType,
      reasoning,
      priority: 'High'
    }
  }

  // Ball recommendation logic
  const getBallRecommendation = (swingSpeed: number, handicap: number, ballFlight: string): FittingRecommendation => {
    let ballType = ''
    let reasoning = ''

    if (swingSpeed >= 105 && handicap <= 10) {
      ballType = 'Tour/Performance balls'
      reasoning = 'High swing speed and low handicap benefits from premium urethane balls for maximum spin control and feel.'
    } else if (swingSpeed >= 90 && handicap <= 20) {
      ballType = 'Mid-performance balls'
      reasoning = 'Moderate swing speed suits multi-layer balls that balance distance, feel, and spin control.'
    } else {
      ballType = 'Distance/Low compression balls'
      reasoning = 'Lower swing speed benefits from softer, low compression balls that maximize distance.'
    }

    if (ballFlight === 'Low') {
      reasoning += ' Consider high-launch, low-spin balls to increase trajectory.'
    } else if (ballFlight === 'High') {
      reasoning += ' Mid or low-launch balls could help optimize trajectory.'
    }

    return {
      category: 'Golf Ball',
      recommendation: ballType,
      reasoning,
      priority: 'Medium'
    }
  }

  // Calculate whenever inputs change
  useEffect(() => {
    if (currentSession.swingSpeed && currentSession.handicap) {
      generateRecommendations()
    }
  }, [currentSession, generateRecommendations])

  const saveFittingSession = () => {
    if (!currentSession.name || recommendations.length === 0) return

    const newSession: FittingSession = {
      id: Date.now().toString(),
      name: currentSession.name,
      playerProfile: {
        handicap: parseFloat(currentSession.handicap) || 0,
        swingSpeed: parseFloat(currentSession.swingSpeed) || 0,
        height: parseFloat(currentSession.height) || 0,
        age: parseFloat(currentSession.age) || 0,
        playingFrequency: currentSession.playingFrequency,
        primaryGoal: currentSession.primaryGoal
      },
      measurements: {
        wristToFloor: parseFloat(currentSession.wristToFloor) || 0,
        currentClubLength: currentSession.currentClubLength,
        ballFlight: currentSession.ballFlight,
        missPattern: currentSession.missPattern,
        currentShaft: currentSession.currentShaft
      },
      recommendations: [...recommendations],
      createdAt: new Date().toLocaleDateString()
    }

    setFittingSessions(prev => [newSession, ...prev])

    // Reset form
    setCurrentSession({
      name: '',
      handicap: '',
      swingSpeed: '',
      height: '',
      age: '',
      playingFrequency: 'Weekly',
      primaryGoal: 'Lower Scores',
      wristToFloor: '',
      currentClubLength: 'Standard',
      ballFlight: 'Mid',
      missPattern: 'Straight',
      currentShaft: 'Regular'
    })
    setRecommendations([])
  }

  const loadFittingSession = (session: FittingSession) => {
    setCurrentSession({
      name: session.name,
      handicap: session.playerProfile.handicap.toString(),
      swingSpeed: session.playerProfile.swingSpeed.toString(),
      height: session.playerProfile.height.toString(),
      age: session.playerProfile.age.toString(),
      playingFrequency: session.playerProfile.playingFrequency,
      primaryGoal: session.playerProfile.primaryGoal,
      wristToFloor: session.measurements.wristToFloor.toString(),
      currentClubLength: session.measurements.currentClubLength,
      ballFlight: session.measurements.ballFlight,
      missPattern: session.measurements.missPattern,
      currentShaft: session.measurements.currentShaft
    })
    setRecommendations([...session.recommendations])
  }

  const removeFittingSession = (id: string) => {
    setFittingSessions(prev => prev.filter(session => session.id !== id))
  }

  const clearAllSessions = () => {
    setFittingSessions([])
    localStorage.removeItem('club-fitting-sessions')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumbs */}
          <nav className="text-sm text-slate-600 mb-4">
            <ol className="flex space-x-2">
              <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
              <li className="before:content-['/'] before:mx-2 text-slate-900">Club Fitting Estimator</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" className="bg-emerald-100 rounded-xl">
                <Settings className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
                  Golf Club Fitting Estimator
                </h1>
                <p className="text-gray-700 text-lg">
                  Get personalized club fitting recommendations based on your measurements and playing characteristics.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className="mt-6 p-6 rounded-lg border-2 bg-emerald-50 border-emerald-200">
              <h2 className="text-xl font-semibold mb-3 text-emerald-700">
                Professional Club Fitting Analysis - Free Golf Tool
              </h2>
              <p className="mb-3 text-emerald-700">
                Discover the optimal equipment specifications for your game. Our fitting estimator analyzes your physical
                measurements, swing characteristics, and playing style to recommend shaft flex, club length, lie angles, and more.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-emerald-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" className="bg-emerald-600"></span>
                  Personalized Recommendations
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" className="bg-emerald-600"></span>
                  Scientific Fitting Methods
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" className="bg-emerald-600"></span>
                  Equipment Optimization
                </div>
              </div>
            </div>

            {/* Warning Notice */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-900">
                    <strong>Professional Fitting Recommended:</strong> This tool provides general estimates based on common fitting principles.
                    For optimal results, consult a certified club fitter with launch monitor analysis.
                  </p>
                </div>
              </div>
            </div>

            {/* Current Recommendations */}
            {recommendations.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-slate-900">
                  Fitting Recommendations ({recommendations.length} areas)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold" className="text-emerald-700">{rec.category}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority}
                        </span>
                      </div>
                      <div className="text-sm mb-2" className="text-emerald-700">
                        <strong>Recommendation:</strong> {rec.recommendation}
                      </div>
                      <div className="text-xs" className="text-emerald-700">
                        {rec.reasoning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Fitting Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Club Fitting Analysis
                </CardTitle>
                <CardDescription>
                  Enter your measurements and playing characteristics for personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">

                <div>
                  <Label htmlFor="sessionName">Session Name *</Label>
                  <Input
                    id="sessionName"
                    type="text"
                    placeholder="e.g. My 2024 Fitting"
                    value={currentSession.name}
                    onChange={(e) => setCurrentSession(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Player Profile</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="handicap">Handicap Index *</Label>
                      <Input
                        id="handicap"
                        type="number"
                        step="0.1"
                        placeholder="e.g. 12.5"
                        value={currentSession.handicap}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, handicap: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="swingSpeed">Driver Swing Speed (mph) *</Label>
                      <Input
                        id="swingSpeed"
                        type="number"
                        step="0.1"
                        placeholder="e.g. 95"
                        value={currentSession.swingSpeed}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, swingSpeed: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <Label htmlFor="height">Height (inches)</Label>
                      <Input
                        id="height"
                        type="number"
                        step="0.5"
                        placeholder="e.g. 70"
                        value={currentSession.height}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, height: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="e.g. 45"
                        value={currentSession.age}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, age: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <Label htmlFor="playingFrequency">Playing Frequency</Label>
                      <select
                        id="playingFrequency"
                        value={currentSession.playingFrequency}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, playingFrequency: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Rarely">Rarely (few times per year)</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Multiple times per week">Multiple times per week</option>
                        <option value="Daily">Daily</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="primaryGoal">Primary Goal</Label>
                      <select
                        id="primaryGoal"
                        value={currentSession.primaryGoal}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, primaryGoal: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Lower Scores">Lower Scores</option>
                        <option value="More Distance">More Distance</option>
                        <option value="Better Accuracy">Better Accuracy</option>
                        <option value="More Consistency">More Consistency</option>
                        <option value="Better Feel">Better Feel</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Physical Measurements</h4>
                  <div>
                    <Label htmlFor="wristToFloor">Wrist to Floor (inches)</Label>
                    <Input
                      id="wristToFloor"
                      type="number"
                      step="0.5"
                      placeholder="e.g. 32"
                      value={currentSession.wristToFloor}
                      onChange={(e) => setCurrentSession(prev => ({ ...prev, wristToFloor: e.target.value }))}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Stand naturally, measure from wrist crease to floor
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Current Equipment & Ball Flight</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currentClubLength">Current Club Length</Label>
                      <select
                        id="currentClubLength"
                        value={currentSession.currentClubLength}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, currentClubLength: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="1 inch short">1 inch short</option>
                        <option value="0.5 inch short">0.5 inch short</option>
                        <option value="Standard">Standard</option>
                        <option value="0.5 inch long">0.5 inch long</option>
                        <option value="1 inch long">1 inch long</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="currentShaft">Current Shaft Flex</Label>
                      <select
                        id="currentShaft"
                        value={currentSession.currentShaft}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, currentShaft: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Ladies">Ladies</option>
                        <option value="Senior">Senior</option>
                        <option value="Regular">Regular</option>
                        <option value="Stiff">Stiff</option>
                        <option value="X-Stiff">X-Stiff</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <Label htmlFor="ballFlight">Typical Ball Flight</Label>
                      <select
                        id="ballFlight"
                        value={currentSession.ballFlight}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, ballFlight: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Low">Low</option>
                        <option value="Mid">Mid</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="missPattern">Primary Miss Pattern</Label>
                      <select
                        id="missPattern"
                        value={currentSession.missPattern}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, missPattern: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Straight">Straight</option>
                        <option value="Left">Left</option>
                        <option value="Right">Right</option>
                        <option value="Inconsistent">Inconsistent</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={saveFittingSession}
                  className="w-full text-white hover:opacity-90"
                  className="bg-emerald-600"
                  disabled={!currentSession.name || !currentSession.handicap || !currentSession.swingSpeed}
                >
                  Save Fitting Analysis
                </Button>
              </CardContent>
            </Card>

            {/* Saved Fitting Sessions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      Saved Fitting Sessions
                    </CardTitle>
                    <CardDescription>
                      Your club fitting analyses ({fittingSessions.length} sessions)
                    </CardDescription>
                  </div>
                  {fittingSessions.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllSessions}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {fittingSessions.length === 0 ? (
                  <div className="text-center py-8 text-gray-600 text-gray-600">
                    <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No fitting sessions saved yet.</p>
                    <p className="text-sm">Complete your first analysis above.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {fittingSessions.map((session) => (
                      <div key={session.id} className="p-3 rounded-lg" className="bg-emerald-100 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm" className="text-emerald-700">
                            {session.name}
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => loadFittingSession(session)}
                              className="text-blue-600 hover:text-blue-700 p-1"
                            >
                              Load
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFittingSession(session.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs" className="text-emerald-700">
                          {session.playerProfile.handicap} HCP • {session.playerProfile.swingSpeed}mph • {session.recommendations.length} recommendations
                        </div>
                        <div className="text-xs" className="text-emerald-700">
                          Created: {session.createdAt}
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
                Understanding Club Fitting
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Complete Guide to Golf Club Fitting
                </h3>
                <p className="text-slate-700 mb-4">
                  Proper club fitting is essential for maximizing your potential on the golf course. Our estimator uses established
                  fitting principles to analyze your physical characteristics, swing dynamics, and playing style to recommend
                  optimal equipment specifications.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Key Fitting Elements:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Shaft Flex:</strong> Matches your swing speed and tempo</li>
                    <li>• <strong>Club Length:</strong> Based on height and wrist-to-floor measurement</li>
                    <li>• <strong>Lie Angle:</strong> Ensures proper sole contact at impact</li>
                    <li>• <strong>Grip Size:</strong> Optimizes hand position and pressure</li>
                    <li>• <strong>Club Head Type:</strong> Matches your skill level and goals</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Physical Measurements:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Height:</strong> Primary factor for club length</li>
                    <li>• <strong>Wrist-to-Floor:</strong> More accurate than height alone</li>
                    <li>• <strong>Hand Size:</strong> Determines proper grip size</li>
                    <li>• <strong>Arm Length:</strong> Affects posture and swing plane</li>
                    <li>• <strong>Flexibility:</strong> Influences shaft flex selection</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Swing Characteristics:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Swing Speed:</strong> Primary factor for shaft flex</p>
                    <p><strong>Tempo:</strong> Affects shaft kick point preference</p>
                    <p><strong>Ball Flight:</strong> Indicates launch conditions</p>
                    <p><strong>Miss Pattern:</strong> Reveals lie angle needs</p>
                    <p><strong>Attack Angle:</strong> Influences club head selection</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Equipment Impact:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Distance:</strong> Proper shaft flex maximizes distance</p>
                    <p><strong>Accuracy:</strong> Correct lie angle improves direction</p>
                    <p><strong>Consistency:</strong> Proper length enhances contact</p>
                    <p><strong>Feel:</strong> Right grip size improves control</p>
                    <p><strong>Confidence:</strong> Fitted clubs inspire better swings</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Shaft Flex Guidelines:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Ladies:</strong> &lt; 75 mph swing speed</p>
                    <p><strong>Senior:</strong> 75-84 mph swing speed</p>
                    <p><strong>Regular:</strong> 85-94 mph swing speed</p>
                    <p><strong>Stiff:</strong> 95-104 mph swing speed</p>
                    <p><strong>X-Stiff:</strong> 105+ mph swing speed</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Club Length Adjustments:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>+1 inch:</strong> Very tall players (6&apos;4&quot;+)</p>
                    <p><strong>+0.5 inch:</strong> Tall players (6&apos;1&quot; - 6&apos;3&quot;)</p>
                    <p><strong>Standard:</strong> Average height (5&apos;7&quot; - 6&apos;0&quot;)</p>
                    <p><strong>-0.5 inch:</strong> Shorter players (5&apos;4&quot; - 5&apos;6&quot;)</p>
                    <p><strong>-1 inch:</strong> Very short players (&lt; 5&apos;4&quot;)</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-slate-900 mb-3">Why Use Our Club Fitting Estimator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Scientific Methods:</strong> Based on established fitting principles
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Comprehensive Analysis:</strong> Covers all major fitting elements
                    </p>
                    <p className="text-slate-700">
                      <strong>✓ Personalized Results:</strong> Tailored to your unique characteristics
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Pre-Fitting Preparation:</strong> Know what to expect from a fitting
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>✓ Equipment Education:</strong> Understand fitting fundamentals
                    </p>
                    <p className="text-slate-700">
                      <strong>✓ Free Analysis:</strong> No cost for basic recommendations
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-slate-700">
                  <strong>Important:</strong> This tool provides general estimates based on common fitting principles. For optimal
                  results, we strongly recommend a professional club fitting with a certified fitter using launch monitor
                  technology. Individual swing characteristics can vary significantly from these general guidelines.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}