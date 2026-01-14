import { Metadata } from 'next'
import { HandicapCalculatorComponent } from './HandicapCalculatorComponent'

export const metadata: Metadata = {
  title: 'Free Golf Handicap Calculator (WHS) 2025 - Official World Handicap System | Welton Golf',
  description: 'Calculate your official World Handicap System index instantly with our free WHS-compliant calculator. Track scores, understand your handicap, and improve your game. Complete guide included.',
  keywords: 'golf handicap calculator, WHS calculator, World Handicap System, golf handicap index, calculate golf handicap, free handicap calculator, WHS compliant, R&A handicap, USGA handicap',
  openGraph: {
    title: 'Free Golf Handicap Calculator (WHS) - World Handicap System Calculator',
    description: 'Calculate your official handicap index with our WHS-compliant calculator. Free, accurate, and includes complete handicap improvement guide.',
    type: 'article',
    url: 'https://www.weltongolf.com/tools/handicap-calculator',
    images: [
      {
        url: 'https://www.weltongolf.com/golf-handicap-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Golf Handicap Calculator - World Handicap System',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/tools/handicap-calculator',
  },
}

export default function HandicapCalculatorPage() {
  return <HandicapCalculatorComponent />
}
  const [scores, setScores] = useState<ScoreEntry[]>([])
  const [currentScore, setCurrentScore] = useState({
    adjustedGrossScore: '',
    courseRating: '',
    slopeRating: '',
    courseName: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [handicapIndex, setHandicapIndex] = useState<number | null>(null)

  // Load scores from localStorage on component mount
  useEffect(() => {
    const savedScores = localStorage.getItem('golf-handicap-scores')
    if (savedScores) {
      const parsedScores = JSON.parse(savedScores)
      setScores(parsedScores.map((score: any) => ({
        ...score,
        scoreDate: new Date(score.date)
      })))
    }
  }, [])

  const addScore = () => {
    if (!currentScore.adjustedGrossScore || !currentScore.courseRating || !currentScore.slopeRating) {
      return
    }

    const newScore: ScoreEntry = {
      id: Date.now().toString(),
      date: currentScore.date,
      adjustedGrossScore: parseInt(currentScore.adjustedGrossScore),
      courseRating: parseFloat(currentScore.courseRating),
      slopeRating: parseInt(currentScore.slopeRating),
      courseName: currentScore.courseName || 'Unknown Course',
      scoreDate: new Date(currentScore.date)
    }

    setScores(prev => [...prev, newScore].sort((a, b) => b.scoreDate.getTime() - a.scoreDate.getTime()))

    // Reset form
    setCurrentScore({
      adjustedGrossScore: '',
      courseRating: '',
      slopeRating: '',
      courseName: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const removeScore = (id: string) => {
    setScores(prev => prev.filter(score => score.id !== id))
  }

  const calculateHandicap = useCallback(() => {
    if (scores.length < 3) {
      setHandicapIndex(null)
      return
    }

    // Calculate Score Differentials
    const scoreDifferentials = scores.map(score => {
      return ((score.adjustedGrossScore - score.courseRating) * 113) / score.slopeRating
    })

    // WHS Rules for number of scores to use
    let scoresUsed = 1
    if (scores.length >= 5) scoresUsed = 1
    if (scores.length >= 6) scoresUsed = 2
    if (scores.length >= 9) scoresUsed = 3
    if (scores.length >= 12) scoresUsed = 4
    if (scores.length >= 15) scoresUsed = 5
    if (scores.length >= 18) scoresUsed = 6
    if (scores.length >= 20) scoresUsed = 8

    // Sort differentials and take the lowest ones
    const sortedDifferentials = [...scoreDifferentials].sort((a, b) => a - b)
    const bestDifferentials = sortedDifferentials.slice(0, scoresUsed)

    // Calculate average of best differentials
    const average = bestDifferentials.reduce((sum, diff) => sum + diff, 0) / bestDifferentials.length

    // Handicap Index is the average rounded to 1 decimal place
    setHandicapIndex(Math.round(average * 10) / 10)
  }, [scores])

  // Save scores to localStorage whenever scores change
  useEffect(() => {
    if (scores.length > 0) {
      localStorage.setItem('golf-handicap-scores', JSON.stringify(scores))
      calculateHandicap()
    }
  }, [scores, calculateHandicap])

  const clearAllScores = () => {
    setScores([])
    setHandicapIndex(null)
    localStorage.removeItem('golf-handicap-scores')
  }

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Golf Handicap Calculator (WHS)",
            "description": "Free World Handicap System calculator for calculating official golf handicap index with course and slope rating support.",
            "url": "https://www.weltongolf.com/tools/handicap-calculator",
            "applicationCategory": "Sports",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "GBP"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Welton Golf",
              "url": "https://www.weltongolf.com"
            },
            "featureList": [
              "WHS Compliant Algorithm",
              "Course Rating Support",
              "Slope Rating Support",
              "Score History Tracking",
              "Free to Use"
            ]
          })
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">


          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Calculator className="h-6 w-6 text-brand-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">
                  Free Golf Handicap Calculator (WHS)
                </h1>
                <p className="text-gray-700 text-lg">
                  Calculate your official World Handicap System index instantly. UK&apos;s most accurate WHS handicap calculator with course rating and slope rating support.
                </p>
              </div>
            </div>

            {/* SEO-rich description */}
            <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
              <h2 className="text-xl font-bold text-emerald-900 mb-3">
                Official World Handicap System Calculator - Free & Accurate
              </h2>
              <p className="text-emerald-800 mb-3">
                Our golf handicap calculator follows the exact World Handicap System (WHS) rules implemented by R&A and USGA.
                Calculate your handicap index using up to 20 scores with automatic score differential calculations,
                course rating adjustments, and slope rating considerations.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-brand-primary">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  WHS Compliant Algorithm
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Course & Slope Rating Support
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Free - No Registration Required
                </div>
              </div>
            </div>

            {/* Current Handicap Display */}
            {handicapIndex !== null && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                    Your Current Handicap Index
                  </h2>
                  <div className="text-5xl font-bold text-white mb-2">
                    {handicapIndex >= 0 ? '+' : ''}{handicapIndex}
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Based on {scores.length} recorded scores
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Score Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Score
                </CardTitle>
                <CardDescription>
                  Enter your round details to update your handicap calculation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="courseName">Course Name</Label>
                    <Input
                      id="courseName"
                      placeholder="e.g. St Andrews Old Course"
                      value={currentScore.courseName}
                      onChange={(e) => setCurrentScore(prev => ({ ...prev, courseName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date Played</Label>
                    <Input
                      id="date"
                      type="date"
                      value={currentScore.date}
                      onChange={(e) => setCurrentScore(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="adjustedGrossScore">Adjusted Gross Score *</Label>
                  <Input
                    id="adjustedGrossScore"
                    type="number"
                    placeholder="e.g. 85"
                    value={currentScore.adjustedGrossScore}
                    onChange={(e) => setCurrentScore(prev => ({ ...prev, adjustedGrossScore: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="courseRating">Course Rating *</Label>
                    <Input
                      id="courseRating"
                      type="number"
                      step="0.1"
                      placeholder="e.g. 72.1"
                      value={currentScore.courseRating}
                      onChange={(e) => setCurrentScore(prev => ({ ...prev, courseRating: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slopeRating">Slope Rating *</Label>
                    <Input
                      id="slopeRating"
                      type="number"
                      placeholder="e.g. 125"
                      value={currentScore.slopeRating}
                      onChange={(e) => setCurrentScore(prev => ({ ...prev, slopeRating: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <Button
                  onClick={addScore}
                  className="w-full bg-brand-primary hover:bg-brand-dark text-white font-semibold"
                  disabled={!currentScore.adjustedGrossScore || !currentScore.courseRating || !currentScore.slopeRating}
                >
                  Add Score
                </Button>
              </CardContent>
            </Card>

            {/* Score History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      Score History
                    </CardTitle>
                    <CardDescription>
                      Your recent rounds ({scores.length}/20 scores)
                    </CardDescription>
                  </div>
                  {scores.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllScores}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {scores.length === 0 ? (
                  <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                    <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No scores recorded yet.</p>
                    <p className="text-sm">Add at least 3 scores to calculate your handicap.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {scores.map((score) => (
                      <div key={score.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {score.courseName}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">
                            {score.date} • Score: {score.adjustedGrossScore} • CR: {score.courseRating} • SR: {score.slopeRating}
                          </div>
                          <div className="text-xs text-white font-medium">
                            Differential: {(((score.adjustedGrossScore - score.courseRating) * 113) / score.slopeRating).toFixed(1)}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeScore(score.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Blog Content Sections */}
          <div className="mt-12 space-y-12">

            {/* How the WHS Works */}
            <section className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How the World Handicap System (WHS) Calculator Works</h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                The World Handicap System (WHS) revolutionized golf handicapping in 2020, creating a unified global standard adopted by golf governing bodies worldwide, including the R&A, USGA, Golf Australia, and European Golf Association (EGA). Our free golf handicap calculator implements the exact WHS algorithm used by official handicap services, ensuring accuracy and compliance with international standards.
              </p>

              <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-emerald-900">WHS Score Requirements & Rules</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-emerald-800">Minimum Score Requirements:</h4>
                    <ul className="space-y-2 text-emerald-700">
                      <li>• <strong>Initial handicap:</strong> Minimum 3 acceptable scores required</li>
                      <li>• <strong>Established handicap:</strong> Uses most recent 20 scores when available</li>
                      <li>• <strong>18-hole equivalent:</strong> All scores must be adjusted gross scores</li>
                      <li>• <strong>Playing conditions:</strong> Scores should follow WHS adjustments</li>
                      <li>• <strong>Regular updates:</strong> Handicap recalculated after each new score</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-emerald-800">WHS Calculation Method:</h4>
                    <ul className="space-y-2 text-emerald-700">
                      <li>• <strong>Score Differential Formula:</strong> (Adjusted Score - Course Rating) × 113 ÷ Slope Rating</li>
                      <li>• <strong>3-5 scores:</strong> Average of 1 lowest differential</li>
                      <li>• <strong>6-8 scores:</strong> Average of 2 lowest differentials</li>
                      <li>• <strong>9-11 scores:</strong> Average of 3 lowest differentials</li>
                      <li>• <strong>12-20 scores:</strong> Progressive scale up to 8 lowest differentials</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-900">Understanding Course Rating and Slope Rating</h3>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3 text-blue-900">Course Rating Explained</h4>
                  <p className="text-blue-800 mb-4">
                    Course Rating represents the expected score for a scratch golfer (0 handicap) playing the course under normal conditions. This rating accounts for course length, obstacles, green complexity, and overall playing difficulty.
                  </p>
                  <p className="text-sm text-blue-700">
                    <strong>Example:</strong> A course rating of 72.1 means a scratch golfer should average 72.1 strokes under normal conditions. The rating can be higher or lower than par depending on the course's actual difficulty.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3 text-purple-900">Slope Rating Explained</h4>
                  <p className="text-purple-800 mb-4">
                    Slope Rating measures how much more difficult a course plays for bogey golfers compared to scratch golfers. Ratings range from 55-155, with 113 representing standard difficulty.
                  </p>
                  <p className="text-sm text-purple-700">
                    <strong>Higher slope rating</strong> = course becomes disproportionately harder for higher handicap players. A slope of 130+ indicates a very challenging course for recreational golfers.
                  </p>
                </div>
              </div>
            </section>

            {/* Understanding Your Handicap Index */}
            <section className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Your Handicap Index: What Your Number Really Means</h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Your handicap index is more than just a number—it's a measure of your potential scoring ability that allows golfers of different skill levels to compete fairly. Understanding what your handicap means can help you set realistic goals and track meaningful improvement in your game.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Handicap Ranges and What They Mean</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Low Handicap (0-10)</h4>
                    <p className="text-green-800 text-sm mb-2">Skilled players who consistently break 80. These golfers have solid fundamentals and course management skills.</p>
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>• Scratch to single digits</li>
                      <li>• Consistent ball striking</li>
                      <li>• Good short game</li>
                      <li>• Strong mental game</li>
                    </ul>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Mid Handicap (11-20)</h4>
                    <p className="text-blue-800 text-sm mb-2">Recreational golfers who occasionally break 90. Room for improvement in all areas with some consistent strengths.</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Shoot 85-95 typically</li>
                      <li>• Inconsistent ball striking</li>
                      <li>• Developing course management</li>
                      <li>• Working on fundamentals</li>
                    </ul>
                  </div>
                  <div className="bg-orange-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">High Handicap (21+)</h4>
                    <p className="text-orange-800 text-sm mb-2">Beginners and casual players focusing on breaking 100. Lots of opportunity for rapid improvement.</p>
                    <ul className="text-xs text-orange-700 space-y-1">
                      <li>• Learning fundamentals</li>
                      <li>• Focus on consistency</li>
                      <li>• Goal to break 100</li>
                      <li>• Building confidence</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-900">How Often Should You Update Your Handicap?</h3>
              <p className="text-gray-700 mb-6">
                Under the WHS, your handicap index is recalculated every day that new scores are posted. However, for practical purposes, you should aim to post scores from every qualifying round you play. This ensures your handicap accurately reflects your current playing ability and recent trends in your game.
              </p>

              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-6">
                <h4 className="font-semibold mb-3 text-yellow-900">💡 Pro Tips for Accurate Handicap Tracking</h4>
                <ul className="space-y-2 text-yellow-800">
                  <li>• <strong>Post all acceptable scores:</strong> Don't cherry-pick your good rounds</li>
                  <li>• <strong>Use proper adjusted gross scores:</strong> Apply equitable stroke control</li>
                  <li>• <strong>Play from appropriate tees:</strong> Choose tees that match your skill level</li>
                  <li>• <strong>Include 9-hole rounds:</strong> Two 9-hole scores combine to form an 18-hole equivalent</li>
                  <li>• <strong>Play qualifying rounds:</strong> Ensure rounds meet WHS acceptable criteria</li>
                </ul>
              </div>
            </section>

            {/* Common Handicap Mistakes */}
            <section className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Golf Handicap Calculation Mistakes (And How to Avoid Them)</h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Even experienced golfers make errors when calculating or maintaining their handicaps. These mistakes can lead to an inaccurate handicap index that doesn't truly reflect your playing ability. Here are the most common errors and how our WHS calculator helps you avoid them.
              </p>

              <div className="space-y-8">
                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-xl font-semibold mb-3 text-red-900">❌ Mistake #1: Not Using Adjusted Gross Scores</h3>
                  <p className="text-gray-700 mb-3">
                    Many golfers use their actual gross score instead of the adjusted gross score required by WHS. The adjusted gross score applies Equitable Stroke Control, which limits the maximum score on any hole based on your course handicap.
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-800 text-sm">
                      <strong>Solution:</strong> Always apply the appropriate maximum hole score before entering your score. For example, if you're a 20 handicap, the maximum score on any hole is double bogey + handicap strokes received.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-semibold mb-3 text-orange-900">❌ Mistake #2: Using Incorrect Course/Slope Ratings</h3>
                  <p className="text-gray-700 mb-3">
                    Using the wrong tee's course rating and slope rating, or using outdated ratings, will significantly affect your handicap calculation. Each set of tees has different ratings.
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-orange-800 text-sm">
                      <strong>Solution:</strong> Always check the scorecard or course website for the current ratings for the specific tees you played. Our calculator requires both values to ensure accuracy.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6">
                  <h3 className="text-xl font-semibold mb-3 text-yellow-900">❌ Mistake #3: Not Playing from Appropriate Tees</h3>
                  <p className="text-gray-700 mb-3">
                    Playing from tees that are too difficult or too easy can skew your handicap. The WHS recommends playing from tees where the course rating is within 3-5 strokes of your current scoring average.
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      <strong>Solution:</strong> Choose tees based on your average score, not your ego. A good rule of thumb: if you typically shoot 95, play from tees with a course rating around 90-100.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-900">❌ Mistake #4: Cherry-Picking Scores</h3>
                  <p className="text-gray-700 mb-3">
                    Only posting good scores while ignoring poor rounds creates an artificially low handicap that doesn't reflect your true playing ability. This leads to unrealistic expectations and unfair competition.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      <strong>Solution:</strong> Post every acceptable score, including your bad rounds. The WHS algorithm automatically uses your best differentials, so bad scores won't unfairly penalize your handicap.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Improving Your Handicap */}
            <section className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Improve Your Golf Handicap: Evidence-Based Strategies</h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Lowering your handicap requires a strategic approach focused on the areas that have the biggest impact on your scores. Research and data from millions of rounds show that certain aspects of the game contribute more to scoring than others.
              </p>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">The Handicap Improvement Hierarchy</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 text-green-900">Biggest Impact on Scores (Focus Here First):</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border border-green-200">
                        <h5 className="font-semibold text-green-800">1. Short Game (65% of score improvement)</h5>
                        <p className="text-sm text-green-700">Putting, chipping, and bunker play within 100 yards</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-green-200">
                        <h5 className="font-semibold text-green-800">2. Course Management (25% of improvement)</h5>
                        <p className="text-sm text-green-700">Smart decisions, playing to your strengths, avoiding trouble</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-green-200">
                        <h5 className="font-semibold text-green-800">3. Mental Game (15% of improvement)</h5>
                        <p className="text-sm text-green-700">Confidence, focus, emotional control, pre-shot routine</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-blue-900">Moderate Impact (Work on After Basics):</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-800">4. Iron Play Accuracy</h5>
                        <p className="text-sm text-blue-700">Consistent contact, distance control, green targeting</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-800">5. Driver Accuracy</h5>
                        <p className="text-sm text-blue-700">Keeping drives in play, avoiding penalty strokes</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-800">6. Physical Fitness</h5>
                        <p className="text-sm text-blue-700">Flexibility, strength, endurance for consistent swing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-900">Specific Practice Drills for Handicap Improvement</h3>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-emerald-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4 text-emerald-900">For High Handicaps (20+): Focus on Consistency</h4>
                  <ul className="space-y-2 text-emerald-800">
                    <li>• <strong>Putting practice:</strong> 30 minutes per session, focus on 3-6 foot putts</li>
                    <li>• <strong>Chipping fundamentals:</strong> Practice basic chip shots from 20-30 yards</li>
                    <li>• <strong>Swing basics:</strong> Work with a professional on grip, stance, and alignment</li>
                    <li>• <strong>Course management:</strong> Play from appropriate tees, avoid hero shots</li>
                    <li>• <strong>Target:</strong> Break 100 consistently before focusing on advanced techniques</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4 text-blue-900">For Mid Handicaps (10-20): Develop Precision</h4>
                  <ul className="space-y-2 text-blue-800">
                    <li>• <strong>Distance control:</strong> Practice hitting specific yardages with wedges</li>
                    <li>• <strong>Green reading:</strong> Spend time learning how putts break</li>
                    <li>• <strong>Iron consistency:</strong> Focus on solid contact and trajectory control</li>
                    <li>• <strong>Strategic play:</strong> Learn when to be aggressive vs. conservative</li>
                    <li>• <strong>Target:</strong> Eliminate big numbers (double bogey or worse)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Official Handicap Requirements */}
            <section className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Official Handicap Requirements: When You Need More Than a Calculator</h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                While our handicap calculator provides accurate WHS calculations for personal use, certain situations require an official handicap through a recognized golf club or association. Understanding these requirements helps you know when to establish an official handicap.
              </p>

              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-amber-900">When You Need an Official Handicap</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-amber-800">Competition Requirements:</h4>
                    <ul className="space-y-2 text-amber-700">
                      <li>• Club tournaments and competitions</li>
                      <li>• County and regional golf events</li>
                      <li>• Handicap-based society games</li>
                      <li>• Golf travel and corporate events</li>
                      <li>• Any competition requiring verified handicaps</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-amber-800">Course Access Benefits:</h4>
                    <ul className="space-y-2 text-amber-700">
                      <li>• Tee time booking at premium courses</li>
                      <li>• Member guest privileges</li>
                      <li>• Golf society membership</li>
                      <li>• International golf travel</li>
                      <li>• Reciprocal club arrangements</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-900">How to Get an Official Handicap in the UK</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3 text-blue-900">Through England Golf (Most Common Route):</h4>
                  <ol className="space-y-2 text-blue-800">
                    <li>1. <strong>Join a golf club:</strong> Most clubs offer handicap services to members</li>
                    <li>2. <strong>Submit qualifying scores:</strong> 3 cards from different courses</li>
                    <li>3. <strong>Pay annual fee:</strong> Usually £15-25 per year</li>
                    <li>4. <strong>Receive handicap certificate:</strong> Official documentation for competitions</li>
                    <li>5. <strong>Maintain through regular play:</strong> Submit scores regularly to keep handicap current</li>
                  </ol>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3 text-green-900">Alternative Options:</h4>
                  <ul className="space-y-2 text-green-800">
                    <li>• <strong>iGolf membership:</strong> England Golf's digital-only handicap service</li>
                    <li>• <strong>Golf society membership:</strong> Many societies offer handicap services</li>
                    <li>• <strong>Union/corporate golf clubs:</strong> Often available through workplace groups</li>
                    <li>• <strong>Pay-and-play services:</strong> Some facilities offer handicap services to regular players</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg mt-8">
                <h4 className="font-semibold mb-3 text-gray-900">💡 Bridge Strategy: Calculator to Official Handicap</h4>
                <p className="text-gray-700 mb-4">
                  Use our free calculator to track your progress and establish a consistent scoring pattern. Once you have 10-15 rounds recorded, you'll have a good understanding of your playing level and can confidently join a club or service for official handicap establishment.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Pro tip:</strong> Keep detailed records using our calculator - many clubs will accept this data to fast-track your official handicap establishment.
                </p>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Track Your Golf Handicap? The Complete Benefits Guide</h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Tracking your handicap isn't just about having a number—it's about understanding your game, setting meaningful goals, and enjoying golf to its fullest. Whether you use our free calculator or maintain an official handicap, consistent tracking transforms how you approach improvement.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-green-900">Performance Benefits</h3>
                  <ul className="space-y-3 text-green-800">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Objective progress tracking:</strong> See real improvement over time, not just "feel" like you're getting better
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Identify scoring patterns:</strong> Discover which courses, conditions, or setups you play best
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Set realistic goals:</strong> Break down improvement into achievable handicap targets
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Benchmark different aspects:</strong> Track progress in putting, driving accuracy, etc.
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Social & Competitive Benefits</h3>
                  <ul className="space-y-3 text-blue-800">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Fair competition:</strong> Compete meaningfully with players of all skill levels
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Better match play:</strong> Create even games with appropriate stroke allocation
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Tournament entry:</strong> Participate in club, society, and open competitions
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Golf travel opportunities:</strong> Access better courses and golf trips
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-8 rounded-lg border border-purple-200">
                <h3 className="text-xl font-semibold mb-6 text-purple-900">The Psychology of Handicap Improvement</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-800">Motivation Through Measurement</h4>
                    <p className="text-sm text-purple-700">
                      Seeing your handicap drop from 25 to 20 provides concrete evidence of improvement, motivating continued practice and play.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-800">Realistic Expectations</h4>
                    <p className="text-sm text-purple-700">
                      Understanding your handicap helps set appropriate expectations for each round, reducing frustration and increasing enjoyment.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-800">Long-term Perspective</h4>
                    <p className="text-sm text-purple-700">
                      Handicap tracking reveals that improvement in golf is gradual and non-linear, helping maintain perspective during tough periods.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Related Tools Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Related Golf Calculators & Tools</CardTitle>
              <CardDescription>
                Enhance your golf analysis with these complementary tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/tools/course-handicap-calculator"
                  className="p-4 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                >
                  <h3 className="font-bold text-slate-900 group-hover:text-brand-dark mb-2">Course Handicap Calculator</h3>
                  <p className="text-sm text-slate-600">Convert your handicap index to a course handicap for any tee</p>
                </Link>

                <Link
                  href="/tools/stableford-calculator"
                  className="p-4 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                >
                  <h3 className="font-bold text-slate-900 group-hover:text-brand-dark mb-2">Stableford Calculator</h3>
                  <p className="text-sm text-slate-600">Calculate Stableford points based on your handicap and scores</p>
                </Link>

                <Link
                  href="/tools/strokes-gained-calculator"
                  className="p-4 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                >
                  <h3 className="font-bold text-slate-900 group-hover:text-brand-dark mb-2">Strokes Gained Calculator</h3>
                  <p className="text-sm text-slate-600">Analyze your performance with advanced strokes gained metrics</p>
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3">Popular Golf Resources</h4>
                <div className="flex flex-wrap gap-2">
                  <Link href="/course-directory" className="text-sm px-3 py-1 bg-emerald-100 text-brand-primary rounded-full hover:bg-emerald-200">
                    Course Directory
                  </Link>
                  <Link href="/break-90/how-to-break-90-golf" className="text-sm px-3 py-1 bg-emerald-100 text-brand-primary rounded-full hover:bg-emerald-200">
                    Break 90 Guide
                  </Link>
                  <Link href="/break-80/how-to-break-80-golf" className="text-sm px-3 py-1 bg-emerald-100 text-brand-primary rounded-full hover:bg-emerald-200">
                    Break 80 Guide
                  </Link>
                  <Link href="/tools/swing-speed-calculator" className="text-sm px-3 py-1 bg-emerald-100 text-brand-primary rounded-full hover:bg-emerald-200">
                    Swing Speed Calculator
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </>
  )
}