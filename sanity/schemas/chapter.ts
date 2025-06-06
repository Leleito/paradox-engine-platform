export default {
  name: 'chapter',
  title: 'Book Chapter',
  type: 'document',
  icon: () => '📖',
  fields: [
    {
      name: 'title',
      title: 'Chapter Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'orderNumber',
      title: 'Chapter Number',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'excerpt',
      title: 'Chapter Excerpt',
      type: 'text',
      description: 'Brief description for chapter preview',
      validation: (Rule: any) => Rule.required().max(200)
    },
    {
      name: 'content',
      title: 'Chapter Content',
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
              { title: 'Code', value: 'code' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true }
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            {
              name: 'type',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  { title: 'Info', value: 'info' },
                  { title: 'Warning', value: 'warning' },
                  { title: 'Success', value: 'success' },
                  { title: 'Exercise', value: 'exercise' }
                ]
              }
            },
            {
              name: 'content',
              type: 'text',
              title: 'Content'
            }
          ]
        }
      ]
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'readTime',
      title: 'Estimated Reading Time (minutes)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'isUnlocked',
      title: 'Is Unlocked (Free Preview)',
      type: 'boolean',
      description: 'Check if this chapter is available for free users',
      initialValue: false
    },
    {
      name: 'isPremium',
      title: 'Premium Content',
      type: 'boolean',
      description: 'Requires Premium or VIP subscription',
      initialValue: true
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Set to true when ready to publish',
      initialValue: false
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When this chapter should be available'
    },
    {
      name: 'exercises',
      title: 'Chapter Exercises',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'exercise',
          title: 'Exercise',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Exercise Title'
            },
            {
              name: 'instructions',
              type: 'text',
              title: 'Instructions'
            },
            {
              name: 'type',
              type: 'string',
              title: 'Exercise Type',
              options: {
                list: [
                  'reflection',
                  'writing',
                  'practice',
                  'discussion'
                ]
              }
            }
          ]
        }
      ]
    },
    {
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Main points readers should remember'
    }
  ],
  preview: {
    select: {
      title: 'title',
      orderNumber: 'orderNumber',
      published: 'published',
      media: 'coverImage'
    },
    prepare(selection: any) {
      const { title, orderNumber, published } = selection
      return {
        title: `Chapter ${orderNumber}: ${title}`,
        subtitle: published ? 'Published' : 'Draft'
      }
    }
  },
  orderings: [
    {
      title: 'Chapter Order',
      name: 'orderNumber',
      by: [{ field: 'orderNumber', direction: 'asc' }]
    },
    {
      title: 'Published Date',
      name: 'publishedAt',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ]
} 