import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Course Handicap vs Playing Handicap - Key Differences Explained | Welton Golf',
  description: 'Understand the crucial difference between course handicap and playing handicap. Learn when to use each and how they affect your golf scoring and competition play.',
  keywords: 'course handicap vs playing handicap, course handicap playing handicap difference, golf handicap types, WHS handicap system, handicap strokes allocation',
  alternates: {
    canonical: '/scoring/course-handicap-vs-playing-handicap',
  },
}

export default function CourseHandicapVsPlayingHandicapPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Course Handicap vs Playing Handicap
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Master the difference between these two handicap types and never get confused about which strokes you get again
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Here's the deal.
            </p>

            <p>Course handicap and playing handicap are probably the most confused terms in modern golf.</p>

            <p>I've seen golfers argue on the first tee about how many strokes they get. I've watched players look up their handicap on three different apps and get three different numbers. And honestly, I've made mistakes myself when the World Handicap System changed how all this works.</p>

            <p>But understanding the difference between course handicap and playing handicap isn't just about avoiding awkward conversations on the tee. It's about knowing exactly how many strokes you get, when you get them, and how to use that knowledge to <Link href="/break-90" className="text-brand-primary hover:text-brand-secondary font-medium">break 90</Link> or improve your scoring.</p>

            <p>So let me break down exactly what each one means, when you use them, and why it matters for your game.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Course Handicap: Your Strokes for That Specific Course</h2>

            <p>Your course handicap is the number of strokes you get to play a specific course from specific tees.</p>

            <p>Think of it as your <Link href="/scoring/handicap-index-explained" className="text-brand-primary hover:text-brand-secondary font-medium">handicap index</Link> adjusted for the difficulty of the actual course you're playing.</p>

            <p>Here's how it works: Let's say your handicap index is 15.0. That's your portable number that works anywhere in the world.</p>

            <p>But when you show up at your local course, that 15.0 gets converted to a course handicap based on the course difficulty. If it's an easier course, you might get 13 strokes. If it's tougher, you might get 17.</p>

            <p>The <Link href="/tools/course-handicap-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">course handicap calculator</Link> does this by using the course's Slope Rating and Course Rating to adjust your index for that specific layout.</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">When Do You Use Course Handicap?</h3>

            <p>Course handicap is what you use for most recreational rounds and casual betting games.</p>

            <p>If you're just playing a friendly round and tracking your score against par, you use your course handicap. It tells you exactly how many strokes you get relative to that course's par.</p>

            <p>For example, if you're a 15 course handicap on a par-72 course, you're "expected" to shoot around 87. That's your benchmark for the day.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Playing Handicap: Your Strokes After Competition Adjustments</h2>

            <p>Now this is where it gets interesting.</p>

            <p>Playing handicap is your course handicap after any competition-specific adjustments have been applied.</p>

            <p>In most casual play, your playing handicap equals your course handicap. But in competitive formats, especially team events, your playing handicap might be different.</p>

            <p>Here are the main situations where playing handicap differs from course handicap:</p>

            <p><strong>Four-Ball (Better Ball) Matches:</strong> You get 90% of your course handicap</p>
            <p><strong>Foursomes (Alternate Shot):</strong> You get 50% of your combined course handicaps</p>
            <p><strong>Some Scrambles:</strong> Various percentage reductions based on team format</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Why the Adjustments?</h3>

            <p>The World Handicap System adjusts handicaps in team formats because having a partner changes the dynamics of the game.</p>

            <p>In four-ball, for example, you're playing your own ball, but you can rely on your partner if you have a bad hole. That partnership provides an advantage, so the system reduces your handicap allowance to 90%.</p>

            <p>In alternate shot, you're sharing shots with your partner, which creates different challenges and advantages than individual play.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">The Practical Difference on the Course</h2>

            <p>Let me give you a real-world example that shows why this matters.</p>

            <p>Say your handicap index is 20.0, and you're playing a course where your course handicap comes out to 22.</p>

            <p><strong>In stroke play:</strong> Your playing handicap is 22. You get strokes on the 22 hardest holes.</p>

            <p><strong>In four-ball match play:</strong> Your playing handicap is 20 (90% of 22, rounded). You get strokes on the 20 hardest holes.</p>

            <p>That difference of 2 strokes could absolutely affect the outcome of your match.</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Stroke Allocation Matters</h3>

            <p>Understanding where you get your strokes is just as important as knowing how many you get.</p>

            <p>Holes are ranked 1-18 based on their difficulty relative to par. If you're getting 18 strokes, you get one on every hole. If you're getting 9 strokes, you get them on holes ranked 1-9 (the hardest holes relative to par).</p>

            <p>This is where course management becomes crucial. On holes where you get a stroke, you can play more aggressively because a bogey becomes a net par.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Common Mistakes and Misunderstandings</h2>

            <p>Here are the mistakes I see most often when golfers are figuring out their handicaps:</p>

            <p><strong>Using handicap index directly:</strong> Your handicap index isn't what you use on the course. You need to convert it to a course handicap first.</p>

            <p><strong>Forgetting format adjustments:</strong> In competitive play, make sure you're using playing handicap, not course handicap.</p>

            <p><strong>Wrong tees:</strong> Your course handicap changes based on which tees you're playing. Make sure you're calculating from the correct tees.</p>

            <p><strong>Old system thinking:</strong> The old system worked differently. If you're still thinking in terms of the old USGA or CONGU systems, you need to update your understanding.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">How to Calculate Each One</h2>

            <p>Let me walk you through the process step by step.</p>

            <p><strong>Step 1: Know Your Handicap Index</strong><br />
            This comes from your <Link href="/tools/handicap-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">handicap calculation</Link> based on your recent scores. It's portable and works anywhere.</p>

            <p><strong>Step 2: Calculate Your Course Handicap</strong><br />
            Use the course's Slope Rating and Course Rating to convert your index. Our <Link href="/tools/course-handicap-calculator" className="text-brand-primary hover:text-brand-secondary font-medium">course handicap calculator</Link> does this automatically.</p>

            <p><strong>Step 3: Apply Format Adjustments (if needed)</strong><br />
            For stroke play: Playing handicap = Course handicap<br />
            For four-ball: Playing handicap = 90% of course handicap<br />
            For foursomes: Playing handicap = 50% of combined course handicaps</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Strategic Implications for Your Game</h2>

            <p>Understanding these different handicap types actually helps your course management.</p>

            <p>When you know exactly where your strokes are allocated, you can make smarter decisions about risk and reward.</p>

            <p>On holes where you don't get a stroke, conservative play often makes more sense. A bogey is just a bogey, so avoiding big numbers becomes the priority.</p>

            <p>On holes where you do get a stroke, you can be more aggressive. That approach shot to a pin tucked behind a bunker becomes more attractive when you know a bogey gives you a net par.</p>

            <p>This strategic thinking is what separates golfers who just play, from golfers who are actively working to <Link href="/break-80" className="text-brand-primary hover:text-brand-secondary font-medium">break 80</Link> or improve their scores consistently.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Technology Makes It Easier</h2>

            <p>Here's some good news – you don't have to memorize all these calculations.</p>

            <p>Most modern golf apps and course systems automatically calculate your course handicap when you check in. Many will also apply format adjustments for competitive rounds.</p>

            <p>But understanding the process helps you double-check the numbers and catch errors when they happen.</p>

            <p>I've seen scorecards with wrong handicap allocations, apps with outdated course data, and pro shops using old calculation methods. Knowing how it should work protects you from these mistakes.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Keeping Your Handicap Current</h2>

            <p>None of this matters if your <Link href="/scoring/handicap-index-explained" className="text-brand-primary hover:text-brand-secondary font-medium">handicap index</Link> isn't accurate in the first place.</p>

            <p>Post every score, play by the rules, and keep your handicap updated. An accurate handicap index is the foundation for accurate course and playing handicaps.</p>

            <p>Remember, the whole system is designed to create fair competition and help you track improvement. It only works if everyone maintains honest, current handicaps.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">The Bottom Line</h2>

            <p>Course handicap tells you how many strokes you get on that specific course.</p>

            <p>Playing handicap tells you how many strokes you actually get after any competition format adjustments.</p>

            <p>For most casual rounds, they're the same number. For competitive play, playing handicap might be reduced based on the format.</p>

            <p>Understanding both helps you play smarter golf, avoid scoring disputes, and use your strokes strategically.</p>

            <p>Whether you're trying to <Link href="/break-100" className="text-brand-primary hover:text-brand-secondary font-medium">break 100</Link> for the first time or competing in club championships, knowing exactly how many strokes you get – and where you get them – gives you a real advantage on the course.</p>

            <p>So next time someone asks about your handicap, you'll know exactly which number they need and why it matters.</p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Calculate Your Handicaps</h3>
              <p className="text-gray-700 mb-4">
                Use our professional calculators to determine your course handicap and understand how the WHS system works.
              </p>
              <div className="space-y-2">
                <Link href="/tools/course-handicap-calculator" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → Course Handicap Calculator
                </Link>
                <Link href="/tools/handicap-calculator" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → WHS Handicap Index Calculator
                </Link>
                <Link href="/scoring/handicap-index-explained" className="block text-brand-primary hover:text-brand-secondary font-medium">
                  → Understanding Handicap Index
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}