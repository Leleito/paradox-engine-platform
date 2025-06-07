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
          { title: 'Business & Leadership', value: 'business' },
          { title: 'Relationships & Sexuality', value: 'relationships' },
          { title: 'Spirituality & Religion', value: 'spirituality' },
          { title: 'Society & Culture', value: 'society' },
          { title: 'Paradox Engine Framework', value: 'framework' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      description: 'Optional subcategory for more specific classification'
    },
    {
      name: 'excerpt',
      title: 'Excerpt/Preview',
      type: 'text',
      validation: (Rule: any) => Rule.required().max(300)
    },
    {
      name: 'content',
      title: 'Full Article Content',
      type: 'text',
      validation: (Rule: any) => Rule.required().min(100)
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Thomas Njeru'
    },
    {
      name: 'readingTime',
      title: 'Estimated Reading Time (minutes)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(60)
    },
    {
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Expert', value: 'expert' }
        ]
      },
      initialValue: 'intermediate'
    },
    {
      name: 'tags',
      title: 'Tags (comma separated)',
      type: 'text',
      description: 'Relevant tags separated by commas'
    },
    {
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Review', value: 'review' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' }
        ]
      },
      initialValue: 'draft'
    },
    {
      name: 'relatedArticles',
      title: 'Related Articles (comma separated slugs)',
      type: 'text',
      description: 'Slugs of related articles separated by commas'
    },
    {
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      validation: (Rule: any) => Rule.max(160)
    },
    {
      name: 'socialImageUrl',
      title: 'Social Media Image URL',
      type: 'url',
      description: 'Image for social media sharing'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      description: 'status'
    },
    prepare(selection: any) {
      const { title, subtitle, description } = selection
      const statusIcon = {
        'draft': '📝',
        'review': '👀',
        'published': '✅',
        'archived': '📦'
      }[description as string] || '📝'
      
      const categoryLabel = {
        'psychology': 'Psychology',
        'philosophy': 'Philosophy',
        'science': 'Science',
        'business': 'Business',
        'relationships': 'Relationships',
        'spirituality': 'Spirituality',
        'society': 'Society',
        'framework': 'Framework'
      }[subtitle as string] || 'Article'
      
      return {
        title: title || 'Untitled Article',
        subtitle: categoryLabel,
        description: `${statusIcon} ${description || 'draft'}`,
        media: () => '📝'
      }
    }
  },
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Published Date (Oldest)',
      name: 'publishedAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ]
} 