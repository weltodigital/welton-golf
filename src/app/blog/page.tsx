import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Golf Blog - Expert Tips, Guides & Travel | Welton Golf',
  description: 'Discover expert golf tips, comprehensive guides, and travel inspiration. Learn how to break 90, 80, and beyond while exploring the UK\'s best golf destinations.',
  keywords: 'golf blog, golf tips, golf guides, golf travel, how to break 90, how to break 80, golf breaks UK, golf improvement, golf courses',
  openGraph: {
    title: 'Golf Blog - Expert Tips, Guides & Travel | Welton Golf',
    description: 'Expert golf content covering improvement tips, travel guides, and course reviews from the UK\'s leading golf resource.',
    type: 'website',
    url: 'https://www.weltongolf.com/blog',
    images: [
      {
        url: 'https://www.weltongolf.com/golf-blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Welton Golf Blog - Expert Tips and Travel Guides',
      }
    ],
    locale: 'en_GB',
    siteName: 'Welton Golf',
  },
  alternates: {
    canonical: 'https://www.weltongolf.com/blog',
  },
}

const blogArticles = [
  {
    id: 1,
    title: 'Best Golf Breaks in the UK 2025',
    slug: 'best-golf-breaks-uk',
    excerpt: 'Discover 21 ultimate UK golf destinations from Scotland\'s legendary links to England\'s luxury resorts. Complete guide with pricing, booking tips, and championship courses.',
    category: 'Golf Travel',
    publishDate: '2024-12-15',
    readTime: '15 min read',
    featured: true,
    tags: ['Golf Travel', 'UK Golf', 'Golf Breaks', 'Championship Courses'],
    image: '/images/uk-golf-breaks-thumb.jpg'
  },
  {
    id: 2,
    title: 'Best Golf Breaks in Wales',
    slug: 'best-golf-breaks-wales',
    excerpt: 'Explore Wales\' finest golf destinations including Celtic Manor, The Vale Resort, and spectacular coastal courses. Your guide to Welsh golf holidays.',
    category: 'Golf Travel',
    publishDate: '2024-12-12',
    readTime: '12 min read',
    featured: false,
    tags: ['Wales Golf', 'Celtic Manor', 'Golf Travel', 'Ryder Cup Venues'],
    image: '/images/wales-golf-breaks-thumb.jpg'
  },
  {
    id: 3,
    title: 'Best Golf Breaks in Bournemouth',
    slug: 'best-golf-breaks-bournemouth',
    excerpt: 'Discover Bournemouth\'s premier golf courses and resorts. From championship links to luxury spa hotels, your complete guide to south coast golf.',
    category: 'Golf Travel',
    publishDate: '2024-12-10',
    readTime: '10 min read',
    featured: false,
    tags: ['Bournemouth Golf', 'South Coast', 'Golf Travel', 'England Golf'],
    image: '/images/bournemouth-golf-thumb.jpg'
  },
  {
    id: 4,
    title: 'How to Break 80 in Golf',
    slug: 'how-to-break-80-golf',
    excerpt: 'Master the strategies and techniques needed to consistently break 80. Course management, short game secrets, and mental approach for single-digit handicaps.',
    category: 'Golf Improvement',
    publishDate: '2024-12-08',
    readTime: '18 min read',
    featured: true,
    tags: ['Golf Tips', 'Breaking 80', 'Course Management', 'Advanced Golf'],
    image: '/images/break-80-golf-thumb.jpg'
  },
  {
    id: 5,
    title: 'How to Break 90 in Golf',
    slug: 'how-to-break-90-golf',
    excerpt: 'The complete guide to breaking 90 consistently. Focus areas, practice routines, and strategic tips to lower your scores and improve your handicap.',
    category: 'Golf Improvement',
    publishDate: '2024-12-05',
    readTime: '16 min read',
    featured: false,
    tags: ['Golf Tips', 'Breaking 90', 'Golf Improvement', 'Beginner Golf'],
    image: '/images/break-90-golf-thumb.jpg'
  },
  {
    id: 6,
    title: 'How to Break 100 in Golf',
    slug: 'how-to-break-100-golf',
    excerpt: 'Essential fundamentals for breaking 100. Basic techniques, course strategy, and practice tips for beginners and high-handicap golfers.',
    category: 'Golf Improvement',
    publishDate: '2024-12-03',
    readTime: '14 min read',
    featured: false,
    tags: ['Golf Tips', 'Breaking 100', 'Beginner Golf', 'Golf Fundamentals'],
    image: '/images/break-100-golf-thumb.jpg'
  }
]

