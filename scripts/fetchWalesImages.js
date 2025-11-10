// Script to fetch Wales golf course images and save URLs to avoid repeated API calls
const fs = require('fs')
const path = require('path')

const GOOGLE_API_KEY = 'AIzaSyC03zTtfTKzfvVGOvTpNnK5qqeJq4JAcqc'

const walesCourses = {
  'Celtic Manor Resort': 'Celtic Manor Resort Newport South Wales',
  'The Vale Resort': 'Vale Resort Hensol Vale of Glamorgan Wales',
  'St. Pierre Country Club': 'St Pierre Country Club Chepstow Monmouthshire Wales',
  'Royal St David\'s Golf Club': 'Royal St Davids Golf Club Harlech Gwynedd Wales',
  'Nefyn Golf Club': 'Nefyn Golf Club Gwynedd Wales',
  'Royal Porthcawl Golf Club': 'Royal Porthcawl Golf Club Bridgend Wales',
  'Langland Bay Golf Club': 'Langland Bay Golf Club Swansea Wales',
  'Pennard Golf Club': 'Pennard Golf Club Southgate Swansea Gower Wales',
  'Rolls of Monmouth Golf Club': 'Rolls of Monmouth Golf Club Monmouthshire Wales',
  'Conwy Golf Club': 'Conwy Golf Club Gwynedd North Wales',
  'Aberdovey Golf Club': 'Aberdovey Golf Club Aberdyfi Gwynedd Wales',
  'Tenby Golf Club': 'Tenby Golf Club Pembrokeshire Wales',
  'Maesdu Golf Club': 'Maesdu Golf Club Llandudno Conwy Wales',
  'Southerndown Golf Club': 'Southerndown Golf Club Bridgend Vale of Glamorgan Wales',
  'Pyle & Kenfig Golf Club': 'Pyle Kenfig Golf Club Bridgend Wales'
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

async function fetchWalesImages() {
  const imageUrls = {}
  let apiCalls = 0

  console.log('Starting to fetch Wales golf course images...')
  console.log(`Total courses: ${Object.keys(walesCourses).length}`)

  for (const [courseName, query] of Object.entries(walesCourses)) {
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
  const outputPath = path.join(__dirname, '../src/data/walesImages.json')

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
  fetchWalesImages()
    .then(() => {
      console.log('Script completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Script failed:', error)
      process.exit(1)
    })
}

module.exports = { fetchWalesImages }