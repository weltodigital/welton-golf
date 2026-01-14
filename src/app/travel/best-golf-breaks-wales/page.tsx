import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Calendar, Phone, Globe, Car, Utensils, Bed, Trophy } from 'lucide-react'
import walesImages from '@/data/walesImages.json'

export const metadata: Metadata = {
  title: 'Best Golf Breaks Wales 2025: 15 Top Welsh Courses | Welton Golf',
  description: 'Discover 15 best golf breaks Wales 2025. Celtic Manor, Royal St David\'s, Royal Porthcawl + 12 more. Championship links, luxury resorts.',
  keywords: 'wales golf breaks 2025, welsh golf holidays, celtic manor golf, royal st davids golf, royal porthcawl golf, wales golf resorts, welsh golf courses, links golf wales',
  openGraph: {
    title: 'Best Golf Breaks in Wales 2025: 15 Top Welsh Courses & Golf Holidays',
    description: 'Complete guide to Wales\' best golf breaks. Celtic Manor, Royal St David\'s, coastal links + luxury resorts. Prices, courses, booking tips included.',
    type: 'article',
    publishedTime: '2025-11-10T00:00:00.000Z',
    modifiedTime: '2025-11-10T00:00:00.000Z',
    authors: ['Welton Golf'],
    url: 'https://weltongolf.com/blog/best-golf-breaks-wales',
    images: [
      {
        url: 'https://weltongolf.com/images/wales-golf-breaks-2025.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Golf Breaks Wales 2025 - Celtic Manor, Royal St David\'s, Welsh Links',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Golf Breaks Wales 2025: 15 Top Courses',
    description: 'Complete guide to Wales\' best golf breaks. Championship links courses + luxury resorts.',
    images: ['https://weltongolf.com/images/wales-golf-breaks-2025.jpg'],
    site: '@WeltonGolf',
  },
  alternates: {
    canonical: 'https://weltongolf.com/blog/best-golf-breaks-wales',
    languages: {
      'en-GB': 'https://weltongolf.com/blog/best-golf-breaks-wales',
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
    name: "Celtic Manor Resort",
    region: "South Wales",
    location: "Newport, South Wales",
    priceRange: "££££",
    duration: "3-4 days",
    courses: ["Twenty Ten Course", "Roman Road", "Montgomerie Course"],
    accommodation: "Celtic Manor Resort Hotel",
    highlights: ["2010 Ryder Cup venue", "Three championship courses", "Luxury spa resort", "Forum Spa", "Multiple restaurants", "Celtic Manor Experience"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Premier Welsh golf resort. Book the Twenty Ten Course for Ryder Cup experience. Spa packages available. The Roman Road offers excellent value. Consider midweek breaks for significant savings.",
    whyVisit: "Experience the only resort to host the Ryder Cup with world-class facilities and luxury accommodation in Wales. Celtic Manor Resort stands as Wales' premier golf destination, featuring three championship courses including the famous Twenty Ten Course, specially designed for the 2010 Ryder Cup. The course features dramatic elevation changes, strategic water hazards, and challenging design that tested the world's best players. The Roman Road course offers a more traditional parkland experience through ancient woodlands, while the Montgomerie Course provides a challenging heathland-style layout. The resort's Forum Spa is one of Europe's finest, and dining options include multiple award-winning restaurants showcasing Welsh cuisine. Located just minutes from the M4, it offers easy access while providing a complete luxury golf experience in the heart of South Wales countryside.",
    coordinates: { lat: 51.6108, lng: -2.8767 }
  },
  {
    id: 2,
    name: "The Vale Resort",
    region: "South Wales",
    location: "Hensol, Vale of Glamorgan",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Wales National Course", "Lake Course"],
    accommodation: "The Vale Resort",
    highlights: ["Wales National Championship venue", "European Tour events", "Luxury spa", "Golf Academy", "Cardiff proximity", "Professional tournaments"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Wales National hosts professional tournaments. Excellent corporate packages. Lake Course offers great value. Book spa treatments in advance. Perfect base for exploring South Wales.",
    whyVisit: "Play Wales' premier tournament venue with European Tour pedigree and outstanding spa facilities near Cardiff. The Vale Resort features the Wales National Course, a Peter Johnson design that has hosted the ISPS Handa Wales Open on the European Tour. The championship layout features challenging water hazards, strategic bunkering, and undulating fairways across beautiful South Wales countryside. The Lake Course offers a more accessible but equally enjoyable experience with scenic water features and mature woodland. The resort's Vale Spa is award-winning with thermal suites, treatment rooms, and relaxation areas. Located just 15 minutes from Cardiff, guests can explore Wales' vibrant capital city with its castle, shops, and restaurants. The resort provides excellent conference facilities, multiple dining options, and comprehensive golf instruction, making it perfect for golf groups and corporate events seeking championship golf with luxury amenities.",
    coordinates: { lat: 51.5408, lng: -3.4108 }
  },
  {
    id: 3,
    name: "St. Pierre Country Club",
    region: "South Wales",
    location: "Chepstow, Monmouthshire",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Old Course", "Mathern Course"],
    accommodation: "St. Pierre Marriott Hotel & Country Club",
    highlights: ["Historic parkland courses", "European Tour venue", "Marriott luxury", "Spa facilities", "Border location", "Championship heritage"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Historic venue with championship pedigree. Old Course is the main attraction. Marriott standards ensure quality. Border location ideal for combining with English courses.",
    whyVisit: "Experience historic championship golf at a venue steeped in European Tour history near the English border. St. Pierre Country Club sits on the banks of the River Severn, offering two contrasting championship courses in a magnificent 400-acre estate. The Old Course is a classic parkland design that has hosted numerous European Tour events including the Dunlop Masters, featuring tree-lined fairways, strategic water hazards, and challenging greens. The Mathern Course provides a more modern experience with links-style characteristics and coastal views. The Marriott hotel offers luxury accommodation in a grand country house setting with award-winning spa facilities, multiple restaurants, and beautiful grounds. Located on the Welsh-English border, the resort provides easy access to both countries' attractions, including the historic town of Chepstow with its medieval castle and the scenic Wye Valley for outdoor activities.",
    coordinates: { lat: 51.6308, lng: -2.6708 }
  },
  {
    id: 4,
    name: "Royal St David's Golf Club",
    region: "North Wales",
    location: "Harlech, Gwynedd",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Championship Links Course"],
    accommodation: "Castle Cottage Restaurant with Rooms, Maes-y-Neuadd",
    highlights: ["Historic links course", "Snowdonia backdrop", "Royal designation", "Championship venue", "Spectacular views", "Traditional golf"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Championship Links",
    bookingTips: "Historic royal links with spectacular setting. Book well in advance for summer. Challenging links golf requires wind strategy. Stay locally for Snowdonia access.",
    whyVisit: "Play championship links golf beneath the dramatic backdrop of Snowdonia at one of Wales' most scenic courses. Royal St David's Golf Club, established in 1894, offers authentic links golf with Harlech Castle and Snowdonia National Park providing a spectacular backdrop. The championship course features traditional links characteristics with natural dunes, pot bunkers, and coastal winds that demand strategic play and shot creativity. The layout has hosted numerous championships and maintains its traditional character with small greens and firm, fast fairways. The clubhouse overlooks Cardigan Bay with panoramic views of the coastline and mountains. Located beneath historic Harlech Castle, golfers can explore this UNESCO World Heritage site and enjoy the stunning North Wales coastline. The area offers excellent walking in Snowdonia, beautiful beaches, and charming Welsh villages, making it perfect for combining championship links golf with cultural and outdoor activities.",
    coordinates: { lat: 52.8608, lng: -4.1108 }
  },
  {
    id: 5,
    name: "Nefyn Golf Club",
    region: "North Wales",
    location: "Nefyn, Gwynedd",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Championship Course", "Old Course"],
    accommodation: "Local guest houses and B&Bs in Nefyn",
    highlights: ["Clifftop location", "Spectacular sea views", "Two courses", "Traditional links", "Coastal setting", "Welsh character"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Links",
    bookingTips: "Hidden gem with spectacular clifftop holes. Two courses offer variety. Traditional Welsh hospitality. Book local accommodation for authentic experience.",
    whyVisit: "Discover spectacular clifftop links golf with dramatic sea views on the beautiful Llŷn Peninsula. Nefyn Golf Club offers two distinct courses in one of Wales' most spectacular coastal settings. The Championship Course features dramatic clifftop holes with breathtaking views across Caernarfon Bay to Anglesey and the mountains of Snowdonia. The Old Course provides a more traditional links experience inland with natural terrain and challenging holes. Both courses emphasize strategic play with coastal winds and firm conditions typical of seaside golf. The clifftop location creates constantly changing conditions that reward adaptability and creativity. The traditional clubhouse serves excellent local fare and Welsh hospitality. The Llŷn Peninsula offers outstanding natural beauty, quiet beaches, and traditional Welsh culture away from crowds. This represents excellent value championship golf in one of Wales' most beautiful and unspoiled coastal regions.",
    coordinates: { lat: 52.9208, lng: -4.5508 }
  },
  {
    id: 6,
    name: "Royal Porthcawl Golf Club",
    region: "South Wales",
    location: "Porthcawl, Bridgend",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Championship Links Course"],
    accommodation: "Seabank Hotel, local Porthcawl hotels",
    highlights: ["Championship links", "Walker Cup venue", "Coastal location", "Royal designation", "Professional tournaments", "Traditional clubhouse"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship Links",
    bookingTips: "Premier Welsh links course. Walker Cup and Amateur Championship venue. Book well in advance. Challenging links golf requires tactical play.",
    whyVisit: "Experience Wales' premier links golf at a venue renowned for hosting major amateur championships. Royal Porthcawl Golf Club is considered Wales' finest links course, having hosted the Walker Cup, Amateur Championship, and numerous professional events. The championship layout features classic links characteristics with natural dunes, deep bunkers, and coastal winds across stunning clifftop terrain overlooking the Bristol Channel. The course demands strategic thinking with firm, fast conditions and small targets that reward precision over power. The traditional clubhouse maintains the atmosphere of golf's golden age with excellent dining and spectacular sea views. Located on the Glamorgan Heritage Coast, the area offers beautiful beaches, the historic town of Porthcawl with its Victorian architecture, and easy access to Cardiff and the Brecon Beacons. This represents the pinnacle of Welsh links golf in a spectacular coastal setting.",
    coordinates: { lat: 51.4808, lng: -3.7008 }
  },
  {
    id: 7,
    name: "Langland Bay Golf Club",
    region: "South Wales",
    location: "Swansea, West Glamorgan",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Clifftop Course"],
    accommodation: "Swansea hotels and guest houses",
    highlights: ["Clifftop course", "Gower Peninsula views", "Coastal golf", "Spectacular scenery", "Accessible location", "Value golf"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Resort",
    bookingTips: "Spectacular clifftop course with great value. Stunning Gower Peninsula setting. Book accommodation in Swansea for city amenities. Weather can be variable.",
    whyVisit: "Enjoy spectacular clifftop golf with panoramic views over the beautiful Gower Peninsula. Langland Bay Golf Club offers one of Wales' most scenic golfing experiences, perched on cliffs overlooking Swansea Bay with stunning views across to the Gower Peninsula. The clifftop course features dramatic elevation changes, challenging coastal winds, and breathtaking scenery on every hole. The layout emphasizes enjoyment over extreme difficulty, making it accessible to golfers of all abilities while providing memorable coastal golf. The course winds through natural terrain with several holes played directly along the cliff edge. The clubhouse terrace offers panoramic views perfect for post-round relaxation. Located near Swansea, Wales' second city, golfers can explore the vibrant waterfront, excellent restaurants, and cultural attractions. The nearby Gower Peninsula, Britain's first Area of Outstanding Natural Beauty, provides stunning beaches, coastal walks, and charming villages, making this perfect for combining golf with sightseeing.",
    coordinates: { lat: 51.5708, lng: -4.0208 }
  },
  {
    id: 8,
    name: "Pennard Golf Club",
    region: "South Wales",
    location: "Southgate, Swansea",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Links Course"],
    accommodation: "Gower Peninsula accommodations",
    highlights: ["Gower Peninsula links", "Three Cliffs Bay views", "Natural links terrain", "Spectacular setting", "Coastal walking", "Wildlife"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Links",
    bookingTips: "Spectacular Gower Peninsula links. Famous Three Cliffs Bay views. Natural terrain and coastal winds. Book early for peak season. Combine with Gower exploration.",
    whyVisit: "Play natural links golf in one of Britain's most beautiful coastal settings on the stunning Gower Peninsula. Pennard Golf Club occupies a spectacular location overlooking Three Cliffs Bay, one of Wales' most photographed beaches. The links course features natural dunes, traditional pot bunkers, and dramatic elevation changes across rugged coastal terrain. The layout includes several clifftop holes with breathtaking views over Swansea Bay and the Bristol Channel. The course emphasizes traditional links characteristics with firm, fast conditions and strategic challenges that reward creativity and local knowledge. Wildlife is abundant with rare birds, wildflowers, and marine life visible throughout the round. The rustic clubhouse maintains a welcoming atmosphere with local hospitality and simple refreshments. The Gower Peninsula offers outstanding natural beauty, pristine beaches, coastal path walking, and traditional Welsh villages, making this an ideal destination for combining authentic links golf with exploration of one of Britain's most unspoiled coastlines.",
    coordinates: { lat: 51.5408, lng: -4.1308 }
  },
  {
    id: 9,
    name: "Rolls of Monmouth Golf Club",
    region: "South Wales",
    location: "Monmouth, Monmouthshire",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Parkland Course"],
    accommodation: "Monmouth area hotels and B&Bs",
    highlights: ["Historic parkland", "River valley setting", "Traditional golf", "Beautiful countryside", "Historic town", "Value golf"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Traditional",
    bookingTips: "Historic parkland course in beautiful Wye Valley. Traditional golf experience. Excellent value. Historic Monmouth nearby for sightseeing and dining.",
    whyVisit: "Experience traditional parkland golf in the beautiful Wye Valley with historic Monmouth as your base. Rolls of Monmouth Golf Club offers a classic parkland experience through mature woodland and rolling countryside in the scenic border country between Wales and England. The course features tree-lined fairways, strategically placed bunkers, and undulating greens that reward accurate play and course management. The layout follows the natural contours of the Wye Valley landscape, providing constantly changing vistas and challenges. The traditional clubhouse maintains a welcoming atmosphere with excellent local cuisine and warm Welsh hospitality. Historic Monmouth offers medieval architecture, independent shops, traditional pubs, and restaurants featuring local produce. The surrounding area provides excellent walking along the River Wye, exploring historic sites including Monmouth Castle, and discovering the beautiful countryside that inspired the Romantic poets. This represents excellent value traditional golf in one of Wales' most historically significant regions.",
    coordinates: { lat: 51.8108, lng: -2.7108 }
  },
  {
    id: 10,
    name: "Conwy Golf Club",
    region: "North Wales",
    location: "Conwy, Gwynedd",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Morfa Course"],
    accommodation: "Conwy town hotels and B&Bs",
    highlights: ["Historic links", "Conwy Castle views", "Traditional course", "Coastal setting", "Medieval town", "Great Orme backdrop"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Links",
    bookingTips: "Historic links with castle views. Traditional Welsh golf experience. Medieval Conwy nearby for sightseeing. Book accommodation in historic town for atmosphere.",
    whyVisit: "Play historic links golf with spectacular views of medieval Conwy Castle and Snowdonia mountains. Conwy Golf Club, established in 1890, offers traditional links golf in one of North Wales' most picturesque settings. The Morfa Course features classic links characteristics with natural terrain, coastal breezes, and stunning views across the Conwy Valley to Snowdonia. The layout includes several challenging holes with water hazards and strategically placed bunkers that reward strategic play. The clubhouse overlooks the course with panoramic views of Conwy Castle, one of Europe's finest examples of medieval architecture. The historic walled town of Conwy provides excellent dining, shopping, and cultural attractions within walking distance. The area offers castle tours, harbor walks, and access to Snowdonia National Park for hiking and outdoor activities. This combination of historic links golf and UNESCO World Heritage surroundings creates a uniquely Welsh golfing experience.",
    coordinates: { lat: 53.2808, lng: -3.8208 }
  },
  {
    id: 11,
    name: "Aberdovey Golf Club",
    region: "Mid Wales",
    location: "Aberdyfi, Gwynedd",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Championship Links"],
    accommodation: "Penhelig Arms Hotel, local guest houses",
    highlights: ["Historic links course", "Cardigan Bay views", "Bernard Darwin connection", "Railway golf", "Traditional atmosphere", "Coastal village"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Links",
    bookingTips: "Historic links with literary connections. Bernard Darwin's favorite course. Traditional atmosphere. Charming seaside village. Book early for summer months.",
    whyVisit: "Experience one of Wales' most historic and beloved links courses in the charming seaside village of Aberdyfi. Aberdovey Golf Club, established in 1892, was famously described by Bernard Darwin as 'the course that my soul loves best.' The championship links features traditional characteristics with natural dunes, pot bunkers, and spectacular views across Cardigan Bay to the Snowdonia mountains. The layout includes the famous railway hole where golfers must wait for passing trains, adding unique character to the round. The course emphasizes traditional links play with firm conditions, coastal winds, and strategic challenges that reward creativity over power. The Victorian clubhouse maintains period atmosphere with excellent Welsh cuisine and warm hospitality. The village of Aberdyfi offers traditional Welsh charm with independent shops, seafood restaurants, and beautiful beaches. The area provides excellent coastal walking, steam railway journeys, and access to both Snowdonia National Park and the Pembrokeshire coastline.",
    coordinates: { lat: 52.5408, lng: -4.0608 }
  },
  {
    id: 12,
    name: "Tenby Golf Club",
    region: "West Wales",
    location: "Tenby, Pembrokeshire",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Championship Course"],
    accommodation: "Tenby town hotels and guest houses",
    highlights: ["Clifftop links", "Pembrokeshire Coast views", "Historic seaside town", "Championship venue", "Coastal path", "Medieval walls"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Links",
    bookingTips: "Spectacular clifftop links course. Historic Tenby nearby with medieval walls. Pembrokeshire Coast National Park setting. Book early for summer season.",
    whyVisit: "Play championship links golf on spectacular clifftops in the heart of Pembrokeshire Coast National Park. Tenby Golf Club offers dramatic clifftop golf with panoramic views over Carmarthen Bay and the Pembrokeshire islands. The championship course features challenging links characteristics with natural dunes, coastal winds, and strategic design that has tested professional tournaments. Several holes play directly along cliff edges with spectacular drop-offs to the sea below. The layout rewards strategic thinking with multiple route options and firm, fast conditions typical of seaside golf. The clubhouse offers panoramic coastal views and traditional Welsh hospitality. Historic Tenby, with its medieval walls, colorful harbor, and independent shops, provides an enchanting base for exploration. The Pembrokeshire Coast Path offers some of Britain's finest coastal walking, while boat trips to offshore islands provide opportunities to see seals, dolphins, and seabirds. This represents excellent value championship golf in one of Wales' most beautiful coastal settings.",
    coordinates: { lat: 51.6708, lng: -4.7008 }
  },
  {
    id: 13,
    name: "Maesdu Golf Club",
    region: "North Wales",
    location: "Llandudno, Conwy",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Championship Course"],
    accommodation: "Llandudno hotels and guest houses",
    highlights: ["Great Orme views", "Victorian resort town", "Challenging layout", "Coastal setting", "Historic club", "Mountain backdrop"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Challenging course with Great Orme backdrop. Victorian Llandudno nearby for entertainment. Mountain and sea views. Good value championship golf.",
    whyVisit: "Experience challenging championship golf with spectacular mountain and sea views in the elegant Victorian resort of Llandudno. Maesdu Golf Club offers a demanding parkland course with dramatic elevation changes beneath the iconic Great Orme headland. The championship layout features strategic bunkering, challenging water hazards, and elevated greens that reward accurate play and course management. The course provides constantly changing views of Snowdonia, Anglesey, and the Irish Sea, creating a spectacular backdrop for golf. The modern clubhouse offers excellent facilities and panoramic views across the course to the sea. Llandudno, Wales' largest seaside resort, provides Victorian elegance with the famous pier, cable car to Great Orme summit, excellent shopping on Mostyn Street, and diverse dining options. The area offers beach activities, coastal walking, and easy access to Snowdonia National Park for hiking and outdoor adventures. This combination of challenging golf and classic seaside resort atmosphere creates an ideal Welsh golf break.",
    coordinates: { lat: 53.3208, lng: -3.8508 }
  },
  {
    id: 14,
    name: "Southerndown Golf Club",
    region: "South Wales",
    location: "Bridgend, Vale of Glamorgan",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Clifftop Course"],
    accommodation: "Vale of Glamorgan accommodations",
    highlights: ["Clifftop location", "Heritage Coast views", "Dramatic setting", "Coastal golf", "Natural terrain", "Wildlife sanctuary"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Links",
    bookingTips: "Spectacular clifftop course on Heritage Coast. Natural terrain and dramatic views. Weather dependent. Combine with coastal walking and exploration.",
    whyVisit: "Play dramatic clifftop golf on the spectacular Glamorgan Heritage Coast with breathtaking views and natural beauty. Southerndown Golf Club occupies one of Wales' most stunning coastal locations, perched on cliffs above Nash Point with panoramic views across the Bristol Channel to Somerset and Devon. The course features natural links terrain with dramatic elevation changes, coastal winds, and holes that play directly along cliff edges. The layout emphasizes natural golf with minimal artificial features, allowing the spectacular landscape to provide both beauty and challenge. Several holes offer breathtaking views with the lighthouse and heritage coast providing constant scenic interest. The simple clubhouse maintains a welcoming atmosphere with basic facilities and stunning terrace views. The Heritage Coast offers excellent coastal path walking, fossil hunting on the beaches, and exploring traditional Welsh villages. This represents excellent value golf in one of Wales' most spectacular and unspoiled coastal settings, perfect for golfers seeking natural beauty and challenging coastal conditions.",
    coordinates: { lat: 51.4408, lng: -3.6108 }
  },
  {
    id: 15,
    name: "Pyle & Kenfig Golf Club",
    region: "South Wales",
    location: "Pyle, Bridgend",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Championship Links"],
    accommodation: "Porthcawl and Bridgend area hotels",
    highlights: ["Championship links", "Professional venue", "Natural dunes", "Traditional links", "Challenging layout", "Excellent value"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship Links",
    bookingTips: "Excellent value championship links. Professional tournament venue. Natural dunes and challenging conditions. Great base for exploring South Wales coast.",
    whyVisit: "Experience authentic championship links golf at exceptional value on a course that has tested professional tournaments. Pyle & Kenfig Golf Club offers a genuine links experience through natural dunes and coastal terrain that has hosted professional events including European Tour qualifiers. The championship course features traditional links characteristics with pot bunkers, firm fairways, and coastal winds that create constantly changing conditions. The layout rewards strategic thinking and shot creativity with multiple route options and traditional small greens. The course maintains natural beauty with minimal artificial interference, allowing the coastal landscape to provide both challenge and scenery. The clubhouse offers traditional atmosphere with excellent value dining and warm Welsh hospitality. Located near Porthcawl and the Glamorgan coast, golfers can explore beautiful beaches, historic sites, and traditional Welsh villages. The area provides excellent coastal walking, surfing opportunities, and access to the Brecon Beacons National Park. This represents outstanding value championship links golf in authentic Welsh coastal surroundings.",
    coordinates: { lat: 51.5208, lng: -3.7508 }
  }
]

const priceRanges = [
  { range: "££", description: "Excellent value golf breaks", count: 11 },
  { range: "£££", description: "Premium golf experiences", count: 3 },
  { range: "££££", description: "Luxury golf resort", count: 1 }
]

export default function WalesGolfBreaks() {
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
              "headline": "Best Golf Breaks in Wales 2025: 15 Top Welsh Courses & Golf Holidays",
              "description": "Discover 15 best golf breaks in Wales 2025. Celtic Manor, Royal St David's, Royal Porthcawl + 12 more Welsh courses. Championship links, luxury resorts, pricing guide.",
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
                "@id": "https://weltongolf.com/blog/best-golf-breaks-wales"
              },
              "image": {
                "@type": "ImageObject",
                "url": "https://weltongolf.com/images/wales-golf-breaks-2025.jpg",
                "width": 1200,
                "height": 630,
                "caption": "Best Golf Breaks Wales 2025 - Celtic Manor, Royal St David's, Welsh Links"
              },
              "about": [
                {
                  "@type": "Place",
                  "name": "Wales",
                  "description": "Premier golf destination featuring championship courses and stunning landscapes"
                },
                {
                  "@type": "SportsActivityLocation",
                  "name": "Welsh Golf Courses",
                  "description": "Championship and links golf courses across Wales"
                }
              ],
              "mentions": golfBreaks.slice(0, 10).map(golfBreak => ({
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
              "wordCount": 7000,
              "inLanguage": "en-GB",
              "keywords": "wales golf breaks, welsh golf holidays, celtic manor golf, championship links wales",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", ".price-guide"]
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "TravelGuide",
              "name": "Wales Golf Breaks Guide 2025",
              "description": "Complete guide to the best golf breaks and holidays in Wales",
              "about": {
                "@type": "Place",
                "name": "Wales",
                "description": "Golf destination featuring championship courses and stunning landscapes"
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
                  "name": "What are the best golf courses in Wales?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The best golf courses include Celtic Manor Resort (2010 Ryder Cup venue), Royal St David's (historic links with Snowdonia backdrop), Royal Porthcawl (Walker Cup venue), and The Vale Resort (European Tour venue)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "When is the best time for golf breaks in Wales?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The best months are April, May, September, and October. These offer mild weather, good course conditions, and reasonable prices. Summer months provide warmest weather but higher prices."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much do golf breaks in Wales cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Costs range from £120-200 for excellent value breaks (££) to £200-350 for premium experiences (£££) and £350+ for luxury resort stays (££££). Prices include accommodation, golf rounds, and breakfast."
                  }
                }
              ]
            }
          ])
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">

          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 font-cooper">
              Best Golf Breaks in Wales 2025
            </h1>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto mb-8">
              Discover Wales&apos; spectacular golf destinations where championship courses meet stunning landscapes.
              From the Ryder Cup venue at Celtic Manor to historic links courses beneath Snowdonia&apos;s peaks, dramatic
              clifftop golf along the Pembrokeshire coast, and traditional parkland courses in beautiful valleys,
              we&apos;ve curated the top 15 golf breaks in Wales for 2025. Perfect for links golf enthusiasts,
              mountain lovers, and those seeking authentic Welsh hospitality.
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
              <Link href="#wales-golf-breaks" className="text-blue-600 hover:underline">1. Top Wales Golf Breaks</Link>
              <Link href="#price-guide" className="text-blue-600 hover:underline">2. Price Guide & Budget Tips</Link>
              <Link href="#booking-tips" className="text-blue-600 hover:underline">3. Booking Tips & Best Times</Link>
              <Link href="#planning-tools" className="text-blue-600 hover:underline">4. Golf Trip Planning Tools</Link>
              <Link href="#faqs" className="text-blue-600 hover:underline">5. Frequently Asked Questions</Link>
            </div>
          </Card>

          {/* Featured Snippet Optimized Summary */}
          <Card className="p-8 mb-8 bg-gradient-to-r from-green-50 to-blue-50">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Wales Golf Breaks 2025: Quick Guide
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">🏆 Top Wales Golf Destinations</h3>
                <ol className="text-slate-700 space-y-1">
                  <li><strong>1. Celtic Manor Resort</strong> - 2010 Ryder Cup venue</li>
                  <li><strong>2. Royal St David&apos;s</strong> - Historic links with Snowdonia backdrop</li>
                  <li><strong>3. Royal Porthcawl</strong> - Walker Cup venue, premier links</li>
                  <li><strong>4. The Vale Resort</strong> - European Tour venue near Cardiff</li>
                  <li><strong>5. St. Pierre</strong> - Historic parkland, European Tour heritage</li>
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">💰 Golf Break Pricing 2025</h3>
                <ul className="text-slate-700 space-y-1">
                  <li><strong>££ Value (£120-£200):</strong> 11 destinations</li>
                  <li><strong>£££ Premium (£200-£350):</strong> 3 destinations</li>
                  <li><strong>££££ Luxury (£350+):</strong> 1 destination</li>
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
              When is the best time for Wales golf breaks?
            </h3>
            <div className="text-slate-700">
              <p className="mb-4">
                <strong>The best months for Wales golf breaks are April, May, September, and October.</strong> These months offer:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Mild Welsh weather:</strong> Temperatures 12-16°C with less rainfall</li>
                <li><strong>Outstanding value:</strong> 30-40% cheaper than peak summer months</li>
                <li><strong>Course availability:</strong> Easier booking at championship venues</li>
                <li><strong>Ideal conditions:</strong> Firm links courses and clear mountain views</li>
              </ul>
              <p className="text-sm bg-yellow-50 p-3 rounded">
                💡 <strong>Pro tip:</strong> May-August are peak season (highest prices, busiest courses). November-March offer lowest prices but unpredictable Welsh weather.
              </p>
            </div>
          </Card>

          {/* Introduction */}
          <Card className="p-8 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Why Choose Wales for Your Golf Break?
            </h2>
            <div className="text-slate-700">
              <p className="mb-4">
                Wales offers <strong>Europe&apos;s most diverse golf destination</strong> in a compact area,
                combining championship courses with spectacular natural beauty, rich culture, and exceptional value.
                From the Ryder Cup glamour of Celtic Manor to historic links courses beneath Snowdonia&apos;s peaks,
                dramatic clifftop golf along pristine coastlines, and traditional courses in beautiful valleys,
                Wales provides unforgettable golfing experiences steeped in history and natural splendor.
              </p>
              <p className="mb-4">
                What makes Wales golf breaks special? <strong>Diversity, authenticity, and outstanding value.</strong> You can
                play championship venues that have tested the world&apos;s best, experience traditional links golf in spectacular
                coastal settings, and enjoy genuine Welsh hospitality in historic towns and villages. The compact geography
                means you can experience multiple regions and course styles in a single break, all at prices that
                represent exceptional value compared to other European golf destinations.
              </p>
              <p>
                Our comprehensive guide covers <strong>15 carefully selected golf breaks</strong> representing Wales&apos;
                finest courses from north to south. Each destination combines outstanding golf with cultural attractions,
                natural beauty, and accommodation options for every budget. From luxury resorts to traditional
                guest houses, championship links to historic parkland, we&apos;ve included the complete spectrum of
                Welsh golf experiences.
              </p>
            </div>
          </Card>

          {/* Wales Golf Breaks */}
          <section id="wales-golf-breaks" className="mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 font-cooper">
              Top Wales Golf Breaks for 2025
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              From the championship grandeur of Ryder Cup venues to historic links courses with mountain backdrops,
              dramatic clifftop golf along pristine coastlines, traditional parkland courses through ancient valleys,
              and authentic Welsh clubs steeped in local culture, discover Wales&apos; finest golf break destinations.
              Each break combines exceptional golf with stunning landscapes, rich heritage, warm hospitality, and
              outstanding value that makes Wales a premier European golf destination.
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
                          src={walesImages[golfBreak.name as keyof typeof walesImages] || '/images/placeholder-golf-resort.jpg'}
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
                Wales Golf Break Price Guide 2025
              </h2>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Price Guide Explanation</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2" style={{color: '#183a37'}}>££</div>
                    <div className="font-semibold">£120-£200</div>
                    <div className="text-slate-600">Excellent value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2" style={{color: '#183a37'}}>£££</div>
                    <div className="font-semibold">£200-£350</div>
                    <div className="text-slate-600">Premium experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2" style={{color: '#183a37'}}>££££</div>
                    <div className="font-semibold">£350+</div>
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
                  <li><strong>Accommodation:</strong> 2-3 nights hotel, B&B or resort stay</li>
                  <li><strong>Greens Fees:</strong> 1-3 rounds of golf at featured courses</li>
                  <li><strong>Breakfast:</strong> Traditional Welsh breakfast at most destinations</li>
                  <li><strong>Course Facilities:</strong> Access to clubhouse, practice facilities</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Additional Costs to Consider
                </h3>
                <ul className="space-y-2 mb-6">
                  <li><strong>Transport:</strong> £40-120 from London depending on location and method</li>
                  <li><strong>Meals:</strong> £15-35 per day for lunch and dinner</li>
                  <li><strong>Equipment Hire:</strong> £15-25 per day for club rental</li>
                  <li><strong>Activities:</strong> Castles, national parks, cultural attractions</li>
                  <li><strong>Golf Lessons:</strong> £30-60 per session with club professionals</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Money-Saving Tips for Wales Golf Breaks
                </h3>
                <ul className="space-y-2">
                  <li>Book midweek breaks for 30-40% savings</li>
                  <li>Travel during shoulder seasons (April-May, September-October)</li>
                  <li>Consider group bookings for course and accommodation discounts</li>
                  <li>Look for B&B and guest house accommodation for authentic Welsh experience</li>
                  <li>Combine multiple courses in same region to reduce travel costs</li>
                  <li>Use our <Link href="/tools/golf-trip-planner" className="text-blue-600 hover:underline">Golf Trip Planner</Link> to optimize your Welsh golf tour</li>
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
                    When to Book Your Wales Golf Break
                  </h3>
                  <div className="space-y-4 text-slate-700">
                    <div>
                      <h4 className="font-semibold text-slate-900">Championship Courses (3-6 months ahead)</h4>
                      <p className="text-sm">Celtic Manor, Royal Porthcawl - premium venues require advance planning</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Historic Links (2-3 months ahead)</h4>
                      <p className="text-sm">Royal St David&apos;s, Aberdovey - popular courses with character</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Traditional Courses (1-2 months ahead)</h4>
                      <p className="text-sm">Local clubs - excellent value with shorter lead times</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Best Months for Wales Golf
                  </h3>
                  <div className="space-y-4 text-slate-700">
                    <div>
                      <h4 className="font-semibold text-slate-900">Peak Season: May-August</h4>
                      <p className="text-sm">Best weather, longest days, highest prices. Book early.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Ideal Season: April, September-October</h4>
                      <p className="text-sm">Excellent value, good weather, fewer crowds. Perfect for golf breaks.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Winter Golf: November-March</h4>
                      <p className="text-sm">Lowest prices, mild coastal climate, variable weather. Indoor alternatives recommended.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-lg" style={{backgroundColor: '#9CC69B'}}>
                <h3 className="text-xl font-bold mb-4" style={{color: '#183a37'}}>
                  Essential Wales Golf Booking Checklist
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm" style={{color: '#183a37'}}>
                  <ul className="space-y-2">
                    <li>✓ Check weather forecasts and pack layers</li>
                    <li>✓ Book championship courses well in advance</li>
                    <li>✓ Consider regional accommodation for authentic experience</li>
                    <li>✓ Research Welsh cultural attractions and castles</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>✓ Pack waterproof clothing for variable weather</li>
                    <li>✓ Learn basic Welsh greetings for local hospitality</li>
                    <li>✓ Plan routes between courses and attractions</li>
                    <li>✓ Book traditional Welsh dining experiences</li>
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
                Use our professional golf calculators and planners to optimize your Wales golf break experience.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-100 p-6 rounded-lg">
                  <MapPin className="h-8 w-8 mb-4" style={{color: '#9CC69B'}} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Golf Trip Planner
                  </h3>
                  <p className="text-sm text-slate-700 mb-4">
                    Plan your Welsh golf tour with detailed regional itineraries and recommendations.
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
                    Calculate your handicap for championship course bookings in Wales.
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
                    Discover additional courses across all Welsh regions.
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
                    What are the best golf courses in Wales?
                  </h3>
                  <p className="text-slate-700">
                    The best courses include Celtic Manor Resort (2010 Ryder Cup venue), Royal St David&apos;s
                    (historic links with Snowdonia backdrop), Royal Porthcawl (Walker Cup venue), and
                    The Vale Resort (European Tour venue).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    When is the best time for golf breaks in Wales?
                  </h3>
                  <p className="text-slate-700">
                    The best months are April, May, September, and October. These offer mild weather,
                    good course conditions, and reasonable prices. Summer months provide warmest weather
                    but higher prices.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    How much do golf breaks in Wales cost?
                  </h3>
                  <p className="text-slate-700">
                    Costs range from £120-200 for excellent value breaks (££) to £200-350 for premium
                    experiences (£££) and £350+ for luxury resort stays (££££). Prices include accommodation,
                    golf rounds, and breakfast.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    What makes Wales special for golf breaks?
                  </h3>
                  <p className="text-slate-700">
                    Wales offers incredible diversity in a compact area: Ryder Cup venues, historic links,
                    mountain backdrops, coastal courses, and authentic Welsh culture. Exceptional value
                    compared to other European golf destinations.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Can I combine golf with sightseeing in Wales?
                  </h3>
                  <p className="text-slate-700">
                    Absolutely! Wales offers castles, national parks, historic towns, and cultural
                    attractions within easy reach of golf courses. Many breaks perfectly combine
                    championship golf with exploring Welsh heritage and natural beauty.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Do I need a car for Wales golf breaks?
                  </h3>
                  <p className="text-slate-700">
                    A car is recommended for maximum flexibility, especially for visiting multiple courses
                    and attractions. However, some destinations like Celtic Manor and The Vale Resort
                    are accessible by public transport from Cardiff.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Conclusion CTA */}
          <div className="text-center rounded-lg p-12 text-white" style={{background: `linear-gradient(135deg, #183a37 0%, #9CC69B 100%)`}}>
            <h2 className="text-3xl font-bold mb-4 font-cooper">
              Start Planning Your Perfect Wales Golf Break
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Use our free golf trip planner to create detailed Welsh golf itineraries, compare costs, and book
              your ideal Wales golf break. From Ryder Cup venues to historic links with mountain backdrops, your perfect
              Welsh golf adventure awaits.
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
              <CardTitle>Explore More Golf Adventures</CardTitle>
              <CardDescription>
                Tools and guides to help you discover more Welsh golf and plan perfect trips
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
                        <div className="text-sm text-slate-600">Plan your perfect Welsh golf adventure</div>
                      </div>
                    </Link>
                    <Link href="/course-directory" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                      <Star className="h-5 w-5 text-emerald-600" />
                      <div>
                        <div className="font-medium text-slate-900">Course Directory</div>
                        <div className="text-sm text-slate-600">Discover more Welsh golf courses</div>
                      </div>
                    </Link>
                    <Link href="/tools/handicap-calculator" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                      <Trophy className="h-5 w-5 text-emerald-600" />
                      <div>
                        <div className="font-medium text-slate-900">Handicap Calculator</div>
                        <div className="text-sm text-slate-600">Check requirements for championship courses</div>
                      </div>
                    </Link>
                    <Link href="/tools/club-distance-calculator" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                      <Car className="h-5 w-5 text-emerald-600" />
                      <div>
                        <div className="font-medium text-slate-900">Distance Calculator</div>
                        <div className="text-sm text-slate-600">Calculate travel times in Wales</div>
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
                    <Link href="/blog/best-golf-breaks-bournemouth" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                      <Bed className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-slate-900">Best Golf Breaks Bournemouth</div>
                        <div className="text-sm text-slate-600">English coastal golf destinations</div>
                      </div>
                    </Link>
                    <Link href="/blog/how-to-break-90-golf" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-slate-900">How to Break 90</div>
                        <div className="text-sm text-slate-600">Improve your scores for these courses</div>
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