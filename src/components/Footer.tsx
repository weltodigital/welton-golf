import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-16">
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
            <p className="text-slate-400 text-sm">
              Your premier destination for golf apps and tools to enhance your game.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 font-cooper">Golf Tools</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/handicap-calculator" className="hover:text-white">Handicap Calculator</Link></li>
              <li><Link href="/course-handicap-calculator" className="hover:text-white">Course Handicap Calculator</Link></li>
              <li><Link href="/stableford-calculator" className="hover:text-white">Stableford Calculator</Link></li>
              <li><Link href="/ball-speed-calculator" className="hover:text-white">Ball Speed Calculator</Link></li>
              <li><Link href="/course-directory" className="hover:text-white">Course Directory</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 font-cooper">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="mailto:weltongolf@weltodigital.com" className="hover:text-white">weltongolf@weltodigital.com</a></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; 2025 Welton Golf. All rights reserved. Enhancing your golf experience.</p>
        </div>
      </div>
    </footer>
  )
}