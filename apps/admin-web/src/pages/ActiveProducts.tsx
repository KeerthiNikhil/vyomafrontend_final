import { useState } from 'react'
import { Button } from '../components/ui/button'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import { 
  Search, 
  Filter, 
  Eye, 
  Power, 
  Edit,
  ChevronLeft,
  ChevronRight,
  Package,
  TrendingUp,
  AlertCircle
  // ✅ Removed MoreVertical if not used
} from 'lucide-react'
import { Badge } from '../components/ui/badge'
const ActiveProducts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const products = [
    { id: 1, name: 'Wireless Headphones', price: '$99.99', stock: 45, vendor: 'AudioTech', sales: 234, rating: 4.5 },
    { id: 2, name: 'Smart Watch Pro', price: '$299.99', stock: 12, vendor: 'TechGadgets', sales: 189, rating: 4.8 },
    { id: 3, name: 'USB-C Laptop Charger', price: '$34.99', stock: 120, vendor: 'PowerUp', sales: 456, rating: 4.2 },
    { id: 4, name: 'Gaming Mouse RGB', price: '$59.99', stock: 67, vendor: 'GameZone', sales: 321, rating: 4.6 },
    { id: 5, name: 'Bluetooth Speaker', price: '$79.99', stock: 34, vendor: 'AudioTech', sales: 567, rating: 4.7 },
    { id: 6, name: '4K Monitor', price: '$399.99', stock: 8, vendor: 'TechGadgets', sales: 98, rating: 4.9 },
  ]

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  // Stats
  const totalRevenue = products.reduce((acc, curr) => {
    const price = parseFloat(curr.price.replace('$', ''))
    return acc + (price * curr.sales)
  }, 0).toFixed(2)

  const totalStock = products.reduce((acc, curr) => acc + curr.stock, 0)
  const lowStockItems = products.filter(p => p.stock < 20).length

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Active Products</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage all active products in your store</p>
        </div>
        <div className="flex flex-col xs:flex-row gap-2 mt-4 sm:mt-0">
          <Button variant="outline" className="w-full xs:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Filter</span>
            <span className="sm:hidden">Filter</span>
          </Button>
          <Button className="w-full xs:w-auto">
            <Package className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards - Mobile: 2 cols, Desktop: 4 cols */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Products</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Stock</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{totalStock}</p>
              </div>
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Low Stock</p>
                <p className="text-lg sm:text-2xl font-bold text-yellow-600">{lowStockItems}</p>
              </div>
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Revenue</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">${totalRevenue}</p>
              </div>
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="mb-4 sm:mb-6">
        <CardContent className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <Input 
                placeholder="Search products or vendors..." 
                className="pl-9 sm:pl-10 text-sm sm:text-base h-10 sm:h-11"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto h-10 sm:h-11">
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table - Card View for Mobile, Table for Desktop */}
      <Card className="w-full">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg sm:text-xl">Product List</CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1">
                {filteredProducts.length} products found
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
                    <p className="text-xs text-gray-500">ID: #{product.id}</p>
                  </div>
                  <Badge variant={product.stock < 20 ? 'destructive' : 'outline'} className="text-xs">
                    {product.stock} left
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Price</p>
                    <p className="font-medium">{product.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Vendor</p>
                    <p className="font-medium">{product.vendor}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Sales</p>
                    <p className="font-medium">{product.sales}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Rating</p>
                    <p className="font-medium">⭐ {product.rating}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2 border-t">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-yellow-600">
                    <Power className="w-4 h-4" />
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Vendor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Sales</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rating</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">ID: #{product.id}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{product.price}</td>
                    <td className="py-3 px-4">
                      <Badge variant={product.stock < 20 ? 'destructive' : 'outline'}>
                        {product.stock} units
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{product.vendor}</td>
                    <td className="py-3 px-4">{product.sales}</td>
                    <td className="py-3 px-4">⭐ {product.rating}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-yellow-600">
                          <Power className="w-4 h-4" />
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
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = currentPage;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={i}
                        variant={currentPage === pageNum ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
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

export default ActiveProducts