'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Book, Quote } from 'lucide-react'

const chapters = [
  {
    id: 1,
    title: 'Welcome to the Tension',
    excerpt: 'Have you ever felt like you\'re being pulled in two different directions at the same time? Like you\'re chasing stability and change at the same time?',
    readTime: '8 min',
    isUnlocked: true,
  },
  {
    id: 2,
    title: 'Why Life Feels Messy',
    excerpt: 'Life feels messy sometimes and not in the cute, artsy, "I spilled some paint and now it\'s abstract" kind of way.',
    readTime: '12 min',
    isUnlocked: true,
  },
  {
    id: 3,
    title: 'The Paradox Engine Framework',
    excerpt: 'By now, you\'ve probably sensed it, life isn\'t something you fix. It\'s something you feel, navigate, wrestle with.',
    readTime: '15 min',
    isUnlocked: true,
  },
  {
    id: 4,
    title: 'Absurdity: The Unexpected Spark',
    excerpt: 'Absurdity is life\'s weird curveball. It\'s the layoff that comes after your best performance review.',
    readTime: '10 min',
    isUnlocked: false,
  },
  {
    id: 5,
    title: 'Duality: The Push and Pull',
    excerpt: 'You want freedom, but you also want to belong. You want to speak your truth, but you fear judgment.',
    readTime: '14 min',
    isUnlocked: false,
  },
]

export default function BookPreview() {
  const [selectedChapter, setSelectedChapter] = useState(chapters[0])

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
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => setSelectedChapter(chapter)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    selectedChapter.id === chapter.id
                      ? 'bg-burgundy-50 border-2 border-burgundy-200'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        selectedChapter.id === chapter.id ? 'text-burgundy-900' : 'text-gray-900'
                      }`}>
                        Chapter {chapter.id}: {chapter.title}
                      </h4>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {chapter.readTime}
                      </div>
                    </div>
                    <div className="ml-2">
                      {chapter.isUnlocked ? (
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
              ))}
            </div>
          </div>

          {/* Chapter Preview */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Chapter {selectedChapter.id}: {selectedChapter.title}
                  </h3>
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{selectedChapter.readTime} read</span>
                    <span className="mx-2">•</span>
                    <span>{selectedChapter.isUnlocked ? 'Free Preview' : 'Subscribers Only'}</span>
                  </div>
                </div>
                {selectedChapter.isUnlocked && (
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

                {selectedChapter.isUnlocked ? (
                  <div className="mt-6 p-6 bg-cream-50 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      Yeah. Same here. That tug-of-war feeling? That's not an error. It's not you doing life wrong. 
                      In fact, it's life doing exactly what it's supposed to. This tension, this push and pull, 
                      it's exactly what we need to grow.
                    </p>
                    <p className="text-gray-700">
                      And yet, we've never really been taught how to work with it. Many of us either burn out 
                      trying to resolve the contradictions, or avoid them altogether and call it "balance."
                    </p>
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
          </div>
        </div>
      </div>
    </section>
  )
}
