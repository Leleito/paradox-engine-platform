'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Settings, 
  Key, 
  Users, 
  BarChart3, 
  Shield, 
  Database,
  Globe,
  Mail,
  CreditCard,
  FileText,
  Home
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'API Management', href: '/admin/apis', icon: Key },
  { name: 'Service Providers', href: '/admin/services', icon: Globe },
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Email Services', href: '/admin/email', icon: Mail },
  { name: 'Payment Providers', href: '/admin/payments', icon: CreditCard },
  { name: 'Content Management', href: '/admin/content', icon: FileText },
  { name: 'Security', href: '/admin/security', icon: Shield },
  { name: 'Database', href: '/admin/database', icon: Database },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-palette-deepest text-palette-light shadow-lg overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="diamond-symbol bg-palette-warm scale-75"></div>
          <h2 className="text-lg font-bold">Admin Portal</h2>
        </div>
        
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-palette-warm text-palette-deepest font-semibold' 
                    : 'text-palette-light hover:bg-palette-dark hover:text-palette-warm'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      
      {/* Quick Stats */}
      <div className="p-6 border-t border-palette-dark">
        <h3 className="text-sm font-semibold text-palette-medium mb-4">Quick Stats</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-palette-medium">Active APIs</span>
            <span className="text-palette-warm font-semibold">4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-palette-medium">Services</span>
            <span className="text-palette-warm font-semibold">3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-palette-medium">Users</span>
            <span className="text-palette-warm font-semibold">156</span>
          </div>
          <div className="flex justify-between">
            <span className="text-palette-medium">Revenue</span>
            <span className="text-palette-warm font-semibold">KES 12.5K</span>
          </div>
        </div>
      </div>
    </div>
  )
} 