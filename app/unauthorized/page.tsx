import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-palette-light via-palette-medium/20 to-palette-warm/20 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Shield className="w-12 h-12 text-palette-warm" />
        </div>
        
        <h1 className="text-3xl font-bold text-palette-deepest mb-4">
          Access Denied
        </h1>
        
        <p className="text-palette-dark mb-8 max-w-md">
          You don't have the necessary permissions to access this area. 
          Admin privileges are required.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 btn-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>
          
          <div className="text-sm text-palette-dark">
            Need admin access? Contact{' '}
            <a 
              href="mailto:admin@paradox-engine.com" 
              className="text-palette-warm hover:underline"
            >
              admin@paradox-engine.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 