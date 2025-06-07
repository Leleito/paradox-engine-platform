'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession, getProviders } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

interface Provider {
  id: string
  name: string
  type: string
}

interface Providers {
  [key: string]: Provider
}

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [providers, setProviders] = useState<Providers | null>(null)
  const [hasGoogleProvider, setHasGoogleProvider] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const error = searchParams.get('error')

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        console.log('✅ User already signed in, redirecting to:', callbackUrl)
        router.push(callbackUrl)
      }
    })

    // Load available authentication providers
    loadProviders()
    
    // Handle OAuth errors from URL parameters
    handleOAuthErrors()
  }, [router, callbackUrl, error])

  const loadProviders = async () => {
    try {
      console.log('🔍 Loading authentication providers...')
      const authProviders = await getProviders()
      console.log('📋 Available providers:', authProviders)
      
      setProviders(authProviders)
      setHasGoogleProvider(!!(authProviders?.google))
      
      if (authProviders?.google) {
        console.log('✅ Google OAuth provider available')
      } else {
        console.log('⚠️  Google OAuth provider not configured')
      }
    } catch (error) {
      console.error('❌ Error loading providers:', error)
      setHasGoogleProvider(false)
    }
  }

  const handleOAuthErrors = () => {
    if (error) {
      console.error('🚨 OAuth Error detected:', error)
      
      const errorMessages: { [key: string]: string } = {
        'OAuthSignin': 'Error occurred during Google sign-in. Please try again.',
        'OAuthCallback': 'Error in OAuth callback. Please try again.',
        'OAuthCreateAccount': 'Could not create account. Please try again.',
        'EmailCreateAccount': 'Could not create account with email. Please try again.',
        'Callback': 'Error in authentication callback. Please try again.',
        'OAuthAccountNotLinked': 'Email already exists with different provider. Please use email signup.',
        'EmailSignin': 'Check your email for sign-in link.',
        'CredentialsSignin': 'Invalid credentials. Please check email and password.',
        'SessionRequired': 'Please sign in to access this page.'
      }
      
      setMessage(errorMessages[error] || 'Authentication error occurred. Please try again.')
    }
  }

  const handleGoogleSignIn = async () => {
    if (!hasGoogleProvider) {
      setMessage('Google sign-in is currently being configured. Please use email signup.')
      return
    }

    setIsGoogleLoading(true)
    setMessage('')
    
    try {
      console.log('🚀 Initiating Google OAuth flow...')
      console.log('📍 Callback URL:', callbackUrl)
      
      // Use the latest NextAuth signIn method with enhanced parameters
      const result = await signIn('google', {
        callbackUrl: callbackUrl,
        redirect: true // Let NextAuth handle the redirect
      })
      
      console.log('📊 Google OAuth result:', result)
      
      // Note: With redirect: true, this code might not execute
      // as the user will be redirected to Google's OAuth page
      
    } catch (error) {
      console.error('❌ Google OAuth error:', error)
      setMessage('Google sign-in encountered an error. Please try email signup instead.')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      console.log('📧 Processing email signup for:', email)
      
      // Subscribe to the platform
      const subscribeResponse = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          type: 'platform-signup',
          source: 'signup-page'
        })
      })

      if (subscribeResponse.ok) {
        const result = await subscribeResponse.json()
        console.log('✅ Email signup successful:', result)
        
        setMessage('Welcome! Check your email for access instructions.')
        setEmail('')
        
        // Redirect to dashboard after brief delay
        setTimeout(() => {
          router.push(callbackUrl)
        }, 2000)
      } else {
        const errorData = await subscribeResponse.text()
        console.error('❌ Email signup failed:', errorData)
        setMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('❌ Email signup error:', error)
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-burgundy-50">
      <Header />
      <div className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="book-page text-center"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl">🚀</span>
              </div>
              <h1 className="text-2xl font-display text-burgundy-800 mb-2">
                Join the Paradox Engine
              </h1>
              <p className="text-burgundy-700 font-serif">
                Transform tension into triumph with our integrated framework
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-8 space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm text-burgundy-800 font-serif">
                  Access to the complete Paradox Engine framework
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm text-burgundy-800 font-serif">
                  Integrated content across economics, politics, spirituality & relationships
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm text-burgundy-800 font-serif">
                  Personal dashboard with progress tracking and insights
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm text-burgundy-800 font-serif">
                  Weekly transformational insights and guidance
                </span>
              </div>
            </div>

            {/* Latest Google OAuth Implementation */}
            {hasGoogleProvider && (
              <div className="mb-8">
                <motion.button
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading || isLoading}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white border-2 border-gold-500/30 rounded-lg shadow-lg hover:shadow-xl hover:border-gold-500/50 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Enhanced hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-burgundy-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Google Icon */}
                  <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  
                  <span className="text-burgundy-800 font-medium text-lg group-hover:text-burgundy-900 transition-colors relative z-10">
                    {isGoogleLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-burgundy-600 border-t-transparent rounded-full animate-spin" />
                        Connecting to Google...
                      </span>
                    ) : (
                      'Continue with Google'
                    )}
                  </span>
                </motion.button>
                
                {/* Security badge for Google OAuth */}
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-burgundy-600 font-serif">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1L5 4v5.5c0 3.45 2.11 6.78 5 8.5 2.89-1.72 5-5.05 5-8.5V4l-5-3z" clipRule="evenodd"/>
                  </svg>
                  <span>Secured by Google OAuth 2.0</span>
                </div>
              </div>
            )}

            {/* Provider status indicator (development only) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-4 p-2 bg-burgundy-50 border border-burgundy-200 rounded text-xs">
                <div className={`font-serif ${hasGoogleProvider ? 'text-green-700' : 'text-yellow-700'}`}>
                  {hasGoogleProvider ? '✅ Google OAuth Ready' : '⚠️ Google OAuth Not Configured'}
                </div>
                {providers && (
                  <div className="text-burgundy-600 mt-1">
                    Providers: {Object.keys(providers).join(', ') || 'None'}
                  </div>
                )}
              </div>
            )}

            {/* Fallback message when Google is disabled */}
            {!hasGoogleProvider && (
              <div className="mb-6 p-3 bg-burgundy-50 border border-burgundy-200 rounded-lg">
                <p className="text-sm text-burgundy-700 font-serif">
                  Google sign-in is being configured. Email signup works perfectly!
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-burgundy-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-cream-50 text-burgundy-600 font-serif">
                  {hasGoogleProvider ? 'Or continue with email' : 'Join with email'}
                </span>
              </div>
            </div>

            {/* Enhanced Email Form */}
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="input-elegant flex-1"
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || isGoogleLoading}
                  className="btn-gold px-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Joining...
                    </span>
                  ) : (
                    'Join'
                  )}
                </motion.button>
              </div>
            </form>

            {/* Enhanced Message Display */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg text-sm font-serif ${
                  message.includes('Welcome') || message.includes('Check your email')
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : message.includes('being configured') || message.includes('email signup')
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : message.includes('Error') || message.includes('error')
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                }`}
              >
                {message}
              </motion.div>
            )}

            {/* Footer Text */}
            <div className="mt-8 text-xs text-burgundy-600 font-serif space-y-2">
              <p>
                By signing up, you agree to receive transformational insights and updates.
              </p>
              {hasGoogleProvider && (
                <p>
                  Have a Google account? Use "Continue with Google" for instant access.
                </p>
              )}
              <p className="text-center text-gold-600">
                Secure • Private • Easy to cancel anytime
              </p>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="flex items-center justify-center gap-4 text-sm text-burgundy-600 font-serif mb-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-xs text-white">PE</span>
                  </div>
                ))}
              </div>
              <span>Join 1,000+ transformation seekers</span>
            </div>
            <p className="text-xs text-burgundy-500 font-serif">
              "The framework that finally connects all the dots of personal growth."
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  )
} 