const categories = [
  { name: 'All Articles', count: blogArticles.length },
  { name: 'Golf Travel', count: blogArticles.filter(a => a.category === 'Golf Travel').length },
  { name: 'Golf Improvement', count: blogArticles.filter(a => a.category === 'Golf Improvement').length }
]

export default function BlogPage() {
  const featuredArticles = blogArticles.filter(article => article.featured)
  const recentArticles = blogArticles.filter(article => !article.featured)

  return (
    <>
      {/* Enhanced Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Welton Golf Blog",
            "description": "Expert golf tips, comprehensive guides, and travel inspiration from the UK's leading golf resource.",
            "url": "https://www.weltongolf.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Welton Golf",
              "url": "https://www.weltongolf.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.weltongolf.com/welton-golf-logo.png",
                "width": 300,
                "height": 60
              }
            },
            "blogPost": blogArticles.map(article => ({
              "@type": "BlogPosting",
              "headline": article.title,
              "description": article.excerpt,
              "url": `https://www.weltongolf.com/blog/${article.slug}`,
              "datePublished": article.publishDate,
              "author": {
                "@type": "Organization",
                "name": "Welton Golf"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Welton Golf"
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.weltongolf.com/blog/${article.slug}`
              }
            }))
          })
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 max-w-7xl">

          {/* Breadcrumbs */}
          <nav className="text-sm text-slate-600 mb-4">
            <ol className="flex space-x-2">
              <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
              <li className="before:content-['/'] before:mx-2 text-slate-900">Blog</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-emerald-600" />
              </div>
              <h1 className="text-5xl font-bold text-slate-900">
                Golf Blog
              </h1>
            </div>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              Expert golf tips, comprehensive guides, and travel inspiration. From breaking 90
              to discovering the UK's finest golf destinations, enhance your game and
              plan unforgettable golf experiences.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={category.name === 'All Articles' ? 'default' : 'outline'}
                className={category.name === 'All Articles' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>

          {/* Featured Articles */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-emerald-600 text-white text-sm font-medium rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.publishDate).toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-2">
                      <Link href={`/blog/${article.slug}`} className="hover:text-emerald-600 transition-colors">
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Link href={`/blog/${article.slug}`}>
                        Read Full Article
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Articles */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Recent Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(article.publishDate).toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight mb-2">
                      <Link href={`/blog/${article.slug}`} className="hover:text-emerald-600 transition-colors">
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-600 line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/blog/${article.slug}`}>
                        Read More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Newsletter/CTA Section */}
          <section className="mt-16">
            <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Improve Your Golf Game
                </h3>
                <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                  Explore our comprehensive golf tools and calculators to track your progress,
                  plan your next golf trip, and take your game to the next level.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                    <Link href="/tools/handicap-calculator">
                      Calculate Your Handicap
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/tools/golf-trip-planner">
                      Plan Your Golf Trip
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Related Tools */}
          <section className="mt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Popular Golf Tools & Resources
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/course-directory" className="text-sm px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors">
                Course Directory
              </Link>
              <Link href="/tools/handicap-calculator" className="text-sm px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors">
                Handicap Calculator
              </Link>
              <Link href="/tools/golf-trip-planner" className="text-sm px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors">
                Trip Planner
              </Link>
              <Link href="/tools/stableford-calculator" className="text-sm px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors">
                Stableford Calculator
              </Link>
              <Link href="/tools/swing-speed-calculator" className="text-sm px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors">
                Swing Speed Calculator
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}