'use client'

import { useState } from 'react'
import { Mail, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
      setEmail('')
    }, 1000)
  }

  return (
    <section id="newsletter" className="py-20 bg-burgundy-gradient relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 book-cover-pattern opacity-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="diamond-symbol mr-2 bg-cream-100"></div>
            <Mail className="w-8 h-8 text-cream-100 mx-4" />
            <div className="diamond-symbol ml-2 bg-cream-100"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-cream-100 mb-4 font-serif">
            Stay in the Loop
          </h2>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto">
            Get exclusive updates, new chapters, and insights delivered straight to your inbox. 
            Join our community of forward-thinking readers.
          </p>
        </div>

        {isSubmitted ? (
          <div className="max-w-md mx-auto p-6 bg-cream-100/20 backdrop-blur rounded-2xl border border-cream-100/30 shadow-book">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-silhouette-light rounded-full flex items-center justify-center shadow-book">
                <Check className="w-6 h-6 text-burgundy-900" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-cream-100 mb-2 font-serif">
              You're All Set!
            </h3>
            <p className="text-cream-200">
              Welcome to The Paradox Engine community. Check your email for a special welcome gift.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-burgundy-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-burgundy-300 focus:ring-2 focus:ring-cream-100 focus:border-transparent bg-cream-100 text-burgundy-900 placeholder-burgundy-600 shadow-book"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-cream-100 text-burgundy-700 font-semibold rounded-lg hover:bg-cream-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-book hover:shadow-book-hover"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            <p className="text-sm text-cream-300 mt-3">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-cream-100/10 backdrop-blur rounded-xl p-4 border border-cream-100/20">
            <div className="text-2xl font-bold text-cream-100 mb-1 font-serif">15,000+</div>
            <div className="text-cream-300">Active Subscribers</div>
          </div>
          <div className="bg-cream-100/10 backdrop-blur rounded-xl p-4 border border-cream-100/20">
            <div className="text-2xl font-bold text-cream-100 mb-1 font-serif">Weekly</div>
            <div className="text-cream-300">New Content</div>
          </div>
          <div className="bg-cream-100/10 backdrop-blur rounded-xl p-4 border border-cream-100/20">
            <div className="text-2xl font-bold text-cream-100 mb-1 font-serif">98%</div>
            <div className="text-cream-300">Satisfaction Rate</div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-cream-300 rounded-full"></div>
            <div className="diamond-symbol scale-25 bg-cream-300"></div>
            <div className="w-1 h-1 bg-cream-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
