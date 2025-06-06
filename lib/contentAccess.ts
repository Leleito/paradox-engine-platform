import { Session } from 'next-auth'

// Define subscription tiers
export type SubscriptionTier = 'free' | 'premium' | 'vip'

// Define content types
export type ContentType = 'chapter' | 'article' | 'exercise' | 'community' | 'download'

// Content access rules
interface AccessRule {
  contentType: ContentType
  requiredTier: SubscriptionTier
  additionalRequirements?: string[]
}

const ACCESS_RULES: AccessRule[] = [
  { contentType: 'chapter', requiredTier: 'free' }, // First 3 chapters
  { contentType: 'article', requiredTier: 'free' }, // Preview articles
  { contentType: 'exercise', requiredTier: 'premium' },
  { contentType: 'community', requiredTier: 'premium' },
  { contentType: 'download', requiredTier: 'premium' }
]

// Mock user subscription data (in production, this would come from your database)
const getUserSubscription = (userId: string): SubscriptionTier => {
  // This would be a database call in production
  // For now, return based on user ID patterns
  if (userId?.includes('vip')) return 'vip'
  if (userId?.includes('premium')) return 'premium'
  return 'free'
}

// Content access checker
export class ContentAccessManager {
  private session: Session | null

  constructor(session: Session | null) {
    this.session = session
  }

  // Get user's subscription tier
  getUserTier(): SubscriptionTier {
    if (!this.session?.user?.id) return 'free'
    return getUserSubscription(this.session.user.id)
  }

  // Check if user can access specific content
  canAccess(contentType: ContentType, contentId?: string): boolean {
    const userTier = this.getUserTier()
    
    // Special rules for chapters
    if (contentType === 'chapter' && contentId) {
      const chapterNumber = parseInt(contentId)
      
      // Free users get first 3 chapters
      if (userTier === 'free' && chapterNumber <= 3) return true
      
      // Premium and VIP get all chapters
      if (userTier === 'premium' || userTier === 'vip') return true
      
      return false
    }

    // Check general access rules
    const rule = ACCESS_RULES.find(r => r.contentType === contentType)
    if (!rule) return false

    return this.hasTierAccess(userTier, rule.requiredTier)
  }

  // Check if user tier meets requirement
  private hasTierAccess(userTier: SubscriptionTier, requiredTier: SubscriptionTier): boolean {
    const tierHierarchy: SubscriptionTier[] = ['free', 'premium', 'vip']
    const userLevel = tierHierarchy.indexOf(userTier)
    const requiredLevel = tierHierarchy.indexOf(requiredTier)
    
    return userLevel >= requiredLevel
  }

  // Get access summary for user
  getAccessSummary() {
    const tier = this.getUserTier()
    const isLoggedIn = !!this.session?.user

    return {
      tier,
      isLoggedIn,
      canAccessPremiumChapters: this.canAccess('chapter', '4'),
      canDownload: this.canAccess('download'),
      canAccessCommunity: this.canAccess('community'),
      canAccessExercises: this.canAccess('exercise'),
      freeChaptersCount: 3,
      totalChaptersCount: 20
    }
  }

  // Get upgrade options for user
  getUpgradeOptions() {
    const currentTier = this.getUserTier()
    
    const plans = [
      {
        id: 'premium',
        name: 'Premium Reader',
        price: 299,
        currency: 'KES',
        period: 'month',
        features: [
          'Complete book access',
          'New chapters weekly',
          'Download for offline reading',
          'Community access',
          'Progress tracking'
        ],
        available: currentTier === 'free'
      },
      {
        id: 'vip',
        name: 'VIP Member',
        price: 799,
        currency: 'KES',
        period: 'month',
        features: [
          'Everything in Premium',
          'Monthly live Q&A with author',
          'Physical book shipped',
          'Direct author messaging',
          'Early access to new books'
        ],
        available: currentTier !== 'vip'
      }
    ]

    return plans.filter(plan => plan.available)
  }

  // Generate content gate message
  getGateMessage(contentType: ContentType): string {
    const tier = this.getUserTier()
    
    if (!this.session?.user) {
      return 'Sign in to access this content and track your reading progress.'
    }

    switch (contentType) {
      case 'chapter':
        if (tier === 'free') {
          return 'Unlock all chapters with a Premium subscription. Continue your transformation journey!'
        }
        break
      case 'download':
        return 'Download chapters for offline reading with Premium or VIP membership.'
      case 'exercise':
        return 'Access interactive exercises and worksheets with Premium membership.'
      case 'community':
        return 'Join our community discussions with Premium or VIP membership.'
      default:
        return 'Upgrade your subscription to access this premium content.'
    }

    return 'This content requires a higher subscription tier.'
  }
}

// Helper function to check chapter access
export const checkChapterAccess = (session: Session | null, chapterNumber: number): boolean => {
  const manager = new ContentAccessManager(session)
  return manager.canAccess('chapter', chapterNumber.toString())
}

// Helper function to get reading progress permission
export const canTrackProgress = (session: Session | null): boolean => {
  return !!session?.user // Any logged-in user can track progress
}

// Helper function for subscription status
export const getSubscriptionStatus = (session: Session | null) => {
  const manager = new ContentAccessManager(session)
  return manager.getAccessSummary()
}

// Content gating component props
export interface ContentGateProps {
  contentType: ContentType
  contentId?: string
  fallback?: React.ReactNode
  children: React.ReactNode
}

// Content unlock URLs
export const getUnlockUrl = (contentType: ContentType): string => {
  switch (contentType) {
    case 'chapter':
    case 'download':
    case 'exercise':
      return '/subscribe'
    case 'community':
      return '/subscribe'
    default:
      return '/subscribe'
  }
}

// Trial access for new users
export const grantTrialAccess = (userId: string, contentType: ContentType): boolean => {
  // Grant 7-day trial access to premium features for new users
  // This would be implemented with your user database
  return false // Placeholder
}

// Content analytics
export const trackContentAccess = (
  userId: string, 
  contentType: ContentType, 
  contentId: string, 
  accessGranted: boolean
) => {
  // Track content access attempts for analytics
  // This would integrate with your analytics service
  console.log('Content access:', { userId, contentType, contentId, accessGranted })
} 