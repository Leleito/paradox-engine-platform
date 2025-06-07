import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
  }
}

// Environment validation
const validateEnvironment = () => {
  const requiredEnvVars = {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }

  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      console.warn(`⚠️  Missing required environment variable: ${key}`)
    }
  }

  // Check Google OAuth configuration
  const hasGoogleCredentials = process.env.GOOGLE_CLIENT_ID && 
                               process.env.GOOGLE_CLIENT_SECRET &&
                               process.env.GOOGLE_CLIENT_ID !== 'development-client-id'

  return {
    hasGoogleCredentials,
    isProduction: process.env.NODE_ENV === 'production'
  }
}

// Admin users list
const ADMIN_EMAILS = [
  'thomas@paradox-engine.com',
  'admin@paradox-engine.com',
  'pe@laitigosystems.com',
  process.env.ADMIN_EMAIL || 'gleleito@gmail.com'
]

// Admin credentials for demo (replace with database)
const ADMIN_CREDENTIALS = [
  {
    email: 'admin@paradox-engine.com',
    password: 'admin123' // This should be hashed in production
  },
  {
    email: 'pe@laitigosystems.com',
    password: 'secure2025PE!' // Updated password for 2025
  }
]

// Validate environment on startup
const { hasGoogleCredentials } = validateEnvironment()

export const authOptions: NextAuthOptions = {
  providers: [
    // Only include Google provider if proper credentials are available
    ...(hasGoogleCredentials ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
            // Latest Google OAuth 2.0 parameters
            scope: 'openid email profile',
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
            include_granted_scopes: true
          }
        },
        // Handle profile mapping with latest structure
        profile(profile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            role: ADMIN_EMAILS.includes(profile.email) ? 'admin' : 'user'
          }
        }
      })
    ] : []),
    
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check credentials against admin list - replace with database lookup
        const adminUser = ADMIN_CREDENTIALS.find(
          admin => admin.email === credentials.email && admin.password === credentials.password
        )
        
        if (adminUser) {
          return {
            id: adminUser.email === 'pe@laitigosystems.com' ? '2' : '1',
            email: adminUser.email,
            name: adminUser.email === 'pe@laitigosystems.com' ? 'PE Admin' : 'Admin User',
            role: 'admin'
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Enhanced signin callback with better logging
      console.log('📝 Sign-in attempt:', {
        provider: account?.provider,
        email: user?.email,
        hasProfile: !!profile
      })

      // Allow ALL Google OAuth users (subscribers + admins)
      if (account?.provider === 'google') {
        // Additional validation for Google users
        if (!user?.email) {
          console.error('❌ Google sign-in failed: No email provided')
          return false
        }
        
        console.log('✅ Google sign-in successful:', user.email)
        return true
      }
      
      // Allow credential-based admin login
      if (account?.provider === 'credentials') {
        return true
      }
      
      return true
    },
    async jwt({ token, user, account }) {
      // Enhanced JWT callback with role assignment
      if (user) {
        token.role = ADMIN_EMAILS.includes(user.email || '') ? 'admin' : 'user'
        token.provider = account?.provider
        
        console.log('🎫 JWT created:', {
          email: user.email,
          role: token.role,
          provider: account?.provider
        })
      }
      return token
    },
    async session({ session, token }) {
      // Enhanced session callback
      if (session.user && token) {
        session.user.role = token.role
        session.user.id = token.sub
        
        // Add provider info for debugging
        if (process.env.NODE_ENV === 'development') {
          (session as any).provider = token.provider
        }
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Enhanced redirect handling for OAuth flow
      console.log('🔄 Redirect:', { url, baseUrl })
      
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url
      
      // Default redirect to dashboard
      return `${baseUrl}/dashboard`
    }
  },
  pages: {
    // Custom pages for better user experience
    signIn: '/signup',
    error: '/signup',
    signOut: '/'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Enhanced debugging for development
  debug: process.env.NODE_ENV === 'development'
}

// Export validation function for use in components
export { validateEnvironment } 