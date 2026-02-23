import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { 
  Search, 
  Power, 
  Trash2, 
  Eye, 
  ChevronLeft,
  ChevronRight,
  Archive 
} from 'lucide-react'
import { Badge } from '../components/ui/badge'

const DisabledProducts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const products = [
    { id: 1, name: 'Old Model Phone', price: '$199.99', disabledDate: '2024-01-15', vendor: 'MobileTech', reason: 'Outdated', stock: 0 },
    { id: 2, name: 'Wired Earphones', price: '$24.99', disabledDate: '2024-01-10', vendor: 'SoundCo', reason: 'Low sales', stock: 45 },
    { id: 3, name: 'Gaming Keyboard', price: '$89.99', disabledDate: '2024-01-05', vendor: 'GameZone', reason: 'Quality issues', stock: 12 },
    { id: 4, name: 'Tablet S5', price: '$449.99', disabledDate: '2024-01-03', vendor: 'TechGadgets', reason: 'New version', stock: 8 },
    { id: 5, name: 'Wireless Mouse', price: '$39.99', disabledDate: '2024-01-01', vendor: 'GameZone', reason: 'Discontinued', stock: 23 },
  ]

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.reason.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Disabled Products</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage products that are currently disabled</p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto mt-4 sm:mt-0">
          <Archive className="w-4 h-4 mr-2" />
          View All
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600">Total Disabled</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">{products.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600">In Stock</p>
            <p className="text-lg sm:text-2xl font-bold text-green-600">
              {products.reduce((acc, curr) => acc + curr.stock, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600">Out of Stock</p>
            <p className="text-lg sm:text-2xl font-bold text-red-600">
              {products.filter(p => p.stock === 0).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600">This Month</p>
            <p className="text-lg sm:text-2xl font-bold text-blue-600">3</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-4 sm:mb-6">
        <CardContent className="p-3 sm:p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input 
              placeholder="Search disabled products..." 
              className="pl-9 sm:pl-10 text-sm sm:text-base h-10 sm:h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Products List */}
      <Card className="w-full">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg sm:text-xl">Disabled Products</CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1">
                {filteredProducts.length} products currently disabled
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-4">
            {currentProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-base">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.vendor}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {product.reason}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Price</p>
                    <p className="font-medium">{product.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Stock</p>
                    <p className="font-medium">{product.stock} units</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Disabled</p>
                    <p className="font-medium">{product.disabledDate}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2 border-t">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-green-600">
                    <Power className="w-4 h-4 mr-1" />
                    Enable
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Stock</th>
                  <th className="text-left py-3 px-4">Disabled Since</th>
                  <th className="text-left py-3 px-4">Vendor</th>
                  <th className="text-left py-3 px-4">Reason</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="py-3 px-4">{product.price}</td>
                    <td className="py-3 px-4">{product.stock} units</td>
                    <td className="py-3 px-4">{product.disabledDate}</td>
                    <td className="py-3 px-4">{product.vendor}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{product.reason}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-green-600">
                          <Power className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <p className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
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

export default DisabledProducts