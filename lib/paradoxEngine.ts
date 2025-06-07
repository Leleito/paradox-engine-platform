import { client } from './sanity'

// Book Settings
export async function getBookSettings() {
  return await client.fetch(`
    *[_type == "bookSettings"][0] {
      bookCover {
        asset->{
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      bookTitle,
      bookSubtitle,
      heroTagline,
      heroDescription,
      earlyAccessMessage,
      signupBenefits[] {
        benefit,
        icon
      },
      signupCtaText,
      readingProgressMessage,
      exerciseCompletionMessage,
      socialProof {
        earlyAdopterCount,
        testimonials[] {
          text,
          author,
          role
        }
      },
      footerTagline
    }
  `)
}

// Book Content
export async function getAllContent() {
  return await client.fetch(`
    *[_type == "bookContent"] | order(orderIndex asc) {
      _id,
      title,
      slug,
      contentType,
      category,
      excerpt,
      content,
      readingTime,
      orderIndex,
      isEarlyAccess,
      previewPercentage,
      publishedAt
    }
  `)
}

export async function getContentBySlug(slug: string) {
  return await client.fetch(`
    *[_type == "bookContent" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      contentType,
      category,
      excerpt,
      content,
      readingTime,
      orderIndex,
      isEarlyAccess,
      previewPercentage,
      publishedAt
    }
  `, { slug })
}

export async function getContentByType(contentType: string) {
  return await client.fetch(`
    *[_type == "bookContent" && contentType == $contentType] | order(orderIndex asc) {
      _id,
      title,
      slug,
      contentType,
      category,
      excerpt,
      content,
      readingTime,
      orderIndex,
      isEarlyAccess,
      previewPercentage,
      publishedAt
    }
  `, { contentType })
}

export async function getContentByCategory(category: string) {
  return await client.fetch(`
    *[_type == "bookContent" && category == $category] | order(orderIndex asc) {
      _id,
      title,
      slug,
      contentType,
      category,
      excerpt,
      content,
      readingTime,
      orderIndex,
      isEarlyAccess,
      previewPercentage,
      publishedAt
    }
  `, { category })
}

export async function getLeadMagnet() {
  return await client.fetch(`
    *[_type == "bookContent" && contentType == "leadMagnet"][0] {
      _id,
      title,
      slug,
      contentType,
      category,
      excerpt,
      content,
      readingTime,
      orderIndex,
      isEarlyAccess,
      previewPercentage,
      publishedAt
    }
  `)
}

// User Progress
export async function getUserProgress(userEmail: string) {
  return await client.fetch(`
    *[_type == "userProgress" && userEmail == $userEmail] {
      _id,
      userEmail,
      contentId->{
        _id,
        title,
        slug,
        contentType,
        category
      },
      readingProgress,
      lastPosition,
      timeSpent,
      isCompleted,
      exerciseResponses[] {
        exerciseId,
        questionId,
        response,
        completedAt
      },
      insights[] {
        insight,
        contentSection,
        addedAt
      },
      bookmarks[] {
        position,
        note,
        addedAt
      },
      lastAccessed,
      signupDate
    } | order(lastAccessed desc)
  `, { userEmail })
}

export async function updateUserProgress(data: {
  userEmail: string
  contentId: string
  readingProgress?: number
  lastPosition?: string
  timeSpent?: number
  isCompleted?: boolean
}) {
  const existingProgress = await client.fetch(`
    *[_type == "userProgress" && userEmail == $userEmail && references($contentId)][0]
  `, { userEmail: data.userEmail, contentId: data.contentId })

  if (existingProgress) {
    return await client
      .patch(existingProgress._id)
      .set({
        readingProgress: data.readingProgress ?? existingProgress.readingProgress,
        lastPosition: data.lastPosition ?? existingProgress.lastPosition,
        timeSpent: (existingProgress.timeSpent || 0) + (data.timeSpent || 0),
        isCompleted: data.isCompleted ?? existingProgress.isCompleted,
        lastAccessed: new Date().toISOString()
      })
      .commit()
  } else {
    return await client.create({
      _type: 'userProgress',
      userEmail: data.userEmail,
      contentId: {
        _type: 'reference',
        _ref: data.contentId
      },
      readingProgress: data.readingProgress || 0,
      lastPosition: data.lastPosition || '',
      timeSpent: data.timeSpent || 0,
      isCompleted: data.isCompleted || false,
      lastAccessed: new Date().toISOString(),
      signupDate: new Date().toISOString()
    })
  }
}

