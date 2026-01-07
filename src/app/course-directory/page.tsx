'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { MapPin, ExternalLink, Filter, Calculator } from 'lucide-react'
import golfCourses from '@/data/golfCourses.json'

interface GolfCourse {
  id: number
  name: string
  course: string
  region: string
  tees: Array<{
    name: string
    par: number | string | null
    yardage: number
    source: string
  }>
}

export default function CourseDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  const courses = golfCourses as GolfCourse[]

  // Get unique values for filters
  const regions = Array.from(new Set(courses.map(course => course.region))).sort()

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = searchTerm === '' ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.region.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRegion = selectedRegion === 'all' || course.region === selectedRegion

      return matchesSearch && matchesRegion
    })

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'region':
          return a.region.localeCompare(b.region)
        case 'yardage':
          return Math.max(...b.tees.map(t => t.yardage)) - Math.max(...a.tees.map(t => t.yardage))
        default:
          return 0
      }
    })

    return filtered
  }, [courses, searchTerm, selectedRegion, sortBy])

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
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
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
                    <label className="text-sm font-medium text-slate-600 mb-2 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                        <SelectItem value="region">Region</SelectItem>
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
                {(searchTerm || selectedRegion !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedRegion('all')
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
                    <div className="space-y-6">
                      {/* Header */}
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          {course.name}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-600 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{course.region}</span>
                        </div>
                      </div>

                      {/* Main Tee Info */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Main Tee ({mainTee.name})</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span>Par {mainTee.par}</span>
                          <span>{mainTee.yardage.toLocaleString()} yards</span>
                        </div>
                      </div>

                      {/* All Tees */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">All Tees</h4>
                        <div className="space-y-1 text-sm">
                          {course.tees.map((tee, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="font-medium">{tee.name}:</span>
                              <span>{tee.yardage} yds, Par {tee.par || 'N/A'}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Calculator Action */}
                      <div>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={`/course-handicap-calculator?course=${encodeURIComponent(course.name)}`}>
                            <Calculator className="h-4 w-4 mr-2" />
                            Calculate Handicap
                          </Link>
                        </Button>
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
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600">{courses.length}</div>
                <div className="text-sm text-slate-600">Total Courses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">{regions.length}</div>
                <div className="text-sm text-slate-600">Regions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}