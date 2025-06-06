export default {
  name: 'subscriptionPlan',
  title: 'Subscription Plans',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'price',
      title: 'Price (KES)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0)
    },
    {
      name: 'period',
      title: 'Billing Period',
      type: 'string',
      options: {
        list: [
          { title: 'Forever', value: 'forever' },
          { title: 'Monthly', value: 'month' },
          { title: 'Yearly', value: 'year' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'popular',
      title: 'Most Popular',
      type: 'boolean',
      description: 'Highlight this plan as the most popular option',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Is this plan currently available?',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      period: 'period',
      popular: 'popular'
    },
    prepare(selection: any) {
      const { title, subtitle, period, popular } = selection
      return {
        title: `${title}${popular ? ' ⭐' : ''}`,
        subtitle: `KES ${subtitle}/${period}`
      }
    }
  }
} 