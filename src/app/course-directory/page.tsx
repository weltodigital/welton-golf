'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, ChevronUp, ChevronDown } from 'lucide-react'

// Golf course data - Hampshire, Isle of Wight, Channel Islands
const courseData = [
  {
    id: 1,
    name: "Les Mielles Golf and Country Club",
    courseName: "", // Single course, so blank
    location: "St Peter, Jersey",
    county: "Jersey",
    country: "Channel Islands",
    par: {
      male: 70,
      female: 71
    },
    courseRating: {
      white: { male: 68.2 },
      yellow: { male: 67.3 },
      red: { female: 71.2 },
      blue: { female: 69.2 }
    },
    slopeRating: {
      white: { male: 119 },
      yellow: { male: 116 },
      red: { female: 135 },
      blue: { female: 124 }
    },
    length: {
      white: 5607,
      yellow: 5376,
      red: 5031,
      blue: 4576
    },
    established: 1976,
    type: "Parkland",
    style: "American Style Parkland"
  },
  {
    id: 2,
    name: "Osborne Golf Club",
    courseName: "",
    location: "East Cowes",
    county: "Isle of Wight",
    country: "England",
    par: {
      male: 70, // for White, Yellow, Blue tees
      female: 73, // for all female tees
      malered: 73, // special par for Red male tees
    },
    courseRating: {
      white: { male: 70.9, female: 77.2 },
      yellow: { male: 69.8, female: 76.3 },
      red: { male: 67.9, female: 73.4 },
      blue: { male: 67.2, female: 72.7 }
    },
    slopeRating: {
      white: { male: 128, female: 137 },
      yellow: { male: 127, female: 134 },
      red: { male: 119, female: 127 },
      blue: { male: 117, female: 124 }
    },
    length: {
      white: null, // Length not available
      yellow: null, // Length not available
      red: null, // Length not available
      blue: null // Length not available
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 3,
    name: "Andover Golf Club",
    courseName: "",
    location: "Andover",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White, Yellow tees
      female: 73, // for Red female tee
      malered: 72, // special par for Red male tees
      femaleyellow: 70, // special par for Yellow female tees
    },
    courseRating: {
      white: { male: 69.4 },
      yellow: { male: 68.4, female: 74.5 },
      red: { male: 66.9, female: 73.1 },
      blue: { } // No data provided
    },
    slopeRating: {
      white: { male: 122 },
      yellow: { male: 121, female: 130 },
      red: { male: 120, female: 128 },
      blue: { } // No data provided
    },
    length: {
      white: 6096, // From CSV data
      yellow: null, // Length not available from reliable source
      red: null, // Length not available from reliable source
      blue: null // Length not available from reliable source
    },
    established: 1907,
    type: "Downland"
  },
  {
    id: 4,
    name: "Old Thorns Hotel and Resort",
    courseName: "",
    location: "Liphook",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72,
      female: 72
    },
    courseRating: {
      white: { male: 71.5 },
      yellow: { male: 69.3 },
      red: { male: 66.6, female: 71.4 },
      blue: { } // No data provided
    },
    slopeRating: {
      white: { male: 135 },
      yellow: { male: 127 },
      red: { male: 112, female: 123 },
      blue: { } // No data provided
    },
    length: {
      white: 6471, // From CSV data
      yellow: 6036, // From CSV data
      red: 5296, // From CSV data
      blue: null // No data available
    },
    established: 1976,
    type: "Parkland"
  },
  {
    id: 5,
    name: "Test Valley Golf Club",
    courseName: "",
    location: "Overton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White, Yellow, Black tees
      female: 72, // for Red female, Yellow female tees
      malered: 70, // special par for Red male tees
      maleblue: 68, // special par for Blue male tees
      femaleblue: 71, // special par for Blue female tees
    },
    courseRating: {
      white: { male: 71.7 },
      yellow: { male: 69.8, female: 75.5 },
      black: { male: 72.5 },
      red: { male: 67.5, female: 72.5 },
      blue: { male: 65.4, female: 70.1 }
    },
    slopeRating: {
      white: { male: 129 },
      yellow: { male: 124, female: 131 },
      black: { male: 128 },
      red: { male: 119, female: 126 },
      blue: { male: 114, female: 120 }
    },
    length: {
      white: 6682, // From CSV data
      yellow: 6105, // From CSV data
      black: null, // Length not available from reliable source
      red: 5580, // From CSV data
      blue: 5145 // From CSV data
    },
    established: 1992,
    type: "Parkland"
  },
  {
    id: 6,
    name: "Barton on Sea Golf Club",
    courseName: "Stroller-Becton",
    location: "New Milton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for Red male tees
      female: 72, // for Red female tees
      maleyellow: 70, // for Yellow male tees
      malewhite: 71, // for White male tees
    },
    courseRating: {
      yellow: { male: 68.6 },
      white: { male: 69.9 },
      red: { male: 66.4, female: 71.5 }
    },
    slopeRating: {
      yellow: { male: 115 },
      white: { male: 119 },
      red: { male: 109, female: 123 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null // Length not available from reliable source
    },
    established: 1897,
    type: "Clifftop"
  },
  {
    id: 7,
    name: "Barton on Sea Golf Club",
    courseName: "Needles-Stroller",
    location: "New Milton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for Red male tees
      female: 72, // for Red female tees
      malewhite: 71, // for White male tees
      maleyellow: 71, // for Yellow male tees
    },
    courseRating: {
      red: { female: 71.3, male: 66.3 },
      white: { male: 70.7 },
      yellow: { male: 68.5 }
    },
    slopeRating: {
      red: { female: 117, male: 103 },
      white: { male: 116 },
      yellow: { male: 112 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null // Length not available from reliable source
    },
    established: 1897,
    type: "Clifftop"
  },
  {
    id: 8,
    name: "Barton on Sea Golf Club",
    courseName: "Becton-Needles",
    location: "New Milton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for Red male and White male tees
      female: 72, // for Red female tees
      maleyellow: 71, // for Yellow male tees
    },
    courseRating: {
      yellow: { male: 68.7 },
      red: { female: 71.6, male: 66.3 },
      white: { male: 70.6 }
    },
    slopeRating: {
      yellow: { male: 113 },
      red: { female: 120, male: 111 },
      white: { male: 119 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null // Length not available from reliable source
    },
    established: 1897,
    type: "Clifftop"
  },
  {
    id: 9,
    name: "Blackwater Valley Golf Centre",
    courseName: "",
    location: "Yately",
    county: "Hampshire",
    country: "England",
    par: {
      male: 66, // for Red and White male tees
      female: 64, // for White female tees
      femalered: 63, // for Red female tees
    },
    courseRating: {
      red: { male: 59, female: 60.4 },
      white: { male: 60.4, female: 63.2 }
    },
    slopeRating: {
      red: { male: 89, female: 92 },
      white: { male: 93, female: 99 }
    },
    length: {
      white: null, // Length not available from reliable source
      red: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 10,
    name: "East Horton Golf Club",
    courseName: "Greenwood",
    location: "East Horton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 71, // for Red female and White male tees
      female: 71, // for Red female tees
      maleyellow: 69, // for Yellow male tees
    },
    courseRating: {
      red: { female: 70.9 },
      white: { male: 70.1 },
      yellow: { male: 68.4 }
    },
    slopeRating: {
      red: { female: 121 },
      white: { male: 123 },
      yellow: { male: 117 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 11,
    name: "East Horton Golf Club",
    courseName: "Parkland",
    location: "East Horton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 69, // for White and Yellow male tees
      female: 69, // for Red female tees
    },
    courseRating: {
      red: { female: 70.3 },
      white: { male: 67.9 },
      yellow: { male: 67.1 }
    },
    slopeRating: {
      red: { female: 119 },
      white: { male: 111 },
      yellow: { male: 108 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 12,
    name: "Wellow Golf Club",
    courseName: "Embley-Blackwater",
    location: "Romsey",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White, Yellow, Red male tees
      female: 72, // for Red, Red Alternative, Yellow Alternative, White Alternative female tees
      femalewhite: 73, // for White female tees
      femaleyellow: 71, // for Yellow female tees
      malewinter: 68, // for Winter male tees
      femalewinter: 69, // for Winter female tees
    },
    courseRating: {
      white: { male: 71.4, female: 78 },
      yellow: { male: 69.4, female: 76.4 },
      red: { male: 67.8, female: 74.2 },
      "white alternative": { male: 69.7, female: 75.9 },
      "yellow alternative": { male: 68.9, female: 75.5 },
      "red alternative": { male: 67.7, female: 74.2 },
      winter: { male: 66.3, female: 71.6 }
    },
    slopeRating: {
      white: { male: 124, female: 143 },
      yellow: { male: 125, female: 136 },
      red: { male: 121, female: 132 },
      "white alternative": { male: 122, female: 140 },
      "yellow alternative": { male: 120, female: 132 },
      "red alternative": { male: 119, female: 132 },
      winter: { male: 113, female: 129 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null, // Length not available from reliable source
      "white alternative": null,
      "yellow alternative": null,
      "red alternative": null,
      winter: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 13,
    name: "Wellow Golf Club",
    courseName: "Ryedown-Blackwater",
    location: "Romsey",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White, Yellow, Red male tees
      female: 70, // for Red, Red Alternative, Yellow Alternative, Yellow female tees
      malewhite: 70, // for White male tees (same as base)
      femalewhite: 71, // for White female tees
      maleredalternative: 69, // for Red Alternative male tees
      malewhitealternative: 69, // for White Alternative male tees
    },
    courseRating: {
      white: { male: 69.2, female: 75.1 },
      yellow: { male: 67.2, female: 73.8 },
      red: { male: 65.3, female: 71.5 },
      "white alternative": { male: 66.7, female: 72.5 },
      "yellow alternative": { male: 66.2, female: 72.6 },
      "red alternative": { male: 65.4, female: 71.7 }
    },
    slopeRating: {
      white: { male: 121, female: 138 },
      yellow: { male: 122, female: 131 },
      red: { male: 117, female: 129 },
      "white alternative": { male: 118, female: 134 },
      "yellow alternative": { male: 117, female: 127 },
      "red alternative": { male: 118, female: 128 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null, // Length not available from reliable source
      "white alternative": null,
      "yellow alternative": null,
      "red alternative": null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 14,
    name: "Wellow Golf Club",
    courseName: "Ryedown-Embley",
    location: "Romsey",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White, Red male tees
      female: 70, // for Red, Red Alternative, Yellow Alternative, White Alternative female tees
      maleyellow: 69, // for Yellow male tees
      femalewhite: 72, // for White female tees
      femaleyellow: 69, // for Yellow female tees
      malewhitealternative: 69, // for White Alternative male tees
      maleredalternative: 69, // for Red Alternative male tees
    },
    courseRating: {
      white: { male: 69, female: 75.7 },
      yellow: { male: 67.8, female: 74.2 },
      red: { male: 66.1, female: 72.1 },
      "white alternative": { male: 67.2, female: 73.6 },
      "yellow alternative": { male: 66.9, female: 73.1 },
      "red alternative": { male: 66.1, female: 71.9 }
    },
    slopeRating: {
      white: { male: 126, female: 143 },
      yellow: { male: 124, female: 138 },
      red: { male: 118, female: 132 },
      "white alternative": { male: 122, female: 137 },
      "yellow alternative": { male: 121, female: 133 },
      "red alternative": { male: 115, female: 129 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null, // Length not available from reliable source
      "white alternative": null,
      "yellow alternative": null,
      "red alternative": null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 15,
    name: "Army Golf Club",
    courseName: "",
    location: "Aldershot",
    county: "Hampshire",
    country: "England",
    par: {
      male: 71, // for White, Yellow male tees
      female: 73, // for Red female tees
      malered: 73, // for Red male tees
      malepurple: 72, // for Purple male tees
      maleblue: 64, // for Blue male tees
      femaleyellow: 71, // for Yellow female tees
      femaleblue: 67, // for Blue female tees
    },
    courseRating: {
      white: { male: 71.2 },
      red: { female: 73.2, male: 67.4 },
      yellow: { male: 70.3, female: 76.8 },
      purple: { male: 71.8 },
      blue: { male: 61.4, female: 64.8 }
    },
    slopeRating: {
      white: { male: 123 },
      red: { female: 122, male: 115 },
      yellow: { male: 121, female: 129 },
      purple: { male: 122 },
      blue: { male: 98, female: 108 }
    },
    length: {
      white: 6518, // From CSV data
      yellow: 6319, // From CSV data
      red: 5709, // From CSV data
      purple: 6631, // From CSV data
      blue: null // Length not available from reliable source
    },
    established: null,
    type: "Heathland"
  },
  {
    id: 16,
    name: "Dibden Golf Centre",
    courseName: "",
    location: "Southampton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White and Yellow male tees
      female: 72, // for Red female tees
      femaleblue: 71, // for Blue female tees
    },
    courseRating: {
      red: { female: 70.7 },
      white: { male: 68.1 },
      yellow: { male: 66.4 },
      blue: { female: 69.5 }
    },
    slopeRating: {
      red: { female: 117 },
      white: { male: 113 },
      yellow: { male: 108 },
      blue: { female: 114 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null, // Length not available from reliable source
      blue: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 17,
    name: "St Clements Jersey Golf and Sports Centre",
    courseName: "",
    location: "St Clements",
    county: "Jersey",
    country: "Channel Islands",
    par: {
      male: 66, // for White and Yellow male tees
      female: 70, // for Yellow female tees
      femalered2017: 69, // for Red 2017 female tees
    },
    courseRating: {
      white: { male: 66.4 },
      "red 2017": { female: 69.8 },
      yellow: { female: 70, male: 65.6 }
    },
    slopeRating: {
      white: { male: 107 },
      "red 2017": { female: 120 },
      yellow: { female: 120, male: 107 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      "red 2017": null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 18,
    name: "Petersfield Golf Club",
    courseName: "Adhurst",
    location: "Petersfield",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White and Red male tees
      female: 72, // for Red female tees
      maleyellow: 71, // for Yellow male tees
      femaleyellow: 71, // for Yellow female tees
    },
    courseRating: {
      white: { male: 71.2 },
      yellow: { male: 68.1, female: 73.7 },
      red: { female: 71.5, male: 66.3 }
    },
    slopeRating: {
      white: { male: 121 },
      yellow: { male: 122, female: 127 },
      red: { female: 125, male: 113 }
    },
    length: {
      white: 6308, // From CSV data
      yellow: 5763, // From CSV data
      red: 5394, // From CSV data
      blue: 6004 // From CSV data
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 19,
    name: "Rowlands Castle Golf Club",
    courseName: "",
    location: "Rowlands Castle",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for Black, Purple, Green male tees
      female: 74, // for Green, Blue, Purple, Black female tees
      maleblue: 74, // for Blue male tees
      femaleblue: 73, // for Blue female tees
    },
    courseRating: {
      black: { male: 72, female: 78.1 },
      purple: { male: 71, female: 76.8 },
      blue: { male: 60.9, female: 64 },
      green: { male: 68.9, female: 74.3 }
    },
    slopeRating: {
      black: { male: 128, female: 134 },
      purple: { male: 125, female: 131 },
      blue: { male: 99, female: 104 },
      green: { male: 118, female: 125 }
    },
    length: {
      black: 6642, // From CSV data
      purple: null, // Length not available from reliable source
      blue: null, // Length not available from reliable source
      green: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 20,
    name: "Sherfield Oaks Golf Club",
    courseName: "Trafalgar",
    location: "Hook",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for Black and White male tees
      female: 70, // for Gold female tees
    },
    courseRating: {
      black: { male: 69.4 },
      white: { male: 68.2 },
      gold: { female: 70.5 }
    },
    slopeRating: {
      black: { male: 117 },
      white: { male: 114 },
      gold: { female: 118 }
    },
    length: {
      black: null, // Length not available from reliable source
      white: null, // Length not available from reliable source
      gold: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 21,
    name: "Sherfield Oaks Golf Club",
    courseName: "Wellington",
    location: "Hook",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for Black and White male tees
      female: 72, // for Gold, Black, and White female tees
    },
    courseRating: {
      black: { male: 71.2, female: 76.9 },
      white: { male: 70.1, female: 75.4 },
      gold: { female: 71.8 }
    },
    slopeRating: {
      black: { male: 120, female: 133 },
      white: { male: 116, female: 129 },
      gold: { female: 123 }
    },
    length: {
      black: null, // Length not available from reliable source
      white: null, // Length not available from reliable source
      gold: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 22,
    name: "Sherfield Oaks Golf Club",
    courseName: "Waterloo",
    location: "Hook",
    county: "Hampshire",
    country: "England",
    par: {
      male: 69, // for Black and White male tees
      female: 69, // for Gold female tees
    },
    courseRating: {
      black: { male: 68.3 },
      white: { male: 66.9 },
      gold: { female: 68.9 }
    },
    slopeRating: {
      black: { male: 119 },
      white: { male: 115 },
      gold: { female: 113 }
    },
    length: {
      black: null, // Length not available from reliable source
      white: null, // Length not available from reliable source
      gold: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 23,
    name: "Weybrook Park Golf Club",
    courseName: "East (19-27)",
    location: "Weybrook Park",
    county: "Hampshire",
    country: "England",
    par: {
      male: 68, // for White and Yellow male tees
      female: 70, // for Red female tees
      malered: 70, // for Red male tees
    },
    courseRating: {
      white: { male: 67.4 },
      yellow: { male: 65.6 },
      red: { male: 65.2, female: 69.6 }
    },
    slopeRating: {
      white: { male: 118 },
      yellow: { male: 111 },
      red: { male: 108, female: 123 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 24,
    name: "Weybrook Park Golf Club",
    courseName: "West",
    location: "Weybrook Park",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for Black, White, Yellow, Red male tees
      female: 72, // for Red female tees
    },
    courseRating: {
      black: { male: 72.6 },
      white: { male: 71.4 },
      yellow: { male: 69.6 },
      red: { male: 67.4, female: 72.7 }
    },
    slopeRating: {
      black: { male: 126 },
      white: { male: 123 },
      yellow: { male: 116 },
      red: { male: 107, female: 127 }
    },
    length: {
      black: null, // Length not available from reliable source
      white: 6746, // Updated from user data
      yellow: 6433, // Updated from user data
      red: 5993 // Updated from user data
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 25,
    name: "Weybrook Park Golf Club",
    courseName: "East-West B9",
    location: "Weybrook Park",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White and Yellow male tees
      female: 71, // for Red female tees
      malered: 71, // for Red male tees
    },
    courseRating: {
      white: { male: 69.1 },
      yellow: { male: 67.4 },
      red: { male: 66.3, female: 71 }
    },
    slopeRating: {
      white: { male: 123 },
      yellow: { male: 115 },
      red: { male: 106, female: 126 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 26,
    name: "Weybrook Park Golf Club",
    courseName: "West B9-East",
    location: "Weybrook Park",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White and Yellow male tees
      female: 71, // for Red female tees
      malered: 71, // for Red male tees
    },
    courseRating: {
      white: { male: 69.1 },
      yellow: { male: 67.4 },
      red: { male: 66.3, female: 71 }
    },
    slopeRating: {
      white: { male: 123 },
      yellow: { male: 115 },
      red: { male: 106, female: 126 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 27,
    name: "Weybrook Park Golf Club",
    courseName: "East-West F9",
    location: "Weybrook Park",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White and Yellow male tees
      female: 71, // for Red female tees
      malered: 71, // for Red male tees
    },
    courseRating: {
      white: { male: 69.7 },
      yellow: { male: 67.8 },
      red: { male: 66.3, female: 71.3 }
    },
    slopeRating: {
      white: { male: 119 },
      yellow: { male: 112 },
      red: { male: 109, female: 124 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 28,
    name: "Weybrook Park Golf Club",
    courseName: "West F9-East",
    location: "Weybrook Park",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White, Yellow male tees
      female: 71, // for Red female tees
      malered: 71, // for Red male tees
    },
    courseRating: {
      white: { male: 69.7 },
      yellow: { male: 67.8 },
      red: { male: 66.3, female: 71.3 }
    },
    slopeRating: {
      white: { male: 119 },
      yellow: { male: 112 },
      red: { male: 109, female: 124 }
    },
    frontNine: {
      white: { male: 36, slope: 119 },
      yellow: { male: 35, slope: 113 },
      red: { male: 33.7, slope: 109, female: 36.5, femaleSlope: 125 }
    },
    backNine: {
      white: { male: 33.7, slope: 118 },
      yellow: { male: 32.8, slope: 111 },
      red: { male: 32.6, slope: 108, female: 34.8, femaleSlope: 123 }
    },
    length: {
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 29,
    name: "Cams Hall Estate Golf Club",
    courseName: "Park",
    location: "Fareham",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White, Red male tees
      female: 72, // for White, Red female tees
      maleyellow: 70, // for Yellow male tees
      maleblue: 66, // for Blue male tees
      malepurple: 54, // for Purple male tees
      femaleyellow: 68, // for Yellow female tees
      femalepurple: 54, // for Purple female tees
      femaleblue: 66, // for Blue female tees
    },
    courseRating: {
      white: { male: 69.6, female: 75.8 },
      yellow: { male: 68, female: 73.6 },
      red: { male: 66, female: 70.6 },
      blue: { male: 60, female: 62.4 },
      purple: { male: 54, female: 56.4 }
    },
    slopeRating: {
      white: { male: 117, female: 129 },
      yellow: { male: 112, female: 120 },
      red: { male: 103, female: 117 },
      blue: { male: 89, female: 97 },
      purple: { male: 81, female: 83 }
    },
    frontNine: {
      white: { male: 34.8, slope: 117, female: 37.9, femaleSlope: 129 },
      yellow: { male: 34, slope: 112, female: 36.8, femaleSlope: 120 },
      red: { male: 33, slope: 103, female: 35.3, femaleSlope: 117 },
      blue: { male: 30, slope: 89, female: 31.2, femaleSlope: 97 },
      purple: { male: 27, slope: 81, female: 28.2, femaleSlope: 83 }
    },
    backNine: {
      white: { male: 34.8, slope: 117, female: 37.9, femaleSlope: 129 },
      yellow: { male: 34, slope: 112, female: 36.8, femaleSlope: 120 },
      red: { male: 33, slope: 103, female: 35.3, femaleSlope: 117 },
      blue: { male: 30, slope: 89, female: 31.2, femaleSlope: 97 },
      purple: { male: 27, slope: 81, female: 28.2, femaleSlope: 83 }
    },
    length: {
      white: null,
      yellow: null,
      red: null,
      blue: null,
      purple: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 30,
    name: "Cams Hall Estate Golf Club",
    courseName: "Park & Creek F9",
    location: "Fareham",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for Red, Yellow male tees
      female: 71, // for Red female tees
      malewhite: 71, // for White male tees (Park - White & Creek F9)
      femaleyellow: 69, // for Yellow female tees
    },
    courseRating: {
      white: { male: 68.9 }, // Park - White & Creek F9
      yellow: { male: 67.4, female: 72.9 },
      red: { male: 65.3, female: 69.9 }
    },
    slopeRating: {
      white: { male: 118 }, // Park - White & Creek F9
      yellow: { male: 112, female: 119 },
      red: { male: 102, female: 117 }
    },
    frontNine: {
      white: { male: 34.8, slope: 117 }, // Using Park portion for front 9
      yellow: { male: 34, slope: 112, female: 36.8, femaleSlope: 120 },
      red: { male: 33, slope: 103, female: 35.3, femaleSlope: 117 }
    },
    backNine: {
      white: { male: 34.1, slope: 118 }, // Creek F9 portion
      yellow: { male: 33.4, slope: 112, female: 36.1, femaleSlope: 117 },
      red: { male: 32.3, slope: 101, female: 34.6, femaleSlope: 116 }
    },
    length: {
      white: null,
      yellow: null,
      red: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 31,
    name: "Bramshaw Golf Club",
    courseName: "Manor Course",
    location: "Bramshaw",
    county: "Hampshire",
    country: "England",
    par: {
      male: 71, // for White, Yellow male tees
      female: 74, // for Red female tees
      malered: 68, // for Red male tees
      maleblue311: 29, // for Blue 3-11 male tees
      malered311: 33, // for Red 3-11 male tees
      femaleblue311: 32, // for Blue 3-11 female tees
      femalered311: 36, // for Red 3-11 female tees
    },
    courseRating: {
      white: { male: 71 },
      yellow: { male: 69.5 },
      red: { male: 67.2, female: 73.6 },
      "blue 3-11": { male: 29.9, female: 31.1 },
      "red 3-11": { male: 32.3, female: 35.6 }
    },
    slopeRating: {
      white: { male: 122 },
      yellow: { male: 120 },
      red: { male: 114, female: 126 },
      "blue 3-11": { male: 91, female: 109 },
      "red 3-11": { male: 112, female: 120 }
    },
    frontNine: {
      white: { male: 35.3, slope: 121 },
      yellow: { male: 34.3, slope: 119 },
      red: { male: 33, slope: 112, female: 36.4, femaleSlope: 126 },
      "blue 3-11": { male: 29.9, slope: 91, female: 31.1, femaleSlope: 109 },
      "red 3-11": { male: 32.3, slope: 112, female: 35.6, femaleSlope: 120 }
    },
    backNine: {
      white: { male: 35.7, slope: 122 },
      yellow: { male: 35.2, slope: 121 },
      red: { male: 34.2, slope: 116, female: 37.2, femaleSlope: 126 },
      "blue 3-11": { male: 0, slope: 0, female: 0, femaleSlope: 0 }, // No back 9 for 3-11 configuration
      "red 3-11": { male: 0, slope: 0, female: 0, femaleSlope: 0 } // No back 9 for 3-11 configuration
    },
    length: {
      white: 6229, // Updated from user data
      yellow: 6020, // Updated from user data
      red: 5616, // Updated from user data
      "blue 3-11": null,
      "red 3-11": null
    },
    established: null,
    type: "Heathland"
  },
  {
    id: 32,
    name: "Bramshaw Golf Club",
    courseName: "Forest",
    location: "Bramshaw",
    county: "Hampshire",
    country: "England",
    par: {
      male: 69, // for White, Yellow male tees
      female: 71, // for Red - 2018 female tees
    },
    courseRating: {
      white: { male: 67.5 },
      yellow: { male: 66.7 },
      "red - 2018": { female: 70.2 }
    },
    slopeRating: {
      white: { male: 116 },
      yellow: { male: 113 },
      "red - 2018": { female: 124 }
    },
    frontNine: {
      white: { male: 33.7, slope: 114 },
      yellow: { male: 33.5, slope: 112 },
      "red - 2018": { female: 34.6, femaleSlope: 125 }
    },
    backNine: {
      white: { male: 33.8, slope: 118 },
      yellow: { male: 33.2, slope: 114 },
      "red - 2018": { female: 35.6, femaleSlope: 122 }
    },
    length: {
      white: 5594, // Updated from user data
      yellow: 5552, // Updated from user data
      "red - 2018": 5232 // Updated from user data
    },
    established: null,
    type: "Heathland"
  },
  {
    id: 33,
    name: "Corhampton Golf Club",
    courseName: "",
    location: "Corhampton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for Blue male tees
      female: 73, // for Purple female tees
      maleorange: 71, // for Orange male tees
      malepurple: 71, // for Purple male tees
      femaleorange: 71, // for Orange female tees
      femaleblue: 70, // for Blue female tees
    },
    courseRating: {
      purple: { male: 68.2, female: 73.8 },
      blue: { male: 69.7, female: 75.7 },
      orange: { male: 71, female: 77.4 }
    },
    slopeRating: {
      purple: { male: 112, female: 124 },
      blue: { male: 115, female: 128 },
      orange: { male: 119, female: 130 }
    },
    frontNine: {
      purple: { male: 33.5, slope: 110, female: 36.4, femaleSlope: 121 },
      blue: { male: 34.1, slope: 113, female: 37.3, femaleSlope: 124 },
      orange: { male: 34.8, slope: 118, female: 38.1, femaleSlope: 125 }
    },
    backNine: {
      purple: { male: 34.7, slope: 113, female: 37.4, femaleSlope: 126 },
      blue: { male: 35.6, slope: 116, female: 38.4, femaleSlope: 132 },
      orange: { male: 36.2, slope: 119, female: 39.3, femaleSlope: 134 }
    },
    length: {
      purple: null,
      blue: null,
      orange: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 34,
    name: "Waterlooville Golf Club",
    courseName: "",
    location: "Waterlooville",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White, Yellow, Red male tees
      female: 73, // for Red female tees
      femalewhite: 75, // for White female tees
      femaleyellow: 74, // for Yellow female tees
    },
    courseRating: {
      white: { male: 71.2, female: 78.2 },
      yellow: { male: 70.4, female: 77.1 },
      red: { male: 67.7, female: 73.1 }
    },
    slopeRating: {
      white: { male: 126, female: 138 },
      yellow: { male: 124, female: 137 },
      red: { male: 113, female: 127 }
    },
    frontNine: {
      white: { male: 34.9, slope: 127, female: 38.6, femaleSlope: 136 },
      yellow: { male: 34.5, slope: 125, female: 37.9, femaleSlope: 134 },
      red: { male: 32.5, slope: 113, female: 35.5, femaleSlope: 121 }
    },
    backNine: {
      white: { male: 36.3, slope: 125, female: 39.6, femaleSlope: 140 },
      yellow: { male: 35.9, slope: 122, female: 39.2, femaleSlope: 139 },
      red: { male: 35.2, slope: 112, female: 37.6, femaleSlope: 132 }
    },
    length: {
      white: null,
      yellow: null,
      red: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 35,
    name: "Les Ormes Golf Club",
    courseName: "",
    location: "St Helier",
    county: "Jersey",
    country: "Channel Islands",
    par: {
      male: 64, // for White, Yellow male tees
      female: 65, // for Red and Yellow female tees
      femaleyellow: 64, // for Yellow - Women female tees
    },
    courseRating: {
      white: { male: 64.8 },
      yellow: { male: 63, female: 68 }, // Yellow - Women
      "red_yellow": { female: 66.1 }
    },
    slopeRating: {
      white: { male: 113 },
      yellow: { male: 113, female: 111 }, // Yellow - Women
      "red_yellow": { female: 109 }
    },
    frontNine: {
      white: { male: 32.4, slope: 113 },
      yellow: { male: 31.5, slope: 113, female: 34, femaleSlope: 111 }, // Yellow - Women
      "red_yellow": { female: 32.2, femaleSlope: 106 }
    },
    backNine: {
      white: { male: 32.4, slope: 113 },
      yellow: { male: 31.5, slope: 113, female: 34, femaleSlope: 111 }, // Yellow - Women
      "red_yellow": { female: 33.9, femaleSlope: 111 }
    },
    length: {
      white: null,
      yellow: null,
      "red_yellow": null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 36,
    name: "Royal Winchester Golf Club",
    courseName: "",
    location: "Winchester",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White male tees
      female: 72, // for Red 2019 female tees
      maleyellow: 71, // for Yellow male tees
      malered2019: 69, // for Red 2019 male tees
    },
    courseRating: {
      white: { male: 71 },
      yellow: { male: 69.2 },
      "red 2019": { male: 67.4, female: 72.4 }
    },
    slopeRating: {
      white: { male: 125 },
      yellow: { male: 123 },
      "red 2019": { male: 111, female: 121 }
    },
    frontNine: {
      white: { male: 35.4, slope: 122 },
      yellow: { male: 34.1, slope: 123 },
      "red 2019": { male: 33.3, slope: 113, female: 35.9, femaleSlope: 118 }
    },
    backNine: {
      white: { male: 35.6, slope: 127 },
      yellow: { male: 35.1, slope: 122 },
      "red 2019": { male: 34.1, slope: 108, female: 36.5, femaleSlope: 124 }
    },
    length: {
      white: null,
      yellow: null,
      "red 2019": null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 37,
    name: "Shanklin and Sandown Golf Club",
    courseName: "",
    location: "Shanklin and Sandown",
    county: "Isle of Wight",
    country: "England",
    par: {
      male: 70, // for Yellow, White, Red, Blue male tees
      female: 72, // for Red, Blue, White, Yellow female tees
    },
    courseRating: {
      red: { male: 67, female: 72 },
      yellow: { male: 68, female: 73.7 },
      white: { male: 69.5, female: 75 },
      blue: { male: 65.5, female: 70.3 }
    },
    slopeRating: {
      red: { male: 114, female: 130 },
      yellow: { male: 122, female: 131 },
      white: { male: 125, female: 141 },
      blue: { male: 115, female: 123 }
    },
    frontNine: {
      red: { male: 32.7, slope: 110, female: 34.9, femaleSlope: 131 },
      yellow: { male: 32.9, slope: 117, female: 35.5, femaleSlope: 126 },
      white: { male: 33.8, slope: 121, female: 36.3, femaleSlope: 138 },
      blue: { male: 31.8, slope: 111, female: 33.9, femaleSlope: 116 }
    },
    backNine: {
      red: { male: 34.3, slope: 117, female: 37.1, femaleSlope: 128 },
      yellow: { male: 35.1, slope: 127, female: 38.2, femaleSlope: 135 },
      white: { male: 35.7, slope: 129, female: 38.7, femaleSlope: 143 },
      blue: { male: 33.7, slope: 118, female: 36.4, femaleSlope: 130 }
    },
    length: {
      red: null,
      yellow: null,
      white: null,
      blue: null
    },
    established: null,
    type: "Links"
  },
  {
    id: 38,
    name: "Westridge Golf Centre",
    courseName: "",
    location: "Westridge",
    county: "Isle of Wight",
    country: "England",
    par: {
      male: 64, // for Blue - New, White - New, Red - New male tees
      female: 66, // for Blue - New female tees
      maleblueWinter: 62, // for Blue Winter male tees
      femaleblueWinter: 62, // for Blue Winter female tees
      femalewhiteNew: 64, // for White - New female tees
      femaleredNew: 64, // for Red - New female tees
    },
    courseRating: {
      "blue - new": { male: 60.8, female: 63.9 },
      "blue winter": { male: 59.8, female: 61.8 },
      "white - new": { male: 60.4, female: 62.5 },
      "red - new": { male: 59.5, female: 61.4 }
    },
    slopeRating: {
      "blue - new": { male: 92, female: 105 },
      "blue winter": { male: 84, female: 97 },
      "white - new": { male: 85, female: 105 },
      "red - new": { male: 84, female: 100 }
    },
    frontNine: {
      "blue - new": { male: 30.5, slope: 93, female: 32.1, femaleSlope: 107 },
      "blue winter": { male: 29.9, slope: 84, female: 30.9, femaleSlope: 97 },
      "white - new": { male: 30.2, slope: 86, female: 31.4, femaleSlope: 106 },
      "red - new": { male: 29.7, slope: 86, female: 30.8, femaleSlope: 101 }
    },
    backNine: {
      "blue - new": { male: 30.3, slope: 90, female: 31.8, femaleSlope: 103 },
      "blue winter": { male: 29.9, slope: 84, female: 30.9, femaleSlope: 97 },
      "white - new": { male: 30.2, slope: 83, female: 31.1, femaleSlope: 103 },
      "red - new": { male: 29.8, slope: 82, female: 30.6, femaleSlope: 98 }
    },
    length: {
      "blue - new": null,
      "blue winter": null,
      "white - new": null,
      "red - new": null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 39,
    name: "Alderney Golf Club",
    courseName: "",
    location: "Alderney",
    county: "Alderney",
    country: "Channel Islands",
    par: {
      male: 64, // for White male tees
      female: 68, // for Red 2019 female tees
    },
    courseRating: {
      white: { male: 65.1 },
      "red 2019": { female: 68.1 }
    },
    slopeRating: {
      white: { male: 113 },
      "red 2019": { female: 107 }
    },
    frontNine: {
      white: { male: 32.4, slope: 114 },
      "red 2019": { female: 33.9, femaleSlope: 111 }
    },
    backNine: {
      white: { male: 32.7, slope: 111 },
      "red 2019": { female: 34.2, femaleSlope: 103 }
    },
    length: {
      white: 5079, // From CSV data
      "red 2019": 4784 // From CSV data (Red tee)
    },
    established: null,
    type: "Links"
  },
  {
    id: 40,
    name: "Cowes Golf Club",
    courseName: "",
    location: "Cowes",
    county: "Isle of Wight",
    country: "England",
    par: {
      male: 70, // for Yellow, White, Red, Winter, Blue male tees
      female: 70, // for Red, Blue female tees
      femalewhite: 72, // for White female tees
      femaleyellow: 72, // for Yellow female tees
      femalewinter: 72, // for Winter female tees
    },
    courseRating: {
      red: { female: 70.9, male: 65.5 },
      yellow: { male: 66.7, female: 72.7 },
      white: { male: 68, female: 73.8 },
      winter: { male: 67.2, female: 72.4 },
      blue: { male: 62.3, female: 67.4 }
    },
    slopeRating: {
      red: { female: 122, male: 110 },
      yellow: { male: 112, female: 124 },
      white: { male: 116, female: 119 },
      winter: { male: 111, female: 128 },
      blue: { male: 100, female: 111 }
    },
    frontNine: {
      red: { female: 35.7, femaleSlope: 121, male: 33, slope: 111 },
      yellow: { male: 33.4, slope: 112, female: 36.4, femaleSlope: 122 },
      white: { male: 34, slope: 117, female: 36.9, femaleSlope: 120 },
      winter: { male: 33.6, slope: 111, female: 36.2, femaleSlope: 128 },
      blue: { male: 31.3, slope: 100, female: 33.8, femaleSlope: 110 }
    },
    backNine: {
      red: { female: 35.2, femaleSlope: 122, male: 32.5, slope: 109 },
      yellow: { male: 33.3, slope: 111, female: 36.3, femaleSlope: 126 },
      white: { male: 34, slope: 114, female: 36.9, femaleSlope: 117 },
      winter: { male: 33.6, slope: 111, female: 36.2, femaleSlope: 128 },
      blue: { male: 31, slope: 99, female: 33.6, femaleSlope: 112 }
    },
    length: {
      red: null,
      yellow: null,
      white: null,
      winter: null,
      blue: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 41,
    name: "Paultons Golf Club",
    courseName: "",
    location: "Nr Romsey",
    county: "Hampshire",
    country: "England",
    par: {
      male: 71, // for White, Yellow, Red male tees
      female: 72, // for Red female tees
    },
    courseRating: {
      white: { male: 69.1 },
      yellow: { male: 68.5 },
      red: { female: 71.5, male: 66.9 }
    },
    slopeRating: {
      white: { male: 118 },
      yellow: { male: 115 },
      red: { female: 120, male: 107 }
    },
    frontNine: {
      white: { male: 34.8, slope: 117 },
      yellow: { male: 34.3, slope: 111 },
      red: { female: 35.9, femaleSlope: 118, male: 33.8, slope: 104 }
    },
    backNine: {
      white: { male: 34.3, slope: 118 },
      yellow: { male: 34.2, slope: 119 },
      red: { female: 35.6, femaleSlope: 122, male: 33.1, slope: 110 }
    },
    length: {
      white: null,
      yellow: null,
      red: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 42,
    name: "Freshwater Bay Golf Club",
    courseName: "",
    location: "Freshwater Bay",
    county: "Isle of Wight",
    country: "England",
    par: {
      male: 69, // for White, Yellow male tees
      female: 70, // for Red female tees
      malered: 67, // for Red male tees
      malewhitewinter: 69, // for White Winter male tees
      maleredcomposite: 30, // for Red Composite male tees
      femaleredcomposite: 31, // for Red Composite female tees
      malewhitecomposite: 31, // for White Composite male tees
      maleyellowcomposite: 31, // for Yellow Composite male tees
    },
    courseRating: {
      red: { female: 71.2, male: 66 },
      white: { male: 68.9 },
      yellow: { male: 67.8 },
      "white winter": { male: 68.7 },
      "red composite": { female: 32.5, male: 31 },
      "white composite": { male: 31.8 },
      "yellow composite": { male: 31.6 }
    },
    slopeRating: {
      red: { female: 122, male: 113 },
      white: { male: 122 },
      yellow: { male: 117 },
      "white winter": { male: 118 },
      "red composite": { female: 107, male: 103 },
      "white composite": { male: 109 },
      "yellow composite": { male: 107 }
    },
    frontNine: {
      red: { female: 36.2, femaleSlope: 122, male: 33.5, slope: 113 },
      white: { male: 34.8, slope: 121 },
      yellow: { male: 34.3, slope: 115 },
      "white winter": { male: 34.7, slope: 114 },
      "red composite": { female: 32.5, femaleSlope: 107, male: 31, slope: 103 },
      "white composite": { male: 31.8, slope: 109 },
      "yellow composite": { male: 31.6, slope: 107 }
    },
    backNine: {
      red: { female: 35, femaleSlope: 121, male: 32.5, slope: 112 },
      white: { male: 34.1, slope: 122 },
      yellow: { male: 33.5, slope: 118 },
      "white winter": { male: 34, slope: 121 },
      "red composite": { female: 0, femaleSlope: 0, male: 0, slope: 0 },
      "white composite": { male: 0, slope: 0 },
      "yellow composite": { male: 0, slope: 0 }
    },
    length: {
      red: null,
      white: null,
      yellow: null,
      "white winter": null,
      "red composite": null,
      "white composite": null,
      "yellow composite": null
    },
    established: null,
    type: "Clifftop"
  },
  {
    id: 43,
    name: "The Hampshire Golf Club",
    courseName: "",
    location: "Andover",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White male tees
      female: 72, // for Red female tees
      maleyellow: 71, // for Yellow male tees
    },
    courseRating: {
      white: { male: 71.2 },
      yellow: { male: 70 },
      red: { female: 73 }
    },
    slopeRating: {
      white: { male: 122 },
      yellow: { male: 116 },
      red: { female: 122 }
    },
    frontNine: {
      white: { male: 36.3, slope: 122 },
      yellow: { male: 35.7, slope: 118 },
      red: { female: 37.1, femaleSlope: 118 }
    },
    backNine: {
      white: { male: 34.9, slope: 121 },
      yellow: { male: 34.3, slope: 114 },
      red: { female: 35.9, femaleSlope: 126 }
    },
    length: {
      white: null,
      yellow: null,
      red: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 44,
    name: "The Burley Golf Club",
    courseName: "",
    location: "Burley",
    county: "Hampshire",
    country: "England",
    par: {
      male: 71, // for Yellow, White, Red male tees
      female: 71, // for Red, Yellow, Blue female tees
      maleblue: 67, // for Blue male tees
    },
    courseRating: {
      red: { female: 70.2, male: 66 },
      yellow: { male: 67.5, female: 72.9 },
      white: { male: 69 },
      blue: { male: 59.4, female: 61.7 }
    },
    slopeRating: {
      red: { female: 114, male: 99 },
      yellow: { male: 108, female: 128 },
      white: { male: 109 },
      blue: { male: 89, female: 93 }
    },
    frontNine: {
      red: { female: 35.7, femaleSlope: 116, male: 33.3, slope: 103 },
      yellow: { male: 34.2, slope: 108, female: 36.9, femaleSlope: 128 },
      white: { male: 34.8, slope: 108 },
      blue: { male: 29.7, slope: 89, female: 30.8, femaleSlope: 93 }
    },
    backNine: {
      red: { female: 34.5, femaleSlope: 112, male: 32.7, slope: 94 },
      yellow: { male: 33.3, slope: 107, female: 36, femaleSlope: 127 },
      white: { male: 34.2, slope: 109 },
      blue: { male: 29.7, slope: 88, female: 30.9, femaleSlope: 93 }
    },
    length: {
      red: null,
      yellow: null,
      white: null,
      blue: null
    },
    established: null,
    type: "Heathland"
  },
  {
    id: 45,
    name: "Brokenhurst Manor Golf Club",
    courseName: "",
    location: "Brockenhurst",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White, Yellow male tees
      female: 72, // for Red 2019 female tees
      maleblue: 67, // for Blue male tees
      femalebluewomen: 69, // for Blue Women female tees
    },
    courseRating: {
      white: { male: 70.3 },
      yellow: { male: 69 },
      blue: { male: 63 },
      "red 2019": { female: 72.6 },
      "blue women": { female: 67.7 }
    },
    slopeRating: {
      white: { male: 127 },
      yellow: { male: 123 },
      blue: { male: 109 },
      "red 2019": { female: 131 },
      "blue women": { female: 121 }
    },
    frontNine: {
      white: { male: 35.3, slope: 128 },
      yellow: { male: 34.8, slope: 125 },
      blue: { male: 31.9, slope: 110 },
      "red 2019": { female: 36.8, femaleSlope: 129 },
      "blue women": { female: 34.8, femaleSlope: 120 }
    },
    backNine: {
      white: { male: 35, slope: 126 },
      yellow: { male: 34.2, slope: 121 },
      blue: { male: 31.1, slope: 107 },
      "red 2019": { female: 35.8, femaleSlope: 133 },
      "blue women": { female: 32.9, femaleSlope: 121 }
    },
    length: {
      white: 6229, // Updated from user data
      yellow: 6020, // Updated from user data
      blue: null,
      "red 2019": 5616, // Updated from user data
      "blue women": null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 46,
    name: "Portsmouth Golf Course",
    courseName: "",
    location: "Portsmouth",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White, Yellow male tees
      female: 72, // for Red female tees
    },
    courseRating: {
      white: { male: 69 },
      yellow: { male: 67.8 },
      red: { female: 70.7 }
    },
    slopeRating: {
      white: { male: 118 },
      yellow: { male: 115 },
      red: { female: 118 }
    },
    frontNine: {
      white: { male: 34.8, slope: 121 },
      yellow: { male: 34, slope: 115 },
      red: { female: 35.4, femaleSlope: 118 }
    },
    backNine: {
      white: { male: 34.2, slope: 114 },
      yellow: { male: 33.8, slope: 114 },
      red: { female: 35.3, femaleSlope: 117 }
    },
    length: {
      white: 6040, // From CSV data
      yellow: 5800, // From CSV data
      red: 5265 // From CSV data
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 47,
    name: "Lymington Golf Centre",
    courseName: "Walhampton",
    location: "Lymington",
    county: "Hampshire",
    country: "England",
    par: {
      male: 69, // for White, Yellow male tees
      female: 70, // for Red female tees
    },
    courseRating: {
      white: { male: 63 },
      yellow: { male: 61.8 },
      red: { female: 65 }
    },
    slopeRating: {
      white: { male: 97 },
      yellow: { male: 96 },
      red: { female: 105 }
    },
    frontNine: {
      white: { male: 31.2, slope: 96 },
      yellow: { male: 30.8, slope: 97 },
      red: { female: 32.6, femaleSlope: 104 }
    },
    backNine: {
      white: { male: 31.8, slope: 98 },
      yellow: { male: 31, slope: 94 },
      red: { female: 32.4, femaleSlope: 106 }
    },
    length: {
      white: null,
      yellow: null,
      red: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 48,
    name: "Blackmoor Golf Club",
    courseName: "",
    location: "Bordon",
    county: "Hampshire",
    country: "England",
    par: {
      male: 69, // for White, Yellow, Blue, Red male tees
      female: 70, // for Red female tees
      femaleblue: 69, // for Blue female tees
      femaleyellow: 72, // for Yellow female tees
    },
    courseRating: {
      white: { male: 70.2 },
      yellow: { male: 69.2, female: 75 },
      red: { female: 73.7, male: 68.2 },
      blue: { female: 71.7, male: 66.6 }
    },
    slopeRating: {
      white: { male: 120 },
      yellow: { male: 118, female: 137 },
      red: { female: 130, male: 114 },
      blue: { female: 124, male: 116 }
    },
    frontNine: {
      white: { male: 35.4, slope: 117 },
      yellow: { male: 34.9, slope: 114, female: 37.7, femaleSlope: 140 },
      red: { female: 37.4, femaleSlope: 131, male: 34.8, slope: 110 },
      blue: { female: 36.4, femaleSlope: 126, male: 33.8, slope: 113 }
    },
    backNine: {
      white: { male: 34.8, slope: 122 },
      yellow: { male: 34.3, slope: 121, female: 37.3, femaleSlope: 133 },
      red: { female: 36.3, femaleSlope: 128, male: 33.4, slope: 117 },
      blue: { female: 35.3, femaleSlope: 121, male: 32.8, slope: 118 }
    },
    length: {
      white: 5945, // From CSV data
      yellow: 5556, // From CSV data
      red: 4581, // From CSV data
      blue: 6372 // From CSV data (Black tee mapped to Blue)
    },
    established: null,
    type: "Heathland"
  },
  {
    id: 49,
    name: "Tylney Park Golf Club",
    courseName: "",
    location: "Tylney Park",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White, Yellow, Green 2019, Black male tees
      female: 72, // for Green 2019, Red 2019 female tees
    },
    courseRating: {
      white: { male: 71.9 },
      yellow: { male: 70.5 },
      "green 2019": { male: 69, female: 74 },
      black: { male: 74.2 },
      "red 2019": { female: 71.6 }
    },
    slopeRating: {
      white: { male: 122 },
      yellow: { male: 119 },
      "green 2019": { male: 113, female: 125 },
      black: { male: 128 },
      "red 2019": { female: 120 }
    },
    frontNine: {
      white: { male: 35.9, slope: 122 },
      yellow: { male: 35.1, slope: 122 },
      "green 2019": { male: 34.3, slope: 112, female: 36.9, femaleSlope: 122 },
      black: { male: 36.5, slope: 123 },
      "red 2019": { female: 35.9, femaleSlope: 120 }
    },
    backNine: {
      white: { male: 36, slope: 122 },
      yellow: { male: 35.4, slope: 115 },
      "green 2019": { male: 34.7, slope: 113, female: 37.1, femaleSlope: 127 },
      black: { male: 37.7, slope: 132 },
      "red 2019": { female: 35.7, femaleSlope: 120 }
    },
    length: {
      white: 6918, // Updated from user data
      yellow: 6310, // Updated from user data
      "green 2019": 5860, // Updated from user data
      black: 7019, // Updated from user data
      "red 2019": 5360 // Updated from user data
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 50,
    name: "Meon Valley Hotel & Country Club",
    courseName: "Meon",
    location: "Southampton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 71, // for White, Yellow male tees
      female: 73, // for Red female tees
      malered: 73, // for Red male tees
      femaleyellow: 71, // for Yellow female tees
      femalewhite: 72, // for White female tees
    },
    courseRating: {
      white: { male: 71.9, female: 77.9 },
      yellow: { male: 70, female: 75.6 },
      red: { female: 73, male: 67.7 }
    },
    slopeRating: {
      white: { male: 125, female: 138 },
      yellow: { male: 122, female: 133 },
      red: { female: 128, male: 117 }
    },
    frontNine: {
      white: { male: 36.7, slope: 125, female: 40.1, femaleSlope: 141 },
      yellow: { male: 35.5, slope: 126, female: 38.8, femaleSlope: 135 },
      red: { female: 37.4, femaleSlope: 130, male: 34.3, slope: 123 }
    },
    backNine: {
      white: { male: 35.2, slope: 125, female: 37.8, femaleSlope: 135 },
      yellow: { male: 34.5, slope: 118, female: 36.8, femaleSlope: 131 },
      red: { female: 35.6, femaleSlope: 125, male: 33.4, slope: 111 }
    },
    length: {
      white: 6520, // Updated from user data (approximate)
      yellow: 6097, // Updated from user data (approximate)
      red: 5624 // Updated from user data (approximate)
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 51,
    name: "Meon Valley Hotel & Country Club",
    courseName: "Valley",
    location: "Southampton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White, Yellow, Red male tees
      female: 70, // for Red, Yellow, White female tees
    },
    courseRating: {
      white: { male: 68.6, female: 73.6 },
      yellow: { male: 66.8, female: 72 },
      red: { female: 68.4, male: 64 }
    },
    slopeRating: {
      white: { male: 123, female: 129 },
      yellow: { male: 125, female: 123 },
      red: { female: 122, male: 107 }
    },
    frontNine: {
      white: { male: 34.3, slope: 123, female: 36.8, femaleSlope: 129 },
      yellow: { male: 33.4, slope: 125, female: 36, femaleSlope: 123 },
      red: { female: 34.2, femaleSlope: 122, male: 32, slope: 107 }
    },
    backNine: {
      white: { male: 34.3, slope: 123, female: 36.8, femaleSlope: 129 },
      yellow: { male: 33.4, slope: 125, female: 36, femaleSlope: 123 },
      red: { female: 34.2, femaleSlope: 122, male: 32, slope: 107 }
    },
    length: {
      white: 2879, // Updated from user data (9-hole)
      yellow: 2721, // Updated from user data (9-hole)
      red: 2433 // Updated from user data (9-hole)
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 52,
    name: "Meon Valley Hotel & Country Club",
    courseName: "Stirling",
    location: "Southampton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White, Yellow male tees
      female: 71, // for Red female tees
    },
    courseRating: {
      white: { male: 69.6 },
      red: { female: 69.9 },
      yellow: { male: 67.9 }
    },
    slopeRating: {
      white: { male: 125 },
      red: { female: 124 },
      yellow: { male: 122 }
    },
    frontNine: {
      white: { male: 35.3, slope: 125 },
      red: { female: 35.6, femaleSlope: 126 },
      yellow: { male: 34.5, slope: 118 }
    },
    backNine: {
      white: { male: 34.3, slope: 124 },
      red: { female: 34.3, femaleSlope: 121 },
      yellow: { male: 33.4, slope: 125 }
    },
    length: {
      white: null,
      red: null,
      yellow: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 53,
    name: "Hockley Golf Club",
    courseName: "",
    location: "Nr Winchester",
    county: "Hampshire",
    country: "England",
    par: {
      male: 71, // for Green, Black male tees
      female: 72, // for Blue, Black, Green, Purple female tees
      maleblue: 70, // for Blue male tees
      malepurple: 71, // for Purple male tees
    },
    courseRating: {
      blue: { female: 73, male: 67.4 },
      green: { male: 69.3, female: 75.6 },
      black: { male: 71.2, female: 77.7 },
      purple: { male: 63.9, female: 68.4 }
    },
    slopeRating: {
      blue: { female: 120, male: 112 },
      green: { male: 121, female: 128 },
      black: { male: 123, female: 134 },
      purple: { male: 103, female: 113 }
    },
    frontNine: {
      blue: { female: 36.1, femaleSlope: 120, male: 33.4, slope: 109 },
      green: { male: 34.4, slope: 113, female: 37.3, femaleSlope: 125 },
      black: { male: 35.4, slope: 117, female: 38.3, femaleSlope: 129 },
      purple: { male: 31.5, slope: 103, female: 33.6, femaleSlope: 114 }
    },
    backNine: {
      blue: { female: 36.9, femaleSlope: 120, male: 34, slope: 115 },
      green: { male: 34.9, slope: 128, female: 38.3, femaleSlope: 131 },
      black: { male: 35.8, slope: 129, female: 39.4, femaleSlope: 139 },
      purple: { male: 32.4, slope: 102, female: 34.8, femaleSlope: 112 }
    },
    length: {
      blue: 5682, // Updated from user data (Red equivalent)
      green: 6067, // Updated from user data (Yellow equivalent)
      black: 6420, // Updated from user data (White equivalent)
      purple: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 54,
    name: "South Winchester Golf Club",
    courseName: "",
    location: "Winchester",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White, Yellow male tees
      female: 74, // for White, Yellow female tees
      maleorange: 64, // for Orange male tees
      malegreen: 70, // for Green male tees
      maleblue: 73, // for Blue male tees
      femaleorangewomen: 68, // for Orange - Women female tees
      femalegreenwomen: 72, // for Green Women female tees
    },
    courseRating: {
      white: { male: 72.5, female: 78.8 },
      yellow: { male: 71, female: 77.3 },
      orange: { male: 62 },
      green: { male: 69 },
      blue: { male: 74.2 },
      "orange - women": { female: 66 },
      "green women": { female: 74.7 }
    },
    slopeRating: {
      white: { male: 128, female: 139 },
      yellow: { male: 124, female: 137 },
      orange: { male: 102 },
      green: { male: 118 },
      blue: { male: 134 },
      "orange - women": { female: 113 },
      "green women": { female: 131 }
    },
    frontNine: {
      white: { male: 36.3, slope: 128, female: 39.5, femaleSlope: 138 },
      yellow: { male: 35.5, slope: 126, female: 38.7, femaleSlope: 137 },
      orange: { male: 31.2, slope: 102 },
      green: { male: 34.7, slope: 119 },
      blue: { male: 37, slope: 131 },
      "orange - women": { female: 33.5, femaleSlope: 114 },
      "green women": { female: 37.6, femaleSlope: 131 }
    },
    backNine: {
      white: { male: 36.2, slope: 128, female: 39.3, femaleSlope: 139 },
      yellow: { male: 35.5, slope: 122, female: 38.6, femaleSlope: 137 },
      orange: { male: 30.8, slope: 101 },
      green: { male: 34.3, slope: 117 },
      blue: { male: 37.2, slope: 136 },
      "orange - women": { female: 32.5, femaleSlope: 112 },
      "green women": { female: 37.1, femaleSlope: 130 }
    },
    length: {
      white: 6750, // From CSV data
      yellow: 6485, // From CSV data
      orange: 4515, // From CSV data
      green: 6008, // From CSV data
      blue: 7086, // From CSV data
      "orange - women": 4515, // From CSV data (same as orange)
      "green women": 6008 // From CSV data (same as green)
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 55,
    name: "Ryde Golf Club",
    courseName: "",
    location: "Ryde",
    county: "Isle of Wight",
    country: "England",
    par: {
      male: 70, // for White, Blue, Yellow male tees
      female: 70, // for Red, Yellow, Blue female tees
      malered: 68, // for Red male tees
    },
    courseRating: {
      white: { male: 68.8 },
      blue: { male: 67.8, female: 74.1 },
      yellow: { male: 67.7, female: 74.8 },
      red: { male: 66.4, female: 72.6 }
    },
    slopeRating: {
      white: { male: 119 },
      blue: { male: 120, female: 130 },
      yellow: { male: 118, female: 128 },
      red: { male: 112, female: 120 }
    },
    frontNine: {
      white: { male: 34.5, slope: 121 },
      blue: { male: 33.9, slope: 123, female: 36.9, femaleSlope: 128 },
      yellow: { male: 34, slope: 121, female: 37.1, femaleSlope: 127 },
      red: { male: 33.3, slope: 113, female: 36.4, femaleSlope: 122 }
    },
    backNine: {
      white: { male: 34.3, slope: 117 },
      blue: { male: 33.9, slope: 116, female: 37.2, femaleSlope: 131 },
      yellow: { male: 33.7, slope: 115, female: 37.7, femaleSlope: 128 },
      red: { male: 33.1, slope: 110, female: 36.2, femaleSlope: 118 }
    },
    length: {
      white: null,
      blue: null,
      yellow: null,
      red: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 56,
    name: "La Moye Golf Club",
    courseName: "",
    location: "La Moye",
    county: "Jersey",
    country: "Channel Islands",
    par: {
      male: 72, // for Blue, White, Yellow, Red - Men, Black, Purple male tees
      female: 74, // for Red - 2018, Yellow, Black, Purple female tees
      malegreen: 67, // for Green male tees
      femalegreen: 68, // for Green - Women female tees
    },
    courseRating: {
      blue: { male: 72.9 },
      white: { male: 72.6 },
      yellow: { male: 71.2, female: 77.7 },
      "red - men": { male: 68.6 },
      "red - 2018": { female: 74.5 },
      green: { male: 63.6 },
      "green - women": { female: 68.8 },
      black: { male: 69.2, female: 75.5 },
      purple: { male: 65.7, female: 71.3 }
    },
    slopeRating: {
      blue: { male: 129 },
      white: { male: 127 },
      yellow: { male: 125, female: 138 },
      "red - men": { male: 117 },
      "red - 2018": { female: 132 },
      green: { male: 108 },
      "green - women": { female: 119 },
      black: { male: 121, female: 134 },
      purple: { male: 111, female: 123 }
    },
    frontNine: {
      blue: { male: 36.8, slope: 130 },
      white: { male: 36.7, slope: 128 },
      yellow: { male: 36, slope: 127, female: 39.4, femaleSlope: 142 },
      "red - men": { male: 35, slope: 118 },
      "red - 2018": { female: 38, femaleSlope: 135 },
      green: { male: 32.3, slope: 112 },
      "green - women": { female: 34.9, femaleSlope: 126 },
      black: { male: 35.3, slope: 125, female: 38.5, femaleSlope: 138 },
      purple: { male: 33.5, slope: 113, female: 36.3, femaleSlope: 127 }
    },
    backNine: {
      blue: { male: 36.1, slope: 128 },
      white: { male: 35.9, slope: 125 },
      yellow: { male: 35.2, slope: 123, female: 38.3, femaleSlope: 134 },
      "red - men": { male: 33.6, slope: 115 },
      "red - 2018": { female: 36.5, femaleSlope: 128 },
      green: { male: 31.3, slope: 104 },
      "green - women": { female: 33.9, femaleSlope: 111 },
      black: { male: 33.9, slope: 116, female: 37, femaleSlope: 130 },
      purple: { male: 32.2, slope: 109, female: 35, femaleSlope: 119 }
    },
    length: {
      blue: null,
      white: 6821, // From CSV data
      yellow: 6442, // From CSV data
      "red - men": 5882, // From CSV data (Red tee)
      "red - 2018": 5882, // From CSV data (Red tee)
      green: null,
      "green - women": null,
      black: null,
      purple: null
    },
    established: null,
    type: "Links"
  },
  {
    id: 57,
    name: "Royal Jersey Golf Club",
    courseName: "",
    location: "Royal Jersey",
    county: "Jersey",
    country: "Channel Islands",
    par: {
      male: 70, // for Yellow, White male tees
      female: 71, // for Yellow - Women, Red - 2018 female tees
      maleredmen: 68, // for Red Men male tees
    },
    courseRating: {
      yellow: { male: 68.8 },
      white: { male: 70.1 },
      "yellow - women": { female: 75.1 },
      "red - 2018": { female: 72 },
      "red men": { male: 66.4 }
    },
    slopeRating: {
      yellow: { male: 121 },
      white: { male: 121 },
      "yellow - women": { female: 132 },
      "red - 2018": { female: 121 },
      "red men": { male: 111 }
    },
    frontNine: {
      yellow: { male: 34.7, slope: 119 },
      white: { male: 35.3, slope: 122 },
      "yellow - women": { female: 38, femaleSlope: 137 },
      "red - 2018": { female: 36.1, femaleSlope: 122 },
      "red men": { male: 33.4, slope: 114 }
    },
    backNine: {
      yellow: { male: 34.1, slope: 122 },
      white: { male: 34.8, slope: 119 },
      "yellow - women": { female: 37.1, femaleSlope: 127 },
      "red - 2018": { female: 35.9, femaleSlope: 120 },
      "red men": { male: 33, slope: 108 }
    },
    length: {
      yellow: null,
      white: null,
      "yellow - women": null,
      "red - 2018": null,
      "red men": null
    },
    established: null,
    type: "Links"
  },
  {
    id: 58,
    name: "Liphook Golf Club",
    courseName: "",
    location: "Liphook",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for Yellow male tees
      female: 72, // for Red, White female tees
      malewhite: 72, // for White male tees
      malegreen: 66, // for Green male tees
      femalegreen: 68, // for Green female tees
      femaleyellow: 73, // for Yellow female tees
      maleblue: 73, // for Blue male tees
      malered: 71, // for Red male tees
    },
    courseRating: {
      yellow: { male: 69.4, female: 75.8 },
      red: { female: 72.7, male: 67.7 },
      white: { male: 70.9, female: 76.9 },
      green: { male: 65, female: 69.7 },
      blue: { male: 71.9 }
    },
    slopeRating: {
      yellow: { male: 126, female: 142 },
      red: { female: 128, male: 117 },
      white: { male: 129, female: 143 },
      green: { male: 108, female: 119 },
      blue: { male: 134 }
    },
    frontNine: {
      yellow: { male: 34.6, slope: 118, female: 37.6, femaleSlope: 137 },
      red: { female: 36, femaleSlope: 120, male: 33.6, slope: 116 },
      white: { male: 35.4, slope: 126, female: 38.3, femaleSlope: 139 },
      green: { male: 32.3, slope: 105, female: 34.6, femaleSlope: 118 },
      blue: { male: 35.7, slope: 129 }
    },
    backNine: {
      yellow: { male: 34.8, slope: 133, female: 38.2, femaleSlope: 146 },
      red: { female: 36.7, femaleSlope: 135, male: 34.1, slope: 117 },
      white: { male: 35.5, slope: 132, female: 38.6, femaleSlope: 146 },
      green: { male: 32.7, slope: 110, female: 35.1, femaleSlope: 119 },
      blue: { male: 36.2, slope: 138 }
    },
    length: {
      yellow: 6013, // From CSV data
      red: 5546, // From CSV data
      white: 6317, // From CSV data
      green: 5020, // From CSV data
      blue: 6523 // From CSV data
    },
    established: null,
    type: "Heathland"
  },
  {
    id: 59,
    name: "Chilworth Golf Centre",
    courseName: "",
    location: "Southampton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 69, // for White, Yellow male tees
      female: 70, // for Red - 2018 female tees
    },
    courseRating: {
      white: { male: 68.7 },
      yellow: { male: 67.6 },
      "red - 2018": { female: 70 }
    },
    slopeRating: {
      white: { male: 118 },
      yellow: { male: 115 },
      "red - 2018": { female: 118 }
    },
    frontNine: {
      white: { male: 36.5, slope: 131 },
      yellow: { male: 35.9, slope: 129 },
      "red - 2018": { female: 36.9, femaleSlope: 127 }
    },
    backNine: {
      white: { male: 32.2, slope: 104 },
      yellow: { male: 31.7, slope: 100 },
      "red - 2018": { female: 33.1, femaleSlope: 109 }
    },
    length: {
      white: 5915, // From CSV data
      yellow: 5693, // From CSV data
      "red - 2018": null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 60,
    name: "Basingstoke Golf Club",
    courseName: "",
    location: "Dummer",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for Navy 55, Navy 63, Navy 68, Navy 60 male tees
      female: 73, // for Navy 55, Navy 60, Navy 63 female tees
      malenavy37: 64, // for Navy 37 male tees
      femalenavy37: 66, // for Navy 37 female tees
    },
    courseRating: {
      "navy 55": { male: 66.4, female: 72 },
      "navy 63": { male: 70.6, female: 76.7 },
      "navy 68": { male: 72.9 },
      "navy 37": { male: 59.4, female: 61.4 },
      "navy 60": { male: 69.5, female: 75 }
    },
    slopeRating: {
      "navy 55": { male: 110, female: 123 },
      "navy 63": { male: 119, female: 132 },
      "navy 68": { male: 123 },
      "navy 37": { male: 88, female: 99 },
      "navy 60": { male: 115, female: 129 }
    },
    frontNine: {
      "navy 55": { male: 32.8, slope: 108, female: 35.6, femaleSlope: 120 },
      "navy 63": { male: 34.6, slope: 115, female: 37.5, femaleSlope: 128 },
      "navy 68": { male: 35.7, slope: 121 },
      "navy 37": { male: 29.7, slope: 88, female: 30.7, femaleSlope: 99 },
      "navy 60": { male: 33.9, slope: 115, female: 36.7, femaleSlope: 126 }
    },
    backNine: {
      "navy 55": { male: 33.6, slope: 111, female: 36.4, femaleSlope: 125 },
      "navy 63": { male: 36, slope: 122, female: 39.2, femaleSlope: 136 },
      "navy 68": { male: 37.2, slope: 124 },
      "navy 37": { male: 29.7, slope: 88, female: 30.7, femaleSlope: 99 },
      "navy 60": { male: 35.6, slope: 115, female: 38.3, femaleSlope: 132 }
    },
    length: {
      "navy 55": 5513, // Updated from user data (Red equivalent)
      "navy 63": 6076, // Updated from user data (Yellow equivalent)
      "navy 68": 6533, // Updated from user data (White equivalent)
      "navy 37": null,
      "navy 60": null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 61,
    name: "Hayling Golf Club",
    courseName: "",
    location: "Hayling",
    county: "Hampshire",
    country: "England",
    par: {
      male: 71, // for Yellow, White male tees
      female: 74, // for Red, White, Yellow female tees
      malegreen: 63, // for Green male tees
      femalegreen: 66, // for Green female tees
      femaleblue: 70, // for Blue female tees
      malered: 68, // for Red male tees
      maleblue: 66, // for Blue male tees
    },
    courseRating: {
      yellow: { male: 70.1, female: 76.3 },
      green: { male: 61.4, female: 64.8 },
      red: { female: 74.1, male: 67.9 },
      blue: { female: 69.5, male: 64.7 },
      white: { male: 71.4, female: 78.1 }
    },
    slopeRating: {
      yellow: { male: 118, female: 134 },
      green: { male: 95, female: 101 },
      red: { female: 130, male: 114 },
      blue: { female: 114, male: 103 },
      white: { male: 121, female: 138 }
    },
    frontNine: {
      yellow: { male: 35.4, slope: 114, female: 38.6, femaleSlope: 139 },
      green: { male: 30.9, slope: 93, female: 32.7, femaleSlope: 101 },
      red: { female: 37.8, femaleSlope: 136, male: 34.4, slope: 113 },
      blue: { female: 35.4, femaleSlope: 120, male: 32.9, slope: 104 },
      white: { male: 35.9, slope: 117, female: 39.5, femaleSlope: 143 }
    },
    backNine: {
      yellow: { male: 34.7, slope: 122, female: 37.7, femaleSlope: 129 },
      green: { male: 30.5, slope: 97, female: 32.1, femaleSlope: 100 },
      red: { female: 36.3, femaleSlope: 123, male: 33.5, slope: 114 },
      blue: { female: 34.1, femaleSlope: 108, male: 31.8, slope: 102 },
      white: { male: 35.5, slope: 124, female: 38.6, femaleSlope: 132 }
    },
    length: {
      yellow: null,
      green: null,
      red: null,
      blue: null,
      white: null
    },
    established: null,
    type: "Links"
  },
  {
    id: 62,
    name: "Romsey Golf Club",
    courseName: "",
    location: "Southampton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 68, // for New Red male tees
      female: 70, // for New Red female tees
      malenewyellow: 69, // for New Yellow male tees
      malenewwhite: 69, // for New White male tees
    },
    courseRating: {
      "new red": { male: 65.9, female: 71 },
      "new yellow": { male: 66.9 },
      "new white": { male: 68 }
    },
    slopeRating: {
      "new red": { male: 117, female: 128 },
      "new yellow": { male: 120 },
      "new white": { male: 126 }
    },
    frontNine: {
      "new red": { male: 31.9, slope: 114, female: 34.4, femaleSlope: 124 },
      "new yellow": { male: 32.2, slope: 111 },
      "new white": { male: 32.7, slope: 121 }
    },
    backNine: {
      "new red": { male: 34, slope: 119, female: 36.6, femaleSlope: 131 },
      "new yellow": { male: 34.7, slope: 128 },
      "new white": { male: 35.3, slope: 130 }
    },
    length: {
      "new red": 5214, // From CSV data
      "new yellow": 5389, // From CSV data
      "new white": 5718 // From CSV data
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 63,
    name: "Southampton City Golf Course",
    courseName: "",
    location: "Southampton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White, Yellow, Red male tees
      female: 72, // for Red, White, White Winter female tees
      femaleYellow: 73, // for Yellow female tees
      "blue 9": 33 // for Blue 9 tees (both genders)
    },
    courseRating: {
      red: { male: 65.9, female: 71.4 },
      white: { male: 68.8, female: 74.3 },
      yellow: { male: 67.6, female: 72.8 },
      "blue 9": { male: 31.1, female: 33.4 },
      "white winter": { male: 67, female: 72 }
    },
    slopeRating: {
      red: { male: 115, female: 130 },
      white: { male: 127, female: 132 },
      yellow: { male: 123, female: 132 },
      "blue 9": { male: 107, female: 111 },
      "white winter": { male: 116, female: 127 }
    },
    frontNine: {
      red: { male: 32.2, slope: 107, female: 34.9, femaleSlope: 122 },
      white: { male: 33.9, slope: 119, female: 36.7, femaleSlope: 126 },
      yellow: { male: 33.4, slope: 115, female: 36, femaleSlope: 126 },
      "blue 9": { male: 31.1, slope: 107, female: 33.4, femaleSlope: 111 },
      "white winter": { male: 32.9, slope: 109, female: 35.4, femaleSlope: 120 }
    },
    backNine: {
      red: { male: 33.7, slope: 122, female: 36.5, femaleSlope: 138 },
      white: { male: 34.9, slope: 135, female: 37.6, femaleSlope: 138 },
      yellow: { male: 34.2, slope: 130, female: 36.8, femaleSlope: 137 },
      "blue 9": { male: 0, slope: 0, female: 0, femaleSlope: 0 },
      "white winter": { male: 34.1, slope: 123, female: 36.6, femaleSlope: 133 }
    },
    length: {
      red: 5618, // From CSV data
      white: 6174, // From CSV data
      yellow: 5968, // From CSV data
      "blue 9": null,
      "white winter": null
    },
    established: null,
    type: "Municipal"
  },
  {
    id: 64,
    name: "Stoneham Golf Club",
    courseName: "",
    location: "Southampton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White, Yellow male tees
      malered: 71, // for Red male tees
      female: 71 // for Red female tees
    },
    courseRating: {
      white: { male: 71.1 },
      red: { male: 66.8, female: 71.4 },
      yellow: { male: 69.4 }
    },
    slopeRating: {
      white: { male: 128 },
      red: { male: 113, female: 126 },
      yellow: { male: 119 }
    },
    frontNine: {
      white: { male: 35.1, slope: 123 },
      red: { male: 33, slope: 107, female: 35.1, femaleSlope: 123 },
      yellow: { male: 34.4, slope: 113 }
    },
    backNine: {
      white: { male: 36, slope: 133 },
      red: { male: 33.8, slope: 118, female: 36.3, femaleSlope: 128 },
      yellow: { male: 35, slope: 124 }
    },
    length: {
      white: null,
      red: null,
      yellow: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 65,
    name: "The Waitrose Farm Leckford Estate",
    courseName: "Old Course",
    location: "Leckford",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White, Red male tees
      female: 76, // for Red female tees
      femalewhite: 72, // for White female tees
      femaleredcombo: 71, // for Red Combo female tees
      malewhitecombo: 69 // for White Combo male tees
    },
    courseRating: {
      red: { male: 66.8, female: 72 },
      white: { male: 70.9, female: 76.8 },
      "red combo": { female: 67.9 },
      "white combo": { male: 66.3 }
    },
    slopeRating: {
      red: { male: 115, female: 125 },
      white: { male: 117, female: 133 },
      "red combo": { female: 114 },
      "white combo": { male: 109 }
    },
    frontNine: {
      red: { male: 33.4, slope: 115, female: 36, femaleSlope: 125 },
      white: { male: 35.3, slope: 116, female: 38.3, femaleSlope: 131 },
      "red combo": { female: 36, femaleSlope: 125 },
      "white combo": { male: 35.3, slope: 116 }
    },
    backNine: {
      red: { male: 33.4, slope: 115, female: 36, femaleSlope: 125 },
      white: { male: 35.6, slope: 118, female: 38.5, femaleSlope: 135 },
      "red combo": { female: 31.9, femaleSlope: 103 },
      "white combo": { male: 31, slope: 101 }
    },
    length: {
      red: null,
      white: null,
      "red combo": null,
      "white combo": null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 66,
    name: "The Waitrose Farm Leckford Estate",
    courseName: "New Course",
    location: "Leckford",
    county: "Hampshire",
    country: "England",
    par: {
      male: 66, // for White, Red male tees
      female: 66 // for Red, White female tees
    },
    courseRating: {
      red: { male: 60.6, female: 63.6 },
      white: { male: 62, female: 65.8 }
    },
    slopeRating: {
      red: { male: 94, female: 103 },
      white: { male: 100, female: 103 }
    },
    frontNine: {
      red: { male: 30.3, slope: 94, female: 31.8, femaleSlope: 103 },
      white: { male: 31, slope: 100, female: 32.9, femaleSlope: 103 }
    },
    backNine: {
      red: { male: 30.3, slope: 94, female: 31.8, femaleSlope: 103 },
      white: { male: 31, slope: 100, female: 32.9, femaleSlope: 103 }
    },
    length: {
      red: null,
      white: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 67,
    name: "Lee on the Solent Golf Club",
    courseName: "",
    location: "Lee-on-the-Solent",
    county: "Hampshire",
    country: "England",
    par: {
      male: 69, // for White, Yellow, Green, Red male tees
      female: 71, // for Red, White, Green female tees
      femaleyellow: 69 // for Yellow female tees
    },
    courseRating: {
      red: { male: 65.6, female: 71.9 },
      white: { male: 68.5, female: 74.4 },
      yellow: { male: 67.8, female: 73.6 },
      green: { male: 64.7, female: 71.4 }
    },
    slopeRating: {
      red: { male: 110, female: 127 },
      white: { male: 116, female: 131 },
      yellow: { male: 115, female: 129 },
      green: { male: 108, female: 122 }
    },
    frontNine: {
      red: { male: 33, slope: 112, female: 36.5, femaleSlope: 127 },
      white: { male: 34.6, slope: 115, female: 37.6, femaleSlope: 131 },
      yellow: { male: 34.3, slope: 114, female: 37.2, femaleSlope: 130 },
      green: { male: 33.2, slope: 111, female: 36.9, femaleSlope: 127 }
    },
    backNine: {
      red: { male: 32.6, slope: 107, female: 35.4, femaleSlope: 126 },
      white: { male: 33.9, slope: 117, female: 36.8, femaleSlope: 130 },
      yellow: { male: 33.5, slope: 115, female: 36.4, femaleSlope: 127 },
      green: { male: 31.5, slope: 105, female: 34.5, femaleSlope: 117 }
    },
    length: {
      red: 5495, // From CSV data
      white: 5962, // From CSV data
      yellow: null,
      green: null
    },
    established: null,
    type: "Links"
  },
  {
    id: 68,
    name: "Alton Golf Club",
    courseName: "",
    location: "Alton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 68, // for Yellow, White, Red male tees
      female: 71 // for Red, White, Yellow female tees
    },
    courseRating: {
      red: { male: 66.5, female: 71.2 },
      yellow: { male: 67.7, female: 73.4 },
      white: { male: 68.2, female: 73.8 }
    },
    slopeRating: {
      red: { male: 107, female: 123 },
      yellow: { male: 114, female: 125 },
      white: { male: 114, female: 128 }
    },
    frontNine: {
      red: { male: 33.5, slope: 109, female: 35.8, femaleSlope: 124 },
      yellow: { male: 34.4, slope: 117, female: 37.2, femaleSlope: 127 },
      white: { male: 34.6, slope: 118, female: 37.5, femaleSlope: 129 }
    },
    backNine: {
      red: { male: 33, slope: 105, female: 35.4, femaleSlope: 122 },
      yellow: { male: 33.3, slope: 111, female: 36.2, femaleSlope: 122 },
      white: { male: 33.6, slope: 110, female: 36.3, femaleSlope: 127 }
    },
    length: {
      red: null,
      yellow: null,
      white: 5751 // From CSV data
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 69,
    name: "Sandford Springs Hotel & Golf Club",
    courseName: "Parks & Woods",
    location: "Kingsclere",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for Yellow, White, Red male tees
      female: 71 // for Yellow, Red female tees
    },
    courseRating: {
      yellow: { male: 69.4, female: 75.7 },
      white: { male: 70.3 },
      red: { male: 67.1, female: 72.5 }
    },
    slopeRating: {
      yellow: { male: 119, female: 139 },
      white: { male: 122 },
      red: { male: 116, female: 133 }
    },
    frontNine: {
      yellow: { male: 34.4, slope: 112, female: 37.1, femaleSlope: 132 },
      white: { male: 34.8, slope: 116 },
      red: { male: 33.6, slope: 114, female: 36.2, femaleSlope: 131 }
    },
    backNine: {
      yellow: { male: 35, slope: 126, female: 38.6, femaleSlope: 145 },
      white: { male: 35.5, slope: 128 },
      red: { male: 33.5, slope: 118, female: 36.3, femaleSlope: 135 }
    },
    length: {
      yellow: 5897, // From CSV data
      white: 6089, // From CSV data
      red: 5477 // From CSV data
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 70,
    name: "Sandford Springs Hotel & Golf Club",
    courseName: "Woods & Lakes",
    location: "Kingsclere",
    county: "Hampshire",
    country: "England",
    par: {
      male: 71, // for White, Yellow, Red male tees
      female: 71, // for Red female tees
      femaleyellow: 72 // for Yellow female tees
    },
    courseRating: {
      white: { male: 71.1 },
      yellow: { male: 69.9, female: 76.3 },
      red: { male: 66.7, female: 72.1 }
    },
    slopeRating: {
      white: { male: 131 },
      yellow: { male: 128, female: 142 },
      red: { male: 116, female: 131 }
    },
    frontNine: {
      white: { male: 35.5, slope: 128 },
      yellow: { male: 35, slope: 126, female: 38.6, femaleSlope: 145 },
      red: { male: 33.5, slope: 118, female: 36.3, femaleSlope: 135 }
    },
    backNine: {
      white: { male: 35.6, slope: 133 },
      yellow: { male: 34.9, slope: 129, female: 37.7, femaleSlope: 139 },
      red: { male: 33.2, slope: 114, female: 35.8, femaleSlope: 126 }
    },
    length: {
      white: null,
      yellow: null,
      red: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 71,
    name: "Sandford Springs Hotel & Golf Club",
    courseName: "Lakes & Parks",
    location: "Kingsclere",
    county: "Hampshire",
    country: "England",
    par: {
      male: 69, // for White, Yellow, Red male tees
      female: 70, // for Red female tees
      femaleyellow: 71 // for Yellow female tees
    },
    courseRating: {
      white: { male: 70.4 },
      yellow: { male: 69.3, female: 74.8 },
      red: { male: 66.8, female: 72 }
    },
    slopeRating: {
      white: { male: 125 },
      yellow: { male: 121, female: 136 },
      red: { male: 114, female: 129 }
    },
    frontNine: {
      white: { male: 35.6, slope: 133 },
      yellow: { male: 34.9, slope: 129, female: 37.7, femaleSlope: 139 },
      red: { male: 33.2, slope: 114, female: 35.8, femaleSlope: 126 }
    },
    backNine: {
      white: { male: 34.8, slope: 116 },
      yellow: { male: 34.4, slope: 112, female: 37.1, femaleSlope: 132 },
      red: { male: 33.6, slope: 114, female: 36.2, femaleSlope: 131 }
    },
    length: {
      white: null,
      yellow: null,
      red: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 72,
    name: "New Forest Golf Club",
    courseName: "",
    location: "Lyndhurst",
    county: "Hampshire",
    country: "England",
    par: {
      male: 69, // for White, Red, Yellow, Blue male tees
      female: 69 // for Yellow, Red, White, Blue female tees
    },
    courseRating: {
      white: { male: 65.7, female: 70.7 },
      red: { male: 61.6, female: 66.6 },
      yellow: { male: 64.6, female: 69.6 },
      blue: { male: 62.9, female: 67.8 }
    },
    slopeRating: {
      white: { male: 108, female: 121 },
      red: { male: 96, female: 109 },
      yellow: { male: 106, female: 119 },
      blue: { male: 101, female: 111 }
    },
    frontNine: {
      white: { male: 34.4, slope: 112, female: 37.3, femaleSlope: 126 },
      red: { male: 32, slope: 102, female: 35.3, femaleSlope: 115 },
      yellow: { male: 33.9, slope: 110, female: 36.7, femaleSlope: 124 },
      blue: { male: 32.5, slope: 105, female: 35.3, femaleSlope: 110 }
    },
    backNine: {
      white: { male: 31.3, slope: 103, female: 33.4, femaleSlope: 115 },
      red: { male: 29.6, slope: 90, female: 31.3, femaleSlope: 102 },
      yellow: { male: 30.7, slope: 101, female: 32.9, femaleSlope: 114 },
      blue: { male: 30.4, slope: 97, female: 32.5, femaleSlope: 111 }
    },
    length: {
      white: 5536, // From CSV data
      red: 4722, // From CSV data
      yellow: 5343, // From CSV data
      blue: 5023 // From CSV data
    },
    established: null,
    type: "Heathland"
  },
  {
    id: 73,
    name: "Southwick Park Golf Club",
    courseName: "",
    location: "Southwick",
    county: "Hampshire",
    country: "England",
    par: {
      male: 69, // for White male tees
      maleyellow: 68, // for Yellow male tees
      malered: 68, // for Red male tees
      female: 70, // for Red female tees
      femalewhite: 74, // for White female tees
      femaleyellow: 72 // for Yellow female tees
    },
    courseRating: {
      white: { male: 68.9, female: 74.8 },
      yellow: { male: 67.1, female: 72.5 },
      red: { male: 65.5, female: 71.1 }
    },
    slopeRating: {
      white: { male: 123, female: 130 },
      yellow: { male: 118, female: 125 },
      red: { male: 114, female: 123 }
    },
    frontNine: {
      white: { male: 33.5, slope: 122, female: 36.9, femaleSlope: 129 },
      yellow: { male: 33.3, slope: 117, female: 35.9, femaleSlope: 127 },
      red: { male: 32.6, slope: 113, female: 35.2, femaleSlope: 125 }
    },
    backNine: {
      white: { male: 35.4, slope: 123, female: 37.9, femaleSlope: 131 },
      yellow: { male: 33.8, slope: 119, female: 36.6, femaleSlope: 122 },
      red: { male: 32.9, slope: 114, female: 35.9, femaleSlope: 120 }
    },
    length: {
      white: 5884, // From CSV data
      yellow: 5468, // From CSV data
      red: 5253 // From CSV data
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 74,
    name: "Tournerbury Golf Centre",
    courseName: "",
    location: "Hayling Island",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White, Yellow male tees
      female: 70 // for Red female tees
    },
    courseRating: {
      white: { male: 67.6 },
      yellow: { male: 66.6 },
      red: { female: 70 }
    },
    slopeRating: {
      white: { male: 117 },
      yellow: { male: 116 },
      red: { female: 123 }
    },
    frontNine: {
      white: { male: 33.8, slope: 117 },
      yellow: { male: 33.3, slope: 116 },
      red: { female: 35, femaleSlope: 123 }
    },
    backNine: {
      white: { male: 33.8, slope: 117 },
      yellow: { male: 33.3, slope: 116 },
      red: { female: 35, femaleSlope: 123 }
    },
    length: {
      white: null,
      yellow: null,
      red: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 75,
    name: "Wickham Park Golf Club",
    courseName: "",
    location: "Fareham",
    county: "Hampshire",
    country: "England",
    par: {
      male: 69, // for White, Yellow male tees
      female: 71 // for Red female tees
    },
    courseRating: {
      white: { male: 67.7 },
      yellow: { male: 66.9 },
      red: { female: 70.8 }
    },
    slopeRating: {
      white: { male: 117 },
      yellow: { male: 114 },
      red: { female: 122 }
    },
    frontNine: {
      white: { male: 34.3, slope: 119 },
      yellow: { male: 33.9, slope: 114 },
      red: { female: 35.5, femaleSlope: 123 }
    },
    backNine: {
      white: { male: 33.4, slope: 114 },
      yellow: { male: 33, slope: 114 },
      red: { female: 35.3, femaleSlope: 121 }
    },
    length: {
      white: null,
      yellow: null,
      red: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 76,
    name: "Hartley Wintney Golf Club",
    courseName: "",
    location: "Hook",
    county: "Hampshire",
    country: "England",
    par: {
      male: 71, // for White, Yellow, Red - Men male tees
      female: 73 // for Red female tees
    },
    courseRating: {
      white: { male: 70.8 },
      yellow: { male: 69.3 },
      "red - men": { male: 68.3 },
      red: { female: 73.3 }
    },
    slopeRating: {
      white: { male: 131 },
      yellow: { male: 127 },
      "red - men": { male: 120 },
      red: { female: 140 }
    },
    frontNine: {
      white: { male: 34.3, slope: 124 },
      yellow: { male: 33.7, slope: 122 },
      "red - men": { male: 32.8, slope: 116 },
      red: { female: 35.1, femaleSlope: 128 }
    },
    backNine: {
      white: { male: 36.5, slope: 138 },
      yellow: { male: 35.6, slope: 131 },
      "red - men": { male: 35.5, slope: 123 },
      red: { female: 38.2, femaleSlope: 152 }
    },
    length: {
      white: 6277, // From CSV data
      yellow: 5950, // From CSV data
      "red - men": 5657, // From CSV data (Red tee)
      red: 5657 // From CSV data (Red tee)
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 77,
    name: "Royal Guernsey Golf Club",
    courseName: "",
    location: "L'Ancresse",
    county: "Guernsey",
    country: "Channel Islands",
    par: {
      male: 70, // for White, Red male tees
      maleyellow: 69, // for Yellow male tees
      female: 72, // for Red female tees
      femaleyellow: 70 // for Yellow female tees
    },
    courseRating: {
      white: { male: 71.1 },
      yellow: { male: 69.4, female: 75.3 },
      red: { male: 67.4, female: 73.1 }
    },
    slopeRating: {
      white: { male: 118 },
      yellow: { male: 115, female: 126 },
      red: { male: 109, female: 121 }
    },
    frontNine: {
      white: { male: 36, slope: 121 },
      yellow: { male: 35, slope: 117, female: 37.9, femaleSlope: 124 },
      red: { male: 33.8, slope: 110, female: 36.7, femaleSlope: 121 }
    },
    backNine: {
      white: { male: 35.1, slope: 115 },
      yellow: { male: 34.4, slope: 113, female: 37.4, femaleSlope: 127 },
      red: { male: 33.6, slope: 108, female: 36.4, femaleSlope: 121 }
    },
    length: {
      white: null,
      yellow: null,
      red: null
    },
    established: null,
    type: "Links"
  },
  {
    id: 78,
    name: "Old Salterns Golf Course",
    courseName: "",
    location: "Southsea",
    county: "Hampshire",
    country: "England",
    par: {
      male: 68, // for White, Yellow, Black male tees
      female: 69 // for Orange female tees
    },
    courseRating: {
      white: { male: 67.9 },
      yellow: { male: 66.2 },
      black: { male: 66.9 },
      orange: { female: 69.3 }
    },
    slopeRating: {
      white: { male: 115 },
      yellow: { male: 110 },
      black: { male: 115 },
      orange: { female: 122 }
    },
    frontNine: {
      white: { male: 34.6, slope: 108 },
      yellow: { male: 34, slope: 105 },
      black: { male: 34.4, slope: 112 },
      orange: { female: 36.1, femaleSlope: 124 }
    },
    backNine: {
      white: { male: 33.3, slope: 122 },
      yellow: { male: 32.2, slope: 114 },
      black: { male: 32.5, slope: 118 },
      orange: { female: 33.2, femaleSlope: 119 }
    },
    length: {
      white: null,
      yellow: null,
      black: null,
      orange: null
    },
    established: null,
    type: "Links"
  },
  {
    id: 79,
    name: "Gosport and Stokes Bay Golf Club",
    courseName: "",
    location: "Gosport",
    county: "Hampshire",
    country: "England",
    par: {
      male: 71, // for White, Yellow, Red male tees
      female: 73 // for Red, Yellow female tees
    },
    courseRating: {
      red: { male: 66.7, female: 72.3 },
      white: { male: 69.3 },
      yellow: { male: 68.5, female: 73.9 }
    },
    slopeRating: {
      red: { male: 110, female: 123 },
      white: { male: 117 },
      yellow: { male: 113, female: 127 }
    },
    frontNine: {
      red: { male: 34, slope: 110, female: 36.7, femaleSlope: 126 },
      white: { male: 35.3, slope: 119 },
      yellow: { male: 34.8, slope: 113, female: 37.3, femaleSlope: 131 }
    },
    backNine: {
      red: { male: 32.7, slope: 110, female: 35.6, femaleSlope: 120 },
      white: { male: 34, slope: 115 },
      yellow: { male: 33.7, slope: 113, female: 36.6, femaleSlope: 123 }
    },
    length: {
      red: null,
      white: null,
      yellow: null
    },
    established: null,
    type: "Links"
  },
  {
    id: 80,
    name: "Ventnor Golf Club",
    courseName: "",
    location: "Ventnor",
    county: "Isle of Wight",
    country: "England",
    par: {
      male: 70, // for White, Yellow male tees
      malered: 69, // for Red male tees
      female: 72 // for Red female tees
    },
    courseRating: {
      red: { male: 64.7, female: 69.7 },
      white: { male: 67 },
      yellow: { male: 66.4 }
    },
    slopeRating: {
      red: { male: 99, female: 109 },
      white: { male: 106 },
      yellow: { male: 106 }
    },
    frontNine: {
      red: { male: 32.5, slope: 98, female: 35, femaleSlope: 108 },
      white: { male: 33.5, slope: 103 },
      yellow: { male: 33.3, slope: 103 }
    },
    backNine: {
      red: { male: 32.2, slope: 99, female: 34.7, femaleSlope: 110 },
      white: { male: 33.5, slope: 109 },
      yellow: { male: 33.1, slope: 108 }
    },
    length: {
      red: null,
      white: null,
      yellow: null
    },
    established: null,
    type: "Downland"
  },
  {
    id: 81,
    name: "Worldham Golf Club",
    courseName: "",
    location: "Alton",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White, Yellow, Blue male tees
      malered: 71, // for Red male tees
      female: 72 // for Red, Blue female tees
    },
    courseRating: {
      white: { male: 70.6 },
      yellow: { male: 69.4 },
      red: { male: 66, female: 71.8 },
      blue: { male: 59.6, female: 61.5 }
    },
    slopeRating: {
      white: { male: 123 },
      yellow: { male: 116 },
      red: { male: 110, female: 120 },
      blue: { male: 90, female: 92 }
    },
    frontNine: {
      white: { male: 35.8, slope: 129 },
      yellow: { male: 35.1, slope: 115 },
      red: { male: 32.9, slope: 110, female: 35.7, femaleSlope: 125 },
      blue: { male: 29.8, slope: 90, female: 30.7, femaleSlope: 92 }
    },
    backNine: {
      white: { male: 34.8, slope: 117 },
      yellow: { male: 34.3, slope: 117 },
      red: { male: 33.1, slope: 109, female: 36.1, femaleSlope: 114 },
      blue: { male: 29.8, slope: 90, female: 30.8, femaleSlope: 92 }
    },
    length: {
      white: 6257, // From CSV data
      yellow: 5887, // From CSV data
      red: 5326, // From CSV data
      blue: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 82,
    name: "Wheatlands Golf Club",
    courseName: "",
    location: "Jersey",
    county: "Jersey",
    country: "Channel Islands",
    par: {
      male: 54, // for White male tees
      female: 54 // for Red - 2018 female tees
    },
    courseRating: {
      white: { male: 58 },
      "red - 2018": { female: 58.8 }
    },
    slopeRating: {
      white: { male: 94 },
      "red - 2018": { female: 83 }
    },
    frontNine: {
      white: { male: 29, slope: 94 },
      "red - 2018": { female: 29.4, femaleSlope: 83 }
    },
    backNine: {
      white: { male: 29, slope: 94 },
      "red - 2018": { female: 29.4, femaleSlope: 83 }
    },
    length: {
      white: null,
      "red - 2018": null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 83,
    name: "Newport Golf Club",
    courseName: "",
    location: "Newport, IOW",
    county: "Isle of Wight",
    country: "England",
    par: {
      male: 69, // for Red, White, Yellow, Blue male tees
      female: 72, // for Red, White, Yellow, Blue female tees
      malealt: 69, // for alternative tees male
      femalealt: 72 // for alternative tees female
    },
    courseRating: {
      red: { male: 66.8, female: 71.1 },
      white: { male: 69.1, female: 75.7 },
      yellow: { male: 67.8, female: 73.4 },
      blue: { male: 64.2, female: 68.7 },
      "red alternative": { male: 66.8, female: 71.1 },
      "white alternative": { male: 69.1, female: 75.7 },
      "yellow alternative": { male: 67.8, female: 73.4 },
      "blue alternative": { male: 64.2, female: 68.7 }
    },
    slopeRating: {
      red: { male: 114, female: 124 },
      white: { male: 124, female: 138 },
      yellow: { male: 120, female: 132 },
      blue: { male: 108, female: 119 },
      "red alternative": { male: 114, female: 124 },
      "white alternative": { male: 124, female: 138 },
      "yellow alternative": { male: 120, female: 132 },
      "blue alternative": { male: 108, female: 119 }
    },
    frontNine: {
      red: { male: 33.4, female: 35.6, slope: 114, femaleSlope: 124 },
      white: { male: 34.6, female: 37.9, slope: 124, femaleSlope: 138 },
      yellow: { male: 33.9, female: 36.7, slope: 120, femaleSlope: 132 },
      blue: { male: 32.1, female: 34.4, slope: 108, femaleSlope: 119 },
      "red alternative": { male: 33.4, female: 35.6, slope: 114, femaleSlope: 124 },
      "white alternative": { male: 34.6, female: 37.9, slope: 124, femaleSlope: 138 },
      "yellow alternative": { male: 33.9, female: 36.7, slope: 120, femaleSlope: 132 },
      "blue alternative": { male: 32.1, female: 34.4, slope: 108, femaleSlope: 119 }
    },
    backNine: {
      red: { male: 33.4, female: 35.5, slope: 114, femaleSlope: 124 },
      white: { male: 34.5, female: 37.8, slope: 124, femaleSlope: 138 },
      yellow: { male: 33.9, female: 36.7, slope: 120, femaleSlope: 132 },
      blue: { male: 32.1, female: 34.3, slope: 108, femaleSlope: 119 },
      "red alternative": { male: 33.4, female: 35.5, slope: 114, femaleSlope: 124 },
      "white alternative": { male: 34.5, female: 37.8, slope: 124, femaleSlope: 138 },
      "yellow alternative": { male: 33.9, female: 36.7, slope: 120, femaleSlope: 132 },
      "blue alternative": { male: 32.1, female: 34.3, slope: 108, femaleSlope: 119 }
    },
    length: {
      red: null,
      white: null,
      yellow: null,
      blue: null,
      "red alternative": null,
      "white alternative": null,
      "yellow alternative": null,
      "blue alternative": null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 84,
    name: "Alresford Golf Club",
    courseName: "",
    location: "Alresford",
    county: "Hampshire",
    country: "England",
    par: {
      male: 69, // for White, Yellow male tees
      female: 71 // for Yellow - Women, Red - 2018 female tees
    },
    courseRating: {
      white: { male: 68.9 },
      yellow: { male: 67.7 },
      "yellow - women": { female: 73.6 },
      "red - 2018": { female: 71.5 }
    },
    slopeRating: {
      white: { male: 116 },
      yellow: { male: 114 },
      "yellow - women": { female: 127 },
      "red - 2018": { female: 122 }
    },
    frontNine: {
      white: { male: 34.9, slope: 118 },
      yellow: { male: 34.2, slope: 117 },
      "yellow - women": { female: 37.4, femaleSlope: 127 },
      "red - 2018": { female: 36.6, femaleSlope: 124 }
    },
    backNine: {
      white: { male: 34, slope: 113 },
      yellow: { male: 33.5, slope: 111 },
      "yellow - women": { female: 36.2, femaleSlope: 126 },
      "red - 2018": { female: 34.9, femaleSlope: 120 }
    },
    length: {
      white: 6031, // From CSV data
      yellow: 5763, // From CSV data
      "yellow - women": null,
      "red - 2018": 5442 // From CSV data (Red tee)
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 85,
    name: "North Hants Golf Club",
    courseName: "",
    location: "Hampshire",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for tees 65, 52, 66, 62, 39 male
      male57: 69, // for tee 57 male
      female: 73, // for tees 66, 65, 62, 57 female
      female52: 72, // for tee 52 female
      female39: 72 // for tee 39 female
    },
    courseRating: {
      "65": { male: 71, female: 77.1 },
      "52": { male: 64.6, female: 70 },
      "66": { male: 71.7, female: 77.2 },
      "57": { male: 67, female: 73.2 },
      "62": { male: 69.7, female: 75.6 },
      "39": { male: 59.1, female: 61.9 }
    },
    slopeRating: {
      "65": { male: 123, female: 127 },
      "52": { male: 109, female: 112 },
      "66": { male: 125, female: 131 },
      "57": { male: 112, female: 120 },
      "62": { male: 120, female: 124 },
      "39": { male: 84, female: 96 }
    },
    frontNine: {
      "65": { male: 35.6, female: 38.6, slope: 126, femaleSlope: 130 },
      "52": { male: 32.1, female: 34.9, slope: 109, femaleSlope: 114 },
      "66": { male: 36.1, female: 38.6, slope: 127, femaleSlope: 131 },
      "57": { male: 33.5, female: 36.8, slope: 115, femaleSlope: 122 },
      "62": { male: 34.8, female: 37.8, slope: 124, femaleSlope: 126 },
      "39": { male: 29.7, female: 31, slope: 82, femaleSlope: 94 }
    },
    backNine: {
      "65": { male: 35.4, female: 38.5, slope: 119, femaleSlope: 124 },
      "52": { male: 32.5, female: 35.1, slope: 109, femaleSlope: 109 },
      "66": { male: 35.6, female: 38.6, slope: 122, femaleSlope: 131 },
      "57": { male: 33.5, female: 36.4, slope: 109, femaleSlope: 117 },
      "62": { male: 34.9, female: 37.8, slope: 116, femaleSlope: 121 },
      "39": { male: 29.4, female: 30.9, slope: 86, femaleSlope: 98 }
    },
    length: {
      "65": null,
      "52": null,
      "66": null,
      "57": null,
      "62": null,
      "39": null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 86,
    name: "Bishopswood Golf Course",
    courseName: "",
    location: "Basingstoke",
    county: "Hampshire",
    country: "England",
    par: {
      male: 72, // for White, Red, Yellow male tees
      female: 72, // for Red female tees
      femalewhite: 76, // for White female tees
      femaleyellow: 74 // for Yellow female tees
    },
    courseRating: {
      white: { male: 71.4, female: 78.4 },
      red: { male: 67.6, female: 73.6 },
      yellow: { male: 69.8, female: 76.6 }
    },
    slopeRating: {
      white: { male: 137, female: 152 },
      red: { male: 122, female: 128 },
      yellow: { male: 126, female: 139 }
    },
    frontNine: {
      white: { male: 35.7, female: 39.2, slope: 137, femaleSlope: 152 },
      red: { male: 33.8, female: 36.8, slope: 122, femaleSlope: 128 },
      yellow: { male: 34.9, female: 38.3, slope: 126, femaleSlope: 139 }
    },
    backNine: {
      white: { male: 35.7, female: 39.2, slope: 137, femaleSlope: 152 },
      red: { male: 33.8, female: 36.8, slope: 122, femaleSlope: 128 },
      yellow: { male: 34.9, female: 38.3, slope: 126, femaleSlope: 139 }
    },
    length: {
      white: 6474, // From CSV data
      red: 5604, // From CSV data
      yellow: 6190 // From CSV data
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 87,
    name: "Boundary Lakes Golf Club",
    courseName: "",
    location: "Hampshire",
    county: "Hampshire",
    country: "England",
    par: {
      male: 70, // for White, Yellow, White Comp, Yellow Comp male tees
      malered: 69, // for Red, Red Comp male tees
      female: 70, // for Yellow, Red, Red Comp female tees
      femalewhite: 71 // for White, White Comp female tees
    },
    courseRating: {
      yellow: { male: 67.2, female: 72.7 },
      red: { male: 64.1, female: 68.9 },
      white: { male: 69.1, female: 74.4 },
      "white comp": { male: 69.1, female: 74.3 },
      "red comp": { male: 64.2, female: 69 },
      "yellow comp": { male: 67.1, female: 72.7 }
    },
    slopeRating: {
      yellow: { male: 120, female: 129 },
      red: { male: 112, female: 118 },
      white: { male: 124, female: 134 },
      "white comp": { male: 123, female: 135 },
      "red comp": { male: 111, female: 118 },
      "yellow comp": { male: 121, female: 128 }
    },
    frontNine: {
      yellow: { male: 32.7, female: 35.4, slope: 116, femaleSlope: 123 },
      red: { male: 31.8, female: 34.5, slope: 112, femaleSlope: 117 },
      white: { male: 33.8, female: 36.3, slope: 121, femaleSlope: 131 },
      "white comp": { male: 35.2, female: 38.2, slope: 127, femaleSlope: 141 },
      "red comp": { male: 32.9, female: 35.5, slope: 114, femaleSlope: 121 },
      "yellow comp": { male: 34.3, female: 37.4, slope: 125, femaleSlope: 133 }
    },
    backNine: {
      yellow: { male: 34.5, female: 37.3, slope: 124, femaleSlope: 134 },
      red: { male: 32.3, female: 34.4, slope: 111, femaleSlope: 119 },
      white: { male: 35.3, female: 38.1, slope: 126, femaleSlope: 137 },
      "white comp": { male: 33.9, female: 36.1, slope: 119, femaleSlope: 128 },
      "red comp": { male: 31.3, female: 33.5, slope: 107, femaleSlope: 114 },
      "yellow comp": { male: 32.8, female: 35.3, slope: 117, femaleSlope: 123 }
    },
    length: {
      yellow: 5578, // From CSV data
      red: 4953, // From CSV data
      white: 5951, // From CSV data
      "white comp": null,
      "red comp": null,
      "yellow comp": null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 88,
    name: "Fleetlands Golf Club",
    courseName: "",
    location: "Gosport",
    county: "Hampshire",
    country: "England",
    par: {
      male: 66, // for White male tees
      female: 66 // for Red female tees
    },
    courseRating: {
      white: { male: 63.2 },
      red: { female: 65.3 }
    },
    slopeRating: {
      white: { male: 104 },
      red: { female: 105 }
    },
    frontNine: {
      white: { male: 31.7, slope: 104 },
      red: { female: 32.7, femaleSlope: 107 }
    },
    backNine: {
      white: { male: 31.5, slope: 103 },
      red: { female: 32.6, femaleSlope: 103 }
    },
    length: {
      white: null,
      red: null
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 89,
    name: "Avington Park Golf Course",
    courseName: "",
    location: "Winchester",
    county: "Hampshire",
    country: "England",
    par: {
      male: 60, // for White and Blue male tees
      female: 61 // for White and Blue female tees
    },
    courseRating: {
      "white_blue": { male: 59.3, female: 61.4 }
    },
    slopeRating: {
      "white_blue": { male: 93, female: 90 }
    },
    frontNine: {
      "white_blue": { male: 29.7, female: 30.6, slope: 91, femaleSlope: 90 }
    },
    backNine: {
      "white_blue": { male: 29.6, female: 30.8, slope: 94, femaleSlope: 89 }
    },
    length: {
      "white_blue": 3816 // From CSV data
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 90,
    name: "St Pierre Park Hotel Spa & Golf Resort Guernsey",
    courseName: "",
    location: "Guernsey",
    county: "Guernsey",
    country: "Channel Islands",
    par: {
      male: 54, // for White male tees
      female: 54 // for White female tees
    },
    courseRating: {
      white: { male: 55, female: 57.8 }
    },
    slopeRating: {
      white: { male: 93, female: 87 }
    },
    frontNine: {
      white: { male: 27.6, female: 29, slope: 95, femaleSlope: 86 }
    },
    backNine: {
      white: { male: 27.4, female: 28.8, slope: 90, femaleSlope: 87 }
    },
    length: {
      white: 1394 // From CSV data
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 91,
    name: "Skylark Country Club",
    courseName: "",
    location: "Hampshire",
    county: "Hampshire",
    country: "England",
    par: {
      male: 69, // for White, Yellow, Winter male tees
      malered: 70, // for Red male tees
      female: 69, // for Yellow, Winter female tees
      femalewhite: 69, // for White female tees
      femalered: 71 // for Red female tees
    },
    courseRating: {
      white: { male: 67.1, female: 72.7 },
      yellow: { male: 65.6, female: 70.7 },
      red: { male: 65.2, female: 69.8 },
      winter: { male: 65.9, female: 71.2 }
    },
    slopeRating: {
      white: { male: 120, female: 125 },
      yellow: { male: 115, female: 120 },
      red: { male: 111, female: 122 },
      winter: { male: 116, female: 121 }
    },
    frontNine: {
      white: { male: 33.6, female: 36.2, slope: 125, femaleSlope: 123 },
      yellow: { male: 33.2, female: 35.6, slope: 117, femaleSlope: 120 },
      red: { male: 32.5, female: 34.7, slope: 109, femaleSlope: 122 },
      winter: { male: 33.3, female: 35.8, slope: 118, femaleSlope: 121 }
    },
    backNine: {
      white: { male: 33.5, female: 36.5, slope: 115, femaleSlope: 126 },
      yellow: { male: 32.4, female: 35.1, slope: 112, femaleSlope: 120 },
      red: { male: 32.7, female: 35.1, slope: 113, femaleSlope: 121 },
      winter: { male: 32.6, female: 35.4, slope: 113, femaleSlope: 121 }
    },
    length: {
      white: 5535, // From CSV data
      yellow: 5254, // From CSV data
      red: 5042, // From CSV data
      winter: null
    },
    established: null,
    type: "Parkland"
  }
]

export default function CourseDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCounties, setSelectedCounties] = useState<string[]>([])
  const [selectedTees, setSelectedTees] = useState<string[]>([])
  const [selectedPars, setSelectedPars] = useState<string[]>([])
  const [selectedLengths, setSelectedLengths] = useState<string[]>([])
  const [selectedCourseRatings, setSelectedCourseRatings] = useState<string[]>([])
  const [selectedSlopeRatings, setSelectedSlopeRatings] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState<string>('male')
  const [sortField, setSortField] = useState<string>('slope')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  // Helper functions for multi-select
  const toggleFilter = (value: string, currentValues: string[], setter: (values: string[]) => void) => {
    if (currentValues.includes(value)) {
      setter(currentValues.filter(v => v !== value))
    } else {
      setter([...currentValues, value])
    }
  }

  const removeFilter = (value: string, currentValues: string[], setter: (values: string[]) => void) => {
    setter(currentValues.filter(v => v !== value))
  }

  const clearAllFilters = () => {
    setSelectedCounties([])
    setSelectedTees([])
    setSelectedPars([])
    setSelectedLengths([])
    setSelectedCourseRatings([])
    setSelectedSlopeRatings([])
    setSelectedTypes([])
    setSelectedGender('male')
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Get unique values for filters
  const counties = useMemo(() => {
    const uniqueCounties = Array.from(new Set(courseData.map(course => course.county)))
    return uniqueCounties.sort()
  }, [])

  const teeTypes = useMemo(() => {
    return ['white', 'yellow', 'black', 'red', 'blue', 'purple', 'green', 'gold', 'orange', 'red 2017', 'red - 2018', 'red 2019', 'red/yellow', 'white/blue', 'blue 3-11', 'red 3-11', 'blue - new', 'white - new', 'red - new', 'red composite', 'white composite', 'yellow composite', 'white comp', 'red comp', 'yellow comp', 'blue women', 'green 2019', 'orange - women', 'green women', 'red - men', 'green - women', 'yellow - women', 'red men', 'navy 55', 'navy 63', 'navy 68', 'navy 37', 'navy 60', 'new red', 'new yellow', 'new white', 'blue 9', 'red combo', 'white combo', '65', '52', '66', '57', '62', '39'].filter(tee => !tee.includes('alternative') && !tee.includes('winter'))
  }, [])

  const parValues = useMemo(() => {
    const allPars = courseData.flatMap(course => [course.par.male, course.par.female])
    return Array.from(new Set(allPars)).sort((a, b) => a - b)
  }, [])

  const courseTypes = useMemo(() => {
    const uniqueTypes = Array.from(new Set(courseData.map(course => course.type)))
    return uniqueTypes.sort()
  }, [])

  // Filter courses based on search and filters - now works with tee-level filtering
  const filteredCourses = useMemo(() => {
    return courseData.filter(course => {
      // Search term filter
      const matchesSearch = !searchTerm ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.county.toLowerCase().includes(searchTerm.toLowerCase())

      // County filter
      const matchesCounty = selectedCounties.length === 0 || selectedCounties.includes(course.county)

      // Type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(course.type)

      // Check if course has any matching tees for other filters
      const hasMatchingTee = teeTypes.some(teeColor => {
        const courseRatingData = course.courseRating?.[teeColor as keyof typeof course.courseRating]
        const slopeRatingData = course.slopeRating?.[teeColor as keyof typeof course.slopeRating]
        const lengthData = course.length?.[teeColor as keyof typeof course.length]

        // Check if this tee has data for the selected gender
        let hasGenderData = false
        if (selectedGender === 'male' && courseRatingData && 'male' in courseRatingData && courseRatingData.male !== undefined) {
          hasGenderData = true
        } else if (selectedGender === 'female' && courseRatingData && 'female' in courseRatingData && courseRatingData.female !== undefined) {
          hasGenderData = true
        }

        if (!hasGenderData) return false

        // Tee color filter
        if (selectedTees.length > 0 && !selectedTees.includes(teeColor)) return false

        // Get par for this tee/gender combination
        let parValue = course.par?.male || 70
        if (selectedGender === 'female') {
          parValue = course.par?.female || 72
          if (teeColor === 'red' && course.par?.femalered) parValue = course.par.femalered
        } else {
          if (teeColor === 'red' && course.par?.malered) parValue = course.par.malered
          if (teeColor === 'blue' && course.par?.maleblue) parValue = course.par.maleblue
          if (teeColor === 'yellow' && course.par?.maleyellow) parValue = course.par.maleyellow
          if (teeColor === 'white' && course.par?.malewhite) parValue = course.par.malewhite
        }

        // Par filter
        if (selectedPars.length > 0 && !selectedPars.includes(parValue.toString())) return false

        // Length filter
        const length = lengthData || 0
        if (selectedLengths.length > 0) {
          const lengthMatches = selectedLengths.some(lengthRange => {
            if (lengthRange === '0-5000') return length <= 5000
            if (lengthRange === '5001-6000') return length > 5000 && length <= 6000
            if (lengthRange === '6001-7000') return length > 6000 && length <= 7000
            if (lengthRange === '7001+') return length > 7000
            return false
          })
          if (!lengthMatches) return false
        }

        // Course rating filter
        const rating = selectedGender === 'male' ? (courseRatingData as any)?.male : (courseRatingData as any)?.female
        if (selectedCourseRatings.length > 0 && rating) {
          const ratingMatches = selectedCourseRatings.some(ratingRange => {
            if (ratingRange === '60-65') return rating >= 60 && rating <= 65
            if (ratingRange === '66-70') return rating >= 66 && rating <= 70
            if (ratingRange === '71-75') return rating >= 71 && rating <= 75
            if (ratingRange === '76+') return rating >= 76
            return false
          })
          if (!ratingMatches) return false
        }

        // Slope rating filter
        const slope = selectedGender === 'male' ? (slopeRatingData as any)?.male : (slopeRatingData as any)?.female
        if (selectedSlopeRatings.length > 0 && slope) {
          const slopeMatches = selectedSlopeRatings.some(slopeRange => {
            if (slopeRange === '55-100') return slope >= 55 && slope <= 100
            if (slopeRange === '101-120') return slope >= 101 && slope <= 120
            if (slopeRange === '121-140') return slope >= 121 && slope <= 140
            if (slopeRange === '141+') return slope >= 141
            return false
          })
          if (!slopeMatches) return false
        }

        return true
      })

      return matchesSearch && matchesCounty && matchesType && hasMatchingTee
    })
  }, [searchTerm, selectedCounties, selectedTees, selectedPars, selectedLengths, selectedCourseRatings, selectedSlopeRatings, selectedTypes, selectedGender, teeTypes])

  // Create sorted and filtered tee data for display
  const sortedAndFilteredTeeData = useMemo(() => {
    const allTeeData = []

    for (const course of filteredCourses) {
      // Iterate through all possible tee colors
      for (const teeColor of teeTypes) {
        const courseRatingData = course.courseRating?.[teeColor as keyof typeof course.courseRating]
        const slopeRatingData = course.slopeRating?.[teeColor as keyof typeof course.slopeRating]

        // Add entry only for the selected gender
        if (selectedGender === 'male' &&
            courseRatingData && 'male' in courseRatingData && courseRatingData.male !== undefined &&
            slopeRatingData && 'male' in slopeRatingData && slopeRatingData.male !== undefined) {

          // Get par for this tee/gender combination
          let malePar = course.par?.male || 70
          if (teeColor === 'red' && course.par?.malered) malePar = course.par.malered
          if (teeColor === 'blue' && course.par?.maleblue) malePar = course.par.maleblue
          if (teeColor === 'yellow' && course.par?.maleyellow) malePar = course.par.maleyellow
          if (teeColor === 'white' && course.par?.malewhite) malePar = course.par.malewhite

          allTeeData.push({
            course,
            teeColor,
            gender: 'male',
            par: malePar,
            length: course.length?.[teeColor as keyof typeof course.length] || 0,
            rating: courseRatingData.male,
            slope: slopeRatingData.male
          })
        }

        // Add female entry only if female is selected
        if (selectedGender === 'female' &&
            courseRatingData && 'female' in courseRatingData && courseRatingData.female !== undefined &&
            slopeRatingData && 'female' in slopeRatingData && slopeRatingData.female !== undefined) {

          // Get par for this tee/gender combination
          let femalePar = course.par?.female || 70
          if (teeColor === 'red' && course.par?.femalered) femalePar = course.par.femalered
          if (teeColor === 'blue' && course.par?.femaleblue) femalePar = course.par.femaleblue
          if (teeColor === 'yellow' && course.par?.femaleyellow) femalePar = course.par.femaleyellow
          if (teeColor === 'white' && course.par?.femalewhite) femalePar = course.par.femalewhite

          allTeeData.push({
            course,
            teeColor,
            gender: 'female',
            par: femalePar,
            length: course.length?.[teeColor as keyof typeof course.length] || 0,
            rating: courseRatingData.female,
            slope: slopeRatingData.female
          })
        }
      }
    }

    // Apply sorting to the tee data
    if (!sortField) return allTeeData

    return [...allTeeData].sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortField) {
        case 'name':
          aValue = a.course.name.toLowerCase()
          bValue = b.course.name.toLowerCase()
          break
        case 'course':
          aValue = a.course.courseName.toLowerCase()
          bValue = b.course.courseName.toLowerCase()
          break
        case 'county':
          aValue = a.course.county.toLowerCase()
          bValue = b.course.county.toLowerCase()
          break
        case 'type':
          aValue = a.course.type.toLowerCase()
          bValue = b.course.type.toLowerCase()
          break
        case 'tee':
          aValue = a.teeColor.toLowerCase()
          bValue = b.teeColor.toLowerCase()
          break
        case 'par':
          aValue = a.par || 0
          bValue = b.par || 0
          break
        case 'length':
          aValue = a.length || 0
          bValue = b.length || 0
          break
        case 'rating':
          aValue = a.rating || 0
          bValue = b.rating || 0
          break
        case 'slope':
          aValue = a.slope || 0
          bValue = b.slope || 0
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredCourses, sortField, sortDirection, selectedGender, teeTypes])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div>
          {/* Breadcrumbs */}
        <nav className="text-sm text-slate-600 mb-4">
          <ol className="flex space-x-2">
            <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
            <li><span className="mx-2 text-slate-400">Course Directory</span></li>
          </ol>
        </nav>
        </div>

        <div className="text-center mb-12"> {/* Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Golf Course Directory
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Discover golf courses with detailed information including par, slope ratings, course ratings, and more.
          </p>
        </div>

        <Card className="mb-8"> {/* Filters */}
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-900">
              Search & Filter Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search */}
              <div>
                <Input
                  type="text"
                  placeholder="Search courses or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Gender Filter */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-slate-700">Gender:</label>
                <div className="relative group">
                  <button className="w-32 flex items-center justify-between px-4 py-2 text-sm border border-slate-300 rounded-md bg-white text-emerald-700 hover:border-emerald-500 transition-colors">
                    <span>{selectedGender === 'male' ? 'Male' : 'Female'}</span>
                    <ChevronDown className="h-4 w-4 text-emerald-600" />
                  </button>
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <button
                        onClick={() => setSelectedGender('male')}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        Male
                      </button>
                      <button
                        onClick={() => setSelectedGender('female')}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        Female
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Filter Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                {/* County Filter */}
                <div className="relative group">
                  <button className="w-full flex items-center justify-between px-4 py-2 text-sm border border-slate-300 rounded-md bg-white text-emerald-700 hover:border-emerald-500 transition-colors">
                    <span>County</span>
                    <ChevronDown className="h-4 w-4 text-emerald-600" />
                  </button>
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1 max-h-48 overflow-y-auto">
                      {counties.map(county => (
                        <button
                          key={county}
                          onClick={() => toggleFilter(county, selectedCounties, setSelectedCounties)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          {county}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tee Filter */}
                <div className="relative group">
                  <button className="w-full flex items-center justify-between px-4 py-2 text-sm border border-slate-300 rounded-md bg-white text-emerald-700 hover:border-emerald-500 transition-colors">
                    <span>Tee</span>
                    <ChevronDown className="h-4 w-4 text-emerald-600" />
                  </button>
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1 max-h-48 overflow-y-auto">
                      {teeTypes.map(teeType => (
                        <button
                          key={teeType}
                          onClick={() => toggleFilter(teeType, selectedTees, setSelectedTees)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          {teeType.charAt(0).toUpperCase() + teeType.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Par Filter */}
                <div className="relative group">
                  <button className="w-full flex items-center justify-between px-4 py-2 text-sm border border-slate-300 rounded-md bg-white text-emerald-700 hover:border-emerald-500 transition-colors">
                    <span>Par</span>
                    <ChevronDown className="h-4 w-4 text-emerald-600" />
                  </button>
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1 max-h-48 overflow-y-auto">
                      {parValues.map(par => (
                        <button
                          key={par}
                          onClick={() => toggleFilter(par.toString(), selectedPars, setSelectedPars)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          {par}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Length Filter */}
                <div className="relative group">
                  <button className="w-full flex items-center justify-between px-4 py-2 text-sm border border-slate-300 rounded-md bg-white text-emerald-700 hover:border-emerald-500 transition-colors">
                    <span>Length</span>
                    <ChevronDown className="h-4 w-4 text-emerald-600" />
                  </button>
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1 max-h-48 overflow-y-auto">
                      <button onClick={() => toggleFilter('under-5000', selectedLengths, setSelectedLengths)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">Under 5000 yds</button>
                      <button onClick={() => toggleFilter('5000-5500', selectedLengths, setSelectedLengths)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">5000-5500 yds</button>
                      <button onClick={() => toggleFilter('5500-6000', selectedLengths, setSelectedLengths)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">5500-6000 yds</button>
                      <button onClick={() => toggleFilter('over-6000', selectedLengths, setSelectedLengths)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">Over 6000 yds</button>
                    </div>
                  </div>
                </div>

                {/* Course Rating Filter */}
                <div className="relative group">
                  <button className="w-full flex items-center justify-between px-4 py-2 text-sm border border-slate-300 rounded-md bg-white text-emerald-700 hover:border-emerald-500 transition-colors">
                    <span>Course Rating</span>
                    <ChevronDown className="h-4 w-4 text-emerald-600" />
                  </button>
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1 max-h-48 overflow-y-auto">
                      <button onClick={() => toggleFilter('under-65', selectedCourseRatings, setSelectedCourseRatings)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">Under 65</button>
                      <button onClick={() => toggleFilter('65-70', selectedCourseRatings, setSelectedCourseRatings)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">65-70</button>
                      <button onClick={() => toggleFilter('70-75', selectedCourseRatings, setSelectedCourseRatings)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">70-75</button>
                      <button onClick={() => toggleFilter('over-75', selectedCourseRatings, setSelectedCourseRatings)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">Over 75</button>
                    </div>
                  </div>
                </div>

                {/* Slope Rating Filter */}
                <div className="relative group">
                  <button className="w-full flex items-center justify-between px-4 py-2 text-sm border border-slate-300 rounded-md bg-white text-emerald-700 hover:border-emerald-500 transition-colors">
                    <span>Slope Rating</span>
                    <ChevronDown className="h-4 w-4 text-emerald-600" />
                  </button>
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1 max-h-48 overflow-y-auto">
                      <button onClick={() => toggleFilter('under-120', selectedSlopeRatings, setSelectedSlopeRatings)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">Under 120</button>
                      <button onClick={() => toggleFilter('120-130', selectedSlopeRatings, setSelectedSlopeRatings)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">120-130</button>
                      <button onClick={() => toggleFilter('130-140', selectedSlopeRatings, setSelectedSlopeRatings)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">130-140</button>
                      <button onClick={() => toggleFilter('over-140', selectedSlopeRatings, setSelectedSlopeRatings)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">Over 140</button>
                    </div>
                  </div>
                </div>

                {/* Type Filter */}
                <div className="relative group">
                  <button className="w-full flex items-center justify-between px-4 py-2 text-sm border border-slate-300 rounded-md bg-white text-emerald-700 hover:border-emerald-500 transition-colors">
                    <span>Type</span>
                    <ChevronDown className="h-4 w-4 text-emerald-600" />
                  </button>
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1 max-h-48 overflow-y-auto">
                      {courseTypes.map(type => (
                        <button
                          key={type}
                          onClick={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Filters Display */}
              <div className="space-y-2">
                {/* Clear All Button */}
                {(selectedCounties.length > 0 || selectedTees.length > 0 || selectedPars.length > 0 ||
                  selectedLengths.length > 0 || selectedCourseRatings.length > 0 || selectedSlopeRatings.length > 0 ||
                  selectedTypes.length > 0) && (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}

                {/* Filter Badges */}
                <div className="flex flex-wrap gap-2">
                {/* County Badges */}
                {selectedCounties.map(county => (
                  <Badge key={`county-${county}`} variant="secondary" className="flex items-center gap-1">
                    County: {county}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeFilter(county, selectedCounties, setSelectedCounties)}
                    />
                  </Badge>
                ))}

                {/* Tee Badges */}
                {selectedTees.map(tee => (
                  <Badge key={`tee-${tee}`} variant="secondary" className="flex items-center gap-1">
                    {tee.charAt(0).toUpperCase() + tee.slice(1)} Tee
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeFilter(tee, selectedTees, setSelectedTees)}
                    />
                  </Badge>
                ))}

                {/* Par Badges */}
                {selectedPars.map(par => (
                  <Badge key={`par-${par}`} variant="secondary" className="flex items-center gap-1">
                    Par {par}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeFilter(par, selectedPars, setSelectedPars)}
                    />
                  </Badge>
                ))}

                {/* Length Badges */}
                {selectedLengths.map(length => (
                  <Badge key={`length-${length}`} variant="secondary" className="flex items-center gap-1">
                    {length.replace('-', '-').replace('under-', 'Under ').replace('over-', 'Over ')} yds
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeFilter(length, selectedLengths, setSelectedLengths)}
                    />
                  </Badge>
                ))}

                {/* Course Rating Badges */}
                {selectedCourseRatings.map(rating => (
                  <Badge key={`rating-${rating}`} variant="secondary" className="flex items-center gap-1">
                    CR: {rating.replace('-', '-').replace('under-', 'Under ').replace('over-', 'Over ')}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeFilter(rating, selectedCourseRatings, setSelectedCourseRatings)}
                    />
                  </Badge>
                ))}

                {/* Slope Rating Badges */}
                {selectedSlopeRatings.map(slope => (
                  <Badge key={`slope-${slope}`} variant="secondary" className="flex items-center gap-1">
                    SR: {slope.replace('-', '-').replace('under-', 'Under ').replace('over-', 'Over ')}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeFilter(slope, selectedSlopeRatings, setSelectedSlopeRatings)}
                    />
                  </Badge>
                ))}

                {/* Type Badges */}
                {selectedTypes.map(type => (
                  <Badge key={`type-${type}`} variant="secondary" className="flex items-center gap-1">
                    {type}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeFilter(type, selectedTypes, setSelectedTypes)}
                    />
                  </Badge>
                ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600 text-slate-600">
            Showing {sortedAndFilteredTeeData.length} result{sortedAndFilteredTeeData.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Course List Directory */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header - Responsive Layout */}
          <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b font-semibold text-sm text-emerald-700">
            <div className="col-span-3 flex items-center">
              <button
                onClick={() => handleSort('name')}
                className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
              >
                Golf Club
                {sortField === 'name' && (
                  sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="col-span-2 flex items-center">
              <button
                onClick={() => handleSort('county')}
                className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
              >
                County
                {sortField === 'county' && (
                  sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <button
                onClick={() => handleSort('tee')}
                className="flex items-center gap-1 hover:text-emerald-600 transition-colors text-xs"
              >
                Tee
                {sortField === 'tee' && (
                  sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                )}
              </button>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <button
                onClick={() => handleSort('par')}
                className="flex items-center gap-1 hover:text-emerald-600 transition-colors text-xs"
              >
                Par
                {sortField === 'par' && (
                  sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                )}
              </button>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <button
                onClick={() => handleSort('length')}
                className="flex items-center gap-1 hover:text-emerald-600 transition-colors text-xs"
              >
                Length
                {sortField === 'length' && (
                  sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                )}
              </button>
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <button
                onClick={() => handleSort('rating')}
                className="flex items-center gap-1 hover:text-emerald-600 transition-colors text-xs"
              >
                Course Rating
                {sortField === 'rating' && (
                  sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                )}
              </button>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <button
                onClick={() => handleSort('slope')}
                className="flex items-center gap-1 hover:text-emerald-600 transition-colors text-xs"
              >
                Slope
                {sortField === 'slope' && (
                  sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                )}
              </button>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <button
                onClick={() => handleSort('type')}
                className="flex items-center gap-1 hover:text-emerald-600 transition-colors text-xs"
              >
                Type
                {sortField === 'type' && (
                  sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden px-4 py-3 bg-gray-50 border-b font-semibold text-sm text-emerald-700">
            Golf Course Directory (Tap to sort)
          </div>

          {/* Course Rows - Responsive Layout */}
          {sortedAndFilteredTeeData.map((data, index) => (
            <div key={index}>
              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="col-span-3 font-medium text-slate-900 text-sm">{data.course.name}</div>
                <div className="col-span-2 text-slate-600 text-sm">{data.course.county}</div>
                <div className="col-span-1 text-center text-sm">
                  <span className="inline-block w-3 h-3 rounded-full border" style={{backgroundColor: data.teeColor}}></span>
                  <span className="ml-1 text-xs">{data.teeColor}</span>
                </div>
                <div className="col-span-1 text-center text-sm">{data.par}</div>
                <div className="col-span-1 text-center text-sm">{data.length || '-'}</div>
                <div className="col-span-2 text-center text-sm">{data.rating}</div>
                <div className="col-span-1 text-center text-sm">{data.slope}</div>
                <div className="col-span-1 text-center text-sm">{data.course.type}</div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden px-4 py-4 border-b border-gray-200">
                <div className="font-medium text-slate-900 text-base mb-2">{data.course.name}</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">County:</span>
                    <span className="ml-2 text-slate-700">{data.course.county}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Type:</span>
                    <span className="ml-2 text-slate-700">{data.course.type}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Tee:</span>
                    <span className="ml-2">
                      <span className="inline-block w-3 h-3 rounded-full border mr-1" style={{backgroundColor: data.teeColor}}></span>
                      {data.teeColor}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Par:</span>
                    <span className="ml-2 text-slate-700">{data.par}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Length:</span>
                    <span className="ml-2 text-slate-700">{data.length || '-'} yds</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Rating/Slope:</span>
                    <span className="ml-2 text-slate-700">{data.rating} {' / '} {data.slope}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {sortedAndFilteredTeeData.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              No courses found matching your criteria.
            </div>
          )}
        </div>

        {/* Show loading state */}
        {sortedAndFilteredTeeData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-600">Loading courses...</p>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
