'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function AdminError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.'
      case 'AccessDenied':
        return 'You do not have permission to sign in.'
      case 'Verification':
        return 'The verification token has expired or has already been used.'
      case 'OAuthSignin':
        return 'Error in constructing an authorization URL.'
      case 'OAuthCallback':
        return 'Error in handling the response from an OAuth provider.'
      case 'OAuthCreateAccount':
        return 'Could not create OAuth account in the database.'
      case 'EmailCreateAccount':
        return 'Could not create email account in the database.'
      case 'Callback':
        return 'Error in the OAuth callback handler route.'
      case 'OAuthAccountNotLinked':
        return 'Another account with the same e-mail address exists.'
      case 'EmailSignin':
        return 'The e-mail could not be sent.'
      case 'CredentialsSignin':
        return 'Sign in was not successful. Check that the details you provided are correct.'
      case 'SessionRequired':
        return 'Please sign in to access this page.'
      default:
        return 'An unexpected error occurred during authentication.'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-palette-light via-palette-medium/20 to-palette-warm/20 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-palette-deepest mb-4">
          Authentication Error
        </h1>
        
        <p className="text-palette-dark mb-8">
          {getErrorMessage(error)}
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/admin/login"
            className="inline-flex items-center gap-2 btn-primary"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Link>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-palette-dark hover:text-palette-deepest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>
        </div>
        
        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              Error code: <code className="font-mono">{error}</code>
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 