import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Target, TrendingUp, Clock, Users, BarChart3, Calendar, MapPin, Lightbulb } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Break 100 in Golf: Beginner's Complete Guide to Sub-100 Golf",
  description: "Break 100 for the first time with our simple 6-step system. Essential golf tips for beginners focusing on fundamentals and course strategy.",
  keywords: "how to break 100 in golf, beginner golf tips, golf for beginners, break 100 golf guide, golf fundamentals, beginner golf instruction, golf basics",
  authors: [{ name: "Welton Golf" }],
  openGraph: {
    title: "How to Break 100 in Golf: Beginner's Complete Guide to Sub-100 Golf",
    description: "Break 100 for the first time with our simple 6-step system. Essential golf tips for beginners focusing on fundamentals and course strategy.",
    type: "article",
    url: "https://weltongolf.com/blog/how-to-break-100-golf",
    siteName: "Welton Golf",
    images: [
      {
        url: "/images/break-100-golf-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Beginner golfer celebrating first sub-100 round - Complete guide to breaking 100"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Break 100 in Golf: Beginner's Complete Guide",
    description: "Break 100 for the first time with our simple 6-step system designed specifically for beginner golfers.",
    images: ["/images/break-100-golf-guide.jpg"]
  },
  alternates: {
    canonical: "https://weltongolf.com/blog/how-to-break-100-golf"
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "How to Break 100 in Golf: Beginner's Complete Guide to Sub-100 Golf",
      "description": "Break 100 for the first time with our simple 6-step system. Essential golf tips for beginners focusing on fundamentals, course strategy, and avoiding big numbers.",
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
          "url": "https://weltongolf.com/logo.png"
        }
      },
      "datePublished": "2025-11-10",
      "dateModified": "2025-11-10",
      "mainEntityOfPage": "https://weltongolf.com/blog/how-to-break-100-golf",
      "image": {
        "@type": "ImageObject",
        "url": "https://weltongolf.com/images/break-100-golf-guide.jpg",
        "width": 1200,
        "height": 630
      },
      "keywords": ["beginner golf", "break 100", "golf fundamentals", "golf tips", "beginner golf instruction", "golf basics"],
      "articleSection": "Golf Instruction",
      "wordCount": 3200,
      "about": {
        "@type": "Thing",
        "name": "Beginner Golf Instruction"
      }
    },
    {
      "@type": "HowTo",
      "name": "How to Break 100 in Golf",
      "description": "A simple 6-step system to help beginner golfers achieve their first sub-100 round",
      "image": {
        "@type": "ImageObject",
        "url": "https://weltongolf.com/images/break-100-golf-guide.jpg"
      },
      "totalTime": "PT5M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "GBP",
        "value": "0"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Basic golf club set (driver, 7-iron, pitching wedge, putter)"
        },
        {
          "@type": "HowToSupply",
          "name": "Golf balls"
        },
        {
          "@type": "HowToSupply",
          "name": "Scorecard"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Learn Basic Golf Fundamentals",
          "text": "Master grip, stance, and basic swing mechanics. Focus on making solid contact with the ball rather than distance or accuracy.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/golf-fundamentals.jpg"
          }
        },
        {
          "@type": "HowToStep",
          "name": "Play from Appropriate Tees",
          "text": "Choose forward tees that match your skill level. Playing shorter courses makes breaking 100 much more achievable for beginners.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/tee-selection.jpg"
          }
        },
        {
          "@type": "HowToStep",
          "name": "Focus on Getting the Ball Airborne",
          "text": "Prioritize making clean contact and getting the ball in the air consistently. Distance and accuracy will come with practice.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/ball-contact.jpg"
          }
        },
        {
          "@type": "HowToStep",
          "name": "Learn Basic Putting",
          "text": "Master distance control on putts. Focus on getting every putt to the hole rather than worrying about reading breaks.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/putting-basics.jpg"
          }
        },
        {
          "@type": "HowToStep",
          "name": "Avoid Penalty Strokes",
          "text": "Stay out of water hazards and out-of-bounds. Take safe routes and don&apos;t attempt heroic shots that could lead to lost balls.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/course-safety.jpg"
          }
        },
        {
          "@type": "HowToStep",
          "name": "Keep It Simple",
          "text": "Use fewer clubs, take lessons for basics, and focus on having fun while learning. Consistency beats complexity for beginners.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/simple-golf.jpg"
          }
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does it take to break 100 in golf?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most beginners can break 100 within 3-6 months of regular play and practice. This assumes playing 1-2 times per week and some practice time. Taking a few beginner lessons can significantly speed up this timeline."
          }
        },
        {
          "@type": "Question",
          "name": "What score is considered breaking 100?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Breaking 100 means shooting 99 or lower for 18 holes. This is typically considered the first major milestone for beginner golfers and represents basic competency in the game."
          }
        },
        {
          "@type": "Question",
          "name": "What handicap is needed to break 100?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Breaking 100 typically corresponds to a handicap of around 25-28. However, handicaps can vary based on course difficulty and tee selection."
          }
        },
        {
          "@type": "Question",
          "name": "Should beginners take golf lessons?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, 2-3 beginner lessons focusing on grip, stance, and basic swing fundamentals will accelerate your progress significantly and help you avoid developing bad habits."
          }
        },
        {
          "@type": "Question",
          "name": "What clubs does a beginner need?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Beginners can start with just 4-5 clubs: driver, 7-iron, 9-iron or pitching wedge, sand wedge, and putter. This simplified set helps focus on fundamentals without overwhelming club choices."
          }
        },
        {
          "@type": "Question",
          "name": "What tees should beginners play from?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Beginners should play from the most forward tees available, typically 5000-5500 yards total. This makes the course more manageable and breaking 100 more achievable."
          }
        }
      ]
    }
  ]
}

