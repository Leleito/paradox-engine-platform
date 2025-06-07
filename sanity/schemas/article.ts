export default {
  name: 'article',
  title: 'Articles',
  type: 'document',
  icon: () => '📝',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Psychology & Self-Development', value: 'psychology' },
          { title: 'Philosophy & Paradox', value: 'philosophy' },
          { title: 'Science & Consciousness', value: 'science' },
          { title: 'Relationships & Love', value: 'relationships' },
          { title: 'Economics & Politics', value: 'economics' },
          { title: 'Spirituality & Faith', value: 'spirituality' },
          { title: 'Personal Growth', value: 'growth' },
          { title: 'Paradox Engine Framework', value: 'framework' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      description: 'Optional subcategory for more specific organization'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief summary for article previews',
      validation: (Rule: any) => Rule.required().max(300)
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
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
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes'
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      initialValue: () => ({
        _type: 'reference',
        _ref: 'thomas-njeru' // Default to Thomas Njeru
      })
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Preview (Contents Tab)', value: 'preview' },
          { title: 'Published', value: 'published' }
        ]
      },
      initialValue: 'preview',
      description: 'Preview status shows only in Contents tab as snippets'
    },
    {
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Show prominently in category lists'
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Optimized title for search engines'
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Meta description for search engines'
    },
    {
      name: 'paradoxElements',
      title: 'Paradox Engine Elements',
      type: 'object',
      description: 'Framework elements present in this article',
      fields: [
        {
          name: 'absurdity',
          title: 'Contains Absurdity',
          type: 'boolean'
        },
        {
          name: 'duality',
          title: 'Contains Duality',
          type: 'boolean'
        },
        {
          name: 'tension',
          title: 'Contains Tension',
          type: 'boolean'
        },
        {
          name: 'rebellion',
          title: 'Contains Rebellion',
          type: 'boolean'
        },
        {
          name: 'variety',
          title: 'Contains Variety',
          type: 'boolean'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      status: 'status',
      media: 'author.image'
    },
    prepare(selection: any) {
      const { title, category, status } = selection
      const statusIcon = status === 'published' ? '✅' : status === 'preview' ? '👁️' : '📝'
      const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : ''
      
      return {
        title,
        subtitle: `${statusIcon} ${categoryName}`,
        media: selection.media
      }
    }
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ]
} 