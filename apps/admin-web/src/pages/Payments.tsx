import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  DollarSign,
  Users,
  Calendar
} from 'lucide-react'
import { Badge } from '../components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'

const Payments = () => {
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const payments = [
    { id: 'PAY001', vendor: 'TechGadgets', amount: '$2,450.00', date: '2024-01-20', status: 'Paid', method: 'Bank Transfer' },
    { id: 'PAY002', vendor: 'AudioTech', amount: '$1,890.50', date: '2024-01-19', status: 'Pending', method: 'PayPal' },
    { id: 'PAY003', vendor: 'PowerUp', amount: '$3,120.75', date: '2024-01-18', status: 'Failed', method: 'Bank Transfer' },
    { id: 'PAY004', vendor: 'GameZone', amount: '$980.25', date: '2024-01-17', status: 'Processing', method: 'Stripe' },
    { id: 'PAY005', vendor: 'MobileTech', amount: '$1,560.00', date: '2024-01-16', status: 'Paid', method: 'PayPal' },
    { id: 'PAY006', vendor: 'SoundCo', amount: '$2,890.30', date: '2024-01-15', status: 'Pending', method: 'Bank Transfer' },
  ]

  const filteredPayments = payments.filter(payment => {
    if (filterStatus === 'all') return true
    return payment.status.toLowerCase() === filterStatus.toLowerCase()
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentPayments = filteredPayments.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)

  const stats = {
    totalPaid: payments
      .filter(p => p.status === 'Paid')
      .reduce((acc, curr) => acc + parseFloat(curr.amount.replace('$', '').replace(',', '')), 0)
      .toFixed(2),
    pending: payments
      .filter(p => p.status === 'Pending' || p.status === 'Processing')
      .reduce((acc, curr) => acc + parseFloat(curr.amount.replace('$', '').replace(',', '')), 0)
      .toFixed(2),
    thisMonth: '$8,950.25',
    vendorCount: [...new Set(payments.map(p => p.vendor))].length
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'Failed': return <XCircle className="w-4 h-4 text-red-600" />
      case 'Processing': return <Clock className="w-4 h-4 text-blue-600" />
      default: return null
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage vendor payments and transactions</p>
        </div>
        <Button className="w-full sm:w-auto mt-4 sm:mt-0">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Paid</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">${stats.totalPaid}</p>
              </div>
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Pending</p>
                <p className="text-lg sm:text-2xl font-bold text-yellow-600">${stats.pending}</p>
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">This Month</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
              </div>
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Active Vendors</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.vendorCount}</p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-4 sm:mb-6">
        <CardContent className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[200px] h-10 sm:h-11">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full sm:w-auto h-10 sm:h-11">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <Card className="w-full">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg sm:text-xl">Payment History</CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1">
                {filteredPayments.length} transactions found
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-4">
            {currentPayments.map((payment) => (
              <div key={payment.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{payment.id}</p>
                    <p className="text-sm text-gray-600">{payment.vendor}</p>
                  </div>
                  <Badge variant={
                    payment.status === 'Paid' ? 'default' :
                    payment.status === 'Pending' ? 'secondary' :
                    payment.status === 'Failed' ? 'destructive' : 'outline'
                  } className="text-xs">
                    {payment.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="font-bold text-base">{payment.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm">{payment.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Method</p>
                    <p className="text-sm">{payment.method}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                  {payment.status === 'Pending' && (
                    <Button size="sm" className="flex-1">
                      Approve
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Payment ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Vendor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Method</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{payment.id}</td>
                    <td className="py-3 px-4">{payment.vendor}</td>
                    <td className="py-3 px-4 font-medium">{payment.amount}</td>
                    <td className="py-3 px-4">{payment.date}</td>
                    <td className="py-3 px-4">{payment.method}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <Badge variant={
                          payment.status === 'Paid' ? 'default' :
                          payment.status === 'Pending' ? 'secondary' :
                          payment.status === 'Failed' ? 'destructive' : 'outline'
                        }>
                          {payment.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {payment.status === 'Pending' && (
                          <Button size="sm">
                            Approve
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredPayments.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <p className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredPayments.length)} of {filteredPayments.length} transactions
              </p>
              <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <span className="text-xs sm:text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                >
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Payments