'use client'

import { useState } from 'react'
import { X, Bell, Star } from 'lucide-react'

interface BannerProps {
  type?: 'announcement' | 'promotion' | 'update' | 'alert'
  title: string
  message: string
  ctaText?: string
  ctaUrl?: string
  onClose?: () => void
  closeable?: boolean
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

export default function Banner({
  type = 'announcement',
  title = 'New Chapter Available!',
  message = 'Chapter 15: "The Resolution Paradox" is now live for subscribers.',
  ctaText = 'Read Now',
  ctaUrl = '/subscribe',
  onClose,
  closeable = true,
  variant = 'primary'
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  if (!isVisible) return null

  const variantClasses = {
    primary: 'bg-burgundy-600 text-white border-burgundy-700',
    secondary: 'bg-gray-100 text-gray-900 border-gray-300',
    success: 'bg-green-600 text-white border-green-700',
    warning: 'bg-yellow-500 text-white border-yellow-600',
    error: 'bg-red-600 text-white border-red-700'
  }

  const iconMap = {
    announcement: Bell,
    promotion: Star,
    update: Bell,
    alert: Bell
  }

  const Icon = iconMap[type]

  return (
    <div className={`relative border-b-2 ${variantClasses[variant]} py-4 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium">{title}</h3>
              <p className="text-sm opacity-90">{message}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {ctaText && ctaUrl && (
              <a
                href={ctaUrl}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-white/20 hover:bg-white/30 transition-colors"
              >
                {ctaText}
              </a>
            )}
            {closeable && (
              <button
                onClick={handleClose}
                className="p-1 rounded-md hover:bg-white/20 transition-colors"
                aria-label="Close banner"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Hero Banner Variant (Full-screen replacement)
export function HeroBanner({
  title = 'The Paradox Engine',
  subtitle = 'Transform tension into triumph with weekly insights',
  backgroundImage,
  ctaText = 'Subscribe Now',
  ctaUrl = '/subscribe',
  secondaryCtaText = 'Read Preview',
  secondaryCtaUrl = '#preview'
}: {
  title?: string
  subtitle?: string
  backgroundImage?: string
  ctaText?: string
  ctaUrl?: string
  secondaryCtaText?: string
  secondaryCtaUrl?: string
}) {
  return (
    <section 
      className="relative min-h-screen flex items-center py-20 overflow-hidden"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {/* Background overlay if image is used */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/50"></div>
      )}
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="diamond-symbol bg-palette-warm scale-75"></div>
            <h1 className={`text-4xl lg:text-6xl font-bold font-display ${process.env.NEXT_PUBLIC_LOGO_FONT || 'font-serif'} ${backgroundImage ? 'text-white' : 'logo-palette'}`}>
              {title}
            </h1>
            <div className="diamond-symbol bg-palette-warm scale-75"></div>
          </div>
          
          <p className={`text-lg lg:text-xl mb-8 font-medium max-w-3xl mx-auto ${backgroundImage ? 'text-gray-200' : 'text-palette-dark'}`}>
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={ctaUrl} className="btn-primary text-lg px-8 py-4">
              {ctaText}
            </a>
            <a href={secondaryCtaUrl} className="btn-secondary text-lg px-8 py-4">
              {secondaryCtaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 