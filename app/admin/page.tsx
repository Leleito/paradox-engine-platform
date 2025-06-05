import { 
  Users, 
  Key, 
  Globe, 
  BarChart3, 
  TrendingUp, 
  DollarSign,
  Shield,
  AlertTriangle
} from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-palette-deepest">Admin Dashboard</h1>
          <p className="text-palette-dark mt-2">Welcome to the Paradox Engine control center</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="diamond-symbol bg-palette-warm scale-125"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-palette-dark">Total Users</p>
              <p className="text-3xl font-bold text-palette-deepest">156</p>
              <p className="text-sm text-green-600">+8% this week</p>
            </div>
            <div className="p-3 bg-palette-warm/10 rounded-lg">
              <Users className="w-6 h-6 text-palette-warm" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-palette-dark">Active APIs</p>
              <p className="text-3xl font-bold text-palette-deepest">12</p>
              <p className="text-sm text-green-600">All operational</p>
            </div>
            <div className="p-3 bg-palette-warm/10 rounded-lg">
              <Key className="w-6 h-6 text-palette-warm" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-palette-dark">Revenue</p>
              <p className="text-3xl font-bold text-palette-deepest">KES 12.5K</p>
              <p className="text-sm text-green-600">Pre-launch sales</p>
            </div>
            <div className="p-3 bg-palette-warm/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-palette-warm" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-palette-dark">Services</p>
              <p className="text-3xl font-bold text-palette-deepest">8</p>
              <p className="text-sm text-green-600">All connected</p>
            </div>
            <div className="p-3 bg-palette-warm/10 rounded-lg">
              <Globe className="w-6 h-6 text-palette-warm" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="text-xl font-bold text-palette-deepest mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a href="/admin/apis" className="btn-primary w-full flex items-center gap-2">
              <Key className="w-4 h-4" />
              Manage APIs
            </a>
            <a href="/admin/services" className="btn-secondary w-full flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Configure Services
            </a>
            <a href="/admin/users" className="btn-secondary w-full flex items-center gap-2">
              <Users className="w-4 h-4" />
              View Users
            </a>
            <a href="/admin/analytics" className="btn-secondary w-full flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              View Analytics
            </a>
          </div>
        </div>

        {/* System Status */}
        <div className="card p-6">
          <h3 className="text-xl font-bold text-palette-deepest mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Security</span>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Active</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">API Gateway</span>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Online</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Database</span>
              </div>
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Warning</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">External Services</span>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-palette-deepest mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 border border-palette-medium rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-palette-deepest">New user registration</p>
              <p className="text-xs text-palette-dark">john.doe@example.com joined the platform</p>
            </div>
            <span className="text-xs text-palette-medium">2 min ago</span>
          </div>
          
          <div className="flex items-center gap-4 p-3 border border-palette-medium rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-palette-deepest">API key generated</p>
              <p className="text-xs text-palette-dark">Payment gateway API key created</p>
            </div>
            <span className="text-xs text-palette-medium">15 min ago</span>
          </div>
          
          <div className="flex items-center gap-4 p-3 border border-palette-medium rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-palette-deepest">Service updated</p>
              <p className="text-xs text-palette-dark">Email service configuration modified</p>
            </div>
            <span className="text-xs text-palette-medium">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  )
} 