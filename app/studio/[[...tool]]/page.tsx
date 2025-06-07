'use client'

/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { Suspense } from 'react'

// Loading component for Studio
function StudioLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Sanity Studio...</h2>
        <p className="text-gray-500">Setting up your content management environment</p>
      </div>
    </div>
  )
}

// Error component for Studio
function StudioError({ error }: { error: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Studio Configuration Error</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <div className="bg-gray-50 rounded-md p-3 text-left">
          <p className="text-sm text-gray-700 mb-2">To fix this:</p>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. Copy <code className="bg-gray-200 px-1 rounded">env.local.template</code> to <code className="bg-gray-200 px-1 rounded">.env.local</code></li>
            <li>2. Add your Sanity project credentials</li>
            <li>3. Restart the development server</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default function StudioPage() {
  // Check for required environment variables
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

  if (!projectId || projectId === 'your-sanity-project-id') {
    return <StudioError error="Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment variables" />
  }

  if (!dataset || dataset === 'production' && !projectId) {
    return <StudioError error="Missing NEXT_PUBLIC_SANITY_DATASET in environment variables" />
  }

  return (
    <Suspense fallback={<StudioLoading />}>
      <NextStudio config={config} />
    </Suspense>
  )
} 