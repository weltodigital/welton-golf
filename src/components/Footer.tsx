import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-emerald-600 border-t border-emerald-700 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <Image
                src="/welton-golf-logo.png"
                alt="Welton Golf Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-emerald-100 text-sm">
              Your premier destination for golf apps and tools to enhance your game.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Golf Tools</h4>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li><Link href="/handicap-calculator" className="hover:text-white transition-colors">Handicap Calculator</Link></li>
              <li><Link href="/course-handicap-calculator" className="hover:text-white transition-colors">Course Handicap Calculator</Link></li>
              <li><Link href="/stableford-calculator" className="hover:text-white transition-colors">Stableford Calculator</Link></li>
              <li><Link href="/ball-speed-calculator" className="hover:text-white transition-colors">Ball Speed Calculator</Link></li>
              <li><Link href="/course-directory" className="hover:text-white transition-colors">Course Directory</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li><a href="mailto:weltongolf@weltodigital.com" className="hover:text-white transition-colors">weltongolf@weltodigital.com</a></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-emerald-700 mt-8 pt-8 text-center text-sm text-emerald-100">
          <p>&copy; 2025 Welton Golf. All rights reserved. Enhancing your golf experience.</p>
        </div>
      </div>
    </footer>
  )
}