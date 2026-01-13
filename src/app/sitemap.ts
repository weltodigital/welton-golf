import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const recentDate = new Date('2025-12-01') // Use a realistic past date

  return [
    {
      url: 'https://www.weltongolf.com',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.weltongolf.com/course-directory',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Blog Articles
    {
      url: 'https://www.weltongolf.com/blog/best-golf-breaks-uk',
      lastModified: recentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.weltongolf.com/blog/best-golf-breaks-wales',
      lastModified: recentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.weltongolf.com/blog/best-golf-breaks-bournemouth',
      lastModified: recentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.weltongolf.com/blog/how-to-break-80-golf',
      lastModified: recentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.weltongolf.com/blog/how-to-break-90-golf',
      lastModified: recentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.weltongolf.com/blog/how-to-break-100-golf',
      lastModified: recentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Handicap & Scoring Calculators
    {
      url: 'https://www.weltongolf.com/handicap-calculator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.weltongolf.com/course-handicap-calculator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.weltongolf.com/stableford-calculator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.weltongolf.com/strokes-gained-calculator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Distance & Performance Calculators
    {
      url: 'https://www.weltongolf.com/ball-speed-calculator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.weltongolf.com/swing-speed-calculator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.weltongolf.com/club-distance-calculator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://www.weltongolf.com/range-ball-distance-calculator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://www.weltongolf.com/altitude-distance-calculator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://www.weltongolf.com/wind-elevation-adjuster',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    // Equipment & Fitting Calculators
    {
      url: 'https://www.weltongolf.com/club-fitting-estimator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.weltongolf.com/club-length-calculator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://www.weltongolf.com/grip-size-calculator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://www.weltongolf.com/shaft-flex-calculator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Course & Planning Tools
    {
      url: 'https://www.weltongolf.com/tee-recommendation-calculator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://www.weltongolf.com/playing-time-estimator',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://www.weltongolf.com/golf-trip-planner',
      lastModified: recentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Legal Pages
    {
      url: 'https://www.weltongolf.com/privacy-policy',
      lastModified: recentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://www.weltongolf.com/terms-of-service',
      lastModified: recentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}