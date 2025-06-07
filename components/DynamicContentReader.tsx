'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { BookContent, updateUserProgress, saveExerciseResponse } from '@/lib/paradoxEngine'

interface DynamicContentReaderProps {
  content: BookContent
  userEmail?: string
  onSignupRequired: () => void
  onContinueReading: (position: string) => void
}

export default function DynamicContentReader({ 
  content, 
  userEmail, 
  onSignupRequired,
  onContinueReading 
}: DynamicContentReaderProps) {
  const [isSignedUp, setIsSignedUp] = useState(!!userEmail)
  const [readingProgress, setReadingProgress] = useState(0)
  const [showSignupPrompt, setShowSignupPrompt] = useState(false)
  const [currentPosition, setCurrentPosition] = useState('')
  const [startTime] = useState(Date.now())
  const [exerciseResponses, setExerciseResponses] = useState<Record<string, any>>({})
  const contentRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Calculate reading progress based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return
      
      const element = contentRef.current
      const scrollTop = window.pageYOffset
      const windowHeight = window.innerHeight
      const docHeight = element.offsetHeight
      const elementTop = element.offsetTop
      
      const totalDocScrollLength = docHeight + elementTop - windowHeight
      const scrollPercent = Math.min(
        Math.max((scrollTop - elementTop) / (docHeight - windowHeight), 0), 
        1
      ) * 100
      
      setReadingProgress(scrollPercent)
      
      // Update current position for bookmark
      const visibleElements = element.querySelectorAll('[data-position]')
      visibleElements.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top >= 0 && rect.top <= windowHeight / 2) {
          setCurrentPosition(el.getAttribute('data-position') || '')
        }
      })
      
      // Show signup prompt after significant reading (roughly 2 pages)
      if (!isSignedUp && scrollPercent > content.previewPercentage && !showSignupPrompt) {
        setShowSignupPrompt(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [content.previewPercentage, isSignedUp, showSignupPrompt])

  // Save progress periodically
  useEffect(() => {
    if (!userEmail) return
    
    const saveProgress = async () => {
      const timeSpent = (Date.now() - startTime) / (1000 * 60) // minutes
      await updateUserProgress({
        userEmail,
        contentId: content._id,
        readingProgress,
        lastPosition: currentPosition,
        timeSpent: timeSpent,
        isCompleted: readingProgress >= 95
      })
    }

    const interval = setInterval(saveProgress, 30000) // Save every 30 seconds
    return () => clearInterval(interval)
  }, [userEmail, content._id, readingProgress, currentPosition, startTime])

  const handleExerciseResponse = async (exerciseId: string, questionId: string, response: string) => {
    const key = `${exerciseId}-${questionId}`
    setExerciseResponses(prev => ({ ...prev, [key]: response }))
    
    if (userEmail) {
      await saveExerciseResponse({
        userEmail,
        contentId: content._id,
        exerciseId,
        questionId,
        response
      })
    }
  }

  const handleSignup = (email: string) => {
    setIsSignedUp(true)
    setShowSignupPrompt(false)
    onContinueReading(currentPosition)
  }

  // Custom components for PortableText
  const components = {
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-3xl font-display text-burgundy-800 mb-6" data-position={`h1-${Math.random()}`}>
          {children}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-2xl font-display text-burgundy-800 mb-4" data-position={`h2-${Math.random()}`}>
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl font-display text-burgundy-800 mb-3" data-position={`h3-${Math.random()}`}>
          {children}
        </h3>
      ),
      normal: ({ children }: any) => (
        <p className="text-prose text-burgundy-800 mb-6 leading-relaxed" data-position={`p-${Math.random()}`}>
          {children}
        </p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-gold-500 pl-6 my-8 italic text-burgundy-700" data-position={`quote-${Math.random()}`}>
          {children}
        </blockquote>
      )
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-bold text-burgundy-900">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      highlight: ({ children }: any) => <mark className="bg-gold-200 px-1">{children}</mark>,
      callToAction: ({ children, value }: any) => (
        <span 
          className="inline-block bg-gold-500/20 text-burgundy-800 px-3 py-1 rounded-full text-sm font-serif cursor-pointer hover:bg-gold-500/30 transition-colors"
          onClick={() => {
            if (value.type === 'signup' && !isSignedUp) {
              onSignupRequired()
            }
          }}
        >
          {children} {value.type === 'signup' && '→'}
        </span>
      )
    },
    types: {
      exercise: ({ value }: any) => (
        <div className="my-8 p-6 bg-gradient-to-br from-burgundy-800/5 to-gold-500/5 rounded-sm border border-burgundy-800/10" data-position={`exercise-${value.title}`}>
          <h4 className="font-display text-lg text-burgundy-800 mb-4">
            🎯 {value.title}
          </h4>
          <p className="text-burgundy-700 font-serif mb-6">{value.instructions}</p>
          
          <div className="space-y-4">
            {value.questions?.map((q: any, index: number) => (
              <div key={index} className="space-y-2">
                <label className="block text-burgundy-800 font-serif font-medium">
                  {q.question}
                </label>
                
                {q.type === 'text' && (
                  <textarea
                    className="w-full p-3 border border-burgundy-800/20 rounded-sm font-serif resize-vertical"
                    rows={3}
                    placeholder="Share your thoughts..."
                    onChange={(e) => handleExerciseResponse(value.title, q.question, e.target.value)}
                    disabled={!isSignedUp}
                  />
                )}
                
                {q.type === 'scale' && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-burgundy-600">1</span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      className="flex-1"
                      aria-label={`Rate from 1 to 10: ${q.question}`}
                      onChange={(e) => handleExerciseResponse(value.title, q.question, e.target.value)}
                      disabled={!isSignedUp}
                    />
                    <span className="text-sm text-burgundy-600">10</span>
                  </div>
                )}
                
                {q.type === 'choice' && q.options && (
                  <div className="space-y-2">
                    {q.options.map((option: string, optIndex: number) => (
                      <label key={optIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`${value.title}-${index}`}
                          value={option}
                          onChange={(e) => handleExerciseResponse(value.title, q.question, e.target.value)}
                          disabled={!isSignedUp}
                        />
                        <span className="text-burgundy-700 font-serif">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {!isSignedUp && (
            <div className="mt-4 p-3 bg-gold-500/10 rounded-sm border border-gold-500/20">
              <p className="text-sm text-burgundy-700 font-serif">
                📧 Sign up to save your responses and track your progress
              </p>
            </div>
          )}
        </div>
      )
    }
  }

  const previewWordCount = Math.floor((content.content?.length || 0) * (content.previewPercentage / 100))
  const shouldShowContent = isSignedUp || readingProgress <= content.previewPercentage

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-burgundy-100">
        <div 
          className="h-full bg-gold-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Content Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-burgundy-800/10 text-burgundy-700 rounded-full text-sm font-serif capitalize">
            {content.category}
          </span>
          <span className="text-sm text-burgundy-600 font-serif">
            {content.readingTime} min read
          </span>
          {isSignedUp && (
            <span className="text-sm text-green-600 font-serif">
              ✓ Signed up
            </span>
          )}
        </div>
        <h1 className="text-book-title mb-4">{content.title}</h1>
        <div className="w-24 h-1 bg-gold-500" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="book-page">
        <div className="prose prose-burgundy max-w-none">
          {content.content && (
            <PortableText 
              value={shouldShowContent ? content.content : content.content.slice(0, previewWordCount)}
              components={components}
            />
          )}
        </div>
      </div>

      {/* Signup Prompt Overlay */}
      {showSignupPrompt && !isSignedUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-cream-50 rounded-sm p-8 max-w-md w-full book-page"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-gold-600 text-2xl">📖</span>
              </div>
              
              <h3 className="text-chapter mb-4">Continue Your Journey</h3>
              <p className="text-prose text-burgundy-700 mb-6">
                You've unlocked a preview of this transformational content. 
                Enter your email to continue reading and save your progress.
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  const email = (e.target as any).email.value
                  handleSignup(email)
                }}
                className="space-y-4"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  className="input-elegant w-full"
                />
                <button type="submit" className="btn-book w-full">
                  Continue Reading
                </button>
              </form>
              
              <p className="text-xs text-burgundy-600 mt-4 font-serif">
                Early access • Save your progress • Join the community
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Reading Progress Indicator */}
      <div ref={progressRef} className="fixed bottom-6 right-6 bg-burgundy-800 text-cream-50 px-4 py-2 rounded-full text-sm font-serif">
        {Math.round(readingProgress)}% complete
      </div>
    </div>
  )
} 