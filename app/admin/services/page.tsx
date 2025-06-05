'use client'

import { useState } from 'react'
import { 
  Globe, 
  Mail, 
  CreditCard, 
  MessageSquare, 
  Cloud, 
  Shield, 
  BarChart3,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Link,
  RefreshCw
} from 'lucide-react'

interface ServiceProvider {
  id: string
  name: string
  category: 'payment' | 'email' | 'sms' | 'storage' | 'analytics' | 'security' | 'other'
  status: 'connected' | 'disconnected' | 'error' | 'testing'
  description: string
  website: string
  region: string
  apiStatus: 'healthy' | 'degraded' | 'down'
  lastCheck: string
  config: {
    apiKey?: string
    endpoint?: string
    webhookUrl?: string
    [key: string]: any
  }
}

const mockServices: ServiceProvider[] = [
  {
    id: '1',
    name: 'M-Pesa (Safaricom)',
    category: 'payment',
    status: 'connected',
    description: 'Kenya\'s leading mobile money platform',
    website: 'https://developer.safaricom.co.ke',
    region: 'Kenya',
    apiStatus: 'healthy',
    lastCheck: '2 minutes ago',
    config: {
      apiKey: 'sk_live_****1234',
      endpoint: 'https://api.safaricom.co.ke/mpesa',
      webhookUrl: 'https://paradox-engine.com/webhooks/mpesa'
    }
  },
  {
    id: '2',
    name: 'SendGrid',
    category: 'email',
    status: 'connected',
    description: 'Email delivery service',
    website: 'https://sendgrid.com',
    region: 'Global',
    apiStatus: 'healthy',
    lastCheck: '5 minutes ago',
    config: {
      apiKey: 'SG.****5678',
      endpoint: 'https://api.sendgrid.com/v3'
    }
  },
  {
    id: '3',
    name: 'Africa\'s Talking',
    category: 'sms',
    status: 'testing',
    description: 'SMS and voice services for Africa',
    website: 'https://africastalking.com',
    region: 'Africa',
    apiStatus: 'healthy',
    lastCheck: '1 hour ago',
    config: {
      apiKey: 'at_****9012',
      endpoint: 'https://api.africastalking.com/version1'
    }
  },
  {
    id: '4',
    name: 'Cloudinary',
    category: 'storage',
    status: 'disconnected',
    description: 'Cloud-based image and video management',
    website: 'https://cloudinary.com',
    region: 'Global',
    apiStatus: 'down',
    lastCheck: '30 minutes ago',
    config: {}
  }
]

