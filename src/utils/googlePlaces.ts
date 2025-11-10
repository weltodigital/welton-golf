// Google Places API utility for fetching resort images
const GOOGLE_API_KEY = 'AIzaSyC03zTtfTKzfvVGOvTpNnK5qqeJq4JAcqc'

export interface PlacePhoto {
  photo_reference: string
  height: number
  width: number
}

export interface PlaceResult {
  place_id: string
  name: string
  photos?: PlacePhoto[]
  rating?: number
  formatted_address?: string
}

// Find place by name and location
export async function findPlace(query: string): Promise<PlaceResult | null> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,photos,rating,formatted_address&key=${GOOGLE_API_KEY}`
    )

    const data = await response.json()

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0]
    }

    return null
  } catch (error) {
    console.error('Error finding place:', error)
    return null
  }
}

// Get photo URL from photo reference
export function getPhotoUrl(photoReference: string, maxWidth: number = 800): string {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`
}

// Get place details including photos
export async function getPlaceDetails(placeId: string): Promise<PlaceResult | null> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,photos,rating,formatted_address&key=${GOOGLE_API_KEY}`
    )

    const data = await response.json()

    if (data.result) {
      return data.result
    }

    return null
  } catch (error) {
    console.error('Error getting place details:', error)
    return null
  }
}

// Resort-specific queries for better results
export const resortQueries = {
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

// Fetch image for a specific resort
export async function getResortImage(resortName: string): Promise<string | null> {
  const query = resortQueries[resortName as keyof typeof resortQueries] || resortName

  try {
    const place = await findPlace(query)

    if (place && place.photos && place.photos.length > 0) {
      return getPhotoUrl(place.photos[0].photo_reference, 800)
    }

    return null
  } catch (error) {
    console.error(`Error fetching image for ${resortName}:`, error)
    return null
  }
}

// Batch fetch images for all resorts (use sparingly to minimize API costs)
export async function batchFetchResortImages(): Promise<Record<string, string>> {
  const imageUrls: Record<string, string> = {}

  for (const [resortName, query] of Object.entries(resortQueries)) {
    try {
      const imageUrl = await getResortImage(resortName)
      if (imageUrl) {
        imageUrls[resortName] = imageUrl
        console.log(`✓ Found image for ${resortName}`)
      } else {
        console.log(`✗ No image found for ${resortName}`)
      }

      // Add delay to avoid hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 100))
    } catch (error) {
      console.error(`Error fetching image for ${resortName}:`, error)
    }
  }

  return imageUrls
}