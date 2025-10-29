&apos;use client&apos;

import { useState, useEffect } from &apos;react&apos;
import Link from &apos;next/link&apos;
import { Button } from &apos;@/components/ui/button&apos;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from &apos;@/components/ui/card&apos;
import { Input } from &apos;@/components/ui/input&apos;
import { Label } from &apos;@/components/ui/label&apos;
import { Calculator, Plus, Trash2, Info, History, Settings, AlertTriangle } from &apos;lucide-react&apos;

interface FittingRecommendation {
  category: string
  recommendation: string
  reasoning: string
  priority: &apos;High&apos; | &apos;Medium&apos; | &apos;Low&apos;
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
    name: &apos;&apos;,
    handicap: &apos;&apos;,
    swingSpeed: &apos;&apos;,
    height: &apos;&apos;,
    age: &apos;&apos;,
    playingFrequency: &apos;Weekly&apos;,
    primaryGoal: &apos;Lower Scores&apos;,
    wristToFloor: &apos;&apos;,
    currentClubLength: &apos;Standard&apos;,
    ballFlight: &apos;Mid&apos;,
    missPattern: &apos;Straight&apos;,
    currentShaft: &apos;Regular&apos;
  })
  const [recommendations, setRecommendations] = useState<FittingRecommendation[]>([])

  // Load fitting sessions from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem(&apos;club-fitting-sessions&apos;)
    if (savedSessions) {
      setFittingSessions(JSON.parse(savedSessions))
    }
  }, [])

  // Save fitting sessions to localStorage
  useEffect(() => {
    if (fittingSessions.length > 0) {
      localStorage.setItem(&apos;club-fitting-sessions&apos;, JSON.stringify(fittingSessions))
    }
  }, [fittingSessions])

  // Generate fitting recommendations
  const generateRecommendations = () => {
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
  }

  // Shaft flex recommendation logic
  const getShaftFlexRecommendation = (swingSpeed: number, age: number, ballFlight: string): FittingRecommendation => {
    let flex = &apos;Regular&apos;
    let reasoning = &apos;&apos;

    if (swingSpeed >= 105) {
      flex = &apos;X-Stiff&apos;
      reasoning = &apos;High swing speed requires extra stiff shaft for control and accuracy.&apos;
    } else if (swingSpeed >= 95) {
      flex = &apos;Stiff&apos;
      reasoning = &apos;Above average swing speed benefits from stiffer shaft for better control.&apos;
    } else if (swingSpeed >= 85) {
      flex = &apos;Regular&apos;
      reasoning = &apos;Average swing speed works well with regular flex for optimal feel and distance.&apos;
    } else if (swingSpeed >= 75) {
      flex = &apos;Senior&apos;
      reasoning = &apos;Moderate swing speed benefits from more flexible shaft for increased distance.&apos;
    } else {
      flex = &apos;Ladies&apos;
      reasoning = &apos;Lower swing speed requires most flexible shaft for maximum distance.&apos;
    }

    // Adjust for age and ball flight
    if (age > 60 && flex === &apos;Regular&apos;) {
      flex = &apos;Senior&apos;
      reasoning += &apos; Age factor suggests softer flex for easier launch.&apos;
    }

    if (ballFlight === &apos;Low&apos; && (flex === &apos;Stiff&apos; || flex === &apos;X-Stiff&apos;)) {
      reasoning += &apos; Consider mid-high kick point to increase launch angle.&apos;
    }

    return {
      category: &apos;Shaft Flex&apos;,
      recommendation: flex,
      reasoning,
      priority: &apos;High&apos;
    }
  }

  // Club length recommendation logic
  const getClubLengthRecommendation = (height: number, wristToFloor: number, currentLength: string): FittingRecommendation => {
    // Standard club length calculation
    const ratio = wristToFloor / height
    let lengthAdjustment = &apos;&apos;
    let reasoning = &apos;&apos;

    if (ratio < 0.42) {
      lengthAdjustment = &apos;+1 to +1.5 inches&apos;
      reasoning = &apos;Your wrist-to-floor measurement suggests longer clubs for proper posture and swing plane.&apos;
    } else if (ratio > 0.46) {
      lengthAdjustment = &apos;-0.5 to -1 inch&apos;
      reasoning = &apos;Your proportions indicate shorter clubs would improve control and consistency.&apos;
    } else {
      lengthAdjustment = &apos;Standard length&apos;
      reasoning = &apos;Your measurements are well-suited for standard length clubs.&apos;
    }

    return {
      category: &apos;Club Length&apos;,
      recommendation: lengthAdjustment,
      reasoning,
      priority: &apos;High&apos;
    }
  }

  // Lie angle recommendation logic
  const getLieAngleRecommendation = (height: number, wristToFloor: number, missPattern: string): FittingRecommendation => {
    const ratio = wristToFloor / height
    let lieAdjustment = &apos;&apos;
    let reasoning = &apos;&apos;

    if (ratio < 0.42 || missPattern === &apos;Left&apos;) {
      lieAdjustment = &apos;+2° to +4° upright&apos;
      reasoning = &apos;Taller setup or left miss pattern suggests more upright lie angles.&apos;
    } else if (ratio > 0.46 || missPattern === &apos;Right&apos;) {
      lieAdjustment = &apos;1° to 2° flat&apos;
      reasoning = &apos;Shorter setup or right miss pattern indicates flatter lie angles needed.&apos;
    } else {
      lieAdjustment = &apos;Standard lie angle&apos;
      reasoning = &apos;Your setup and ball flight suggest standard lie angles are appropriate.&apos;
    }

    if (missPattern === &apos;Left&apos;) {
      reasoning += &apos; Left misses often indicate lie angles are too upright.&apos;
    } else if (missPattern === &apos;Right&apos;) {
      reasoning += &apos; Right misses may indicate lie angles are too flat.&apos;
    }

    return {
      category: &apos;Lie Angle&apos;,
      recommendation: lieAdjustment,
      reasoning,
      priority: &apos;Medium&apos;
    }
  }

  // Grip size recommendation logic
  const getGripSizeRecommendation = (height: number, age: number, playingFrequency: string): FittingRecommendation => {
    let gripSize = &apos;Standard&apos;
    let reasoning = &apos;&apos;

    if (height >= 72) {
      gripSize = &apos;Midsize or +1 wrap&apos;
      reasoning = &apos;Taller players typically have larger hands and benefit from bigger grips.&apos;
    } else if (height <= 66) {
      gripSize = &apos;Undersize or -1 wrap&apos;
      reasoning = &apos;Shorter players often have smaller hands and need smaller grips for proper feel.&apos;
    } else {
      gripSize = &apos;Standard&apos;
      reasoning = &apos;Your height suggests standard grip size would be appropriate.&apos;
    }

    // Adjust for age and arthritis
    if (age > 65) {
      if (gripSize === &apos;Standard&apos;) {
        gripSize = &apos;Midsize&apos;
      }
      reasoning += &apos; Larger grips can help reduce grip pressure and joint stress.&apos;
    }

    if (playingFrequency === &apos;Daily&apos; || playingFrequency === &apos;Multiple times per week&apos;) {
      reasoning += &apos; Consider cord grips for better traction and durability.&apos;
    }

    return {
      category: &apos;Grip Size&apos;,
      recommendation: gripSize,
      reasoning,
      priority: &apos;Medium&apos;
    }
  }

  // Club head type recommendation logic
  const getClubHeadRecommendation = (handicap: number, swingSpeed: number, primaryGoal: string): FittingRecommendation => {
    let clubType = &apos;&apos;
    let reasoning = &apos;&apos;

    if (handicap <= 5 && swingSpeed >= 100) {
      clubType = &apos;Players/Tour clubs&apos;
      reasoning = &apos;Low handicap and high swing speed suits traditional, workable club heads with less forgiveness but more control.&apos;
    } else if (handicap <= 15 && swingSpeed >= 90) {
      clubType = &apos;Players Distance/Improved&apos;
      reasoning = &apos;Moderate handicap benefits from clubs that balance forgiveness with workability and distance.&apos;
    } else {
      clubType = &apos;Game Improvement/Super Game Improvement&apos;
      reasoning = &apos;Higher handicap players benefit most from maximum forgiveness, larger sweet spots, and distance technology.&apos;
    }

    if (primaryGoal === &apos;More Distance&apos;) {
      reasoning += &apos; Distance-focused club heads with stronger lofts and low CG would help achieve your goal.&apos;
    } else if (primaryGoal === &apos;Better Accuracy&apos;) {
      reasoning += &apos; More forgiving club heads with perimeter weighting would improve consistency.&apos;
    }

    return {
      category: &apos;Club Head Type&apos;,
      recommendation: clubType,
      reasoning,
      priority: &apos;High&apos;
    }
  }

  // Ball recommendation logic
  const getBallRecommendation = (swingSpeed: number, handicap: number, ballFlight: string): FittingRecommendation => {
    let ballType = &apos;&apos;
    let reasoning = &apos;&apos;

    if (swingSpeed >= 105 && handicap <= 10) {
      ballType = &apos;Tour/Performance balls&apos;
      reasoning = &apos;High swing speed and low handicap benefits from premium urethane balls for maximum spin control and feel.&apos;
    } else if (swingSpeed >= 90 && handicap <= 20) {
      ballType = &apos;Mid-performance balls&apos;
      reasoning = &apos;Moderate swing speed suits multi-layer balls that balance distance, feel, and spin control.&apos;
    } else {
      ballType = &apos;Distance/Low compression balls&apos;
      reasoning = &apos;Lower swing speed benefits from softer, low compression balls that maximize distance.&apos;
    }

    if (ballFlight === &apos;Low&apos;) {
      reasoning += &apos; Consider high-launch, low-spin balls to increase trajectory.&apos;
    } else if (ballFlight === &apos;High&apos;) {
      reasoning += &apos; Mid or low-launch balls could help optimize trajectory.&apos;
    }

    return {
      category: &apos;Golf Ball&apos;,
      recommendation: ballType,
      reasoning,
      priority: &apos;Medium&apos;
    }
  }

  // Calculate whenever inputs change
  useEffect(() => {
    if (currentSession.swingSpeed && currentSession.handicap) {
      generateRecommendations()
    }
  }, [currentSession])

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
      name: &apos;&apos;,
      handicap: &apos;&apos;,
      swingSpeed: &apos;&apos;,
      height: &apos;&apos;,
      age: &apos;&apos;,
      playingFrequency: &apos;Weekly&apos;,
      primaryGoal: &apos;Lower Scores&apos;,
      wristToFloor: &apos;&apos;,
      currentClubLength: &apos;Standard&apos;,
      ballFlight: &apos;Mid&apos;,
      missPattern: &apos;Straight&apos;,
      currentShaft: &apos;Regular&apos;
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
    localStorage.removeItem(&apos;club-fitting-sessions&apos;)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case &apos;High&apos;: return &apos;bg-red-100 text-red-800 border-red-200&apos;
      case &apos;Medium&apos;: return &apos;bg-yellow-100 text-yellow-800 border-yellow-200&apos;
      case &apos;Low&apos;: return &apos;bg-green-100 text-green-800 border-green-200&apos;
      default: return &apos;bg-gray-100 text-gray-800 border-gray-200&apos;
    }
  }

  return (
    <div className=&quot;min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-900 dark:to-slate-800&quot;>
      <div className=&quot;container mx-auto px-4 py-8&quot;>
        <div className=&quot;max-w-6xl mx-auto&quot;>

          {/* Breadcrumbs */}
          <nav className=&quot;text-sm text-gray-600 mb-4&quot;>
            <ol className=&quot;flex space-x-2&quot;>
              <li><Link href=&quot;/&quot; className=&quot;hover:text-green-600&quot;>Home</Link></li>
              <li className=&quot;before:content-[&apos;/&apos;] before:mx-2 text-gray-900&quot;>Club Fitting Estimator</li>
            </ol>
          </nav>

          {/* Header */}
          <div className=&quot;bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 mb-8&quot;>
            <div className=&quot;flex items-center gap-4 mb-4&quot;>
              <div className=&quot;w-12 h-12 rounded-full flex items-center justify-center&quot; style={{backgroundColor: &apos;#9CC69B&apos;}}>
                <Settings className=&quot;h-6 w-6 text-white&quot; />
              </div>
              <div>
                <h1 className=&quot;text-4xl font-bold text-gray-900 dark:text-white mb-2&quot;>
                  Golf Club Fitting Estimator
                </h1>
                <p className=&quot;text-gray-700 dark:text-gray-300 text-lg&quot;>
                  Get personalized club fitting recommendations based on your measurements and playing characteristics.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className=&quot;mt-6 p-6 rounded-lg border-2&quot; style={{backgroundColor: &apos;#9CC69B&apos;, borderColor: &apos;#183a37&apos;}}>
              <h2 className=&quot;text-xl font-semibold mb-3&quot; style={{color: &apos;#183a37&apos;}}>
                Professional Club Fitting Analysis - Free Golf Tool
              </h2>
              <p className=&quot;mb-3&quot; style={{color: &apos;#183a37&apos;}}>
                Discover the optimal equipment specifications for your game. Our fitting estimator analyzes your physical
                measurements, swing characteristics, and playing style to recommend shaft flex, club length, lie angles, and more.
              </p>
              <div className=&quot;grid md:grid-cols-3 gap-4 text-sm&quot; style={{color: &apos;#183a37&apos;}}>
                <div className=&quot;flex items-center gap-2&quot;>
                  <span className=&quot;w-2 h-2 rounded-full&quot; style={{backgroundColor: &apos;#183a37&apos;}}></span>
                  Personalized Recommendations
                </div>
                <div className=&quot;flex items-center gap-2&quot;>
                  <span className=&quot;w-2 h-2 rounded-full&quot; style={{backgroundColor: &apos;#183a37&apos;}}></span>
                  Scientific Fitting Methods
                </div>
                <div className=&quot;flex items-center gap-2&quot;>
                  <span className=&quot;w-2 h-2 rounded-full&quot; style={{backgroundColor: &apos;#183a37&apos;}}></span>
                  Equipment Optimization
                </div>
              </div>
            </div>

            {/* Warning Notice */}
            <div className=&quot;mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800&quot;>
              <div className=&quot;flex items-start gap-3&quot;>
                <AlertTriangle className=&quot;h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5&quot; />
                <div>
                  <p className=&quot;text-sm text-amber-800 dark:text-amber-200&quot;>
                    <strong>Professional Fitting Recommended:</strong> This tool provides general estimates based on common fitting principles.
                    For optimal results, consult a certified club fitter with launch monitor analysis.
                  </p>
                </div>
              </div>
            </div>

            {/* Current Recommendations */}
            {recommendations.length > 0 && (
              <div className=&quot;mt-6&quot;>
                <h3 className=&quot;text-lg font-semibold mb-4 text-gray-900 dark:text-white&quot;>
                  Fitting Recommendations ({recommendations.length} areas)
                </h3>
                <div className=&quot;grid md:grid-cols-2 gap-4&quot;>
                  {recommendations.map((rec, index) => (
                    <div key={index} className=&quot;p-4 rounded-lg border-2&quot; style={{backgroundColor: &apos;#9CC69B&apos;, borderColor: &apos;#183a37&apos;}}>
                      <div className=&quot;flex items-center justify-between mb-2&quot;>
                        <h4 className=&quot;font-semibold&quot; style={{color: &apos;#183a37&apos;}}>{rec.category}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority}
                        </span>
                      </div>
                      <div className=&quot;text-sm mb-2&quot; style={{color: &apos;#183a37&apos;}}>
                        <strong>Recommendation:</strong> {rec.recommendation}
                      </div>
                      <div className=&quot;text-xs&quot; style={{color: &apos;#183a37&apos;}}>
                        {rec.reasoning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className=&quot;grid lg:grid-cols-2 gap-8&quot;>

            {/* Fitting Form */}
            <Card>
              <CardHeader>
                <CardTitle className=&quot;flex items-center gap-2&quot;>
                  <Plus className=&quot;h-5 w-5&quot; />
                  Club Fitting Analysis
                </CardTitle>
                <CardDescription>
                  Enter your measurements and playing characteristics for personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className=&quot;space-y-4&quot;>

                <div>
                  <Label htmlFor=&quot;sessionName&quot;>Session Name *</Label>
                  <Input
                    id=&quot;sessionName&quot;
                    type=&quot;text&quot;
                    placeholder=&quot;e.g. My 2024 Fitting&quot;
                    value={currentSession.name}
                    onChange={(e) => setCurrentSession(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className=&quot;border-t pt-4&quot;>
                  <h4 className=&quot;font-semibold mb-3&quot;>Player Profile</h4>
                  <div className=&quot;grid grid-cols-2 gap-4&quot;>
                    <div>
                      <Label htmlFor=&quot;handicap&quot;>Handicap Index *</Label>
                      <Input
                        id=&quot;handicap&quot;
                        type=&quot;number&quot;
                        step=&quot;0.1&quot;
                        placeholder=&quot;e.g. 12.5&quot;
                        value={currentSession.handicap}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, handicap: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor=&quot;swingSpeed&quot;>Driver Swing Speed (mph) *</Label>
                      <Input
                        id=&quot;swingSpeed&quot;
                        type=&quot;number&quot;
                        step=&quot;0.1&quot;
                        placeholder=&quot;e.g. 95&quot;
                        value={currentSession.swingSpeed}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, swingSpeed: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className=&quot;grid grid-cols-2 gap-4 mt-3&quot;>
                    <div>
                      <Label htmlFor=&quot;height&quot;>Height (inches)</Label>
                      <Input
                        id=&quot;height&quot;
                        type=&quot;number&quot;
                        step=&quot;0.5&quot;
                        placeholder=&quot;e.g. 70&quot;
                        value={currentSession.height}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, height: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor=&quot;age&quot;>Age</Label>
                      <Input
                        id=&quot;age&quot;
                        type=&quot;number&quot;
                        placeholder=&quot;e.g. 45&quot;
                        value={currentSession.age}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, age: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className=&quot;grid grid-cols-2 gap-4 mt-3&quot;>
                    <div>
                      <Label htmlFor=&quot;playingFrequency&quot;>Playing Frequency</Label>
                      <select
                        id=&quot;playingFrequency&quot;
                        value={currentSession.playingFrequency}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, playingFrequency: e.target.value }))}
                        className=&quot;w-full p-2 border rounded-md&quot;
                      >
                        <option value=&quot;Rarely&quot;>Rarely (few times per year)</option>
                        <option value=&quot;Monthly&quot;>Monthly</option>
                        <option value=&quot;Weekly&quot;>Weekly</option>
                        <option value=&quot;Multiple times per week&quot;>Multiple times per week</option>
                        <option value=&quot;Daily&quot;>Daily</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor=&quot;primaryGoal&quot;>Primary Goal</Label>
                      <select
                        id=&quot;primaryGoal&quot;
                        value={currentSession.primaryGoal}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, primaryGoal: e.target.value }))}
                        className=&quot;w-full p-2 border rounded-md&quot;
                      >
                        <option value=&quot;Lower Scores&quot;>Lower Scores</option>
                        <option value=&quot;More Distance&quot;>More Distance</option>
                        <option value=&quot;Better Accuracy&quot;>Better Accuracy</option>
                        <option value=&quot;More Consistency&quot;>More Consistency</option>
                        <option value=&quot;Better Feel&quot;>Better Feel</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className=&quot;border-t pt-4&quot;>
                  <h4 className=&quot;font-semibold mb-3&quot;>Physical Measurements</h4>
                  <div>
                    <Label htmlFor=&quot;wristToFloor&quot;>Wrist to Floor (inches)</Label>
                    <Input
                      id=&quot;wristToFloor&quot;
                      type=&quot;number&quot;
                      step=&quot;0.5&quot;
                      placeholder=&quot;e.g. 32&quot;
                      value={currentSession.wristToFloor}
                      onChange={(e) => setCurrentSession(prev => ({ ...prev, wristToFloor: e.target.value }))}
                    />
                    <p className=&quot;text-xs text-gray-600 mt-1&quot;>
                      Stand naturally, measure from wrist crease to floor
                    </p>
                  </div>
                </div>

                <div className=&quot;border-t pt-4&quot;>
                  <h4 className=&quot;font-semibold mb-3&quot;>Current Equipment & Ball Flight</h4>
                  <div className=&quot;grid grid-cols-2 gap-4&quot;>
                    <div>
                      <Label htmlFor=&quot;currentClubLength&quot;>Current Club Length</Label>
                      <select
                        id=&quot;currentClubLength&quot;
                        value={currentSession.currentClubLength}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, currentClubLength: e.target.value }))}
                        className=&quot;w-full p-2 border rounded-md&quot;
                      >
                        <option value=&quot;1 inch short&quot;>1 inch short</option>
                        <option value=&quot;0.5 inch short&quot;>0.5 inch short</option>
                        <option value=&quot;Standard&quot;>Standard</option>
                        <option value=&quot;0.5 inch long&quot;>0.5 inch long</option>
                        <option value=&quot;1 inch long&quot;>1 inch long</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor=&quot;currentShaft&quot;>Current Shaft Flex</Label>
                      <select
                        id=&quot;currentShaft&quot;
                        value={currentSession.currentShaft}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, currentShaft: e.target.value }))}
                        className=&quot;w-full p-2 border rounded-md&quot;
                      >
                        <option value=&quot;Ladies&quot;>Ladies</option>
                        <option value=&quot;Senior&quot;>Senior</option>
                        <option value=&quot;Regular&quot;>Regular</option>
                        <option value=&quot;Stiff&quot;>Stiff</option>
                        <option value=&quot;X-Stiff&quot;>X-Stiff</option>
                      </select>
                    </div>
                  </div>

                  <div className=&quot;grid grid-cols-2 gap-4 mt-3&quot;>
                    <div>
                      <Label htmlFor=&quot;ballFlight&quot;>Typical Ball Flight</Label>
                      <select
                        id=&quot;ballFlight&quot;
                        value={currentSession.ballFlight}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, ballFlight: e.target.value }))}
                        className=&quot;w-full p-2 border rounded-md&quot;
                      >
                        <option value=&quot;Low&quot;>Low</option>
                        <option value=&quot;Mid&quot;>Mid</option>
                        <option value=&quot;High&quot;>High</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor=&quot;missPattern&quot;>Primary Miss Pattern</Label>
                      <select
                        id=&quot;missPattern&quot;
                        value={currentSession.missPattern}
                        onChange={(e) => setCurrentSession(prev => ({ ...prev, missPattern: e.target.value }))}
                        className=&quot;w-full p-2 border rounded-md&quot;
                      >
                        <option value=&quot;Straight&quot;>Straight</option>
                        <option value=&quot;Left&quot;>Left</option>
                        <option value=&quot;Right&quot;>Right</option>
                        <option value=&quot;Inconsistent&quot;>Inconsistent</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={saveFittingSession}
                  className=&quot;w-full text-white hover:opacity-90&quot;
                  style={{backgroundColor: &apos;#183a37&apos;}}
                  disabled={!currentSession.name || !currentSession.handicap || !currentSession.swingSpeed}
                >
                  Save Fitting Analysis
                </Button>
              </CardContent>
            </Card>

            {/* Saved Fitting Sessions */}
            <Card>
              <CardHeader>
                <div className=&quot;flex items-center justify-between&quot;>
                  <div>
                    <CardTitle className=&quot;flex items-center gap-2&quot;>
                      <History className=&quot;h-5 w-5&quot; />
                      Saved Fitting Sessions
                    </CardTitle>
                    <CardDescription>
                      Your club fitting analyses ({fittingSessions.length} sessions)
                    </CardDescription>
                  </div>
                  {fittingSessions.length > 0 && (
                    <Button
                      variant=&quot;outline&quot;
                      size=&quot;sm&quot;
                      onClick={clearAllSessions}
                      className=&quot;text-red-600 hover:text-red-700&quot;
                    >
                      <Trash2 className=&quot;h-4 w-4 mr-1&quot; />
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {fittingSessions.length === 0 ? (
                  <div className=&quot;text-center py-8 text-gray-600 dark:text-gray-400&quot;>
                    <Settings className=&quot;h-12 w-12 mx-auto mb-4 opacity-50&quot; />
                    <p>No fitting sessions saved yet.</p>
                    <p className=&quot;text-sm&quot;>Complete your first analysis above.</p>
                  </div>
                ) : (
                  <div className=&quot;space-y-3 max-h-96 overflow-y-auto&quot;>
                    {fittingSessions.map((session) => (
                      <div key={session.id} className=&quot;p-3 rounded-lg&quot; style={{backgroundColor: &apos;#9CC69B&apos;}}>
                        <div className=&quot;flex items-center justify-between mb-2&quot;>
                          <div className=&quot;font-medium text-sm&quot; style={{color: &apos;#183a37&apos;}}>
                            {session.name}
                          </div>
                          <div className=&quot;flex gap-1&quot;>
                            <Button
                              variant=&quot;ghost&quot;
                              size=&quot;sm&quot;
                              onClick={() => loadFittingSession(session)}
                              className=&quot;text-blue-600 hover:text-blue-700 p-1&quot;
                            >
                              Load
                            </Button>
                            <Button
                              variant=&quot;ghost&quot;
                              size=&quot;sm&quot;
                              onClick={() => removeFittingSession(session.id)}
                              className=&quot;text-red-500 hover:text-red-700 p-1&quot;
                            >
                              <Trash2 className=&quot;h-3 w-3&quot; />
                            </Button>
                          </div>
                        </div>
                        <div className=&quot;text-xs&quot; style={{color: &apos;#183a37&apos;}}>
                          {session.playerProfile.handicap} HCP • {session.playerProfile.swingSpeed}mph • {session.recommendations.length} recommendations
                        </div>
                        <div className=&quot;text-xs&quot; style={{color: &apos;#183a37&apos;}}>
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
          <Card className=&quot;mt-8&quot;>
            <CardHeader>
              <CardTitle className=&quot;flex items-center gap-2&quot;>
                <Info className=&quot;h-5 w-5&quot; />
                Understanding Club Fitting
              </CardTitle>
            </CardHeader>
            <CardContent className=&quot;prose prose-sm max-w-none&quot;>
              <div className=&quot;mb-6&quot;>
                <h3 className=&quot;text-lg font-semibold mb-3 text-black&quot;>
                  Complete Guide to Golf Club Fitting
                </h3>
                <p className=&quot;text-black mb-4&quot;>
                  Proper club fitting is essential for maximizing your potential on the golf course. Our estimator uses established
                  fitting principles to analyze your physical characteristics, swing dynamics, and playing style to recommend
                  optimal equipment specifications.
                </p>
              </div>

              <div className=&quot;grid md:grid-cols-2 gap-6 mb-6&quot;>
                <div>
                  <h4 className=&quot;font-semibold mb-3 text-black&quot;>Key Fitting Elements:</h4>
                  <ul className=&quot;text-sm space-y-2 text-black&quot;>
                    <li>• <strong>Shaft Flex:</strong> Matches your swing speed and tempo</li>
                    <li>• <strong>Club Length:</strong> Based on height and wrist-to-floor measurement</li>
                    <li>• <strong>Lie Angle:</strong> Ensures proper sole contact at impact</li>
                    <li>• <strong>Grip Size:</strong> Optimizes hand position and pressure</li>
                    <li>• <strong>Club Head Type:</strong> Matches your skill level and goals</li>
                  </ul>
                </div>
                <div>
                  <h4 className=&quot;font-semibold mb-3 text-black&quot;>Physical Measurements:</h4>
                  <ul className=&quot;text-sm space-y-2 text-black&quot;>
                    <li>• <strong>Height:</strong> Primary factor for club length</li>
                    <li>• <strong>Wrist-to-Floor:</strong> More accurate than height alone</li>
                    <li>• <strong>Hand Size:</strong> Determines proper grip size</li>
                    <li>• <strong>Arm Length:</strong> Affects posture and swing plane</li>
                    <li>• <strong>Flexibility:</strong> Influences shaft flex selection</li>
                  </ul>
                </div>
              </div>

              <div className=&quot;grid md:grid-cols-2 gap-6 mb-6&quot;>
                <div>
                  <h4 className=&quot;font-semibold mb-3 text-black&quot;>Swing Characteristics:</h4>
                  <div className=&quot;text-sm text-black space-y-1&quot;>
                    <p><strong>Swing Speed:</strong> Primary factor for shaft flex</p>
                    <p><strong>Tempo:</strong> Affects shaft kick point preference</p>
                    <p><strong>Ball Flight:</strong> Indicates launch conditions</p>
                    <p><strong>Miss Pattern:</strong> Reveals lie angle needs</p>
                    <p><strong>Attack Angle:</strong> Influences club head selection</p>
                  </div>
                </div>
                <div>
                  <h4 className=&quot;font-semibold mb-3 text-black&quot;>Equipment Impact:</h4>
                  <div className=&quot;text-sm text-black space-y-1&quot;>
                    <p><strong>Distance:</strong> Proper shaft flex maximizes distance</p>
                    <p><strong>Accuracy:</strong> Correct lie angle improves direction</p>
                    <p><strong>Consistency:</strong> Proper length enhances contact</p>
                    <p><strong>Feel:</strong> Right grip size improves control</p>
                    <p><strong>Confidence:</strong> Fitted clubs inspire better swings</p>
                  </div>
                </div>
              </div>

              <div className=&quot;grid md:grid-cols-2 gap-6 mb-6&quot;>
                <div>
                  <h4 className=&quot;font-semibold mb-3 text-black&quot;>Shaft Flex Guidelines:</h4>
                  <div className=&quot;text-sm text-black space-y-1&quot;>
                    <p><strong>Ladies:</strong> &lt; 75 mph swing speed</p>
                    <p><strong>Senior:</strong> 75-84 mph swing speed</p>
                    <p><strong>Regular:</strong> 85-94 mph swing speed</p>
                    <p><strong>Stiff:</strong> 95-104 mph swing speed</p>
                    <p><strong>X-Stiff:</strong> 105+ mph swing speed</p>
                  </div>
                </div>
                <div>
                  <h4 className=&quot;font-semibold mb-3 text-black&quot;>Club Length Adjustments:</h4>
                  <div className=&quot;text-sm text-black space-y-1&quot;>
                    <p><strong>+1 inch:</strong> Very tall players (6&apos;4&quot;+)</p>
                    <p><strong>+0.5 inch:</strong> Tall players (6&apos;1&quot; - 6&apos;3&quot;)</p>
                    <p><strong>Standard:</strong> Average height (5&apos;7&quot; - 6&apos;0&quot;)</p>
                    <p><strong>-0.5 inch:</strong> Shorter players (5&apos;4&quot; - 5&apos;6&quot;)</p>
                    <p><strong>-1 inch:</strong> Very short players (&lt; 5&apos;4&quot;)</p>
                  </div>
                </div>
              </div>

              <div className=&quot;mt-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800&quot;>
                <h4 className=&quot;font-semibold mb-3 text-black&quot;>Why Use Our Club Fitting Estimator?</h4>
                <div className=&quot;grid md:grid-cols-2 gap-4 text-sm&quot;>
                  <div>
                    <p className=&quot;text-black mb-2&quot;>
                      <strong>✓ Scientific Methods:</strong> Based on established fitting principles
                    </p>
                    <p className=&quot;text-black mb-2&quot;>
                      <strong>✓ Comprehensive Analysis:</strong> Covers all major fitting elements
                    </p>
                    <p className=&quot;text-black&quot;>
                      <strong>✓ Personalized Results:</strong> Tailored to your unique characteristics
                    </p>
                  </div>
                  <div>
                    <p className=&quot;text-black mb-2&quot;>
                      <strong>✓ Pre-Fitting Preparation:</strong> Know what to expect from a fitting
                    </p>
                    <p className=&quot;text-black mb-2&quot;>
                      <strong>✓ Equipment Education:</strong> Understand fitting fundamentals
                    </p>
                    <p className=&quot;text-black&quot;>
                      <strong>✓ Free Analysis:</strong> No cost for basic recommendations
                    </p>
                  </div>
                </div>
              </div>

              <div className=&quot;mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800&quot;>
                <p className=&quot;text-sm text-black&quot;>
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