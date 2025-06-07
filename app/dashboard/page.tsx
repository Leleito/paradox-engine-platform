'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  BookOpen, 
  Clock, 
  Download, 
  BarChart3, 
  Calendar, 
  Star, 
  Users, 
  Bell,
  Settings,
  Trophy,
  Play,
  CheckCircle,
  Lock,
  MessageCircle
} from 'lucide-react'
import Link from 'next/link'
import CommunityFeedback from '@/components/CommunityFeedback'

// Dynamic user data that resets to defaults for new users
const getDefaultUserData = () => ({
  subscriptionPlan: 'free', // 'free', 'premium' 
  subscriptionStatus: 'active',
  joinDate: new Date().toISOString().split('T')[0],
  readingStreak: 0,
  articlesRead: 0,
  totalArticles: 15,
  lastReadArticle: 'Introduction to the Paradox Engine',
  readingTimeToday: 0,
  readingTimeWeek: 0,
  bookmarkedSections: 0,
  weeklyInsightsReceived: 0
})

// Get user data from localStorage or use defaults
const getUserData = () => {
  if (typeof window === 'undefined') return getDefaultUserData()
  
  const stored = localStorage.getItem('paradox-engine-user-data')
  if (stored) {
    try {
      return { ...getDefaultUserData(), ...JSON.parse(stored) }
    } catch {
      return getDefaultUserData()
    }
  }
  return getDefaultUserData()
}

const saveUserData = (data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('paradox-engine-user-data', JSON.stringify(data))
  }
}

const contentItems = [
  // Lead Magnet
  { id: 'lead-magnet', title: 'Free Guide: Paradox Engine Framework', type: 'lead-magnet', category: 'guide', isRead: false, isUnlocked: true, readTime: 15, progress: 0, teaser: 'Discover the secret framework that...' },
  
  // Articles by Category
  { id: 1, title: 'The Economic Paradox of Scarcity', type: 'article', category: 'economics', isRead: true, isUnlocked: true, readTime: 8, progress: 100, teaser: 'Why abundance thinking creates...' },
  { id: 2, title: 'Political Power and Personal Growth', type: 'article', category: 'politics', isRead: true, isUnlocked: true, readTime: 12, progress: 100, teaser: 'How understanding power dynamics...' },
  { id: 3, title: 'Spiritual Awakening in Modern Times', type: 'article', category: 'spirituality', isRead: true, isUnlocked: true, readTime: 10, progress: 75, teaser: 'Ancient wisdom meets contemporary...' },
  { id: 4, title: 'Economics of Personal Transformation', type: 'article', category: 'economics', isRead: false, isUnlocked: true, readTime: 14, progress: 0, teaser: 'The hidden costs and benefits...' },
  { id: 5, title: 'Sacred Sexuality and Self-Discovery', type: 'article', category: 'sexuality', isRead: false, isUnlocked: false, readTime: 11, progress: 0, teaser: 'Exploring the connection between...' },
  { id: 6, title: 'The Politics of Personal Freedom', type: 'article', category: 'politics', isRead: false, isUnlocked: false, readTime: 13, progress: 0, teaser: 'Breaking free from societal...' },
  { id: 7, title: 'Mindful Economics: Conscious Spending', type: 'article', category: 'economics', isRead: false, isUnlocked: false, readTime: 9, progress: 0, teaser: 'How your spending habits reflect...' },
  { id: 8, title: 'Spiritual Leadership in Crisis', type: 'article', category: 'spirituality', isRead: false, isUnlocked: false, readTime: 16, progress: 0, teaser: 'Leading with compassion during...' },
  { id: 9, title: 'Intimate Connections and Growth', type: 'article', category: 'sexuality', isRead: false, isUnlocked: false, readTime: 12, progress: 0, teaser: 'How relationships become...' },
  { id: 10, title: 'The Psychology of Political Choice', type: 'article', category: 'politics', isRead: false, isUnlocked: false, readTime: 14, progress: 0, teaser: 'Understanding the deeper motivations...' },
]

