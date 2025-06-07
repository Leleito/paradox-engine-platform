'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAllContent, getBookSettings, type BookContent, type BookSettings } from '@/lib/paradoxEngine'

export default function ContentPage() {
  const [content, setContent] = useState<BookContent[]>([])
  const [settings, setSettings] = useState<BookSettings | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get category from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const categoryParam = urlParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [])

  useEffect(() => {
    // Check if user is signed up (from localStorage or session)
    const email = localStorage.getItem('userEmail')
    setUserEmail(email)
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const [contentData, settingsData] = await Promise.all([
          getAllContent(),
          getBookSettings()
        ])
        setContent(contentData)
        setSettings(settingsData)
      } catch (error) {
        console.error('Error fetching content:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const categories = [
    { id: 'all', label: 'All Content', icon: '📚' },
    { id: 'leadMagnet', label: 'Framework', icon: '🎯' },
    { id: 'economics', label: 'Economics', icon: '💰' },
    { id: 'politics', label: 'Politics', icon: '⚖️' },
    { id: 'spirituality', label: 'Spirituality', icon: '🧘' },
    { id: 'sexuality', label: 'Relationships', icon: '❤️' },
  ]

  const filteredContent = selectedCategory === 'all' 
    ? content 
    : content.filter(item => 
        selectedCategory === 'leadMagnet' 
          ? item.contentType === 'leadMagnet'
          : item.category === selectedCategory
      )

  const publicContent = filteredContent.filter(item => !item.isEarlyAccess)
  const earlyAccessContent = filteredContent.filter(item => item.isEarlyAccess)

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-12 bg-burgundy-200 rounded mb-6 w-96 mx-auto"></div>
              <div className="h-6 bg-burgundy-100 rounded mb-8 w-80 mx-auto"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-64 bg-burgundy-100 rounded"></div>
                ))}
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-gold-500 mx-auto mb-6" />
            <h1 className="text-book-title mb-6">
              Paradox Engine Content
            </h1>
            <p className="text-prose text-burgundy-700 max-w-3xl mx-auto mb-8">
              Explore transformational insights on economics, politics, spirituality, and human connection. 
              Each piece of content is designed to help you unlock your personal paradox engine.
            </p>
            
            {/* Access Status */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 rounded-full text-sm font-serif text-burgundy-800">
              <span className="w-2 h-2 bg-gold-500 rounded-full" />
              <span>
                {userEmail ? 'Full Access Unlocked' : `${publicContent.length} pieces available • Early access with signup`}
              </span>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="mb-12">
            <h2 className="text-xl font-display text-burgundy-800 mb-6 text-center">Explore by Category</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-colors font-serif ${
                    selectedCategory === category.id
                      ? 'bg-burgundy-800 text-cream-50 border-burgundy-800'
                      : 'border-burgundy-800/20 hover:bg-burgundy-800 hover:text-cream-50'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Public Content */}
            {publicContent.map((item, index) => (
              <ContentCard 
                key={item._id} 
                content={item} 
                isAccessible={true}
                userEmail={userEmail}
              />
            ))}
            
            {/* Early Access Content */}
            {earlyAccessContent.map((item, index) => (
              <ContentCard 
                key={item._id} 
                content={item} 
                isAccessible={!!userEmail}
                userEmail={userEmail}
              />
            ))}
          </div>

          {/* Lead Magnet CTA */}
          {selectedCategory === 'all' && (
            <div className="mt-16 book-page text-center">
              <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-gold-600 text-2xl">🎯</span>
              </div>
              
              <h2 className="text-chapter mb-4">
                Master the Paradox Engine Framework
              </h2>
              <p className="text-prose text-burgundy-700 mb-8 max-w-2xl mx-auto">
                Discover the comprehensive framework that integrates economics, politics, 
                spirituality, and relationships into a unified approach to transformation.
              </p>
              
              <Link href="/content/paradox-engine-framework" className="btn-book">
                Explore the Framework
              </Link>
            </div>
          )}

          {/* Signup CTA for non-users */}
          {!userEmail && (
            <div className="mt-16 text-center">
              <div className="book-page bg-gradient-to-br from-burgundy-800/5 to-gold-500/5">
                <h2 className="text-chapter mb-4">
                  Unlock Full Access
                </h2>
                <p className="text-prose text-burgundy-700 mb-8 max-w-2xl mx-auto">
                  Join our early adopter community to access all content, track your progress, 
                  and participate in interactive exercises that deepen your transformation.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/subscribe" className="btn-book">
                    Get Early Access
                  </Link>
                  <Link href="/about" className="btn-gold">
                    About the Author
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

interface ContentCardProps {
  content: BookContent
  isAccessible: boolean
  userEmail: string | null
}

function ContentCard({ content, isAccessible, userEmail }: ContentCardProps) {
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'leadMagnet': return '🎯'
      case 'article': return '📝'
      case 'exercise': return '🏃'
      case 'framework': return '🧠'
      default: return '📖'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'economics': return 'bg-green-500/10 text-green-700'
      case 'politics': return 'bg-blue-500/10 text-blue-700'
      case 'spirituality': return 'bg-purple-500/10 text-purple-700'
      case 'sexuality': return 'bg-pink-500/10 text-pink-700'
      case 'framework': return 'bg-gold-500/10 text-gold-700'
      default: return 'bg-burgundy-800/10 text-burgundy-700'
    }
  }

  return (
    <div className="card-book group cursor-pointer">
      {/* Content Header */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-serif capitalize ${getCategoryColor(content.category)}`}>
          {content.category}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-lg">{getContentTypeIcon(content.contentType)}</span>
          {!isAccessible && (
            <span className="text-xs text-gold-600 font-serif bg-gold-500/10 px-2 py-1 rounded-full">
              Early Access
            </span>
          )}
          <span className="text-xs text-burgundy-600 font-serif">
            {content.readingTime} min
          </span>
        </div>
      </div>

      {/* Content */}
      <h3 className="font-display text-lg text-burgundy-800 mb-3 group-hover:text-gold-600 transition-colors">
        {content.title}
      </h3>
      
      <p className="text-sm text-burgundy-700 font-serif mb-4 leading-relaxed">
        {content.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-burgundy-600 font-serif">
          {content.publishedAt && new Date(content.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
        
        <Link 
          href={`/content/${content.slug.current}`}
          className="text-gold-600 hover:text-gold-700 font-serif text-sm transition-colors"
        >
          {isAccessible ? 'Read Full Content' : `Preview (${content.previewPercentage}%)`} →
        </Link>
      </div>

      {/* Access Indicator */}
      {isAccessible && userEmail && (
        <div className="mt-3 pt-3 border-t border-burgundy-800/10">
          <span className="text-xs text-green-600 font-serif">
            ✓ Full access • Progress tracked
          </span>
        </div>
      )}
    </div>
  )
} 