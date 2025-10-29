'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Calendar, Users, DollarSign, Plane, Car, Hotel, Trophy } from 'lucide-react'

interface TripData {
  destination: string
  duration: number
  groupSize: number
  budget: number
  accommodationType: string
  transportType: string
  roundsPerDay: number
  courseType: string
  seasonPreference: string
  includeEquipment: boolean
  includeMeals: boolean
  includeActivities: boolean
}

interface TripPlan {
  totalCost: number
  costPerPerson: number
  breakdown: {
    accommodation: number
    greensFeesTotal: number
    greensFeesPerRound: number
    transport: number
    meals: number
    equipment: number
    activities: number
    miscellaneous: number
  }
  recommendations: {
    bestMonths: string[]
    courseTypes: string[]
    packingTips: string[]
    budgetTips: string[]
  }
  schedule: {
    totalRounds: number
    recommendedItinerary: string[]
  }
}

export default function GolfTripPlanner() {
  const [tripData, setTripData] = useState<TripData>({
    destination: '',
    duration: 0,
    groupSize: 1,
    budget: 0,
    accommodationType: '',
    transportType: '',
    roundsPerDay: 1,
    courseType: '',
    seasonPreference: '',
    includeEquipment: false,
    includeMeals: false,
    includeActivities: false
  })

  const [showResults, setShowResults] = useState(false)

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('weltonGolf_tripPlannerData')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setTripData(parsed)
        if (parsed.destination && parsed.duration > 0) {
          setShowResults(true)
        }
      } catch (error) {
        console.error('Error loading saved trip planner data:', error)
      }
    }
  }, [])

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem('weltonGolf_tripPlannerData', JSON.stringify(tripData))
  }, [tripData])

  const tripPlan = useMemo(() => {
    if (!tripData.destination || tripData.duration === 0) {
      return null
    }

    // Destination-based cost multipliers
    const destinationMultipliers: { [key: string]: { accommodation: number, greens: number, meals: number, transport: number } } = {
      'Scotland': { accommodation: 1.2, greens: 1.5, meals: 1.1, transport: 1.3 },
      'Ireland': { accommodation: 1.1, greens: 1.3, meals: 1.0, transport: 1.2 },
      'Spain': { accommodation: 0.8, greens: 1.0, meals: 0.7, transport: 0.9 },
      'Portugal': { accommodation: 0.7, greens: 0.9, meals: 0.6, transport: 0.8 },
      'Dubai/UAE': { accommodation: 1.5, greens: 2.0, meals: 1.4, transport: 1.2 },
      'USA - Florida': { accommodation: 1.0, greens: 1.2, meals: 1.0, transport: 1.0 },
      'USA - California': { accommodation: 1.3, greens: 1.8, meals: 1.2, transport: 1.1 },
      'USA - Carolinas': { accommodation: 0.9, greens: 1.1, meals: 0.9, transport: 0.9 },
      'Thailand': { accommodation: 0.4, greens: 0.6, meals: 0.3, transport: 0.5 },
      'Turkey': { accommodation: 0.5, greens: 0.7, meals: 0.4, transport: 0.6 },
      'UK - England': { accommodation: 1.0, greens: 1.0, meals: 1.0, transport: 1.0 },
      'UK - Wales': { accommodation: 0.8, greens: 0.8, meals: 0.9, transport: 0.9 }
    }

    const multiplier = destinationMultipliers[tripData.destination] || { accommodation: 1.0, greens: 1.0, meals: 1.0, transport: 1.0 }

    // Base costs per night/round/person
    const baseCosts = {
      accommodation: {
        'Budget Hotel/B&B': 80,
        'Mid-Range Hotel': 150,
        'Luxury Hotel/Resort': 300,
        'Self-Catering/Apartment': 60,
        'Golf Resort': 250
      },
      greensFeesPerRound: {
        'Municipal/Public': 40,
        'Resort Courses': 120,
        'Championship/Premium': 200,
        'Links Courses': 150,
        'Mixed Selection': 100
      },
      transport: {
        'Car Rental': 50,
        'Private Transfer': 100,
        'Public Transport': 20,
        'Flight + Car': 200,
        'All-Inclusive Package': 150
      }
    }

    // Calculate accommodation costs (per room, not per person - assume 2 people per room)
    const accommodationPerNight = (baseCosts.accommodation[tripData.accommodationType as keyof typeof baseCosts.accommodation] || 150) * multiplier.accommodation
    const roomsNeeded = Math.ceil(tripData.groupSize / 2) // 2 people per room
    const accommodationTotal = accommodationPerNight * tripData.duration * roomsNeeded

    // Calculate greens fees (per person)
    const greensFeesPerRound = (baseCosts.greensFeesPerRound[tripData.courseType as keyof typeof baseCosts.greensFeesPerRound] || 100) * multiplier.greens
    const totalRounds = tripData.duration * tripData.roundsPerDay
    const greensFeesTotal = greensFeesPerRound * totalRounds * tripData.groupSize

    // Calculate transport costs (per person for flights, shared for local transport)
    const transportBase = baseCosts.transport[tripData.transportType as keyof typeof baseCosts.transport] || 100
    let transportTotal = 0

    // Local transport (shared costs, split by group)
    const localTransportTotal = transportBase * multiplier.transport * tripData.duration

    // Add flight costs for international destinations (per person)
    if (['Scotland', 'Ireland', 'Spain', 'Portugal', 'Dubai/UAE', 'Thailand', 'Turkey'].includes(tripData.destination)) {
      const flightCosts = {
        'Scotland': 200,
        'Ireland': 150,
        'Spain': 180,
        'Portugal': 200,
        'Dubai/UAE': 500,
        'Thailand': 600,
        'Turkey': 300
      }
      const flightCostPerPerson = flightCosts[tripData.destination as keyof typeof flightCosts] || 250
      transportTotal = localTransportTotal + (flightCostPerPerson * tripData.groupSize)
    } else {
      transportTotal = localTransportTotal
    }

    // Calculate meals (per person)
    const mealsPerDay = tripData.includeMeals ? 60 * multiplier.meals : 0
    const mealsTotal = mealsPerDay * tripData.duration * tripData.groupSize

    // Calculate equipment rental (per person)
    const equipmentTotal = tripData.includeEquipment ? 40 * tripData.duration * tripData.groupSize : 0

    // Calculate activities (per person)
    const activitiesTotal = tripData.includeActivities ? 50 * tripData.duration * tripData.groupSize : 0

    // Calculate miscellaneous (tips, souvenirs, etc.) - 10% of total
    const subtotal = accommodationTotal + greensFeesTotal + transportTotal + mealsTotal + equipmentTotal + activitiesTotal
    const miscellaneousTotal = subtotal * 0.1

    // Total costs
    const totalCost = subtotal + miscellaneousTotal
    const costPerPerson = totalCost / tripData.groupSize

    // Generate recommendations
    const getRecommendations = () => {
      const recommendations = {
        bestMonths: [] as string[],
        courseTypes: [] as string[],
        packingTips: [] as string[],
        budgetTips: [] as string[]
      }

      // Best months by destination
      const seasonalRecommendations: { [key: string]: string[] } = {
        'Scotland': ['May', 'June', 'September', 'October'],
        'Ireland': ['May', 'June', 'July', 'August', 'September'],
        'Spain': ['March', 'April', 'May', 'October', 'November'],
        'Portugal': ['March', 'April', 'May', 'September', 'October'],
        'Dubai/UAE': ['November', 'December', 'January', 'February', 'March'],
        'USA - Florida': ['November', 'December', 'January', 'February', 'March'],
        'USA - California': ['March', 'April', 'May', 'September', 'October'],
        'USA - Carolinas': ['April', 'May', 'September', 'October', 'November'],
        'Thailand': ['November', 'December', 'January', 'February'],
        'Turkey': ['April', 'May', 'June', 'September', 'October'],
        'UK - England': ['May', 'June', 'July', 'August', 'September'],
        'UK - Wales': ['May', 'June', 'July', 'August', 'September']
      }

      recommendations.bestMonths = seasonalRecommendations[tripData.destination] || ['May', 'June', 'September', 'October']

      // Course type recommendations
      const courseRecommendations: { [key: string]: string[] } = {
        'Scotland': ['Links courses essential', 'St Andrews region', 'Highland courses'],
        'Ireland': ['Links courses', 'Parkland gems', 'Coastal routes'],
        'Spain': ['Resort courses', 'Costa del Sol', 'Championship layouts'],
        'Portugal': ['Algarve region', 'Resort courses', 'Oceanfront layouts'],
        'Dubai/UAE': ['Desert courses', 'Championship tracks', 'Resort facilities'],
        'USA - Florida': ['Resort courses', 'TPC venues', 'Coastal courses'],
        'Thailand': ['Resort courses', 'Tropical settings', 'Championship layouts'],
        'Turkey': ['Resort courses', 'Mediterranean views', 'Championship tracks']
      }

      recommendations.courseTypes = courseRecommendations[tripData.destination] || ['Championship courses', 'Resort facilities', 'Local gems']

      // Packing tips
      const packingTips: { [key: string]: string[] } = {
        'Scotland': ['Waterproof gear essential', 'Wind-resistant clothing', 'Multiple layers'],
        'Ireland': ['Rain gear', 'Warm layers', 'Waterproof shoes'],
        'Spain': ['Sun protection', 'Light clothing', 'Hydration gear'],
        'Portugal': ['Sun protection', 'Light layers', 'Comfortable shoes'],
        'Dubai/UAE': ['SPF 50+ sunscreen', 'Light colored clothing', 'Cooling towels'],
        'Thailand': ['Lightweight clothing', 'Rain gear', 'Insect repellent'],
        'Turkey': ['Sun protection', 'Comfortable walking shoes', 'Light layers']
      }

      recommendations.packingTips = packingTips[tripData.destination] || ['Weather-appropriate clothing', 'Sun protection', 'Comfortable shoes']

      // Budget tips
      recommendations.budgetTips = [
        'Book tee times in advance for better rates',
        'Consider staying slightly outside resort areas',
        'Look for package deals combining accommodation and golf',
        'Travel during shoulder seasons for lower costs',
        'Consider group discounts for larger parties'
      ]

      if (costPerPerson > 2000) {
        recommendations.budgetTips.push('Consider shorter trip duration to reduce costs')
        recommendations.budgetTips.push('Mix premium and standard courses')
      }

      if (costPerPerson < 1000) {
        recommendations.budgetTips.push('Great value destination - consider extending your stay')
        recommendations.budgetTips.push('Opportunity to play additional premium courses')
      }

      return recommendations
    }

    // Generate itinerary
    const generateItinerary = () => {
      const itinerary = []

      for (let day = 1; day <= tripData.duration; day++) {
        if (tripData.roundsPerDay >= 1) {
          if (day === 1) {
            itinerary.push(`Day ${day}: Arrival, settle in, evening golf round`)
          } else if (day === tripData.duration) {
            itinerary.push(`Day ${day}: Morning golf round, departure`)
          } else {
            if (tripData.roundsPerDay === 2) {
              itinerary.push(`Day ${day}: Morning and afternoon golf rounds`)
            } else {
              itinerary.push(`Day ${day}: Golf round, ${tripData.includeActivities ? 'afternoon activities' : 'leisure time'}`)
            }
          }
        } else {
          itinerary.push(`Day ${day}: Rest day, ${tripData.includeActivities ? 'sightseeing and activities' : 'leisure time'}`)
        }
      }

      return itinerary
    }

    return {
      totalCost: Math.round(totalCost),
      costPerPerson: Math.round(costPerPerson),
      breakdown: {
        accommodation: Math.round(accommodationTotal),
        greensFeesTotal: Math.round(greensFeesTotal),
        greensFeesPerRound: Math.round(greensFeesPerRound),
        transport: Math.round(transportTotal),
        meals: Math.round(mealsTotal),
        equipment: Math.round(equipmentTotal),
        activities: Math.round(activitiesTotal),
        miscellaneous: Math.round(miscellaneousTotal)
      },
      recommendations: getRecommendations(),
      schedule: {
        totalRounds,
        recommendedItinerary: generateItinerary()
      }
    }
  }, [tripData])

  const handleCalculate = () => {
    if (tripData.destination && tripData.duration > 0) {
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setTripData({
      destination: '',
      duration: 0,
      groupSize: 1,
      budget: 0,
      accommodationType: '',
      transportType: '',
      roundsPerDay: 1,
      courseType: '',
      seasonPreference: '',
      includeEquipment: false,
      includeMeals: false,
      includeActivities: false
    })
    setShowResults(false)
    localStorage.removeItem('weltonGolf_tripPlannerData')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-cooper">
            Golf Trip Planner
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Plan your perfect golf getaway with detailed cost breakdowns, recommendations, and itineraries.
            Get accurate budgets for destinations worldwide and optimize your golf travel experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-6 w-6" style={{color: '#9CC69B'}} />
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                Trip Details
              </h2>
            </div>

            <div className="space-y-6">
              {/* Destination */}
              <div>
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Destination *
                </Label>
                <Select
                  value={tripData.destination}
                  onValueChange={(value) => setTripData(prev => ({ ...prev, destination: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your golf destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scotland">Scotland</SelectItem>
                    <SelectItem value="Ireland">Ireland</SelectItem>
                    <SelectItem value="Spain">Spain</SelectItem>
                    <SelectItem value="Portugal">Portugal</SelectItem>
                    <SelectItem value="Dubai/UAE">Dubai/UAE</SelectItem>
                    <SelectItem value="USA - Florida">USA - Florida</SelectItem>
                    <SelectItem value="USA - California">USA - California</SelectItem>
                    <SelectItem value="USA - Carolinas">USA - Carolinas</SelectItem>
                    <SelectItem value="Thailand">Thailand</SelectItem>
                    <SelectItem value="Turkey">Turkey</SelectItem>
                    <SelectItem value="UK - England">UK - England</SelectItem>
                    <SelectItem value="UK - Wales">UK - Wales</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div>
                <Label htmlFor="duration" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Trip Duration (nights) *
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="e.g., 5"
                  value={tripData.duration || ''}
                  onChange={(e) => setTripData(prev => ({
                    ...prev,
                    duration: parseInt(e.target.value) || 0
                  }))}
                  className="w-full"
                />
              </div>

              {/* Group Size */}
              <div>
                <Label htmlFor="groupSize" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Group Size *
                </Label>
                <Input
                  id="groupSize"
                  type="number"
                  placeholder="e.g., 4"
                  value={tripData.groupSize || ''}
                  onChange={(e) => setTripData(prev => ({
                    ...prev,
                    groupSize: parseInt(e.target.value) || 1
                  }))}
                  className="w-full"
                />
              </div>

              {/* Accommodation Type */}
              <div>
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Accommodation Type
                </Label>
                <Select
                  value={tripData.accommodationType}
                  onValueChange={(value) => setTripData(prev => ({ ...prev, accommodationType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Budget Hotel/B&B">Budget Hotel/B&B</SelectItem>
                    <SelectItem value="Mid-Range Hotel">Mid-Range Hotel</SelectItem>
                    <SelectItem value="Luxury Hotel/Resort">Luxury Hotel/Resort</SelectItem>
                    <SelectItem value="Self-Catering/Apartment">Self-Catering/Apartment</SelectItem>
                    <SelectItem value="Golf Resort">Golf Resort</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Transport Type */}
              <div>
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Transport Type
                </Label>
                <Select
                  value={tripData.transportType}
                  onValueChange={(value) => setTripData(prev => ({ ...prev, transportType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transport type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Car Rental">Car Rental</SelectItem>
                    <SelectItem value="Private Transfer">Private Transfer</SelectItem>
                    <SelectItem value="Public Transport">Public Transport</SelectItem>
                    <SelectItem value="Flight + Car">Flight + Car</SelectItem>
                    <SelectItem value="All-Inclusive Package">All-Inclusive Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rounds Per Day */}
              <div>
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Rounds Per Day
                </Label>
                <Select
                  value={tripData.roundsPerDay.toString()}
                  onValueChange={(value) => setTripData(prev => ({ ...prev, roundsPerDay: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rounds per day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Rest Days Only</SelectItem>
                    <SelectItem value="1">1 Round Per Day</SelectItem>
                    <SelectItem value="2">2 Rounds Per Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Course Type */}
              <div>
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Course Type Preference
                </Label>
                <Select
                  value={tripData.courseType}
                  onValueChange={(value) => setTripData(prev => ({ ...prev, courseType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select course type preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Municipal/Public">Municipal/Public</SelectItem>
                    <SelectItem value="Resort Courses">Resort Courses</SelectItem>
                    <SelectItem value="Championship/Premium">Championship/Premium</SelectItem>
                    <SelectItem value="Links Courses">Links Courses</SelectItem>
                    <SelectItem value="Mixed Selection">Mixed Selection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Options */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Additional Services
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={tripData.includeEquipment}
                      onChange={(e) => setTripData(prev => ({ ...prev, includeEquipment: e.target.checked }))}
                      className="rounded border-slate-300"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Include equipment rental</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={tripData.includeMeals}
                      onChange={(e) => setTripData(prev => ({ ...prev, includeMeals: e.target.checked }))}
                      className="rounded border-slate-300"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Include meals budget</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={tripData.includeActivities}
                      onChange={(e) => setTripData(prev => ({ ...prev, includeActivities: e.target.checked }))}
                      className="rounded border-slate-300"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Include non-golf activities</span>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleCalculate}
                  disabled={!tripData.destination || tripData.duration === 0}
                  className="flex-1 text-white"
                  style={{backgroundColor: '#183a37'}}
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

          {/* Results */}
          {showResults && tripPlan && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="h-6 w-6" style={{color: '#9CC69B'}} />
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  Trip Plan & Budget
                </h2>
              </div>

              <div className="space-y-6">
                {/* Cost Summary */}
                <div className="p-4 rounded-lg border-2" style={{backgroundColor: '#9CC69B', borderColor: '#183a37'}}>
                  <h3 className="text-xl font-bold mb-2" style={{color: '#183a37'}}>
                    Total Trip Cost
                  </h3>
                  <div className="text-3xl font-bold text-white mb-2">
                    £{tripPlan.totalCost.toLocaleString()}
                  </div>
                  <div className="text-lg font-semibold" style={{color: '#183a37'}}>
                    £{tripPlan.costPerPerson.toLocaleString()} per person
                  </div>
                  <div className="text-sm" style={{color: '#183a37'}}>
                    {tripData.groupSize} people × {tripData.duration} nights × {tripPlan.schedule.totalRounds} rounds
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                    Cost Breakdown
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded">
                      <span>Accommodation ({tripData.duration} nights)</span>
                      <span className="font-medium">£{tripPlan.breakdown.accommodation.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded">
                      <span>Greens Fees ({tripPlan.schedule.totalRounds} rounds)</span>
                      <span className="font-medium">£{tripPlan.breakdown.greensFeesTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded">
                      <span>Transport & Travel</span>
                      <span className="font-medium">£{tripPlan.breakdown.transport.toLocaleString()}</span>
                    </div>
                    {tripPlan.breakdown.meals > 0 && (
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded">
                        <span>Meals</span>
                        <span className="font-medium">£{tripPlan.breakdown.meals.toLocaleString()}</span>
                      </div>
                    )}
                    {tripPlan.breakdown.equipment > 0 && (
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded">
                        <span>Equipment Rental</span>
                        <span className="font-medium">£{tripPlan.breakdown.equipment.toLocaleString()}</span>
                      </div>
                    )}
                    {tripPlan.breakdown.activities > 0 && (
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded">
                        <span>Activities</span>
                        <span className="font-medium">£{tripPlan.breakdown.activities.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded">
                      <span>Miscellaneous (10%)</span>
                      <span className="font-medium">£{tripPlan.breakdown.miscellaneous.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Per Round Cost */}
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded">
                  <div className="text-center">
                    <div className="text-lg font-bold" style={{color: '#183a37'}}>
                      £{tripPlan.breakdown.greensFeesPerRound} per round
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Average greens fees
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Recommendations and Itinerary */}
        {showResults && tripPlan && (
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            {/* Recommendations */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-6 w-6" style={{color: '#9CC69B'}} />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Recommendations
                </h3>
              </div>

              <div className="space-y-6">
                {/* Best Months */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Best Months to Visit
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tripPlan.recommendations.bestMonths.map((month) => (
                      <span
                        key={month}
                        className="px-3 py-1 rounded text-sm text-white"
                        style={{backgroundColor: '#183a37'}}
                      >
                        {month}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Course Types */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Recommended Course Types
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    {tripPlan.recommendations.courseTypes.map((type, index) => (
                      <li key={index}>• {type}</li>
                    ))}
                  </ul>
                </div>

                {/* Packing Tips */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Packing Tips
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    {tripPlan.recommendations.packingTips.map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Budget Tips */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Money-Saving Tips
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    {tripPlan.recommendations.budgetTips.slice(0, 3).map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Itinerary */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-6 w-6" style={{color: '#9CC69B'}} />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Suggested Itinerary
                </h3>
              </div>

              <div className="space-y-3">
                {tripPlan.schedule.recommendedItinerary.map((day, index) => (
                  <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700 rounded">
                    <div className="text-sm text-slate-700 dark:text-slate-300">
                      {day}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-700 rounded">
                <div className="text-center text-sm">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Total Golf Rounds: {tripPlan.schedule.totalRounds}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    {tripData.roundsPerDay} round{tripData.roundsPerDay !== 1 ? 's' : ''} per day
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Educational Content */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Plane className="h-5 w-5" style={{color: '#9CC69B'}} />
              Planning Tips
            </h3>
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <p><strong>Book Early:</strong> Reserve tee times and accommodation 3-6 months in advance for popular destinations.</p>
              <p><strong>Travel Insurance:</strong> Essential for international golf trips, especially for equipment coverage.</p>
              <p><strong>Weather Backup:</strong> Have indoor alternatives planned for poor weather days.</p>
              <p><strong>Group Dynamics:</strong> Consider skill levels when selecting courses for mixed ability groups.</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Car className="h-5 w-5" style={{color: '#9CC69B'}} />
              Transport Guide
            </h3>
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <p><strong>Car Rental:</strong> Most flexible option, essential for remote golf courses.</p>
              <p><strong>Private Transfer:</strong> Convenient but more expensive, good for groups.</p>
              <p><strong>Golf Packages:</strong> Often include transfers between courses and accommodation.</p>
              <p><strong>International Driving:</strong> Check license requirements and insurance coverage abroad.</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Hotel className="h-5 w-5" style={{color: '#9CC69B'}} />
              Accommodation Tips
            </h3>
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <p><strong>Golf Resorts:</strong> Convenient but can be limiting for exploring different courses.</p>
              <p><strong>Central Location:</strong> Choose accommodation that minimizes travel time to courses.</p>
              <p><strong>Self-Catering:</strong> Can significantly reduce meal costs, especially for longer trips.</p>
              <p><strong>Group Bookings:</strong> Negotiate rates for larger groups or multiple rooms.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}