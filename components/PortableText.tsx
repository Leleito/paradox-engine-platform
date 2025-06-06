import { PortableText as PortableTextReact } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface CalloutProps {
  type: 'info' | 'warning' | 'success' | 'exercise'
  content: string
}

function Callout({ type, content }: CalloutProps) {
  const typeStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    exercise: 'bg-purple-50 border-purple-200 text-purple-800'
  }

  const icons = {
    info: '💡',
    warning: '⚠️',
    success: '✅',
    exercise: '📝'
  }

  return (
    <div className={`border-l-4 p-4 my-6 rounded-r-lg ${typeStyles[type]}`}>
      <div className="flex items-start">
        <span className="text-2xl mr-3">{icons[type]}</span>
        <div className="flex-1">
          <p className="font-medium mb-1 capitalize">{type}</p>
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  )
}

function SanityImage({ value, isInline }: any) {
  const { alt = '', hotspot } = value

  return (
    <div className={`${isInline ? 'inline-block' : 'my-8'}`}>
      <Image
        src={urlFor(value).width(800).height(600).url()}
        alt={alt}
        width={800}
        height={600}
        className="rounded-lg shadow-lg"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
      {alt && (
        <p className="text-sm text-gray-600 text-center mt-2 italic">{alt}</p>
      )}
    </div>
  )
}

const components = {
  types: {
    image: SanityImage,
    callout: ({ value }: any) => (
      <Callout type={value.type} content={value.content} />
    )
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-600 hover:text-blue-800 underline transition-colors"
        >
          {children}
        </a>
      )
    }
  },
  block: {
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mb-6 text-gray-900">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-semibold mb-4 text-gray-900">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-semibold mb-3 text-gray-900">{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-6 my-6 italic text-gray-700 bg-gray-50 py-4 rounded-r-lg">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>
  }
}

interface PortableTextProps {
  value: any
  className?: string
}

export default function PortableText({ value, className = '' }: PortableTextProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableTextReact value={value} components={components} />
    </div>
  )
} 