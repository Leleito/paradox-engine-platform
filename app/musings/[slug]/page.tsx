'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Clock, User, Calendar, ArrowLeft, Share2, BookOpen, Eye } from 'lucide-react'

// Sample blog posts data (in a real app, this would come from a CMS or database)
const blogPosts = [
  {
    slug: 'embracing-uncertainty-paradox',
    title: 'Embracing Uncertainty: The First Paradox',
    excerpt: 'Life\'s greatest breakthroughs often come from the spaces we fear most.',
    content: `
# Embracing Uncertainty: The First Paradox

*There's something beautiful about not knowing.*

I was standing in the queue at Java House last week, watching a businessman ahead of me frantically checking his phone every thirty seconds. His leg was bouncing, jaw clenched, clearly stressed about something beyond his control. Maybe a delayed meeting, maybe a client who hadn't responded to his email.

It got me thinking about our relationship with uncertainty.

## The Comfort of Discomfort

Here's what I've learned: **uncertainty isn't the enemy of success—it's the birthplace of possibility.**

We spend so much energy trying to control outcomes, predict futures, and eliminate variables. But what if the very thing we're running from is exactly what we need to embrace?

### Why We Fear the Unknown

Our brains are prediction machines. They're constantly trying to anticipate what comes next because, evolutionarily, this kept us alive. See a shadow? Could be a predator. Better safe than sorry.

But in today's world, this same mechanism that once protected us now imprisons us.

We avoid:
- Starting businesses because we can't guarantee success
- Having difficult conversations because we can't predict reactions  
- Pursuing dreams because we can't map out every step
- Being vulnerable because we can't control how others respond

## The Paradox Engine in Action

Here's where it gets interesting. The Paradox Engine teaches us that **certainty and uncertainty need each other.**

You can't have breakthrough without breakdown.
You can't discover new territories without leaving familiar ones.
You can't grow without releasing what you think you know.

### A Personal Example

Three years ago, I was working a corporate job that I'd outgrown. Safe, predictable, suffocating. I knew exactly what my next five years would look like—and that terrified me more than uncertainty ever could.

The day I resigned, I had no book deal, no speaking gigs, no clear plan. Just a notebook full of ideas and a conviction that discomfort was data pointing toward growth.

That uncertainty became the canvas for everything I've built since.

## Practical Tools for Uncertainty

**1. Reframe the narrative**
Instead of "I don't know what will happen" try "I get to discover what's possible."

**2. Take micro-steps**
You don't need to see the whole staircase. Just take the next step.

**3. Build uncertainty tolerance**
Like physical fitness, your comfort with discomfort can be trained. Start small.

**4. Find the certainty within uncertainty**
Focus on what you can control: your effort, your attitude, your response to whatever comes.

## The Liberation

When you stop demanding guarantees from life, something magical happens. You become available to opportunities you never could have planned for.

You start saying yes to conversations that lead nowhere you expected.
You experiment with ideas that have no guarantee of working.
You become interesting instead of just safe.

## Questions for Reflection

- What would you attempt if you knew you could handle whatever outcome emerged?
- Where are you demanding certainty that doesn't exist?
- What might become possible if you befriended uncertainty instead of fighting it?

*The businessman at Java House finally put his phone away. Maybe he realized what I was thinking about: sometimes the most productive thing you can do is stop trying to control everything.*

**The first paradox is this: the more comfortable you become with uncertainty, the more certain you become of your ability to navigate whatever comes.**

---

*This article is an excerpt from "The Paradox Engine" - a book about finding power in life's contradictions. Subscribe for early access to new chapters and insights.*
    `,
    author: 'Thomas Njeru',
    publishedAt: '2025-01-15',
    readTime: '6 min read',
    category: 'Mindset',
    tags: ['uncertainty', 'growth', 'mindset', 'paradox'],
    isPremium: false
  },
  {
    slug: 'tension-creative-force',
    title: 'When Tension Becomes Your Creative Force',
    excerpt: 'The same energy that creates stress can become your greatest source of innovation.',
    content: `
# When Tension Becomes Your Creative Force

*What if the thing you're trying to resolve is actually trying to create something?*

I used to think tension was a problem to solve. Like static on a radio—something interfering with the clear signal I was trying to receive.

Then I started paying closer attention.

## The Nature of Creative Tension

Watch any great musician. The tension in guitar strings creates the music. Too loose, and you get no sound. Too tight, and the strings snap. The magic happens in the perfect tension between these extremes.

Life works the same way.

### The Entrepreneurial Example

Consider the tension between **security and freedom**:

You want the safety of a steady job, but you also want the excitement of building something your own. Most people see this as an either/or choice. But what if it's a both/and opportunity?

This tension—properly channeled—becomes the energy for:
- Building side projects while maintaining income
- Creating multiple revenue streams
- Developing skills that increase both employability and entrepreneurial success

The tension doesn't get resolved. It gets *utilized*.

## Why We Miss the Gift

We're taught that tension equals discomfort, and discomfort equals "wrong direction." So we spend our lives trying to eliminate tension instead of learning to dance with it.

But here's what I've discovered: **tension is often information about what wants to emerge.**

### Personal Relationships

The tension between **independence and intimacy** in relationships isn't a problem—it's the creative force that builds healthy partnerships.

You need space to grow as an individual AND connection to grow together. The tension between these needs, when navigated skillfully, creates relationships that are both supportive and growth-oriented.

## The Paradox Engine Framework

Instead of asking "How do I resolve this tension?" ask "What is this tension trying to create?"

### The Three-Step Process:

**1. Name the opposing forces**
What exactly is pulling you in different directions?

**2. Find the wisdom in both sides**
What does each force want for you? What's the positive intention?

**3. Look for the third option**
How might both forces work together to create something neither could achieve alone?

## A Real-World Application

Let's say you're torn between **ambition and presence**:

- Ambition drives you toward future goals and achievements
- Presence calls you to appreciate what's already here

Instead of choosing sides:

**Name it:** "I want to achieve my goals AND enjoy the journey."

**Find the wisdom:** Ambition prevents complacency. Presence prevents burnout.

**Third option:** Use presence to fuel ambition. Let appreciation for current progress energize you for future goals. Let future vision add meaning to present moments.

The tension becomes rocket fuel instead of quicksand.

## The Creative Output

When you stop fighting tension and start collaborating with it, you access a different kind of creativity. You become:

- More innovative (because you're working with more variables)
- More resilient (because you're not dependent on one "right" way)
- More authentic (because you're not denying parts of yourself)
- More effective (because you're using all available energy)

## Your Tension Inventory

Take a moment to identify the major tensions in your life:

- Work/Life
- Independence/Connection  
- Security/Adventure
- Productivity/Rest
- Individual Success/Service to Others

Pick one. Instead of trying to resolve it, ask: "What might this tension be trying to create?"

## The Shift

The moment you stop seeing tension as a problem and start seeing it as creative material, everything changes.

You stop being a victim of your circumstances and become an artist of your experience.

You stop trying to eliminate the very forces that could propel you forward.

You start making music with the strings of your life instead of cutting them.

**The second paradox: the tension you're trying to escape might be the very force trying to create your next breakthrough.**

---

*Want to explore more paradoxes? Subscribe to get early access to "The Paradox Engine" and join a community of people learning to work with life's creative tensions.*
    `,
    author: 'Thomas Njeru',
    publishedAt: '2025-01-10',
    readTime: '5 min read',
    category: 'Creativity',
    tags: ['creativity', 'tension', 'innovation', 'paradox'],
    isPremium: true
  },
  {
    slug: 'success-failure-paradox',
    title: 'The Success-Failure Paradox',
    excerpt: 'Why your biggest failures might be your greatest successes in disguise.',
    content: `
# The Success-Failure Paradox

*Sometimes you have to lose the game to win the life.*

Last month, I had coffee with someone who'd just "failed" spectacularly. Their startup had crashed, their savings were depleted, and they were moving back in with their parents at 28.

But there was something unusual about how they talked about it. There was grief, yes, but also something else—a kind of clarity and aliveness I hadn't seen in them before.

"It's weird," they said. "This is the worst thing that's ever happened to me. And also maybe the best."

## The Traditional View

We're taught to see success and failure as opposites:
- Success = good, failure = bad
- Success = progress, failure = setback  
- Success = gain, failure = loss

But what if this binary thinking is limiting our ability to extract value from our experiences?

## Redefining the Game

Here's what I'm learning: **the game we think we're playing might not be the game we need to win.**

My friend thought they were playing the "build a successful startup" game. But life was inviting them to play a different game: "discover who you are when everything external falls away."

Guess which game has higher stakes? Guess which victory matters more in the long run?

### The Hidden Curriculum

Every apparent failure teaches a curriculum that success never could:

**Resilience:** You discover what you're actually made of when comfort is removed.

**Clarity:** When options are stripped away, you see what truly matters.

**Authenticity:** Pretense becomes unsustainable when resources are scarce.

**Innovation:** Constraints force creative solutions that abundance never would.

**Empathy:** Walking through difficulty creates capacity to hold space for others' struggles.

## The Paradox in Action

Consider these examples:

**The entrepreneur** whose business failed learned skills that made them invaluable to other companies. Their "failure" became their competitive advantage.

**The writer** whose novel got rejected 47 times developed resilience and craft that served them through a successful 20-year career.

**The athlete** whose injury ended their professional dreams discovered a passion for coaching that fulfilled them more than competing ever did.

In each case, the apparent failure was actually success in a larger game they didn't know they were playing.

## The Timing Question

Sometimes what looks like failure is actually **success arriving ahead of schedule**.

You get fired from a job that was slowly killing your spirit. Failure or success?

A relationship ends before you waste more years in the wrong partnership. Failure or success?

A project doesn't work out, freeing you up for an opportunity that's much better aligned. Failure or success?

The answer depends on your time horizon and definition of winning.

## Practical Applications

**1. Expand your success metrics**
Instead of just measuring external outcomes, track:
- What you're learning
- How you're growing
- What you're discovering about yourself
- The skills you're developing
- The resilience you're building

**2. Practice "failure debriefs"**
When something doesn't go as planned, ask:
- What did this teach me?
- What skills did I develop?
- What assumptions got challenged?
- What opportunities did this create?
- How am I stronger/wiser/clearer now?

**3. Look for the larger game**
When facing apparent failure, ask:
- What if this is success in a different game?
- What game might life be inviting me to play?
- How might this apparent setback be a setup for something better?

## The Meta-Success

Here's the ultimate paradox: **when you become someone who can find success within failure, you become almost impossible to truly defeat.**

Every experience becomes useful. Every outcome teaches something valuable. Every apparent ending becomes a beginning you couldn't have planned.

You stop being at the mercy of external circumstances and start being in partnership with the wisdom of your life.

## My Friend's Update

Six months later, my friend landed a role at a company whose mission they're passionate about. They're making more money than their startup ever generated, working with people they respect, and using skills they developed during their "failure."

But more importantly, they've become someone who knows they can handle whatever comes. That's not a consolation prize—that's the ultimate victory.

**The paradox: sometimes you have to fail at what you thought you wanted to succeed at what you actually need.**

---

*These insights are part of "The Paradox Engine"—a framework for finding power in life's contradictions. Get early access to new chapters and join our community of paradox navigators.*
    `,
    author: 'Thomas Njeru',
    publishedAt: '2025-01-05',
    readTime: '7 min read',
    category: 'Success',
    tags: ['success', 'failure', 'growth', 'mindset'],
    isPremium: true
  }
]

