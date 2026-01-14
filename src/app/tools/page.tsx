import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calculator, TrendingUp, Ruler, Settings, MapPin, Clock, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Golf Tools & Calculators - Free Professional Golf Apps | Welton Golf',
  description: 'Complete collection of free golf tools and calculators. WHS handicap calculator, swing speed, club fitting, stableford, and distance calculators. All professional-grade and free to use.',
  keywords: 'golf tools, golf calculators, WHS handicap calculator, swing speed calculator, club fitting calculator, stableford calculator, golf apps UK, free golf tools',
  openGraph: {
    title: 'Golf Tools & Calculators - Free Professional Golf Apps | Welton Golf',
    description: 'Complete collection of free golf tools and calculators for improving your game and tracking performance.',
    type: 'website',
    url: 'https://www.weltongolf.com/tools',
    images: [
      {
        url: 'https://www.weltongolf.com/golf-tools-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Golf Tools and Calculators',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools',
  },
}

const toolCategories = [
  {
    id: 'handicap',
    title: 'Handicap & Scoring',
    icon: Calculator,
    description: 'Track your handicap and scoring performance with WHS-compliant calculators',
    color: 'emerald',
    tools: [
      {
        title: 'WHS Handicap Calculator',
        slug: 'handicap-calculator',
        description: 'Calculate your official World Handicap System index with up to 20 rounds',
        featured: true
      },
      {
        title: 'Course Handicap Calculator',
        slug: 'course-handicap-calculator',
        description: 'Convert your handicap index to course handicap for any tee'
      },
      {
        title: 'Stableford Calculator',
        slug: 'stableford-calculator',
        description: 'Calculate Stableford points based on your handicap and scores'
      },
      {
        title: 'Strokes Gained Calculator',
        slug: 'strokes-gained-calculator',
        description: 'Analyze your performance with advanced strokes gained metrics'
      }
    ]
  },
  {
    id: 'distance',
    title: 'Distance & Performance',
    icon: TrendingUp,
    description: 'Optimize your distance and analyze swing performance',
    color: 'blue',
    tools: [
      {
        title: 'Swing Speed Calculator',
        slug: 'swing-speed-calculator',
        description: 'Calculate swing speed from ball speed and smash factor',
        featured: true
      },
      {
        title: 'Ball Speed Calculator',
        slug: 'ball-speed-calculator',
        description: 'Determine optimal ball speed for your swing'
      },
      {
        title: 'Club Distance Calculator',
        slug: 'club-distance-calculator',
        description: 'Calculate expected distances for each club in your bag'
      },
      {
        title: 'Range Ball Distance Calculator',
        slug: 'range-ball-distance-calculator',
        description: 'Adjust for range ball distance differences vs course balls'
      },
      {
        title: 'Altitude Distance Calculator',
        slug: 'altitude-distance-calculator',
        description: 'Calculate distance changes at different altitudes'
      },
      {
        title: 'Wind & Elevation Adjuster',
        slug: 'wind-elevation-adjuster',
        description: 'Adjust club selection for wind and elevation changes'
      }
    ]
  },
  {
    id: 'equipment',
    title: 'Equipment & Fitting',
    icon: Wrench,
    description: 'Get fitted properly with club specification calculators',
    color: 'purple',
    tools: [
      {
        title: 'Club Fitting Estimator',
        slug: 'club-fitting-estimator',
        description: 'Get personalized club fitting recommendations',
        featured: true
      },
      {
        title: 'Club Length Calculator',
        slug: 'club-length-calculator',
        description: 'Determine optimal club length based on your measurements'
      },
      {
        title: 'Grip Size Calculator',
        slug: 'grip-size-calculator',
        description: 'Find the perfect grip size for your hands'
      },
      {
        title: 'Shaft Flex Calculator',
        slug: 'shaft-flex-calculator',
        description: 'Determine the right shaft flex for your swing speed'
      }
    ]
  },
  {
    id: 'planning',
    title: 'Course & Planning',
    icon: MapPin,
    description: 'Plan your rounds and golf trips with course tools',
    color: 'green',
    tools: [
      {
        title: 'Tee Recommendation Calculator',
        slug: 'tee-recommendation-calculator',
        description: 'Find the best tees for your skill level and distance'
      },
      {
        title: 'Playing Time Estimator',
        slug: 'playing-time-estimator',
        description: 'Estimate how long your round will take'
      },
      {
        title: 'Golf Trip Planner',
        slug: 'golf-trip-planner',
        description: 'Plan comprehensive golf trips with courses and accommodation'
      }
    ]
  }
]

const getColorClasses = (color: string) => {
  const colors = {
    emerald: {
      bg: 'bg-emerald-100',
      text: 'text-brand-primary',
      border: 'border-emerald-200',
      hover: 'hover:border-emerald-300'
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:border-blue-300'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-200',
      hover: 'hover:border-purple-300'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-200',
      hover: 'hover:border-green-300'
    }
  }
  return colors[color as keyof typeof colors] || colors.emerald
}

export default function ToolsPage() {
  const allTools = toolCategories.flatMap(category =>
    category.tools.map(tool => ({ ...tool, category: category.title }))
  )
  const featuredTools = allTools.filter(tool => tool.featured)

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Golf Tools & Calculators",
            "description": "Complete collection of free golf tools and calculators for improving your game and tracking performance.",
            "url": "https://www.weltongolf.com/tools",
            "publisher": {
              "@type": "Organization",
              "name": "Welton Golf",
              "url": "https://www.weltongolf.com"
            },
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "Golf Tools & Calculators Suite",
              "description": "Professional golf calculators and tools for handicap tracking, performance analysis, and equipment fitting.",
              "applicationCategory": "Sports",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "GBP"
              }
            }
          })
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 max-w-7xl">


          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Calculator className="h-6 w-6 text-brand-primary" />
              </div>
              <h1 className="text-5xl font-bold text-slate-900">
                Golf Tools & Calculators
              </h1>
            </div>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto">
              Professional-grade golf tools and calculators to improve your game, track performance,
              and optimize equipment. All tools are free to use, mobile-friendly, and follow
              official golf standards including the World Handicap System.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <div className="bg-emerald-50 rounded-lg p-4 text-center border border-emerald-200">
              <div className="text-3xl font-bold text-brand-primary">{allTools.length}</div>
              <div className="text-emerald-800 font-medium">Total Tools</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-blue-800 font-medium">Free Forever</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
              <div className="text-3xl font-bold text-purple-600">WHS</div>
              <div className="text-purple-800 font-medium">Compliant</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <div className="text-green-800 font-medium">Available</div>
            </div>
          </div>

          {/* Featured Tools */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Most Popular Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredTools.map((tool) => {
                const colorClasses = getColorClasses('emerald')
                return (
                  <Card key={tool.slug} className={`border-2 ${colorClasses.border} ${colorClasses.hover} transition-colors`}>
                    <CardHeader className="text-center">
                      <div className={`w-12 h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <Calculator className={`h-6 w-6 ${colorClasses.text}`} />
                      </div>
                      <CardTitle className="text-xl">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full bg-brand-primary hover:bg-brand-dark">
                        <Link href={`/tools/${tool.slug}`}>
                          Use Tool
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Tool Categories */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              All Golf Tools by Category
            </h2>

            <div className="space-y-12">
              {toolCategories.map((category) => {
                const colorClasses = getColorClasses(category.color)
                const IconComponent = category.icon

                return (
                  <div key={category.id}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center`}>
                        <IconComponent className={`h-6 w-6 ${colorClasses.text}`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{category.title}</h3>
                        <p className="text-slate-600">{category.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.tools.map((tool) => (
                        <Card key={tool.slug} className={`border ${colorClasses.border} ${colorClasses.hover} transition-colors`}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              {tool.title}
                              {tool.featured && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                  Popular
                                </span>
                              )}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {tool.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <Button asChild variant="outline" className="w-full">
                              <Link href={`/tools/${tool.slug}`}>
                                Use Calculator
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16">
            <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Start Improving Your Golf Game Today
                </h3>
                <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                  Use our professional golf tools to track your handicap, analyze performance,
                  and optimize your equipment. All tools are completely free and designed
                  to help golfers of all levels improve their game.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-brand-primary hover:bg-brand-dark">
                    <Link href="/tools/handicap-calculator">
                      Calculate Your Handicap
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/">
                      Read Golf Tips
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </>
  )
}