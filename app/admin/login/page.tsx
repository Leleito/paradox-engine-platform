'use client'

import { useState } from 'react'
import { signIn, getSession, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LogIn, Mail, Key, Shield } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const { data: session } = useSession()

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid credentials. Please try again.')
      } else {
        // Check session and redirect
        const session = await getSession()
        if (session?.user?.role === 'admin') {
          router.push('/admin')
        } else {
          setError('Access denied. Admin privileges required.')
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await signIn('google', {
        callbackUrl: '/admin'
      })
      
      if (result?.error) {
        setError('Google sign-in failed. Please try again.')
        setLoading(false)
      }
    } catch (error) {
      setError('An error occurred during Google sign-in.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-palette-light via-palette-medium/20 to-palette-warm/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="diamond-symbol bg-palette-warm scale-125"></div>
            <h1 className="text-2xl font-bold text-palette-deepest">Paradox Engine</h1>
          </div>
          <p className="text-palette-dark">Admin Portal Access</p>
        </div>

        {/* Login Card */}
        <div className="card p-8">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-palette-warm" />
            <h2 className="text-xl font-bold text-palette-deepest">Secure Login</h2>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Google Login */}
          {session ? (
            <button
              onClick={() => signOut()}
              className="w-full flex items-center justify-center gap-3 p-3 border border-palette-medium rounded-lg hover:bg-palette-light/50 transition-colors mb-6 disabled:opacity-50"
            >
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 p-3 border border-palette-medium rounded-lg hover:bg-palette-light/50 transition-colors mb-6 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          )}

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-palette-medium"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-palette-dark">Or sign in with credentials</span>
            </div>
          </div>

          {/* Credentials Login */}
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-palette-dark mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-palette-dark w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="admin@paradox-engine.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-palette-dark mb-1">Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-palette-dark w-4 h-4" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-palette-light/50 rounded-lg border border-palette-medium">
            <p className="text-sm text-palette-dark font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-palette-dark">Email: admin@paradox-engine.com</p>
            <p className="text-xs text-palette-dark">Password: admin123</p>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <a 
            href="/" 
            className="text-sm text-palette-dark hover:text-palette-warm transition-colors"
          >
            ← Back to main site
          </a>
        </div>
      </div>
    </div>
  )
} 