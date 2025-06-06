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
  Progress, 
  Calendar, 
  Star, 
  Users, 
  Bell,
  Settings,
  Trophy,
  Play,
  CheckCircle,
  Lock
} from 'lucide-react'
import Link from 'next/link'

// Mock user data (in production, this would come from your database)
const userData = {
  subscriptionPlan: 'premium', // 'free', 'premium', 'vip'
  subscriptionStatus: 'active',
  joinDate: '2025-01-01',
  readingStreak: 7,
  chaptersRead: 12,
  totalChapters: 25,
  lastReadChapter: 'Chapter 12: The Resolution Paradox',
  readingTimeToday: 23,
  readingTimeWeek: 156,
  downloadedChapters: 8,
  bookmarkedSections: 15,
  communityPoints: 450
}

const chapters = [
  { id: 1, title: 'Welcome to the Tension', isRead: true, isUnlocked: true, readTime: 8, progress: 100 },
  { id: 2, title: 'Why Life Feels Messy', isRead: true, isUnlocked: true, readTime: 12, progress: 100 },
  { id: 3, title: 'The Paradox Engine Framework', isRead: true, isUnlocked: true, readTime: 15, progress: 100 },
  { id: 4, title: 'Absurdity: The Unexpected Spark', isRead: true, isUnlocked: true, readTime: 10, progress: 100 },
  { id: 5, title: 'Duality: The Push and Pull', isRead: true, isUnlocked: true, readTime: 14, progress: 100 },
  { id: 6, title: 'Tension: The Creative Force', isRead: true, isUnlocked: true, readTime: 11, progress: 100 },
  { id: 7, title: 'Resilience Through Paradox', isRead: true, isUnlocked: true, readTime: 13, progress: 100 },
  { id: 8, title: 'The Vulnerability Strength', isRead: true, isUnlocked: true, readTime: 16, progress: 100 },
  { id: 9, title: 'Success Through Failure', isRead: true, isUnlocked: true, readTime: 12, progress: 100 },
  { id: 10, title: 'Control by Letting Go', isRead: true, isUnlocked: true, readTime: 14, progress: 100 },
  { id: 11, title: 'Individual Collective Power', isRead: true, isUnlocked: true, readTime: 15, progress: 100 },
  { id: 12, title: 'The Resolution Paradox', isRead: true, isUnlocked: true, readTime: 13, progress: 75 },
  { id: 13, title: 'Integration and Practice', isRead: false, isUnlocked: true, readTime: 17, progress: 0 },
  { id: 14, title: 'Building Your Engine', isRead: false, isUnlocked: true, readTime: 19, progress: 0 },
  { id: 15, title: 'Advanced Applications', isRead: false, isUnlocked: true, readTime: 16, progress: 0 },
  { id: 16, title: 'Community and Connection', isRead: false, isUnlocked: true, readTime: 14, progress: 0 },
  { id: 17, title: 'Mastery Through Practice', isRead: false, isUnlocked: true, readTime: 18, progress: 0 },
  { id: 18, title: 'The Continuing Journey', isRead: false, isUnlocked: true, readTime: 12, progress: 0 },
  // Upcoming chapters
  { id: 19, title: 'Leadership Paradoxes', isRead: false, isUnlocked: false, readTime: 15, progress: 0 },
  { id: 20, title: 'Relationship Dynamics', isRead: false, isUnlocked: false, readTime: 16, progress: 0 },
]

