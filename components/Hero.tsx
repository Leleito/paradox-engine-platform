'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

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
        setMessage('Welcome! Check your email for your first weekly insight.')
        setEmail('')
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-900 opacity-10" />
      
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
              <span className="text-sm font-serif text-burgundy-800">Early Adopter Access</span>
            </div>

            <h1 className="text-book-title mb-6">
              Unlock Your
              <span className="block text-gradient-gold">Paradox Engine</span>
            </h1>

            <p className="text-prose mb-8 text-burgundy-700">
              Join our exclusive early adopter community and receive weekly insights 
              on transformation, mindset evolution, and unlocking life's paradoxes. 
              Be among the first to experience our revolutionary approach to growth.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
                  <span className="text-burgundy-900 text-xs">✓</span>
                </div>
                <span className="text-burgundy-800 font-serif">Weekly transformational content</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
                  <span className="text-burgundy-900 text-xs">✓</span>
                </div>
                <span className="text-burgundy-800 font-serif">Exclusive early adopter benefits</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
                  <span className="text-burgundy-900 text-xs">✓</span>
                </div>
                <span className="text-burgundy-800 font-serif">First access to new features</span>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="input-elegant flex-1"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-book whitespace-nowrap"
                >
                  {isSubmitting ? 'Joining...' : 'Join Early Access'}
                </button>
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
            </form>

            <p className="text-sm text-burgundy-600 mt-4 font-serif">
              No payment required • Unsubscribe anytime • Your journey starts now
            </p>
          </motion.div>

          {/* Book Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Book shadow */}
              <div className="absolute inset-0 bg-burgundy-900/20 blur-2xl transform translate-y-8" />
              
              {/* Book cover */}
              <div className="relative bg-gradient-to-br from-burgundy-800 to-burgundy-900 rounded-sm shadow-2xl overflow-hidden aspect-[3/4]">
                {/* Gold accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-600 to-gold-400" />
                
                {/* Book spine effect */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-burgundy-900 to-transparent opacity-50" />
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-16 h-16 bg-gold-500 rounded-full mb-6 flex items-center justify-center">
                    <span className="text-burgundy-900 text-2xl font-display">PE</span>
                  </div>
                  
                  <h2 className="text-3xl font-display text-cream-50 mb-4">
                    Paradox
                    <span className="block text-gold-400">Engine</span>
                  </h2>
                  
                  <div className="divider-gold my-6" />
                  
                  <p className="text-cream-100 font-serif text-sm">
                    Your Guide to Transformation
                  </p>
                  
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <p className="text-gold-400 text-xs font-serif">Early Adopter Edition</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
