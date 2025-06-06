'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBlogPosts, getBlogCategories, getFeaturedPosts, type BlogPost, type BlogCategory } from '@/lib/sanity';

export default function MusingsPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsData, featuredData, categoriesData] = await Promise.all([
          getBlogPosts(),
          getFeaturedPosts(),
          getBlogCategories()
        ]);
        
        setAllPosts(postsData);
        setFeaturedPosts(featuredData);
        
        const allCategory: BlogCategory = { 
          _id: 'all', 
          name: 'All', 
          slug: { current: 'all' }, 
          postCount: postsData.length 
        };
        setCategories([allCategory, ...categoriesData]);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredPosts = selectedCategory === "All" 
    ? allPosts 
    : allPosts.filter(post => post.category?.name === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-palette-light py-20">
        <section className="container mx-auto px-6 lg:px-8 mb-16">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded mb-6"></div>
              <div className="h-6 bg-gray-200 rounded max-w-3xl mx-auto"></div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

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
              key={category._id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.name
                  ? 'bg-palette-dark text-palette-light'
                  : 'bg-palette-medium/20 text-palette-dark hover:bg-palette-medium/40'
              }`}
            >
              {category.name} {category.name !== 'All' && `(${category.postCount})`}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && featuredPosts.length > 0 && (
        <section className="container mx-auto px-6 lg:px-8 mb-16">
          <h2 className="text-3xl font-bold font-display text-palette-deepest mb-8 text-center">
            Featured Explorations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article key={post._id} className="card p-6 group hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="diamond-symbol bg-palette-warm scale-50"></div>
                  <span className="text-sm font-medium text-palette-warm">
                    {post.category?.name || 'Uncategorized'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-palette-deepest mb-3 group-hover:text-palette-dark transition-colors">
                  {post.title}
                </h3>
                <p className="text-palette-dark mb-4 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-palette-medium">{post.readTime} min read</span>
                  <Link 
                    href={`/musings/${post.slug.current}`}
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
        
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article key={post._id} className={`card p-6 group hover:scale-105 transition-all duration-300 ${post.featured && selectedCategory === "All" ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="diamond-symbol bg-palette-warm scale-25"></div>
                  <span className="text-sm font-medium text-palette-warm">
                    {post.category?.name || 'Uncategorized'}
                  </span>
                  {post.featured && (
                    <span className="text-xs bg-palette-dark text-palette-light px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  {post.isPremium && (
                    <span className="text-xs bg-gold-500 text-white px-2 py-1 rounded-full">
                      Premium
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
                  <div className="flex items-center gap-2 text-xs text-palette-medium">
                    <span>{post.readTime} min read</span>
                    {post.author && (
                      <>
                        <span>•</span>
                        <span>by {post.author.name}</span>
                      </>
                    )}
                  </div>
                  <Link 
                    href={`/musings/${post.slug.current}`}
                    className="text-palette-dark hover:text-palette-deepest font-medium text-sm transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="diamond-symbol bg-palette-medium scale-125 mx-auto mb-4"></div>
            <p className="text-palette-dark">No articles found in this category yet.</p>
            <p className="text-palette-medium text-sm mt-2">
              Content will be available once published in Sanity Studio.
            </p>
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