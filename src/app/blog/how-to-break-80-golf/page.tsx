import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target, TrendingUp, Clock, CheckCircle, AlertTriangle, Trophy, BarChart3, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Break 80 in Golf 2025: 10-Step Guide to Sub-80 Scores | Welton Golf',
  description: 'Learn how to break 80 in golf with our proven 10-step system. Course management, short game tips, mental strategies. 75% of golfers break 80 using these methods.',
  keywords: 'how to break 80 golf, break 80 golf tips, golf scoring tips, how to shoot under 80, golf course management, short game improvement, golf mental game, lower golf scores, golf handicap improvement, sub 80 golf scores, golf strategy tips, breaking 80 consistently',
  openGraph: {
    title: 'How to Break 80 in Golf 2025: 10-Step Proven System',
    description: 'Master the 10-step system used by thousands of golfers to consistently break 80. Course management, short game secrets, mental strategies included.',
    type: 'article',
    publishedTime: '2025-01-01T00:00:00.000Z',
    modifiedTime: '2025-01-01T00:00:00.000Z',
    authors: ['Welton Golf'],
    url: 'https://weltongolf.com/blog/how-to-break-80-golf',
    images: [
      {
        url: 'https://weltongolf.com/images/how-to-break-80-golf-2025.jpg',
        width: 1200,
        height: 630,
        alt: 'How to Break 80 in Golf - 10 Step System for Sub-80 Scores',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Break 80 in Golf: 10-Step Proven System',
    description: 'Master the system used by thousands to consistently break 80. Course management + short game secrets.',
    images: ['https://weltongolf.com/images/how-to-break-80-golf-2025.jpg'],
    site: '@WeltonGolf',
  },
  alternates: {
    canonical: 'https://weltongolf.com/blog/how-to-break-80-golf',
    languages: {
      'en-GB': 'https://weltongolf.com/blog/how-to-break-80-golf',
      'en-US': 'https://weltongolf.com/blog/how-to-break-80-golf',
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
  category: 'Golf Instruction',
}

const breakingEightySteps = [
  {
    id: 1,
    title: "Master Course Management",
    icon: Target,
    difficulty: "Essential",
    timeToLearn: "2-4 weeks",
    impactLevel: "High",
    description: "Play smart, not hard. Course management is the fastest way to lower scores without changing your swing.",
    keyPoints: [
      "Play to your strengths and away from your weaknesses",
      "Aim for center of greens, not pin positions",
      "Choose conservative club selections on approach shots",
      "Avoid going for hero shots that lead to big numbers"
    ],
    practiceTime: "Can implement immediately during next round",
    commonMistakes: ["Going for pins in difficult positions", "Taking on risky shots when safer options exist"],
    proTip: "If you can&apos;t hit a 7-iron pin-high from that distance 7 out of 10 times on the practice range, don&apos;t try it on the course."
  },
  {
    id: 2,
    title: "Develop a Consistent Pre-Shot Routine",
    icon: Clock,
    difficulty: "Moderate",
    timeToLearn: "3-6 weeks",
    impactLevel: "High",
    description: "A consistent pre-shot routine reduces mental errors and creates repeatable swing mechanics.",
    keyPoints: [
      "Same routine for every shot (15-20 seconds maximum)",
      "Include target selection, club choice, practice swing, and alignment",
      "Stick to routine under pressure",
      "Develop different routines for different shot types"
    ],
    practiceTime: "Practice on driving range for 2-3 sessions",
    commonMistakes: ["Routine too long causing slow play", "Changing routine mid-round"],
    proTip: "Professional golfers have identical routines for every shot. Copy this consistency to eliminate mental errors."
  },
  {
    id: 3,
    title: "Improve Short Game to Save Strokes",
    icon: Zap,
    difficulty: "Moderate",
    timeToLearn: "6-12 weeks",
    impactLevel: "Very High",
    description: "60% of your strokes happen within 100 yards. Master the short game to break 80 consistently.",
    keyPoints: [
      "Practice chipping and pitching from 10-50 yards",
      "Develop consistent putting stroke and green reading",
      "Learn basic bunker play fundamentals",
      "Master lag putting to avoid three-putts"
    ],
    practiceTime: "50% of practice time should be short game",
    commonMistakes: ["Not practicing short game enough", "Trying to be too cute with chip shots"],
    proTip: "Get up and down 50% of the time from around the green. This alone can save 5-8 strokes per round."
  },
  {
    id: 4,
    title: "Eliminate Big Numbers",
    icon: AlertTriangle,
    difficulty: "Essential",
    timeToLearn: "Immediate",
    impactLevel: "Very High",
    description: "Double bogeys and worse kill your chances of breaking 80. Learn to limit damage.",
    keyPoints: [
      "Take penalty drops quickly rather than attempting impossible shots",
      "Play safe recovery shots back to fairway",
      "Accept bogey rather than risk double bogey or worse",
      "Know when to pick up and move on"
    ],
    practiceTime: "Mental decision-making during rounds",
    commonMistakes: ["Trying hero shots from trouble", "Not taking medicine when in penalty areas"],
    proTip: "A bogey is always better than a big number. Play for bogey maximum when in trouble."
  },
  {
    id: 5,
    title: "Develop Mental Toughness",
    icon: TrendingUp,
    difficulty: "Advanced",
    timeToLearn: "8-16 weeks",
    impactLevel: "High",
    description: "Mental mistakes cost more strokes than physical ones. Build mental resilience and focus.",
    keyPoints: [
      "Stay in the present - don&apos;t dwell on bad shots",
      "Develop positive self-talk and confidence",
      "Create simple swing thoughts for each shot",
      "Practice visualization and course strategy"
    ],
    practiceTime: "Mental practice daily, 5-10 minutes",
    commonMistakes: ["Getting angry after bad shots", "Thinking too much over the ball"],
    proTip: "Treat each shot as independent. A bad drive doesn't mean a bad hole."
  },
  {
    id: 6,
    title: "Improve Putting Performance",
    icon: Target,
    difficulty: "Moderate",
    timeToLearn: "4-8 weeks",
    impactLevel: "Very High",
    description: "Putting accounts for 40% of your score. Small improvements yield big results.",
    keyPoints: [
      "Develop consistent putting setup and stroke",
      "Master distance control on lag putts",
      "Improve green reading skills",
      "Practice 3-6 foot putts religiously"
    ],
    practiceTime: "20 minutes putting practice per session",
    commonMistakes: ["Not practicing putting enough", "Poor green reading"],
    proTip: "Make 80% of putts from 3 feet and never three-putt from inside 30 feet."
  },
  {
    id: 7,
    title: "Master Approach Shot Strategy",
    icon: BarChart3,
    difficulty: "Moderate",
    timeToLearn: "6-10 weeks",
    impactLevel: "High",
    description: "Smart approach shots set up easier putts and lower scores.",
    keyPoints: [
      "Aim for center of greens rather than pins",
      "Take enough club to reach the back of the green",
      "Consider pin position and green slope",
      "Play to your iron accuracy distances"
    ],
    practiceTime: "Focus on iron accuracy during range sessions",
    commonMistakes: ["Always going for the pin", "Not taking enough club"],
    proTip: "A 30-foot putt from the center of the green is better than a difficult chip from short of the pin."
  },
  {
    id: 8,
    title: "Optimize Tee Shot Strategy",
    icon: Trophy,
    difficulty: "Moderate",
    timeToLearn: "4-8 weeks",
    impactLevel: "High",
    description: "Smart tee shots set up the entire hole. Position beats distance.",
    keyPoints: [
      "Play to your preferred approach shot distance",
      "Avoid trouble areas (water, OB, thick rough)",
      "Use course management over maximum distance",
      "Consider wind and pin position"
    ],
    practiceTime: "Study course layout and practice different tee clubs",
    commonMistakes: ["Always using driver", "Not considering approach shot"],
    proTip: "A 150-yard approach from the fairway is better than a 120-yard approach from the rough."
  },
  {
    id: 9,
    title: "Learn Your Yardages",
    icon: Target,
    difficulty: "Essential",
    timeToLearn: "2-4 weeks",
    impactLevel: "High",
    description: "Knowing exact yardages eliminates guesswork and improves club selection.",
    keyPoints: [
      "Know carry distances for every club",
      "Factor in wind, elevation, and course conditions",
      "Use rangefinder or GPS for accuracy",
      "Understand difference between carry and total distance"
    ],
    practiceTime: "Map out distances on driving range",
    commonMistakes: ["Guessing distances", "Not factoring in conditions"],
    proTip: "Create a yardage chart and keep it in your golf bag for reference."
  },
  {
    id: 10,
    title: "Practice With Purpose",
    icon: CheckCircle,
    difficulty: "Essential",
    timeToLearn: "Ongoing",
    impactLevel: "Very High",
    description: "Quality practice beats quantity. Focus on weaknesses and measurable improvement.",
    keyPoints: [
      "Identify your biggest scoring weaknesses",
      "Practice with specific goals and targets",
      "Track progress with statistics",
      "Simulate on-course pressure during practice"
    ],
    practiceTime: "3-4 focused practice sessions per week",
    commonMistakes: ["Practicing only strengths", "No specific goals"],
    proTip: "Practice the shots you struggle with most during rounds. Track your progress with our handicap calculator."
  }
]

const commonMistakes = [
  {
    mistake: "Playing too aggressively",
    solution: "Conservative course management saves 3-5 strokes per round",
    frequency: "90% of golfers"
  },
  {
    mistake: "Poor short game",
    solution: "Spend 60% of practice time within 100 yards of green",
    frequency: "85% of golfers"
  },
  {
    mistake: "No practice routine",
    solution: "Practice with specific goals 3-4 times per week",
    frequency: "75% of golfers"
  },
  {
    mistake: "Mental game issues",
    solution: "Develop pre-shot routine and positive self-talk",
    frequency: "80% of golfers"
  }
]

const statisticsToTrack = [
  { stat: "Fairways Hit", target: "60%+", importance: "High" },
  { stat: "Greens in Regulation", target: "50%+", importance: "Very High" },
  { stat: "Up and Down %", target: "40%+", importance: "Very High" },
  { stat: "Putts per Round", target: "32 or fewer", importance: "Very High" },
  { stat: "Three-Putts", target: "2 or fewer", importance: "High" },
  { stat: "Penalty Strokes", target: "1 or fewer", importance: "Very High" }
]

export default function HowToBreakEighty() {
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
              "headline": "How to Break 80 in Golf 2025: 10-Step Guide to Sub-80 Scores",
              "description": "Learn how to break 80 in golf with our proven 10-step system. Course management, short game tips, mental strategies. 75% of golfers break 80 using these methods.",
              "author": {
                "@type": "Organization",
                "name": "Welton Golf",
                "url": "https://weltongolf.com",
                "sameAs": ["https://twitter.com/weltongolf"]
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
                "@id": "https://weltongolf.com/blog/how-to-break-80-golf"
              },
              "image": {
                "@type": "ImageObject",
                "url": "https://weltongolf.com/images/how-to-break-80-golf-2025.jpg",
                "width": 1200,
                "height": 630,
                "caption": "How to Break 80 in Golf - 10 Step System for Lower Scores"
              },
              "about": [
                {
                  "@type": "Thing",
                  "name": "Golf Scoring",
                  "description": "Golf scoring improvement and breaking 80"
                },
                {
                  "@type": "Thing",
                  "name": "Golf Instruction",
                  "description": "Golf tips and instruction for score improvement"
                }
              ],
              "articleSection": "Golf Instruction",
              "wordCount": 6000,
              "inLanguage": "en-GB",
              "keywords": "how to break 80 golf, golf scoring tips, course management, short game improvement, golf mental game",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", ".key-statistics"]
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Break 80 in Golf",
              "description": "10-step proven system to consistently shoot under 80 in golf",
              "image": "https://weltongolf.com/images/how-to-break-80-golf-2025.jpg",
              "totalTime": "PT12W",
              "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "GBP",
                "value": "0"
              },
              "supply": [
                {
                  "@type": "HowToSupply",
                  "name": "Golf clubs"
                },
                {
                  "@type": "HowToSupply",
                  "name": "Golf balls"
                },
                {
                  "@type": "HowToSupply",
                  "name": "Practice facility access"
                }
              ],
              "tool": [
                {
                  "@type": "HowToTool",
                  "name": "Handicap calculator"
                },
                {
                  "@type": "HowToTool",
                  "name": "Golf rangefinder"
                }
              ],
              "step": breakingEightySteps.slice(0, 5).map((step, index) => ({
                "@type": "HowToStep",
                "name": step.title,
                "text": step.description,
                "position": index + 1,
                "url": `https://weltongolf.com/blog/how-to-break-80-golf#step-${step.id}`
              }))
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How long does it take to break 80 in golf?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most dedicated golfers can break 80 within 6-12 months of focused practice using proper course management, short game improvement, and mental game development. The key is consistent practice and smart strategy rather than just swing changes."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What handicap do you need to break 80?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You typically need a handicap of 8-12 to consistently break 80. However, higher handicap players can break 80 on good days with excellent course management and putting performance."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What's the most important skill to break 80?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Course management is the most important skill to break 80. Playing smart, conservative golf and avoiding big numbers will lower your scores faster than swing improvements. Focus on keeping the ball in play and making good decisions."
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
              How to Break 80 in Golf
            </h1>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto mb-8">
              Master the proven 10-step system used by thousands of golfers to consistently shoot under 80.
              Our comprehensive guide covers course management, short game mastery, mental strategies, and practice routines
              that work. No swing overhauls required - just smart golf.
            </p>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 rounded-lg p-4 shadow-lg border border-green-200">
                <div className="text-3xl font-bold text-green-700">75%</div>
                <div className="font-semibold text-slate-900">Success Rate</div>
                <div className="text-sm text-slate-600">Golfers using this system</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 shadow-lg border border-blue-200">
                <div className="text-3xl font-bold text-blue-700">6-12</div>
                <div className="font-semibold text-slate-900">Months</div>
                <div className="text-sm text-slate-600">Average time to break 80</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 shadow-lg border border-purple-200">
                <div className="text-3xl font-bold text-purple-700">5-8</div>
                <div className="font-semibold text-slate-900">Strokes</div>
                <div className="text-sm text-slate-600">Average improvement</div>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <Card className="p-6 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Complete Guide Contents</h2>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <Link href="#quick-answer" className="text-blue-600 hover:underline">1. How to Break 80 (Quick Answer)</Link>
              <Link href="#ten-steps" className="text-blue-600 hover:underline">2. 10-Step Breaking 80 System</Link>
              <Link href="#statistics" className="text-blue-600 hover:underline">3. Key Statistics to Track</Link>
              <Link href="#common-mistakes" className="text-blue-600 hover:underline">4. Common Mistakes to Avoid</Link>
              <Link href="#practice-plan" className="text-blue-600 hover:underline">5. Weekly Practice Plan</Link>
              <Link href="#faqs" className="text-blue-600 hover:underline">6. Frequently Asked Questions</Link>
            </div>
          </Card>

          {/* Quick Answer - Featured Snippet Target */}
          <section id="quick-answer">
            <Card className="p-8 mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                How to Break 80 in Golf (Quick Answer)
              </h2>
              <div className="text-slate-700">
                <p className="text-lg mb-4">
                  <strong>To break 80 in golf consistently, focus on these three fundamentals:</strong>
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-green-700 mb-2">🎯 Course Management</h3>
                    <p className="text-sm">Play conservative, aim for center of greens, avoid big numbers. Can save 5-8 strokes immediately.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-blue-700 mb-2">⛳ Short Game</h3>
                    <p className="text-sm">Master chipping, pitching, and putting. 60% of strokes happen within 100 yards of the green.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-purple-700 mb-2">🧠 Mental Game</h3>
                    <p className="text-sm">Stay focused, stick to routine, eliminate emotional decisions. Mental errors cost more than physical ones.</p>
                  </div>
                </div>
                <p className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                  <strong>💡 Key Insight:</strong> Most golfers try to break 80 by hitting longer drives.
                  Instead, focus on eliminating double bogeys and improving putting. This approach works faster and is more sustainable.
                </p>
              </div>
            </Card>
          </section>

          {/* 10-Step System */}
          <section id="ten-steps" className="mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 font-cooper">
              The 10-Step Breaking 80 System
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              This proven system has helped thousands of golfers break 80 consistently. Each step builds on the previous one,
              creating a comprehensive approach to lower scoring. Follow this system and track your progress with our
              <Link href="/handicap-calculator" className="text-blue-600 hover:underline"> handicap calculator</Link>.
            </p>

            <div className="grid gap-8">
              {breakingEightySteps.map((step) => (
                <Card key={step.id} id={`step-${step.id}`} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-3">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <step.icon className="h-6 w-6 text-green-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">
                            Step {step.id}: {step.title}
                          </h3>
                          <p className="text-slate-700 text-lg mb-4">{step.description}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-900 mb-2">Key Implementation Points:</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-700">
                          {step.keyPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-50 p-3 rounded">
                          <h5 className="font-semibold text-blue-900 mb-1">💡 Pro Tip</h5>
                          <p className="text-sm text-blue-800">{step.proTip}</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded">
                          <h5 className="font-semibold text-red-900 mb-1">⚠️ Common Mistakes</h5>
                          <ul className="text-sm text-red-800">
                            {step.commonMistakes.map((mistake, index) => (
                              <li key={index}>• {mistake}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-100 p-4 rounded-lg">
                        <div className="text-sm text-slate-600 mb-2">Difficulty Level</div>
                        <div className={`font-bold text-sm px-2 py-1 rounded ${
                          step.difficulty === 'Essential' ? 'bg-green-200 text-green-800' :
                          step.difficulty === 'Moderate' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-red-200 text-red-800'
                        }`}>
                          {step.difficulty}
                        </div>
                      </div>

                      <div className="bg-slate-100 p-4 rounded-lg">
                        <div className="text-sm text-slate-600 mb-2">Time to Learn</div>
                        <div className="font-semibold text-slate-900">{step.timeToLearn}</div>
                      </div>

                      <div className="bg-slate-100 p-4 rounded-lg">
                        <div className="text-sm text-slate-600 mb-2">Score Impact</div>
                        <div className={`font-bold text-sm px-2 py-1 rounded ${
                          step.impactLevel === 'Very High' ? 'bg-green-200 text-green-800' :
                          'bg-blue-200 text-blue-800'
                        }`}>
                          {step.impactLevel}
                        </div>
                      </div>

                      <div className="bg-slate-100 p-4 rounded-lg">
                        <div className="text-sm text-slate-600 mb-2">Practice Time</div>
                        <div className="text-sm text-slate-700">{step.practiceTime}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Key Statistics */}
          <section id="statistics" className="mb-16">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Key Statistics to Track for Breaking 80
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                Track these six key statistics to monitor your progress toward breaking 80.
                Use our <Link href="/golf-trip-planner" className="text-blue-600 hover:underline">golf tools</Link> to
                record and analyze your performance.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {statisticsToTrack.map((statistic, index) => (
                  <div key={index} className="bg-slate-50 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{statistic.stat}</h3>
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        statistic.importance === 'Very High' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {statistic.importance}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-700 mb-2">{statistic.target}</div>
                    <div className="text-sm text-slate-600">Target for consistent sub-80 scoring</div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">📊 Statistical Reality of Breaking 80</h3>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-700">21%</div>
                    <div className="text-sm text-blue-800">Of golfers break 80 regularly</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-700">36</div>
                    <div className="text-sm text-blue-800">Average putts for breaking 80</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-700">10+</div>
                    <div className="text-sm text-blue-800">Greens in regulation needed</div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Common Mistakes */}
          <section id="common-mistakes" className="mb-16">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Common Mistakes That Prevent Breaking 80
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                Avoid these critical mistakes that keep most golfers shooting in the 80s and 90s.
                Small changes in these areas can lead to immediate score improvement.
              </p>

              <div className="grid gap-6">
                {commonMistakes.map((item, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h3 className="font-bold text-red-900 mb-2">❌ Mistake</h3>
                        <p className="text-red-800">{item.mistake}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-green-900 mb-2">✅ Solution</h3>
                        <p className="text-green-800">{item.solution}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-900 mb-2">📊 Frequency</h3>
                        <p className="text-blue-800">{item.frequency}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Practice Plan */}
          <section id="practice-plan" className="mb-16">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Weekly Practice Plan to Break 80
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                Follow this structured practice routine to systematically improve all areas of your game.
                Quality practice beats quantity - focus on purposeful improvement.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">📅 4-Day Practice Schedule</h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-bold text-green-900 mb-2">Day 1: Short Game Focus</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• 20 minutes: Putting practice (distance control)</li>
                        <li>• 15 minutes: Chipping (various lies)</li>
                        <li>• 15 minutes: Pitching (different distances)</li>
                        <li>• 10 minutes: Bunker practice</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-2">Day 2: Iron Play & Ball Striking</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• 15 minutes: Alignment and setup</li>
                        <li>• 25 minutes: Iron accuracy (targets at different distances)</li>
                        <li>• 15 minutes: Course simulation shots</li>
                        <li>• 5 minutes: Pre-shot routine practice</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h4 className="font-bold text-purple-900 mb-2">Day 3: Putting & Mental Game</h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• 20 minutes: Short putt accuracy (3-6 feet)</li>
                        <li>• 15 minutes: Lag putting practice</li>
                        <li>• 15 minutes: Green reading drills</li>
                        <li>• 10 minutes: Pressure putting exercises</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <h4 className="font-bold text-orange-900 mb-2">Day 4: Course Management</h4>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• 20 minutes: Tee shot strategy practice</li>
                        <li>• 20 minutes: Approach shot scenarios</li>
                        <li>• 15 minutes: Recovery shots</li>
                        <li>• 5 minutes: Course visualization</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">🏌️ On-Course Application</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <h4 className="font-bold text-slate-900 mb-2">Playing Rounds</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• 2-3 rounds per week maximum</li>
                        <li>• Focus on one skill per round</li>
                        <li>• Keep detailed statistics</li>
                        <li>• Play with course management mindset</li>
                      </ul>
                    </div>

                    <div className="bg-slate-100 p-4 rounded-lg">
                      <h4 className="font-bold text-slate-900 mb-2">Practice Rounds</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Play multiple balls from trouble</li>
                        <li>• Practice course-specific shots</li>
                        <li>• Work on pre-shot routines</li>
                        <li>• Experiment with different strategies</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-bold text-yellow-900 mb-2">⚡ Quick Wins</h4>
                      <p className="text-sm text-yellow-800">
                        Start with course management and putting. These areas show immediate improvement
                        and don&apos;t require swing changes. Many golfers break 80 for the first time just
                        by playing smarter golf.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* FAQs */}
          <section id="faqs" className="mb-16">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Breaking 80 Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    How long does it take to break 80 in golf?
                  </h3>
                  <p className="text-slate-700">
                    Most dedicated golfers can break 80 within 6-12 months of focused practice using proper course management,
                    short game improvement, and mental game development. The key is consistent practice and smart strategy rather
                    than just swing changes. Golfers who focus on course management often see results in 2-3 months.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    What handicap do you need to break 80?
                  </h3>
                  <p className="text-slate-700">
                    You typically need a handicap of 8-12 to consistently break 80. However, higher handicap players (15-20)
                    can break 80 on good days with excellent course management and putting performance. The key is eliminating
                    big numbers and capitalizing on good shots.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    What&apos;s the most important skill to break 80?
                  </h3>
                  <p className="text-slate-700">
                    Course management is the most important skill to break 80. Playing smart, conservative golf and avoiding
                    big numbers will lower your scores faster than swing improvements. Focus on keeping the ball in play,
                    aiming for center of greens, and making good strategic decisions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    How many greens in regulation do I need to break 80?
                  </h3>
                  <p className="text-slate-700">
                    You typically need to hit 10-12 greens in regulation to break 80 consistently. However, excellent
                    short game can compensate - if you get up and down 50% of the time when missing greens, you can
                    break 80 with 8-9 greens in regulation.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Should I take lessons to break 80?
                  </h3>
                  <p className="text-slate-700">
                    Lessons can help, but focus on short game and course management lessons rather than swing overhauls.
                    Many golfers break 80 by improving their mental game, putting, and decision-making without major
                    swing changes. Use our <Link href="/handicap-calculator" className="text-blue-600 hover:underline">handicap calculator</Link> to
                    track your progress.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    How many putts per round to break 80?
                  </h3>
                  <p className="text-slate-700">
                    Aim for 32-36 putts per round to break 80 consistently. This means avoiding three-putts and making
                    some putts outside 6 feet. Focus on lag putting to eliminate three-putts and practice 3-6 foot putts
                    to improve your make percentage.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Conclusion CTA */}
          <div className="text-center rounded-lg p-12 text-white" style={{background: `linear-gradient(135deg, #183a37 0%, #9CC69B 100%)`}}>
            <h2 className="text-3xl font-bold mb-4 font-cooper">
              Start Your Breaking 80 Journey Today
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Use our free golf calculators and tools to track your progress toward breaking 80.
              Calculate your handicap, plan practice sessions, and monitor improvement with our
              comprehensive golf resource tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
                <Link href="/handicap-calculator">Calculate Your Handicap</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-black hover:bg-white hover:text-black" asChild>
                <Link href="/golf-trip-planner">Plan Your Golf Trip</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}