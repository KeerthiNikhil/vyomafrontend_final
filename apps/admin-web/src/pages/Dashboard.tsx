import StatCard from '../components/cards/StatCard'
import { DollarSign, Package, Star, Users, TrendingUp} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '@/components/ui/button'

const Dashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '$24,580', icon: DollarSign, change: '+12%' },
    { title: 'Active Products', value: '1,248', icon: Package, change: '+8%' },
    { title: 'Total Reviews', value: '4,872', icon: Star, change: '+23%' },
    { title: 'Active Vendors', value: '342', icon: Users, change: '+5%' },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back, Admin! Here's what's happening.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button className="w-full sm:w-auto">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>
      
      {/* Stats Grid - Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section - Mobile: 1 col, Desktop: 2 cols */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <Card className="w-full">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
            <CardDescription className="text-sm">Latest updates from your store</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="space-y-3 sm:space-y-4">
              {[
                { activity: 'New product added by Vendor A', time: '2 min ago', icon: Package },
                { activity: 'Payment received for Order #1234', time: '15 min ago', icon: DollarSign },
                { activity: 'New vendor registration approved', time: '1 hour ago', icon: Users },
                { activity: 'Banner updated on homepage', time: '2 hours ago', icon: Star },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start sm:items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-white rounded-lg">
                      <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium">{item.activity}</p>
                      <p className="text-xs text-gray-500 sm:hidden">{item.time}</p>
                    </div>
                  </div>
                  <span className="hidden sm:block text-xs sm:text-sm text-gray-500">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="w-full">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Quick Stats</CardTitle>
            <CardDescription className="text-sm">Overview of pending items</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600">Pending Reviews</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">12</p>
                <p className="text-xs text-gray-500 mt-1">+2 today</p>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600">Unpaid Vendors</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">8</p>
                <p className="text-xs text-gray-500 mt-1">$3,450 total</p>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600">Banners Live</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">5</p>
                <p className="text-xs text-gray-500 mt-1">3 active</p>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600">Low Stock</p>
                <p className="text-xl sm:text-2xl font-bold text-red-600">12</p>
                <p className="text-xs text-gray-500 mt-1">5 critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard