'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getBookSettings, type BookSettings } from '@/lib/paradoxEngine'

interface DynamicHeroProps {
  onSignup?: (email: string) => void
}

// Fallback settings when Sanity is unavailable
const fallbackSettings: BookSettings = {
  bookTitle: "The Paradox Engine",
  bookSubtitle: "Transform tension into triumph with the integrated framework for navigating life's contradictions",
  heroTagline: "Master the Art of Embracing Contradiction",
  heroDescription: "Discover the revolutionary framework that transforms life's tensions into your greatest assets.",
  earlyAccessMessage: "Join our exclusive early adopter community and get advance access to transformational content that bridges psychology, philosophy, and practical wisdom.",
  signupBenefits: [
    { benefit: "Access to the complete Paradox Engine framework", icon: "🎯" },
    { benefit: "Integrated content across all life domains", icon: "🌟" },
    { benefit: "Personal dashboard with progress tracking", icon: "📊" },
    { benefit: "Weekly transformational insights", icon: "💡" }
  ],
  signupCtaText: "Get Early Access",
  readingProgressMessage: "Continue your transformation",
  exerciseCompletionMessage: "Exercise completed!",
  socialProof: {
    earlyAdopterCount: 1250,
    testimonials: [
      {
        text: "The framework that finally connects all the dots of personal growth.",
        author: "Sarah Chen",
        role: "Entrepreneur"
      },
      {
        text: "This changes everything about how I approach challenges.",
        author: "Marcus Johnson", 
        role: "Executive Coach"
      },
      {
        text: "The most comprehensive approach to life transformation I've seen.",
        author: "Dr. Elena Rodriguez",
        role: "Psychologist"
      }
    ]
  },
  footerTagline: "Transform tension into triumph"
}

