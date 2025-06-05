import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Check, Star, Users, Zap, Crown, Gift } from 'lucide-react'

const plans = [
  {
    name: 'Free Preview',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'First 3 chapters',
      'Basic reading interface',
      'Community access',
      'Weekly newsletter',
      'Mobile responsive',
    ],
    cta: 'Start Reading Free',
    popular: false,
  },
  {
    name: 'Premium Reader',
    price: 299,
    period: 'month',
    description: 'Full access to transform your life',
    features: [
      'Complete book access',
      'New chapters weekly',
      'Advanced reading tools',
      'Exclusive author insights',
      'Download for offline',
      'Progress tracking',
      'Discussion groups',
      'Email support',
    ],
    cta: 'Start Premium',
    popular: true,
  },
  {
    name: 'VIP Member',
    price: 799,
    period: 'month',
    description: 'Ultimate transformation experience',
    features: [
      'Everything in Premium',
      'Monthly live Q&A with author',
      'Physical book shipped',
      'Exclusive workshops',
      'Direct author messaging',
      'Early access to new books',
      'VIP community access',
      'Phone support',
    ],
    cta: 'Go VIP',
    popular: false,
  },
]

const faqs = [
  {
    question: 'How does the subscription work?',
    answer: 'You get immediate access to all available content and new chapters are released weekly. You can cancel anytime with no commitment.',
  },
  {
    question: 'Can I download chapters for offline reading?',
    answer: 'Yes! Premium and VIP subscribers can download chapters as PDFs for offline reading on any device.',
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: 'Absolutely. We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your subscription.',
  },
  {
    question: 'How do I access the community features?',
    answer: 'All subscribers get access to our private discussion groups where you can connect with other readers and share insights.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept M-Pesa, Visa, Mastercard, and other major credit cards. All payments are processed securely.',
  },
]

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Transformation Journey
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join thousands of readers who are already turning tension into momentum. 
              Start with our free preview or unlock the complete experience.
            </p>
            
            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-burgundy-600" />
                <span>150+ early readers</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-cream-400 fill-current" />
                <span>4.9/5 pre-launch rating</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-burgundy-600" />
                <span>Coming soon</span>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative card p-8 ${
                  plan.popular 
                    ? 'border-2 border-burgundy-500 shadow-xl scale-105' 
                    : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-burgundy-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Crown className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      KES {plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>

                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-burgundy-600 hover:bg-burgundy-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}>
                    {plan.cta}
                  </button>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Special Offer */}
          <div className="bg-gradient-to-r from-burgundy-600 to-burgundy-700 rounded-2xl p-8 text-center text-white mb-16">
            <div className="flex items-center justify-center mb-4">
              <Gift className="w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold">Limited Time Offer</h3>
            </div>
            <p className="text-xl mb-6 text-burgundy-100">
              Get 2 months free when you subscribe to our annual Premium plan
            </p>
            <button className="bg-cream-400 hover:bg-cream-300 text-burgundy-900 font-bold py-3 px-8 rounded-lg transition-colors">
              Claim This Deal
            </button>
            <p className="text-sm text-burgundy-200 mt-4">
              Offer valid until June 30th, 2025
            </p>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Tension Into Momentum?
            </h3>
            <p className="text-gray-600 mb-8">
              Join thousands of readers who are already living with purpose and clarity.
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Start Your Journey Today
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 