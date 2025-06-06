import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, type } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Add to email service (e.g., ConvertKit, Mailchimp)
    // 3. Send welcome email
    
    // For now, we'll just log and return success
    console.log(`New early adopter signup: ${email}`)

    // In production, you might use something like:
    // await saveToDatabase({ email, type: 'early-adopter', signupDate: new Date() })
    // await addToEmailList(email, 'early-adopters')
    // await sendWelcomeEmail(email)

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the early adopter list!'
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
} 