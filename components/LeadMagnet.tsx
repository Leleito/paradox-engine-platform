'use client'

import { useState } from 'react'
import { Download, Gift, Check, X } from 'lucide-react'

export default function LeadMagnet() {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setShowModal(false)
      setIsSubmitted(false)
      setEmail('')
    }, 2000)
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-burgundy-50 to-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy-100 rounded-full mb-6">
              <Gift className="w-8 h-8 text-burgundy-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free Transformation Toolkit
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get instant access to our exclusive guide: "5 Paradox Principles That Will Change Your Life" 
              plus bonus worksheets and real-world case studies from Kenya's most successful leaders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What You'll Get:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>The 5 Core Paradox Principles</strong> - Transform how you see challenges forever
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Interactive Worksheets</strong> - Apply principles to your specific situation
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Kenyan Success Stories</strong> - Learn from local leaders who've mastered paradox
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Quick-Start Guide</strong> - Begin your transformation journey today
                  </span>
                </li>
              </ul>
            </div>

            <div className="card p-8 border-2 border-burgundy-200">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-burgundy-600 mb-2">
                  FREE
                </div>
                <div className="text-gray-500 line-through text-lg">
                  Normally KES 2,500
                </div>
              </div>
              
              <button 
                onClick={() => setShowModal(true)}
                className="w-full btn-primary text-lg py-4 mb-4"
              >
                <Download className="w-5 h-5 mr-2" />
                Get Your Free Toolkit
              </button>
              
              <p className="text-sm text-gray-500 text-center">
                No spam. Download starts immediately.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 text-lg">
              Join <span className="font-bold text-burgundy-600">12,000+</span> readers who've downloaded this toolkit
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Check Your Email!
                </h3>
                <p className="text-gray-600">
                  Your transformation toolkit is on its way. Look for an email from The Paradox Engine.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Get Your Free Toolkit
                  </h3>
                  <p className="text-gray-600">
                    Enter your email to download instantly
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="input-field w-full"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full mb-3">
                    Download Free Toolkit
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    By downloading, you agree to receive updates about The Paradox Engine. 
                    Unsubscribe anytime.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
} 