import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Calendar, Phone, Globe, Car, Utensils, Bed, Trophy } from 'lucide-react'
import resortImages from '@/data/resortImages.json'

export const metadata: Metadata = {
  title: 'Best Golf Breaks UK 2025: 21 Top Golf Holidays Scotland England Wales | Welton Golf',
  description: 'Discover 21 best golf breaks UK 2025. Celtic Manor, Gleneagles, Trump Turnberry + 18 more. Championship courses, luxury resorts, pricing guide. Book your perfect UK golf holiday.',
  keywords: 'golf breaks UK 2025, best golf holidays UK, UK golf packages, Scotland golf breaks, England golf trips, Wales golf holidays, golf weekends UK, British golf resorts, Celtic Manor golf, Gleneagles golf, Trump Turnberry golf, golf vacation UK, UK links courses, championship golf courses UK, golf resort breaks UK, ryder cup venues golf',
  openGraph: {
    title: 'Best Golf Breaks UK 2025: 21 Top Golf Holidays Scotland England Wales',
    description: 'Complete guide to UK\'s best golf breaks. Celtic Manor, Gleneagles, Trump Turnberry + 18 championship venues. Prices, courses, booking tips included.',
    type: 'article',
    publishedTime: '2025-01-01T00:00:00.000Z',
    modifiedTime: '2025-01-01T00:00:00.000Z',
    authors: ['Welton Golf'],
    url: 'https://weltongolf.com/blog/best-golf-breaks-uk',
    images: [
      {
        url: 'https://weltongolf.com/images/uk-golf-breaks-2025.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Golf Breaks UK 2025 - Celtic Manor, Gleneagles, Championship Courses',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Golf Breaks UK 2025: 21 Top Golf Holidays',
    description: 'Complete guide to UK\'s best golf breaks. Celtic Manor, Gleneagles, Trump Turnberry + 18 more venues.',
    images: ['https://weltongolf.com/images/uk-golf-breaks-2025.jpg'],
    site: '@WeltonGolf',
  },
  alternates: {
    canonical: 'https://weltongolf.com/blog/best-golf-breaks-uk',
    languages: {
      'en-GB': 'https://weltongolf.com/blog/best-golf-breaks-uk',
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
    region: "Wales",
    location: "Newport, South Wales",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Twenty Ten Course", "Roman Road", "Montgomerie Course"],
    accommodation: "Celtic Manor Resort Hotel",
    highlights: ["2010 Ryder Cup venue", "Three championship courses", "Luxury spa resort", "Forum Spa", "Multiple restaurants", "Celtic Manor Experience"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Book the Twenty Ten Course for the Ryder Cup experience. Spa packages available. The Roman Road offers excellent value. Consider midweek breaks for significant savings.",
    whyVisit: "Experience the only resort to host the Ryder Cup with world-class facilities and luxury accommodation. The Twenty Ten Course was specially designed for the 2010 Ryder Cup and features dramatic elevation changes and water hazards. The Roman Road course offers a more traditional parkland experience, while the Montgomerie Course provides a challenging heathland-style layout. The resort's Forum Spa is one of Europe's finest, and dining options include multiple award-winning restaurants. Located just minutes from the M4, it's easily accessible from London and the Midlands.",
    coordinates: { lat: 51.6108, lng: -2.8767 }
  },
  {
    id: 2,
    name: "The Belfry",
    region: "England",
    location: "Sutton Coldfield, Warwickshire",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Brabazon Course", "PGA National", "Derby Course"],
    accommodation: "The Belfry Hotel & Resort",
    highlights: ["Four-time Ryder Cup venue", "Iconic 10th hole", "Resort convenience", "PGA Golf Academy", "Luxury spa", "Multiple dining venues"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Must-play Brabazon Course. Golf packages include accommodation and breakfast. Book early for weekends and peak season. The Derby Course offers excellent value for money.",
    whyVisit: "Relive Ryder Cup history on the most famous Ryder Cup venue with four dramatic competitions. The Brabazon Course features the legendary par-4 10th hole where Christy O'Connor Jr hit his famous 2-iron to within four feet in 1989. The course winds through mature woodland with strategic water hazards, including the climactic 18th hole where so many Ryder Cup dreams have been made and broken. The PGA National Course hosted the English Open and offers a stern test with tight fairways and strategic bunkering. The Derby Course provides a more forgiving experience perfect for higher handicappers. The resort features a luxury spa, multiple restaurants including the award-winning Ryder Grill, and the renowned PGA Golf Academy for lessons and custom fitting.",
    coordinates: { lat: 52.5808, lng: -1.7308 }
  },
  {
    id: 3,
    name: "The Vale Resort",
    region: "Wales",
    location: "Hensol, Vale of Glamorgan",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Wales National Course", "Lake Course"],
    accommodation: "The Vale Resort",
    highlights: ["Wales National Championship venue", "European Tour events", "Luxury spa", "Golf Academy", "Multiple restaurants", "Cardiff proximity"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Wales National hosts professional tournaments. Excellent corporate packages. Lake Course offers great value. Book spa treatments in advance during busy periods.",
    whyVisit: "Wales' premier golf resort featuring European Tour venue with outstanding spa facilities. The Wales National Course is a Peter Johnson design that has hosted the ISPS Handa Wales Open on the European Tour, featuring challenging water hazards and strategic bunkering across rolling countryside. The Lake Course offers a more accessible but equally enjoyable experience with beautiful lake views and mature woodland. The resort's Vale Spa is award-winning with thermal suites, treatment rooms, and relaxation areas. Located just 15 minutes from Cardiff, it offers easy access to Wales' capital city while providing a tranquil countryside setting. The resort features multiple dining options and excellent conference facilities, making it perfect for golf groups and corporate events.",
    coordinates: { lat: 51.5408, lng: -3.4108 }
  },
  {
    id: 4,
    name: "East Sussex National",
    region: "England",
    location: "Uckfield, East Sussex",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["East Course", "West Course"],
    accommodation: "Horsted Place Hotel",
    highlights: ["Two championship courses", "South Downs location", "Corporate favorite", "European Tour venue", "Extensive practice facilities", "Golf academy"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Both courses are excellent. Stay nearby at Horsted Place for luxury. The East Course hosted European Tour events. Book early for weekends and corporate events.",
    whyVisit: "Two demanding championship courses set in the beautiful South Downs countryside. The East Course is a Bob Cupp and Howard Swan design that hosted the European Open, featuring dramatic elevation changes, strategic water hazards, and immaculate conditioning. The signature 13th hole plays over a spectacular ravine with waterfalls. The West Course offers equally challenging golf with tight tree-lined fairways and elevated greens providing stunning views across the Sussex countryside. Both courses demand precision and course management, making them favorites among serious golfers and corporate groups. The resort features extensive practice facilities including a two-tier driving range, short game area, and professional coaching. Nearby Horsted Place Hotel offers luxury accommodation in a Victorian mansion setting, while the South Downs National Park provides excellent walking and cycling opportunities.",
    coordinates: { lat: 50.9708, lng: 0.0908 }
  },
  {
    id: 5,
    name: "Trump Turnberry",
    region: "Scotland",
    location: "Turnberry, Ayrshire",
    priceRange: "££££",
    duration: "3-4 days",
    courses: ["Ailsa Course", "King Robert the Bruce"],
    accommodation: "Trump Turnberry Resort",
    highlights: ["Open Championship venue", "Ailsa Craig views", "Luxury resort", "Cliff-top location", "World-class spa", "Multiple dining venues", "Historic lighthouse"],
    bestMonths: ["May", "June", "July", "August", "September"],
    difficulty: "Championship Links",
    bookingTips: "Resort packages include meals. Book well in advance for summer. The Ailsa Course is the main attraction. Weather can change quickly - pack layers.",
    whyVisit: "Dramatic clifftop links golf with luxury accommodation and stunning coastal views. The Ailsa Course is one of the world's most spectacular golf courses, hosting four Open Championships including memorable victories by Tom Watson and Greg Norman. The course features breathtaking holes along the Firth of Clyde, with views of Ailsa Craig island and the Mull of Kintyre. The famous lighthouse sits beside the 9th tee, creating one of golf's most photographed scenes. After a major renovation, the course now plays as a true championship test while maintaining its natural beauty. The King Robert the Bruce course offers an equally stunning but more accessible experience. The luxury resort features world-class dining including the 1906 restaurant, a luxury spa with treatments overlooking the sea, and opulent accommodations in the historic hotel building.",
    coordinates: { lat: 55.3108, lng: -4.8467 }
  },
  {
    id: 6,
    name: "Forest of Arden",
    region: "England",
    location: "Meriden, Warwickshire",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Arden Course", "Aylesford Course"],
    accommodation: "DoubleTree by Hilton Forest of Arden",
    highlights: ["Two championship courses", "Spa facilities", "Midlands location", "European Tour venue", "Historic parkland", "Excellent conference facilities"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Excellent for corporate groups. Golf and spa packages available. The Arden Course is championship standard. Consider midweek packages for better value.",
    whyVisit: "Convenient Midlands location with excellent golf and comprehensive resort facilities. The Arden Course is a Donald Steel design that hosted European Tour events, featuring mature parkland with strategic water hazards and undulating greens set within the ancient Forest of Arden. The course demands accuracy and strategic thinking, with the par-3 14th hole over water being particularly memorable. The Aylesford Course offers a more accessible but equally enjoyable experience with rolling fairways and scenic woodland holes. The DoubleTree hotel provides modern accommodation with excellent conference and wedding facilities, making it ideal for golf groups and corporate events. The resort's spa offers relaxation after golf, and the central Midlands location provides easy access from Birmingham, Coventry, and the M40 corridor. Additional amenities include fine dining restaurants and extensive practice facilities.",
    coordinates: { lat: 52.3408, lng: -1.7108 }
  },
  {
    id: 7,
    name: "Dundonald Links",
    region: "Scotland",
    location: "Troon, Ayrshire",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Dundonald Links"],
    accommodation: "Marine Hotel Troon, Piersland House",
    highlights: ["Modern links design", "Ayrshire coast location", "Championship venue", "Kyle Philips design", "Coastal views", "Scottish Senior Open host"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Championship Links",
    bookingTips: "Combine with other Ayrshire courses. Modern links experience. Book accommodation in Troon for easy access to multiple courses. Weather can change quickly.",
    whyVisit: "Scotland's newest championship links course with stunning coastal views and modern design. Dundonald Links is a Kyle Phillips design that opened in 2003, quickly establishing itself as one of Scotland's finest modern courses. The layout features dramatic dunes, strategic bunkering, and spectacular views over the Firth of Clyde to the Isle of Arran. Unlike traditional links, the course was built on a blank canvas, allowing for optimal hole routing and modern amenities while maintaining authentic links characteristics. The course hosted the Scottish Senior Open and has been praised for its challenging yet fair design. Each hole offers multiple route options, rewarding strategic thinking and accurate shot-making. The facility includes an excellent clubhouse with panoramic views, practice facilities, and professional coaching. Located on the Ayrshire coast, it's perfectly positioned for a links golf tour including nearby Royal Troon, Prestwick, and Western Gailes.",
    coordinates: { lat: 55.5308, lng: -4.6308 }
  },
  {
    id: 8,
    name: "Slaley Hall",
    region: "England",
    location: "Hexham, Northumberland",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Hunting Course", "Priestman Course"],
    accommodation: "Slaley Hall Hotel",
    highlights: ["Augusta of the North", "Historic mansion", "Championship courses", "Northumberland National Park", "Luxury spa", "Award-winning restaurant"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Known as 'Augusta of the North'. Beautiful Northumberland setting. The Hunting Course is the championship venue. Book spa treatments in advance.",
    whyVisit: "Experience the 'Augusta of the North' with two championship courses in stunning countryside. Slaley Hall earned its nickname through immaculate course conditioning and dramatic elevation changes reminiscent of Augusta National. The Hunting Course is a Dave Thomas design that winds through ancient woodland and across rolling Northumberland hills, featuring strategic water hazards and pristine fairways. The Priestman Course offers a more forgiving but equally scenic experience. The historic Edwardian mansion hotel provides luxury accommodation with period features and modern amenities. Located on the edge of Northumberland National Park, the resort offers easy access to Hadrian's Wall, historic castles, and the stunning Northumberland coast. The hotel features a luxury spa, award-winning Claret Jug restaurant, and beautiful grounds perfect for walks and outdoor activities.",
    coordinates: { lat: 54.9308, lng: -2.0508 }
  },
  {
    id: 9,
    name: "Foxhills",
    region: "England",
    location: "Ottershaw, Surrey",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Bernard Hunt Course", "Longcross Course", "Chertsey Course"],
    accommodation: "Foxhills Club & Resort",
    highlights: ["Three courses", "London proximity", "Luxury spa resort", "Award-winning spa", "Multiple restaurants", "Estate setting"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Resort Championship",
    bookingTips: "Three courses to choose from. Excellent spa and dining facilities. The Bernard Hunt Course is the championship venue. Book spa treatments well in advance.",
    whyVisit: "Luxury Surrey resort with three quality courses and world-class spa facilities near London. The Bernard Hunt Course is the championship layout, a challenging heathland design featuring mature pines, heather, and strategic water hazards across rolling Surrey countryside. Named after the former Ryder Cup captain, it demands accuracy and course management. The Longcross Course offers a more accessible parkland experience, while the Chertsey Course provides additional variety with shorter holes perfect for beginners or a relaxed round. The resort is renowned for its award-winning spa, featuring thermal experiences, treatment rooms, and fitness facilities. Multiple dining venues include fine dining restaurants and casual bistros. Located just 30 minutes from central London and close to Windsor, the estate setting provides a peaceful retreat while maintaining excellent accessibility. The resort also offers tennis courts, swimming pools, and extensive grounds for walking and relaxation.",
    coordinates: { lat: 51.3608, lng: -0.5308 }
  },
  {
    id: 10,
    name: "The Oxfordshire",
    region: "England",
    location: "Milton Common, Oxfordshire",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["The Oxfordshire Golf Course"],
    accommodation: "The Oxfordshire Resort",
    highlights: ["Rees Jones design", "Championship venue", "Resort facilities", "American-style layout", "Water features", "Corporate favorite"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "American-style course design. Excellent corporate facilities. Book early for tournaments and events. Consider packages with spa treatments.",
    whyVisit: "Championship golf with American-style design and excellent resort amenities in Oxfordshire. The Oxfordshire is a Rees Jones design that brought American golf course architecture to England, featuring wide fairways, large greens, extensive water hazards, and strategic bunkering. The course demands accuracy and strategic thinking, with water coming into play on multiple holes including the signature island green par-3. The layout provides a refreshing change from traditional British parkland courses, offering a taste of American resort golf. The course has hosted numerous professional tournaments and corporate events, with excellent spectator facilities and championship-standard conditioning. The resort hotel provides modern accommodation with conference facilities, spa treatments, and multiple dining options. Located conveniently between Oxford and London with easy M40 access, it's popular for corporate golf days and weekend breaks. The practice facilities include a driving range, putting green, and short game area.",
    coordinates: { lat: 51.6708, lng: -1.1608 }
  },
  {
    id: 11,
    name: "Fairmont St Andrews",
    region: "Scotland",
    location: "St Andrews, Fife",
    priceRange: "££££",
    duration: "3-4 days",
    courses: ["Torrance Course", "Kittocks Course"],
    accommodation: "Fairmont St Andrews Resort",
    highlights: ["5-star luxury", "St Andrews Bay views", "Home of Golf proximity", "World-class spa", "Multiple restaurants", "Old Course access"],
    bestMonths: ["May", "June", "July", "August", "September"],
    difficulty: "Resort Championship",
    bookingTips: "Luxury resort experience. Book spa treatments in advance. The resort can arrange Old Course tee times. Consider helicopter transfers from Edinburgh.",
    whyVisit: "Ultimate luxury golf experience with stunning views near the Home of Golf. The Fairmont St Andrews sits majestically overlooking St Andrews Bay, offering two championship courses designed by Bruce Devlin and Bob von Hagge. The Torrance Course features dramatic clifftop holes with spectacular North Sea views, while the Kittocks Course offers a more traditional Scottish links experience inland. Both courses provide challenging golf with immaculate conditioning and stunning scenery. The 5-star resort offers world-class accommodation with sea-view suites, multiple award-winning restaurants, and one of Scotland's finest spas featuring locally-inspired treatments. Located just minutes from the Old Course, guests enjoy priority access to St Andrews' historic courses and the town's golf shops and restaurants. The resort's concierge can arrange helicopter transfers, private golf lessons, and exclusive access to St Andrews' most prestigious venues. Additional amenities include indoor pool, fitness center, and extensive grounds overlooking the bay.",
    coordinates: { lat: 56.3508, lng: -2.8108 }
  },
  {
    id: 12,
    name: "St Mellion Estate",
    region: "England",
    location: "Saltash, Cornwall",
    priceRange: "££",
    duration: "2-3 days",
    courses: ["Nicklaus Signature Course", "Kernow Course"],
    accommodation: "St Mellion International Resort",
    highlights: ["Jack Nicklaus design", "Cornwall location", "Two courses", "European Tour venue", "Historic estate", "Spa facilities"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Nicklaus course is the main attraction. Beautiful Cornwall setting. The Kernow Course offers great value. Book early for summer season in Cornwall.",
    whyVisit: "Play Jack Nicklaus-designed golf in the beautiful Cornwall countryside with resort amenities. The Nicklaus Signature Course is the Golden Bear's only design in England, featuring dramatic elevation changes across the Cornish countryside with views over the Lynher Valley. This championship layout hosted European Tour events and demands strategic thinking with its undulating fairways, strategically placed bunkers, and challenging greens. The signature hole is the par-3 17th, playing over a deep valley to a well-protected green. The Kernow Course offers a more traditional parkland experience, winding through mature woodland and providing excellent value golf. The historic estate setting includes a grand country house hotel with spa facilities, multiple restaurants, and leisure amenities. Located in Cornwall's beautiful countryside, the resort provides easy access to Eden Project, coastal attractions, and charming Cornish villages. The location offers a perfect combination of championship golf and holiday atmosphere.",
    coordinates: { lat: 50.4108, lng: -4.2708 }
  },
  {
    id: 13,
    name: "Prince's Golf Club",
    region: "England",
    location: "Sandwich, Kent",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Shore Course", "Dunes Course", "Himalayas Course"],
    accommodation: "The Bell Hotel, Premier Inn Sandwich",
    highlights: ["Three links courses", "Open Championship venue", "Historic club", "Royal St George's neighbor", "Seaside location", "Golf heritage"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship Links",
    bookingTips: "All three courses excellent. Historic links golf experience. The Shore Course is championship standard. Combine with Royal St George's nearby.",
    whyVisit: "Experience three excellent links courses at this historic Open Championship venue. Prince's Golf Club sits on the same stretch of Kent coast as Royal St George's, offering 27 holes of authentic links golf across three distinct nine-hole courses. The Shore Course is the championship layout, featuring dramatic dunes, pot bunkers, and seaside winds that test every aspect of your game. The Dunes Course offers spectacular coastal views and challenging terrain, while the Himalayas Course provides a more traditional links experience. The club has a rich history dating back to 1906, hosting the 1932 Open Championship won by Gene Sarazen. The courses demand creativity and shot-making skills typical of seaside links golf. Located in the medieval town of Sandwich, golfers can explore historic streets, traditional pubs, and excellent restaurants. The nearby Royal St George's makes this area perfect for a links golf pilgrimage in the southeast of England.",
    coordinates: { lat: 51.2908, lng: 1.3708 }
  },
  {
    id: 14,
    name: "Macdonald Spey Valley Championship Resort",
    region: "Scotland",
    location: "Aviemore, Highland",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Spey Valley Championship Course"],
    accommodation: "Macdonald Aviemore Resort",
    highlights: ["Highland location", "Championship course", "Resort facilities", "Cairngorms National Park", "Mountain views", "Outdoor activities"],
    bestMonths: ["May", "June", "July", "August"],
    difficulty: "Championship",
    bookingTips: "Beautiful Highland setting. Combine with outdoor activities. Book early for summer season. Weather can be changeable - pack layers.",
    whyVisit: "Championship golf in the stunning Scottish Highlands with comprehensive resort facilities. The Spey Valley Championship Course is set against the backdrop of the Cairngorms National Park, offering breathtaking mountain views and challenging highland golf. Designed by Dave Thomas, the course features heather-lined fairways, strategic burns, and elevated greens that take full advantage of the dramatic Highland scenery. The layout demands accurate iron play and strategic course management, with the Highland winds adding an extra challenge. The Macdonald Aviemore Resort provides luxury accommodation with multiple restaurants, spa facilities, and access to outdoor pursuits including hiking, fishing, whisky distillery tours, and Highland games. Located in the heart of the Cairngorms, guests can explore Scotland's wilderness, spot wildlife, and experience traditional Highland culture. The resort offers year-round activities making it perfect for golf and adventure holidays.",
    coordinates: { lat: 57.1908, lng: -3.8308 }
  },
  {
    id: 15,
    name: "Lough Erne Resort",
    region: "Northern Ireland",
    location: "Enniskillen, County Fermanagh",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Faldo Course", "Castle Hume Course"],
    accommodation: "Lough Erne Resort",
    highlights: ["Nick Faldo design", "Lough Erne views", "Castle setting", "Lakeside location", "Thai spa", "Luxury accommodation"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Faldo Course is championship standard. Beautiful lakeside setting. Book spa treatments in advance. Consider helicopter tours of the lakes.",
    whyVisit: "Nick Faldo-designed championship golf with stunning lake views and castle accommodation. Lough Erne Resort sits on a 600-acre peninsula surrounded by the tranquil waters of Lough Erne, offering a unique championship golf experience in Northern Ireland. The Faldo Course is Sir Nick Faldo's first Irish design, featuring strategic water hazards, elevated greens, and stunning lake views throughout. The course demands precision and course management, with multiple risk-reward holes that reward brave shot-making. The Castle Hume Course offers a more accessible parkland experience while maintaining the resort's high standards. The luxury accommodation features a restored castle and modern hotel wings, all overlooking the lake. The resort's Thai spa provides unique treatments, and dining options showcase local ingredients including fresh fish from the lake. Activities include boat trips, fishing, and exploring the historic Fermanagh countryside with its ancient castles and monastic sites.",
    coordinates: { lat: 54.3408, lng: -7.6308 }
  },
  {
    id: 16,
    name: "Trump International Golf Links",
    region: "Scotland",
    location: "Balmedie, Aberdeen",
    priceRange: "££££",
    duration: "2-3 days",
    courses: ["Trump International Golf Links"],
    accommodation: "Marriott Aberdeen, DoubleTree by Hilton Aberdeen",
    highlights: ["Championship links", "North Sea coastline", "Modern design", "Spectacular dunes", "Aberdeen proximity", "Environmental restoration"],
    bestMonths: ["May", "June", "July", "August"],
    difficulty: "Championship Links",
    bookingTips: "Spectacular coastal course. Stay in Aberdeen city center. Weather can be severe - check conditions. Book tee times well in advance.",
    whyVisit: "Modern championship links golf along Scotland's dramatic North Sea coastline. Trump International Golf Links is built across spectacular sand dunes north of Aberdeen, creating one of Scotland's most dramatic golf experiences. The course features massive elevation changes, deep bunkers carved from natural dunes, and stunning views across the North Sea. Dr. Martin Hawtree's design maximizes the natural terrain, creating holes that play through towering dunes and alongside pristine beaches. The course is renowned for its environmental restoration, returning the area to natural dune ecosystem. The 4th and 14th holes offer particularly spectacular coastal views, while the finishing holes provide a dramatic conclusion with the sea as backdrop. Aberdeen offers excellent accommodation options, fine dining, and cultural attractions including the Maritime Museum and historic Old Town. The course represents modern links design at its finest, combining traditional Scottish golf with contemporary amenities.",
    coordinates: { lat: 57.2508, lng: -2.0808 }
  },
  {
    id: 17,
    name: "Carnoustie Golf Links",
    region: "Scotland",
    location: "Carnoustie, Angus",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Championship Course", "Burnside Course", "Buddon Links"],
    accommodation: "Carnoustie Golf Hotel, Station Hotel",
    highlights: ["Open Championship venue", "Golf's toughest test", "Three courses", "Historic links", "Barry Burn", "Golf museum"],
    bestMonths: ["May", "June", "September", "October"],
    difficulty: "Championship Links",
    bookingTips: "Championship Course is the main attraction. Book early for peak season. The Burnside Course offers excellent value. Consider playing all three courses over 2-3 days.",
    whyVisit: "Test yourself on one of golf's toughest Open Championship venues with three quality courses. Carnoustie Championship Course is legendary for its difficulty, earning the nickname 'Car-nasty' among professionals. The course features the infamous Barry Burn that winds throughout, most notably at the treacherous 17th and 18th holes where Jean van de Velde famously came to grief in 1999. Eight Open Championships have been held here, with winners including Ben Hogan, Gary Player, and Padraig Harrington. The Burnside Course runs parallel to the Championship layout, offering similar challenges in a more accessible format. The Buddon Links provides a traditional seaside experience with natural terrain and smaller greens. The Carnoustie Golf Hotel sits adjacent to the 1st tee, offering convenient accommodation with golf packages. The town's Golf Museum showcases the area's rich golfing heritage, and the nearby Angus coastline provides beautiful scenery and excellent seafood dining.",
    coordinates: { lat: 56.5008, lng: -2.7108 }
  },
  {
    id: 18,
    name: "Gleneagles",
    region: "Scotland",
    location: "Auchterarder, Perth",
    priceRange: "££££",
    duration: "3-4 days",
    courses: ["King's Course", "Queen's Course", "PGA Centenary"],
    accommodation: "Gleneagles Hotel",
    highlights: ["Luxury golf resort", "Three championship courses", "2014 Ryder Cup venue", "World-class spa", "Michelin-starred dining", "Country activities", "Historic estate"],
    bestMonths: ["May", "June", "July", "August", "September"],
    difficulty: "Championship",
    bookingTips: "Scotland's premier golf resort. Package deals offer best value. Book the King's Course first. Consider off-season rates for significant savings.",
    whyVisit: "Scotland's most famous golf resort with three championship courses and luxury accommodation. The King's Course is a James Braid masterpiece set in the heart of the Ochil Hills, offering panoramic views and challenging moorland golf. The Queen's Course provides a more accessible but equally scenic experience with strategic bunkering and undulating fairways. The PGA Centenary Course, designed by Jack Nicklaus, hosted the dramatic 2014 Ryder Cup where Europe secured victory. The resort epitomizes luxury with its grand Edwardian hotel, world-renowned ESPA spa, Michelin-starred Andrew Fairlie restaurant, and extensive country pursuits including falconry, fishing, and off-road driving. The estate spans 850 acres of Perthshire countryside, offering a complete luxury experience beyond golf. Additional activities include clay pigeon shooting, horseback riding, and access to the famous Gleneagles railway station for scenic Highland excursions.",
    coordinates: { lat: 56.2826, lng: -3.7442 }
  },
  {
    id: 19,
    name: "Dalmahoy Hotel & Country Club",
    region: "Scotland",
    location: "Kirknewton, Edinburgh",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["East Course", "West Course"],
    accommodation: "Dalmahoy Hotel & Country Club",
    highlights: ["Edinburgh proximity", "Two courses", "Marriott resort", "Georgian mansion", "Pentland Hills views", "City access"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Resort Championship",
    bookingTips: "Convenient for Edinburgh visits. East Course is championship standard. Book restaurant reservations early. Excellent for combining golf with city sightseeing.",
    whyVisit: "Quality golf resort just outside Edinburgh with two courses and excellent facilities. Dalmahoy sits in 1,000 acres of countryside just 20 minutes from Edinburgh city center, offering the perfect combination of championship golf and urban accessibility. The East Course is a James Braid design that has hosted professional tournaments, featuring mature parkland with strategic bunkering and undulating greens set against the backdrop of the Pentland Hills. The West Course provides a more accessible but equally scenic experience with shorter holes and forgiving fairways. The Georgian mansion hotel offers elegant accommodation with period features, multiple restaurants, and comprehensive conference facilities. The resort's location makes it ideal for exploring Edinburgh's historic Royal Mile, Edinburgh Castle, and cultural attractions. Spa facilities, indoor pool, and leisure amenities provide relaxation after golf. The combination of quality golf, luxury accommodation, and easy access to one of Europe's most beautiful cities makes Dalmahoy perfect for weekend breaks and extended stays.",
    coordinates: { lat: 55.8708, lng: -3.4308 }
  },
  {
    id: 20,
    name: "Carden Park Hotel, Golf Resort & Spa",
    region: "England",
    location: "Chester, Cheshire",
    priceRange: "£££",
    duration: "2-3 days",
    courses: ["Cheshire Course", "Nicklaus Course"],
    accommodation: "Carden Park Hotel",
    highlights: ["Jack Nicklaus design", "Chester proximity", "Luxury spa", "1,000-acre estate", "Multiple restaurants", "Historic city access"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Championship",
    bookingTips: "Nicklaus Course is championship standard. Excellent spa facilities. Book spa treatments in advance. Perfect base for exploring Chester's historic attractions.",
    whyVisit: "Championship golf with Jack Nicklaus design near historic Chester with luxury spa. Carden Park sits on a magnificent 1,000-acre estate in the Cheshire countryside, just minutes from the historic Roman city of Chester. The Nicklaus Course is one of the Golden Bear's finest European designs, featuring strategic water hazards, undulating fairways, and challenging greens that demand precision and course management. The signature hole is the par-3 17th, playing over water to a well-protected green. The Cheshire Course offers a more traditional parkland experience with mature trees and rolling terrain. The luxury hotel provides elegant accommodation, award-winning restaurants, and one of the UK's finest spas featuring thermal experiences and extensive treatment menus. Chester's Roman walls, medieval architecture, unique covered galleries (The Rows), and excellent shopping are just 10 minutes away. The resort also offers extensive grounds for walking, cycling, and outdoor activities.",
    coordinates: { lat: 53.0908, lng: -2.7808 }
  },
  {
    id: 21,
    name: "Thorpeness Hotel and Golf Club",
    region: "England",
    location: "Thorpeness, Suffolk",
    priceRange: "£",
    duration: "2-3 days",
    courses: ["Thorpeness Golf Course"],
    accommodation: "Thorpeness Hotel",
    highlights: ["Heathland course", "Coastal location", "Historic village", "James Braid design", "Suffolk coast", "Traditional atmosphere"],
    bestMonths: ["April", "May", "September", "October"],
    difficulty: "Traditional",
    bookingTips: "Charming traditional course. Stay on-site at the hotel for convenience. Book early for summer season. Explore the unique village and coastal walks.",
    whyVisit: "Traditional heathland golf in a charming Suffolk coastal village with character accommodation. Thorpeness Golf Course is a James Braid design from 1922, offering authentic traditional golf across natural heathland terrain. The course features gorse-lined fairways, natural hazards, and small undulating greens that reward precision and local knowledge. The layout winds through heather and bracken, providing a quintessentially English golf experience reminiscent of golf's earlier days. The nearby Suffolk coast offers beautiful beaches, and the village of Thorpeness is famous for its unique architecture including the distinctive House in the Clouds water tower. The Thorpeness Hotel provides comfortable accommodation with period character and excellent local cuisine featuring fresh Suffolk produce and North Sea seafood. The area offers excellent walking, birdwatching, and exploring historic sites including nearby Aldeburgh and its famous music festival. This represents excellent value traditional golf in one of England's most charming coastal settings.",
    coordinates: { lat: 52.1708, lng: 1.5908 }
  }
]

const priceRanges = [
  { range: "£", description: "Budget-friendly golf breaks", count: 1 },
  { range: "££", description: "Excellent value golf breaks", count: 3 },
  { range: "£££", description: "Premium golf experiences", count: 13 },
  { range: "££££", description: "Luxury golf resorts", count: 4 }
]

export default function BestGolfBreaksUK() {
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
              "headline": "Best Golf Breaks in the UK 2025: 21 Top Golf Holidays Scotland England Wales",
              "description": "Discover 21 best golf breaks UK 2025. Celtic Manor, Gleneagles, Trump Turnberry + 18 more. Championship courses, luxury resorts, pricing guide. Book your perfect UK golf holiday.",
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
              "datePublished": "2025-01-01T00:00:00.000Z",
              "dateModified": "2025-01-01T00:00:00.000Z",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://weltongolf.com/blog/best-golf-breaks-uk"
              },
              "image": {
                "@type": "ImageObject",
                "url": "https://weltongolf.com/images/uk-golf-breaks-2025.jpg",
                "width": 1200,
                "height": 630,
                "caption": "Best Golf Breaks UK 2025 - Celtic Manor, Gleneagles, Championship Courses"
              },
              "about": [
                {
                  "@type": "Place",
                  "name": "United Kingdom",
                  "description": "Golf destinations across England, Scotland, Wales, and Northern Ireland"
                },
                {
                  "@type": "SportsActivityLocation",
                  "name": "Golf Courses UK",
                  "description": "Championship and resort golf courses in the United Kingdom"
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
              "wordCount": 8000,
              "inLanguage": "en-GB",
              "keywords": "golf breaks UK 2025, best golf holidays UK, championship golf courses, luxury golf resorts, ryder cup venues",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", ".price-guide"]
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "TravelGuide",
              "name": "UK Golf Breaks Guide 2025",
              "description": "Complete guide to the best golf breaks and holidays in the United Kingdom",
              "about": {
                "@type": "Place",
                "name": "United Kingdom",
                "description": "Golf destinations across England, Scotland, Wales, and Northern Ireland"
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
                  "name": "What's the best time of year for a UK golf break?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The best months are May, June, September, and October. These offer the ideal combination of good weather, reasonable prices, and course availability. July and August are peak season with highest prices but longest days."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What should I budget for a UK golf break?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our pricing guide uses £ symbols: £ (under £300) for budget-friendly breaks, ££ (£300-£500) for excellent value, £££ (£500-£900) for premium experiences, and ££££ (£900+) for luxury resorts."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need a handicap certificate for UK golf courses?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most championship and private courses require a valid handicap certificate. Maximum handicaps are typically 28 for men and 36 for women. Resort and municipal courses are usually more flexible."
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
              Best Golf Breaks in the UK 2025
            </h1>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto mb-8">
              Discover the ultimate guide to Britain's finest golf holidays and weekend breaks. From Scotland's legendary championship
              links courses and Open Championship venues to England's luxury golf resorts and spa hotels, Wales' spectacular
              Ryder Cup courses, and Northern Ireland's hidden gems, we've curated the top 21 golf breaks in the UK for 2025.
              Perfect for golf weekends, corporate golf days, and luxury golf vacations.
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
              <Link href="#uk-golf-breaks" className="text-blue-600 hover:underline">1. Top UK Golf Breaks</Link>
              <Link href="#price-guide" className="text-blue-600 hover:underline">2. Price Guide & Budget Tips</Link>
              <Link href="#booking-tips" className="text-blue-600 hover:underline">3. Booking Tips & Best Times</Link>
              <Link href="#planning-tools" className="text-blue-600 hover:underline">4. Golf Trip Planning Tools</Link>
              <Link href="#faqs" className="text-blue-600 hover:underline">5. Frequently Asked Questions</Link>
            </div>
          </Card>

          {/* Featured Snippet Optimized Summary */}
          <Card className="p-8 mb-8 bg-gradient-to-r from-green-50 to-blue-50">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              UK Golf Breaks 2025: Quick Guide
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">🏆 Top UK Golf Destinations</h3>
                <ol className="text-slate-700 space-y-1">
                  <li><strong>1. Celtic Manor Resort</strong> - 2010 Ryder Cup venue, Wales</li>
                  <li><strong>2. Gleneagles</strong> - Scotland's premier luxury golf resort</li>
                  <li><strong>3. Trump Turnberry</strong> - Open Championship clifftop links</li>
                  <li><strong>4. The Belfry</strong> - Four-time Ryder Cup host, England</li>
                  <li><strong>5. Carnoustie Golf Links</strong> - "Golf's toughest test"</li>
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">💰 Golf Break Pricing 2025</h3>
                <ul className="text-slate-700 space-y-1">
                  <li><strong>£ Budget (Under £300):</strong> 1 destination</li>
                  <li><strong>££ Value (£300-£500):</strong> 3 destinations</li>
                  <li><strong>£££ Premium (£500-£900):</strong> 13 destinations</li>
                  <li><strong>££££ Luxury (£900+):</strong> 4 destinations</li>
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
              When is the best time for UK golf breaks?
            </h3>
            <div className="text-slate-700">
              <p className="mb-4">
                <strong>The best months for UK golf breaks are May, June, September, and October.</strong> These months offer:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Optimal weather:</strong> Mild temperatures (15-20°C) and less rainfall</li>
                <li><strong>Better value:</strong> 20-30% cheaper than peak summer months</li>
                <li><strong>Course availability:</strong> Easier booking at championship venues</li>
                <li><strong>Ideal conditions:</strong> Firm fairways and good greens conditions</li>
              </ul>
              <p className="text-sm bg-yellow-50 p-3 rounded">
                💡 <strong>Pro tip:</strong> July-August are peak season (highest prices, longest days). November-March offer lowest prices but unpredictable weather.
              </p>
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
                quality for golf enthusiasts worldwide. From championship links courses that have hosted The Open Championship
                to luxury resort experiences and historic venues steeped in golf heritage, a UK golf break provides experiences you simply
                cannot find anywhere else in the world.
              </p>
              <p className="mb-4">
                What makes UK golf breaks special? <strong>Accessibility, heritage, and diversity.</strong> You can
                play legendary Ryder Cup venues, championship links courses, and luxury resort golf all within a compact area.
                Whether you're seeking the ultimate links challenge on Scotland's rugged coastline or a luxury spa resort experience
                in the English countryside, the UK delivers world-class golf tourism.
              </p>
              <p>
                Our comprehensive guide covers <strong>21 carefully selected golf breaks</strong> representing the
                best value, most memorable experiences, and highest quality golf across England, Scotland, Wales, and Northern Ireland.
                Each destination has been chosen for its combination of outstanding championship golf,
                excellent luxury accommodation, and overall golf holiday experience quality. From budget-friendly traditional courses
                to exclusive luxury golf resorts, we've included options for every golfer and budget.
              </p>
            </div>
          </Card>

          {/* UK Golf Breaks */}
          <section id="uk-golf-breaks" className="mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 font-cooper">
              Top UK Golf Breaks for 2025
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              From Scotland's legendary championship links courses and Open Championship venues to England's luxury resort venues and spa hotels,
              Wales' premier golf destinations including Ryder Cup courses, and Northern Ireland's stunning lakeside courses,
              discover the UK's finest golf break destinations that combine world-class championship golf with exceptional luxury accommodation,
              award-winning spas, fine dining, and unforgettable golf holiday experiences. Each golf break includes greens fees,
              luxury accommodation, breakfast, and resort facilities.
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
                          <Link href="/golf-trip-planner">Plan This Trip</Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/course-directory">Find Courses</Link>
                        </Button>
                      </div>

                      <div>
                        <img
                          src={resortImages[golfBreak.name as keyof typeof resortImages] || '/images/placeholder-golf-resort.jpg'}
                          alt={`${golfBreak.name} - Golf Resort`}
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                          loading="lazy"
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
                UK Golf Break Price Guide 2025
              </h2>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Price Guide Explanation</h3>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2" style={{color: '#183a37'}}>£</div>
                    <div className="font-semibold">Under £300</div>
                    <div className="text-slate-600">Budget-friendly</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2" style={{color: '#183a37'}}>££</div>
                    <div className="font-semibold">£300-£500</div>
                    <div className="text-slate-600">Excellent value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2" style={{color: '#183a37'}}>£££</div>
                    <div className="font-semibold">£500-£900</div>
                    <div className="text-slate-600">Premium experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2" style={{color: '#183a37'}}>££££</div>
                    <div className="font-semibold">£900+</div>
                    <div className="text-slate-600">Luxury resorts</div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-4 text-center">
                  *Prices are per person for 2-3 day packages including accommodation, breakfast, and golf rounds
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {priceRanges.map((range, index) => (
                  <div key={index} className="bg-slate-100 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-2" style={{color: '#183a37'}}>
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
                  What&apos;s Included in Golf Break Prices?
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
                      <h4 className="font-semibold text-slate-900">Championship Courses (6+ months ahead)</h4>
                      <p className="text-sm">Gleneagles, Trump Turnberry, Carnoustie - these require advance planning</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Resort Courses (3-4 months ahead)</h4>
                      <p className="text-sm">Celtic Manor, The Belfry, Forest of Arden - package deals often available</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Hidden Gems (1-2 months ahead)</h4>
                      <p className="text-sm">Thorpeness, East Sussex National - excellent value with shorter lead times</p>
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
                    What&apos;s the best time of year for a UK golf break?
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
                    For premium courses like Gleneagles or Trump Turnberry, book 6+ months ahead. Resort
                    courses can be booked 3-4 months in advance, while traditional courses may only need
                    1-2 months lead time.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    What should I budget for a UK golf break?
                  </h3>
                  <p className="text-slate-700">
                    Our pricing guide uses £ symbols: £ (under £300) for budget-friendly breaks, ££ (£300-£500) for
                    excellent value, £££ (£500-£900) for premium experiences, and ££££ (£900+) for luxury
                    resorts. This includes accommodation, golf, breakfast, and resort facilities. Add transport, meals, and equipment hire separately.
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
                    What&apos;s included in a typical golf break package?
                  </h3>
                  <p className="text-slate-700">
                    Standard packages include accommodation, breakfast, and greens fees for featured courses.
                    Premium packages may add meals, spa access, equipment hire, and transfers. Always check
                    what&apos;s included before booking.
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
              your ideal UK golf break. From Celtic Manor to Gleneagles, your perfect golf
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