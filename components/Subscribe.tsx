'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Subscribe() {
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
        setMessage('Success! Check your email for confirmation.')
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
    <section className="py-20 px-4 bg-gradient-to-b from-cream-50 to-cream-100">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="book-page text-center"
        >
          {/* Gold accent */}
          <div className="w-16 h-1 bg-gold-500 mx-auto mb-8" />
          
          <h2 className="text-chapter mb-6">
            Join Our Early Adopter Community
          </h2>
          
          <p className="text-prose mx-auto mb-8">
            Be among the first to receive exclusive weekly insights on personal transformation. 
            As an early adopter, you'll get special access to content, features, and opportunities 
            before anyone else.
          </p>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card-book">
              <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold-600 text-xl">📚</span>
              </div>
              <h3 className="font-display text-lg text-burgundy-800 mb-2">Weekly Insights</h3>
              <p className="text-sm text-burgundy-700">
                Curated content on mindset, growth, and transformation
              </p>
            </div>
            
            <div className="card-book">
              <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold-600 text-xl">🎯</span>
              </div>
              <h3 className="font-display text-lg text-burgundy-800 mb-2">Early Access</h3>
              <p className="text-sm text-burgundy-700">
                First to experience new features and content
              </p>
            </div>
            
            <div className="card-book">
              <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold-600 text-xl">🌟</span>
              </div>
              <h3 className="font-display text-lg text-burgundy-800 mb-2">Exclusive Benefits</h3>
              <p className="text-sm text-burgundy-700">
                Special opportunities for our founding members
              </p>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="input-elegant flex-1"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-book"
              >
                {isSubmitting ? 'Joining...' : 'Join Now'}
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
          </form>

          <p className="text-xs text-burgundy-600 mt-6 font-serif">
            Free forever for early adopters • No credit card required • Unsubscribe anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
} 