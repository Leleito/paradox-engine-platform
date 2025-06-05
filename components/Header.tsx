'use client'

import { useState } from 'react'
import { Menu, X, Book } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-palette-light/95 backdrop-blur-sm z-50 border-b border-palette-medium shadow-palette">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with palette gradient */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-palette-dark rounded-xl flex items-center justify-center shadow-palette">
              <div className="diamond-symbol scale-75 bg-palette-warm"></div>
            </div>
            <span className="text-xl font-bold logo-palette font-serif">The Paradox Engine</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#preview" className="text-palette-dark hover:text-palette-deepest transition-colors font-medium">
              Preview
            </a>
            <a href="#features" className="text-palette-dark hover:text-palette-deepest transition-colors font-medium">
              Features
            </a>
            <a href="/musings" className="text-palette-dark hover:text-palette-deepest transition-colors font-medium">
              Musings
            </a>
            <a href="#community" className="text-palette-dark hover:text-palette-deepest transition-colors font-medium">
              Community
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#newsletter" className="btn-secondary text-sm">
              Get Updates
            </a>
            <a href="/subscribe" className="bg-palette-warm hover:bg-palette-warm/90 text-palette-deepest font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm shadow-palette">
              Subscribe Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-palette-medium transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-palette-dark" />
            ) : (
              <Menu className="w-6 h-6 text-palette-dark" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-palette-medium bg-palette-light/95 book-cover-pattern">
            <nav className="flex flex-col space-y-4">
              <a
                href="#preview"
                className="text-palette-dark hover:text-palette-deepest transition-colors px-2 py-1 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Preview
              </a>
              <a
                href="#features"
                className="text-palette-dark hover:text-palette-deepest transition-colors px-2 py-1 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="/musings"
                className="text-palette-dark hover:text-palette-deepest transition-colors px-2 py-1 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Musings
              </a>
              <a
                href="#community"
                className="text-palette-dark hover:text-palette-deepest transition-colors px-2 py-1 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-palette-medium">
                <a href="#newsletter" className="btn-secondary text-sm">
                  Get Updates
                </a>
                <a href="/subscribe" className="bg-palette-warm hover:bg-palette-warm/90 text-palette-deepest font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm shadow-palette">
                  Subscribe Now
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
