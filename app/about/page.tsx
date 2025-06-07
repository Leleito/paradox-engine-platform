import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'About the Author - Paradox Engine',
  description: 'Learn about the author behind Paradox Engine and their journey of transformation.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="book-page mb-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-1 bg-gold-500 mb-6" />
                <h1 className="text-book-title mb-6">
                  About the Author
                </h1>
                <p className="text-prose text-burgundy-700 mb-6">
                  A journey of transformation, wisdom, and the courage to question everything we think we know about life, growth, and human potential.
                </p>
                <div className="flex items-center gap-4 text-sm text-burgundy-600 font-serif">
                  <span>Co-founder & CEO of Pula</span>
                  <span>•</span>
                  <span>Former Deloitte Director</span>
                  <span>•</span>
                  <span>Author of "The Paradox Engine"</span>
                </div>
              </div>
              
              {/* Author Photo Placeholder */}
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-burgundy-800 to-burgundy-900 rounded-sm shadow-book overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-cream-50">
                      <div className="w-24 h-24 bg-gold-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-burgundy-900 text-3xl font-display">PE</span>
                      </div>
                      <p className="font-serif text-sm">Author Photo Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Author Story */}
          <div className="book-page mb-12">
            <h2 className="text-chapter mb-6">The Journey</h2>
            <div className="prose prose-burgundy max-w-none">
              <p className="text-prose text-burgundy-800 mb-6">
                Thomas Njeru is the Co-founder and CEO of Pula, an agricultural technology company 
                protecting over 16 million smallholder farmers across Africa and Asia through innovative 
                insurance solutions. A former Director at Deloitte, Thomas made a bold career transition 
                at 28 from the corporate consulting world to entrepreneurship.
              </p>
              
              <p className="text-prose text-burgundy-800 mb-6">
                Driven by his childhood connection to agriculture and a vision for meaningful impact, 
                Thomas uniquely combines technical expertise in actuarial science with deep understanding 
                of agricultural challenges. With 10+ years in the insurance industry, he co-founded Pula 
                with Rose Goslinga after raising $2 million in initial funding.
              </p>
              
              <p className="text-prose text-burgundy-800 mb-6">
                Under his leadership, Pula has become a leading agri-tech company, demonstrating how 
                calculated risk-taking and purpose-driven decisions can create transformative impact. 
                His journey embodies the principle that extraordinary outcomes emerge not from avoiding 
                life's contradictions, but from learning to harness them as fuel for transformation.
              </p>
              
              <p className="text-prose text-burgundy-800 mb-6">
                "The Paradox Engine" draws from Thomas's own experience wrestling with the paradox of 
                safety versus purpose, ultimately choosing to build something meaningful while managing 
                entrepreneurial risks. The framework helps individuals navigate life's contradictions 
                and turn tension into momentum for growth.
              </p>
            </div>
          </div>

          {/* Philosophy */}
          <div className="book-page mb-12">
            <h2 className="text-chapter mb-6">From Corporate Security to Entrepreneurial Impact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl text-burgundy-800 mb-4">The Deloitte Years</h3>
                <p className="text-prose text-burgundy-700 mb-6">
                  With a background in actuarial science and over 10 years in the insurance industry, 
                  Thomas built expertise in risk assessment, financial modeling, and corporate strategy. 
                  His time as a Director at Deloitte provided deep insights into how large systems operate 
                  and the power of data-driven decision making.
                </p>
                
                <h3 className="font-display text-xl text-burgundy-800 mb-4">The Agricultural Connection</h3>
                <p className="text-prose text-burgundy-700">
                  Growing up with a childhood connection to agriculture, Thomas understood the vulnerabilities 
                  faced by smallholder farmers. This personal understanding would later become the foundation 
                  for Pula's mission to protect millions of farmers across Africa and Asia.
                </p>
              </div>
              
              <div>
                <h3 className="font-display text-xl text-burgundy-800 mb-4">The Entrepreneurial Leap</h3>
                <p className="text-prose text-burgundy-700 mb-6">
                  At 28, Thomas faced the classic paradox: the security of corporate success versus the 
                  uncertainty of entrepreneurial purpose. Choosing to leave Deloitte's safety net, he 
                  co-founded Pula with Rose Goslinga after raising $2 million in initial funding.
                </p>
                
                <h3 className="font-display text-xl text-burgundy-800 mb-4">Calculated Risk-Taking</h3>
                <p className="text-prose text-burgundy-700">
                  Thomas embodies the principle of using expertise to manage uncertainty rather than 
                  avoid it. His actuarial background provides the tools to assess risk, while his 
                  entrepreneurial spirit drives him to take meaningful action despite uncertainty.
                </p>
              </div>
            </div>
          </div>

          {/* Areas of Expertise */}
          <div className="book-page mb-12">
            <h2 className="text-chapter mb-6">The Paradox Engine Framework</h2>
            <p className="text-prose text-burgundy-700 mb-8 text-center max-w-3xl mx-auto">
              Through his journey from corporate executive to social entrepreneur, Thomas discovered that life's greatest 
              breakthroughs happen at the intersection of four key domains. The Paradox Engine framework emerged from 
              his personal experience navigating these interconnected areas of human experience.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-burgundy-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold-400 text-xl">💰</span>
                </div>
                <h3 className="font-display text-burgundy-800 mb-2">Economics</h3>
                <p className="text-sm text-burgundy-600 font-serif">
                  Risk assessment, insurance modeling, and the economics of agricultural transformation
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-burgundy-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold-400 text-xl">⚖️</span>
                </div>
                <h3 className="font-display text-burgundy-800 mb-2">Politics</h3>
                <p className="text-sm text-burgundy-600 font-serif">
                  Systemic change, organizational power dynamics, and creating impact across institutions
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-burgundy-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold-400 text-xl">🧘</span>
                </div>
                <h3 className="font-display text-burgundy-800 mb-2">Spirituality</h3>
                <p className="text-sm text-burgundy-600 font-serif">
                  Purpose-driven decision making and the inner journey of entrepreneurial transformation
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-burgundy-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold-400 text-xl">❤️</span>
                </div>
                <h3 className="font-display text-burgundy-800 mb-2">Relationships</h3>
                <p className="text-sm text-burgundy-600 font-serif">
                  Co-founder dynamics, stakeholder management, and building meaningful connections at scale
                </p>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div className="book-page text-center">
            <h2 className="text-chapter mb-6">Continue the Journey</h2>
            <p className="text-prose text-burgundy-700 mb-8 max-w-2xl mx-auto">
              The Paradox Engine is more than a book—it's a framework for navigating life's tensions 
              and turning contradictions into creative force. Join thousands of entrepreneurs, leaders, 
              and change-makers who are learning to harness paradox for transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/lead-magnet" className="btn-book">
                Get the Framework Guide
              </a>
              <a href="/signup" className="btn-gold">
                Join Early Access
              </a>
            </div>
            
            <div className="mt-8 text-sm text-burgundy-600 font-serif">
              <p>Currently protecting 16+ million farmers through Pula • Author of "The Paradox Engine"</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
} 