export default function BlogPost() {
  const params = useParams()
  const slug = params?.slug as string
  const [isShareOpen, setIsShareOpen] = useState(false)

  // Find the blog post
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-palette-deepest mb-4">Article Not Found</h1>
            <p className="text-palette-dark mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Link href="/musings" className="btn-primary">
              ← Back to Musings
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `${post.title} by ${post.author}`

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: shareText,
        url: shareUrl,
      })
    } else {
      navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              href="/musings"
              className="inline-flex items-center text-palette-warm hover:text-palette-deepest transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Musings
            </Link>
          </div>

          {/* Article Header */}
          <article className="card p-8 mb-8">
            {/* Premium Badge */}
            {post.isPremium && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-burgundy-600 to-burgundy-700 text-white px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Eye className="w-4 h-4" />
                Premium Content
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-palette-deepest mb-4 font-serif">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-palette-dark mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-palette-dark">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {post.category}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-cream-100 text-palette-dark px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share Button */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-palette-medium">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-palette-warm hover:text-palette-deepest transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share Article
              </button>
            </div>

            {/* Content */}
            {post.isPremium ? (
              // Premium content - show preview
              <div>
                <div className="prose prose-lg max-w-none text-palette-dark">
                  <div dangerouslySetInnerHTML={{ 
                    __html: post.content.split('\n').slice(0, 15).join('\n') 
                  }} />
                </div>
                
                {/* Premium Gate */}
                <div className="mt-8 p-8 bg-gradient-to-r from-burgundy-50 to-cream-100 rounded-xl border border-burgundy-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-burgundy-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-palette-deepest mb-3">
                      Continue Reading with Premium
                    </h3>
                    <p className="text-palette-dark mb-6 max-w-lg mx-auto">
                      This article contains premium insights available to subscribers. 
                      Get unlimited access to all content, exercises, and community features.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="/subscribe" className="btn-primary">
                        Subscribe for KES 299/month
                      </Link>
                      <Link href="/subscribe" className="btn-secondary">
                        View All Plans
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Free content - show full article
              <div className="prose prose-lg max-w-none text-palette-dark">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            )}
          </article>

          {/* Related Articles CTA */}
          <div className="card p-8 text-center">
            <h3 className="text-2xl font-bold text-palette-deepest mb-4 font-serif">
              Explore More Paradoxes
            </h3>
            <p className="text-palette-dark mb-6">
              This article is part of "The Paradox Engine" - a complete framework for 
              transforming life's tensions into breakthrough moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/musings" className="btn-secondary">
                More Articles
              </Link>
              <Link href="/subscribe" className="btn-primary">
                Get Full Access
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 