import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Handicap Index Explained - WHS Handicap System Guide | Welton Golf',
  description: 'Understanding your handicap index made simple. Learn how the WHS handicap system works, what your handicap index means, and how to use it effectively.',
  keywords: 'handicap index explained, WHS handicap system, golf handicap index, what is handicap index, how handicap index works, world handicap system',
  alternates: {
    canonical: '/scoring/handicap-index-explained',
  },
}

export default function HandicapIndexExplainedPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Handicap Index Explained
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Master the World Handicap System and understand exactly what your handicap index means for your game
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Let me be straight with you.
            </p>

            <p>Your handicap index is probably the most misunderstood number in golf.</p>

            <p>I've played with golfers who think their handicap is just some random number they picked up along the way. Others treat it like a badge of honor or shame. And don't get me started on the players who have no idea what their actual handicap means for their game.</p>

            <p>But here's the thing – understanding your handicap index is crucial if you want to <Link href="/break-90" className="text-brand-primary hover:text-brand-secondary font-medium">break 90</Link> consistently, compete fairly with other golfers, and actually track your improvement over time.</p>

            <p>So let me walk you through exactly what a handicap index is, how it works under the World Handicap System (WHS), and most importantly, how to use this knowledge to improve your game.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">What Exactly Is a Handicap Index?</h2>

            <p>Your handicap index is a portable number that represents your demonstrated golf ability.</p>

            <p>Think of it as your golf "GPA" – it takes your recent scores, adjusts for course difficulty, and gives you a single number that shows how you typically perform relative to par.</p>

            <p>Under the World Handicap System, your handicap index is calculated using your best 8 scores from your most recent 20 rounds. It's not your average – it's specifically designed to represent your potential on a good day, not your typical day.</p>

            <p>This is important because it means your handicap reflects what you're capable of, not what you usually shoot.</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">The WHS Revolution</h3>

            <p>Before 2020, different countries had different handicap systems. The USGA system in America, CONGU in Great Britain and Ireland, Golf Australia's system – they all worked differently.</p>

            <p>The World Handicap System changed all that. Now, whether you're playing in Scotland, California, or anywhere else, your handicap means the same thing.</p>

            <p>Your handicap index can range from +5.4 (for tour-level players) down to 54.0 (for beginners). Most recreational golfers fall somewhere between 10 and 30.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">How Your Handicap Index Is Calculated</h2>

            <p>This is where it gets interesting, and honestly, where most golfers get lost.</p>

            <p>Your handicap index isn't just your average score minus par. It's much more sophisticated than that.</p>

            <p>Here's how it works:</p>

            <p><strong>Step 1: Score Differentials</strong><br />
            Each round you play gets converted to a "score differential." This takes your gross score, subtracts the Course Rating, multiplies by 113, then divides by the Slope Rating.</p>

            <p>Don't worry about the math – our <Link href="/tools/handicap-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">handicap calculator</Link> does all this for you automatically.</p>

            <p><strong>Step 2: Best 8 from 20</strong><br />
            The system takes your best 8 score differentials from your most recent 20 rounds and averages them.</p>

            <p><strong>Step 3: The 96% Factor</strong><br />
            That average gets multiplied by 0.96 (96%) to give you your handicap index.</p>

            <p>Why 96%? Because the system is designed to give you a handicap that you'll better about 20% of the time. It's your potential, not your average.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Course Handicap vs. Handicap Index</h2>

            <p>Here's where it gets confusing for a lot of golfers.</p>

            <p>Your handicap index is like your passport – it's the same everywhere you go.</p>

            <p>Your course handicap is what you actually use for a specific round at a specific course from specific tees.</p>

            <p>Let's say your handicap index is 15.0. On an easy course, your <Link href="/tools/course-handicap-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">course handicap</Link> might be 13. On a tough course, it might be 17.</p>

            <p>The course handicap adjusts your index based on the difficulty of the course you're actually playing. Tougher courses give you more strokes; easier courses give you fewer.</p>

            <p>This is why you can't just use your handicap index directly when you're playing – you need to convert it to a course handicap first.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">What Your Handicap Index Actually Tells You</h2>

            <p>Now this is where your handicap becomes useful for actual improvement.</p>

            <p>If your handicap index is 20, it means on your good days, you shoot about 20 over par on a standard course. But that's just the starting point.</p>

            <p>More importantly, your handicap tells you:</p>

            <p><strong>Your improvement trajectory:</strong> If it's going down, you're getting better. If it's going up, you need to work on your game.</p>

            <p><strong>Your realistic expectations:</strong> A 20-handicap shouldn't expect to <Link href="/break-80" className="text-brand-primary hover:text-brand-secondary font-medium">break 80</Link> regularly. Focus on <Link href="/break-100" className="text-brand-primary hover:text-brand-secondary font-medium">breaking 100</Link> first.</p>

            <p><strong>Your scoring patterns:</strong> Big jumps in your handicap usually mean you're either not playing enough or you're going through a rough patch with your game.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Using Your Handicap for Course Strategy</h2>

            <p>Here's something most golfers never think about – your handicap should actually influence how you play.</p>

            <p>If you're a 25-handicap, you shouldn't be going for pins tucked behind bunkers. Your handicap is telling you that consistency matters more than hero shots.</p>

            <p>If you're a 10-handicap, you can start taking calculated risks because your fundamentals are solid enough to recover from mistakes.</p>

            <p>Your handicap isn't just a number for keeping score – it's a guide for smart course management.</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Handicap Strokes Strategy</h3>

            <p>Understanding where you get your handicap strokes is crucial for scoring.</p>

            <p>Each hole is ranked 1-18 based on difficulty relative to par. If you're getting 18 strokes, you get one on every hole. If you're getting 9 strokes, you get them on holes ranked 1-9.</p>

            <p>Smart players know this and adjust their strategy accordingly. On your stroke holes, play more aggressively because a bogey becomes a net par.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Common Handicap Myths Debunked</h2>

            <p>Let me clear up some misconceptions I hear all the time.</p>

            <p><strong>Myth: "I don't need a handicap because I just play for fun."</strong><br />
            Wrong. Your handicap helps you track improvement and play appropriate tees. Even casual players benefit from knowing their ability level.</p>

            <p><strong>Myth: "My handicap should equal my average score minus par."</strong><br />
            Nope. Your handicap represents your potential, not your average. It's based on your best rounds, not all of them.</p>

            <p><strong>Myth: "Lower handicappers always beat higher handicappers."</strong><br />
            Not true. That's the whole point of the handicap system – to level the playing field so anyone can compete with anyone.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Maintaining an Accurate Handicap</h2>

            <p>Here's the thing about handicaps – they only work if they're accurate.</p>

            <p>Post every score, good or bad. The system is designed to handle variation, but it can't handle missing data.</p>

            <p>Don't manipulate your scores. "Breakfast ball" mulligans and generous gimmes might make you feel better, but they make your handicap useless.</p>

            <p>Play from appropriate tees for your skill level. If you're struggling to <Link href="/break-90" className="text-brand-primary hover:text-brand-secondary font-medium">break 90</Link>, don't play from the tips.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Using Your Handicap to Set Goals</h2>

            <p>Your handicap index is the best tool you have for setting realistic golf goals.</p>

            <p>If you're currently a 25-handicap, aiming to get to 20 this year is realistic. Aiming to get to 10 probably isn't.</p>

            <p>Use your handicap to celebrate legitimate improvement. Dropping from 22 to 19 might not sound like much, but it represents real progress in your game.</p>

            <p>Most importantly, don't let your handicap define your enjoyment of the game. It's a tool for improvement, not a measure of your worth as a golfer.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">The Bottom Line</h2>

            <p>Your handicap index isn't just a number on a card.</p>

            <p>It's a reflection of your current ability, a tool for fair competition, and a roadmap for improvement.</p>

            <p>Understanding how it works helps you set realistic goals, choose appropriate courses and tees, and track your progress over time.</p>

            <p>Whether you're working to <Link href="/break-100" className="text-brand-primary hover:text-brand-secondary font-medium">break 100</Link> for the first time or trying to get your handicap into single digits, knowing what your number means is the first step toward playing better golf.</p>

            <p>So calculate your handicap accurately, understand what it tells you about your game, and use it as motivation to keep improving.</p>

            <p>Because at the end of the day, the best handicap is the one that's going down.</p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ready to Calculate Your Handicap?</h3>
              <p className="text-gray-700 mb-4">
                Use our professional WHS handicap calculator to track your progress and understand your game better.
              </p>
              <div className="space-y-2">
                <Link href="/tools/handicap-calculator" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → Calculate Your WHS Handicap Index
                </Link>
                <Link href="/tools/course-handicap-calculator" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → Convert to Course Handicap
                </Link>
                <Link href="/scoring/how-golf-scoring-works" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → Learn How Golf Scoring Works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}