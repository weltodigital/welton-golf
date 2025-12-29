'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Target, Trophy } from 'lucide-react'

interface TeeRecommendation {
  id: string
  playerName: string
  handicapIndex: number
  driverDistance: number
  age: number
  experience: string
  playingGoal: string
  recommendedTee: string
  totalYardage: number
  reasoning: string[]
  alternativeTees: { tee: string; reasoning: string }[]
  createdAt: string
}

export default function TeeRecommendationCalculator() {
  const [recommendations, setRecommendations] = useState<TeeRecommendation[]>([])
  const [currentCalc, setCurrentCalc] = useState({
    playerName: '',
    handicapIndex: '',
    driverDistance: '',
    age: '',
    experience: 'Intermediate',
    playingGoal: 'Enjoyment'
  })

  useEffect(() => {
    const savedRecommendations = localStorage.getItem('tee-recommendations')
    if (savedRecommendations) {
      setRecommendations(JSON.parse(savedRecommendations))
    }
  }, [])

  useEffect(() => {
    if (recommendations.length > 0) {
      localStorage.setItem('tee-recommendations', JSON.stringify(recommendations))
    }
  }, [recommendations])

  const getTeeRecommendation = (handicap: number, driverDistance: number, age: number, experience: string, goal: string) => {
    const reasoning: string[] = []
    const alternativeTees: { tee: string; reasoning: string }[] = []

    // Base recommendation on handicap and distance
    let recommendedTee = 'White (Men\'s Regular)'
    let estimatedYardage = 6200

    // Handicap-based recommendations
    if (handicap <= 5) {
      if (driverDistance >= 250) {
        recommendedTee = 'Black/Gold (Championship)'
        estimatedYardage = 6800
        reasoning.push('Low handicap with long driving distance suggests championship tees')
      } else {
        recommendedTee = 'Blue (Back Regular)'
        estimatedYardage = 6400
        reasoning.push('Low handicap player can handle longer course')
      }
    } else if (handicap <= 15) {
      if (driverDistance >= 230) {
        recommendedTee = 'Blue (Back Regular)'
        estimatedYardage = 6400
        reasoning.push('Mid-handicap with good distance can play back tees')
      } else {
        recommendedTee = 'White (Men\'s Regular)'
        estimatedYardage = 6200
        reasoning.push('Mid-handicap with average distance suits regular tees')
      }
    } else if (handicap <= 25) {
      recommendedTee = 'White (Men\'s Regular)'
      estimatedYardage = 6200
      reasoning.push('Higher handicap benefits from moderate length')
    } else {
      recommendedTee = 'Gold/Yellow (Forward)'
      estimatedYardage = 5800
      reasoning.push('High handicap should play shorter course for better scoring')
    }

    // Age adjustments
    if (age >= 65) {
      if (recommendedTee.includes('Black') || recommendedTee.includes('Blue')) {
        recommendedTee = 'White (Men\'s Regular)'
        estimatedYardage = 6200
        reasoning.push('Senior golfers often benefit from shorter course')
      } else if (recommendedTee.includes('White')) {
        recommendedTee = 'Gold/Yellow (Forward)'
        estimatedYardage = 5800
        reasoning.push('Senior golfers may enjoy forward tees more')
      }
    }

    if (age >= 75) {
      recommendedTee = 'Gold/Yellow (Forward)'
      estimatedYardage = 5800
      reasoning.push('Senior golfers should prioritize enjoyment over challenge')
    }

    // Experience adjustments
    if (experience === 'Beginner') {
      recommendedTee = 'Gold/Yellow (Forward)'
      estimatedYardage = 5800
      reasoning.push('Beginners should focus on learning, not distance')
    } else if (experience === 'Advanced' && !recommendedTee.includes('Black')) {
      if (driverDistance >= 240) {
        alternativeTees.push({
          tee: 'Black/Gold (Championship)',
          reasoning: 'Advanced player could consider championship tees for more challenge'
        })
      }
    }

    // Playing goal adjustments
    if (goal === 'Challenge') {
      if (!recommendedTee.includes('Black') && handicap <= 10) {
        alternativeTees.push({
          tee: 'Black/Gold (Championship)',
          reasoning: 'For maximum challenge if playing well'
        })
      }
    } else if (goal === 'Fast Play') {
      if (!recommendedTee.includes('Gold') && !recommendedTee.includes('Yellow')) {
        alternativeTees.push({
          tee: 'Gold/Yellow (Forward)',
          reasoning: 'Shorter course promotes faster play'
        })
      }
    } else if (goal === 'Scoring') {
      // Move one tee up for better scoring
      if (recommendedTee.includes('Black')) {
        recommendedTee = 'Blue (Back Regular)'
        estimatedYardage = 6400
        reasoning.push('Moved up one tee for better scoring opportunities')
      } else if (recommendedTee.includes('Blue')) {
        recommendedTee = 'White (Men\'s Regular)'
        estimatedYardage = 6200
        reasoning.push('Regular tees provide better scoring chances')
      } else if (recommendedTee.includes('White')) {
        recommendedTee = 'Gold/Yellow (Forward)'
        estimatedYardage = 5800
        reasoning.push('Forward tees improve scoring potential')
      }
    }

    // Driver distance specific adjustments
    if (driverDistance < 200) {
      recommendedTee = 'Gold/Yellow (Forward)'
      estimatedYardage = 5800
      reasoning.push('Shorter driving distance benefits from forward tees')
    } else if (driverDistance >= 280 && handicap <= 8) {
      if (!recommendedTee.includes('Black')) {
        alternativeTees.push({
          tee: 'Black/Gold (Championship)',
          reasoning: 'Long driving distance could handle championship tees'
        })
      }
    }

    // Add alternative recommendations
    if (recommendedTee.includes('White')) {
      alternativeTees.push({
        tee: 'Blue (Back Regular)',
        reasoning: 'Consider back tees if playing particularly well'
      })
      alternativeTees.push({
        tee: 'Gold/Yellow (Forward)',
        reasoning: 'Forward tees for more relaxed round'
      })
    }

    return {
      recommendedTee,
      totalYardage: estimatedYardage,
      reasoning,
      alternativeTees: alternativeTees.slice(0, 2) // Limit to 2 alternatives
    }
  }

  const calculateRecommendation = () => {
    const handicap = parseFloat(currentCalc.handicapIndex)
    const driverDistance = parseFloat(currentCalc.driverDistance)
    const age = parseFloat(currentCalc.age)

    if (isNaN(handicap) || isNaN(driverDistance) || isNaN(age)) return

    const result = getTeeRecommendation(handicap, driverDistance, age, currentCalc.experience, currentCalc.playingGoal)

    const newRecommendation: TeeRecommendation = {
      id: Date.now().toString(),
      playerName: currentCalc.playerName || `Handicap ${handicap} Player`,
      handicapIndex: handicap,
      driverDistance,
      age,
      experience: currentCalc.experience,
      playingGoal: currentCalc.playingGoal,
      recommendedTee: result.recommendedTee,
      totalYardage: result.totalYardage,
      reasoning: result.reasoning,
      alternativeTees: result.alternativeTees,
      createdAt: new Date().toLocaleDateString()
    }

    setRecommendations(prev => [newRecommendation, ...prev.slice(0, 19)])

    // Clear form
    setCurrentCalc({
      playerName: '',
      handicapIndex: '',
      driverDistance: '',
      age: '',
      experience: 'Intermediate',
      playingGoal: 'Enjoyment'
    })
  }

  const removeRecommendation = (id: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id))
  }

  const clearAllRecommendations = () => {
    setRecommendations([])
    localStorage.removeItem('tee-recommendations')
  }

  const getTeeColor = (tee: string) => {
    if (tee.includes('Black') || tee.includes('Championship')) return 'bg-gray-800 text-white'
    if (tee.includes('Blue')) return 'bg-blue-600 text-white'
    if (tee.includes('White')) return 'bg-gray-200 text-gray-800'
    if (tee.includes('Gold') || tee.includes('Yellow')) return 'bg-yellow-400 text-gray-800'
    return 'bg-gray-400 text-white'
  }

  return (
    <div className="min-h-screen bg-white ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-600 mb-4">
            <ol className="flex space-x-2">
              <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
              <li className="before:content-['/'] before:mx-2 text-slate-900">Tee Recommendation Calculator</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" className="bg-emerald-100 rounded-xl">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-2">
                  Golf Tee Recommendation Calculator
                </h1>
                <p className="text-slate-600 text-lg">
                  Find the perfect tee box for your skill level, distance, and playing goals for maximum enjoyment.
                </p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Smart Tee Selection - Free Golf Course Management Tool
              </h2>
              <p className="text-slate-700 mb-3">
                Choose the right tee box for optimal challenge and enjoyment. Our calculator considers your handicap,
                driving distance, age, experience, and playing goals to recommend the perfect starting position.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" className="bg-emerald-600"></span>
                  Skill-Based Selection
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" className="bg-emerald-600"></span>
                  Distance Matching
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" className="bg-emerald-600"></span>
                  Goal Optimization
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
                  Tee Recommendation Calculator
                </CardTitle>
                <CardDescription>
                  Enter your playing profile to get personalized tee recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="playerName">Player Name</Label>
                  <Input
                    id="playerName"
                    type="text"
                    placeholder="e.g. John Smith"
                    value={currentCalc.playerName}
                    onChange={(e) => setCurrentCalc(prev => ({...prev, playerName: e.target.value}))}
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Playing Profile</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="handicapIndex">Handicap Index *</Label>
                      <Input
                        id="handicapIndex"
                        type="number"
                        step="0.1"
                        placeholder="e.g. 12.5"
                        value={currentCalc.handicapIndex}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, handicapIndex: e.target.value}))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="driverDistance">Driver Distance (yards) *</Label>
                      <Input
                        id="driverDistance"
                        type="number"
                        step="5"
                        placeholder="e.g. 225"
                        value={currentCalc.driverDistance}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, driverDistance: e.target.value}))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="e.g. 45"
                        value={currentCalc.age}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, age: e.target.value}))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Experience Level</Label>
                      <select
                        id="experience"
                        value={currentCalc.experience}
                        onChange={(e) => setCurrentCalc(prev => ({...prev, experience: e.target.value}))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Beginner">Beginner (0-2 years)</option>
                        <option value="Intermediate">Intermediate (3-10 years)</option>
                        <option value="Advanced">Advanced (10+ years)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Playing Goals</h4>
                  <div>
                    <Label htmlFor="playingGoal">Primary Goal</Label>
                    <select
                      id="playingGoal"
                      value={currentCalc.playingGoal}
                      onChange={(e) => setCurrentCalc(prev => ({...prev, playingGoal: e.target.value}))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Enjoyment">Maximum Enjoyment</option>
                      <option value="Challenge">Challenging Round</option>
                      <option value="Scoring">Best Scoring</option>
                      <option value="Fast Play">Fast Play</option>
                      <option value="Learning">Skill Development</option>
                    </select>
                  </div>
                </div>

                <Button
                  onClick={calculateRecommendation}
                  className="w-full text-white hover:opacity-90"
                  className="bg-emerald-600"
                  disabled={!currentCalc.handicapIndex || !currentCalc.driverDistance || !currentCalc.age}
                >
                  Get Tee Recommendation
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
                      Tee Recommendations
                    </CardTitle>
                    <CardDescription>
                      Your personalized recommendations ({recommendations.length} profiles)
                    </CardDescription>
                  </div>
                  {recommendations.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllRecommendations}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {recommendations.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No tee recommendations yet.</p>
                    <p className="text-sm">Calculate your first recommendation above.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {recommendations.map((recommendation) => (
                      <div key={recommendation.id} className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-slate-900">
                              {recommendation.playerName}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {recommendation.createdAt}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRecommendation(recommendation.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="mb-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTeeColor(recommendation.recommendedTee)}`}>
                            🏌️ {recommendation.recommendedTee}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            ~{recommendation.totalYardage} yards total
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600">Handicap:</p>
                            <p className="font-medium">{recommendation.handicapIndex}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Driver Distance:</p>
                            <p className="font-medium">{recommendation.driverDistance} yards</p>
                          </div>
                        </div>

                        <div className="text-xs space-y-1 pt-2 border-t">
                          <p className="font-medium text-slate-600">Reasoning:</p>
                          {recommendation.reasoning.map((reason, idx) => (
                            <p key={idx} className="text-gray-600">• {reason}</p>
                          ))}

                          {recommendation.alternativeTees.length > 0 && (
                            <div className="mt-2">
                              <p className="font-medium text-slate-600">Alternatives:</p>
                              {recommendation.alternativeTees.map((alt, idx) => (
                                <p key={idx} className="text-gray-600">
                                  • {alt.tee}: {alt.reasoning}
                                </p>
                              ))}
                            </div>
                          )}
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
                Understanding Golf Tee Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Complete Guide to Choosing the Right Tees</h3>
                <p className="text-slate-700 mb-4">
                  Selecting the appropriate tee box is crucial for enjoying golf and playing to your potential.
                  The right tees challenge you appropriately while maintaining reasonable scoring opportunities and pace of play.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Standard Tee Colors & Distances:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Black/Gold (Championship):</strong> 6,800+ yards - Tour pros, +handicaps</li>
                    <li>• <strong>Blue (Back Regular):</strong> 6,400-6,800 yards - Low handicaps (0-8)</li>
                    <li>• <strong>White (Men&apos;s Regular):</strong> 6,000-6,400 yards - Mid handicaps (8-18)</li>
                    <li>• <strong>Gold/Yellow (Forward):</strong> 5,400-6,000 yards - High handicaps, seniors</li>
                    <li>• <strong>Red (Ladies/Forward):</strong> 5,000-5,600 yards - Beginners, juniors</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Key Selection Factors:</h4>
                  <ul className="text-sm space-y-2 text-slate-700">
                    <li>• <strong>Handicap Index:</strong> Primary skill indicator</li>
                    <li>• <strong>Driver Distance:</strong> Determines reachability of holes</li>
                    <li>• <strong>Age & Physical Ability:</strong> Impacts stamina and distance</li>
                    <li>• <strong>Playing Experience:</strong> Course management skills</li>
                    <li>• <strong>Round Goals:</strong> Fun vs. challenge vs. scoring</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Handicap Guidelines:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>+handicap to 5:</strong> Blue or Black tees</p>
                    <p><strong>6 to 15:</strong> White or Blue tees</p>
                    <p><strong>16 to 25:</strong> White or Gold tees</p>
                    <p><strong>25+:</strong> Gold or Forward tees</p>
                    <p><strong>Beginners:</strong> Forward tees regardless of gender</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Distance Considerations:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>280+ yard driver:</strong> Can play back tees</p>
                    <p><strong>250-280 yard driver:</strong> Blue or White tees</p>
                    <p><strong>220-250 yard driver:</strong> White tees ideal</p>
                    <p><strong>200-220 yard driver:</strong> Gold/Forward tees</p>
                    <p><strong>{'<'}200 yard driver:</strong> Forward tees recommended</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Age Adjustments:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Under 50:</strong> Play based on skill</p>
                    <p><strong>50-65:</strong> Consider moving up one tee</p>
                    <p><strong>65-75:</strong> Move up 1-2 tees</p>
                    <p><strong>75+:</strong> Forward tees for enjoyment</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Playing Goals:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Challenge:</strong> Play longer tees</p>
                    <p><strong>Scoring:</strong> Move up one tee</p>
                    <p><strong>Fun/Social:</strong> Prioritize enjoyment</p>
                    <p><strong>Learning:</strong> Shorter is better</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Course Factors:</h4>
                  <div className="text-sm text-slate-700 space-y-1">
                    <p><strong>Course Rating:</strong> Higher = more difficult</p>
                    <p><strong>Slope Rating:</strong> 113+ is challenging</p>
                    <p><strong>Course Conditions:</strong> Firm vs. soft</p>
                    <p><strong>Weather:</strong> Wind affects distance</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-slate-900 mb-3">Why Use Our Tee Recommendation Calculator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-700 mb-2"><strong>✓ Personalized Analysis:</strong> Considers multiple factors</p>
                    <p className="text-slate-700 mb-2"><strong>✓ Skill-Based Selection:</strong> Matches your abilities</p>
                    <p className="text-slate-700"><strong>✓ Goal Optimization:</strong> Aligns with playing objectives</p>
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2"><strong>✓ Alternative Options:</strong> Provides backup choices</p>
                    <p className="text-slate-700 mb-2"><strong>✓ Educational:</strong> Learn tee selection principles</p>
                    <p className="text-slate-700"><strong>✓ Free Tool:</strong> No cost for recommendations</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-slate-700">
                  <strong>Important:</strong> These recommendations are general guidelines based on typical course setups and playing standards.
                  Specific course difficulty, conditions, and personal preference should also influence your tee selection.
                  When in doubt, choose tees that allow you to enjoy the round and maintain reasonable pace of play.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}