const getRecentActivity = (userData: any) => [
  userData.articlesRead > 0 ? 
    { type: 'chapter', title: `Read "${userData.lastReadArticle}"`, time: '2 hours ago' } :
    { type: 'chapter', title: 'Welcome to the Paradox Engine!', time: 'Just now' },
  userData.readingStreak > 0 ? 
    { type: 'milestone', title: `Achieved ${userData.readingStreak}-day reading streak!`, time: '1 day ago' } :
    { type: 'insight', title: 'Access your first framework guide', time: 'Available now' },
  userData.weeklyInsightsReceived > 0 ?
    { type: 'insight', title: `Received ${userData.weeklyInsightsReceived} weekly insights`, time: '2 days ago' } :
    { type: 'bookmark', title: 'Explore the content categories', time: 'Ready to start' },
  { type: 'milestone', title: 'Joined the Paradox Engine community', time: `${Math.floor((new Date().getTime() - new Date(userData.joinDate).getTime()) / (1000 * 60 * 60 * 24))} days ago` },
]

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [userData, setUserData] = useState(getDefaultUserData())

  // Load user data on mount
  useEffect(() => {
    setUserData(getUserData())
  }, [])

  // Redirect if not authenticated (Google OAuth only)
  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/signup')
  }, [session, status, router])

  // Function to update user progress
  const updateUserProgress = (updates: Partial<typeof userData>) => {
    const newData = { ...userData, ...updates }
    setUserData(newData)
    saveUserData(newData)
  }

  // Function to reset user data to defaults
  const resetUserData = () => {
    const defaultData = getDefaultUserData()
    setUserData(defaultData)
    saveUserData(defaultData)
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <main className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto"></div>
              <p className="mt-4 text-burgundy-700 font-serif">Loading your dashboard...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!session) {
    return null
  }

  const progressPercentage = (userData.articlesRead / userData.totalArticles) * 100

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <main className="py-8 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8 text-center">
            <h1 className="text-book-title mb-2">
              Welcome back, {session?.user?.name || 'Evolution Seeker'}!
            </h1>
            <p className="text-prose text-burgundy-700">
              Continue your personal evolution journey
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card-book">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-burgundy-600 font-serif">Reading Progress</p>
                  <p className="text-2xl font-display font-bold text-burgundy-800">
                    {userData.articlesRead}/{userData.totalArticles}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-gold-600" />
                </div>
              </div>
              <div className="mt-4 w-full bg-cream-200 rounded-full h-2">
                <div 
                  className="bg-gold-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="card-book">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-burgundy-600 font-serif">Reading Streak</p>
                  <p className="text-2xl font-display font-bold text-burgundy-800">
                    {userData.readingStreak} days
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-green-600 mt-2 font-serif">Keep it up! 🔥</p>
            </div>

            <div className="card-book">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-burgundy-600 font-serif">This Week</p>
                  <p className="text-2xl font-display font-bold text-burgundy-800">
                    {userData.readingTimeWeek}m
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-burgundy-600 mt-2 font-serif">Reading time</p>
            </div>

            <div className="card-book">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-burgundy-600 font-serif">Status</p>
                  <p className="text-2xl font-display font-bold text-burgundy-800">
                    {userData.subscriptionPlan === 'free' ? 'Free' : 'Premium'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-gold-600" />
                </div>
              </div>
              <p className="text-sm text-gold-600 mt-2 font-serif">Founding Member</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-burgundy-800/10">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview', icon: BookOpen },
                  { id: 'content', label: 'Content Library', icon: Play },
                  { id: 'insights', label: 'Weekly Insights', icon: Bell },
                  { id: 'community', label: 'Community', icon: MessageCircle },
                  { id: 'activity', label: 'Activity', icon: BarChart3 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-serif text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-gold-500 text-gold-600'
                        : 'border-transparent text-burgundy-700 hover:text-burgundy-900'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Continue Reading */}
              <div className="book-page">
                <h3 className="text-chapter">Continue Reading</h3>
                <div className="bg-gradient-to-r from-gold-500/10 to-burgundy-800/10 rounded-sm p-6 mb-4">
                  <h4 className="font-display text-lg text-burgundy-800 mb-2">
                    {userData.lastReadArticle}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-burgundy-700 mb-3 font-serif">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {userData.articlesRead > 0 ? '12 min read' : '10 min read'}
                    </span>
                    <span>{userData.articlesRead > 0 ? '75% complete' : 'Start reading'}</span>
                  </div>
                  {userData.articlesRead > 0 && (
                    <div className="w-full bg-cream-200 rounded-full h-2 mb-4">
                      <div className="bg-gold-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  )}
                  <Link 
                    href={userData.articlesRead > 0 ? "/content" : "/lead-magnet"}
                    className="btn-book text-sm inline-block"
                  >
                    {userData.articlesRead > 0 ? 'Continue Reading' : 'Start Your Journey'}
                  </Link>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="book-page">
                <h3 className="text-chapter">Recent Activity</h3>
                <div className="space-y-4">
                  {getRecentActivity(userData).map((activity: any, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center mt-0.5">
                        {activity.type === 'chapter' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {activity.type === 'insight' && <Bell className="w-4 h-4 text-gold-600" />}
                        {activity.type === 'bookmark' && <Star className="w-4 h-4 text-yellow-600" />}
                        {activity.type === 'milestone' && <Trophy className="w-4 h-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-burgundy-800 font-serif">{activity.title}</p>
                        <p className="text-xs text-burgundy-600">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="book-page">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-chapter">Content Library</h3>
                <div className="text-sm text-burgundy-700 font-serif">
                  {userData.articlesRead} of {userData.totalArticles} articles read
                </div>
              </div>

              {/* Categories Filter */}
              <div className="mb-6 flex flex-wrap gap-2">
                {['all', 'economics', 'politics', 'spirituality', 'sexuality', 'guide'].map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 rounded-full text-sm font-serif capitalize border border-burgundy-800/20 hover:bg-burgundy-800 hover:text-cream-50 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="grid gap-4">
                {contentItems.map((item) => (
                  <div 
                    key={item.id}
                    className={`flex items-center gap-4 p-4 rounded-sm border transition-all ${
                      item.isRead 
                        ? 'bg-green-50 border-green-200' 
                        : item.isUnlocked 
                        ? 'bg-cream-50 border-burgundy-800/20 hover:border-gold-500' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {item.type === 'lead-magnet' ? (
                        <div className="w-10 h-10 bg-gold-500/20 rounded-full flex items-center justify-center">
                          <Star className="w-5 h-5 text-gold-600" />
                        </div>
                      ) : item.isRead ? (
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                      ) : item.isUnlocked ? (
                        <div className="w-10 h-10 bg-gold-500/20 rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-gold-600" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-display text-burgundy-800">
                          {item.title}
                        </h4>
                        <span className="px-2 py-1 text-xs bg-burgundy-800/10 text-burgundy-700 rounded-full font-serif capitalize">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm text-burgundy-600 mb-2 font-serif">
                        {item.teaser}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-burgundy-600 font-serif">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {item.readTime} min read
                        </span>
                        {item.progress > 0 && (
                          <span>{item.progress}% complete</span>
                        )}
                      </div>
                      {item.progress > 0 && item.progress < 100 && (
                        <div className="w-full bg-cream-200 rounded-full h-1.5 mt-2">
                          <div 
                            className="bg-gold-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0">
                      {item.isUnlocked ? (
                        <button className="btn-gold text-sm">
                          {item.isRead ? 'Re-read' : 'Read'}
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400 font-serif">Subscribe to read</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="book-page">
              <h3 className="text-chapter mb-6">Weekly Insights</h3>
              <div className="mb-6 p-6 bg-gold-500/10 rounded-sm">
                <h4 className="font-display text-burgundy-800 mb-2">Early Adopter Exclusive</h4>
                <p className="text-sm text-burgundy-700 font-serif">
                  As an early adopter, you receive exclusive weekly insights on personal transformation, 
                  growth strategies, and life mastery techniques.
                </p>
              </div>
              
              <div className="grid gap-4">
                <div className="p-4 bg-cream-50 rounded-sm border border-burgundy-800/10">
                  <h4 className="font-display text-burgundy-800 mb-2">
                    Week 12: The Power of Small Steps
                  </h4>
                  <p className="text-sm text-burgundy-700 font-serif mb-2">
                    Discover how micro-habits can lead to macro transformations...
                  </p>
                  <button className="text-gold-600 hover:text-gold-700 text-sm font-serif">
                    Read Full Insight →
                  </button>
                </div>
                
                <div className="p-4 bg-cream-50 rounded-sm border border-burgundy-800/10">
                  <h4 className="font-display text-burgundy-800 mb-2">
                    Week 11: Embracing Your Authentic Self
                  </h4>
                  <p className="text-sm text-burgundy-700 font-serif mb-2">
                    Learn to align your actions with your true values...
                  </p>
                  <button className="text-gold-600 hover:text-gold-700 text-sm font-serif">
                    Read Full Insight →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="space-y-6">
              <div className="book-page">
                <h3 className="text-chapter mb-6">Community Engagement</h3>
                <p className="text-burgundy-700 font-serif mb-6">
                  Share your thoughts, ask questions, and help us improve your experience with the Paradox Engine platform.
                </p>
                
                {/* Community Feedback Component */}
                <CommunityFeedback className="mb-8" />
                
                {/* Community Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-4 bg-burgundy-50 rounded-lg">
                    <div className="text-2xl font-display font-bold text-burgundy-800 mb-2">
                      24
                    </div>
                    <p className="text-sm text-burgundy-700 font-serif">Community Members</p>
                  </div>
                  <div className="text-center p-4 bg-gold-50 rounded-lg">
                    <div className="text-2xl font-display font-bold text-gold-700 mb-2">
                      8
                    </div>
                    <p className="text-sm text-burgundy-700 font-serif">Discussions Active</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-display font-bold text-green-700 mb-2">
                      12
                    </div>
                    <p className="text-sm text-burgundy-700 font-serif">Ideas Implemented</p>
                  </div>
                </div>

                {/* Recent Community Activity */}
                <div className="mt-8">
                  <h4 className="font-display text-lg text-burgundy-800 mb-4">Recent Community Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-cream-50 rounded-lg">
                      <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-gold-600" />
                      </div>
                      <div>
                        <p className="text-sm text-burgundy-800 font-serif">Sarah M. shared feedback on "The Paradox of Knowledge"</p>
                        <p className="text-xs text-burgundy-600">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-cream-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-burgundy-800 font-serif">Feature request for dark mode was implemented</p>
                        <p className="text-xs text-burgundy-600">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-cream-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bell className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-burgundy-800 font-serif">New article discussion started: "Embracing Uncertainty"</p>
                        <p className="text-xs text-burgundy-600">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="book-page">
                <h3 className="text-chapter mb-6">Your Evolution Journey</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-gold-600 mb-2">
                      {userData.readingTimeToday}m
                    </div>
                    <p className="text-sm text-burgundy-700 font-serif">Today</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-gold-600 mb-2">
                      {userData.readingTimeWeek}m
                    </div>
                    <p className="text-sm text-burgundy-700 font-serif">This Week</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-gold-600 mb-2">
                      {userData.weeklyInsightsReceived}
                    </div>
                    <p className="text-sm text-burgundy-700 font-serif">Insights Received</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 book-page">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-chapter">Quick Actions</h3>
              <button 
                onClick={resetUserData}
                className="text-xs text-burgundy-600 hover:text-burgundy-800 font-serif underline"
              >
                Reset Progress
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link href="/categories" className="btn-gold text-center">
                Browse Categories
              </Link>
              <Link href="/lead-magnet" className="btn-gold text-center">
                Get Framework Guide
              </Link>
              <Link href="/content" className="btn-gold text-center">
                Content Library
              </Link>
              <Link href="/signup" className="btn-gold text-center">
                Upgrade Access
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 