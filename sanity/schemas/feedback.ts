export default {
  name: 'feedback',
  title: 'Community Feedback',
  type: 'document',
  icon: () => '💬',
  fields: [
    {
      name: 'type',
      title: 'Feedback Type',
      type: 'string',
      options: {
        list: [
          { title: 'Article Comment', value: 'comment' },
          { title: 'Platform Feedback', value: 'platform' },
          { title: 'Content Request', value: 'request' },
          { title: 'Bug Report', value: 'bug' },
          { title: 'Feature Request', value: 'feature' },
          { title: 'General Inquiry', value: 'inquiry' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'content',
      title: 'Feedback Content',
      type: 'text',
      validation: (Rule: any) => Rule.required().min(10).max(2000)
    },
    {
      name: 'userEmail',
      title: 'User Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email()
    },
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
      description: 'Optional user ID if logged in'
    },
    {
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(5)
    },
    {
      name: 'relatedArticle',
      title: 'Related Article Slug',
      type: 'string',
      description: 'Article slug this feedback relates to (if applicable)'
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Reviewing', value: 'reviewing' },
          { title: 'Approved', value: 'approved' },
          { title: 'Pending', value: 'pending' },
          { title: 'Responded', value: 'responded' },
          { title: 'Rejected', value: 'rejected' }
        ]
      },
      initialValue: 'new'
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: 'High', value: 'high' },
          { title: 'Medium', value: 'medium' },
          { title: 'Low', value: 'low' }
        ]
      },
      initialValue: 'medium'
    },
    {
      name: 'tags',
      title: 'Tags (comma separated)',
      type: 'text',
      description: 'Relevant tags for categorization'
    },
    {
      name: 'adminNotes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes for admin use'
    },
    {
      name: 'response',
      title: 'Admin Response',
      type: 'text',
      description: 'Response to send to user'
    },
    {
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      description: 'Browser/device information'
    },
    {
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      description: 'User IP address'
    },
    {
      name: 'pageUrl',
      title: 'Page URL',
      type: 'url',
      description: 'URL where feedback was submitted'
    },
    {
      name: 'sessionId',
      title: 'Session ID',
      type: 'string',
      description: 'User session identifier'
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'respondedAt',
      title: 'Responded At',
      type: 'datetime',
      description: 'When admin responded to this feedback'
    }
  ],
  preview: {
    select: {
      title: 'content',
      subtitle: 'type',
      description: 'status',
      priority: 'priority'
    },
    prepare(selection: any) {
      const { title, subtitle, description, priority } = selection
      
      const statusIcon = {
        'new': '🆕',
        'reviewing': '👀',
        'approved': '✅',
        'pending': '📝',
        'responded': '✔️',
        'rejected': '🗑️'
      }[description as string] || '📝'
      
      const priorityIcon = {
        'high': '🔴',
        'medium': '🟡',
        'low': '🟢'
      }[priority as string] || '🟡'
      
      const typeLabel = {
        'comment': 'Comment',
        'platform': 'Platform',
        'request': 'Request',
        'bug': 'Bug',
        'feature': 'Feature',
        'inquiry': 'Inquiry'
      }[subtitle as string] || 'Feedback'
      
      return {
        title: title ? title.substring(0, 60) + '...' : 'No content',
        subtitle: `${priorityIcon} ${typeLabel}`,
        description: `${statusIcon} ${description || 'new'}`,
        media: () => '💬'
      }
    }
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }]
    },
    {
      title: 'Priority (High to Low)',
      name: 'priorityDesc',
      by: [
        { field: 'priority', direction: 'desc' },
        { field: 'submittedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'submittedAt', direction: 'desc' }
      ]
    }
  ]
} 