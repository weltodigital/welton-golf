'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

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
      white: null, // Length not available from reliable source
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
      white: 6280, // From reliable scorecard source
      yellow: 5874, // From reliable scorecard source
      red: 5165, // From reliable scorecard source
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
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      black: null, // Length not available from reliable source
      red: null, // Length not available from reliable source
      blue: null // Length not available from reliable source
    },
    established: 1992,
    type: "Parkland"
  },
  {
    id: 6,
    name: "Barton on Sea Golf Club",
    courseName: "Stroller/Becton",
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
    courseName: "Needles/Stroller",
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
    courseName: "Becton/Needles",
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
    courseName: "Embley/Blackwater",
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
    courseName: "Ryedown/Blackwater",
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
    courseName: "Ryedown/Embley",
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
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null, // Length not available from reliable source
      purple: null, // Length not available from reliable source
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
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null // Length not available from reliable source
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
      black: null, // Length not available from reliable source
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
      white: null, // Length not available from reliable source
      yellow: null, // Length not available from reliable source
      red: null // Length not available from reliable source
    },
    established: null,
    type: "Parkland"
  },
  {
    id: 25,
    name: "Weybrook Park Golf Club",
    courseName: "East/West B9",
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
    courseName: "West B9/East",
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
    courseName: "East/West F9",
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
    courseName: "West F9/East",
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
      white: null,
      yellow: null,
      red: null,
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
      white: null,
      yellow: null,
      "red - 2018": null
    },
    established: null,
    type: "Heathland"
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

  // Get unique values for filters
  const counties = useMemo(() => {
    const uniqueCounties = Array.from(new Set(courseData.map(course => course.county)))
    return uniqueCounties.sort()
  }, [])

  const teeTypes = ['white', 'yellow', 'black', 'red', 'blue', 'purple', 'green', 'gold', 'white alternative', 'yellow alternative', 'red alternative', 'red 2017', 'red - 2018', 'winter', 'blue 3-11', 'red 3-11']

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
      // Basic search
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.county.toLowerCase().includes(searchTerm.toLowerCase())

      // County filter
      const matchesCounty = selectedCounties.length === 0 || selectedCounties.includes(course.county)

      // Type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(course.type)

      // Create separate entries for each gender/tee combination
      const teeData = []
      const teeColors = ['white', 'yellow', 'black', 'red', 'blue', 'purple', 'green', 'gold', 'white alternative', 'yellow alternative', 'red alternative', 'red 2017', 'red - 2018', 'winter', 'blue 3-11', 'red 3-11']

      for (const teeColor of teeColors) {
        const teeInfo = course.courseRating[teeColor as keyof typeof course.courseRating]
        const slopeInfo = course.slopeRating[teeColor as keyof typeof course.slopeRating]

        // Add male entry if it exists
        if (teeInfo && 'male' in teeInfo && teeInfo.male !== undefined && slopeInfo && 'male' in slopeInfo && slopeInfo.male !== undefined) {
          let malePar = course.par.male
          if (teeColor === 'red' && course.par.malered) malePar = course.par.malered
          if (teeColor === 'blue' && course.par.maleblue) malePar = course.par.maleblue
          if (teeColor === 'yellow' && course.par.maleyellow) malePar = course.par.maleyellow
          if (teeColor === 'white' && course.par.malewhite) malePar = course.par.malewhite
          if (teeColor === 'winter' && course.par.malewinter) malePar = course.par.malewinter
          if (teeColor === 'red alternative' && course.par.maleredalternative) malePar = course.par.maleredalternative
          if (teeColor === 'white alternative' && course.par.malewhitealternative) malePar = course.par.malewhitealternative
          if (teeColor === 'purple' && course.par.malepurple) malePar = course.par.malepurple

          teeData.push({
            teeColor,
            gender: 'male',
            rating: (teeInfo as any).male,
            slope: (slopeInfo as any).male,
            length: course.length[teeColor as keyof typeof course.length],
            par: malePar
          })
        }

        // Add female entry if it exists
        if (teeInfo && 'female' in teeInfo && teeInfo.female !== undefined && slopeInfo && 'female' in slopeInfo && slopeInfo.female !== undefined) {
          let femalePar = course.par.female
          if (teeColor === 'yellow' && course.par.femaleyellow) femalePar = course.par.femaleyellow
          if (teeColor === 'blue' && course.par.femaleblue) femalePar = course.par.femaleblue
          if (teeColor === 'red' && course.par.femalered) femalePar = course.par.femalered
          if (teeColor === 'white' && course.par.femalewhite) femalePar = course.par.femalewhite
          if (teeColor === 'winter' && course.par.femalewinter) femalePar = course.par.femalewinter
          if (teeColor === 'red 2017' && course.par.femalered2017) femalePar = course.par.femalered2017

          teeData.push({
            teeColor,
            gender: 'female',
            rating: (teeInfo as any).female,
            slope: (slopeInfo as any).female,
            length: course.length[teeColor as keyof typeof course.length],
            par: femalePar
          })
        }
      }

      const hasMatchingTee = teeData.some(data => {
        // Tee filter
        const matchesTee = selectedTees.length === 0 || selectedTees.includes(data.teeColor)

        // Gender filter - exact match required
        const matchesGender = data.gender === selectedGender

        // Par filter
        const matchesPar = selectedPars.length === 0 || selectedPars.includes(data.par.toString())

        // Length filter
        const matchesLength = selectedLengths.length === 0 || (data.length !== null && selectedLengths.some(lengthRange => {
          return (lengthRange === 'under-5000' && data.length < 5000) ||
                 (lengthRange === '5000-5500' && data.length >= 5000 && data.length <= 5500) ||
                 (lengthRange === '5500-6000' && data.length >= 5500 && data.length <= 6000) ||
                 (lengthRange === 'over-6000' && data.length > 6000)
        }))

        // Course Rating filter
        const matchesCourseRating = selectedCourseRatings.length === 0 || selectedCourseRatings.some(ratingRange => {
          return (ratingRange === 'under-65' && data.rating < 65) ||
                 (ratingRange === '65-70' && data.rating >= 65 && data.rating <= 70) ||
                 (ratingRange === '70-75' && data.rating >= 70 && data.rating <= 75) ||
                 (ratingRange === 'over-75' && data.rating > 75)
        })

        // Slope Rating filter
        const matchesSlopeRating = selectedSlopeRatings.length === 0 || selectedSlopeRatings.some(slopeRange => {
          return (slopeRange === 'under-120' && data.slope < 120) ||
                 (slopeRange === '120-130' && data.slope >= 120 && data.slope <= 130) ||
                 (slopeRange === '130-140' && data.slope >= 130 && data.slope <= 140) ||
                 (slopeRange === 'over-140' && data.slope > 140)
        })

        return matchesTee && matchesGender && matchesPar && matchesLength && matchesCourseRating && matchesSlopeRating
      })

      return matchesSearch && matchesCounty && matchesType && hasMatchingTee
    })
  }, [searchTerm, selectedCounties, selectedTees, selectedPars, selectedLengths, selectedCourseRatings, selectedSlopeRatings, selectedTypes, selectedGender])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Golf Course Directory
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Discover golf courses with detailed information including par, slope ratings, course ratings, and more.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold" style={{ color: '#183a37' }}>
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
                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Other Filter Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                {/* County Filter */}
                <Select onValueChange={(value) => toggleFilter(value, selectedCounties, setSelectedCounties)}>
                  <SelectTrigger>
                    <SelectValue placeholder="County" />
                  </SelectTrigger>
                  <SelectContent>
                    {counties.map(county => (
                      <SelectItem key={county} value={county}>{county}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Tee Filter */}
                <Select onValueChange={(value) => toggleFilter(value, selectedTees, setSelectedTees)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tee" />
                  </SelectTrigger>
                  <SelectContent>
                    {teeTypes.map(teeType => (
                      <SelectItem key={teeType} value={teeType}>
                        {teeType.charAt(0).toUpperCase() + teeType.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Par Filter */}
                <Select onValueChange={(value) => toggleFilter(value, selectedPars, setSelectedPars)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Par" />
                  </SelectTrigger>
                  <SelectContent>
                    {parValues.map(par => (
                      <SelectItem key={par} value={par.toString()}>{par}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Length Filter */}
                <Select onValueChange={(value) => toggleFilter(value, selectedLengths, setSelectedLengths)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-5000">Under 5000 yds</SelectItem>
                    <SelectItem value="5000-5500">5000-5500 yds</SelectItem>
                    <SelectItem value="5500-6000">5500-6000 yds</SelectItem>
                    <SelectItem value="over-6000">Over 6000 yds</SelectItem>
                  </SelectContent>
                </Select>

                {/* Course Rating Filter */}
                <Select onValueChange={(value) => toggleFilter(value, selectedCourseRatings, setSelectedCourseRatings)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Course Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-65">Under 65</SelectItem>
                    <SelectItem value="65-70">65-70</SelectItem>
                    <SelectItem value="70-75">70-75</SelectItem>
                    <SelectItem value="over-75">Over 75</SelectItem>
                  </SelectContent>
                </Select>

                {/* Slope Rating Filter */}
                <Select onValueChange={(value) => toggleFilter(value, selectedSlopeRatings, setSelectedSlopeRatings)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Slope Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-120">Under 120</SelectItem>
                    <SelectItem value="120-130">120-130</SelectItem>
                    <SelectItem value="130-140">130-140</SelectItem>
                    <SelectItem value="over-140">Over 140</SelectItem>
                  </SelectContent>
                </Select>

                {/* Type Filter */}
                <Select onValueChange={(value) => toggleFilter(value, selectedTypes, setSelectedTypes)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          <p className="text-slate-600 dark:text-slate-400">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Course List Directory */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-10 gap-3 px-4 py-3 bg-gray-50 border-b font-semibold text-xs md:text-sm" style={{ color: '#183a37' }}>
            <div className="col-span-2 flex items-center">Golf Club</div>
            <div className="col-span-1 flex items-center">Course</div>
            <div className="col-span-1 flex items-center">County</div>
            <div className="col-span-1 flex items-center">Tee</div>
            <div className="col-span-1 flex items-center justify-center">Par</div>
            <div className="col-span-1 flex items-center justify-center">Length (yds)</div>
            <div className="col-span-1 flex items-center justify-center">Course Rating</div>
            <div className="col-span-1 flex items-center justify-center">Slope Rating</div>
            <div className="col-span-1 flex items-center">Type</div>
          </div>

          {/* Course Rows - Each Tee/Gender as Separate Row */}
          {filteredCourses.map(course => {
            // Create the same tee data structure for display
            const teeData = []
            const teeColors = ['white', 'yellow', 'black', 'red', 'blue', 'purple', 'green', 'gold', 'white alternative', 'yellow alternative', 'red alternative', 'red 2017', 'red - 2018', 'winter', 'blue 3-11', 'red 3-11']

            for (const teeColor of teeColors) {
              const teeInfo = course.courseRating[teeColor as keyof typeof course.courseRating]
              const slopeInfo = course.slopeRating[teeColor as keyof typeof course.slopeRating]

              // Add male entry if it exists
              if (teeInfo && 'male' in teeInfo && teeInfo.male !== undefined && slopeInfo && 'male' in slopeInfo && slopeInfo.male !== undefined) {
                let malePar = course.par.male
                if (teeColor === 'red' && course.par.malered) malePar = course.par.malered
                if (teeColor === 'blue' && course.par.maleblue) malePar = course.par.maleblue
                if (teeColor === 'yellow' && course.par.maleyellow) malePar = course.par.maleyellow
                if (teeColor === 'white' && course.par.malewhite) malePar = course.par.malewhite
                if (teeColor === 'winter' && course.par.malewinter) malePar = course.par.malewinter
          if (teeColor === 'red alternative' && course.par.maleredalternative) malePar = course.par.maleredalternative
          if (teeColor === 'white alternative' && course.par.malewhitealternative) malePar = course.par.malewhitealternative
          if (teeColor === 'purple' && course.par.malepurple) malePar = course.par.malepurple

                teeData.push({
                  teeColor,
                  gender: 'male',
                  rating: (teeInfo as any).male,
                  slope: (slopeInfo as any).male,
                  length: course.length[teeColor as keyof typeof course.length],
                  par: malePar
                })
              }

              // Add female entry if it exists
              if (teeInfo && 'female' in teeInfo && teeInfo.female !== undefined && slopeInfo && 'female' in slopeInfo && slopeInfo.female !== undefined) {
                let femalePar = course.par.female
                if (teeColor === 'yellow' && course.par.femaleyellow) femalePar = course.par.femaleyellow
                if (teeColor === 'blue' && course.par.femaleblue) femalePar = course.par.femaleblue
                if (teeColor === 'red' && course.par.femalered) femalePar = course.par.femalered
                if (teeColor === 'white' && course.par.femalewhite) femalePar = course.par.femalewhite
                if (teeColor === 'winter' && course.par.femalewinter) femalePar = course.par.femalewinter
          if (teeColor === 'red 2017' && course.par.femalered2017) femalePar = course.par.femalered2017

                teeData.push({
                  teeColor,
                  gender: 'female',
                  rating: (teeInfo as any).female,
                  slope: (slopeInfo as any).female,
                  length: course.length[teeColor as keyof typeof course.length],
                  par: femalePar
                })
              }
            }

            return teeData.filter(data => {
              // Apply the same filtering logic
              const matchesTee = selectedTees.length === 0 || selectedTees.includes(data.teeColor)
              const matchesGender = data.gender === selectedGender
              const matchesPar = selectedPars.length === 0 || selectedPars.includes(data.par.toString())
              const matchesLength = selectedLengths.length === 0 || (data.length !== null && selectedLengths.some(lengthRange => {
                return (lengthRange === 'under-5000' && data.length < 5000) ||
                       (lengthRange === '5000-5500' && data.length >= 5000 && data.length <= 5500) ||
                       (lengthRange === '5500-6000' && data.length >= 5500 && data.length <= 6000) ||
                       (lengthRange === 'over-6000' && data.length > 6000)
              }))
              const matchesCourseRating = selectedCourseRatings.length === 0 || selectedCourseRatings.some(ratingRange => {
                return (ratingRange === 'under-65' && data.rating < 65) ||
                       (ratingRange === '65-70' && data.rating >= 65 && data.rating <= 70) ||
                       (ratingRange === '70-75' && data.rating >= 70 && data.rating <= 75) ||
                       (ratingRange === 'over-75' && data.rating > 75)
              })
              const matchesSlopeRating = selectedSlopeRatings.length === 0 || selectedSlopeRatings.some(slopeRange => {
                return (slopeRange === 'under-120' && data.slope < 120) ||
                       (slopeRange === '120-130' && data.slope >= 120 && data.slope <= 130) ||
                       (slopeRange === '130-140' && data.slope >= 130 && data.slope <= 140) ||
                       (slopeRange === 'over-140' && data.slope > 140)
              })

              return matchesTee && matchesGender && matchesPar && matchesLength && matchesCourseRating && matchesSlopeRating
            }).map((data) => (
              <div key={`${course.id}-${data.teeColor}-${data.gender}`} className="grid grid-cols-10 gap-3 px-4 py-2 border-b hover:bg-gray-50 transition-colors text-xs md:text-sm">
                {/* Golf Club - Show on all rows */}
                <div className="col-span-2 flex items-center">
                  <div className="font-semibold" style={{ color: '#183a37' }}>
                    {course.name}
                  </div>
                </div>

                {/* Course Name */}
                <div className="col-span-1 flex items-center">
                  <div className="text-slate-700">
                    {course.courseName}
                  </div>
                </div>

                {/* County */}
                <div className="col-span-1 flex items-center">
                  <div className="text-slate-700">
                    {course.county}
                  </div>
                </div>

                {/* Tee */}
                <div className="col-span-1 flex items-center">
                  <div className="text-slate-700 capitalize">
                    {data.teeColor} ({data.gender.charAt(0).toUpperCase()})
                  </div>
                </div>

                {/* Par */}
                <div className="col-span-1 flex items-center justify-center">
                  <div className="text-center">
                    {data.par}
                  </div>
                </div>

                {/* Length */}
                <div className="col-span-1 flex items-center justify-center">
                  <div className="text-center">
                    {data.length || '-'}
                  </div>
                </div>

                {/* Course Rating */}
                <div className="col-span-1 flex items-center justify-center">
                  <div className="text-center">
                    {data.rating}
                  </div>
                </div>

                {/* Slope Rating */}
                <div className="col-span-1 flex items-center justify-center">
                  <div className="text-center">
                    {data.slope}
                  </div>
                </div>

                {/* Type - Show on all rows */}
                <div className="col-span-1 flex items-center">
                  <div className="font-medium" style={{ color: '#183a37' }}>
                    {course.type}
                  </div>
                </div>
              </div>
            ))
          })}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              No courses found matching your criteria
            </p>
            <p className="text-slate-500 dark:text-slate-500">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}