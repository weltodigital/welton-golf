// Script to fetch Bournemouth golf course images and save URLs to avoid repeated API calls
const fs = require('fs')
const path = require('path')

const GOOGLE_API_KEY = 'AIzaSyC03zTtfTKzfvVGOvTpNnK5qqeJq4JAcqc'

const bournemouthCourses = {
  'Ferndown Golf Club': 'Ferndown Golf Club Dorset',
  'Broadstone Golf Club': 'Broadstone Golf Club Poole Dorset',
  'Barton-on-Sea Golf Club': 'Barton-on-Sea Golf Club New Milton Hampshire',
  'The Dorset Golf & Country Club Resort': 'Dorset Golf Country Club Resort Bere Regis',
  'Remedy Oak Golf Club': 'Remedy Oak Golf Club Woodlands Southampton',
  'Parkstone Golf Club': 'Parkstone Golf Club Poole Dorset',
  'Isle Of Purbeck Golf Club': 'Isle of Purbeck Golf Club Studland Dorset',
  'Ashley Wood Golf Club': 'Ashley Wood Golf Club Blandford Forum Dorset'
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

async function fetchBournemouthImages() {
  const imageUrls = {}
  let apiCalls = 0

  console.log('Starting to fetch Bournemouth golf course images...')
  console.log(`Total courses: ${Object.keys(bournemouthCourses).length}`)

  for (const [courseName, query] of Object.entries(bournemouthCourses)) {
    try {
      console.log(`Fetching ${courseName}...`)

      const place = await findPlace(query)
      apiCalls++

      if (place && place.photos && place.photos.length > 0) {
        const imageUrl = getPhotoUrl(place.photos[0].photo_reference, 800)
        imageUrls[courseName] = imageUrl
        console.log(`✓ Found image for ${courseName}`)
      } else {
        console.log(`✗ No image found for ${courseName}`)
        imageUrls[courseName] = null
      }

      // Add delay to avoid hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 200))

    } catch (error) {
      console.error(`Error fetching image for ${courseName}:`, error)
      imageUrls[courseName] = null
    }
  }

  // Save results to file
  const outputPath = path.join(__dirname, '../src/data/bournemouthImages.json')

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
  fetchBournemouthImages()
    .then(() => {
      console.log('Script completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Script failed:', error)
      process.exit(1)
    })
}

module.exports = { fetchBournemouthImages }