import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'The Paradox Engine - Transform Tension Into Triumph',
  description: 'Master the art of turning tension into triumph. Discover how Kenya\'s most successful entrepreneurs transform conflict into competitive advantage.',
  keywords: ['paradox', 'tension', 'triumph', 'business', 'kenya', 'entrepreneurs', 'thomas njeru'],
  authors: [{ name: 'Thomas Njeru' }],
  creator: 'Thomas Njeru',
  publisher: 'The Paradox Engine',
  robots: 'index, follow',
  openGraph: {
    title: 'The Paradox Engine - Transform Tension Into Triumph',
    description: 'Master the art of turning tension into triumph with Kenya\'s breakthrough business philosophy.',
    url: 'https://paradox-engine.com',
    siteName: 'The Paradox Engine',
    images: [
      {
        url: '/book-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'The Paradox Engine Book Cover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Paradox Engine - Transform Tension Into Triumph',
    description: 'Master the art of turning tension into triumph with Kenya\'s breakthrough business philosophy.',
    images: ['/book-cover.jpg'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-cream-50 relative">
        {/* Book spine background */}
        <div className="fixed inset-0 book-spine-bg opacity-5 pointer-events-none" />
        
        {/* Paper texture overlay */}
        <div className="fixed inset-0 bg-paper-texture pointer-events-none" />
        
        {/* Main content */}
        <div className="relative z-10">
          <Providers session={session}>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
