import Hero from '@/components/Hero'
import Banner, { HeroBanner } from '@/components/Banner'
import Features from '@/components/Features'
import BookPreview from '@/components/BookPreview'
import SocialProof from '@/components/SocialProof'
import LeadMagnet from '@/components/LeadMagnet'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function Home() {
  // Configuration flags for easy switching
  const SHOW_BANNER = process.env.NEXT_PUBLIC_SHOW_BANNER === 'true'
  const USE_HERO_BANNER = process.env.NEXT_PUBLIC_USE_HERO_BANNER === 'true'
  
  return (
    <main className="min-h-screen bg-cream-50">
      <Header />
      
      {/* Optional banner at top */}
      {SHOW_BANNER && (
        <Banner
          type="announcement"
          title="New Chapter Released!"
          message="Chapter 15: 'The Resolution Paradox' is now available for subscribers."
          ctaText="Read Now"
          ctaUrl="/subscribe"
          variant="primary"
        />
      )}
      
      {/* Configurable Hero Section */}
      {USE_HERO_BANNER ? (
        <HeroBanner
          title="The Paradox Engine"
          subtitle="Master the art of turning tension into triumph. Discover how Kenya's most successful entrepreneurs transform conflict into competitive advantage."
        />
      ) : (
        <Hero />
      )}
      
      <BookPreview />
      <Features />
      <LeadMagnet />
      <SocialProof />
      <Newsletter />
      <Footer />
    </main>
  )
}
