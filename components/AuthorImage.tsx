'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AuthorImageProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showName?: boolean
  showTitle?: boolean
  showDescription?: boolean
  className?: string
  animate?: boolean
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-20 h-20', 
  lg: 'w-32 h-32',
  xl: 'w-40 h-40'
}

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base', 
  xl: 'text-lg'
}

export default function AuthorImage({ 
  size = 'md', 
  showName = false, 
  showTitle = false, 
  showDescription = false,
  className = '',
  animate = true
}: AuthorImageProps) {
  const MotionDiv = animate ? motion.div : 'div'
  const animationProps = animate ? {
    whileHover: { scale: 1.1 },
    transition: { duration: 0.3 }
  } : {}

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <MotionDiv 
        className={`${sizeClasses[size]} rounded-full overflow-hidden shadow-xl border-4 border-gold-500/30 mb-3`}
        {...animationProps}
      >
        <div className="w-full h-full bg-gradient-to-br from-burgundy-800 to-burgundy-900 flex items-center justify-center">
          {/* Placeholder - replace with actual photo when available */}
          <div className="w-full h-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
            <span className={`text-white font-display ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-4xl'}`}>
              TN
            </span>
          </div>
          {/* When you have the actual photo, replace the div above with:
          <Image
            src="/images/thomas-njeru.jpg"
            alt="Thomas Njeru"
            fill
            className="object-cover"
          />
          */}
        </div>
      </MotionDiv>
      
      {(showName || showTitle || showDescription) && (
        <div className="text-center">
          {showName && (
            <h4 className={`text-burgundy-800 font-display ${textSizeClasses[size]} mb-1`}>
              Thomas Njeru
            </h4>
          )}
          
          {showTitle && (
            <p className={`text-burgundy-700 font-serif ${size === 'sm' ? 'text-xs' : 'text-sm'} mb-1`}>
              Co-founder & CEO of Pula
            </p>
          )}
          
          {showDescription && (
            <div className={`text-burgundy-600 font-serif ${size === 'sm' ? 'text-xs' : 'text-xs'} space-y-1`}>
              <p>Former Deloitte Director • Author of "The Paradox Engine"</p>
              {size !== 'sm' && (
                <p className="text-gold-600">
                  Protecting 16+ million farmers across Africa & Asia
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
} 