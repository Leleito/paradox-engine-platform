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
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'content',
      title: 'Full Content',
      type: 'text',
      description: 'Full article content (enhanced editor coming soon)'
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