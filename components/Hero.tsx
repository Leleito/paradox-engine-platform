'use client'

import React from 'react'
import { useState } from 'react'
import LeadMagnetModal from './LeadMagnetModal'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="diamond-symbol bg-palette-warm scale-75"></div>
                <h1 className="text-4xl lg:text-6xl font-bold font-display logo-palette">
                  The Paradox Engine
                </h1>
                <div className="diamond-symbol bg-palette-warm scale-75"></div>
              </div>
              
              <p className="text-lg lg:text-xl text-palette-dark mb-8 font-medium">
                Master the art of turning tension into triumph. 
                Discover how Kenya's most successful entrepreneurs 
                transform conflict into competitive advantage.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Get Free Sample Chapters
                </button>
                <a 
                  href="#preview" 
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Read Preview
                </a>
              </div>
              
              <div className="flex items-center gap-8 text-sm text-palette-dark justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="diamond-symbol bg-cream-100 scale-25"></div>
                  <span>150+ Early Readers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="diamond-symbol bg-cream-100 scale-25"></div>
                  <span>4.9/5 Pre-Launch Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="diamond-symbol bg-cream-100 scale-25"></div>
                  <span>Coming Soon</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Book Visual */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Book Cover */}
              <div className="book-cover-fallback w-80 h-96 rounded-lg shadow-2xl border-4 border-palette-dark relative overflow-hidden">
                {/* Book spine effect */}
                <div className="absolute left-0 top-0 w-6 h-full bg-palette-dark"></div>
                
                {/* Book cover pattern */}
                <div className="book-cover-pattern absolute inset-0 opacity-30"></div>
                
                {/* Book cover content */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 text-palette-deepest">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="diamond-symbol bg-palette-warm scale-125"></div>
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-2">THE</h3>
                    <h2 className="text-3xl font-black font-display mb-2">PARADOX</h2>
                    <h3 className="text-2xl font-bold font-display">ENGINE</h3>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex justify-center gap-2 mb-4">
                      <div className="diamond-symbol bg-cream-300 scale-50"></div>
                      <div className="diamond-symbol bg-cream-300 scale-25"></div>
                      <div className="diamond-symbol bg-cream-300 scale-50"></div>
                    </div>
                    <p className="text-lg font-semibold">THOMAS NJERU</p>
                  </div>
                </div>
                
                {/* Layered silhouette effect */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="silhouette-shape w-16 h-16 opacity-20"></div>
                </div>
                <div className="absolute right-8 top-1/3 transform -translate-y-1/2">
                  <div className="silhouette-shape w-12 h-12 opacity-30"></div>
                </div>
                <div className="absolute right-6 bottom-1/4 transform translate-y-1/2">
                  <div className="silhouette-shape w-8 h-8 opacity-40"></div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-palette-warm rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-palette-medium rounded-full opacity-40 animate-pulse delay-1000"></div>
              <div className="absolute top-1/4 -left-8 w-4 h-4 bg-palette-warm rounded-full opacity-50 animate-pulse delay-500"></div>
              
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-palette-warm/10 to-palette-medium/10 rounded-lg blur-xl -z-10 scale-110"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-palette-warm/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-palette-medium/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-palette-dark/5 rounded-full blur-xl"></div>
      </div>

      <LeadMagnetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}
