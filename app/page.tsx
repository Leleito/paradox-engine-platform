import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Subscribe from '@/components/Subscribe'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Subscribe />
      <Footer />
    </main>
  )
}
