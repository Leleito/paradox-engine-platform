import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity configuration
export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // Use current date
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
  token: process.env.SANITY_API_TOKEN, // Only for write operations
}

// Create Sanity client
export const client = createClient(config)

// Create client for write operations (admin/studio)
export const writeClient = createClient({
  ...config,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Image URL builder
const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

// GROQ queries for content
export const queries = {
  // Get all published chapters
  chapters: `*[_type == "chapter" && published == true] | order(orderNumber asc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    orderNumber,
    readTime,
    isUnlocked,
    isPremium,
    publishedAt,
    coverImage,
    tags,
    keyTakeaways
  }`,

  // Get single chapter by slug
  chapterBySlug: `*[_type == "chapter" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    orderNumber,
    readTime,
    isUnlocked,
    isPremium,
    publishedAt,
    coverImage,
    tags,
    "nextChapter": *[_type == "chapter" && orderNumber == ^.orderNumber + 1][0] {
      title,
      slug
    },
    "prevChapter": *[_type == "chapter" && orderNumber == ^.orderNumber - 1][0] {
      title,
      slug
    }
  }`,

  // Get all published blog posts
  blogPosts: `*[_type == "blogPost" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    coverImage,
    category,
    tags,
    readTime,
    isPremium,
    featured,
    author-> {
      name,
      image,
      bio
    }
  }`,

  // Get single blog post by slug
  blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    coverImage,
    category,
    tags,
    readTime,
    isPremium,
    featured,
    author-> {
      name,
      image,
      bio
    },
    "relatedPosts": *[_type == "blogPost" && published == true && _id != ^._id && category == ^.category][0...3] {
      title,
      slug,
      excerpt,
      coverImage,
      publishedAt
    }
  }`,

  // Get featured blog posts
  featuredPosts: `*[_type == "blogPost" && published == true && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    category,
    readTime
  }`,

  // Get blog categories
  blogCategories: `*[_type == "blogCategory"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    "postCount": count(*[_type == "blogPost" && published == true && category._ref == ^._id])
  }`,

  // Get site settings
  siteSettings: `*[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    logo,
    favicon,
    socialMedia,
    seo {
      metaTitle,
      metaDescription,
      shareImage
    }
  }`,

  // Get author
  author: `*[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    bio,
    image,
    socialMedia,
    "posts": *[_type == "blogPost" && published == true && author._ref == ^._id] | order(publishedAt desc) {
      title,
      slug,
      excerpt,
      publishedAt,
      coverImage,
      category
    }
  }`
}

// Fetch functions
export async function getChapters() {
  return await client.fetch(queries.chapters)
}

export async function getChapter(slug: string) {
  return await client.fetch(queries.chapterBySlug, { slug })
}

export async function getBlogPosts() {
  return await client.fetch(queries.blogPosts)
}

export async function getBlogPost(slug: string) {
  return await client.fetch(queries.blogPostBySlug, { slug })
}

export async function getFeaturedPosts() {
  return await client.fetch(queries.featuredPosts)
}

export async function getBlogCategories() {
  return await client.fetch(queries.blogCategories)
}

export async function getSiteSettings() {
  return await client.fetch(queries.siteSettings)
}

export async function getAuthor(slug: string) {
  return await client.fetch(queries.author, { slug })
}

// Type definitions
export interface Chapter {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content: any // Portable Text
  orderNumber: number
  readTime: number
  isUnlocked: boolean
  isPremium: boolean
  publishedAt: string
  coverImage?: any
  tags?: string[]
  keyTakeaways?: string[]
  nextChapter?: { title: string; slug: { current: string } }
  prevChapter?: { title: string; slug: { current: string } }
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content: any // Portable Text
  publishedAt: string
  coverImage?: any
  category: { name: string; slug: { current: string } }
  tags?: string[]
  readTime: number
  isPremium: boolean
  featured: boolean
  author: {
    name: string
    image?: any
    bio?: string
  }
  relatedPosts?: BlogPost[]
}

export interface BlogCategory {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  postCount: number
}

export interface Author {
  _id: string
  name: string
  slug: { current: string }
  bio?: string
  image?: any
  socialMedia?: {
    twitter?: string
    linkedin?: string
    website?: string
  }
  posts: BlogPost[]
}

export interface SiteSettings {
  _id: string
  title: string
  description: string
  logo?: any
  favicon?: any
  socialMedia?: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    shareImage?: any
  }
}

// Testimonial interfaces
export interface Testimonial {
  _id: string
  author: string
  role: string
  company?: string
  content: string
  rating: number
  featured: boolean
  order: number
}

// Subscription Plan interfaces
export interface SubscriptionPlan {
  _id: string
  name: string
  slug: { current: string }
  price: number
  period: 'forever' | 'month' | 'year'
  description: string
  features: string[]
  ctaText: string
  popular: boolean
  order: number
  active: boolean
}

// CTA interfaces
export interface CTA {
  _id: string
  title: string
  slug: { current: string }
  location: string
  heading: string
  subheading?: string
  primaryButton: {
    text: string
    url: string
    style: 'primary' | 'secondary' | 'accent'
  }
  secondaryButton?: {
    text: string
    url: string
    style: 'primary' | 'secondary' | 'accent'
  }
  active: boolean
}

// Testimonial queries
export async function getTestimonials(featured?: boolean): Promise<Testimonial[]> {
  const query = featured 
    ? `*[_type == "testimonial" && featured == true && !(_id in path("drafts.**"))] | order(order asc)`
    : `*[_type == "testimonial" && !(_id in path("drafts.**"))] | order(order asc)`
  
  return client.fetch(query)
}

// Subscription Plan queries
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const query = `*[_type == "subscriptionPlan" && active == true && !(_id in path("drafts.**"))] | order(order asc)`
  return client.fetch(query)
}

// CTA queries
export async function getCTAByLocation(location: string): Promise<CTA | null> {
  const query = `*[_type == "cta" && location == $location && active == true && !(_id in path("drafts.**"))][0]`
  return client.fetch(query, { location })
}

export async function getAllCTAs(): Promise<CTA[]> {
  const query = `*[_type == "cta" && active == true && !(_id in path("drafts.**"))]`
  return client.fetch(query)
} 