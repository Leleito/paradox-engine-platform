import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-burgundy-900 text-cream-100 py-12 relative overflow-hidden">
      {/* Book spine pattern */}
      <div className="absolute inset-0 bg-book-spine opacity-10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                <span className="text-burgundy-900 font-display font-bold text-lg">PE</span>
              </div>
              <span className="font-display text-xl text-cream-50">
                Personal Evolution
              </span>
            </div>
            <p className="text-cream-200 text-sm font-serif">
              Your journey to personal transformation begins here. 
              Join our early adopter community for exclusive weekly insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg text-gold-400 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-cream-200 hover:text-gold-400 transition-colors text-sm font-serif">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/musings" className="text-cream-200 hover:text-gold-400 transition-colors text-sm font-serif">
                  Musings
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-cream-200 hover:text-gold-400 transition-colors text-sm font-serif">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="text-cream-200 hover:text-gold-400 transition-colors text-sm font-serif">
                  Join Early Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display text-lg text-gold-400 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-cream-200 hover:text-gold-400 transition-colors text-sm font-serif">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-cream-200 hover:text-gold-400 transition-colors text-sm font-serif">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-burgundy-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream-300 text-sm font-serif">
              © {currentYear} Personal Evolution. All rights reserved.
            </p>
            <p className="text-cream-300 text-sm font-serif italic">
              "Transform your story, evolve your life"
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

