import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Calendar, Phone, Globe, Car, Utensils, Bed, Trophy } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Golf Breaks in the UK 2024: Ultimate Guide to British Golf Holidays | Welton Golf',
  description: 'Discover the 15 best golf breaks in the UK for 2024. From Scotland\'s championship links to England\'s hidden gems. Complete guide with costs, courses, and booking tips.',
  keywords: 'golf breaks UK, best golf holidays Britain, UK golf packages, Scotland golf breaks, England golf trips, Wales golf holidays, golf weekends UK, British golf resorts',
  openGraph: {
    title: 'Best Golf Breaks in the UK 2024: Ultimate Guide to British Golf Holidays',
    description: 'Discover the 15 best golf breaks in the UK for 2024. Championship courses, luxury resorts, and hidden gems across Scotland, England, and Wales.',
    type: 'article',
    publishedTime: '2024-10-29T00:00:00.000Z',
    authors: ['Welton Golf'],
  },
  alternates: {
    canonical: 'https://weltongolf.com/blog/best-golf-breaks-uk'
  }
}

const golfBreaks = [
  {
    id: 1,
    name: "St Andrews Golf Break",
    region: "Scotland",
    location: "St Andrews, Fife",
    priceRange: "£800-1500",
    duration: "3-4 days",
    courses: ["Old Course", "New Course", "Jubilee Course", "Castle Course"],
    accommodation: "Old Course Hotel, Rusacks Hotel, Fairmont St Andrews",
    highlights: ["Home of Golf", "World's oldest golf course", "Championship venue"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Book Old Course ballot 2 days in advance. Consider package deals.",
    whyVisit: "Experience golf's most sacred ground where the game began over 600 years ago.",
    coordinates: { lat: 56.3398, lng: -2.7967 }
  },
  {
    id: 2,
    name: "Gleneagles Golf Break",
    region: "Scotland",
    location: "Auchterarder, Perth",
    priceRange: "£1000-2000",
    duration: "3-4 days",
    courses: ["King's Course", "Queen's Course", "PGA Centenary"],
    accommodation: "Gleneagles Hotel",
    highlights: ["Luxury golf resort", "Three championship courses", "2014 Ryder Cup venue"],
    bestMonths: ["May", "June", "July", "August", "September"],
    difficulty: "Resort Championship",
    bookingTips: "Package deals offer best value. Consider midweek rates.",
    whyVisit: "Scotland's premier golf resort combining luxury accommodation with world-class golf.",
    coordinates: { lat: 56.2826, lng: -3.7442 }
  },
  {
    id: 3,
    name: "Turnberry Golf Break",
    region: "Scotland",
    location: "Turnberry, Ayrshire",
    priceRange: "£1200-2500",
    duration: "3-4 days",
    courses: ["Ailsa Course", "King Robert the Bruce"],
    accommodation: "Trump Turnberry Resort",
    highlights: ["Open Championship venue", "Ailsa Craig views", "Luxury resort"],
    bestMonths: ["May", "June", "July", "August", "September"],
    difficulty: "Championship Links",
    bookingTips: "Resort packages include meals. Weather can change quickly.",
    whyVisit: "Dramatic clifftop links golf with luxury accommodation and stunning coastal views.",
    coordinates: { lat: 55.3108, lng: -4.8467 }
  },
  {
    id: 4,
    name: "Royal Troon Golf Break",
    region: "Scotland",
    location: "Troon, Ayrshire",
    priceRange: "£600-1200",
    duration: "2-3 days",
    courses: ["Old Course", "Portland Course"],
    accommodation: "Marine Hotel, Piersland House",
    highlights: ["Open Championship venue", "Postage Stamp hole", "Historic links"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Championship Links",
    bookingTips: "Book well in advance. Combine with other Ayrshire courses.",
    whyVisit: "Experience the famous Postage Stamp and one of Scotland's great championship links.",
    coordinates: { lat: 55.5508, lng: -4.6508 }
  },
  {
    id: 5,
    name: "Royal Birkdale Golf Break",
    region: "England",
    location: "Southport, Merseyside",
    priceRange: "£600-1200",
    duration: "2-3 days",
    courses: ["Royal Birkdale", "Royal Liverpool", "Formby Golf Club"],
    accommodation: "The Vincent Hotel, Bold Hotel, Prince of Wales Hotel",
    highlights: ["Open Championship venue", "Classic links golf", "Superb conditioning"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Member introduction required. Book well in advance for weekends.",
    whyVisit: "Play one of England's finest links courses with impeccable conditions year-round.",
    coordinates: { lat: 53.6308, lng: -3.0567 }
  },
  {
    id: 6,
    name: "Wentworth Golf Break",
    region: "England",
    location: "Virginia Water, Surrey",
    priceRange: "£800-1500",
    duration: "2-3 days",
    courses: ["West Course", "East Course", "Edinburgh Course"],
    accommodation: "Pennyhill Park Hotel, Macdonald Berystede",
    highlights: ["BMW PGA Championship venue", "Prestigious members club", "Three quality courses"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship Parkland",
    bookingTips: "Member introduction required. Consider corporate packages.",
    whyVisit: "Play the home of European Tour golf on one of England's most prestigious courses.",
    coordinates: { lat: 51.4008, lng: -0.6167 }
  },
  {
    id: 7,
    name: "The Belfry Golf Break",
    region: "England",
    location: "Sutton Coldfield, Warwickshire",
    priceRange: "£400-800",
    duration: "2-3 days",
    courses: ["Brabazon Course", "PGA National", "Derby Course"],
    accommodation: "The Belfry Hotel & Resort",
    highlights: ["Four-time Ryder Cup venue", "Resort convenience", "Historic golf"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Resort Championship",
    bookingTips: "Golf packages include accommodation. Book early for major events.",
    whyVisit: "Relive Ryder Cup history on the course that hosted four dramatic competitions.",
    coordinates: { lat: 52.5808, lng: -1.7308 }
  },
  {
    id: 8,
    name: "Sunningdale Golf Break",
    region: "England",
    location: "Sunningdale, Berkshire",
    priceRange: "£600-1200",
    duration: "2-3 days",
    courses: ["Old Course", "New Course"],
    accommodation: "Pennyhill Park, Macdonald Berystede",
    highlights: ["Heathland masterpiece", "Both courses superb", "Historic club"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship Heathland",
    bookingTips: "Member introduction required. Both courses essential.",
    whyVisit: "Experience England's finest heathland golf on two championship courses.",
    coordinates: { lat: 51.3908, lng: -0.6408 }
  },
  {
    id: 9,
    name: "Saunton Sands Golf Break",
    region: "England",
    location: "Braunton, Devon",
    priceRange: "£300-600",
    duration: "2-3 days",
    courses: ["East Course", "West Course"],
    accommodation: "Saunton Sands Hotel, Watersmeet Hotel",
    highlights: ["Championship links", "Two superb courses", "Excellent value"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship Links",
    bookingTips: "Both courses excellent. Stay on-site for convenience.",
    whyVisit: "England's hidden gem offering two championship links courses at exceptional value.",
    coordinates: { lat: 51.1308, lng: -4.2108 }
  },
  {
    id: 10,
    name: "Celtic Manor Golf Break",
    region: "Wales",
    location: "Newport, Wales",
    priceRange: "£400-800",
    duration: "2-3 days",
    courses: ["Twenty Ten Course", "Roman Road", "Montgomerie Course"],
    accommodation: "Celtic Manor Resort",
    highlights: ["Ryder Cup 2010 venue", "Three championship courses", "Luxury spa resort"],
    bestMonths: ["March", "April", "May", "September", "October"],
    difficulty: "Resort Championship",
    bookingTips: "Golf packages include accommodation. Book spa treatments early.",
    whyVisit: "Experience the only resort to host the Ryder Cup with world-class facilities.",
    coordinates: { lat: 51.6108, lng: -2.8767 }
  },
  {
    id: 11,
    name: "Royal County Down Golf Break",
    region: "Northern Ireland",
    location: "Newcastle, County Down",
    priceRange: "£500-900",
    duration: "2-3 days",
    courses: ["Royal County Down Championship", "Royal County Down Annesley"],
    accommodation: "Slieve Donard Resort, Burrendale Hotel",
    highlights: ["World's most beautiful golf course", "Links masterpiece", "Mourne Mountains backdrop"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Championship Links",
    bookingTips: "Handicap certificate required. Book 6 months ahead for peak season.",
    whyVisit: "Consistently ranked the world's greatest golf course with breathtaking mountain views.",
    coordinates: { lat: 54.2367, lng: -5.8833 }
  },
  {
    id: 12,
    name: "Carnoustie Golf Break",
    region: "Scotland",
    location: "Carnoustie, Angus",
    priceRange: "£400-800",
    duration: "2-3 days",
    courses: ["Championship Course", "Burnside Course", "Buddon Links"],
    accommodation: "Carnoustie Golf Hotel, Station Hotel",
    highlights: ["Golf's greatest test", "Open Championship venue", "Three quality courses"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Book Championship Course early. Consider staying on-site.",
    whyVisit: "Test your skills on one of golf's toughest Open Championship venues.",
    coordinates: { lat: 56.5008, lng: -2.7108 }
  },
  {
    id: 13,
    name: "Forest of Arden Golf Break",
    region: "England",
    location: "Birmingham, Warwickshire",
    priceRange: "£350-700",
    duration: "2-3 days",
    courses: ["Arden Course", "Aylesford Course"],
    accommodation: "Doubletree by Hilton Forest of Arden",
    highlights: ["Resort convenience", "Two championship courses", "Spa facilities"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Resort Championship",
    bookingTips: "Golf packages available. Good for corporate groups.",
    whyVisit: "Convenient Midlands location with excellent golf and resort facilities.",
    coordinates: { lat: 52.3408, lng: -1.7108 }
  },
  {
    id: 14,
    name: "Marriott Worsley Park Golf Break",
    region: "England",
    location: "Manchester, Greater Manchester",
    priceRange: "£300-650",
    duration: "2-3 days",
    courses: ["Championship Course"],
    accommodation: "Marriott Worsley Park Hotel",
    highlights: ["Parkland championship course", "Historic Georgian mansion", "Spa facilities"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship Parkland",
    bookingTips: "Resort packages include accommodation. Good for groups.",
    whyVisit: "Luxury hotel setting with challenging parkland golf in the North West.",
    coordinates: { lat: 53.5108, lng: -2.3767 }
  },
  {
    id: 15,
    name: "MacDonald Hill Valley Golf Break",
    region: "Wales",
    location: "Whitchurch, Shropshire",
    priceRange: "£250-550",
    duration: "2-3 days",
    courses: ["Emerald Course", "Sapphire Course"],
    accommodation: "MacDonald Hill Valley Hotel",
    highlights: ["Two championship courses", "Excellent value", "Beautiful Welsh borders"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Resort Championship",
    bookingTips: "Great value packages. Popular for society groups.",
    whyVisit: "Outstanding value golf break with two quality courses in stunning countryside.",
    coordinates: { lat: 52.9708, lng: -2.9108 }
  }
]

const priceRanges = [
  { range: "£250-600", description: "Excellent value golf breaks", count: 5 },
  { range: "£600-1200", description: "Premium golf experiences", count: 8 },
  { range: "£1200+", description: "Luxury golf resorts", count: 2 }
]

export default function BestGolfBreaksUK() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best Golf Breaks in the UK 2024: Ultimate Guide to British Golf Holidays",
            "description": "Discover the 15 best golf breaks in the UK for 2024. From Scotland's championship links to England's hidden gems. Complete guide with costs, courses, and booking tips.",
            "author": {
              "@type": "Organization",
              "name": "Welton Golf",
              "url": "https://weltongolf.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Welton Golf",
              "logo": {
                "@type": "ImageObject",
                "url": "https://weltongolf.com/welton-golf-logo.png"
              }
            },
            "datePublished": "2024-10-29T00:00:00.000Z",
            "dateModified": "2024-10-29T00:00:00.000Z",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://weltongolf.com/blog/best-golf-breaks-uk"
            },
            "about": [
              {
                "@type": "Thing",
                "name": "Golf Breaks UK",
                "description": "Golf holidays and breaks in the United Kingdom"
              },
              {
                "@type": "Thing",
                "name": "British Golf Courses",
                "description": "Championship golf courses across Britain"
              }
            ],
            "mentions": golfBreaks.map(golfBreak => ({
              "@type": "TouristDestination",
              "name": golfBreak.name,
              "description": golfBreak.whyVisit,
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": golfBreak.coordinates.lat,
                "longitude": golfBreak.coordinates.lng
              },
              "touristType": "Golf Tourism"
            })),
            "articleSection": "Golf Travel",
            "wordCount": 3500,
            "inLanguage": "en-GB",
            "keywords": "golf breaks UK, best golf holidays Britain, UK golf packages, Scotland golf breaks, England golf trips, Wales golf holidays"
          })
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">

          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 font-cooper">
              Best Golf Breaks in the UK 2024
            </h1>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto mb-8">
              Discover the ultimate guide to Britain's finest golf holidays. From Scotland's legendary links
              to England's championship courses, Wales' spectacular coastal golf, and Northern Ireland's dramatic
              mountain-backed courses, we've curated the 15 best golf breaks in the UK for 2024.
            </p>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {priceRanges.map((range, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4 shadow-lg">
                  <div className="text-2xl font-bold" style={{color: '#183a37'}}>{range.count}</div>
                  <div className="font-semibold text-slate-900">{range.range}</div>
                  <div className="text-sm text-slate-600">{range.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Table of Contents */}
          <Card className="p-6 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Table of Contents</h2>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <Link href="#uk-golf-breaks" className="text-blue-600 hover:underline">1. Top 15 UK Golf Breaks</Link>
              <Link href="#price-guide" className="text-blue-600 hover:underline">2. Price Guide & Budget Tips</Link>
              <Link href="#booking-tips" className="text-blue-600 hover:underline">3. Booking Tips & Best Times</Link>
              <Link href="#planning-tools" className="text-blue-600 hover:underline">4. Golf Trip Planning Tools</Link>
              <Link href="#faqs" className="text-blue-600 hover:underline">5. Frequently Asked Questions</Link>
            </div>
          </Card>

          {/* Introduction */}
          <Card className="p-8 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Why Choose the UK for Your Golf Break?
            </h2>
            <div className="text-slate-700">
              <p className="mb-4">
                The United Kingdom is the <strong>birthplace of golf</strong>, offering unparalleled variety and
                quality for golf enthusiasts worldwide. From the windswept links of Scotland where golf began
                over 600 years ago, to England's prestigious parkland courses and Wales' spectacular coastal
                layouts, a UK golf break provides experiences you simply cannot find anywhere else.
              </p>
              <p className="mb-4">
                What makes UK golf breaks special? <strong>Accessibility, heritage, and diversity.</strong> You can
                play championship courses that have hosted The Open Championship, experience golf's most historic
                venues, and enjoy world-class hospitality all within a relatively compact area. Whether you're
                seeking the ultimate links challenge or a luxury resort experience, the UK delivers.
              </p>
              <p>
                Our comprehensive guide covers <strong>15 carefully selected golf breaks</strong> representing the
                best value, most memorable experiences, and highest quality golf across England, Scotland, Wales, and Northern Ireland.
                Each destination has been chosen for its combination of outstanding golf,
                excellent accommodation, and overall experience quality.
              </p>
            </div>
          </Card>

          {/* UK Golf Breaks */}
          <section id="uk-golf-breaks" className="mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 font-cooper">
              Top 15 UK Golf Breaks for 2024
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              From Scotland's legendary links courses to England's championship parkland venues, Wales' dramatic
              coastal golf, and Northern Ireland's mountain-backed masterpieces, discover the UK's finest golf
              break destinations that combine world-class golf with exceptional accommodation and unforgettable experiences.
            </p>

            <div className="grid gap-8">
              {golfBreaks.map((golfBreak) => (
                <Card key={golfBreak.id} className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">
                            {golfBreak.name}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-600 mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>{golfBreak.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold" style={{color: '#183a37'}}>
                            {golfBreak.priceRange}
                          </div>
                          <div className="text-sm text-slate-600">
                            {golfBreak.duration}
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-700 mb-4">
                        {golfBreak.whyVisit}
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Golf Courses</h4>
                          <ul className="text-sm text-slate-700 space-y-1">
                            {golfBreak.courses.map((course, index) => (
                              <li key={index}>• {course}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Key Highlights</h4>
                          <ul className="text-sm text-slate-700 space-y-1">
                            {golfBreak.highlights.map((highlight, index) => (
                              <li key={index}>• {highlight}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {golfBreak.difficulty}
                        </span>
                        {golfBreak.bestMonths.map((month) => (
                          <span key={month} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {month}
                          </span>
                        ))}
                      </div>

                      <div className="bg-slate-100 p-3 rounded-lg">
                        <h5 className="font-semibold text-slate-900 mb-1">Booking Tips</h5>
                        <p className="text-sm text-slate-700">{golfBreak.bookingTips}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Accommodation</h4>
                        <p className="text-sm text-slate-700">{golfBreak.accommodation}</p>
                      </div>

                      <div className="space-y-2">
                        <Button
                          className="w-full text-white"
                          style={{backgroundColor: '#183a37'}}
                          asChild
                        >
                          <Link href="/golf-trip-planner">Plan This Trip</Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/course-directory">Find Courses</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>


          {/* Price Guide */}
          <section id="price-guide" className="mb-16">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                UK Golf Break Price Guide 2024
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {priceRanges.map((range, index) => (
                  <div key={index} className="bg-slate-100 p-6 rounded-lg">
                    <div className="text-2xl font-bold mb-2" style={{color: '#183a37'}}>
                      {range.range}
                    </div>
                    <div className="font-semibold text-slate-900 mb-2">
                      {range.description}
                    </div>
                    <div className="text-sm text-slate-600">
                      {range.count} destinations
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-slate-700">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  What's Included in Golf Break Prices?
                </h3>
                <ul className="space-y-2 mb-6">
                  <li><strong>Accommodation:</strong> 2-4 nights hotel or resort stay</li>
                  <li><strong>Greens Fees:</strong> 2-4 rounds of golf at featured courses</li>
                  <li><strong>Breakfast:</strong> Daily breakfast at most destinations</li>
                  <li><strong>Resort Facilities:</strong> Access to clubhouse, practice facilities</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Additional Costs to Consider
                </h3>
                <ul className="space-y-2 mb-6">
                  <li><strong>Transport:</strong> £50-200 depending on location and method</li>
                  <li><strong>Meals:</strong> £30-60 per day for lunch and dinner</li>
                  <li><strong>Equipment Hire:</strong> £25-40 per day for club rental</li>
                  <li><strong>Caddies:</strong> £40-80 per round at premium courses</li>
                  <li><strong>Golf Lessons:</strong> £50-150 per session with professionals</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Money-Saving Tips for UK Golf Breaks
                </h3>
                <ul className="space-y-2">
                  <li>Book midweek breaks for 20-40% savings</li>
                  <li>Travel during shoulder seasons (April-May, September-October)</li>
                  <li>Consider group bookings for discounts</li>
                  <li>Look for package deals including accommodation and multiple rounds</li>
                  <li>Book well in advance for premium courses and peak times</li>
                  <li>Use our <Link href="/golf-trip-planner" className="text-blue-600 hover:underline">Golf Trip Planner</Link> to compare costs</li>
                </ul>
              </div>
            </Card>
          </section>

          {/* Booking Tips */}
          <section id="booking-tips" className="mb-16">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Expert Booking Tips & Best Times to Visit
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    When to Book Your Golf Break
                  </h3>
                  <div className="space-y-4 text-slate-700">
                    <div>
                      <h4 className="font-semibold text-slate-900">Premium Courses (6+ months ahead)</h4>
                      <p className="text-sm">St Andrews, Royal Birkdale, Gleneagles - these require advance planning</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Resort Courses (3-4 months ahead)</h4>
                      <p className="text-sm">Celtic Manor, The Belfry - package deals often available</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Hidden Gems (1-2 months ahead)</h4>
                      <p className="text-sm">Saunton Sands, Royal Dornoch - excellent value with shorter lead times</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Best Months for UK Golf
                  </h3>
                  <div className="space-y-4 text-slate-700">
                    <div>
                      <h4 className="font-semibold text-slate-900">Peak Season: May-September</h4>
                      <p className="text-sm">Best weather, longest days, highest prices. Book early.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Shoulder Season: April, October</h4>
                      <p className="text-sm">Great value, good weather, fewer crowds. Ideal for golf breaks.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Winter Golf: November-March</h4>
                      <p className="text-sm">Lowest prices, winter rates, challenging conditions. Indoor alternatives recommended.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-lg" style={{backgroundColor: '#9CC69B'}}>
                <h3 className="text-xl font-bold mb-4" style={{color: '#183a37'}}>
                  Essential Booking Checklist
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm" style={{color: '#183a37'}}>
                  <ul className="space-y-2">
                    <li>✓ Check handicap certificate requirements</li>
                    <li>✓ Confirm tee time availability</li>
                    <li>✓ Book accommodation and golf together for savings</li>
                    <li>✓ Arrange travel insurance</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>✓ Check weather forecasts and pack accordingly</li>
                    <li>✓ Confirm equipment hire if needed</li>
                    <li>✓ Research dress codes for clubs</li>
                    <li>✓ Plan backup indoor activities</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* Planning Tools */}
          <section id="planning-tools" className="mb-16">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Free Golf Trip Planning Tools
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                Use our professional golf calculators and planners to optimize your UK golf break experience.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-100 p-6 rounded-lg">
                  <MapPin className="h-8 w-8 mb-4" style={{color: '#9CC69B'}} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Golf Trip Planner
                  </h3>
                  <p className="text-sm text-slate-700 mb-4">
                    Plan your entire UK golf break with detailed costs, itineraries, and recommendations.
                  </p>
                  <Button className="w-full text-white" style={{backgroundColor: '#183a37'}} asChild>
                    <Link href="/golf-trip-planner">Plan Your Trip</Link>
                  </Button>
                </div>

                <div className="bg-slate-100 p-6 rounded-lg">
                  <Trophy className="h-8 w-8 mb-4" style={{color: '#9CC69B'}} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Handicap Calculator
                  </h3>
                  <p className="text-sm text-slate-700 mb-4">
                    Calculate your WHS handicap index for course bookings and competitions.
                  </p>
                  <Button className="w-full text-white" style={{backgroundColor: '#183a37'}} asChild>
                    <Link href="/handicap-calculator">Calculate Handicap</Link>
                  </Button>
                </div>

                <div className="bg-slate-100 p-6 rounded-lg">
                  <Calendar className="h-8 w-8 mb-4" style={{color: '#9CC69B'}} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Course Directory
                  </h3>
                  <p className="text-sm text-slate-700 mb-4">
                    Discover additional courses near your chosen golf break destinations.
                  </p>
                  <Button className="w-full text-white" style={{backgroundColor: '#183a37'}} asChild>
                    <Link href="/course-directory">Browse Courses</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          {/* FAQs */}
          <section id="faqs" className="mb-16">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    What's the best time of year for a UK golf break?
                  </h3>
                  <p className="text-slate-700">
                    The best months are May, June, September, and October. These offer the ideal combination
                    of good weather, reasonable prices, and course availability. July and August are peak
                    season with highest prices but longest days.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Do I need a handicap certificate for UK golf courses?
                  </h3>
                  <p className="text-slate-700">
                    Most championship and private courses require a valid handicap certificate. Maximum
                    handicaps are typically 28 for men and 36 for women. Resort and municipal courses
                    are usually more flexible.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    How far in advance should I book a golf break?
                  </h3>
                  <p className="text-slate-700">
                    For premium courses like St Andrews or Royal Birkdale, book 6+ months ahead. Resort
                    courses can be booked 3-4 months in advance, while lesser-known gems may only need
                    1-2 months lead time.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    What should I budget for a UK golf break?
                  </h3>
                  <p className="text-slate-700">
                    Budget £300-600 for excellent value breaks, £600-1200 for premium experiences, and
                    £1200+ for luxury golf resorts. This includes accommodation, golf, breakfast, and
                    resort facilities. Add transport, meals, and equipment hire separately.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Can I hire golf equipment at UK courses?
                  </h3>
                  <p className="text-slate-700">
                    Yes, most courses offer club hire at £25-40 per day. Premium venues have high-quality
                    sets from major brands. Book equipment hire when making tee time reservations to
                    ensure availability.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    What's included in a typical golf break package?
                  </h3>
                  <p className="text-slate-700">
                    Standard packages include accommodation, breakfast, and greens fees for featured courses.
                    Premium packages may add meals, spa access, equipment hire, and transfers. Always check
                    what's included before booking.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Conclusion CTA */}
          <div className="text-center rounded-lg p-12 text-white" style={{background: `linear-gradient(135deg, #183a37 0%, #9CC69B 100%)`}}>
            <h2 className="text-3xl font-bold mb-4 font-cooper">
              Start Planning Your Perfect UK Golf Break
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Use our free golf trip planner to create detailed itineraries, compare costs, and book
              your ideal UK golf break. From St Andrews to Royal County Down, your perfect golf
              holiday awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
                <Link href="/golf-trip-planner">Plan My Golf Break</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-black hover:bg-white hover:text-black" asChild>
                <Link href="/course-directory">Browse Golf Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}