const recentActivity = [
  { type: 'chapter', title: 'Completed Chapter 12: The Resolution Paradox', time: '2 hours ago' },
  { type: 'download', title: 'Downloaded Chapter 11 for offline reading', time: '1 day ago' },
  { type: 'bookmark', title: 'Bookmarked "The Integration Process"', time: '2 days ago' },
  { type: 'discussion', title: 'Joined discussion on vulnerability', time: '3 days ago' },
]

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return // Still loading
    if (!session) router.push('/api/auth/signin')
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <main className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-palette-warm mx-auto"></div>
              <p className="mt-4 text-palette-dark">Loading your dashboard...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!session) {
    return null // Will redirect
  }

  const progressPercentage = (userData.chaptersRead / userData.totalChapters) * 100

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-palette-deepest mb-2">
              Welcome back, {session?.user?.name || 'Reader'}!
            </h1>
            <p className="text-palette-dark">
              Continue your journey through The Paradox Engine
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-palette-dark">Reading Progress</p>
                  <p className="text-2xl font-bold text-palette-deepest">
                    {userData.chaptersRead}/{userData.totalChapters}
                  </p>
                </div>
                <div className="w-12 h-12 bg-palette-warm/20 rounded-lg flex items-center justify-center">
                  <Progress className="w-6 h-6 text-palette-warm" />
                </div>
              </div>
              <div className="mt-4 w-full bg-cream-200 rounded-full h-2">
                <div 
                  className="bg-palette-warm h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-palette-dark">Reading Streak</p>
                  <p className="text-2xl font-bold text-palette-deepest">
                    {userData.readingStreak} days
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-green-600 mt-2">Keep it up! 🔥</p>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-palette-dark">This Week</p>
                  <p className="text-2xl font-bold text-palette-deepest">
                    {userData.readingTimeWeek}m
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-palette-dark mt-2">Reading time</p>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-palette-dark">Subscription</p>
                  <p className="text-2xl font-bold text-palette-deepest capitalize">
                    {userData.subscriptionPlan}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-green-600 mt-2">Active</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-palette-medium">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview', icon: BookOpen },
                  { id: 'chapters', label: 'Chapters', icon: Play },
                  { id: 'downloads', label: 'Downloads', icon: Download },
                  { id: 'activity', label: 'Activity', icon: Bell },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-palette-warm text-palette-warm'
                        : 'border-transparent text-palette-dark hover:text-palette-deepest'
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
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-palette-deepest mb-4">Continue Reading</h3>
                <div className="bg-gradient-to-r from-palette-warm/20 to-palette-medium/20 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-palette-deepest mb-2">
                    {userData.lastReadChapter}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-palette-dark mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      13 min read
                    </span>
                    <span>75% complete</span>
                  </div>
                  <div className="w-full bg-cream-200 rounded-full h-2 mb-4">
                    <div className="bg-palette-warm h-2 rounded-full w-3/4"></div>
                  </div>
                  <button className="btn-primary text-sm">
                    <Play className="w-4 h-4 mr-2" />
                    Continue Reading
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-palette-deepest mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-palette-light rounded-full flex items-center justify-center mt-0.5">
                        {activity.type === 'chapter' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {activity.type === 'download' && <Download className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'bookmark' && <Star className="w-4 h-4 text-yellow-600" />}
                        {activity.type === 'discussion' && <Users className="w-4 h-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-palette-deepest">{activity.title}</p>
                        <p className="text-xs text-palette-dark">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chapters' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-palette-deepest">All Chapters</h3>
                <div className="text-sm text-palette-dark">
                  {userData.chaptersRead} of {userData.totalChapters} completed
                </div>
              </div>
              
              <div className="grid gap-4">
                {chapters.map((chapter) => (
                  <div 
                    key={chapter.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
                      chapter.isRead 
                        ? 'bg-green-50 border-green-200' 
                        : chapter.isUnlocked 
                        ? 'bg-white border-gray-200 hover:border-palette-warm' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {chapter.isRead ? (
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                      ) : chapter.isUnlocked ? (
                        <div className="w-10 h-10 bg-palette-warm/20 rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-palette-warm" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-palette-deepest">
                        Chapter {chapter.id}: {chapter.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-palette-dark mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {chapter.readTime} min read
                        </span>
                        {chapter.progress > 0 && (
                          <span>{chapter.progress}% complete</span>
                        )}
                      </div>
                      {chapter.progress > 0 && chapter.progress < 100 && (
                        <div className="w-full bg-cream-200 rounded-full h-1.5 mt-2">
                          <div 
                            className="bg-palette-warm h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${chapter.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0">
                      {chapter.isUnlocked ? (
                        <button className="btn-secondary text-sm">
                          {chapter.isRead ? 'Re-read' : 'Read'}
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400">Coming soon</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'downloads' && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-palette-deepest mb-6">Offline Downloads</h3>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Premium Feature</h4>
                <p className="text-sm text-blue-700">
                  Download chapters for offline reading. Available on Premium and VIP plans.
                </p>
              </div>
              
              <div className="grid gap-4">
                {chapters.slice(0, 8).map((chapter) => (
                  <div key={chapter.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div>
                      <h4 className="font-medium text-palette-deepest">
                        Chapter {chapter.id}: {chapter.title}
                      </h4>
                      <p className="text-sm text-palette-dark">Downloaded • PDF • 2.3 MB</p>
                    </div>
                    <button className="text-palette-warm hover:text-palette-deepest">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-palette-deepest mb-6">Reading Activity</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-palette-warm mb-2">
                      {userData.readingTimeToday}m
                    </div>
                    <p className="text-sm text-palette-dark">Today</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-palette-warm mb-2">
                      {userData.readingTimeWeek}m
                    </div>
                    <p className="text-sm text-palette-dark">This Week</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-palette-warm mb-2">
                      {userData.readingStreak}
                    </div>
                    <p className="text-sm text-palette-dark">Day Streak</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-palette-deepest mb-6">All Activity</h3>
                <div className="space-y-4">
                  {recentActivity.concat([
                    { type: 'chapter', title: 'Completed Chapter 11: Individual Collective Power', time: '4 days ago' },
                    { type: 'bookmark', title: 'Bookmarked "The Power of Both/And"', time: '5 days ago' },
                    { type: 'discussion', title: 'Started discussion on paradox applications', time: '6 days ago' },
                  ]).map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-cream-50">
                      <div className="w-8 h-8 bg-palette-light rounded-full flex items-center justify-center mt-0.5">
                        {activity.type === 'chapter' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {activity.type === 'download' && <Download className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'bookmark' && <Star className="w-4 h-4 text-yellow-600" />}
                        {activity.type === 'discussion' && <Users className="w-4 h-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-palette-deepest">{activity.title}</p>
                        <p className="text-xs text-palette-dark">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 card p-6">
            <h3 className="text-lg font-semibold text-palette-deepest mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/subscribe" className="btn-secondary text-center">
                <Settings className="w-4 h-4 mr-2" />
                Manage Subscription
              </Link>
              <Link href="/musings" className="btn-secondary text-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Articles
              </Link>
              <button className="btn-secondary">
                <Users className="w-4 h-4 mr-2" />
                Join Community
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 