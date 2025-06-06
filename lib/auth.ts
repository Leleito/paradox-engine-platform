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

// Admin users list
const ADMIN_EMAILS = [
  'thomas@paradox-engine.com',
  'admin@paradox-engine.com',
  'pe@laitigosystems.com',
  process.env.ADMIN_EMAIL || 'default@admin.com'
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

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'openid email profile',
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
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
    async signIn({ user, account }) {
      // Allow ALL Google OAuth users (subscribers + admins)
      if (account?.provider === 'google') {
        return true  // ✅ Allow all Google users for subscription platform
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = ADMIN_EMAILS.includes(user.email || '') ? 'admin' : 'user'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.role = token.role
        session.user.id = token.sub
      }
      return session
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev'
} 