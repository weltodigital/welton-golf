import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Target, TrendingUp, Clock, Users, BarChart3, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Break 90 in Golf: Complete Step-by-Step Guide | Welton",
  description: "Master the fundamentals and break 90 consistently with our proven 8-step system. Practical course management and short game tips.",
  keywords: "how to break 90 in golf, golf tips for breaking 90, intermediate golf instruction, golf course management, golf scoring tips, improve golf handicap, golf practice routine",
  authors: [{ name: "Welton Golf" }],
  openGraph: {
    title: "How to Break 90 in Golf: Complete Step-by-Step Guide for Intermediate Golfers",
    description: "Master the fundamentals and break 90 consistently with our proven 8-step system. Practical tips for course management, short game improvement, and scoring strategies.",
    type: "article",
    url: "https://weltongolf.com/blog/how-to-break-90-golf",
    siteName: "Welton Golf",
    images: [
      {
        url: "/images/break-90-golf-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Golfer celebrating after breaking 90 - Complete guide to consistent sub-90 rounds"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Break 90 in Golf: Complete Step-by-Step Guide",
    description: "Master the fundamentals and break 90 consistently with our proven 8-step system for intermediate golfers.",
    images: ["/images/break-90-golf-guide.jpg"]
  },
  alternates: {
    canonical: "https://weltongolf.com/blog/how-to-break-90-golf"
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "How to Break 90 in Golf: Complete Step-by-Step Guide for Intermediate Golfers",
      "description": "Master the fundamentals and break 90 consistently with our proven 8-step system. Practical tips for course management, short game improvement, and scoring strategies that work.",
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
      "mainEntityOfPage": "https://weltongolf.com/blog/how-to-break-90-golf",
      "image": {
        "@type": "ImageObject",
        "url": "https://weltongolf.com/images/break-90-golf-guide.jpg",
        "width": 1200,
        "height": 630
      },
      "keywords": ["golf instruction", "break 90", "intermediate golf", "golf tips", "course management", "short game", "golf practice"],
      "articleSection": "Golf Instruction",
      "wordCount": 3500,
      "about": {
        "@type": "Thing",
        "name": "Golf Instruction"
      }
    },
    {
      "@type": "HowTo",
      "name": "How to Break 90 in Golf",
      "description": "A comprehensive 8-step system to help intermediate golfers consistently shoot under 90",
      "image": {
        "@type": "ImageObject",
        "url": "https://weltongolf.com/images/break-90-golf-guide.jpg"
      },
      "totalTime": "PT6M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "GBP",
        "value": "0"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Golf clubs (driver, 7-iron, pitching wedge, putter)"
        },
        {
          "@type": "HowToSupply",
          "name": "Golf balls"
        },
        {
          "@type": "HowToSupply",
          "name": "Scorecard and pencil"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Master Basic Course Management",
          "text": "Focus on playing within your abilities. Choose conservative targets, avoid trouble spots, and play to your strengths rather than attempting heroic shots.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/course-management.jpg"
          }
        },
        {
          "@type": "HowToStep",
          "name": "Develop a Consistent Pre-Shot Routine",
          "text": "Establish a 15-20 second routine that includes target selection, practice swing, and alignment check. Consistency breeds confidence and better strikes.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/pre-shot-routine.jpg"
          }
        },
        {
          "@type": "HowToStep",
          "name": "Focus on Short Game Fundamentals",
          "text": "Spend 60% of practice time on shots within 100 yards. Master basic chipping technique and putting fundamentals to save strokes around the green.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/short-game-practice.jpg"
          }
        },
        {
          "@type": "HowToStep",
          "name": "Learn Basic Tee Strategy",
          "text": "Use appropriate tees for your skill level, focus on fairway accuracy over distance, and develop a reliable tee shot you can repeat under pressure.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/tee-strategy.jpg"
          }
        },
        {
          "@type": "HowToStep",
          "name": "Master Approach Shot Selection",
          "text": "Always aim for the center of greens, choose one more club than you think you need, and prioritize accuracy over pin hunting on difficult hole locations.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/approach-shots.jpg"
          }
        },
        {
          "@type": "HowToStep",
          "name": "Develop Mental Game Basics",
          "text": "Stay patient after bad shots, focus on one shot at a time, and maintain realistic expectations. Mental composure is crucial for consistent scoring.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/mental-game.jpg"
          }
        },
        {
          "@type": "HowToStep",
          "name": "Practice Effective Course Strategy",
          "text": "Play to your handicap level, avoid high-risk shots when ahead of pace, and know when to take your medicine and play safe recovery shots.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/course-strategy.jpg"
          }
        },
        {
          "@type": "HowToStep",
          "name": "Track Progress and Learn",
          "text": "Keep detailed statistics, identify patterns in your mistakes, and focus practice on your biggest weaknesses. Continuous improvement leads to consistent results.",
          "image": {
            "@type": "ImageObject",
            "url": "https://weltongolf.com/images/golf-statistics.jpg"
          }
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does it take to break 90 in golf?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most golfers can break 90 within 6-12 months of focused practice and play, depending on their starting skill level and practice frequency. Consistent practice 2-3 times per week typically yields faster results."
          }
        },
        {
          "@type": "Question",
          "name": "What handicap do you need to break 90?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Breaking 90 consistently typically corresponds to a handicap of around 15-18. However, higher handicap golfers can occasionally break 90 with good course management and a solid short game."
          }
        },
        {
          "@type": "Question",
          "name": "What&apos;s the most important skill for breaking 90?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Course management is the most critical skill for breaking 90. Playing within your abilities, avoiding big numbers, and making smart decisions will lower your scores faster than perfect swing mechanics."
          }
        },
        {
          "@type": "Question",
          "name": "How often should I practice to break 90?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aim for 2-3 practice sessions per week, with 60% of time dedicated to short game (putting, chipping, pitching) and 40% on full swing. Quality focused practice is more valuable than quantity."
          }
        },
        {
          "@type": "Question",
          "name": "What clubs are essential for breaking 90?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Focus on becoming proficient with driver, 7-iron, pitching wedge, and putter. These four clubs can handle most situations you&apos;ll encounter and help you develop consistency before expanding your arsenal."
          }
        },
        {
          "@type": "Question",
          "name": "Should I take lessons to break 90?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, a few lessons with a PGA professional can accelerate your progress significantly. Focus lessons on fundamentals like setup, grip, and basic swing mechanics rather than advanced techniques."
          }
        }
      ]
    }
  ]
}

