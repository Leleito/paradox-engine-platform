'use client'

import React, { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { getTestimonials, type Testimonial } from '@/lib/sanity'

export default function SocialProof() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await getTestimonials(true) // Get featured testimonials
        setTestimonials(data)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        // Fallback testimonials if Sanity fetch fails
        setTestimonials([
          {
            _id: '1',
            content: "The Paradox Engine completely transformed how I approach challenges in my startup. Thomas's insights on turning tension into momentum are pure gold.",
            author: "Sarah Kimani",
            role: "Founder",
            company: "TechVentures Kenya",
            rating: 5,
            featured: true,
            order: 1
          },
          {
            _id: '2',
            content: "This isn't just another business book. It's a masterclass in understanding the hidden dynamics that drive success in African markets.",
            author: "Michael Ochieng",
            role: "CEO",
            company: "Innovate Africa",
            rating: 5,
            featured: true,
            order: 2
          },
          {
            _id: '3',
            content: "Every entrepreneur in Kenya needs to read this. The chapter on 'Creative Friction' alone is worth the entire book.",
            author: "Grace Wanjiru",
            role: "Managing Director",
            company: "Growth Partners EA",
            rating: 5,
            featured: true,
            order: 3
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const stats = [
    { value: "150+", label: "Early Readers" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "92%", label: "Would Recommend" },
    { value: "3hrs", label: "Avg. Reading Time" }
  ]

  if (isLoading) {
    return (
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-cream-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4 logo-palette">
            What Early Readers Are Saying
          </h2>
          <p className="text-lg text-palette-dark max-w-2xl mx-auto">
            Join the growing community of entrepreneurs who are already transforming their approach to business
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-palette-deepest mb-2">
                {stat.value}
              </div>
              <div className="text-palette-dark">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white p-6 rounded-lg shadow-palette">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-cream-400 fill-current" />
                ))}
              </div>
              <p className="text-palette-dark mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="border-t pt-4">
                <div className="font-semibold text-palette-deepest">
                  {testimonial.author}
                </div>
                <div className="text-sm text-palette-medium">
                  {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 