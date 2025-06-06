export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: () => '🏠',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'Main title of the book',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          description: 'Tagline or description below the title',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'bookCover',
          title: 'Book Cover Image',
          type: 'image',
          description: 'Upload the actual book cover image',
          options: {
            hotspot: true
          },
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'ctaPrimary',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'action',
              title: 'Action',
              type: 'string',
              description: 'What happens when clicked (e.g., "openModal", "scrollToSection")',
              options: {
                list: [
                  { title: 'Open Lead Magnet Modal', value: 'openModal' },
                  { title: 'Scroll to Preview', value: 'scrollToPreview' },
                  { title: 'Go to Subscribe', value: 'goToSubscribe' }
                ]
              }
            }
          ]
        },
        {
          name: 'ctaSecondary',
          title: 'Secondary CTA',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string'
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string'
            }
          ]
        },
        {
          name: 'stats',
          title: 'Statistics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string'
                },
                {
                  name: 'value',
                  title: 'Value',
                  type: 'string'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'bookPreview',
      title: 'Book Preview Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Preview the Journey'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text'
        }
      ]
    },
    {
      name: 'features',
      title: 'Features Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'What You\'ll Discover'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text'
        },
        {
          name: 'featuresList',
          title: 'Features List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  description: 'Icon name (e.g., "lightbulb", "target", "users")',
                  options: {
                    list: [
                      { title: 'Lightbulb', value: 'lightbulb' },
                      { title: 'Target', value: 'target' },
                      { title: 'Users', value: 'users' },
                      { title: 'Trending Up', value: 'trending-up' },
                      { title: 'Shield', value: 'shield' },
                      { title: 'Zap', value: 'zap' }
                    ]
                  }
                },
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string'
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'leadMagnet',
      title: 'Lead Magnet Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text'
        },
        {
          name: 'benefits',
          title: 'Benefits List',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    },
    {
      name: 'socialProof',
      title: 'Social Proof Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'What Early Readers Are Saying'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text'
        }
      ]
    },
    {
      name: 'newsletter',
      title: 'Newsletter Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text'
        },
        {
          name: 'benefits',
          title: 'Benefits List',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Content'
      }
    }
  }
} 