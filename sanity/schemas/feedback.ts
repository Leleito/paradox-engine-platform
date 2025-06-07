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
      rows: 4,
      validation: (Rule: any) => Rule.required().min(10).max(2000)
    },
    {
      name: 'relatedArticle',
      title: 'Related Article',
      type: 'reference',
      to: [{ type: 'article' }, { type: 'bookContent' }],
      description: 'Link to article if this is a comment'
    },
    {
      name: 'userInfo',
      title: 'User Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule: any) => Rule.required().email()
        },
        {
          name: 'userId',
          title: 'User ID',
          type: 'string',
          description: 'System user ID if authenticated'
        }
      ]
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [
          { title: '⭐ 1 Star', value: 1 },
          { title: '⭐⭐ 2 Stars', value: 2 },
          { title: '⭐⭐⭐ 3 Stars', value: 3 },
          { title: '⭐⭐⭐⭐ 4 Stars', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5 Stars', value: 5 }
        ]
      },
      description: 'Optional rating for content or platform'
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '🆕 New', value: 'new' },
          { title: '👀 Under Review', value: 'reviewing' },
          { title: '✅ Approved', value: 'approved' },
          { title: '📝 Needs Response', value: 'pending' },
          { title: '✔️ Responded', value: 'responded' },
          { title: '🗑️ Spam/Rejected', value: 'rejected' }
        ]
      },
      initialValue: 'new'
    },
    {
      name: 'adminResponse',
      title: 'Admin Response',
      type: 'object',
      fields: [
        {
          name: 'message',
          title: 'Response Message',
          type: 'text',
          rows: 3
        },
        {
          name: 'respondedBy',
          title: 'Responded By',
          type: 'string'
        },
        {
          name: 'respondedAt',
          title: 'Response Date',
          type: 'datetime'
        }
      ]
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: '🔴 High', value: 'high' },
          { title: '🟡 Medium', value: 'medium' },
          { title: '🟢 Low', value: 'low' }
        ]
      },
      initialValue: 'medium'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Tags for categorizing feedback'
    },
    {
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        {
          name: 'userAgent',
          title: 'User Agent',
          type: 'string'
        },
        {
          name: 'ipAddress',
          title: 'IP Address',
          type: 'string'
        },
        {
          name: 'pageUrl',
          title: 'Page URL',
          type: 'string'
        },
        {
          name: 'sessionId',
          title: 'Session ID',
          type: 'string'
        }
      ]
    },
    {
      name: 'submittedAt',
      title: 'Submitted Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isPublic',
      title: 'Display Publicly',
      type: 'boolean',
      description: 'Show this feedback/comment publicly on the platform',
      initialValue: false
    }
  ],
  preview: {
    select: {
      type: 'type',
      content: 'content',
      name: 'userInfo.name',
      status: 'status',
      priority: 'priority',
      submittedAt: 'submittedAt'
    },
    prepare(selection: any) {
      const { type, content, name, status, priority, submittedAt } = selection
      
      const statusIcon = {
        'new': '🆕',
        'reviewing': '👀',
        'approved': '✅',
        'pending': '📝',
        'responded': '✔️',
        'rejected': '🗑️'
      }[status as string] || '📝'
      
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
      }[type as string] || 'Feedback'
      
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : ''
      const preview = content ? content.substring(0, 60) + '...' : ''
      
      return {
        title: `${statusIcon} ${typeLabel} from ${name || 'Anonymous'}`,
        subtitle: `${priorityIcon} ${date} • ${preview}`,
        media: statusIcon
      }
    }
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }]
    },
    {
      title: 'Priority',
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