export async function saveExerciseResponse(data: {
  userEmail: string
  contentId: string
  exerciseId: string
  questionId: string
  response: string
}) {
  const progress = await client.fetch(`
    *[_type == "userProgress" && userEmail == $userEmail && references($contentId)][0]
  `, { userEmail: data.userEmail, contentId: data.contentId })

  if (progress) {
    const existingResponses = progress.exerciseResponses || []
    const updatedResponses = existingResponses.filter(
      (r: any) => !(r.exerciseId === data.exerciseId && r.questionId === data.questionId)
    )
    
    updatedResponses.push({
      exerciseId: data.exerciseId,
      questionId: data.questionId,
      response: data.response,
      completedAt: new Date().toISOString()
    })

    return await client
      .patch(progress._id)
      .set({
        exerciseResponses: updatedResponses,
        lastAccessed: new Date().toISOString()
      })
      .commit()
  }
}

export async function addUserInsight(data: {
  userEmail: string
  contentId: string
  insight: string
  contentSection: string
}) {
  const progress = await client.fetch(`
    *[_type == "userProgress" && userEmail == $userEmail && references($contentId)][0]
  `, { userEmail: data.userEmail, contentId: data.contentId })

  if (progress) {
    const existingInsights = progress.insights || []
    existingInsights.push({
      insight: data.insight,
      contentSection: data.contentSection,
      addedAt: new Date().toISOString()
    })

    return await client
      .patch(progress._id)
      .set({
        insights: existingInsights,
        lastAccessed: new Date().toISOString()
      })
      .commit()
  }
}

// Analytics
export async function getEarlyAdopterStats() {
  const totalUsers = await client.fetch(`count(*[_type == "userProgress"])`)
  const activeUsers = await client.fetch(`count(*[_type == "userProgress" && lastAccessed > now() - 60*60*24*7])`)
  const completedContent = await client.fetch(`count(*[_type == "userProgress" && isCompleted == true])`)
  
  return {
    totalUsers,
    activeUsers,
    completedContent
  }
}

// Types
export interface BookSettings {
  bookCover?: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }
  bookTitle: string
  bookSubtitle: string
  heroTagline: string
  heroDescription: string
  earlyAccessMessage: string
  signupBenefits: Array<{
    benefit: string
    icon: string
  }>
  signupCtaText: string
  readingProgressMessage: string
  exerciseCompletionMessage: string
  socialProof: {
    earlyAdopterCount: number
    testimonials: Array<{
      text: string
      author: string
      role: string
    }>
  }
  footerTagline: string
}

export interface BookContent {
  _id: string
  title: string
  slug: {
    current: string
  }
  contentType: 'leadMagnet' | 'article' | 'exercise' | 'framework'
  category: 'economics' | 'politics' | 'spirituality' | 'sexuality' | 'framework'
  excerpt: string
  content: any[]
  readingTime: number
  orderIndex: number
  isEarlyAccess: boolean
  previewPercentage: number
  publishedAt: string
}

export interface UserProgress {
  _id: string
  userEmail: string
  contentId: {
    _id: string
    title: string
    slug: {
      current: string
    }
    contentType: string
    category: string
  }
  readingProgress: number
  lastPosition: string
  timeSpent: number
  isCompleted: boolean
  exerciseResponses: Array<{
    exerciseId: string
    questionId: string
    response: string
    completedAt: string
  }>
  insights: Array<{
    insight: string
    contentSection: string
    addedAt: string
  }>
  bookmarks: Array<{
    position: string
    note: string
    addedAt: string
  }>
  lastAccessed: string
  signupDate: string
} 