export default function HowToBreak90Page() {
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
            <li className="before:content-['/'] before:mx-2 text-slate-900">How to Break 90</li>
          </ol>
        </nav>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How to Break 90 in Golf: Complete Step-by-Step Guide
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master the fundamentals and break 90 consistently with our proven 8-step system.
            Perfect for intermediate golfers ready to take their game to the next level.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">89</div>
              <div className="text-sm text-green-700">Average Target Score</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">6-12</div>
              <div className="text-sm text-blue-700">Months to Achieve</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">15-18</div>
              <div className="text-sm text-purple-700">Target Handicap</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tools/handicap-calculator">
              <Button className="bg-green-600 hover:bg-green-700">
                <BarChart3 className="w-4 h-4 mr-2" />
                Calculate Your Handicap
              </Button>
            </Link>
            <Link href="/golf-trip-planner">
              <Button variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Plan Golf Trip
              </Button>
            </Link>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-12 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Target className="w-6 h-6 mr-2" />
              Why Breaking 90 Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <p>
              Breaking 90 is a significant milestone that separates casual golfers from those who truly understand the game.
              It requires mastering basic fundamentals, developing course management skills, and maintaining mental composure
              throughout 18 holes.
            </p>
            <p>
              Unlike breaking 80 which demands precision and advanced skills, breaking 90 is achievable through smart play,
              solid fundamentals, and avoiding big numbers. This guide provides a practical, step-by-step approach that
              intermediate golfers can implement immediately.
            </p>
          </CardContent>
        </Card>

        {/* The 8-Step System */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            The Complete 8-Step System to Break 90
          </h2>

          <div className="grid gap-8">
            {/* Step 1 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</div>
                  Master Basic Course Management
                </CardTitle>
                <CardDescription>The foundation of consistent scoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Course management is the fastest way to lower scores without changing your swing. Play within your abilities
                  and make smart decisions on every shot.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Smart Strategies:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Aim for center of fairways and greens</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Play away from trouble (water, bunkers)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Take your medicine when in trouble</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Choose conservative targets</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-700 mb-2">Avoid These Mistakes:</h4>
                    <ul className="space-y-1 text-sm text-red-600">
                      <li>• Going for heroic shots over water</li>
                      <li>• Aiming at tight pin positions</li>
                      <li>• Using driver on every par 4</li>
                      <li>• Taking unnecessary risks when scoring well</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</div>
                  Develop a Consistent Pre-Shot Routine
                </CardTitle>
                <CardDescription>Build confidence through repetition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  A solid pre-shot routine helps you make better decisions and execute shots more consistently.
                  Keep it simple and repeatable.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-3">15-Second Pre-Shot Routine:</h4>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-center"><span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-xs">1</span>Select target and club (5 seconds)</li>
                    <li className="flex items-center"><span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-xs">2</span>Take practice swing visualizing shot (5 seconds)</li>
                    <li className="flex items-center"><span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-xs">3</span>Address ball, check alignment, execute (5 seconds)</li>
                  </ol>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Pro Tip:</strong> Practice this routine on the range. The more automatic it becomes,
                  the more confident you&apos;ll feel on the course.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</div>
                  Focus on Short Game Fundamentals
                </CardTitle>
                <CardDescription>Where scores are made and saved</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  The majority of your shots happen within 100 yards of the pin. Mastering basic short game
                  skills will have the biggest impact on breaking 90.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Putting (40% of strokes):</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Focus on distance control</li>
                      <li>• Practice 3-foot putts daily</li>
                      <li>• Use simple pendulum stroke</li>
                      <li>• Read slope from behind ball</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Chipping (20% of strokes):</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use 7-iron for basic chips</li>
                      <li>• Keep hands ahead of ball</li>
                      <li>• Focus on clean contact</li>
                      <li>• Practice landing spots</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Pitching (15% of strokes):</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Master pitching wedge</li>
                      <li>• Learn 3/4 swing tempo</li>
                      <li>• Practice 30-50 yard shots</li>
                      <li>• Focus on trajectory control</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    <strong>Practice Allocation:</strong> Spend 60% of practice time on short game.
                    This investment pays the biggest dividends in lower scores.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</div>
                  Learn Basic Tee Strategy
                </CardTitle>
                <CardDescription>Start each hole with confidence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Smart tee play sets up easier approach shots and helps avoid big numbers.
                  Accuracy matters more than distance at this level.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Tee Selection:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Play appropriate tees for your skill level</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Choose tees that give 6000-6200 yard total</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Avoid championship tees until consistent</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Club Selection:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Use 3-wood on tight holes</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Driver only when fairway is wide</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Develop reliable &quot;go-to&quot; tee shot</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Key Concept:</strong> Fairway accuracy leads to easier approach shots,
                    more greens in regulation, and lower scores. Distance without accuracy creates trouble.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">5</div>
                  Master Approach Shot Selection
                </CardTitle>
                <CardDescription>Set up easy putting opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Smart approach play focuses on hitting greens and avoiding short-sided positions.
                  Center of green is always a good target.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Smart Approach Strategy:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Always aim for center of green</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Take one more club than you think</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Avoid short-sided positions</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Factor in wind and elevation</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-700 mb-2">Distance Control:</h4>
                    <p className="text-sm text-yellow-600 mb-2">Know your carry distances for:</p>
                    <ul className="space-y-1 text-sm text-yellow-600">
                      <li>• 7-iron: 140 yards</li>
                      <li>• 8-iron: 130 yards</li>
                      <li>• 9-iron: 120 yards</li>
                      <li>• Pitching wedge: 110 yards</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Remember:</strong> Missing long and in the middle is better than being short and left/right.
                  Most trouble around greens is short-sided.
                </p>
              </CardContent>
            </Card>

            {/* Step 6 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">6</div>
                  Develop Mental Game Basics
                </CardTitle>
                <CardDescription>Stay composed under pressure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Mental composure prevents blow-up holes and helps you maintain focus throughout the round.
                  Emotional control is crucial for consistent scoring.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Mental Strategies:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Focus on one shot at a time</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Stay patient after bad shots</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Maintain realistic expectations</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Use positive self-talk</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-700">Avoid These Pitfalls:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>Getting angry after bad shots</li>
                      <li className="flex items-center"><span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>Trying to make up strokes quickly</li>
                      <li className="flex items-center"><span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>Dwelling on previous holes</li>
                      <li className="flex items-center"><span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>Putting too much pressure on yourself</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Key Mindset:</strong> Accept that bogeys are okay. Par is a bonus.
                    Double bogeys are what hurt your score the most - focus on avoiding big numbers.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 7 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">7</div>
                  Practice Effective Course Strategy
                </CardTitle>
                <CardDescription>Make every shot count</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Strategic thinking on the course helps you play to your strengths and minimize weaknesses.
                  Every shot should have a purpose and backup plan.
                </p>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2">Par 4 Strategy:</h4>
                      <ul className="space-y-1 text-sm text-green-600">
                        <li>• Safe tee shot to fairway</li>
                        <li>• Approach to center of green</li>
                        <li>• Two-putt for par or bogey</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-2">Par 3 Strategy:</h4>
                      <ul className="space-y-1 text-sm text-blue-600">
                        <li>• Club selection for center pin</li>
                        <li>• Avoid trouble at all costs</li>
                        <li>• Accept longer putts</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-700 mb-2">Par 5 Strategy:</h4>
                      <ul className="space-y-1 text-sm text-purple-600">
                        <li>• Conservative approach</li>
                        <li>• Lay up to comfortable distance</li>
                        <li>• Play for par, bonus birdie</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-700 mb-2">Recovery Shot Rules:</h4>
                    <p className="text-sm text-yellow-600 mb-2">
                      When in trouble, your priority is getting back in play:
                    </p>
                    <ul className="space-y-1 text-sm text-yellow-600">
                      <li>• Take your medicine and punch out</li>
                      <li>• Don&apos;t compound mistakes with heroic attempts</li>
                      <li>• Minimize damage - bogey is better than double</li>
                      <li>• Live to fight another hole</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 8 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">8</div>
                  Track Progress and Learn
                </CardTitle>
                <CardDescription>Continuous improvement through data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Keeping detailed statistics helps identify your biggest areas for improvement and
                  tracks progress toward breaking 90 consistently.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Essential Statistics to Track:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Fairways hit (aim for 50%+)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Greens in regulation (aim for 30%+)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Putts per round (aim for 32 or less)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Up and downs (aim for 30%+)</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Penalty strokes per round</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Score Analysis:</h4>
                    <p className="text-sm text-blue-600 mb-2">Breaking 90 typically requires:</p>
                    <ul className="space-y-1 text-sm text-blue-600">
                      <li>• 12 bogeys, 6 pars = 90</li>
                      <li>• 10 bogeys, 6 pars, 2 birdies = 88</li>
                      <li>• 14 bogeys, 4 pars = 90</li>
                      <li>• Avoid double bogeys and worse</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Practice Focus:</strong> Use statistics to guide practice. If you&apos;re missing too many greens,
                    work on approach shots. If putts per round is high, spend time on the putting green.
                  </p>
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
              Weekly Practice Plan for Breaking 90
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-green-700">Session 1: Short Game Focus (60 min)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />20 min: Putting (distance control)</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />20 min: Chipping (various lies)</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />20 min: Pitching (30-50 yards)</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-green-700">Session 2: Full Swing (60 min)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />15 min: Warm up with wedges</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />20 min: 7-iron fundamentals</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />15 min: Driver accuracy</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />10 min: Course simulation</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-green-700">Session 3: Course Play</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />18 holes focused practice</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />Implement course management</li>
                  <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" />Track detailed statistics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-12 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800">Common Mistakes That Prevent Breaking 90</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-red-700">Technical Mistakes:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Trying to hit driver on every hole</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Always going for pins instead of center green</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Not practicing short game enough</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Poor club selection and distance control</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Inconsistent pre-shot routine</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-red-700">Mental Mistakes:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Getting frustrated and losing focus</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Trying to make up strokes quickly</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Not playing within abilities</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Poor course management decisions</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>Setting unrealistic expectations</li>
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
                <h3 className="font-semibold text-gray-900 mb-2">How long does it take to break 90 in golf?</h3>
                <p className="text-gray-700 text-sm">
                  Most golfers can break 90 within 6-12 months of focused practice and play, depending on their starting
                  skill level and practice frequency. Consistent practice 2-3 times per week typically yields faster results.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What handicap do you need to break 90?</h3>
                <p className="text-gray-700 text-sm">
                  Breaking 90 consistently typically corresponds to a handicap of around 15-18. However, higher handicap
                  golfers can occasionally break 90 with good course management and a solid short game.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What&apos;s the most important skill for breaking 90?</h3>
                <p className="text-gray-700 text-sm">
                  Course management is the most critical skill for breaking 90. Playing within your abilities, avoiding
                  big numbers, and making smart decisions will lower your scores faster than perfect swing mechanics.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How often should I practice to break 90?</h3>
                <p className="text-gray-700 text-sm">
                  Aim for 2-3 practice sessions per week, with 60% of time dedicated to short game (putting, chipping, pitching)
                  and 40% on full swing. Quality focused practice is more valuable than quantity.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What clubs are essential for breaking 90?</h3>
                <p className="text-gray-700 text-sm">
                  Focus on becoming proficient with driver, 7-iron, pitching wedge, and putter. These four clubs can handle
                  most situations you&apos;ll encounter and help you develop consistency before expanding your arsenal.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Should I take lessons to break 90?</h3>
                <p className="text-gray-700 text-sm">
                  Yes, a few lessons with a PGA professional can accelerate your progress significantly. Focus lessons on
                  fundamentals like setup, grip, and basic swing mechanics rather than advanced techniques.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tools Integration */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-blue-900">Use Our Golf Tools to Track Your Progress</CardTitle>
            <CardDescription className="text-center text-blue-700">
              Complement your practice with our interactive golf tools
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <BarChart3 className="w-12 h-12 text-blue-600 mx-auto" />
                <h3 className="font-semibold">Handicap Calculator</h3>
                <p className="text-sm text-gray-600">Track your improving handicap as you work toward breaking 90</p>
                <Link href="/tools/handicap-calculator">
                  <Button variant="outline" size="sm">Calculate Handicap</Button>
                </Link>
              </div>
              <div className="text-center space-y-3">
                <Target className="w-12 h-12 text-green-600 mx-auto" />
                <h3 className="font-semibold">Tee Recommendation</h3>
                <p className="text-sm text-gray-600">Find the right tees to play for optimal scoring</p>
                <Link href="/tee-recommendation-calculator">
                  <Button variant="outline" size="sm">Find Your Tees</Button>
                </Link>
              </div>
              <div className="text-center space-y-3">
                <MapPin className="w-12 h-12 text-purple-600 mx-auto" />
                <h3 className="font-semibold">Golf Trip Planner</h3>
                <p className="text-sm text-gray-600">Plan trips to practice your new skills on different courses</p>
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
            <CardTitle className="text-green-800 text-center">Start Your Journey to Breaking 90</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 text-center">
              Breaking 90 consistently is an achievable goal with the right approach. Focus on the fundamentals,
              practice smart course management, and be patient with your progress. Remember, every golfer&apos;s journey
              is different, but with dedicated practice and the strategies outlined in this guide, you&apos;ll be shooting
              in the 80s sooner than you think.
            </p>
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Ready to take your game to the next level? Start with our golf tools and track your progress.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/tools/handicap-calculator">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Start Tracking Progress
                  </Button>
                </Link>
                <Link href="/blog/how-to-break-80-golf">
                  <Button variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Next: Break 80 Guide
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles and Tools */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Continue Your Golf Journey</CardTitle>
            <CardDescription>
              Tools and guides to help you reach your next golf milestone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Essential Golf Tools</h3>
                <div className="space-y-3">
                  <Link href="/tools/handicap-calculator" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-medium text-slate-900">Handicap Calculator</div>
                      <div className="text-sm text-slate-600">Track your progress as you break 90</div>
                    </div>
                  </Link>
                  <Link href="/course-directory" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-medium text-slate-900">Course Directory</div>
                      <div className="text-sm text-slate-600">Find courses to practice on</div>
                    </div>
                  </Link>
                  <Link href="/swing-speed-calculator" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                    <Target className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-medium text-slate-900">Swing Speed Calculator</div>
                      <div className="text-sm text-slate-600">Optimize your equipment setup</div>
                    </div>
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Related Golf Guides</h3>
                <div className="space-y-3">
                  <Link href="/blog/how-to-break-100-golf" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-slate-900">How to Break 100</div>
                      <div className="text-sm text-slate-600">Start with the fundamentals</div>
                    </div>
                  </Link>
                  <Link href="/blog/how-to-break-80-golf" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-slate-900">How to Break 80</div>
                      <div className="text-sm text-slate-600">Take your game to the next level</div>
                    </div>
                  </Link>
                  <Link href="/blog/best-golf-breaks-uk" className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-slate-900">Best UK Golf Breaks</div>
                      <div className="text-sm text-slate-600">Plan your next golf trip</div>
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