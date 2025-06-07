import { defineType, defineField } from 'sanity'

export const userProgress = defineType({
  name: 'userProgress',
  title: 'User Progress',
  type: 'document',
  fields: [
    defineField({
      name: 'userEmail',
      title: 'User Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    }),
    defineField({
      name: 'contentId',
      title: 'Content ID',
      type: 'reference',
      to: [{ type: 'bookContent' }]
    }),
    defineField({
      name: 'readingProgress',
      title: 'Reading Progress (%)',
      type: 'number',
      validation: Rule => Rule.min(0).max(100)
    }),
    defineField({
      name: 'lastPosition',
      title: 'Last Reading Position',
      type: 'string',
      description: 'Element ID or scroll position'
    }),
    defineField({
      name: 'timeSpent',
      title: 'Time Spent (minutes)',
      type: 'number'
    }),
    defineField({
      name: 'isCompleted',
      title: 'Completed',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'exerciseResponses',
      title: 'Exercise Responses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'exerciseId',
              title: 'Exercise ID',
              type: 'string'
            },
            {
              name: 'questionId',
              title: 'Question ID',
              type: 'string'
            },
            {
              name: 'response',
              title: 'User Response',
              type: 'text'
            },
            {
              name: 'completedAt',
              title: 'Completed At',
              type: 'datetime'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'insights',
      title: 'Personal Insights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'insight',
              title: 'Insight',
              type: 'text'
            },
            {
              name: 'contentSection',
              title: 'Related Content Section',
              type: 'string'
            },
            {
              name: 'addedAt',
              title: 'Added At',
              type: 'datetime'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'bookmarks',
      title: 'Bookmarks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'position',
              title: 'Position',
              type: 'string'
            },
            {
              name: 'note',
              title: 'Note',
              type: 'text'
            },
            {
              name: 'addedAt',
              title: 'Added At',
              type: 'datetime'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'lastAccessed',
      title: 'Last Accessed',
      type: 'datetime'
    }),
    defineField({
      name: 'signupDate',
      title: 'Signup Date',
      type: 'datetime'
    })
  ],
  orderings: [
    {
      title: 'Last Accessed',
      name: 'lastAccessedDesc',
      by: [{ field: 'lastAccessed', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'userEmail',
      subtitle: 'contentId.title'
    }
  }
}) 