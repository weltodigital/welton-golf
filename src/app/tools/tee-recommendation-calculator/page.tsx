'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, Info, History, Target, Trophy, MapPin, Users } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Golf Tee Recommendation Calculator 2026 - Perfect Tee Selection | Welton Golf',
  description: 'Find the perfect golf tee box for your skill level with our free tee recommendation calculator. Based on handicap, distance, age, and playing goals for optimal enjoyment.',
  keywords: 'golf tee selection, tee box calculator, golf course tees, handicap tee guide, golf distance calculator, course management, golf tee recommendation',
  openGraph: {
    title: 'Free Golf Tee Recommendation Calculator 2026 - Smart Tee Selection',
    description: 'Choose the perfect tee box based on your handicap, driving distance, age, and playing goals. Get personalized recommendations for optimal golf enjoyment.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/tee-recommendation-calculator',
    images: [
      {
        url: 'https://www.weltongolf.com/tee-recommendation-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Golf Tee Recommendation Calculator - Perfect Tee Selection',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/tee-recommendation-calculator',
  },
}

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

function TeeRecommendationCalculator() {
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Golf Tee Recommendation Calculator',
    applicationCategory: 'Sports Application',
    description: 'Smart golf tee selection calculator that recommends the perfect tee box based on handicap, driving distance, age, experience, and playing goals.',
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
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                  Free Golf Tee Recommendation Calculator 2026
                </h1>
                <p className="text-gray-700 text-lg">
                  Find the perfect tee box for your skill level, distance, and playing goals for maximum enjoyment.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Smart Tee Selection - Free Golf Course Management Tool
              </h2>
              <p className="text-gray-700 mb-3">
                Choose the optimal tee box for perfect challenge and enjoyment. Our intelligent calculator considers your handicap,
                driving distance, age, experience, and playing goals to recommend the ideal starting position for every round.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Skill-Based Selection
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  Distance Matching
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
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
                  className="w-full text-white hover:opacity-90 bg-emerald-600"
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
                            <h4 className="font-medium text-gray-900">
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
                          <p className="font-medium text-gray-600">Reasoning:</p>
                          {recommendation.reasoning.map((reason, idx) => (
                            <p key={idx} className="text-gray-600">• {reason}</p>
                          ))}

                          {recommendation.alternativeTees.length > 0 && (
                            <div className="mt-2">
                              <p className="font-medium text-gray-600">Alternatives:</p>
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
          <div className="mt-12 space-y-12">
            {/* Tee Selection Fundamentals */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-emerald-600" />
                Mastering Golf Tee Selection: The Key to Enjoyable Golf
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Choosing the right tee box is one of the most important decisions you make before each round. The perfect tee
                selection balances challenge with enjoyment, ensuring you can play shots that match your skill level while
                maintaining good pace of play and scoring opportunities.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Standard Tee System & Distances:</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800 text-white rounded border">
                      <p className="font-medium">Black/Championship Tees</p>
                      <p className="text-sm">6,800+ yards • Tour pros • +handicaps</p>
                    </div>
                    <div className="p-3 bg-blue-600 text-white rounded border">
                      <p className="font-medium">Blue/Back Tees</p>
                      <p className="text-sm">6,400-6,800 yards • 0-8 handicaps</p>
                    </div>
                    <div className="p-3 bg-gray-200 text-gray-800 rounded border">
                      <p className="font-medium">White/Regular Tees</p>
                      <p className="text-sm">6,000-6,400 yards • 8-18 handicaps</p>
                    </div>
                    <div className="p-3 bg-yellow-400 text-gray-800 rounded border">
                      <p className="font-medium">Gold/Forward Tees</p>
                      <p className="text-sm">5,400-6,000 yards • 18+ handicaps, seniors</p>
                    </div>
                    <div className="p-3 bg-red-500 text-white rounded border">
                      <p className="font-medium">Red/Ladies Tees</p>
                      <p className="text-sm">5,000-5,600 yards • Beginners, juniors</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Key Selection Factors:</h3>
                  <ul className="text-gray-700 space-y-3 mb-4">
                    <li>• <strong>Handicap Index:</strong> Primary indicator of skill level and course management</li>
                    <li>• <strong>Driver Distance:</strong> Determines reachability of holes and second shot positions</li>
                    <li>• <strong>Age & Physical Condition:</strong> Affects stamina and distance over 18 holes</li>
                    <li>• <strong>Experience Level:</strong> Course management and strategic thinking ability</li>
                    <li>• <strong>Round Goals:</strong> Competition, casual play, learning, or socializing</li>
                  </ul>
                  <div className="p-4 bg-emerald-50 rounded border">
                    <p className="text-emerald-900 text-sm font-medium">Golden Rule:</p>
                    <p className="text-emerald-800 text-sm">Choose tees where you can reach most greens in regulation with well-struck shots</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Handicap-Based Guidelines */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="h-6 w-6 text-emerald-600" />
                Scientific Tee Selection: Handicap and Distance Guidelines
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Modern tee selection uses data-driven approaches combining handicap index with driving distance to optimize
                the golf experience. These guidelines are based on extensive research and PGA recommendations for proper
                course setup and player enjoyment.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Handicap-Based Recommendations:</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded border">
                      <p className="text-green-900 font-medium">Scratch to 5 Handicap</p>
                      <p className="text-green-800 text-sm">Blue or Black tees • Can handle longer courses</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded border">
                      <p className="text-blue-900 font-medium">6-15 Handicap</p>
                      <p className="text-blue-800 text-sm">White or Blue tees • Balance of challenge and scoring</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded border">
                      <p className="text-amber-900 font-medium">16-25 Handicap</p>
                      <p className="text-amber-800 text-sm">White or Gold tees • Focus on skill development</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded border">
                      <p className="text-red-900 font-medium">25+ Handicap</p>
                      <p className="text-red-800 text-sm">Gold/Forward tees • Enjoyment over difficulty</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Driver Distance Guidelines:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>280+ yards:</strong> Championship/Black tees suitable</p>
                    <p><strong>250-280 yards:</strong> Blue or White tees optimal</p>
                    <p><strong>220-250 yards:</strong> White tees ideal choice</p>
                    <p><strong>200-220 yards:</strong> Gold/Forward tees recommended</p>
                    <p><strong>Under 200 yards:</strong> Forward tees strongly advised</p>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded border">
                    <p className="text-blue-900 text-sm font-medium">Distance Tip:</p>
                    <p className="text-blue-800 text-sm">Use your average carry distance, not your best drive, for tee selection</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Age Considerations:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Under 50:</strong> Play based purely on skill level</p>
                    <p><strong>50-65:</strong> Consider moving up one tee set</p>
                    <p><strong>65-75:</strong> Move forward 1-2 tee sets</p>
                    <p><strong>75+:</strong> Prioritize enjoyment with forward tees</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Senior Benefits:</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>• Reduced walking distance</p>
                      <p>• Better scoring opportunities</p>
                      <p>• Faster pace of play</p>
                      <p>• More enjoyable experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Strategic Considerations */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Users className="h-6 w-6 text-emerald-600" />
                Strategic Tee Selection: Goals, Groups, and Course Factors
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Beyond handicap and distance, successful tee selection considers your playing goals, group dynamics, and
                specific course characteristics. Smart golfers adjust their tee selection based on these situational factors
                for the best possible round experience.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Playing Goal Adjustments:</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Maximum Challenge:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Move back one tee set from normal</li>
                        <li>• Test skills against course design</li>
                        <li>• Accept higher scores for learning</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Best Scoring:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Move forward one tee set</li>
                        <li>• Maximize birdie opportunities</li>
                        <li>• Build confidence with easier shots</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Learning/Practice:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Choose tees that allow full shots</li>
                        <li>• Focus on technique over distance</li>
                        <li>• Prioritize course management lessons</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Social/Business Golf:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Ensure comfortable pace of play</li>
                        <li>• Match playing partner abilities</li>
                        <li>• Prioritize conversation over challenge</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Course-Specific Factors:</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Course Rating & Slope:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Higher ratings = more difficult</li>
                        <li>• Slope over 130 = very challenging</li>
                        <li>• Consider moving forward on tough courses</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Weather Conditions:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Headwinds: Move forward for distance loss</li>
                        <li>• Rain: Shorter tees for softer conditions</li>
                        <li>• Cold weather: Account for reduced distance</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Course Conditions:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Firm conditions: Ball runs farther</li>
                        <li>• Soft conditions: Less roll, play shorter</li>
                        <li>• Fast greens: Approach shot precision crucial</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Group Dynamics:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Match group's general skill level</li>
                        <li>• Consider slowest player's capabilities</li>
                        <li>• Ensure everyone can enjoy the round</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border">
                <h4 className="font-bold text-gray-900 mb-3">Why Use Our Tee Recommendation Calculator?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>✓ Multi-Factor Analysis:</strong> Considers all relevant variables</p>
                    <p className="text-gray-700 mb-2"><strong>✓ Personalized Recommendations:</strong> Tailored to your profile</p>
                    <p className="text-gray-700"><strong>✓ Alternative Options:</strong> Multiple tee suggestions with reasoning</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>✓ Goal-Based Selection:</strong> Matches your round objectives</p>
                    <p className="text-gray-700 mb-2"><strong>✓ Educational Value:</strong> Learn tee selection principles</p>
                    <p className="text-gray-700"><strong>✓ Free Analysis:</strong> Professional recommendations at no cost</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-gray-700">
                  <strong>Important Note:</strong> These recommendations are based on general golf course standards and typical conditions.
                  Individual course difficulty, specific hole layouts, weather conditions, and personal preferences should all factor
                  into your final tee selection. When in doubt, choose tees that allow you to reach most greens in regulation and
                  maintain reasonable pace of play for your group.
                </p>
              </div>
            </Card>
        </div>
      </div>
    </>
  )
}

export default function TeeRecommendationCalculatorPage() {
  return <TeeRecommendationCalculator />
}