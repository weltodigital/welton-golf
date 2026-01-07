'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { MapPin, Phone, Mail, Star, Users, Calendar, ExternalLink, Filter, Calculator } from 'lucide-react'
import golfCourses from '@/data/golfCourses.json'

interface GolfCourse {
  id: number
  name: string
  course: string
  region: string
  location: string
  type: string
  website: string
  established: number
  tees: Array<{
    name: string
    par: number
    yardage: number
    rating: number
    slope: number
  }>
  description: string
  facilities: string[]
  membership: string
  greenFees: {
    weekday: number
    weekend: number
  }
  contact: {
    phone: string
    email: string
  }
}

export default function CourseDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedMembership, setSelectedMembership] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  const courses = golfCourses as GolfCourse[]

  // Get unique values for filters
  const regions = Array.from(new Set(courses.map(course => course.region))).sort()
  const courseTypes = Array.from(new Set(courses.map(course => course.type))).sort()
  const membershipTypes = Array.from(new Set(courses.map(course => course.membership))).sort()

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = searchTerm === '' ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRegion = selectedRegion === 'all' || course.region === selectedRegion
      const matchesType = selectedType === 'all' || course.type === selectedType
      const matchesMembership = selectedMembership === 'all' || course.membership === selectedMembership

      return matchesSearch && matchesRegion && matchesType && matchesMembership
    })

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'region':
          return a.region.localeCompare(b.region)
        case 'established':
          return b.established - a.established
        case 'price':
          return a.greenFees.weekday - b.greenFees.weekday
        case 'yardage':
          return Math.max(...b.tees.map(t => t.yardage)) - Math.max(...a.tees.map(t => t.yardage))
        default:
          return 0
      }
    })

    return filtered
  }, [courses, searchTerm, selectedRegion, selectedType, selectedMembership, sortBy])

  const getMainTee = (course: GolfCourse) => {
    return course.tees.find(tee => tee.name === 'White') ||
           course.tees.find(tee => tee.name === 'Yellow') ||
           course.tees[0]
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-600 mb-4">
          <ol className="flex space-x-2">
            <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
            <li className="before:content-['/'] before:mx-2 text-slate-900">Course Directory</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-4">
            Golf Course Directory
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover {courses.length} golf courses across Hampshire, Isle of Wight, and the Channel Islands.
            Find detailed information about course ratings, slope ratings, facilities, and green fees.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Search & Filter Courses
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search Bar */}
              <div>
                <Input
                  type="text"
                  placeholder="Search by course name, region, type, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="grid md:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">Region</label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        {regions.map(region => (
                          <SelectItem key={region} value={region}>{region}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">Course Type</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {courseTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">Membership</label>
                    <Select value={selectedMembership} onValueChange={setSelectedMembership}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {membershipTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                        <SelectItem value="region">Region</SelectItem>
                        <SelectItem value="established">Est. Date (Newest)</SelectItem>
                        <SelectItem value="price">Green Fees (Low-High)</SelectItem>
                        <SelectItem value="yardage">Length (Longest)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Results Summary */}
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>
                  Showing {filteredAndSortedCourses.length} of {courses.length} courses
                </span>
                {(searchTerm || selectedRegion !== 'all' || selectedType !== 'all' || selectedMembership !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedRegion('all')
                      setSelectedType('all')
                      setSelectedMembership('all')
                    }}
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Grid */}
        <div className="grid gap-6">
          {filteredAndSortedCourses.length === 0 ? (
            <Card className="p-12 text-center">
              <CardContent>
                <p className="text-lg text-slate-600 mb-4">
                  No courses found matching your criteria
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedRegion('all')
                    setSelectedType('all')
                    setSelectedMembership('all')
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredAndSortedCourses.map((course) => {
              const mainTee = getMainTee(course)
              return (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Main Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                              {course.name}
                            </h3>
                            <div className="flex items-center gap-2 text-slate-600 mb-2">
                              <MapPin className="h-4 w-4" />
                              <span>{course.region}</span>
                              <Badge variant="secondary">{course.type}</Badge>
                              <Badge variant="outline">{course.membership}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <span>Est. {course.established}</span>
                              <span>{course.location}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-700 mb-4">{course.description}</p>

                        {/* Course Stats */}
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Main Tee ({mainTee.name})</h4>
                            <div className="flex items-center gap-4 text-sm">
                              <span>Par {mainTee.par}</span>
                              <span>{mainTee.yardage.toLocaleString()} yards</span>
                              <span>Rating: {mainTee.rating}</span>
                              <span>Slope: {mainTee.slope}</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Green Fees</h4>
                            <div className="flex items-center gap-4 text-sm">
                              <span>Weekday: £{course.greenFees.weekday}</span>
                              <span>Weekend: £{course.greenFees.weekend}</span>
                            </div>
                          </div>
                        </div>

                        {/* Facilities */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-slate-900 mb-2">Facilities</h4>
                          <div className="flex flex-wrap gap-1">
                            {course.facilities.map((facility, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {facility}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Contact & Actions */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Contact</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-slate-600" />
                              <span>{course.contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-slate-600" />
                              <a href={`mailto:${course.contact.email}`} className="text-emerald-600 hover:underline">
                                {course.contact.email}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                            <a href={course.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visit Website
                            </a>
                          </Button>

                          <Button variant="outline" className="w-full" asChild>
                            <Link href={`/course-handicap-calculator?course=${encodeURIComponent(course.name)}`}>
                              <Calculator className="h-4 w-4 mr-2" />
                              Calculate Handicap
                            </Link>
                          </Button>
                        </div>

                        {/* All Tees */}
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">All Tees</h4>
                          <div className="space-y-1 text-xs">
                            {course.tees.map((tee, index) => (
                              <div key={index} className="flex justify-between">
                                <span className="font-medium">{tee.name}:</span>
                                <span>{tee.yardage} yds, Par {tee.par}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Stats Summary */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Directory Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600">{courses.length}</div>
                <div className="text-sm text-slate-600">Total Courses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">{regions.length}</div>
                <div className="text-sm text-slate-600">Regions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">{courseTypes.length}</div>
                <div className="text-sm text-slate-600">Course Types</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">
                  £{Math.round(courses.reduce((sum, course) => sum + course.greenFees.weekday, 0) / courses.length)}
                </div>
                <div className="text-sm text-slate-600">Avg. Green Fee</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}