export default function HowToBreak100Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="text-sm text-slate-600 mb-4">
          <ol className="flex space-x-2">
            <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
            <li className="before:content-['/'] before:mx-2"><Link href="/blog" className="hover:text-emerald-600">Blog</Link></li>
            <li className="before:content-['/'] before:mx-2 text-slate-900">How to Break 100</li>
          </ol>
        </nav>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How to Break 100 in Golf: Complete Beginner&apos;s Guide
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Achieve your first sub-100 round with our simple 6-step system designed specifically for beginner golfers.
            Focus on fundamentals and smart course management.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">99</div>
              <div className="text-sm text-green-700">Target Score</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">3-6</div>
              <div className="text-sm text-blue-700">Months to Achieve</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">25-28</div>
              <div className="text-sm text-purple-700">Starting Handicap Range</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tools/handicap-calculator">
              <Button className="bg-green-600 hover:bg-green-700">
                <BarChart3 className="w-4 h-4 mr-2" />
                Calculate Your Handicap
              </Button>
            </Link>
            <Link href="/tee-recommendation-calculator">
              <Button variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Find Your Tees
              </Button>
            </Link>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-12 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Lightbulb className="w-6 h-6 mr-2" />
              Why Breaking 100 Is Your First Golf Milestone
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <p>
              Breaking 100 is golf&apos;s first major milestone and represents the transition from complete beginner to
              someone who understands the basic game. It shows you can complete 18 holes without losing too many
              balls and can make reasonable contact with the ball most of the time.
            </p>
            <p>
              This achievement is entirely realistic for most beginners within their first season of golf.
              Unlike lower scores that require years of practice, breaking 100 can be accomplished by focusing on
              fundamentals, playing smart, and avoiding the big mistakes that lead to very high scores.
            </p>
          </CardContent>
        </Card>

        {/* The 6-Step System */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Simple 6-Step System to Break 100
          </h2>

          <div className="grid gap-8">
            {/* Step 1 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</div>
                  Learn Basic Golf Fundamentals
                </CardTitle>
                <CardDescription>Master the essentials before worrying about advanced techniques</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Focus on the basic building blocks of golf. You don&apos;t need perfect technique to break 100,
                  but you need consistent fundamentals that allow you to make contact with the ball.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Essential Fundamentals:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Proper grip (not too tight)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Balanced stance (shoulder-width apart)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Ball position (center of stance for irons)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Simple, smooth swing tempo</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-700 mb-2">Take a Lesson!</h4>
                    <p className="text-sm text-yellow-600 mb-2">
                      Just 2-3 beginner lessons will help you:
                    </p>
                    <ul className="space-y-1 text-sm text-yellow-600">
                      <li>• Learn proper grip and setup</li>
                      <li>• Avoid developing bad habits</li>
                      <li>• Make faster progress</li>
                      <li>• Build confidence on the course</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Remember:</strong> Solid contact is more important than distance or direction at this stage.
                  Focus on hitting the ball cleanly rather than hitting it hard.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</div>
                  Play from Appropriate Tees
                </CardTitle>
                <CardDescription>Set yourself up for success with the right course length</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Playing from the right tees is crucial for beginners. Many new golfers make the course unnecessarily
                  difficult by playing from tees that are too long for their current skill level.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Beginner Tee Guidelines:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Total distance: 5000-5500 yards</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Par 4s: 250-350 yards</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Par 3s: 100-150 yards</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Usually the most forward tees</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Why Shorter Tees Help:</h4>
                    <ul className="space-y-1 text-sm text-blue-600">
                      <li>• More opportunities for pars and bogeys</li>
                      <li>• Less distance pressure on drives</li>
                      <li>• Shorter approach shots to greens</li>
                      <li>• More confidence and enjoyment</li>
                      <li>• Faster pace of play</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Don&apos;t Be Embarrassed:</strong> Playing from forward tees is smart golf.
                    Even good players move up when learning or in windy conditions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</div>
                  Focus on Getting the Ball Airborne
                </CardTitle>
                <CardDescription>Consistent contact is your primary goal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Your main objective should be making clean contact and getting the ball in the air consistently.
                  Don&apos;t worry about distance or perfect accuracy yet - focus on solid strikes.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Tee Shots:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Tee ball high for driver</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Swing smoothly, not hard</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Aim for fairway center</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Use 3-wood if driver is difficult</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Iron Shots:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Hit down on the ball slightly</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Take divot after ball contact</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Keep head steady during swing</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Finish swing completely</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Key Mindset:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Contact before distance</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Smooth swing tempo</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Stay balanced</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Practice patience</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    <strong>Practice Tip:</strong> Start with shorter clubs (7-iron, 8-iron) at the driving range.
                    Master contact with these before moving to longer clubs.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</div>
                  Learn Basic Putting
                </CardTitle>
                <CardDescription>Master distance control to avoid 3-putts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Putting accounts for roughly 40% of your strokes. Simple improvements in putting will
                  dramatically lower your scores and help you break 100 faster than any other skill.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Putting Fundamentals:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Simple pendulum stroke</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Keep head still during stroke</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Focus on distance control</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Practice straight-back, straight-through</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Distance Control Tips:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Every putt should reach the hole</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Practice lag putting from long range</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Aim to get within 3 feet on long putts</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Practice 3-foot putts until automatic</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2">Simple Putting Strategy:</h4>
                  <ol className="space-y-1 text-sm text-blue-600">
                    <li>1. Read the general slope (uphill/downhill/sidehill)</li>
                    <li>2. Pick your line and commit to it</li>
                    <li>3. Focus on speed - get the ball to the hole</li>
                    <li>4. Don&apos;t overthink the read on short putts</li>
                  </ol>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Goal:</strong> Eliminate 3-putts and 4-putts. Two putts per green is excellent for beginners.
                </p>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">5</div>
                  Avoid Penalty Strokes
                </CardTitle>
                <CardDescription>Stay out of trouble and keep the ball in play</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Penalty strokes from lost balls, water hazards, and out-of-bounds can quickly ruin your chance
                  of breaking 100. Smart course management prevents these big numbers.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Smart Strategies:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Aim away from water and OB</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Use shorter clubs on tight holes</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Play safe recovery shots</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Take your medicine when in trouble</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-700 mb-2">Penalty Shot Killers:</h4>
                    <ul className="space-y-1 text-sm text-red-600">
                      <li>• Lost balls (+2 strokes each)</li>
                      <li>• Water hazards (+1 stroke each)</li>
                      <li>• Out of bounds (+2 strokes each)</li>
                      <li>• Unplayable lies (+1 stroke each)</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-700">Course Management for Beginners:</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-3 rounded">
                      <h5 className="font-semibold text-green-700 text-sm mb-1">Tee Shots:</h5>
                      <p className="text-xs text-green-600">Aim for the widest part of the fairway, even if it means using 3-wood instead of driver.</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <h5 className="font-semibold text-blue-700 text-sm mb-1">Approach Shots:</h5>
                      <p className="text-xs text-blue-600">Aim for the center of greens. Don&apos;t go for tight pin positions near trouble.</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <h5 className="font-semibold text-yellow-700 text-sm mb-1">Trouble Shots:</h5>
                      <p className="text-xs text-yellow-600">Chip out sideways rather than attempting heroic shots through trees.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 6 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">6</div>
                  Keep It Simple
                </CardTitle>
                <CardDescription>Focus on basics and enjoy the learning process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Simplicity is key for beginners. Use fewer clubs, focus on fundamentals, and don&apos;t overcomplicate
                  the game. Golf is challenging enough without adding unnecessary complexity.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Simplified Club Selection:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Driver (or 3-wood for accuracy)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />7-iron (most versatile club)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />9-iron or pitching wedge</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Sand wedge</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Putter</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Mental Approach:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Focus on having fun</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Don&apos;t keep score every round</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Learn course etiquette</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Play with patient partners</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-700 mb-2">Learning Progression:</h4>
                  <ol className="space-y-1 text-sm text-purple-600">
                    <li>1. Master putting and short chips around green</li>
                    <li>2. Develop consistent contact with 7-iron</li>
                    <li>3. Learn basic tee shot with 3-wood or driver</li>
                    <li>4. Add other clubs as you improve</li>
                    <li>5. Work on course management and strategy</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Practice Plan */}
        <Card className="mb-12 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Calendar className="w-6 h-6 mr-2" />
              Beginner Practice Plan for Breaking 100
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-green-700">Practice Session 1: Short Game (45 min)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />15 min: Putting (focus on 3-6 foot putts)</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />15 min: Chipping with 7-iron</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />15 min: Basic pitching with wedge</li>
                </ul>
                <p className="text-xs text-gray-600">Short game practice gives the biggest score improvement for beginners</p>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-green-700">Practice Session 2: Full Swing (45 min)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />10 min: Warm up with easy swings</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />20 min: 7-iron practice (contact focus)</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />15 min: Tee shots (3-wood/driver)</li>
                </ul>
                <p className="text-xs text-gray-600">Focus on solid contact rather than distance</p>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">Weekly Schedule Recommendation:</h4>
              <ul className="space-y-1 text-sm text-blue-600">
                <li>• 1-2 practice sessions per week</li>
                <li>• 1 round of golf (9 or 18 holes)</li>
                <li>• Consider taking a lesson every 2-3 weeks</li>
                <li>• Practice putting at home if possible</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* What to Expect */}
        <Card className="mb-12 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">What to Expect: Your Journey to Breaking 100</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-green-700">Month 1-2: Learning Basics</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Scores: 110-130+</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Focus on making contact</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Learn basic rules and etiquette</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Take beginner lessons</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-blue-700">Month 3-4: Improving Contact</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" />Scores: 105-120</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" />More consistent ball striking</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" />Better putting distance control</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" />Fewer penalty strokes</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-purple-700">Month 5-6: Breaking 100</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" />Scores: 95-105</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" />Consistent ball contact</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" />Good course management</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" />First sub-100 rounds!</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700">
                <strong>Remember:</strong> Progress isn&apos;t always linear. You might shoot 95 one day and 110 the next.
                Focus on the overall trend and celebrate small victories along the way.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Common Beginner Mistakes */}
        <Card className="mb-12 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800">Common Beginner Mistakes That Prevent Breaking 100</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-red-700">Setup and Swing Mistakes:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Gripping the club too tightly</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Trying to swing too hard</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Looking up too early to see where ball goes</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Poor ball position in stance</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Not taking lessons to learn basics</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-red-700">Course Management Mistakes:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Playing from tees that are too long</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Attempting shots beyond skill level</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Not practicing short game enough</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Getting frustrated and angry</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Playing too fast, not thinking shots through</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How long does it take to break 100 in golf?</h3>
                <p className="text-gray-700 text-sm">
                  Most beginners can break 100 within 3-6 months of regular play and practice. This assumes playing 1-2 times
                  per week and some practice time. Taking a few beginner lessons can significantly speed up this timeline.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What score is considered breaking 100?</h3>
                <p className="text-gray-700 text-sm">
                  Breaking 100 means shooting 99 or lower for 18 holes. This is typically considered the first major milestone
                  for beginner golfers and represents basic competency in the game.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What handicap is needed to break 100?</h3>
                <p className="text-gray-700 text-sm">
                  Breaking 100 typically corresponds to a handicap of around 25-28. However, handicaps can vary based on
                  course difficulty and tee selection.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Should beginners take golf lessons?</h3>
                <p className="text-gray-700 text-sm">
                  Yes, 2-3 beginner lessons focusing on grip, stance, and basic swing fundamentals will accelerate your
                  progress significantly and help you avoid developing bad habits.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What clubs does a beginner need?</h3>
                <p className="text-gray-700 text-sm">
                  Beginners can start with just 4-5 clubs: driver, 7-iron, 9-iron or pitching wedge, sand wedge, and putter.
                  This simplified set helps focus on fundamentals without overwhelming club choices.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What tees should beginners play from?</h3>
                <p className="text-gray-700 text-sm">
                  Beginners should play from the most forward tees available, typically 5000-5500 yards total. This makes
                  the course more manageable and breaking 100 more achievable.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tools Integration */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-blue-900">Use Our Golf Tools to Start Your Journey</CardTitle>
            <CardDescription className="text-center text-blue-700">
              Track your progress and find the right setup for success
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <Target className="w-12 h-12 text-green-600 mx-auto" />
                <h3 className="font-semibold">Tee Recommendation</h3>
                <p className="text-sm text-gray-600">Find the perfect tees to play from for your skill level</p>
                <Link href="/tee-recommendation-calculator">
                  <Button variant="outline" size="sm">Find Your Tees</Button>
                </Link>
              </div>
              <div className="text-center space-y-3">
                <BarChart3 className="w-12 h-12 text-blue-600 mx-auto" />
                <h3 className="font-semibold">Handicap Calculator</h3>
                <p className="text-sm text-gray-600">Track your improving handicap as you learn</p>
                <Link href="/tools/handicap-calculator">
                  <Button variant="outline" size="sm">Calculate Handicap</Button>
                </Link>
              </div>
              <div className="text-center space-y-3">
                <MapPin className="w-12 h-12 text-purple-600 mx-auto" />
                <h3 className="font-semibold">Golf Trip Planner</h3>
                <p className="text-sm text-gray-600">Find beginner-friendly courses to practice on</p>
                <Link href="/golf-trip-planner">
                  <Button variant="outline" size="sm">Plan Trip</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conclusion */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 text-center">Your First Step into Golf</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 text-center">
              Breaking 100 is an exciting and achievable milestone that marks your entry into the world of golf.
              Focus on the fundamentals, practice patience, and remember that every golfer started exactly where you are now.
              With consistent practice and the right approach, you&apos;ll be celebrating your first sub-100 round sooner than you think.
            </p>
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Ready to get started? Use our tools to set yourself up for success and track your amazing progress.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/tee-recommendation-calculator">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Target className="w-4 h-4 mr-2" />
                    Find Your Tees
                  </Button>
                </Link>
                <Link href="/blog/how-to-break-90-golf">
                  <Button variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Next: Break 90 Guide
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles and Tools */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Start Your Golf Journey</CardTitle>
            <CardDescription>
              Essential tools and guides to help you progress as a beginner golfer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Essential Golf Tools</h3>
                <div className="space-y-3">
                  <Link href="/tee-recommendation-calculator" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                    <Target className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-medium text-slate-900">Tee Recommendation</div>
                      <div className="text-sm text-slate-600">Find the right tees for your skill level</div>
                    </div>
                  </Link>
                  <Link href="/tools/handicap-calculator" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-medium text-slate-900">Handicap Calculator</div>
                      <div className="text-sm text-slate-600">Track your progress from the start</div>
                    </div>
                  </Link>
                  <Link href="/golf-trip-planner" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-medium text-slate-900">Golf Trip Planner</div>
                      <div className="text-sm text-slate-600">Find beginner-friendly courses</div>
                    </div>
                  </Link>
                  <Link href="/course-directory" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                    <Users className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-medium text-slate-900">Course Directory</div>
                      <div className="text-sm text-slate-600">Discover local golf courses</div>
                    </div>
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Next Steps in Your Golf Journey</h3>
                <div className="space-y-3">
                  <Link href="/blog/how-to-break-90-golf" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-slate-900">How to Break 90</div>
                      <div className="text-sm text-slate-600">Your next milestone awaits</div>
                    </div>
                  </Link>
                  <Link href="/blog/how-to-break-80-golf" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-slate-900">How to Break 80</div>
                      <div className="text-sm text-slate-600">Advanced scoring techniques</div>
                    </div>
                  </Link>
                  <Link href="/blog/best-golf-breaks-uk" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-slate-900">Best UK Golf Breaks</div>
                      <div className="text-sm text-slate-600">Plan your first golf trip</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}