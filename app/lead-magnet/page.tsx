'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

const leadMagnetSections = [
  {
    id: 1,
    title: "The Paradox Engine Framework",
    subtitle: "A Revolutionary Approach to Human Transformation",
    content: `
      The Paradox Engine Framework represents a revolutionary approach to human transformation that integrates insights from economics, politics, spirituality, and psychology into a unified system for growth.

      Unlike traditional self-help approaches that focus on isolated aspects of development, this framework recognizes that true evolution happens at the intersection of multiple domains. Your relationship with money reflects your beliefs about self-worth. Your political views reveal your assumptions about power and agency. Your spiritual practices shape your relationship with uncertainty and meaning.

      **Why This Matters Now**

      We live in an age of unprecedented complexity. The challenges we face—personal and collective—require a new kind of thinking. Compartmentalized approaches to growth simply don't work when everything is interconnected.

      The framework consists of four interconnected pillars, each influencing the others in ways that traditional thinking often misses. When you understand these connections, you gain access to leverage points that most people never see.
    `
  },
  {
    id: 2,
    title: "The Four Interconnected Pillars",
    subtitle: "Where True Transformation Happens",
    content: `
      **Economic Consciousness**: Understanding how your relationship with resources, money, and value creation reflects and shapes your inner world. This isn't just about financial literacy—it's about recognizing the psychology of abundance and scarcity that governs every aspect of your life.

      **Political Awareness**: Recognizing how power dynamics in society mirror and influence your personal relationships and self-perception. This pillar helps you understand how collective systems shape individual consciousness and how personal transformation contributes to social change.

      **Spiritual Integration**: Developing practices that connect you to something larger than yourself while remaining grounded in practical reality. This isn't about religious dogma—it's about cultivating the capacity for transcendence that fuels resilience and wisdom.

      **Relational Intelligence**: Understanding how intimacy, sexuality, and connection become laboratories for growth. Our closest relationships reveal our deepest patterns and offer the greatest opportunities for evolution.

      The magic happens in the spaces between these pillars. When you understand how your economic beliefs affect your spiritual practice, or how your political assumptions influence your relationships, you gain access to leverage points that most people never see.
    `
  }
]

// Note: metadata moved to layout since this is now a client component

export default function LeadMagnetPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [hasReadPages, setHasReadPages] = useState(1)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  // Track reading progress
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage > hasReadPages) {
        setHasReadPages(currentPage)
      }
    }, 3000) // Consider page "read" after 3 seconds

    return () => clearTimeout(timer)
  }, [currentPage, hasReadPages])

  const handleNextPage = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'lead-magnet-complete' })
      })

      if (response.ok) {
        setMessage('Success! Redirecting to full content access...')
        setTimeout(() => {
          router.push('/content')
        }, 2000)
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentSection = leadMagnetSections[currentPage - 1]
  const shouldShowSignup = hasReadPages >= 2 && currentPage === 2

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-gold-600 text-2xl">🎁</span>
            </div>
            <span className="px-4 py-2 bg-gold-500/20 text-gold-700 rounded-full text-sm font-serif mb-4 inline-block">
              Free Preview
            </span>
            <h1 className="text-book-title mb-4">
              Paradox Engine Framework
            </h1>
            <p className="text-prose text-burgundy-700 max-w-2xl mx-auto">
              A comprehensive guide to understanding transformation through the integration 
              of economics, politics, spirituality, and psychology.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-burgundy-600 font-serif mb-2">
              <span>Progress</span>
              <span>Page {currentPage} of 2</span>
            </div>
            <div className="w-full bg-burgundy-100 rounded-full h-2">
              <div 
                className="bg-gold-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentPage / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Content Section */}
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="book-page mb-8"
          >
            <div className="mb-6">
              <h2 className="text-chapter mb-2">{currentSection.title}</h2>
              <p className="text-lg text-burgundy-700 font-serif italic">{currentSection.subtitle}</p>
            </div>
            
            <div className="prose prose-burgundy max-w-none">
              <div className="text-prose text-burgundy-800 leading-relaxed whitespace-pre-line">
                {currentSection.content}
              </div>
            </div>
          </motion.div>

          {/* Navigation & Signup */}
          {!shouldShowSignup ? (
            <div className="flex justify-between items-center">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`btn-book ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                ← Previous
              </button>
              
              <div className="text-center">
                <p className="text-sm text-burgundy-600 font-serif">
                  {currentPage === 1 ? 'Continue reading to unlock full access' : 'Almost there...'}
                </p>
              </div>
              
              <button 
                onClick={handleNextPage}
                disabled={currentPage === 2}
                className={`btn-gold ${currentPage === 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next →
              </button>
            </div>
          ) : (
            /* Signup Section */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12 px-8 bg-gradient-to-br from-burgundy-800/5 to-gold-500/5 rounded-sm border border-burgundy-800/10"
            >
              <div className="w-20 h-20 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-gold-600 text-3xl">🚀</span>
              </div>
              
              <h3 className="text-chapter mb-4">Ready for the Complete Framework?</h3>
              <p className="text-prose text-burgundy-700 mb-6 max-w-md mx-auto">
                You've experienced the foundation. Now get access to the complete framework, 
                practical exercises, assessment tools, and our exclusive content library.
              </p>

              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Gmail for instant access"
                    required
                    className="input-elegant flex-1"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-book whitespace-nowrap flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {isSubmitting ? 'Getting Access...' : 'Join with Gmail'}
                  </button>
                </div>
                
                {message && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-sm font-serif ${
                      message.includes('Success') ? 'text-gold-600' : 'text-burgundy-600'
                    }`}
                  >
                    {message}
                  </motion.p>
                )}
                
                <p className="text-xs text-burgundy-600 mt-4 font-serif">
                  Complete framework • Gmail recommended • Assessment tools • Exclusive content
                </p>
              </form>
            </motion.div>
          )}

          {/* What's Included Preview */}
          <div className="mt-16 book-page bg-gradient-to-br from-burgundy-800/5 to-gold-500/5">
            <h2 className="text-chapter mb-6 text-center">Complete Framework Includes</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-display text-burgundy-800 mb-2">Assessment Tools</h3>
                <p className="text-sm text-burgundy-700 font-serif">
                  Detailed diagnostic tools for each pillar of development
                </p>
              </div>
              
              <div>
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-display text-burgundy-800 mb-2">Practical Exercises</h3>
                <p className="text-sm text-burgundy-700 font-serif">
                  Hands-on practices for developing consciousness in each domain
                </p>
              </div>
              
              <div>
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-display text-burgundy-800 mb-2">Content Library</h3>
                <p className="text-sm text-burgundy-700 font-serif">
                  Access to exclusive articles and advanced concepts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
} 