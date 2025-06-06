import { type SchemaTypeDefinition } from 'sanity'

import chapter from '../schemas/chapter'
import blogPost from '../schemas/blogPost'
import author from '../schemas/author'
import blogCategory from '../schemas/blogCategory'
import siteSettings from '../schemas/siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Content
    chapter,
    blogPost,
    author,
    blogCategory,
    // Settings
    siteSettings,
  ],
} 