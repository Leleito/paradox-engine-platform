import { defineField, defineType } from 'sanity'

export const userProgress = defineType({
  name: 'userProgress',
  title: 'User Progress',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    }),
    defineField({
      name: 'currentChapter',
      title: 'Current Chapter',
      type: 'number',
      initialValue: 1
    }),
    defineField({
      name: 'completedChapters',
      title: 'Completed Chapters (comma separated)',
      type: 'text',
      description: 'List of completed chapter IDs separated by commas'
    }),
    defineField({
      name: 'bookmarks',
      title: 'Bookmarks (comma separated)',
      type: 'text',
      description: 'List of bookmarked content IDs separated by commas'
    }),
    defineField({
      name: 'notes',
      title: 'Personal Notes',
      type: 'text'
    }),
    defineField({
      name: 'lastActivity',
      title: 'Last Activity',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'readingTime',
      title: 'Total Reading Time (minutes)',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'subscriptionTier',
      title: 'Subscription Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Free', value: 'free' },
          { title: 'Premium', value: 'premium' },
          { title: 'VIP', value: 'vip' }
        ]
      },
      initialValue: 'free'
    })
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'currentChapter',
      description: 'subscriptionTier'
    },
    prepare(selection) {
      const { title, subtitle, description } = selection
      return {
        title: title || 'User Progress',
        subtitle: `Chapter ${subtitle || 1}`,
        description: `${description || 'free'} tier`
      }
    }
  }
}) 