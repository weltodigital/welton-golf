import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <div className="container mx-auto max-w-lg">
        <Card className="text-center shadow-lg">
          <CardHeader className="pb-4">
            <div className="w-24 h-24 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900 dark:text-white">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-lg">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-slate-600 dark:text-slate-400">
              The page you&apos;re looking for might have moved, or the URL might be incorrect.
              Don&apos;t worry - you can explore our golf applications from the homepage.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go to Homepage
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="javascript:history.back()">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Link>
              </Button>
            </div>

            <div className="border-t pt-6 mt-6">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                Quick links to help you navigate:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="#golf-apps" className="text-sm text-green-600 hover:text-green-800 hover:underline">
                  Golf Apps
                </Link>
                <span className="text-slate-300">•</span>
                <Link href="#features" className="text-sm text-green-600 hover:text-green-800 hover:underline">
                  Features
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need help? Contact us at{" "}
            <a href="mailto:weltongolf@weltodigital.com" className="text-green-600 hover:text-green-800 hover:underline">
              weltongolf@weltodigital.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}