import DynamicHero from '@/components/DynamicHero'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <DynamicHero />
      <Footer />
    </main>
  )
}
