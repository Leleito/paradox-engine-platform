'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DynamicContentReader from '@/components/DynamicContentReader'
import { getContentBySlug, updateUserProgress, type BookContent } from '@/lib/paradoxEngine'

export default function ContentPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const [content, setContent] = useState<BookContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchContent() {
      if (!slug) {
        setError('Content not found')
        setIsLoading(false)
        return
      }
      
      try {
        const contentData = await getContentBySlug(slug!)
        if (!contentData) {
          setError('Content not found')
          return
        }
        setContent(contentData)
      } catch (error) {
        console.error('Error fetching content:', error)
        setError('Failed to load content')
      } finally {
        setIsLoading(false)
      }
    }
    fetchContent()
  }, [slug])

  const handleSignupRequired = () => {
    // Store current position and redirect to signup
    if (slug) {
      localStorage.setItem('returnToContent', slug)
      router.push('/api/auth/signin?callbackUrl=/content/' + slug)
    }
  }

  const handleContinueReading = (position: string) => {
    // User signed up, continue reading from position
    if (session?.user?.email && content) {
      updateUserProgress({
        userEmail: session.user.email,
        contentId: content._id,
        lastPosition: position,
        readingProgress: 0
      })
    }
    // Scroll to position or refresh content
    window.location.reload()
  }

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-burgundy-200 rounded mb-6 w-96"></div>
              <div className="h-6 bg-burgundy-100 rounded mb-4 w-80"></div>
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-4 bg-burgundy-100 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !content) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="book-page">
              <h1 className="text-2xl font-display text-burgundy-800 mb-4">
                {error === 'Content not found' ? 'Content Not Found' : 'Error Loading Content'}
              </h1>
              <p className="text-burgundy-700 font-serif mb-6">
                {error === 'Content not found' 
                  ? 'The content you\'re looking for doesn\'t exist or has been moved.' 
                  : 'We encountered an issue loading this content. Please try again.'}
              </p>
              <div className="space-x-4">
                <button 
                  onClick={() => router.back()}
                  className="btn-gold"
                >
                  Go Back
                </button>
                <button 
                  onClick={() => router.push('/content')}
                  className="btn-book"
                >
                  Browse Content
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <DynamicContentReader
            content={content}
            userEmail={session?.user?.email || undefined}
            onSignupRequired={handleSignupRequired}
            onContinueReading={handleContinueReading}
          />
          
          {/* Related Content */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="book-page text-center">
              <h2 className="text-chapter mb-4">Continue Your Journey</h2>
              <p className="text-prose text-burgundy-700 mb-6">
                Explore more transformational content in our library
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => router.push('/content')}
                  className="btn-book"
                >
                  Explore More Content
                </button>
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="btn-gold"
                >
                  View Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
} 