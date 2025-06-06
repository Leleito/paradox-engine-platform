import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Terms of Service - The Paradox Engine',
  description: 'Terms of Service for The Paradox Engine book subscription platform by Thomas Njeru.',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-palette-deepest mb-4 font-serif">
              Terms of Service
            </h1>
            <p className="text-lg text-palette-dark">
              Last updated: January 2025
            </p>
          </div>

          <div className="card p-6 mb-8">
            <h2 className="text-lg font-semibold text-palette-deepest mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <a href="#acceptance" className="text-palette-warm hover:underline">Acceptance of Terms</a>
              <a href="#description" className="text-palette-warm hover:underline">Service Description</a>
              <a href="#accounts" className="text-palette-warm hover:underline">User Accounts</a>
              <a href="#subscription" className="text-palette-warm hover:underline">Subscription Terms</a>
              <a href="#content" className="text-palette-warm hover:underline">Content Usage</a>
              <a href="#payment" className="text-palette-warm hover:underline">Payment Terms</a>
              <a href="#cancellation" className="text-palette-warm hover:underline">Cancellation</a>
              <a href="#prohibited" className="text-palette-warm hover:underline">Prohibited Uses</a>
              <a href="#intellectual-property" className="text-palette-warm hover:underline">Intellectual Property</a>
              <a href="#disclaimers" className="text-palette-warm hover:underline">Disclaimers</a>
              <a href="#limitation" className="text-palette-warm hover:underline">Limitation of Liability</a>
              <a href="#termination" className="text-palette-warm hover:underline">Termination</a>
              <a href="#changes" className="text-palette-warm hover:underline">Changes to Terms</a>
              <a href="#contact" className="text-palette-warm hover:underline">Contact Information</a>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Acceptance of Terms */}
            <section id="acceptance" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">1. Acceptance of Terms</h2>
              <p className="text-palette-dark mb-4">
                Welcome to The Paradox Engine platform ("Service"), operated by Thomas Njeru ("we," "us," or "our"). 
                By accessing or using our Service, you agree to be bound by these Terms of Service ("Terms").
              </p>
              <p className="text-palette-dark">
                If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </section>

            {/* Service Description */}
            <section id="description" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">2. Service Description</h2>
              <p className="text-palette-dark mb-4">
                The Paradox Engine is a subscription-based platform providing access to:
              </p>
              <ul className="list-disc list-inside text-palette-dark space-y-2 mb-4">
                <li>Serialized book content released weekly</li>
                <li>Author insights and commentary</li>
                <li>Community discussion features</li>
                <li>Reading tools and progress tracking</li>
                <li>Downloadable content for offline reading</li>
                <li>Email updates and newsletters</li>
              </ul>
              <p className="text-palette-dark">
                We reserve the right to modify or discontinue the Service at any time with reasonable notice.
              </p>
            </section>

            {/* User Accounts */}
            <section id="accounts" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">3. User Accounts</h2>
              <p className="text-palette-dark mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. 
                You are responsible for safeguarding your account and all activities that occur under your account.
              </p>
              <p className="text-palette-dark mb-4">
                You must immediately notify us of any unauthorized use of your account or any other breach of security.
              </p>
              <p className="text-palette-dark">
                We will not be liable for any loss or damage arising from your failure to comply with this section.
              </p>
            </section>

            {/* Subscription Terms */}
            <section id="subscription" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">4. Subscription Terms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-palette-deepest mb-3">Subscription Plans</h3>
                  <ul className="list-disc list-inside space-y-2 text-palette-dark">
                    <li><strong>Free Preview:</strong> Access to first 3 chapters</li>
                    <li><strong>Premium (KES 299/month):</strong> Complete book access</li>
                    <li><strong>VIP (KES 799/month):</strong> Premium + exclusive features</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-palette-deepest mb-3">Billing Terms</h3>
                  <ul className="list-disc list-inside space-y-2 text-palette-dark">
                    <li>Subscriptions are billed monthly or annually</li>
                    <li>Auto-renewal unless cancelled</li>
                    <li>Pro-rated refunds for early cancellation</li>
                    <li>Price changes with 30-day notice</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Content Usage */}
            <section id="content" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">5. Content Usage Rights</h2>
              <p className="text-palette-dark mb-4">
                Your subscription grants you a personal, non-transferable, non-exclusive license to access and read the content.
              </p>
              <div className="bg-cream-100 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-palette-deepest mb-2">You MAY:</h3>
                <ul className="list-disc list-inside space-y-1 text-palette-dark">
                  <li>Read content for personal use</li>
                  <li>Download for offline reading (Premium+)</li>
                  <li>Share brief excerpts for discussion</li>
                  <li>Print chapters for personal use</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">You MAY NOT:</h3>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  <li>Share login credentials with others</li>
                  <li>Redistribute or resell content</li>
                  <li>Create derivative works</li>
                  <li>Use content for commercial purposes</li>
                </ul>
              </div>
            </section>

            {/* Payment Terms */}
            <section id="payment" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">6. Payment Terms</h2>
              <p className="text-palette-dark mb-4">
                We accept payments via M-Pesa, Visa, Mastercard, and other major payment methods. All charges are in Kenyan Shillings (KES).
              </p>
              <ul className="list-disc list-inside text-palette-dark space-y-2 mb-4">
                <li>Payment is required before access to premium content</li>
                <li>Failed payments may result in service suspension</li>
                <li>Taxes may apply based on your location</li>
                <li>All sales are final unless otherwise stated</li>
              </ul>
              <p className="text-palette-dark">
                We use secure third-party payment processors and do not store your payment information.
              </p>
            </section>

            {/* Cancellation */}
            <section id="cancellation" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">7. Cancellation and Refunds</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-palette-deepest mb-3">Cancellation Policy</h3>
                  <ul className="list-disc list-inside space-y-2 text-palette-dark">
                    <li>Cancel anytime through your account</li>
                    <li>Access continues until end of billing period</li>
                    <li>No partial refunds for unused time</li>
                    <li>Immediate cancellation option available</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-palette-deepest mb-3">Refund Policy</h3>
                  <ul className="list-disc list-inside space-y-2 text-palette-dark">
                    <li>30-day money-back guarantee for new subscribers</li>
                    <li>Refunds processed within 5-10 business days</li>
                    <li>Refunds issued to original payment method</li>
                    <li>Contact support for refund requests</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Prohibited Uses */}
            <section id="prohibited" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">8. Prohibited Uses</h2>
              <p className="text-palette-dark mb-4">You may not use our Service:</p>
              <ul className="list-disc list-inside text-palette-dark space-y-2">
                <li>For any unlawful purpose or to solicit unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations or laws</li>
                <li>To infringe upon or violate our intellectual property rights or others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To collect or track personal information of others</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section id="intellectual-property" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">9. Intellectual Property Rights</h2>
              <p className="text-palette-dark mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Thomas Njeru and its licensors.
              </p>
              <p className="text-palette-dark mb-4">
                The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used without our prior written consent.
              </p>
              <p className="text-palette-dark">
                "The Paradox Engine" and related marks are trademarks of Thomas Njeru.
              </p>
            </section>

            {/* Disclaimers */}
            <section id="disclaimers" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">10. Disclaimers</h2>
              <p className="text-palette-dark mb-4">
                The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
              </p>
              <ul className="list-disc list-inside text-palette-dark space-y-2">
                <li>Excludes all representations and warranties relating to this Service and its contents</li>
                <li>Excludes all liability for damages arising out of or in connection with your use of this Service</li>
                <li>Does not guarantee the accuracy, completeness, or timeliness of content</li>
                <li>Cannot ensure continuous, uninterrupted, or secure access to our services</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section id="limitation" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">11. Limitation of Liability</h2>
              <p className="text-palette-dark mb-4">
                In no event shall Thomas Njeru or The Paradox Engine be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>
              <p className="text-palette-dark">
                Our total liability to you for all damages shall not exceed the amount paid by you for the Service during the twelve (12) months prior to the action giving rise to liability.
              </p>
            </section>

            {/* Termination */}
            <section id="termination" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">12. Termination</h2>
              <p className="text-palette-dark mb-4">
                We may terminate or suspend your account immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
              <p className="text-palette-dark">
                Upon termination, your right to use the Service will cease immediately. You may delete your account at any time.
              </p>
            </section>

            {/* Changes to Terms */}
            <section id="changes" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">13. Changes to Terms</h2>
              <p className="text-palette-dark mb-4">
                We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms on this page.
              </p>
              <p className="text-palette-dark">
                Changes are effective immediately after they are posted. Your continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section id="contact" className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-palette-deepest mb-4">14. Contact Information</h2>
              <p className="text-palette-dark mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-cream-100 p-4 rounded-lg">
                <p><strong>Email:</strong> <a href="mailto:legal@paradox-engine.com" className="text-palette-warm hover:underline">legal@paradox-engine.com</a></p>
                <p><strong>Support:</strong> <a href="mailto:hello@paradox-engine.com" className="text-palette-warm hover:underline">hello@paradox-engine.com</a></p>
                <p><strong>Address:</strong> Nairobi, Kenya</p>
                <p><strong>Phone:</strong> <a href="tel:+254700000000" className="text-palette-warm hover:underline">+254 700 000 000</a></p>
              </div>
            </section>
          </div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-palette-warm hover:text-palette-deepest transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 