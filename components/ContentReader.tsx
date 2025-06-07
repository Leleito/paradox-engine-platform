'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ContentReaderProps {
  title: string
  category: string
  content: string
  isUnlocked?: boolean
  previewPercentage?: number
  onSubscribe?: (email: string) => void
}

export default function ContentReader({ 
  title, 
  category, 
  content, 
  isUnlocked = false, 
  previewPercentage = 50,
  onSubscribe 
}: ContentReaderProps) {
  const [email, setEmail] = useState('')
  const [showSignup, setShowSignup] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  // Calculate preview content
  const words = content.split(' ')
  const previewWords = Math.floor(words.length * (previewPercentage / 100))
  const previewContent = words.slice(0, previewWords).join(' ')
  const remainingContent = words.slice(previewWords).join(' ')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'content-access' })
      })

      if (response.ok) {
        setMessage('Success! Check your email for full access.')
        if (onSubscribe) onSubscribe(email)
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
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-burgundy-800/10 text-burgundy-700 rounded-full text-sm font-serif capitalize">
            {category}
          </span>
          <span className="text-sm text-burgundy-600 font-serif">
            {Math.ceil(words.length / 200)} min read
          </span>
        </div>
        <h1 className="text-book-title mb-4">{title}</h1>
        <div className="w-24 h-1 bg-gold-500" />
      </div>

      {/* Content */}
      <div className="book-page">
        <div className="prose prose-burgundy max-w-none">
          {/* Preview Content */}
          <div className="text-prose text-burgundy-800 leading-relaxed">
            {previewContent}
            {!isUnlocked && remainingContent && '...'}
          </div>

          {/* Locked Content or Full Content */}
          {isUnlocked ? (
            <div className="text-prose text-burgundy-800 leading-relaxed mt-4">
              {remainingContent}
            </div>
          ) : remainingContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8"
            >
              {/* Gradient Overlay */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream-50/80 to-cream-50 pointer-events-none h-32 -mt-16" />
                
                {/* Subscription Call-to-Action */}
                <div className="text-center py-12 px-8 bg-gradient-to-br from-burgundy-800/5 to-gold-500/5 rounded-sm border border-burgundy-800/10">
                  <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-gold-600 text-2xl">📖</span>
                  </div>
                  
                  <h3 className="text-chapter mb-4">Continue Reading</h3>
                  <p className="text-prose text-burgundy-700 mb-6 max-w-md mx-auto">
                    You've read {previewPercentage}% of this article. Enter your email to unlock the full content and get access to our weekly insights.
                  </p>

                  {!showSignup ? (
                    <button
                      onClick={() => setShowSignup(true)}
                      className="btn-book"
                    >
                      Unlock Full Article
                    </button>
                  ) : (
                    <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
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
                          className="btn-book whitespace-nowrap"
                        >
                          {isSubmitting ? 'Unlocking...' : 'Get Access'}
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
                        Free access • Weekly insights • Unsubscribe anytime
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 