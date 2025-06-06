export default {
  name: 'cta',
  title: 'Call to Actions',
  type: 'document',
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
      name: 'location',
      title: 'Location',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Section', value: 'hero' },
          { title: 'Header', value: 'header' },
          { title: 'Footer', value: 'footer' },
          { title: 'Subscribe Page', value: 'subscribe' },
          { title: 'Newsletter', value: 'newsletter' },
          { title: 'Lead Magnet', value: 'lead-magnet' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3
    },
    {
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Accent', value: 'accent' }
            ]
          },
          initialValue: 'primary'
        }
      ]
    },
    {
      name: 'secondaryButton',
      title: 'Secondary Button (Optional)',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string'
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'string'
        },
        {
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Accent', value: 'accent' }
            ]
          },
          initialValue: 'secondary'
        }
      ]
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Is this CTA currently active?',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      active: 'active'
    },
    prepare(selection: any) {
      const { title, subtitle, active } = selection
      return {
        title: `${title}${!active ? ' (Inactive)' : ''}`,
        subtitle: subtitle
      }
    }
  }
} 