import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.type || !body.content || !body.userInfo?.name || !body.userInfo?.email) {
      return NextResponse.json(
        { error: 'Missing required fields: type, content, name, email' },
        { status: 400 }
      )
    }

    // Validate content length
    if (body.content.length < 10 || body.content.length > 2000) {
      return NextResponse.json(
        { error: 'Content must be between 10 and 2000 characters' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.userInfo.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Prepare feedback document for Sanity
    const feedbackDocument: any = {
      _type: 'feedback',
      type: body.type,
      content: body.content.trim(),
      userInfo: {
        name: body.userInfo.name.trim(),
        email: body.userInfo.email.toLowerCase().trim(),
        userId: body.userInfo.userId || null
      },
      rating: body.rating || null,
      status: 'new',
      priority: determinePriority(body.type, body.content),
      tags: generateTags(body.type, body.content),
      metadata: {
        userAgent: body.metadata?.userAgent || request.headers.get('user-agent'),
        ipAddress: request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown',
        pageUrl: body.metadata?.pageUrl || request.headers.get('referer'),
        sessionId: body.metadata?.sessionId || 'anonymous'
      },
      submittedAt: new Date().toISOString(),
      isPublic: false // Default to private, admin can approve for public display
    }

    // Add related article reference if provided
    if (body.relatedArticle) {
      feedbackDocument.relatedArticle = {
        _type: 'reference',
        _ref: body.relatedArticle
      }
    }

    // Create the document in Sanity
    const result = await writeClient.create(feedbackDocument)

    // Send confirmation response
    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
      id: result._id,
      type: body.type
    })

  } catch (error) {
    console.error('Feedback submission error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to submit feedback. Please try again.',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}

// Helper function to determine priority based on type and content
function determinePriority(type: string, content: string): string {
  const lowercaseContent = content.toLowerCase()
  
  // High priority keywords
  const highPriorityKeywords = [
    'urgent', 'critical', 'broken', 'error', 'crash', 'bug', 'not working',
    'can\'t access', 'lost data', 'payment issue', 'security', 'hack'
  ]
  
  // High priority types
  const highPriorityTypes = ['bug']
  
  // Check for high priority
  if (highPriorityTypes.includes(type) || 
      highPriorityKeywords.some(keyword => lowercaseContent.includes(keyword))) {
    return 'high'
  }
  
  // Medium priority types
  const mediumPriorityTypes = ['feature', 'platform']
  if (mediumPriorityTypes.includes(type)) {
    return 'medium'
  }
  
  // Default to low priority
  return 'low'
}

// Helper function to generate tags based on content
function generateTags(type: string, content: string): string[] {
  const tags: string[] = [type]
  const lowercaseContent = content.toLowerCase()
  
  // Content-based tags
  const tagKeywords = {
    'ui': ['interface', 'design', 'layout', 'button', 'menu'],
    'performance': ['slow', 'loading', 'speed', 'lag', 'timeout'],
    'mobile': ['phone', 'mobile', 'responsive', 'touch'],
    'desktop': ['computer', 'desktop', 'laptop', 'browser'],
    'search': ['search', 'find', 'filter', 'sort'],
    'content': ['article', 'chapter', 'book', 'reading'],
    'account': ['login', 'signup', 'profile', 'account', 'password'],
    'navigation': ['menu', 'navigate', 'link', 'page', 'redirect']
  }
  
  Object.entries(tagKeywords).forEach(([tag, keywords]) => {
    if (keywords.some(keyword => lowercaseContent.includes(keyword))) {
      tags.push(tag)
    }
  })
  
  return Array.from(new Set(tags)) // Remove duplicates
}

// Optional: GET method to retrieve public feedback (for displaying comments)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get('article')
    const type = searchParams.get('type')
    
    if (!articleId && !type) {
      return NextResponse.json(
        { error: 'Missing article ID or type parameter' },
        { status: 400 }
      )
    }

    let query = '*[_type == "feedback" && isPublic == true && status == "approved"'
    
    if (articleId) {
      query += ` && relatedArticle._ref == "${articleId}"`
    }
    
    if (type) {
      query += ` && type == "${type}"`
    }
    
    query += '] | order(submittedAt desc) [0...20] { _id, type, content, userInfo, rating, submittedAt, adminResponse }'

    const feedback = await writeClient.fetch(query)
    
    return NextResponse.json({
      success: true,
      feedback,
      count: feedback.length
    })

  } catch (error) {
    console.error('Feedback retrieval error:', error)
    
    return NextResponse.json(
      { error: 'Failed to retrieve feedback' },
      { status: 500 }
    )
  }
} 