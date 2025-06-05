import Hero from '@/components/Hero'
import Features from '@/components/Features'
import BookPreview from '@/components/BookPreview'
import SocialProof from '@/components/SocialProof'
import LeadMagnet from '@/components/LeadMagnet'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen bg-cream-50">
      <Header />
      <Hero />
      <BookPreview />
      <Features />
      <LeadMagnet />
      <SocialProof />
      <Newsletter />
      <Footer />
    </main>
  )
}
