import { defineType, defineField } from 'sanity'

export const bookContent = defineType({
  name: 'bookContent',
  title: 'Paradox Engine Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Content Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Lead Magnet', value: 'leadMagnet' },
          { title: 'Article', value: 'article' },
          { title: 'Exercise', value: 'exercise' },
          { title: 'Framework Section', value: 'framework' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Economics', value: 'economics' },
          { title: 'Politics', value: 'politics' },
          { title: 'Spirituality', value: 'spirituality' },
          { title: 'Sexuality', value: 'sexuality' },
          { title: 'Framework', value: 'framework' }
        ]
      }
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt/Teaser',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'content',
      title: 'Full Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Highlight', value: 'highlight' }
            ],
            annotations: [
              {
                name: 'callToAction',
                type: 'object',
                title: 'Call to Action',
                fields: [
                  {
                    name: 'text',
                    type: 'string',
                    title: 'CTA Text'
                  },
                  {
                    name: 'type',
                    type: 'string',
                    title: 'CTA Type',
                    options: {
                      list: [
                        { title: 'Email Signup', value: 'signup' },
                        { title: 'Exercise', value: 'exercise' },
                        { title: 'Reflection', value: 'reflection' }
                      ]
                    }
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'object',
          name: 'exercise',
          title: 'Interactive Exercise',
          fields: [
            {
              name: 'title',
              title: 'Exercise Title',
              type: 'string'
            },
            {
              name: 'instructions',
              title: 'Instructions',
              type: 'text'
            },
            {
              name: 'questions',
              title: 'Questions',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'question',
                      title: 'Question',
                      type: 'string'
                    },
                    {
                      name: 'type',
                      title: 'Response Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Text', value: 'text' },
                          { title: 'Scale 1-10', value: 'scale' },
                          { title: 'Multiple Choice', value: 'choice' }
                        ]
                      }
                    },
                    {
                      name: 'options',
                      title: 'Options (for multiple choice)',
                      type: 'array',
                      of: [{ type: 'string' }],
                      hidden: ({ parent }) => parent?.type !== 'choice'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      validation: Rule => Rule.min(1).max(60)
    }),
    defineField({
      name: 'orderIndex',
      title: 'Order Index',
      type: 'number',
      description: 'Used to order content in sequence'
    }),
    defineField({
      name: 'isEarlyAccess',
      title: 'Early Access Only',
      type: 'boolean',
      description: 'Requires email signup to access'
    }),
    defineField({
      name: 'previewPercentage',
      title: 'Preview Percentage',
      type: 'number',
      description: 'Percentage of content shown before signup (0-100)',
      validation: Rule => Rule.min(0).max(100),
      initialValue: 30
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    })
  ],
  orderings: [
    {
      title: 'Order Index',
      name: 'orderIndex',
      by: [{ field: 'orderIndex', direction: 'asc' }]
    },
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'contentType',
      description: 'excerpt'
    }
  }
}) 