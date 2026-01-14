import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How Golf Scoring Works - Complete Guide to Golf Scoring Systems | Welton Golf',
  description: 'Learn how golf scoring works with our complete guide to stroke play, Stableford, match play and handicaps. Master the fundamentals to improve your game.',
  keywords: 'how golf scoring works, golf scoring system, stroke play, stableford scoring, match play, golf handicap, golf rules, scoring golf',
  alternates: {
    canonical: '/scoring/how-golf-scoring-works',
  },
}

export default function HowGolfScoringWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How Golf Scoring Works
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Master the fundamentals of golf scoring systems and start playing with confidence
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Let's get into it.
            </p>

            <p>I'll be honest with you.</p>

            <p>When I first started playing golf, the scoring system seemed unnecessarily complicated. There were different formats, handicaps to consider, and rules that didn't always make sense to a beginner.</p>

            <p>But here's the thing – once you understand the basics, golf scoring becomes pretty straightforward. And more importantly, understanding how scoring works will actually help you <Link href="/break-90" className="text-brand-primary hover:text-brand-secondary font-medium">break 90</Link> and improve your overall game.</p>

            <p>So instead of getting overwhelmed by all the different systems, let me walk you through exactly how golf scoring works, starting with the most common format you'll encounter.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Stroke Play: The Foundation</h2>

            <p>Stroke play is the most basic scoring system in golf, and it's what most recreational players use.</p>

            <p>Simply put, you count every single shot you take on each hole, add them up at the end, and that's your score.</p>

            <p>Par 4 hole, took 6 shots? That's a 6 on your scorecard.</p>

            <p>Par 3 hole, took 2 shots? That's a 2.</p>

            <p>The player with the lowest total score wins.</p>

            <p>What makes this system great is its simplicity. There's no complex calculations or confusing rules – just count your shots and write them down.</p>

            <p>But of course, there's more to it when you start factoring in par and handicaps.</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Understanding Par</h3>

            <p>Par represents the number of shots a skilled golfer should take to complete a hole.</p>

            <p>Par 3: Usually shorter holes, typically under 200 yards</p>
            <p>Par 4: Medium-length holes, usually 200-450 yards</p>
            <p>Par 5: Longer holes, typically over 450 yards</p>

            <p>Your score relative to par determines what you call each result:</p>

            <ul className="list-disc list-inside space-y-2 my-6">
              <li><strong>Eagle:</strong> 2 under par (rare but fantastic when it happens)</li>
              <li><strong>Birdie:</strong> 1 under par (always a great feeling)</li>
              <li><strong>Par:</strong> Level with par (solid golf)</li>
              <li><strong>Bogey:</strong> 1 over par (not ideal, but happens to everyone)</li>
              <li><strong>Double bogey:</strong> 2 over par (time to move on and focus on the next hole)</li>
            </ul>

            <p>Now, most recreational players aren't shooting par regularly. If you're working to <Link href="/break-100" className="text-brand-primary hover:text-brand-secondary font-medium">break 100</Link> or even <Link href="/break-80" className="text-brand-primary hover:text-brand-secondary font-medium">break 80</Link>, you'll be dealing with scores above par most of the time – and that's completely normal.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Handicaps: Leveling the Playing Field</h2>

            <p>This is where things get interesting, and honestly, where a lot of golfers get confused.</p>

            <p>A handicap allows players of different skill levels to compete fairly against each other.</p>

            <p>Your <Link href="/tools/handicap-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">handicap index</Link> represents how many shots over par you typically shoot on a standard course.</p>

            <p>For example, if you have a 20 handicap, you're expected to shoot about 20 over par (92 on a par-72 course).</p>

            <p>But it's not quite that simple. Your handicap index gets converted to a <Link href="/tools/course-handicap-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">course handicap</Link> based on the difficulty of the specific course you're playing.</p>

            <p>A tougher course might give you extra shots, while an easier course might reduce your handicap allowance.</p>

            <p>When you subtract your course handicap from your gross score, you get your net score – and that's what you use for competition.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Stableford: Making Bad Holes Less Painful</h2>

            <p>Now this is where golf scoring gets really interesting.</p>

            <p>Instead of counting every shot like stroke play, <Link href="/tools/stableford-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">Stableford scoring</Link> awards points based on your performance relative to par.</p>

            <p>The beauty of Stableford is that one bad hole won't ruin your entire round.</p>

            <p>Here's how the points work:</p>

            <ul className="list-disc list-inside space-y-2 my-6">
              <li><strong>Eagle (2 under par):</strong> 4 points</li>
              <li><strong>Birdie (1 under par):</strong> 3 points</li>
              <li><strong>Par (level par):</strong> 2 points</li>
              <li><strong>Bogey (1 over par):</strong> 1 point</li>
              <li><strong>Double bogey or worse:</strong> 0 points</li>
            </ul>

            <p>What I love about Stableford is that it encourages aggressive play. If you're going for a risky shot and it doesn't work out, you just get zero points for that hole instead of adding multiple penalty shots to your total.</p>

            <p>It's a much more forgiving system, especially for higher handicap players.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Match Play: Hole by Hole Battle</h2>

            <p>Match play is completely different from stroke play or Stableford.</p>

            <p>Instead of counting total shots, you're competing hole by hole against your opponent.</p>

            <p>Win a hole (lower score), you go 1-up. Tie a hole, it's halved. Lose a hole, your lead shrinks or you go 1-down.</p>

            <p>The match ends when one player is ahead by more holes than remain to be played.</p>

            <p>What's interesting about match play is that your actual scores don't matter as much. You could shoot 8 on a par 4, but if your opponent shoots 9, you still win that hole.</p>

            <p>This format creates a completely different strategic approach to the game.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Course Management: Where Scoring Gets Strategic</h2>

            <p>Here's something most golfers don't realize – understanding scoring systems actually improves your course management.</p>

            <p>In stroke play, every shot counts equally. That approach shot that leaves you 40 feet from the pin? It's just as important as your tee shot.</p>

            <p>In Stableford, you might take more risks because the penalty for failure is limited.</p>

            <p>In match play, you might play more conservatively if you're already ahead on a hole, or more aggressively if you're behind.</p>

            <p>The scoring system should influence your strategy, not just determine your final result.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Practical Tips for Better Scoring</h2>

            <p>Understanding the system is one thing, but here's how to actually use this knowledge:</p>

            <p><strong>Pick your battles.</strong> In stroke play, avoid the big numbers. A bogey is far better than a double or triple.</p>

            <p><strong>Know your handicap strokes.</strong> Use our <Link href="/tools/course-handicap-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">course handicap calculator</Link> to understand where you get strokes on each hole.</p>

            <p><strong>Practice scoring formats.</strong> Try playing a few holes using <Link href="/tools/stableford-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">Stableford scoring</Link> – it might change how you approach certain shots.</p>

            <p><strong>Keep it simple.</strong> Don't get caught up in complex calculations during your round. Focus on playing good golf, and worry about the math afterward.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">The Bottom Line</h2>

            <p>Golf scoring doesn't have to be complicated.</p>

            <p>Start with basic stroke play, understand how your handicap works, and gradually explore other formats like Stableford or match play.</p>

            <p>But remember – the scoring system is just keeping track of your performance. The real improvement comes from working on your game, making smarter decisions on the course, and understanding your own strengths and weaknesses.</p>

            <p>Whether you're trying to <Link href="/break-90" className="text-brand-primary hover:text-brand-secondary font-medium">break 90</Link>, <Link href="/break-80" className="text-brand-primary hover:text-brand-secondary font-medium">break 80</Link>, or just enjoy a round with friends, understanding how scoring works will make you a more confident and strategic player.</p>

            <p>Start paying attention to scoring systems, and you'll begin to see just how much they can improve your approach to the game.</p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ready to Improve Your Scoring?</h3>
              <p className="text-gray-700 mb-4">
                Use our professional golf tools to track your progress and understand your game better.
              </p>
              <div className="space-y-2">
                <Link href="/tools/handicap-calculator" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → Calculate Your WHS Handicap Index
                </Link>
                <Link href="/tools/stableford-calculator" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → Try Our Stableford Points Calculator
                </Link>
                <Link href="/tools" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → Explore All Golf Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}