import { type SchemaTypeDefinition } from 'sanity'

// Legacy schemas
import chapter from '../schemas/chapter'
import blogPost from '../schemas/blogPost'
import author from '../schemas/author'
import blogCategory from '../schemas/blogCategory'
import siteSettings from '../schemas/siteSettings'

// New Paradox Engine schemas
import { bookContent } from '../schemas/bookContent'
import { bookSettings } from '../schemas/bookSettings'
import { userProgress } from '../schemas/userProgress'

// Article and feedback schemas
import article from '../schemas/article'
import feedback from '../schemas/feedback'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Paradox Engine Content Management
    bookContent,
    bookSettings,
    userProgress,
    
    // Articles and Community
    article,
    feedback,
    
    // Legacy Content (keep for backward compatibility)
    chapter,
    blogPost,
    author,
    blogCategory,
    siteSettings,
  ],
} 