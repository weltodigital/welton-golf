// One-time script to fetch resort images and save URLs to avoid repeated API calls
const fs = require('fs')
const path = require('path')

const GOOGLE_API_KEY = 'AIzaSyC03zTtfTKzfvVGOvTpNnK5qqeJq4JAcqc'

const resortQueries = {
  'Celtic Manor Resort': 'Celtic Manor Resort Newport Wales',
  'The Belfry': 'The Belfry Hotel Golf Resort Sutton Coldfield',
  'The Vale Resort': 'The Vale Resort Hensol Wales',
  'East Sussex National': 'East Sussex National Golf Resort Uckfield',
  'Trump Turnberry': 'Trump Turnberry Resort Scotland',
  'Forest of Arden': 'Forest of Arden Golf Resort Meriden',
  'Dundonald Links': 'Dundonald Links Golf Course Troon',
  'Slaley Hall': 'Slaley Hall Hotel Golf Resort Hexham',
  'Foxhills': 'Foxhills Club Resort Surrey',
  'The Oxfordshire': 'The Oxfordshire Golf Hotel Resort',
  'Fairmont St Andrews': 'Fairmont St Andrews Scotland',
  'St Mellion Estate': 'St Mellion International Resort Cornwall',
  'Prince\'s Golf Club': 'Prince\'s Golf Club Sandwich Kent',
  'Macdonald Spey Valley Championship Resort': 'Macdonald Spey Valley Resort Aviemore',
  'Lough Erne Resort': 'Lough Erne Resort Enniskillen',
  'Trump International Golf Links': 'Trump International Golf Links Aberdeen',
  'Carnoustie Golf Links': 'Carnoustie Golf Links Scotland',
  'Gleneagles': 'Gleneagles Hotel Resort Scotland',
  'Dalmahoy Hotel & Country Club': 'Dalmahoy Hotel Country Club Edinburgh',
  'Carden Park Hotel, Golf Resort & Spa': 'Carden Park Hotel Golf Resort Chester',
  'Thorpeness Hotel and Golf Club': 'Thorpeness Hotel Golf Club Suffolk'
}

async function findPlace(query) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,photos&key=${GOOGLE_API_KEY}`
    )

    const data = await response.json()
    return data.candidates && data.candidates.length > 0 ? data.candidates[0] : null
  } catch (error) {
    console.error('Error finding place:', error)
    return null
  }
}

function getPhotoUrl(photoReference, maxWidth = 800) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`
}

async function fetchAllImages() {
  const imageUrls = {}
  let apiCalls = 0

  console.log('Starting to fetch resort images...')
  console.log(`Total resorts: ${Object.keys(resortQueries).length}`)

  for (const [resortName, query] of Object.entries(resortQueries)) {
    try {
      console.log(`Fetching ${resortName}...`)

      const place = await findPlace(query)
      apiCalls++

      if (place && place.photos && place.photos.length > 0) {
        const imageUrl = getPhotoUrl(place.photos[0].photo_reference, 800)
        imageUrls[resortName] = imageUrl
        console.log(`✓ Found image for ${resortName}`)
      } else {
        console.log(`✗ No image found for ${resortName}`)
        imageUrls[resortName] = null
      }

      // Add delay to avoid hitting rate limits (be respectful to the API)
      await new Promise(resolve => setTimeout(resolve, 200))

    } catch (error) {
      console.error(`Error fetching image for ${resortName}:`, error)
      imageUrls[resortName] = null
    }
  }

  // Save results to file
  const outputPath = path.join(__dirname, '../src/data/resortImages.json')

  // Ensure directory exists
  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(outputPath, JSON.stringify(imageUrls, null, 2))

  console.log(`\n✅ Completed! Results saved to: ${outputPath}`)
  console.log(`📊 API calls made: ${apiCalls}`)
  console.log(`📸 Images found: ${Object.values(imageUrls).filter(url => url !== null).length}`)
  console.log(`❌ Images not found: ${Object.values(imageUrls).filter(url => url === null).length}`)

  return imageUrls
}

// Run the script
if (require.main === module) {
  fetchAllImages()
    .then(() => {
      console.log('Script completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Script failed:', error)
      process.exit(1)
    })
}

module.exports = { fetchAllImages }