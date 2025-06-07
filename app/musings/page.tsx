import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Musings - Paradox Engine',
  description: 'Explore thoughts on economics, politics, spirituality, and human transformation.',
}

// Mock articles data
const articles = [
  {
    id: 'economic-paradox-scarcity',
    title: 'The Economic Paradox of Scarcity',
    category: 'economics',
    excerpt: 'Why abundance thinking creates more wealth than scarcity mindset, and how our relationship with money reveals our deepest beliefs about self-worth...',
    readTime: 8,
    publishDate: '2025-01-15',
    isUnlocked: true
  },
  {
    id: 'political-power-growth',
    title: 'Political Power and Personal Growth',
    category: 'politics',
    excerpt: 'How understanding power dynamics in society can accelerate your personal transformation and help you navigate complex social systems...',
    readTime: 12,
    publishDate: '2025-01-14',
    isUnlocked: true
  },
  {
    id: 'spiritual-awakening-modern',
    title: 'Spiritual Awakening in Modern Times',
    category: 'spirituality',
    excerpt: 'Ancient wisdom meets contemporary challenges. Exploring how traditional spiritual practices can address modern existential crises...',
    readTime: 10,
    publishDate: '2025-01-13',
    isUnlocked: true
  },
  {
    id: 'economics-transformation',
    title: 'Economics of Personal Transformation',
    category: 'economics',
    excerpt: 'The hidden costs and benefits of personal growth. Why investing in yourself yields the highest returns, and how to calculate your transformation ROI...',
    readTime: 14,
    publishDate: '2025-01-12',
    isUnlocked: false
  },
  {
    id: 'sacred-sexuality-discovery',
    title: 'Sacred Sexuality and Self-Discovery',
    category: 'sexuality',
    excerpt: 'Exploring the connection between sexual expression and spiritual growth. How authentic intimacy becomes a path to deeper self-understanding...',
    readTime: 11,
    publishDate: '2025-01-11',
    isUnlocked: false
  },
  {
    id: 'politics-personal-freedom',
    title: 'The Politics of Personal Freedom',
    category: 'politics',
    excerpt: 'Breaking free from societal conditioning requires understanding how political systems shape individual consciousness...',
    readTime: 13,
    publishDate: '2025-01-10',
    isUnlocked: false
  },
  {
    id: 'mindful-economics-spending',
    title: 'Mindful Economics: Conscious Spending',
    category: 'economics',
    excerpt: 'How your spending habits reflect your values and unconscious beliefs. A practical guide to aligning money with meaning...',
    readTime: 9,
    publishDate: '2025-01-09',
    isUnlocked: false
  },
  {
    id: 'spiritual-leadership-crisis',
    title: 'Spiritual Leadership in Crisis',
    category: 'spirituality',
    excerpt: 'Leading with compassion during uncertainty. How spiritual principles can guide decision-making in challenging times...',
    readTime: 16,
    publishDate: '2025-01-08',
    isUnlocked: false
  },
  {
    id: 'intimate-connections-growth',
    title: 'Intimate Connections and Growth',
    category: 'sexuality',
    excerpt: 'How relationships become laboratories for personal evolution. The art of growing together while maintaining individual authenticity...',
    readTime: 12,
    publishDate: '2025-01-07',
    isUnlocked: false
  },
  {
    id: 'psychology-political-choice',
    title: 'The Psychology of Political Choice',
    category: 'politics',
    excerpt: 'Understanding the deeper motivations behind political beliefs and how they connect to personal identity and growth...',
    readTime: 14,
    publishDate: '2025-01-06',
    isUnlocked: false
  }
]

const categories = [
  { id: 'all', label: 'All Articles', icon: '📚' },
  { id: 'economics', label: 'Economics', icon: '💰' },
  { id: 'politics', label: 'Politics', icon: '⚖️' },
  { id: 'spirituality', label: 'Spirituality', icon: '🧘' },
  { id: 'sexuality', label: 'Relationships', icon: '❤️' },
]

export default function MusingsPage() {
  const freeArticleCount = articles.filter(a => a.isUnlocked).length

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-gold-500 mx-auto mb-6" />
            <h1 className="text-book-title mb-6">
              Musings on Evolution
            </h1>
            <p className="text-prose text-burgundy-700 max-w-3xl mx-auto mb-8">
              Exploring the intersections of economics, politics, spirituality, and human transformation. 
              Where conventional wisdom meets revolutionary thinking.
            </p>
            
            {/* Free Access Notice */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 rounded-full text-sm font-serif text-burgundy-800">
              <span className="w-2 h-2 bg-gold-500 rounded-full" />
              <span>{freeArticleCount} articles free to read • More with email signup</span>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="mb-12">
            <h2 className="text-xl font-display text-burgundy-800 mb-6 text-center">Explore by Category</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-burgundy-800/20 hover:bg-burgundy-800 hover:text-cream-50 transition-colors font-serif"
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div 
                key={article.id}
                className="card-book group cursor-pointer"
              >
                {/* Article Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-burgundy-800/10 text-burgundy-700 rounded-full text-xs font-serif capitalize">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {!article.isUnlocked && (
                      <span className="text-xs text-gold-600 font-serif bg-gold-500/10 px-2 py-1 rounded-full">
                        Premium
                      </span>
                    )}
                    <span className="text-xs text-burgundy-600 font-serif">
                      {article.readTime} min
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <h3 className="font-display text-lg text-burgundy-800 mb-3 group-hover:text-gold-600 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-sm text-burgundy-700 font-serif mb-4 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Article Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-burgundy-600 font-serif">
                    {new Date(article.publishDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  
                  <Link 
                    href={`/musings/${article.id}`}
                    className="text-gold-600 hover:text-gold-700 font-serif text-sm transition-colors"
                  >
                    Read {article.isUnlocked ? 'Full Article' : 'Preview'} →
                  </Link>
                </div>

                {/* Free Article Indicator */}
                {article.isUnlocked && index < 3 && (
                  <div className="mt-3 pt-3 border-t border-burgundy-800/10">
                    <span className="text-xs text-green-600 font-serif">
                      ✓ Free to read
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lead Magnet Section */}
          <div className="mt-16 book-page text-center">
            <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-gold-600 text-2xl">📖</span>
            </div>
            
            <h2 className="text-chapter mb-4">
              Free Guide: Paradox Engine Framework
            </h2>
            <p className="text-prose text-burgundy-700 mb-8 max-w-2xl mx-auto">
              Discover the comprehensive framework that ties together economics, politics, 
              spirituality, and personal growth into a unified approach to transformation.
            </p>
            
            <Link href="/lead-magnet" className="btn-book">
              Download Free Guide
            </Link>
          </div>

          {/* Subscription CTA */}
          <div className="mt-16 text-center">
            <div className="book-page bg-gradient-to-br from-burgundy-800/5 to-gold-500/5">
              <h2 className="text-chapter mb-4">
                Want More Insights?
              </h2>
              <p className="text-prose text-burgundy-700 mb-8 max-w-2xl mx-auto">
                Join our community to access all articles, get weekly insights, 
                and be part of conversations that challenge conventional thinking.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/subscribe" className="btn-book">
                  Get Full Access
                </Link>
                <Link href="/about" className="btn-gold">
                  About the Author
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 