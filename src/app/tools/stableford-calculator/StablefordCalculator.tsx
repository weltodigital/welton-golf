'use client'

export function StablefordCalculator() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Stableford Calculator",
            "description": "Free golf Stableford points calculator with automatic handicap stroke allocation and competition scoring.",
            "url": "https://www.weltongolf.com/tools/stableford-calculator",
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
              "Stableford Points Calculation",
              "Handicap Stroke Allocation",
              "Round Tracking",
              "Competition Scoring",
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
                  <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                    Free Stableford Points Calculator
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Calculate Stableford points for your golf round with automatic handicap stroke allocation and scoring. Perfect for competitions and tracking performance.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-10">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Stableford Scoring: The Golfer-Friendly Points System</h2>
                <p className="text-gray-700 mb-6">
                  Stableford is a popular golf scoring system that awards points based on your net score relative to par. Unlike traditional stroke play, bad holes can't ruin your entire round—making golf more enjoyable and encouraging aggressive play.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-blue-900">Standard Stableford Points System</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-white rounded">
                        <span className="text-blue-800"><strong>Eagle (-2):</strong></span>
                        <span className="text-blue-900 font-bold">4 points</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded">
                        <span className="text-blue-800"><strong>Birdie (-1):</strong></span>
                        <span className="text-blue-900 font-bold">3 points</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded">
                        <span className="text-blue-800"><strong>Par (0):</strong></span>
                        <span className="text-blue-900 font-bold">2 points</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-white rounded">
                        <span className="text-blue-800"><strong>Bogey (+1):</strong></span>
                        <span className="text-blue-900 font-bold">1 point</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded">
                        <span className="text-blue-800"><strong>Double Bogey (+2):</strong></span>
                        <span className="text-blue-900 font-bold">0 points</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded">
                        <span className="text-blue-800"><strong>Worse than +2:</strong></span>
                        <span className="text-blue-900 font-bold">0 points</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}