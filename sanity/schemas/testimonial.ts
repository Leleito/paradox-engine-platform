export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'role',
      title: 'Role/Position',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string'
    },
    {
      name: 'content',
      title: 'Testimonial Content',
      type: 'text',
      validation: (Rule: any) => Rule.required().min(10).max(500)
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: '1 Star', value: 1 },
          { title: '2 Stars', value: 2 },
          { title: '3 Stars', value: 3 },
          { title: '4 Stars', value: 4 },
          { title: '5 Stars', value: 5 }
        ]
      }
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this testimonial prominently on the homepage',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first'
    }
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'company',
      rating: 'rating'
    },
    prepare(selection: any) {
      const { title, subtitle, rating } = selection
      return {
        title,
        subtitle: `${subtitle} - ${rating} stars`
      }
    }
  }
} 