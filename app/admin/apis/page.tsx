'use client'

import { useState } from 'react'
import { 
  Plus, 
  Key, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2, 
  Shield, 
  Globe,
  Mail,
  CreditCard,
  Database,
  Cloud,
  Search,
  RefreshCw
} from 'lucide-react'

interface ApiConfig {
  id: string
  name: string
  provider: string
  type: 'payment' | 'email' | 'sms' | 'storage' | 'analytics' | 'auth' | 'other'
  apiKey: string
  endpoint: string
  status: 'active' | 'inactive' | 'testing'
  lastUsed: string
  description: string
}

const mockApis: ApiConfig[] = [
  {
    id: '1',
    name: 'M-Pesa Integration',
    provider: 'Safaricom',
    type: 'payment',
    apiKey: 'sk_test_...1234',
    endpoint: 'https://api.safaricom.co.ke/mpesa',
    status: 'active',
    lastUsed: '2 hours ago',
    description: 'M-Pesa payment gateway for Kenya'
  },
  {
    id: '2',
    name: 'SendGrid Email',
    provider: 'SendGrid',
    type: 'email',
    apiKey: 'SG.XXXX...5678',
    endpoint: 'https://api.sendgrid.com/v3',
    status: 'active',
    lastUsed: '1 hour ago',
    description: 'Email delivery service'
  },
  {
    id: '3',
    name: 'Africa\'s Talking SMS',
    provider: 'Africa\'s Talking',
    type: 'sms',
    apiKey: 'at_...9012',
    endpoint: 'https://api.africastalking.com/version1',
    status: 'testing',
    lastUsed: 'Never',
    description: 'SMS notifications for African markets'
  }
]

export default function ApiManagement() {
  const [apis, setApis] = useState<ApiConfig[]>(mockApis)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showApiKey, setShowApiKey] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')

  const getTypeIcon = (type: string) => {
    const icons = {
      payment: CreditCard,
      email: Mail,
      sms: Mail,
      storage: Cloud,
      analytics: Database,
      auth: Shield,
      other: Globe
    }
    const Icon = icons[type as keyof typeof icons] || Globe
    return <Icon className="w-4 h-4" />
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      testing: 'bg-yellow-100 text-yellow-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const filteredApis = apis.filter(api => {
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || api.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-palette-deepest">API Management</h1>
          <p className="text-palette-dark mt-2">Configure and manage all API integrations</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New API
        </button>
      </div>

      {/* Filters and Search */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-palette-dark w-4 h-4" />
              <input
                type="text"
                placeholder="Search APIs or providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input-field md:w-48"
          >
            <option value="all">All Types</option>
            <option value="payment">Payment</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="storage">Storage</option>
            <option value="analytics">Analytics</option>
            <option value="auth">Authentication</option>
            <option value="other">Other</option>
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* API List */}
      <div className="grid gap-4">
        {filteredApis.map((api) => (
          <div key={api.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-palette-warm/10 rounded-lg">
                  {getTypeIcon(api.type)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-palette-deepest">{api.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(api.status)}`}>
                      {api.status}
                    </span>
                  </div>
                  <p className="text-sm text-palette-dark">{api.description}</p>
                  <div className="flex items-center gap-4 text-sm text-palette-dark">
                    <span>Provider: <strong>{api.provider}</strong></span>
                    <span>Type: <strong className="capitalize">{api.type}</strong></span>
                    <span>Last used: <strong>{api.lastUsed}</strong></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-palette-dark hover:text-palette-warm transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-palette-dark hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* API Details */}
            <div className="mt-4 pt-4 border-t border-palette-medium space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-palette-dark">API Key</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type={showApiKey === api.id ? 'text' : 'password'}
                      value={api.apiKey}
                      readOnly
                      className="input-field flex-1 font-mono text-sm"
                    />
                    <button
                      onClick={() => setShowApiKey(showApiKey === api.id ? null : api.id)}
                      className="p-2 text-palette-dark hover:text-palette-warm transition-colors"
                    >
                      {showApiKey === api.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-palette-dark">Endpoint</label>
                  <input
                    type="text"
                    value={api.endpoint}
                    readOnly
                    className="input-field font-mono text-sm mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add API Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-palette-deepest mb-4">Add New API</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-palette-dark mb-1">API Name</label>
                  <input type="text" className="input-field" placeholder="e.g., Stripe Payment Gateway" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-palette-dark mb-1">Provider</label>
                  <input type="text" className="input-field" placeholder="e.g., Stripe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-palette-dark mb-1">API Type</label>
                <select className="input-field">
                  <option value="">Select type...</option>
                  <option value="payment">Payment Gateway</option>
                  <option value="email">Email Service</option>
                  <option value="sms">SMS Service</option>
                  <option value="storage">File Storage</option>
                  <option value="analytics">Analytics</option>
                  <option value="auth">Authentication</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-palette-dark mb-1">API Key</label>
                <input type="password" className="input-field" placeholder="Enter your API key" />
              </div>

              <div>
                <label className="block text-sm font-medium text-palette-dark mb-1">Endpoint URL</label>
                <input type="url" className="input-field" placeholder="https://api.example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-palette-dark mb-1">Description</label>
                <textarea 
                  className="input-field" 
                  rows={3}
                  placeholder="Brief description of this API integration"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add API
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 