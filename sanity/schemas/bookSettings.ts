import { defineType, defineField } from 'sanity'

export const bookSettings = defineType({
  name: 'bookSettings',
  title: 'Paradox Engine Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Settings Title',
      type: 'string',
      initialValue: 'Paradox Engine Settings',
      readOnly: true
    }),
    defineField({
      name: 'bookCover',
      title: 'Book Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'bookTitle',
      title: 'Book Title',
      type: 'string',
      initialValue: 'Paradox Engine'
    }),
    defineField({
      name: 'bookSubtitle',
      title: 'Book Subtitle',
      type: 'string',
      initialValue: 'Your Guide to Transformation'
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      initialValue: 'Unlock Your Paradox Engine'
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text'
    }),
    defineField({
      name: 'earlyAccessMessage',
      title: 'Early Access Message',
      type: 'text',
      initialValue: 'Join our exclusive early adopter community and get advance access to transformational content.'
    }),
    defineField({
      name: 'signupBenefits',
      title: 'Signup Benefits (comma separated)',
      type: 'text',
      description: 'List benefits separated by commas'
    }),
    defineField({
      name: 'signupCtaText',
      title: 'Signup CTA Text',
      type: 'string',
      initialValue: 'Get Early Access'
    }),
    defineField({
      name: 'readingProgressMessage',
      title: 'Reading Progress Message',
      type: 'string',
      initialValue: 'Continue reading to unlock more insights...'
    }),
    defineField({
      name: 'exerciseCompletionMessage',
      title: 'Exercise Completion Message',
      type: 'string',
      initialValue: 'Great work! Your response has been saved to your dashboard.'
    }),
    defineField({
      name: 'earlyAdopterCount',
      title: 'Early Adopter Count',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials (JSON format)',
      type: 'text',
      description: 'Testimonials in JSON format (advanced editor coming soon)'
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      initialValue: 'Turn tension into triumph'
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Paradox Engine Settings'
      }
    }
  }
}) 