export default function ServiceProviders() {
  const [services, setServices] = useState<ServiceProvider[]>(mockServices)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceProvider | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const getCategoryIcon = (category: string) => {
    const icons = {
      payment: CreditCard,
      email: Mail,
      sms: MessageSquare,
      storage: Cloud,
      analytics: BarChart3,
      security: Shield,
      other: Globe
    }
    const Icon = icons[category as keyof typeof icons] || Globe
    return <Icon className="w-5 h-5" />
  }

  const getStatusColor = (status: string) => {
    const colors = {
      connected: 'bg-green-100 text-green-800',
      disconnected: 'bg-red-100 text-red-800',
      error: 'bg-red-100 text-red-800',
      testing: 'bg-yellow-100 text-yellow-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      connected: CheckCircle,
      disconnected: XCircle,
      error: XCircle,
      testing: AlertTriangle
    }
    const Icon = icons[status as keyof typeof icons] || AlertTriangle
    const colors = {
      connected: 'text-green-600',
      disconnected: 'text-red-600',
      error: 'text-red-600',
      testing: 'text-yellow-600'
    }
    const color = colors[status as keyof typeof colors] || 'text-gray-600'
    return <Icon className={`w-4 h-4 ${color}`} />
  }

  const getApiStatusColor = (status: string) => {
    const colors = {
      healthy: 'text-green-600',
      degraded: 'text-yellow-600',
      down: 'text-red-600'
    }
    return colors[status as keyof typeof colors] || 'text-gray-600'
  }

  const filteredServices = services.filter(service => 
    filterCategory === 'all' || service.category === filterCategory
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-palette-deepest">Service Providers</h1>
          <p className="text-palette-dark mt-2">Manage all external service integrations and APIs</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-palette-dark">Total Services</p>
              <p className="text-2xl font-bold text-palette-deepest">{services.length}</p>
            </div>
            <Globe className="w-8 h-8 text-palette-warm" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-palette-dark">Connected</p>
              <p className="text-2xl font-bold text-green-600">
                {services.filter(s => s.status === 'connected').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-palette-dark">Issues</p>
              <p className="text-2xl font-bold text-red-600">
                {services.filter(s => s.status === 'error' || s.status === 'disconnected').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-palette-dark">Testing</p>
              <p className="text-2xl font-bold text-yellow-600">
                {services.filter(s => s.status === 'testing').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-field"
            >
              <option value="all">All Categories</option>
              <option value="payment">Payment</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="storage">Storage</option>
              <option value="analytics">Analytics</option>
              <option value="security">Security</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <button className="btn-secondary flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh All
          </button>
        </div>
      </div>

      {/* Services List */}
      <div className="grid gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-palette-warm/10 rounded-lg">
                  {getCategoryIcon(service.category)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-palette-deepest">{service.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                  <p className="text-palette-dark mb-2">{service.description}</p>
                  <div className="flex items-center gap-4 text-sm text-palette-dark">
                    <span>Region: <strong>{service.region}</strong></span>
                    <span>Category: <strong className="capitalize">{service.category}</strong></span>
                    <a href={service.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-palette-warm hover:underline">
                      <Link className="w-3 h-3" />
                      Website
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedService(service)}
                  className="p-2 text-palette-dark hover:text-palette-warm transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 text-palette-dark hover:text-palette-warm transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-palette-dark hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-palette-medium">
              <div className="flex items-center gap-2">
                {getStatusIcon(service.status)}
                <span className="text-sm text-palette-dark">Connection Status</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${service.apiStatus === 'healthy' ? 'bg-green-500' : service.apiStatus === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm ${getApiStatusColor(service.apiStatus)}`}>
                  API {service.apiStatus}
                </span>
              </div>
              
              <div className="text-sm text-palette-dark">
                Last checked: {service.lastCheck}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Configuration Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-palette-deepest">Configure {selectedService.name}</h2>
              <button 
                onClick={() => setSelectedService(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuration Form */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-palette-deepest">Configuration</h3>
                
                <div>
                  <label className="block text-sm font-medium text-palette-dark mb-1">API Key</label>
                  <input 
                    type="password" 
                    value={selectedService.config.apiKey || ''} 
                    className="input-field"
                    placeholder="Enter API key"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-palette-dark mb-1">Endpoint URL</label>
                  <input 
                    type="url" 
                    value={selectedService.config.endpoint || ''} 
                    className="input-field"
                    placeholder="https://api.example.com"
                  />
                </div>
                
                {selectedService.config.webhookUrl && (
                  <div>
                    <label className="block text-sm font-medium text-palette-dark mb-1">Webhook URL</label>
                    <input 
                      type="url" 
                      value={selectedService.config.webhookUrl} 
                      className="input-field"
                      readOnly
                    />
                  </div>
                )}
                
                <div className="flex gap-3 pt-4">
                  <button className="btn-primary">Save Changes</button>
                  <button className="btn-secondary">Test Connection</button>
                </div>
              </div>
              
              {/* Service Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-palette-deepest">Service Information</h3>
                
                <div className="bg-palette-light/50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-palette-dark">Status</span>
                    <span className={`text-sm font-medium ${getStatusColor(selectedService.status).replace('bg-', 'text-').replace('-100', '-600')}`}>
                      {selectedService.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-palette-dark">API Health</span>
                    <span className={`text-sm font-medium ${getApiStatusColor(selectedService.apiStatus)}`}>
                      {selectedService.apiStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-palette-dark">Region</span>
                    <span className="text-sm text-palette-deepest">{selectedService.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-palette-dark">Last Check</span>
                    <span className="text-sm text-palette-deepest">{selectedService.lastCheck}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 