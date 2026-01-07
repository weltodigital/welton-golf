'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CourseDirectory() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <nav className="text-sm text-slate-600 mb-4">
          <ol className="flex space-x-2">
            <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
            <li><span className="mx-2 text-slate-400">Course Directory</span></li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-4">
            Golf Course Directory
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Find golf courses in your area with detailed information about course ratings,
            slope ratings, and playing statistics.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              Search Courses
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Search by course name or location
                </label>
                <Input
                  type="text"
                  placeholder="Enter course name or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full mt-1"
                />
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Search Courses
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              Course Information
            </h2>

            <div className="space-y-4 text-sm text-slate-600">
              <p>Search for golf courses to view detailed information including:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Course and slope ratings</li>
                <li>Par information for different tees</li>
                <li>Course length and yardage</li>
                <li>Course type and style</li>
                <li>Location and county details</li>
              </ul>

              {searchTerm && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                  <p className="text-emerald-700">
                    Searching for: &quot;{searchTerm}&quot;
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="mt-12">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Featured Courses
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <h4 className="font-semibold text-slate-900">Sample Golf Club</h4>
                <p className="text-sm text-slate-600">Hampshire, England</p>
                <p className="text-sm text-slate-600">Par 72 • 6,200 yards</p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <h4 className="font-semibold text-slate-900">Example Course</h4>
                <p className="text-sm text-slate-600">Surrey, England</p>
                <p className="text-sm text-slate-600">Par 71 • 6,100 yards</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}