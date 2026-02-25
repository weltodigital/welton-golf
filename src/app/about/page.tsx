import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Welton Golf | Who We Are',
  description: 'Learn about Welton Golf — who we are, why we built these free golf tools, and how we help golfers improve their game.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Welton Golf
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Learn about who we are and why we created these free golf tools
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Welton Golf</h2>
            <div className="prose prose-lg max-w-none">
              {/* TODO: OWNER TO FILL IN: 2-3 paragraphs about who you are, your golf background,
              why you built this site, and what makes your tools useful */}
              <p className="text-gray-700 mb-4">
                [OWNER TO FILL IN: Add 2-3 paragraphs about your golf background and experience.
                Explain why you're passionate about golf and what motivated you to create these tools.
                Share your story and what makes your approach unique.]
              </p>
              <p className="text-gray-700 mb-4">
                [OWNER TO FILL IN: Describe your expertise and what qualifies you to create these tools.
                Mention any relevant experience with golf, handicap systems, or golf instruction.
                Explain how you ensure the accuracy and usefulness of your calculators.]
              </p>
              <p className="text-gray-700">
                [OWNER TO FILL IN: Talk about your commitment to providing free, accurate tools
                and how you hope to help golfers improve their game. Mention what sets your tools
                apart from others available online.]
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="prose prose-lg max-w-none">
              {/* TODO: OWNER TO FILL IN: 1-2 paragraphs about helping golfers improve */}
              <p className="text-gray-700 mb-4">
                [OWNER TO FILL IN: Describe your mission to help golfers improve their game.
                Explain how your free tools and guides contribute to this goal. Talk about
                your commitment to accuracy and helping golfers at all skill levels.]
              </p>
              <p className="text-gray-700">
                [OWNER TO FILL IN: Share your vision for the future of the site and how you
                plan to continue helping the golf community. Mention your commitment to keeping
                tools free and accessible to all golfers.]
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact</h2>
            <p className="text-gray-700 text-lg">
              Email: <a href="mailto:weltongolf@weltodigital.com" className="text-brand-primary hover:text-brand-secondary">weltongolf@weltodigital.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Follow Us</h2>
            <div className="text-gray-700">
              {/* TODO: OWNER TO FILL IN: Links to social media profiles */}
              <p>
                [OWNER TO FILL IN: Add links to your social media profiles like Twitter,
                Instagram, YouTube, etc. Include any other ways people can connect with
                you or follow updates about new tools and features.]
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}