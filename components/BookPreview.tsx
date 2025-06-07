'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Clock, Book, Quote } from 'lucide-react'
import { getChapters, type Chapter } from '@/lib/sanity'
import { canAccessContent } from '@/lib/contentAccess'
import { useSession } from 'next-auth/react'
import PortableText from './PortableText'

export default function BookPreview() {
  const { data: session } = useSession()
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get user's subscription tier (you'll need to implement this based on your auth system)
  const getUserTier = (): 'free' | 'premium' | 'vip' => {
    // This is a placeholder - implement based on your subscription system
    if (!session) return 'free'
    // You might store tier in session or fetch from database
    return 'free' // or 'premium' or 'vip'
  }

  useEffect(() => {
    async function fetchChapters() {
      try {
        const chaptersData = await getChapters()
        setChapters(chaptersData)
        if (chaptersData.length > 0) {
          setSelectedChapter(chaptersData[0])
        }
      } catch (error) {
        console.error('Error fetching chapters:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChapters()
  }, [])

  if (isLoading) {
    return (
      <section id="preview" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (chapters.length === 0) {
    return (
      <section id="preview" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Chapters Coming Soon
            </h2>
            <p className="text-xl text-gray-600">
              We're working on bringing you amazing content. Check back soon!
            </p>
          </div>
        </div>
      </section>
    )
  }

  const userTier = getUserTier()

  return (
    <section id="preview" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Preview the Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get a taste of the transformative insights waiting inside. Read the first three chapters completely free.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chapter List */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
            <div className="space-y-2">
              {chapters.map((chapter) => {
                const hasAccess = canAccessContent(userTier, chapter.isPremium) || chapter.isUnlocked
                
                return (
                  <button
                    key={chapter._id}
                    onClick={() => setSelectedChapter(chapter)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      selectedChapter?._id === chapter._id
                        ? 'bg-burgundy-50 border-2 border-burgundy-200'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          selectedChapter?._id === chapter._id ? 'text-burgundy-900' : 'text-gray-900'
                        }`}>
                          Chapter {chapter.orderNumber}: {chapter.title}
                        </h4>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {chapter.readTime} min
                        </div>
                      </div>
                      <div className="ml-2">
                        {hasAccess ? (
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <Book className="w-4 h-4 text-green-600" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Chapter Preview */}
          <div className="lg:col-span-2">
            {selectedChapter && (
              <div className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Chapter {selectedChapter.orderNumber}: {selectedChapter.title}
                    </h3>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{selectedChapter.readTime} min read</span>
                      <span className="mx-2">•</span>
                      <span>
                        {canAccessContent(userTier, selectedChapter.isPremium) || selectedChapter.isUnlocked 
                          ? 'Free Preview' 
                          : 'Subscribers Only'}
                      </span>
                    </div>
                  </div>
                  {(canAccessContent(userTier, selectedChapter.isPremium) || selectedChapter.isUnlocked) && (
                    <button className="btn-primary">
                      Read Chapter
                    </button>
                  )}
                </div>

                <div className="prose prose-lg max-w-none">
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-burgundy-200" />
                    <p className="text-gray-700 leading-relaxed text-lg italic pl-6">
                      {selectedChapter.excerpt}
                    </p>
                  </div>

                  {(canAccessContent(userTier, selectedChapter.isPremium) || selectedChapter.isUnlocked) ? (
                    <div className="mt-6 p-6 bg-cream-50 rounded-lg">
                      {selectedChapter.content && (
                        <PortableText value={selectedChapter.content} />
                      )}
                      
                      {selectedChapter.keyTakeaways && selectedChapter.keyTakeaways.length > 0 && (
                        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Takeaways:</h4>
                          <ul className="space-y-2">
                            {selectedChapter.keyTakeaways.map((takeaway, index) => (
                              <li key={index} className="flex items-start">
                                <div className="diamond-symbol bg-burgundy-200 scale-25 mt-2 mr-3"></div>
                                <span className="text-gray-700">{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <button className="mt-4 text-burgundy-700 font-medium hover:text-burgundy-800 transition-colors">
                        Continue reading →
                      </button>
                    </div>
                  ) : (
                    <div className="mt-6 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <p className="text-gray-600 text-center">
                        Subscribe to unlock this chapter and access the complete book
                      </p>
                      <button className="btn-primary mx-auto mt-4 block">
                        Subscribe Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
