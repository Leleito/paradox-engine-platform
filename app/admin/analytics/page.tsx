'use client'

import { useState } from 'react'
import AdminLayout from '../layout'
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  DollarSign, 
  Calendar,
  Download,
  Eye,
  Clock,
  Star,
  Target,
  BarChart,
  PieChart,
  Activity,
  Globe
} from 'lucide-react'

// Mock analytics data (in production, this would come from your analytics service)
const overviewStats = [
  {
    label: 'Total Revenue',
    value: 'KES 1,247,000',
    change: '+18.2%',
    icon: DollarSign,
    color: 'green'
  },
  {
    label: 'Active Subscribers',
    value: '1,089',
    change: '+12.5%',
    icon: Users,
    color: 'blue'
  },
  {
    label: 'Chapters Read',
    value: '15,678',
    change: '+24.1%',
    icon: BookOpen,
    color: 'purple'
  },
  {
    label: 'Avg. Reading Time',
    value: '23 min',
    change: '+8.3%',
    icon: Clock,
    color: 'orange'
  }
]

const subscriptionStats = [
  { plan: 'Free', count: 856, percentage: 45, color: 'bg-gray-400' },
  { plan: 'Premium', count: 734, percentage: 38, color: 'bg-yellow-400' },
  { plan: 'VIP', count: 321, percentage: 17, color: 'bg-purple-400' }
]

const topChapters = [
  { title: 'Chapter 1: Welcome to the Tension', reads: 1234, completion: 94 },
  { title: 'Chapter 3: The Paradox Engine Framework', reads: 1156, completion: 89 },
  { title: 'Chapter 5: Duality: The Push and Pull', reads: 1089, completion: 86 },
  { title: 'Chapter 8: The Vulnerability Strength', reads: 987, completion: 82 },
  { title: 'Chapter 12: The Resolution Paradox', reads: 756, completion: 78 }
]

const userEngagement = [
  { metric: 'Daily Active Users', value: 342, change: '+5.2%' },
  { metric: 'Weekly Active Users', value: 1089, change: '+12.1%' },
  { metric: 'Monthly Active Users', value: 1847, change: '+8.7%' },
  { metric: 'Average Session Duration', value: '18 min', change: '+14.3%' },
  { metric: 'Chapters per Session', value: '2.3', change: '+9.1%' },
  { metric: 'Completion Rate', value: '78%', change: '+4.2%' }
]

const revenueData = [
  { month: 'Aug', amount: 840000 },
  { month: 'Sep', amount: 920000 },
  { month: 'Oct', amount: 1050000 },
  { month: 'Nov', amount: 1180000 },
  { month: 'Dec', amount: 1320000 },
  { month: 'Jan', amount: 1247000 }
]

const geographicData = [
  { country: 'Kenya', users: 1245, percentage: 65.3 },
  { country: 'Uganda', users: 234, percentage: 12.3 },
  { country: 'Tanzania', users: 189, percentage: 9.9 },
  { country: 'Rwanda', users: 123, percentage: 6.5 },
  { country: 'Other', users: 115, percentage: 6.0 }
]

export default function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const maxRevenue = Math.max(...revenueData.map(d => d.amount))

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Platform performance and user insights</p>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input-field"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="btn-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'purple' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    'text-orange-600'
                  }`} />
                </div>
              </div>
              <p className={`text-sm mt-2 ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last period
              </p>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <div className="flex gap-2">
              <button 
                className={`btn-secondary text-sm ${selectedMetric === 'revenue' ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedMetric('revenue')}
              >
                Revenue
              </button>
              <button 
                className={`btn-secondary text-sm ${selectedMetric === 'users' ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedMetric('users')}
              >
                Users
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end gap-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t-md transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${(data.amount / maxRevenue) * 200}px` }}
                ></div>
                <p className="text-sm text-gray-600 mt-2">{data.month}</p>
                <p className="text-xs text-gray-500">
                  KES {(data.amount / 1000).toFixed(0)}K
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subscription Breakdown */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Subscription Plans</h3>
            <div className="space-y-4">
              {subscriptionStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${stat.color}`}></div>
                    <span className="text-sm font-medium text-gray-900">{stat.plan}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${stat.color}`}
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {stat.count}
                    </span>
                    <span className="text-sm text-gray-500 w-8 text-right">
                      {stat.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Geographic Distribution</h3>
            <div className="space-y-4">
              {geographicData.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{country.country}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {country.users}
                    </span>
                    <span className="text-sm text-gray-500 w-12 text-right">
                      {country.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Engagement Metrics */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">User Engagement</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userEngagement.map((metric, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{metric.metric}</span>
                  <span className={`text-sm font-medium ${
                    metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Chapters */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Chapters</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chapter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Reads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topChapters.map((chapter, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-blue-600">
                            {index + 1}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {chapter.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-gray-400 mr-2" />
                        {chapter.reads.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${chapter.completion}%` }}
                          ></div>
                        </div>
                        <span>{chapter.completion}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">Excellent</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn-secondary text-center flex items-center justify-center gap-2">
              <BarChart className="w-4 h-4" />
              Generate Report
            </button>
            <button className="btn-secondary text-center flex items-center justify-center gap-2">
              <Target className="w-4 h-4" />
              Set Goals
            </button>
            <button className="btn-secondary text-center flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              View Detailed Analytics
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 