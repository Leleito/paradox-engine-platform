import { Star, User } from 'lucide-react'

const testimonials = [
  {
    content: "This book offers profound insights into navigating complexity in modern business. Thomas presents fresh perspectives on turning challenges into opportunities.",
    author: "Dr. Sarah Kimani",
    role: "Business Consultant",
    company: "Strategic Solutions Kenya",
    rating: 5
  },
  {
    content: "The framework for understanding paradoxes is brilliant. It's helping me approach leadership challenges with more nuance and effectiveness.",
    author: "Michael Ochieng",
    role: "Operations Director",
    company: "East Africa Holdings",
    rating: 5
  },
  {
    content: "A thoughtful exploration of tension and growth. The practical applications make complex concepts accessible and actionable.",
    author: "Priya Patel",
    role: "Development Manager",
    company: "Impact Ventures",
    rating: 5
  }
]

const stats = [
  { label: "Early Readers", value: "150+" },
  { label: "Pre-Launch Rating", value: "4.9/5" },
  { label: "Countries Interested", value: "12+" },
  { label: "Community Members", value: "75+" }
]

export default function SocialProof() {
  return (
    <section className="py-20 bg-burgundy-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="diamond-symbol mr-2 bg-cream-100"></div>
            <div className="diamond-symbol ml-2 bg-cream-100"></div>
          </div>
          <h2 className="text-2xl font-bold text-cream-100 mb-2 font-serif">
            Join the Global Community
          </h2>
          <p className="text-cream-200 mb-12">
            Readers worldwide are transforming their lives with The Paradox Engine
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-cream-100 mb-2 font-serif">
                  {stat.value}
                </div>
                <div className="text-cream-300 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-cream-100/95 backdrop-blur rounded-xl shadow-book hover:shadow-book-hover transition-all duration-300 p-6 book-cover-pattern">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-burgundy-600 fill-current" />
                ))}
              </div>
              <blockquote className="text-burgundy-800 mb-4 italic leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-silhouette-gradient rounded-full flex items-center justify-center mr-3 shadow-book">
                  <User className="w-5 h-5 text-cream-100" />
                </div>
                <div>
                  <div className="font-semibold text-burgundy-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-burgundy-700">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-cream-200 mb-4">
            Featured in leading publications and trusted by professionals across Africa
          </p>
          <div className="flex justify-center items-center space-x-8 text-cream-300">
            <span className="font-semibold">Business Today</span>
            <div className="diamond-symbol scale-25 bg-cream-300"></div>
            <span className="font-semibold">The Standard</span>
            <div className="diamond-symbol scale-25 bg-cream-300"></div>
            <span className="font-semibold">Nation Media</span>
            <div className="diamond-symbol scale-25 bg-cream-300"></div>
            <span className="font-semibold">Capital FM</span>
          </div>
        </div>
      </div>
    </section>
  )
} 