import { Zap, Users, Book, Target, Globe, Smartphone } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Transform Tension',
    description: 'Learn to harness life\'s contradictions as fuel for growth rather than obstacles to overcome.',
  },
  {
    icon: Target,
    title: 'Practical Framework',
    description: 'The ADTRV system provides actionable steps you can implement immediately in your daily life.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Join thousands of readers discussing insights and supporting each other\'s transformation.',
  },
  {
    icon: Book,
    title: 'Serialized Content',
    description: 'New chapters released weekly, building anticipation and allowing deep reflection.',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'Real-world case studies from business leaders, activists, and everyday heroes.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Read anywhere, anytime with our responsive design and offline capabilities.',
  },
]

export default function Features() {
  return (
    <section className="py-20 layered-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="diamond-symbol mr-2"></div>
            <div className="diamond-symbol ml-2"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4 font-serif">
            Why Readers Choose The Paradox Engine
          </h2>
          <p className="text-xl text-burgundy-700 max-w-3xl mx-auto">
            More than just a book—it's a complete transformation system backed by real results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card p-6 text-center group hover:shadow-book-hover transition-all duration-300 book-cover-pattern">
              <div className="w-16 h-16 bg-silhouette-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-book">
                <feature.icon className="w-8 h-8 text-cream-100" />
              </div>
              <h3 className="text-xl font-semibold text-burgundy-900 mb-3 font-serif">
                {feature.title}
              </h3>
              <p className="text-burgundy-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-silhouette-light rounded-full"></div>
            <div className="w-3 h-3 bg-burgundy-700 rounded-full"></div>
            <div className="diamond-symbol scale-50"></div>
            <div className="w-3 h-3 bg-burgundy-700 rounded-full"></div>
            <div className="w-2 h-2 bg-silhouette-light rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
} 