'use client'

import { useState } from 'react'
import { X, Download, Mail, CheckCircle, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface LeadMagnetModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  email: string
  firstName: string
}

export default function LeadMagnetModal({ isOpen, onClose }: LeadMagnetModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would integrate with your email service
    console.log('Form submitted:', data)
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-burgundy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-burgundy-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Your Free Toolkit
                </h3>
                <p className="text-gray-600">
                  Join 150+ early readers exploring the power of paradox
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                {[
                  'Complete Paradox Engine Starter Guide (PDF)',
                  'First 3 chapters of the book',
                  'Practical exercises and worksheets',
                  'Weekly insights delivered to your inbox'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    {...register('firstName', { required: 'First name is required' })}
                    type="text"
                    placeholder="First Name"
                    className="input-field"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    placeholder="Email Address"
                    className="input-field"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Mail className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? 'Sending...' : 'Send Me The Free Toolkit'}
                </button>
              </form>

              {/* Security Note */}
              <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                <Lock className="w-3 h-3 mr-1" />
                <span>Your information is secure and will never be shared</span>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Check Your Email!
              </h3>
              <p className="text-gray-600 mb-6">
                We've sent your free Paradox Engine Starter Guide to your inbox. 
                Check your email (and spam folder) for the download link.
              </p>
              <button
                onClick={onClose}
                className="btn-primary"
              >
                Got It!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
