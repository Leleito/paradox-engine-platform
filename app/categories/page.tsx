'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { motion } from 'framer-motion'

const categories = [
  {
    id: 'economics',
    title: 'Economics',
    icon: '💰',
    description: 'Transform your relationship with money, resources, and value creation into tools for personal evolution.',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    articles: [
      { title: 'The Economic Paradox of Scarcity', slug: 'economic-paradox-scarcity', readTime: 8 },
      { title: 'Economics of Personal Transformation', slug: 'economics-personal-transformation', readTime: 14 },
      { title: 'Mindful Economics: Conscious Spending', slug: 'mindful-economics-conscious-spending', readTime: 9 },
      { title: 'Money as a Tool for Growth', slug: 'money-tool-growth', readTime: 12 },
      { title: 'The Psychology of Financial Freedom', slug: 'psychology-financial-freedom', readTime: 15 }
    ]
  },
  {
    id: 'politics',
    title: 'Politics',
    icon: '⚖️',
    description: 'Understand how power dynamics in society mirror and influence your personal relationships and growth.',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    articles: [
      { title: 'Political Power and Personal Growth', slug: 'political-power-personal-growth', readTime: 12 },
      { title: 'The Politics of Personal Freedom', slug: 'politics-personal-freedom', readTime: 13 },
      { title: 'The Psychology of Political Choice', slug: 'psychology-political-choice', readTime: 14 },
      { title: 'Collective Systems and Individual Change', slug: 'collective-systems-individual-change', readTime: 16 },
      { title: 'Power Dynamics in Relationships', slug: 'power-dynamics-relationships', readTime: 11 }
    ]
  },
  {
    id: 'spirituality',
    title: 'Spirituality',
    icon: '🧘',
    description: 'Bridge ancient wisdom with contemporary challenges for practical spirituality and transcendent growth.',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800',
    articles: [
      { title: 'Spiritual Awakening in Modern Times', slug: 'spiritual-awakening-modern-times', readTime: 10 },
      { title: 'Spiritual Leadership in Crisis', slug: 'spiritual-leadership-crisis', readTime: 16 },
      { title: 'The Sacred in the Mundane', slug: 'sacred-mundane', readTime: 8 },
      { title: 'Transcendence and Practical Reality', slug: 'transcendence-practical-reality', readTime: 13 },
      { title: 'Meditation for Transformation', slug: 'meditation-transformation', readTime: 9 }
    ]
  },
  {
    id: 'sexuality',
    title: 'Relationships & Sexuality',
    icon: '❤️',
    description: 'Explore how intimacy, sexuality, and connection become laboratories for personal transformation.',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-800',
    articles: [
      { title: 'Sacred Sexuality and Self-Discovery', slug: 'sacred-sexuality-self-discovery', readTime: 11 },
      { title: 'Intimate Connections and Growth', slug: 'intimate-connections-growth', readTime: 12 },
      { title: 'The Psychology of Intimate Relationships', slug: 'psychology-intimate-relationships', readTime: 14 },
      { title: 'Sexuality as Spiritual Practice', slug: 'sexuality-spiritual-practice', readTime: 13 },
      { title: 'Healing Through Intimacy', slug: 'healing-through-intimacy', readTime: 15 }
    ]
  },
  {
    id: 'framework',
    title: 'Paradox Engine Framework',
    icon: '🚀',
    description: 'Master the complete framework for integrating economics, politics, spirituality, and relationships.',
    color: 'from-gold-500 to-amber-600',
    bgColor: 'bg-gold-50',
    borderColor: 'border-gold-200',
    textColor: 'text-gold-800',
    articles: [
      { title: 'Introduction to the Paradox Engine', slug: 'introduction-paradox-engine', readTime: 10 },
      { title: 'The Four Pillars Integration', slug: 'four-pillars-integration', readTime: 18 },
      { title: 'Practical Framework Application', slug: 'practical-framework-application', readTime: 20 },
      { title: 'Advanced Integration Techniques', slug: 'advanced-integration-techniques', readTime: 22 },
      { title: 'Living the Paradox Engine', slug: 'living-paradox-engine', readTime: 16 }
    ]
  }
]

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = !selectedCategory || category.id === selectedCategory
    return matchesSearch && matchesFilter
  })

  const totalArticles = categories.reduce((sum, cat) => sum + cat.articles.length, 0)

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-burgundy-800 to-burgundy-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-gold-400 text-3xl">📚</span>
            </div>
            <h1 className="text-book-title mb-4">
              Content Categories
            </h1>
            <p className="text-prose text-burgundy-700 max-w-3xl mx-auto mb-6">
              Explore transformational content organized across the four interconnected pillars of the Paradox Engine. 
              Each category offers unique insights while connecting to the broader framework of integrated growth.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-burgundy-600 font-serif">
              <span>{categories.length} Categories</span>
              <span>•</span>
              <span>{totalArticles} Articles</span>
              <span>•</span>
              <span>Integrated Framework</span>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="max-w-md mx-auto mb-8">
              <input
                type="text"
                placeholder="Search categories and content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-elegant w-full"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-serif transition-all ${
                  !selectedCategory 
                    ? 'bg-burgundy-800 text-cream-50' 
                    : 'bg-burgundy-100 text-burgundy-700 hover:bg-burgundy-200'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-serif transition-all ${
                    selectedCategory === category.id
                      ? 'bg-burgundy-800 text-cream-50'
                      : 'bg-burgundy-100 text-burgundy-700 hover:bg-burgundy-200'
                  }`}
                >
                  {category.icon} {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`book-page group hover:shadow-xl transition-all duration-300 ${category.bgColor} border ${category.borderColor}`}
              >
                {/* Category Header */}
                <div className="mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-white text-2xl">{category.icon}</span>
                  </div>
                  <h3 className={`text-xl font-display ${category.textColor} mb-3`}>
                    {category.title}
                  </h3>
                  <p className="text-sm text-burgundy-700 font-serif leading-relaxed mb-4">
                    {category.description}
                  </p>
                  <div className="text-xs text-burgundy-600 font-serif">
                    {category.articles.length} articles • {category.articles.reduce((sum, article) => sum + article.readTime, 0)} min total
                  </div>
                </div>

                {/* Articles Preview */}
                <div className="space-y-3 mb-6">
                  {category.articles.slice(0, 3).map((article, articleIndex) => (
                    <Link
                      key={articleIndex}
                      href={`/content/${article.slug}`}
                      className="block p-3 bg-white/50 rounded border border-white/80 hover:bg-white/80 transition-all group/article"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-display text-burgundy-800 group-hover/article:text-burgundy-900">
                          {article.title}
                        </h4>
                        <span className="text-xs text-burgundy-600 font-serif ml-2">
                          {article.readTime}m
                        </span>
                      </div>
                    </Link>
                  ))}
                  {category.articles.length > 3 && (
                    <div className="text-xs text-burgundy-600 font-serif text-center pt-2">
                      +{category.articles.length - 3} more articles
                    </div>
                  )}
                </div>

                {/* Category CTA */}
                <div className="text-center">
                  <Link
                    href={`/content?category=${category.id}`}
                    className={`btn-book text-sm bg-gradient-to-r ${category.color} text-white border-none hover:shadow-lg`}
                  >
                    Explore {category.title}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Master the Framework CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 book-page text-center bg-gradient-to-br from-burgundy-800/5 to-gold-500/5"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white text-3xl">🎯</span>
            </div>
            <h2 className="text-chapter mb-4">Master the Complete Framework</h2>
            <p className="text-prose text-burgundy-700 mb-6 max-w-2xl mx-auto">
              These categories aren't separate domains—they're interconnected pillars of a unified approach to transformation. 
              The real magic happens when you understand how economics influences spirituality, how politics shapes relationships, 
              and how all four work together to create profound change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/lead-magnet" className="btn-book">
                Get the Complete Framework
              </Link>
              <Link href="/content" className="btn-gold">
                Browse All Content
              </Link>
            </div>
          </motion.div>

          {/* Integration Insights */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200/50">
              <div className="text-2xl mb-3">💰⚖️</div>
              <h3 className="font-display text-burgundy-800 mb-2 text-sm">Economics + Politics</h3>
              <p className="text-xs text-burgundy-600 font-serif">How power and money intersect in transformation</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-rose-50 rounded-lg border border-purple-200/50">
              <div className="text-2xl mb-3">🧘❤️</div>
              <h3 className="font-display text-burgundy-800 mb-2 text-sm">Spirituality + Relationships</h3>
              <p className="text-xs text-burgundy-600 font-serif">Sacred connection and intimate growth</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-purple-50 rounded-lg border border-green-200/50">
              <div className="text-2xl mb-3">💰🧘</div>
              <h3 className="font-display text-burgundy-800 mb-2 text-sm">Economics + Spirituality</h3>
              <p className="text-xs text-burgundy-600 font-serif">Money as spiritual practice and tool</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-rose-50 rounded-lg border border-blue-200/50">
              <div className="text-2xl mb-3">⚖️❤️</div>
              <h3 className="font-display text-burgundy-800 mb-2 text-sm">Politics + Relationships</h3>
              <p className="text-xs text-burgundy-600 font-serif">Power dynamics in personal connections</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
} 