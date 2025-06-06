import Header from '@/components/Header'
import Subscribe from '@/components/Subscribe'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Join Early Access - Personal Evolution',
  description: 'Be among the first to receive exclusive weekly insights on personal transformation.',
}

export default function SubscribePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <Subscribe />
      </div>
      <Footer />
    </main>
  )
} 