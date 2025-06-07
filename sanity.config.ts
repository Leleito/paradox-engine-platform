'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\app\Studio\[[...tool]]\page.tsx` route
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/admin-studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Paradox Engine Content')
          .items([
            // Primary Content Management
            S.listItem()
              .title('📚 Book Content')
              .child(
                S.documentTypeList('bookContent')
                  .title('Book Content')
                  .filter('_type == "bookContent"')
              ),
            
            S.divider(),
            
            // Articles Management
            S.listItem()
              .title('📝 Articles')
              .child(
                S.list()
                  .title('Article Management')
                  .items([
                    S.listItem()
                      .title('📄 All Articles')
                      .child(
                        S.documentTypeList('article')
                          .title('All Articles')
                          .filter('_type == "article"')
                          .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('👁️ Preview Only (Contents Tab)')
                      .child(
                        S.documentTypeList('article')
                          .title('Preview Articles')
                          .filter('_type == "article" && status == "preview"')
                      ),
                    S.listItem()
                      .title('✅ Published Articles')
                      .child(
                        S.documentTypeList('article')
                          .title('Published Articles')
                          .filter('_type == "article" && status == "published"')
                      ),
                    S.divider(),
                    S.listItem()
                      .title('🧠 Psychology & Self-Development')
                      .child(
                        S.documentTypeList('article')
                          .title('Psychology Articles')
                          .filter('_type == "article" && category == "psychology"')
                      ),
                    S.listItem()
                      .title('🤔 Philosophy & Paradox')
                      .child(
                        S.documentTypeList('article')
                          .title('Philosophy Articles')
                          .filter('_type == "article" && category == "philosophy"')
                      ),
                    S.listItem()
                      .title('🔬 Science & Consciousness')
                      .child(
                        S.documentTypeList('article')
                          .title('Science Articles')
                          .filter('_type == "article" && category == "science"')
                      ),
                    S.listItem()
                      .title('💝 Relationships & Love')
                      .child(
                        S.documentTypeList('article')
                          .title('Relationship Articles')
                          .filter('_type == "article" && category == "relationships"')
                      ),
                    S.listItem()
                      .title('💰 Economics & Politics')
                      .child(
                        S.documentTypeList('article')
                          .title('Economics Articles')
                          .filter('_type == "article" && category == "economics"')
                      ),
                    S.listItem()
                      .title('🙏 Spirituality & Faith')
                      .child(
                        S.documentTypeList('article')
                          .title('Spirituality Articles')
                          .filter('_type == "article" && category == "spirituality"')
                      ),
                    S.listItem()
                      .title('🌱 Personal Growth')
                      .child(
                        S.documentTypeList('article')
                          .title('Growth Articles')
                          .filter('_type == "article" && category == "growth"')
                      ),
                    S.listItem()
                      .title('⚡ Paradox Engine Framework')
                      .child(
                        S.documentTypeList('article')
                          .title('Framework Articles')
                          .filter('_type == "article" && category == "framework"')
                      ),
                  ])
              ),
            
            S.divider(),
            
            // Community Management
            S.listItem()
              .title('💬 Community Feedback')
              .child(
                S.list()
                  .title('Feedback Management')
                  .items([
                    S.listItem()
                      .title('🆕 New Feedback')
                      .child(
                        S.documentTypeList('feedback')
                          .title('New Feedback')
                          .filter('_type == "feedback" && status == "new"')
                          .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('📝 Needs Response')
                      .child(
                        S.documentTypeList('feedback')
                          .title('Pending Response')
                          .filter('_type == "feedback" && status == "pending"')
                      ),
                    S.listItem()
                      .title('🔴 High Priority')
                      .child(
                        S.documentTypeList('feedback')
                          .title('High Priority Feedback')
                          .filter('_type == "feedback" && priority == "high"')
                      ),
                    S.divider(),
                    S.listItem()
                      .title('💬 Comments')
                      .child(
                        S.documentTypeList('feedback')
                          .title('Article Comments')
                          .filter('_type == "feedback" && type == "comment"')
                      ),
                    S.listItem()
                      .title('🐛 Bug Reports')
                      .child(
                        S.documentTypeList('feedback')
                          .title('Bug Reports')
                          .filter('_type == "feedback" && type == "bug"')
                      ),
                    S.listItem()
                      .title('💡 Feature Requests')
                      .child(
                        S.documentTypeList('feedback')
                          .title('Feature Requests')
                          .filter('_type == "feedback" && type == "feature"')
                      ),
                    S.listItem()
                      .title('📋 All Feedback')
                      .child(
                        S.documentTypeList('feedback')
                          .title('All Feedback')
                          .filter('_type == "feedback"')
                          .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
                      ),
                  ])
              ),
            
            S.divider(),
            
            // Settings
            S.listItem()
              .title('⚙️ Book Settings')
              .child(
                S.document()
                  .schemaType('bookSettings')
                  .documentId('bookSettings')
                  .title('Book Settings')
              ),
            
            // User Analytics
            S.listItem()
              .title('📊 User Progress')
              .child(
                S.documentTypeList('userProgress')
                  .title('User Progress & Analytics')
                  .filter('_type == "userProgress"')
              ),

            S.divider(),

            // Legacy Content (if needed)
            ...S.documentTypeListItems().filter(
              listItem => !['bookContent', 'bookSettings', 'userProgress', 'article', 'feedback'].includes(listItem.getId()!)
            ),
          ])
    }),
    visionTool()
  ],
})
