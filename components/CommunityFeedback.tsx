'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FeedbackFormData {
  type: string
  content: string
  rating?: number
  relatedArticle?: string
  userInfo: {
    name: string
    email: string
  }
}

interface CommunityFeedbackProps {
  relatedArticle?: string
  relatedTitle?: string
  className?: string
}

export default function CommunityFeedback({ 
  relatedArticle, 
  relatedTitle, 
  className = '' 
}: CommunityFeedbackProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<FeedbackFormData>({
    type: relatedArticle ? 'comment' : 'platform',
    content: '',
    rating: undefined,
    userInfo: {
      name: '',
      email: ''
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const feedbackTypes = [
    { value: 'comment', label: '💬 Article Comment', icon: '💬' },
    { value: 'platform', label: '🔧 Platform Feedback', icon: '🔧' },
    { value: 'request', label: '💡 Content Request', icon: '💡' },
    { value: 'feature', label: '⚡ Feature Request', icon: '⚡' },
    { value: 'bug', label: '🐛 Bug Report', icon: '🐛' },
    { value: 'inquiry', label: '❓ General Inquiry', icon: '❓' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Prepare submission data
      const submissionData = {
        ...formData,
        relatedArticle: relatedArticle || null,
        metadata: {
          userAgent: navigator.userAgent,
          pageUrl: window.location.href,
          sessionId: sessionStorage.getItem('session-id') || 'anonymous'
        }
      }

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      })

      if (response.ok) {
        setShowSuccess(true)
        setSubmitMessage('Thank you! Your feedback has been received and will be reviewed by our team.')
        setFormData({
          type: relatedArticle ? 'comment' : 'platform',
          content: '',
          rating: undefined,
          userInfo: { name: '', email: '' }
        })
        
        // Auto-close after success
        setTimeout(() => {
          setIsOpen(false)
          setShowSuccess(false)
        }, 3000)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      setSubmitMessage('Sorry, there was an error submitting your feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderRatingSelector = () => {
    if (formData.type !== 'comment' && formData.type !== 'platform') return null

    return (
      <div className="space-y-2">
        <label className="block text-sm font-serif text-burgundy-700">
          Rating (Optional)
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
              className={`text-2xl transition-colors ${
                (formData.rating || 0) >= star ? 'text-gold-500' : 'text-gray-300'
              } hover:text-gold-400`}
            >
              ⭐
            </button>
          ))}
          {formData.rating && (
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, rating: undefined }))}
              className="text-sm text-burgundy-600 hover:text-burgundy-800 ml-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 ${className}`}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h3 className="text-lg font-display text-green-800 mb-2">Feedback Submitted!</h3>
          <p className="text-green-700 font-serif text-sm">{submitMessage}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 bg-gradient-to-r from-burgundy-50 to-gold-50 border border-burgundy-200 rounded-lg hover:from-burgundy-100 hover:to-gold-100 transition-all ${
          isOpen ? 'border-burgundy-300' : ''
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">💬</span>
          <div className="text-left">
            <h3 className="font-display text-burgundy-800">
              {relatedTitle ? `Comment on "${relatedTitle}"` : 'Share Your Feedback'}
            </h3>
            <p className="text-sm text-burgundy-600 font-serif">
              Help us improve your experience
            </p>
          </div>
        </div>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-burgundy-600"
        >
          ↓
        </motion.span>
      </motion.button>

      {/* Feedback Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="bg-white border border-burgundy-200 rounded-lg p-6 space-y-4">
              {/* Feedback Type */}
              <div className="space-y-2">
                <label className="block text-sm font-serif text-burgundy-700">
                  Feedback Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                      className={`p-3 text-left rounded-lg border text-sm transition-all ${
                        formData.type === type.value
                          ? 'border-burgundy-300 bg-burgundy-50 text-burgundy-800'
                          : 'border-gray-200 hover:border-burgundy-200 text-gray-700'
                      }`}
                    >
                      <span className="mr-2">{type.icon}</span>
                      {type.label.replace(/.*? /, '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              {renderRatingSelector()}

              {/* User Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-serif text-burgundy-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.userInfo.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      userInfo: { ...prev.userInfo, name: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-burgundy-300 focus:ring-1 focus:ring-burgundy-300 outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-serif text-burgundy-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={formData.userInfo.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      userInfo: { ...prev.userInfo, email: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-burgundy-300 focus:ring-1 focus:ring-burgundy-300 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Feedback Content */}
              <div>
                <label className="block text-sm font-serif text-burgundy-700 mb-2">
                  Your Feedback
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder={`Share your ${formData.type === 'comment' ? 'thoughts on this article' : 'feedback about the platform'}...`}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-burgundy-300 focus:ring-1 focus:ring-burgundy-300 outline-none transition-colors resize-none"
                  required
                  minLength={10}
                  maxLength={2000}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.content.length}/2000 characters
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-burgundy-600 hover:text-burgundy-800 font-serif"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.content.trim() || !formData.userInfo.name || !formData.userInfo.email}
                  className="px-6 py-2 bg-burgundy-800 text-white rounded-lg hover:bg-burgundy-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-serif"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm font-serif ${
                    submitMessage.includes('Thank you') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {submitMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 