'use client'

import { useState } from 'react'
import AdminLayout from '../layout'
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Calendar, 
  MapPin, 
  Eye,
  Ban,
  Shield,
  Star,
  TrendingUp,
  UserPlus,
  MoreVertical
} from 'lucide-react'

// Mock user data (in production, this would come from your database)
const users = [
  {
    id: '1',
    name: 'Sarah Kimani',
    email: 'sarah.kimani@email.com',
    role: 'premium',
    status: 'active',
    joinDate: '2025-01-15',
    lastActive: '2 hours ago',
    chaptersRead: 12,
    readingTime: 156,
    location: 'Nairobi, KE',
    paymentStatus: 'paid',
    avatar: null
  },
  {
    id: '2',
    name: 'Michael Ochieng',
    email: 'michael.o@company.co.ke',
    role: 'vip',
    status: 'active',
    joinDate: '2025-01-10',
    lastActive: '1 day ago',
    chaptersRead: 18,
    readingTime: 234,
    location: 'Mombasa, KE',
    paymentStatus: 'paid',
    avatar: null
  },
  {
    id: '3',
    name: 'Priya Patel',
    email: 'priya.patel@startup.com',
    role: 'premium',
    status: 'active',
    joinDate: '2025-01-08',
    lastActive: '3 hours ago',
    chaptersRead: 15,
    readingTime: 189,
    location: 'Kampala, UG',
    paymentStatus: 'paid',
    avatar: null
  },
  {
    id: '4',
    name: 'David Wanjiku',
    email: 'david.w@email.com',
    role: 'free',
    status: 'active',
    joinDate: '2025-01-12',
    lastActive: '5 hours ago',
    chaptersRead: 3,
    readingTime: 45,
    location: 'Kisumu, KE',
    paymentStatus: 'free',
    avatar: null
  },
  {
    id: '5',
    name: 'Grace Mutindi',
    email: 'grace.mutindi@corp.ke',
    role: 'premium',
    status: 'cancelled',
    joinDate: '2024-12-28',
    lastActive: '1 week ago',
    chaptersRead: 8,
    readingTime: 98,
    location: 'Eldoret, KE',
    paymentStatus: 'expired',
    avatar: null
  },
]

const stats = [
  {
    label: 'Total Users',
    value: '1,247',
    change: '+12%',
    icon: Users,
    color: 'blue'
  },
  {
    label: 'Premium Subscribers',
    value: '423',
    change: '+18%',
    icon: Star,
    color: 'yellow'
  },
  {
    label: 'VIP Members',
    value: '89',
    change: '+25%',
    icon: Shield,
    color: 'purple'
  },
  {
    label: 'Active Today',
    value: '156',
    change: '+8%',
    icon: TrendingUp,
    color: 'green'
  }
]

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    )
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'vip': return 'bg-purple-100 text-purple-800'
      case 'premium': return 'bg-yellow-100 text-yellow-800'
      case 'free': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage subscribers and user accounts</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'yellow' ? 'bg-yellow-100' :
                  stat.color === 'purple' ? 'bg-purple-100' :
                  'bg-green-100'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    'text-green-600'
                  }`} />
                </div>
              </div>
              <p className={`text-sm mt-2 ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last month
              </p>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="card p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="input-field"
              >
                <option value="all">All Roles</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
                <option value="paused">Paused</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button className="btn-secondary flex items-center gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {selectedUsers.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
              <span className="text-sm text-blue-800">
                {selectedUsers.length} user(s) selected
              </span>
              <div className="flex gap-2">
                <button className="btn-secondary text-sm">Send Email</button>
                <button className="btn-secondary text-sm">Change Plan</button>
                <button className="btn-secondary text-sm text-red-600">Suspend</button>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-gray-600">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>Last active: {user.lastActive}</div>
                      <div className="text-gray-500">Joined: {new Date(user.joinDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{user.chaptersRead} chapters</div>
                      <div className="text-gray-500">{user.readingTime}m reading</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        {user.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary text-sm">Previous</button>
                <button className="btn-secondary text-sm">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 