export default function DynamicHero({ onSignup }: DynamicHeroProps) {
  const [settings, setSettings] = useState<BookSettings>(fallbackSettings)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [sanityConnected, setSanityConnected] = useState(false)

  useEffect(() => {
    async function fetchSettings() {
      try {
        console.log('Attempting to fetch book settings from Sanity...')
        const bookSettings = await getBookSettings()
        
        if (bookSettings && Object.keys(bookSettings).length > 0) {
          console.log('Successfully loaded Sanity settings')
          setSettings({
            ...fallbackSettings,
            ...bookSettings
          })
          setSanityConnected(true)
        } else {
          console.log('No Sanity data found, using fallback settings')
        }
      } catch (error) {
        console.error('Error fetching book settings from Sanity:', error)
        console.log('Using fallback settings due to Sanity connection issue')
      } finally {
        setIsLoading(false)
      }
    }
    
    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.log('Sanity fetch timeout, using fallback settings')
        setIsLoading(false)
      }
    }, 3000)

    fetchSettings()

    return () => clearTimeout(timeoutId)
  }, [isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'early-adopter' })
      })

      if (response.ok) {
        setMessage('Welcome! Redirecting to your free guide...')
        setEmail('')
        if (onSignup) onSignup(email)
        // Redirect to lead magnet after brief delay
        setTimeout(() => {
          window.location.href = '/lead-magnet'
        }, 1500)
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show minimal loading only for very brief moment
  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Loading skeleton */}
            <div className="text-center lg:text-left space-y-6">
              <div className="h-4 bg-burgundy-200/50 rounded-full w-32 animate-pulse" />
              <div className="h-16 bg-burgundy-200/50 rounded-lg w-full animate-pulse" />
              <div className="h-6 bg-burgundy-100/50 rounded w-4/5 animate-pulse" />
              <div className="h-6 bg-burgundy-100/50 rounded w-3/4 animate-pulse" />
              <div className="h-12 bg-gold-200/50 rounded-lg w-64 animate-pulse" />
            </div>
            <div className="aspect-[3/4] bg-burgundy-100/30 rounded-lg animate-pulse max-w-md mx-auto" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-900 opacity-10" />
      
      {/* Sanity connection indicator (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`px-3 py-1 rounded-full text-xs font-serif ${
            sanityConnected 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
          }`}>
            {sanityConnected ? 'Sanity Connected' : 'Using Fallback Data'}
          </div>
        </div>
      )}
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Early Adopter Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
              <span className="text-sm font-serif text-burgundy-800">Early Access Available</span>
            </div>

            <h1 className="text-book-title mb-6">
              {settings.heroTagline}
            </h1>

            <p className="text-prose mb-8 text-burgundy-700">
              {settings.earlyAccessMessage}
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {settings.signupBenefits?.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">{benefit.icon}</span>
                  </div>
                  <span className="text-burgundy-800 font-serif">{benefit.benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Proof */}
            {settings.socialProof?.earlyAdopterCount > 0 && (
              <motion.div 
                className="mb-6 p-4 bg-gold-500/10 rounded-sm border border-gold-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-sm text-burgundy-700 font-serif">
                  Join {settings.socialProof.earlyAdopterCount}+ early adopters already transforming their lives
                </p>
              </motion.div>
            )}

            {/* Signup Form */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Gmail for instant access"
                  required
                  className="input-elegant flex-1"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-book whitespace-nowrap flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {isSubmitting ? 'Joining...' : 'Join with Gmail'}
                </motion.button>
              </div>
              
              {message && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm font-serif ${
                    message.includes('Welcome') ? 'text-gold-600' : 'text-burgundy-600'
                  }`}
                >
                  {message}
                </motion.p>
              )}
            </motion.form>

            <p className="text-sm text-burgundy-600 mt-4 font-serif">
              Early access • Gmail signup recommended • Join the community
            </p>
          </motion.div>

          {/* Book Preview with Multi-Layered Frame Transitions */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative perspective-1000"
          >
            <div className="relative mx-auto max-w-md">
              {/* Multi-layered frame system */}
              <div className="relative book-3d-hover">
                {/* Outer frame - shifts with hover */}
                <motion.div 
                  className="absolute -inset-8 rounded-xl opacity-60"
                  animate={{ 
                    background: [
                      'linear-gradient(45deg, rgba(180, 83, 9, 0.3), rgba(217, 119, 6, 0.3))',
                      'linear-gradient(45deg, rgba(127, 29, 29, 0.3), rgba(153, 27, 27, 0.3))',
                      'linear-gradient(45deg, rgba(180, 83, 9, 0.3), rgba(217, 119, 6, 0.3))'
                    ],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                />
                
                {/* Middle frame - counter-rotates */}
                <motion.div 
                  className="absolute -inset-6 rounded-lg border-2 opacity-40"
                  animate={{ 
                    borderColor: [
                      'rgba(217, 119, 6, 0.5)',
                      'rgba(153, 27, 27, 0.5)',
                      'rgba(248, 250, 252, 0.5)',
                      'rgba(217, 119, 6, 0.5)'
                    ],
                    rotate: [0, -3, 3, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.03, rotate: -3 }}
                />
                
                {/* Inner frame - breathing effect */}
                <motion.div 
                  className="absolute -inset-4 rounded-lg border border-gold-500/40"
                  animate={{ 
                    scale: [1, 1.02, 1],
                    borderColor: [
                      'rgba(217, 119, 6, 0.4)',
                      'rgba(153, 27, 27, 0.4)',
                      'rgba(217, 119, 6, 0.4)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  whileHover={{ borderColor: 'rgba(217, 119, 6, 0.8)' }}
                />

                {/* Book cover - Core element */}
                {settings.bookCover ? (
                  <motion.div 
                    className="relative aspect-[3/4] rounded-lg shadow-2xl overflow-hidden transform-gpu z-10"
                    whileHover={{ scale: 1.05, rotateY: -5, rotateX: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={settings.bookCover.asset.url}
                      alt={settings.bookCover.alt}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Dynamic overlay that shifts */}
                    <motion.div 
                      className="absolute inset-0"
                      animate={{
                        background: [
                          'linear-gradient(to-t, rgba(0,0,0,0.2) 0%, transparent 40%)',
                          'linear-gradient(to-br, rgba(0,0,0,0.1) 0%, transparent 50%)',
                          'linear-gradient(to-t, rgba(0,0,0,0.2) 0%, transparent 40%)'
                        ]
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />
                    {/* Corner accent that moves */}
                    <motion.div 
                      className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold-500/60"
                      animate={{ rotate: [0, 90, 180, 270, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                ) : (
                  /* Enhanced default design with multi-layer frames */
                  <motion.div 
                    className="relative aspect-[3/4] bg-gradient-to-br from-cream-50 via-cream-100 to-gold-50 rounded-lg shadow-2xl overflow-hidden border border-gold-500/30 transform-gpu z-10"
                    whileHover={{ scale: 1.05, rotateY: -5, rotateX: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated corner frames */}
                    <motion.div 
                      className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-burgundy-600/40"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div 
                      className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold-500/60"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold-500/60"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                    />
                    <motion.div 
                      className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-burgundy-600/40"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    />
                    
                    <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                      <motion.div 
                        className="w-20 h-20 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full mb-8 flex items-center justify-center shadow-lg"
                        animate={{ 
                          rotateY: [0, 360],
                          boxShadow: [
                            '0 10px 25px rgba(217, 119, 6, 0.3)',
                            '0 10px 25px rgba(153, 27, 27, 0.3)',
                            '0 10px 25px rgba(217, 119, 6, 0.3)'
                          ]
                        }}
                        transition={{ 
                          rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                          boxShadow: { duration: 4, repeat: Infinity }
                        }}
                      >
                        <span className="text-white text-3xl font-display">PE</span>
                      </motion.div>
                      
                      <h2 className="text-3xl font-display text-burgundy-800 mb-4">
                        {settings.bookTitle}
                      </h2>
                      
                      <motion.div 
                        className="w-16 h-1 bg-gold-500 mx-auto my-6 rounded-full"
                        animate={{ 
                          scaleX: [1, 1.2, 1],
                          background: [
                            'linear-gradient(90deg, #d97706, #f59e0b)',
                            'linear-gradient(90deg, #991b1b, #dc2626)',
                            'linear-gradient(90deg, #d97706, #f59e0b)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      <p className="text-burgundy-700 font-serif text-sm leading-relaxed">
                        {settings.bookSubtitle}
                      </p>
                      
                      <div className="absolute bottom-8 left-0 right-0 text-center">
                        <motion.p 
                          className="text-gold-600 text-xs font-serif"
                          animate={{ 
                            opacity: [0.7, 1, 0.7],
                            color: ['#d97706', '#991b1b', '#d97706']
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Early Adopter Edition
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Floating elements around the book */}
                <motion.div 
                  className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-gold-500/20 to-burgundy-500/20 rounded-full blur-sm"
                  animate={{ 
                    x: [0, 10, -5, 0],
                    y: [0, -8, 12, 0],
                    scale: [1, 1.2, 0.8, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -bottom-2 -right-6 w-6 h-6 bg-gradient-to-br from-burgundy-500/20 to-gold-500/20 rounded-full blur-sm"
                  animate={{ 
                    x: [0, -8, 12, 0],
                    y: [0, 8, -5, 0],
                    scale: [1, 0.8, 1.3, 1]
                  }}
                  transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                />

                {/* Main floating glow effect */}
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-r from-gold-500/30 to-burgundy-500/30 rounded-lg blur-xl -z-10"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        {settings.socialProof?.testimonials && settings.socialProof.testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20"
          >
            <div className="text-center mb-8">
              <h3 className="text-xl font-display text-burgundy-800 mb-2">
                What Early Adopters Are Saying
              </h3>
              <div className="w-16 h-1 bg-gold-500 mx-auto" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {settings.socialProof.testimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  className="card-book text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <p className="text-burgundy-700 font-serif italic mb-4">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-display text-burgundy-800">{testimonial.author}</p>
                    <p className="text-sm text-burgundy-600 font-serif">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* About the Author - Enhanced with fallback data */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24"
        >
          <div className="card-book">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-16 h-1 bg-gold-500 mb-4" />
                <h3 className="text-xl font-display text-burgundy-800 mb-4">
                  About the Author
                </h3>
                <p className="text-burgundy-700 font-serif mb-6 leading-relaxed">
                  Thomas Njeru is the Co-founder and CEO of Pula, protecting over 16 million 
                  smallholder farmers across Africa and Asia. A former Deloitte Director, he 
                  made the leap from corporate security to entrepreneurial impact at 28.
                </p>
                <p className="text-burgundy-700 font-serif mb-6 leading-relaxed">
                  "The greatest breakthroughs happen when we learn to harness life's contradictions 
                  rather than resolve them. The tension between security and purpose became the 
                  creative force that built everything meaningful in my journey."
                </p>
                <motion.a 
                  href="/about"
                  className="btn-gold inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More About the Journey
                  <span>→</span>
                </motion.a>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-burgundy-800/5 to-gold-500/5 rounded-lg border border-gold-500/20 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    {/* Author Photo - Enhanced with animation */}
                    <motion.div 
                      className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-xl border-4 border-gold-500/30"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                        {/* Placeholder - replace src with actual photo path when available */}
                        <div className="w-full h-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                          <span className="text-white text-4xl font-display">TN</span>
                        </div>
                        {/* When you have the actual photo, replace the div above with:
                        <Image
                          src="/images/thomas-njeru.jpg"
                          alt="Thomas Njeru"
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                        */}
                      </div>
                    </motion.div>
                    <motion.div 
                      className="px-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <h4 className="text-burgundy-800 font-display text-lg mb-2">Thomas Njeru</h4>
                      <p className="text-burgundy-700 font-serif text-sm mb-1">
                        Co-founder & CEO of Pula
                      </p>
                      <p className="text-burgundy-600 font-serif text-xs">
                        Former Deloitte Director • Author of "The Paradox Engine"
                      </p>
                      <p className="text-gold-600 font-serif text-xs mt-2">
                        Protecting 16+ million farmers across Africa & Asia
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 