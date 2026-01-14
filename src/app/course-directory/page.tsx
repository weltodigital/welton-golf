'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowUpDown, Filter } from 'lucide-react'
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

interface TeeRow {
  id: string
  courseName: string
  county: string
  courseType: string
  teeColour: string
  par: number | string | null
  length: number
  courseRating: string
  slopeRating: string
}

export default function CourseDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedCourseType, setSelectedCourseType] = useState('all')
  const [selectedTeeColour, setSelectedTeeColour] = useState('all')
  const [sortBy, setSortBy] = useState('courseName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [showFilters, setShowFilters] = useState(false)

  const courses = golfCourses as GolfCourse[]

  // Transform courses into individual tee rows
  const teeRows = useMemo(() => {
    const rows: TeeRow[] = []
    courses.forEach(course => {
      course.tees.forEach((tee, index) => {
        rows.push({
          id: `${course.id}-${index}`,
          courseName: course.name,
          county: course.region,
          courseType: 'Unknown', // Not available in current data
          teeColour: tee.name,
          par: tee.par,
          length: tee.yardage,
          courseRating: 'N/A', // Not available in current data
          slopeRating: 'N/A' // Not available in current data
        })
      })
    })
    return rows
  }, [courses])

  // Get unique values for filters
  const regions = Array.from(new Set(teeRows.map(row => row.county))).sort()
  const courseTypes = Array.from(new Set(teeRows.map(row => row.courseType))).sort()
  const teeColours = Array.from(new Set(teeRows.map(row => row.teeColour))).sort()

  // Filter and sort tee rows
  const filteredAndSortedRows = useMemo(() => {
    let filtered = teeRows.filter(row => {
      const matchesSearch = searchTerm === '' ||
        row.courseName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRegion = selectedRegion === 'all' || row.county === selectedRegion
      const matchesCourseType = selectedCourseType === 'all' || row.courseType === selectedCourseType
      const matchesTeeColour = selectedTeeColour === 'all' || row.teeColour === selectedTeeColour

      return matchesSearch && matchesRegion && matchesCourseType && matchesTeeColour
    })

    // Sort rows
    filtered.sort((a, b) => {
      let result = 0
      switch (sortBy) {
        case 'courseName':
          result = a.courseName.localeCompare(b.courseName)
          break
        case 'county':
          result = a.county.localeCompare(b.county)
          break
        case 'courseType':
          result = a.courseType.localeCompare(b.courseType)
          break
        case 'teeColour':
          result = a.teeColour.localeCompare(b.teeColour)
          break
        case 'par':
          const parA = typeof a.par === 'number' ? a.par : parseInt(String(a.par).match(/\d+/)?.[0] || '0')
          const parB = typeof b.par === 'number' ? b.par : parseInt(String(b.par).match(/\d+/)?.[0] || '0')
          result = parA - parB
          break
        case 'length':
          result = a.length - b.length
          break
        default:
          return 0
      }
      return sortDirection === 'asc' ? result : -result
    })

    return filtered
  }, [teeRows, searchTerm, selectedRegion, selectedCourseType, selectedTeeColour, sortBy, sortDirection])

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDirection('asc')
    }
  }

  const formatPar = (par: number | string | null): string => {
    if (par === null) return 'N/A'
    if (typeof par === 'number') return par.toString()
    return par.toString()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-4">
            Golf Course Directory
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Complete list of {courses.length} golf courses with {teeRows.length} individual tee options across Hampshire, Isle of Wight, and the Channel Islands.
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
                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">County</label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Counties</SelectItem>
                        {regions.map(region => (
                          <SelectItem key={region} value={region}>{region}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">Course Type</label>
                    <Select value={selectedCourseType} onValueChange={setSelectedCourseType}>
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
                    <label className="text-sm font-medium text-slate-600 mb-2 block">Tee Colour</label>
                    <Select value={selectedTeeColour} onValueChange={setSelectedTeeColour}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tees</SelectItem>
                        {teeColours.map(colour => (
                          <SelectItem key={colour} value={colour}>{colour}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Results Summary */}
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>
                  Showing {filteredAndSortedRows.length} of {teeRows.length} tees from {courses.length} courses
                </span>
                {(searchTerm || selectedRegion !== 'all' || selectedCourseType !== 'all' || selectedTeeColour !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedRegion('all')
                      setSelectedCourseType('all')
                      setSelectedTeeColour('all')
                    }}
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('courseName')} className="font-semibold">
                        Course Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('county')} className="font-semibold">
                        County
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('courseType')} className="font-semibold">
                        Course Type
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('teeColour')} className="font-semibold">
                        Tee Colour
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('par')} className="font-semibold">
                        Par
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort('length')} className="font-semibold">
                        Length (yards)
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="font-semibold">Course Rating</TableHead>
                    <TableHead className="font-semibold">Slope Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="space-y-2">
                          <p className="text-lg text-slate-600">No tees found matching your criteria</p>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSearchTerm('')
                              setSelectedRegion('all')
                              setSelectedCourseType('all')
                              setSelectedTeeColour('all')
                            }}
                          >
                            Reset Filters
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAndSortedRows.map((row) => (
                      <TableRow key={row.id} className="hover:bg-slate-50">
                        <TableCell className="font-medium">{row.courseName}</TableCell>
                        <TableCell>{row.county}</TableCell>
                        <TableCell>{row.courseType}</TableCell>
                        <TableCell>{row.teeColour}</TableCell>
                        <TableCell>{formatPar(row.par)}</TableCell>
                        <TableCell>{row.length.toLocaleString()}</TableCell>
                        <TableCell>{row.courseRating}</TableCell>
                        <TableCell>{row.slopeRating}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <Card className="mt-8">
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
                <div className="text-2xl font-bold text-emerald-600">{teeRows.length}</div>
                <div className="text-sm text-slate-600">Total Tees</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">{regions.length}</div>
                <div className="text-sm text-slate-600">Counties</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">{teeColours.length}</div>
                <div className="text-sm text-slate-600">Tee Colours</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}