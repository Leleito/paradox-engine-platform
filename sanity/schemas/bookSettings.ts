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
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ]
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
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'earlyAccessMessage',
      title: 'Early Access Message',
      type: 'text',
      rows: 2,
      initialValue: 'Join our exclusive early adopter community and get advance access to transformational content.'
    }),
    defineField({
      name: 'signupBenefits',
      title: 'Signup Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'benefit',
              title: 'Benefit',
              type: 'string'
            },
            {
              name: 'icon',
              title: 'Icon (emoji)',
              type: 'string'
            }
          ]
        }
      ]
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
      name: 'socialProof',
      title: 'Social Proof',
      type: 'object',
      fields: [
        {
          name: 'earlyAdopterCount',
          title: 'Early Adopter Count',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Testimonial Text',
                  type: 'text'
                },
                {
                  name: 'author',
                  title: 'Author Name',
                  type: 'string'
                },
                {
                  name: 'role',
                  title: 'Author Role',
                  type: 'string'
                }
              ]
            }
          ]
        }
      ]
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