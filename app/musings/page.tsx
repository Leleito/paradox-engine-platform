'use client'

import React from 'react';
import Link from 'next/link';

export default function MusingsPage() {
  const featuredPosts = [
    {
      id: 1,
      title: "The Abyss and the Apex: Navigating Rock Bottom and Cliff Top",
      excerpt: "Life is a relentless pendulum, swinging between extremes that test the soul. Discover how these moments of despair and excess become profound teachers.",
      category: "Philosophy",
      readTime: "15 min read",
      slug: "abyss-and-apex",
      featured: true
    },
    {
      id: 2,
      title: "The Soulmate You Can't Escape: Embracing Your Greatest Teachers",
      excerpt: "What if the person who triggers you most is your greatest teacher? Explore the paradox of difficult relationships and transformative growth.",
      category: "Relationships",
      readTime: "12 min read",
      slug: "soulmate-you-cant-escape",
      featured: true
    },
    {
      id: 3,
      title: "Dancing with the Divine: Faith and Fear in the Human Journey",
      excerpt: "A spiritual exploration of how faith can become fear, and how to find God in the mess of human contradiction and doubt.",
      category: "Spirituality",
      readTime: "18 min read",
      slug: "faith-and-fear",
      featured: true
    }
  ];

  const allPosts = [
    ...featuredPosts,
    {
      id: 4,
      title: "The Paradox of Love: When Your Love Language Becomes Toxic",
      excerpt: "How the ways we seek love can transform into traits that push others away, and the journey to wholeness through shadow work.",
      category: "Psychology",
      readTime: "14 min read",
      slug: "love-language-paradox",
      featured: false
    },
    {
      id: 5,
      title: "Dark Matter and Dark Energy: The Cosmic Oddballs We Can't See",
      excerpt: "A humorous dive into the universe's biggest mysteries—the invisible forces that shape everything yet remain tantalizingly out of reach.",
      category: "Science",
      readTime: "16 min read",
      slug: "dark-matter-energy",
      featured: false
    },
    {
      id: 6,
      title: "The Dance of Scripts and Surrender: Navigating Life's Duality",
      excerpt: "The tension between holding life scripts and listening to the universe—and how to dance between structure and flow.",
      category: "Philosophy",
      readTime: "13 min read",
      slug: "scripts-and-surrender",
      featured: false
    },
    {
      id: 7,
      title: "Cosmic Consciousness: Are We All Just Stardust Playing Peek-a-Boo?",
      excerpt: "Exploring the wild idea that everything in the universe shares a cosmic awareness—from your morning chai to distant galaxies.",
      category: "Consciousness",
      readTime: "17 min read",
      slug: "cosmic-consciousness",
      featured: false
    },
    {
      id: 8,
      title: "Unpacking Carl Jung's Shadow: The Hidden Side You Didn't Know You Had",
      excerpt: "Meet the part of your personality that's been hiding in the shadows—and why befriending it might be the key to wholeness.",
      category: "Psychology",
      readTime: "19 min read",
      slug: "jung-shadow-secular",
      featured: false
    },
    {
      id: 9,
      title: "The Steel Man's Secret: Building Bridges in the Absurd Dance of Debate",
      excerpt: "Why strengthening your opponent's argument before critiquing it might be the most powerful tool for truth-seeking and connection.",
      category: "Philosophy",
      readTime: "11 min read",
      slug: "steel-man-argument",
      featured: false
    },
    {
      id: 10,
      title: "The Paradox of Knowing: When Expertise Breeds Doubt",
      excerpt: "Why luminaries often doubt their life's work, and how the more you learn, the more you realize you don't know.",
      category: "Knowledge",
      readTime: "15 min read",
      slug: "paradox-of-knowing",
      featured: false
    },
    {
      id: 11,
      title: "The Paradox of Praise: Why Cheering Effort Beats Crowning Smarts",
      excerpt: "How praising children for being 'smart' can backfire, and why celebrating effort builds more resilient, curious minds.",
      category: "Psychology",
      readTime: "12 min read",
      slug: "paradox-of-praise",
      featured: false
    },
    {
      id: 12,
      title: "The Paradox of Fear: Leaning into the Storm to Find Freedom",
      excerpt: "Why the only way to shrink fear is to face it head-on, and how exposure transforms terror into routine, routine into freedom.",
      category: "Personal Growth",
      readTime: "14 min read",
      slug: "paradox-of-fear",
      featured: false
    },
    {
      id: 13,
      title: "The Great Ego Takedown: Surfing the Paradox of Pride",
      excerpt: "How pride protects yet paralyzes us, and practical steps to tame the ego for a more fulfilling, connected life.",
      category: "Personal Growth",
      readTime: "16 min read",
      slug: "ego-takedown",
      featured: false
    }
  ];

  const categories = [
    "All",
    "Philosophy", 
    "Psychology",
    "Spirituality",
    "Personal Growth",
    "Relationships",
    "Science",
    "Consciousness",
    "Knowledge"
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-palette-light py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 lg:px-8 mb-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-6xl font-bold font-display text-palette-deepest mb-6">
                Musings from the 
                <span className="logo-palette"> Paradox Engine</span>
              </h1>
              <p className="text-xl text-palette-dark max-w-3xl mx-auto">
                Exploring life's beautiful contradictions, absurd tensions, and transformative dualities. 
                These writings dive deep into the human experience—where growth happens in the gap between certainty and doubt.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-palette-dark text-palette-light'
                      : 'bg-palette-medium/20 text-palette-dark hover:bg-palette-medium/40'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Featured Posts */}
          {selectedCategory === "All" && (
            <section className="container mx-auto px-6 lg:px-8 mb-16">
              <h2 className="text-3xl font-bold font-display text-palette-deepest mb-8 text-center">
                Featured Explorations
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="card p-6 group hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="diamond-symbol bg-palette-warm scale-50"></div>
                      <span className="text-sm font-medium text-palette-warm">{post.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-palette-deepest mb-3 group-hover:text-palette-dark transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-palette-dark mb-4 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-palette-medium">{post.readTime}</span>
                      <Link 
                        href={`/musings/${post.slug}`}
                        className="text-palette-dark hover:text-palette-deepest font-medium text-sm transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* All Posts Grid */}
          <section className="container mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-display text-palette-deepest mb-8 text-center">
              {selectedCategory === "All" ? "All Musings" : `${selectedCategory} Articles`}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <article key={post.id} className={`card p-6 group hover:scale-105 transition-all duration-300 ${post.featured && selectedCategory === "All" ? 'opacity-50' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="diamond-symbol bg-palette-warm scale-25"></div>
                    <span className="text-sm font-medium text-palette-warm">{post.category}</span>
                    {post.featured && (
                      <span className="text-xs bg-palette-dark text-palette-light px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-palette-deepest mb-3 group-hover:text-palette-dark transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-palette-dark mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-palette-medium">{post.readTime}</span>
                    <Link 
                      href={`/musings/${post.slug}`}
                      className="text-palette-dark hover:text-palette-deepest font-medium text-sm transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="diamond-symbol bg-palette-medium scale-125 mx-auto mb-4"></div>
                <p className="text-palette-dark">No articles found in this category yet.</p>
              </div>
            )}
          </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 lg:px-8 mt-20">
        <div className="card p-8 text-center">
          <div className="flex justify-center gap-2 mb-4">
            <div className="diamond-symbol bg-palette-warm scale-75"></div>
            <div className="diamond-symbol bg-palette-medium scale-50"></div>
            <div className="diamond-symbol bg-palette-warm scale-75"></div>
          </div>
          <h3 className="text-2xl font-bold font-display text-palette-deepest mb-4">
            Ready to Dive Deeper?
          </h3>
          <p className="text-palette-dark mb-6 max-w-2xl mx-auto">
            These musings are previews of the full Paradox Engine experience. 
            Get access to complete articles, exercises, and tools to navigate life's beautiful contradictions.
          </p>
          <Link 
            href="/subscribe"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span>Explore The Paradox Engine</span>
            <div className="diamond-symbol bg-palette-light scale-25"></div>
          </Link>
        </div>
      </section>
    </div>
  );
} 