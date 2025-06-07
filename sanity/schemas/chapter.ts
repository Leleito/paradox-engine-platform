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
      type: 'text',
      validation: (Rule: any) => Rule.required().min(100)
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
      title: 'Tags (comma separated)',
      type: 'text',
      description: 'Relevant tags separated by commas'
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
      title: 'Chapter Exercises (one per line)',
      type: 'text',
      description: 'List exercises one per line with format: Title | Instructions | Type'
    },
    {
      name: 'keyTakeaways',
      title: 'Key Takeaways (one per line)',
      type: 'text',
      description: 'Main points readers should remember, one per line'
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