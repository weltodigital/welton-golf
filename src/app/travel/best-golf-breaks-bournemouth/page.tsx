import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Calendar, Phone, Globe, Car, Utensils, Bed, Trophy } from 'lucide-react'
import bournemouthImages from '@/data/bournemouthImages.json'

export const metadata: Metadata = {
  title: 'Best Golf Breaks Bournemouth 2025: 8 Top Dorset Courses | Welton Golf',
  description: 'Discover 8 best golf breaks in Bournemouth 2025. Ferndown, Broadstone, Barton-on-Sea + 5 more coastal courses. Championship golf, luxury resorts, pricing guide.',
  keywords: 'bournemouth golf breaks 2025, dorset golf holidays, coastal golf breaks UK, ferndown golf club, broadstone golf club, barton on sea golf, bournemouth golf resorts, dorset golf courses, coastal golf breaks england',
  openGraph: {
    title: 'Best Golf Breaks in Bournemouth 2025: 8 Top Dorset Courses & Coastal Golf Holidays',
    description: 'Complete guide to Bournemouth\'s best golf breaks. Ferndown, Broadstone, clifftop courses + luxury resorts. Prices, courses, booking tips included.',
    type: 'article',
    publishedTime: '2025-11-10T00:00:00.000Z',
    modifiedTime: '2025-11-10T00:00:00.000Z',
    authors: ['Welton Golf'],
    url: 'https://weltongolf.com/blog/best-golf-breaks-bournemouth',
    images: [
      {
        url: 'https://weltongolf.com/images/bournemouth-golf-breaks-2025.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Golf Breaks Bournemouth 2025 - Ferndown, Broadstone, Coastal Courses',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Golf Breaks Bournemouth 2025: 8 Top Courses',
    description: 'Complete guide to Bournemouth\'s best golf breaks. Championship heathland courses + coastal views.',
    images: ['https://weltongolf.com/images/bournemouth-golf-breaks-2025.jpg'],
    site: '@WeltonGolf',
  },
  alternates: {
    canonical: 'https://weltongolf.com/blog/best-golf-breaks-bournemouth',
    languages: {
      'en-GB': 'https://weltongolf.com/blog/best-golf-breaks-bournemouth',
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Golf Travel',
}

const golfBreaks = [
  {
    id: 1,
    name: "Ferndown Golf Club",
    region: "Dorset",
    location: "Ferndown, Dorset",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Championship Course"],
    accommodation: "Nearby hotels in Ferndown and Bournemouth",
    highlights: ["Championship heathland course", "Tournament venue", "Professional events", "James Braid design", "Heather and gorse", "Strategic bunkering"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Book well in advance for weekends. Championship course demands accuracy. Practice facilities available. Consider staying in nearby Bournemouth for evening entertainment.",
    whyVisit: "Experience championship heathland golf at one of Dorset's premier venues with professional tournament pedigree. Ferndown Golf Club, established in 1913, is a James Braid design that epitomizes classic English heathland golf. The course features pine-lined fairways, strategic heather and gorse, and challenging elevated greens that demand precision rather than power. Having hosted professional tournaments including the PGA Cup and various European Challenge Tour events, the course maintains championship standards year-round. The strategic design rewards accurate driving and thoughtful course management, with natural hazards and mature trees creating a stern but fair test. The clubhouse provides excellent facilities and the pro shop offers equipment and lessons. Located in the heart of the Dorset heathland, the course offers a traditional golf experience in beautiful surroundings just minutes from Bournemouth's beaches and nightlife.",
    coordinates: { lat: 50.7908, lng: -1.9108 }
  },
  {
    id: 2,
    name: "Broadstone Golf Club",
    region: "Dorset",
    location: "Broadstone, Poole",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Championship Course"],
    accommodation: "Hotels in Poole and Bournemouth",
    highlights: ["Historic 1898 course", "Spectacular views", "Heathland layout", "Traditional clubhouse", "Poole Harbour views", "Championship venue"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Historic course with character. Spectacular views over Poole Harbour. Traditional golf experience. Book accommodation in Poole for harbor access and restaurants.",
    whyVisit: "Play one of Dorset's most historic and scenic golf courses with spectacular harbor views and traditional atmosphere. Founded in 1898, Broadstone Golf Club sits on magnificent heathland overlooking Poole Harbour, offering breathtaking panoramic views across the water to Brownsea Island and beyond. The course features classic heathland characteristics with rolling fairways through heather and gorse, strategically placed bunkers, and elevated greens that showcase the natural beauty of the Dorset coastline. The historic clubhouse, steeped in over a century of golf tradition, provides elegant dining with terrace views across the harbor. The course design emphasizes strategic play over length, rewarding accuracy and local knowledge. Located between Poole and Bournemouth, golfers enjoy easy access to harbor activities, beaches, and the charming town of Poole with its historic quay, excellent restaurants, and boutique shopping. The combination of championship golf and stunning coastal scenery makes this a quintessential English golf experience.",
    coordinates: { lat: 50.7408, lng: -1.9708 }
  },
  {
    id: 3,
    name: "Barton-on-Sea Golf Club",
    region: "Hampshire",
    location: "New Milton, Hampshire",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Needles Course", "Coastguard Course", "Clinic Course"],
    accommodation: "Nearby New Milton and Bournemouth hotels",
    highlights: ["Clifftop location", "Isle of Wight views", "27 holes of golf", "Coastal breezes", "Spectacular scenery", "Links-style golf"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Championship Links",
    bookingTips: "Three 9-hole courses offer variety. Clifftop location means wind is a factor. Spectacular coastal views. Book early for summer months and favorable weather.",
    whyVisit: "Experience dramatic clifftop golf with stunning views over the Solent and Isle of Wight on three distinct courses. Barton-on-Sea Golf Club occupies a spectacular clifftop location with panoramic sea views, offering 27 holes of challenging golf across three 9-hole courses that can be combined for different 18-hole experiences. The Needles Course offers the most dramatic coastal holes with views of the famous Needles rocks, while the Coastguard Course features challenging cliff-edge holes that demand precision in coastal winds. The Clinic Course provides a more sheltered inland experience while maintaining sea views from elevated positions. The natural links-style terrain features undulating fairways, natural hazards, and fast-running conditions that create an authentic seaside golf experience. The clubhouse restaurant offers panoramic views perfect for post-round dining while watching ships navigate the busy Solent. Located on Hampshire's coast near the New Forest, the area provides excellent walking, historic attractions, and easy access to both Bournemouth and the Southampton area.",
    coordinates: { lat: 50.7308, lng: -1.6408 }
  },
  {
    id: 4,
    name: "The Dorset Golf & Country Club Resort",
    region: "Dorset",
    location: "Bere Regis, Dorset",
    priceRange: "££££",
    duration: "3-4 days",
    courses: ["Championship Course"],
    accommodation: "The Dorset Golf Resort Hotel",
    highlights: ["Martin Hawtree design", "Luxury resort", "Championship venue", "Water features", "Spa facilities", "Fine dining"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Premier luxury golf resort. Championship course with water hazards. Excellent spa and dining facilities. Book spa treatments in advance. Perfect for special occasions.",
    whyVisit: "Indulge in luxury golf resort experience with championship course and world-class amenities in beautiful Dorset countryside. The Dorset Golf & Country Club Resort represents the pinnacle of English golf resort luxury, featuring a Martin Hawtree-designed championship course that winds through 250 acres of pristine countryside near the historic village of Bere Regis. The course features strategic water hazards on 14 holes, immaculate conditioning, and challenging design that has hosted European Challenge Tour events. The layout demands accuracy and course management while rewarding strategic thinking with spectacular scenery. The luxury resort offers elegant accommodation, award-winning spa facilities with comprehensive treatment menus, and fine dining restaurants showcasing local Dorset produce. Additional amenities include extensive practice facilities, professional instruction, and beautifully landscaped grounds perfect for relaxation. Located in Thomas Hardy country, guests can explore historic Dorset villages, ancient castles, and the stunning Jurassic Coast. The resort provides the complete luxury golf experience combining championship golf with resort amenities and countryside tranquility.",
    coordinates: { lat: 50.7608, lng: -2.1908 }
  },
  {
    id: 5,
    name: "Remedy Oak Golf Club",
    region: "Hampshire",
    location: "Woodlands, Southampton",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Championship Course"],
    accommodation: "Southampton area hotels",
    highlights: ["Modern championship design", "Woodland setting", "Water features", "All-weather golf", "Modern facilities", "Professional tournaments"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Modern championship course with excellent drainage. Beautiful woodland setting with challenging water features. Good for corporate events. Stay in Southampton for city amenities.",
    whyVisit: "Play modern championship golf through ancient woodland with strategic water features and year-round playability. Remedy Oak Golf Club represents contemporary golf course design at its finest, carved through 150 acres of ancient woodland between Southampton and Bournemouth. The course features dramatic elevation changes, multiple water hazards, and strategic bunkering that create a challenging yet fair test for golfers of all abilities. The modern design incorporates natural woodland, streams, and wetlands while providing excellent drainage for year-round play. The course has hosted professional tournaments and maintains tour-standard conditioning throughout the seasons. The contemporary clubhouse offers panoramic views, excellent dining facilities, and comprehensive pro shop services. Practice facilities include a driving range, short game area, and putting green. The location provides easy access to Southampton's cultural attractions, excellent shopping, and the New Forest National Park for outdoor activities. The combination of championship golf and modern amenities makes this ideal for golf breaks and corporate events.",
    coordinates: { lat: 50.9208, lng: -1.5408 }
  },
  {
    id: 6,
    name: "Parkstone Golf Club",
    region: "Dorset",
    location: "Parkstone, Poole",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Championship Course"],
    accommodation: "Poole and Bournemouth hotels",
    highlights: ["Links-style course", "Poole Harbour proximity", "Traditional design", "Seaside golf", "Natural hazards", "Historic club"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship Links",
    bookingTips: "Traditional links-style course near Poole Harbour. Natural hazards and sea breezes add challenge. Historic club atmosphere. Combine with Poole's harbor attractions.",
    whyVisit: "Experience traditional links-style golf near Poole Harbour with natural hazards and authentic seaside atmosphere. Parkstone Golf Club offers a genuine links experience just minutes from Poole's bustling harbor, featuring natural sandy terrain, gorse-lined fairways, and challenging coastal winds. The course emphasizes strategic play with natural hazards including burns, pot bunkers, and undulating terrain that rewards creativity and shot-making skills. The traditional design maintains the character of seaside golf with small, fast greens and firm fairways that play differently in various wind conditions. The clubhouse provides comfortable facilities with views toward Poole Harbour and serves traditional British fare. Located in the heart of Poole, golfers can explore the historic quay, take boat trips to Brownsea Island, enjoy excellent seafood restaurants, and visit the numerous galleries and shops. The nearby beaches of Sandbanks and Bournemouth provide additional recreational opportunities, while the Jurassic Coast offers world-famous fossil hunting and scenic walking.",
    coordinates: { lat: 50.7208, lng: -1.9508 }
  },
  {
    id: 7,
    name: "Isle Of Purbeck Golf Club",
    region: "Dorset",
    location: "Studland, Dorset",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Purbeck Course"],
    accommodation: "Studland Bay area accommodation",
    highlights: ["Clifftop location", "Panoramic sea views", "Unique setting", "Natural terrain", "Coastal wildlife", "Spectacular scenery"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Resort",
    bookingTips: "Spectacular clifftop course with unique setting. Natural terrain and dramatic views. Weather dependent - check conditions. Book accommodation in Studland for beach access.",
    whyVisit: "Play golf on dramatic clifftops with panoramic sea views in one of Dorset's most spectacular natural settings. Isle of Purbeck Golf Club sits on the cliffs above Studland Bay, offering breathtaking views across Poole Bay to Bournemouth and the Isle of Wight. This unique course features holes carved through natural heathland and clifftop terrain, creating a golf experience unlike any other in southern England. The layout takes full advantage of the spectacular coastal location with elevated tees and greens providing constantly changing panoramic views. The natural terrain includes heather, gorse, and ancient earthworks that add character and challenge to each hole. Wildlife is abundant with deer, birds of prey, and marine life visible throughout the round. The course offers a more relaxed golfing experience perfect for enjoying the spectacular scenery. Studland village provides charming accommodation options, while the famous Studland Beach offers pristine sand dunes and clear waters. The nearby Corfe Castle and Swanage Railway provide historic attractions, and the Jurassic Coast offers world-class walking and natural beauty.",
    coordinates: { lat: 50.6508, lng: -1.9608 }
  },
  {
    id: 8,
    name: "Ashley Wood Golf Club",
    region: "Dorset",
    location: "Blandford Forum, Dorset",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Championship Course"],
    accommodation: "Blandford Forum area hotels",
    highlights: ["Championship parkland", "Beautiful countryside", "Water features", "Modern design", "Excellent facilities", "Tournament venue"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Modern championship parkland course. Beautiful Dorset countryside setting. Water hazards feature prominently. Good value championship golf. Stay in historic Blandford Forum.",
    whyVisit: "Enjoy championship parkland golf through beautiful Dorset countryside with strategic water features and modern amenities. Ashley Wood Golf Club offers a contemporary championship experience set in the rolling hills of north Dorset, featuring a challenging layout that incorporates natural streams, lakes, and mature woodland. The course design emphasizes strategic play with water hazards coming into play on multiple holes, demanding accuracy and course management. The parkland setting showcases the natural beauty of rural Dorset with tree-lined fairways, elevated greens, and panoramic countryside views. The modern clubhouse provides excellent facilities including a restaurant with terrace dining overlooking the course. Professional instruction and equipment hire are available, along with comprehensive practice facilities. The historic market town of Blandford Forum offers Georgian architecture, local pubs, and shops, while the surrounding countryside provides excellent walking and cycling opportunities. The location serves as an ideal base for exploring Dorset's attractions including Sherborne Castle, the Cerne Giant, and the picturesque villages of the Blackmore Vale.",
    coordinates: { lat: 50.8608, lng: -2.1708 }
  }
]

const priceRanges = [
  { range: "££", description: "Excellent value golf breaks", count: 3 },
  { range: "£££", description: "Premium golf experiences", count: 4 },
  { range: "££££", description: "Luxury golf resort", count: 1 }
]

export default function BournemouthGolfBreaks() {
  return (
    <>
      {/* Enhanced Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Best Golf Breaks in Bournemouth 2025: 8 Top Dorset Courses & Coastal Golf Holidays",
              "description": "Discover 8 best golf breaks in Bournemouth 2025. Ferndown, Broadstone, Barton-on-Sea + 5 more coastal courses. Championship golf, luxury resorts, pricing guide.",
              "author": {
                "@type": "Organization",
                "name": "Welton Golf",
                "url": "https://weltongolf.com",
                "sameAs": ["https://twitter.com/weltongolf", "https://facebook.com/weltongolf"]
              },
              "publisher": {
                "@type": "Organization",
                "name": "Welton Golf",
                "url": "https://weltongolf.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://weltongolf.com/welton-golf-logo.png",
                  "width": 300,
                  "height": 60
                }
              },
              "datePublished": "2025-11-10T00:00:00.000Z",
              "dateModified": "2025-11-10T00:00:00.000Z",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://weltongolf.com/blog/best-golf-breaks-bournemouth"
              },
              "image": {
                "@type": "ImageObject",
                "url": "https://weltongolf.com/images/bournemouth-golf-breaks-2025.jpg",
                "width": 1200,
                "height": 630,
                "caption": "Best Golf Breaks Bournemouth 2025 - Ferndown, Broadstone, Coastal Courses"
              },
              "about": [
                {
                  "@type": "Place",
                  "name": "Bournemouth",
                  "description": "Premier coastal golf destination in Dorset, England"
                },
                {
                  "@type": "SportsActivityLocation",
                  "name": "Dorset Golf Courses",
                  "description": "Championship and coastal golf courses around Bournemouth"
                }
              ],
              "mentions": golfBreaks.map(golfBreak => ({
                "@type": "Resort",
                "name": golfBreak.name,
                "description": golfBreak.whyVisit.substring(0, 160),
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": golfBreak.location,
                  "addressCountry": "GB"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": golfBreak.coordinates.lat,
                  "longitude": golfBreak.coordinates.lng
                },
                "amenityFeature": golfBreak.highlights.map(highlight => ({
                  "@type": "LocationFeatureSpecification",
                  "name": highlight
                }))
              })),
              "articleSection": "Golf Travel",
              "wordCount": 6000,
              "inLanguage": "en-GB",
              "keywords": "bournemouth golf breaks, dorset golf holidays, coastal golf breaks, championship courses bournemouth",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", ".price-guide"]
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "TravelGuide",
              "name": "Bournemouth Golf Breaks Guide 2025",
              "description": "Complete guide to the best golf breaks and holidays in Bournemouth and Dorset",
              "about": {
                "@type": "Place",
                "name": "Bournemouth",
                "description": "Coastal golf destination in Dorset, England"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Golf Enthusiasts"
              },
              "provider": {
                "@type": "Organization",
                "name": "Welton Golf"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What are the best golf courses in Bournemouth?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The best golf courses include Ferndown Golf Club (championship heathland), Broadstone Golf Club (historic with harbor views), Barton-on-Sea Golf Club (clifftop with sea views), and The Dorset Golf Resort (luxury resort experience)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "When is the best time for golf breaks in Bournemouth?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The best months are April, May, September, and October. These offer mild coastal weather, good course conditions, and reasonable prices. Summer months provide the warmest weather but higher prices."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much do golf breaks in Bournemouth cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Costs range from £300-500 for excellent value breaks (££) to £500-900 for premium experiences (£££) and £900+ for luxury resort stays (££££). Prices include accommodation, golf rounds, and breakfast."
                  }
                }
              ]
            }
          ])
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Breadcrumbs */}
          <nav className="text-sm text-slate-600 mb-4">
            <ol className="flex space-x-2">
              <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
              <li className="before:content-['/'] before:mx-2"><Link href="/blog" className="hover:text-emerald-600">Blog</Link></li>
              <li className="before:content-['/'] before:mx-2 text-slate-900">Best Golf Breaks Bournemouth</li>
            </ol>
          </nav>

          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 font-cooper">
              Best Golf Breaks in Bournemouth 2025
            </h1>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto mb-8">
              Discover Dorset&apos;s premier coastal golf destination where championship heathland courses meet stunning
              clifftop links golf. From historic tournament venues to luxury resort experiences and dramatic seaside
              golf, we&apos;ve curated the top 8 golf breaks around Bournemouth for 2025. Perfect for golf weekends,
              coastal breaks, and championship golf experiences in southern England.
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
              <Link href="#bournemouth-golf-breaks" className="text-blue-600 hover:underline">1. Top Bournemouth Golf Breaks</Link>
              <Link href="#price-guide" className="text-blue-600 hover:underline">2. Price Guide & Budget Tips</Link>
              <Link href="#booking-tips" className="text-blue-600 hover:underline">3. Booking Tips & Best Times</Link>
              <Link href="#planning-tools" className="text-blue-600 hover:underline">4. Golf Trip Planning Tools</Link>
              <Link href="#faqs" className="text-blue-600 hover:underline">5. Frequently Asked Questions</Link>
            </div>
          </Card>

          {/* Featured Snippet Optimized Summary */}
          <Card className="p-8 mb-8 bg-gradient-to-r from-green-50 to-blue-50">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Bournemouth Golf Breaks 2025: Quick Guide
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">🏆 Top Bournemouth Golf Destinations</h3>
                <ol className="text-slate-700 space-y-1">
                  <li><strong>1. Ferndown Golf Club</strong> - Championship heathland course</li>
                  <li><strong>2. Broadstone Golf Club</strong> - Historic 1898 course with harbor views</li>
                  <li><strong>3. Barton-on-Sea</strong> - Dramatic clifftop golf with sea views</li>
                  <li><strong>4. Dorset Golf Resort</strong> - Luxury resort with spa facilities</li>
                  <li><strong>5. Remedy Oak</strong> - Modern championship through woodland</li>
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">💰 Golf Break Pricing 2025</h3>
                <ul className="text-slate-700 space-y-1">
                  <li><strong>££ Value (£150-£250):</strong> 3 destinations</li>
                  <li><strong>£££ Premium (£250-£400):</strong> 4 destinations</li>
                  <li><strong>££££ Luxury (£400+):</strong> 1 destination</li>
                </ul>
                <p className="text-sm text-slate-600 mt-3">
                  *Prices include 2-3 nights accommodation, breakfast, and golf rounds
                </p>
              </div>
            </div>
          </Card>

          {/* Best Time to Visit - Featured Snippet Target */}
          <Card className="p-6 mb-8 border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              When is the best time for Bournemouth golf breaks?
            </h3>
            <div className="text-slate-700">
              <p className="mb-4">
                <strong>The best months for Bournemouth golf breaks are April, May, September, and October.</strong> These months offer:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Mild coastal weather:</strong> Temperatures 15-18°C with sea breezes</li>
                <li><strong>Excellent value:</strong> 25-35% cheaper than peak summer months</li>
                <li><strong>Course availability:</strong> Easier booking at championship venues</li>
                <li><strong>Perfect conditions:</strong> Firm coastal courses and clear views</li>
              </ul>
              <p className="text-sm bg-yellow-50 p-3 rounded">
                💡 <strong>Pro tip:</strong> June-August are peak season (highest prices, busiest courses). November-March offer lowest prices but unpredictable coastal weather.
              </p>
            </div>
          </Card>

          {/* Introduction */}
          <Card className="p-8 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Why Choose Bournemouth for Your Golf Break?
            </h2>
            <div className="text-slate-700">
              <p className="mb-4">
                Bournemouth and the surrounding <strong>Dorset coastline offer England&apos;s finest coastal golf destination</strong>,
                combining championship heathland courses with dramatic clifftop links golf and luxury resort experiences.
                The region features exceptional golf diversity from historic tournament venues to modern championship designs,
                all within easy reach of beautiful beaches, vibrant nightlife, and coastal attractions.
              </p>
              <p className="mb-4">
                What makes Bournemouth golf breaks special? <strong>Variety, accessibility, and coastal beauty.</strong> You can
                play championship heathland courses like Ferndown Golf Club, experience clifftop drama at Barton-on-Sea,
                and enjoy luxury resort amenities at The Dorset Golf Resort. The mild coastal climate ensures excellent
                year-round playing conditions, while Bournemouth&apos;s position provides easy access from London and the Midlands.
              </p>
              <p>
                Our comprehensive guide covers <strong>8 carefully selected golf breaks</strong> representing the best
                championship golf, coastal experiences, and resort amenities around Bournemouth. Each destination has been
                chosen for its combination of outstanding golf, excellent accommodation options, and overall holiday experience.
                From traditional heathland challenges to luxury spa resorts, we&apos;ve included options for every golfer and budget.
              </p>
            </div>
          </Card>

          {/* Bournemouth Golf Breaks */}
          <section id="bournemouth-golf-breaks" className="mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 font-cooper">
              Top Bournemouth Golf Breaks for 2025
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              From championship heathland courses steeped in professional tournament history to dramatic clifftop links with
              panoramic sea views, luxury resort experiences with world-class spa facilities, and traditional coastal golf
              venues, discover Bournemouth and Dorset&apos;s finest golf break destinations. Each break combines exceptional
              championship golf with coastal beauty, luxury accommodation, excellent dining, and unforgettable holiday experiences.
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

                    <div className="md:col-span-1 space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Accommodation</h4>
                        <p className="text-sm text-slate-700">{golfBreak.accommodation}</p>
                      </div>

                      <div className="space-y-2 mb-4">
                        <Button
                          className="w-full text-white"
                          style={{backgroundColor: '#183a37'}}
                          asChild
                        >
                          <Link href="/tools/golf-trip-planner">Plan This Trip</Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/course-directory">Find Courses</Link>
                        </Button>
                      </div>

                      <div>
                        <Image
                          src={bournemouthImages[golfBreak.name as keyof typeof bournemouthImages] || '/images/placeholder-golf-resort.jpg'}
                          alt={`${golfBreak.name} - Golf Course`}
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                          width={400}
                          height={192}
                        />
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
                Bournemouth Golf Break Price Guide 2025
              </h2>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Price Guide Explanation</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2" style={{color: '#183a37'}}>££</div>
                    <div className="font-semibold">£150-£250</div>
                    <div className="text-slate-600">Excellent value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2" style={{color: '#183a37'}}>£££</div>
                    <div className="font-semibold">£250-£400</div>
                    <div className="text-slate-600">Premium experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2" style={{color: '#183a37'}}>££££</div>
                    <div className="font-semibold">£400+</div>
                    <div className="text-slate-600">Luxury resort</div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-4 text-center">
                  *Prices are per person for 2-3 day packages including accommodation, breakfast, and golf rounds
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {priceRanges.map((range, index) => (
                  <div key={index} className="bg-slate-100 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-2" style={{color: '#183a37'}}>
                      {range.range}
                    </div>
                    <div className="font-semibold text-slate-900 mb-2">
                      {range.description}
                    </div>
                    <div className="text-sm text-slate-600">
                      {range.count} {range.count === 1 ? 'destination' : 'destinations'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-slate-700">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  What&apos;s Included in Golf Break Prices?
                </h3>
                <ul className="space-y-2 mb-6">
                  <li><strong>Accommodation:</strong> 2-3 nights hotel or resort stay</li>
                  <li><strong>Greens Fees:</strong> 1-3 rounds of golf at featured courses</li>
                  <li><strong>Breakfast:</strong> Daily breakfast at most destinations</li>
                  <li><strong>Course Facilities:</strong> Access to clubhouse, practice facilities</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Additional Costs to Consider
                </h3>
                <ul className="space-y-2 mb-6">
                  <li><strong>Transport:</strong> £20-60 from London depending on method</li>
                  <li><strong>Meals:</strong> £20-40 per day for lunch and dinner</li>
                  <li><strong>Equipment Hire:</strong> £15-30 per day for club rental</li>
                  <li><strong>Coastal Activities:</strong> Beach access, boat trips, attractions</li>
                  <li><strong>Golf Lessons:</strong> £35-80 per session with professionals</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Money-Saving Tips for Bournemouth Golf Breaks
                </h3>
                <ul className="space-y-2">
                  <li>Book midweek breaks for 25-40% savings</li>
                  <li>Travel during shoulder seasons (April-May, September-October)</li>
                  <li>Consider group bookings for course discounts</li>
                  <li>Look for B&B accommodations for better value than hotels</li>
                  <li>Book accommodation in Bournemouth for variety and dining options</li>
                  <li>Use our <Link href="/tools/golf-trip-planner" className="text-blue-600 hover:underline">Golf Trip Planner</Link> to compare coastal golf options</li>
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
                    When to Book Your Bournemouth Golf Break
                  </h3>
                  <div className="space-y-4 text-slate-700">
                    <div>
                      <h4 className="font-semibold text-slate-900">Championship Courses (3-4 months ahead)</h4>
                      <p className="text-sm">Ferndown, Broadstone - popular tournament venues require advance planning</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Resort Courses (2-3 months ahead)</h4>
                      <p className="text-sm">Dorset Golf Resort, Remedy Oak - luxury packages often available</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Coastal Courses (1-2 months ahead)</h4>
                      <p className="text-sm">Barton-on-Sea, Isle of Purbeck - weather dependent, flexible booking</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Best Months for Bournemouth Golf
                  </h3>
                  <div className="space-y-4 text-slate-700">
                    <div>
                      <h4 className="font-semibold text-slate-900">Peak Season: June-August</h4>
                      <p className="text-sm">Warmest weather, longest days, highest prices. Book early.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Ideal Season: April-May, September-October</h4>
                      <p className="text-sm">Perfect weather, excellent value, fewer crowds. Best for golf breaks.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Winter Golf: November-March</h4>
                      <p className="text-sm">Mild coastal climate, lowest prices, weather variability. Indoor alternatives available.</p>
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
                    <li>✓ Check weather forecasts for coastal conditions</li>
                    <li>✓ Confirm course availability and tee times</li>
                    <li>✓ Book accommodation near courses or in Bournemouth</li>
                    <li>✓ Consider travel insurance for coastal weather</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>✓ Pack for variable coastal weather conditions</li>
                    <li>✓ Arrange equipment hire if traveling light</li>
                    <li>✓ Research coastal activities and dining</li>
                    <li>✓ Plan alternative indoor activities</li>
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
                Use our professional golf calculators and planners to optimize your Bournemouth golf break experience.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-100 p-6 rounded-lg">
                  <MapPin className="h-8 w-8 mb-4" style={{color: '#9CC69B'}} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Golf Trip Planner
                  </h3>
                  <p className="text-sm text-slate-700 mb-4">
                    Plan your coastal golf break with detailed itineraries and recommendations.
                  </p>
                  <Button className="w-full text-white" style={{backgroundColor: '#183a37'}} asChild>
                    <Link href="/tools/golf-trip-planner">Plan Your Trip</Link>
                  </Button>
                </div>

                <div className="bg-slate-100 p-6 rounded-lg">
                  <Trophy className="h-8 w-8 mb-4" style={{color: '#9CC69B'}} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Handicap Calculator
                  </h3>
                  <p className="text-sm text-slate-700 mb-4">
                    Calculate your handicap for championship course bookings.
                  </p>
                  <Button className="w-full text-white" style={{backgroundColor: '#183a37'}} asChild>
                    <Link href="/tools/handicap-calculator">Calculate Handicap</Link>
                  </Button>
                </div>

                <div className="bg-slate-100 p-6 rounded-lg">
                  <Calendar className="h-8 w-8 mb-4" style={{color: '#9CC69B'}} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Course Directory
                  </h3>
                  <p className="text-sm text-slate-700 mb-4">
                    Discover additional courses near Bournemouth and Dorset.
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
                    What are the best golf courses in Bournemouth?
                  </h3>
                  <p className="text-slate-700">
                    The best courses include Ferndown Golf Club (championship heathland), Broadstone Golf Club
                    (historic with harbor views), Barton-on-Sea Golf Club (clifftop with sea views), and The
                    Dorset Golf Resort (luxury resort experience).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    When is the best time for golf breaks in Bournemouth?
                  </h3>
                  <p className="text-slate-700">
                    The best months are April, May, September, and October. These offer mild coastal weather,
                    good course conditions, and reasonable prices. Summer months provide the warmest weather
                    but higher prices.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    How much do golf breaks in Bournemouth cost?
                  </h3>
                  <p className="text-slate-700">
                    Costs range from £150-250 for excellent value breaks (££) to £250-400 for premium
                    experiences (£££) and £400+ for luxury resort stays (££££). Prices include accommodation,
                    golf rounds, and breakfast.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Can I combine beach activities with golf in Bournemouth?
                  </h3>
                  <p className="text-slate-700">
                    Yes! Bournemouth offers 7 miles of golden beaches, water sports, pier attractions,
                    and coastal walks. Many golf courses are within 15 minutes of the beach, making it
                    perfect for combining golf with seaside activities.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Are the courses suitable for high handicap golfers?
                  </h3>
                  <p className="text-slate-700">
                    Most courses welcome golfers of all abilities. Championship venues like Ferndown
                    may require handicap certificates, while resort courses and coastal venues are
                    more accessible to higher handicap players.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    What makes Bournemouth golf breaks special?
                  </h3>
                  <p className="text-slate-700">
                    Bournemouth offers unique variety: championship heathland courses, dramatic clifftop
                    golf, luxury resort experiences, and beautiful coastal setting. The combination of
                    quality golf, beaches, dining, and nightlife creates memorable golf holidays.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Conclusion CTA */}
          <div className="text-center rounded-lg p-12 text-white" style={{background: `linear-gradient(135deg, #183a37 0%, #9CC69B 100%)`}}>
            <h2 className="text-3xl font-bold mb-4 font-cooper">
              Start Planning Your Perfect Bournemouth Golf Break
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Use our free golf trip planner to create detailed coastal golf itineraries, compare costs, and book
              your ideal Bournemouth golf break. From championship heathland golf to clifftop drama, your perfect
              coastal golf holiday awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
                <Link href="/tools/golf-trip-planner">Plan My Golf Break</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-black hover:bg-white hover:text-black" asChild>
                <Link href="/blog/best-golf-breaks-uk">UK Golf Breaks</Link>
              </Button>
            </div>
          </div>

          {/* Related Articles and Tools */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Continue Your Golf Journey</CardTitle>
              <CardDescription>
                Tools and guides to help you discover more coastal golf and plan perfect trips
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-slate-900 mb-4">Essential Planning Tools</h3>
                  <div className="space-y-3">
                    <Link href="/tools/golf-trip-planner" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                      <MapPin className="h-5 w-5 text-emerald-600" />
                      <div>
                        <div className="font-medium text-slate-900">Golf Trip Planner</div>
                        <div className="text-sm text-slate-600">Plan your coastal golf adventure</div>
                      </div>
                    </Link>
                    <Link href="/course-directory" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                      <Star className="h-5 w-5 text-emerald-600" />
                      <div>
                        <div className="font-medium text-slate-900">Course Directory</div>
                        <div className="text-sm text-slate-600">Discover Dorset golf courses</div>
                      </div>
                    </Link>
                    <Link href="/tools/handicap-calculator" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                      <Trophy className="h-5 w-5 text-emerald-600" />
                      <div>
                        <div className="font-medium text-slate-900">Handicap Calculator</div>
                        <div className="text-sm text-slate-600">Check requirements for coastal courses</div>
                      </div>
                    </Link>
                    <Link href="/tools/club-distance-calculator" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                      <Car className="h-5 w-5 text-emerald-600" />
                      <div>
                        <div className="font-medium text-slate-900">Distance Calculator</div>
                        <div className="text-sm text-slate-600">Calculate travel times to courses</div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-4">More Golf Destinations</h3>
                  <div className="space-y-3">
                    <Link href="/blog/best-golf-breaks-uk" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-slate-900">Best Golf Breaks UK</div>
                        <div className="text-sm text-slate-600">Explore golf across Britain</div>
                      </div>
                    </Link>
                    <Link href="/blog/best-golf-breaks-wales" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                      <Bed className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-slate-900">Best Golf Breaks Wales</div>
                        <div className="text-sm text-slate-600">Welsh golf destinations</div>
                      </div>
                    </Link>
                    <Link href="/blog/how-to-break-90-golf" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-slate-900">How to Break 90</div>
                        <div className="text-sm text-slate-600">Improve your game for coastal courses</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}