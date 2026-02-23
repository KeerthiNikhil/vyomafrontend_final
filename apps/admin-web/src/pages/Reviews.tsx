import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { 
  Star, 
  Eye, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from 'lucide-react'

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const reviews = [
    { id: 1, product: 'Wireless Headphones', rating: 5, comment: 'Great sound quality! Highly recommended.', customer: 'John Doe', date: '2024-01-20' },
    { id: 2, product: 'Smart Watch Pro', rating: 4, comment: 'Good battery life but a bit pricey.', customer: 'Jane Smith', date: '2024-01-19' },
    { id: 3, product: 'USB-C Charger', rating: 3, comment: 'Average performance, works as expected.', customer: 'Mike Johnson', date: '2024-01-18' },
    { id: 4, product: 'Gaming Mouse', rating: 5, comment: 'Perfect for gaming! Very responsive.', customer: 'Sarah Wilson', date: '2024-01-17' },
    { id: 5, product: 'Bluetooth Speaker', rating: 4, comment: 'Good sound, portable size.', customer: 'Tom Brown', date: '2024-01-16' },
    { id: 6, product: '4K Monitor', rating: 5, comment: 'Amazing display quality!', customer: 'Emily Davis', date: '2024-01-15' },
    { id: 7, product: 'Mechanical Keyboard', rating: 5, comment: 'Best keyboard I ever used!', customer: 'Alex Lee', date: '2024-01-14' },
    { id: 8, product: 'Webcam HD', rating: 4, comment: 'Good quality for video calls.', customer: 'Nina Patel', date: '2024-01-13' },
  ]

  // Remove search filter - show all reviews
  const filteredReviews = reviews

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentReviews = filteredReviews.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage)

  const stats = {
    totalReviews: reviews.length,
    averageRating: (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1),
    fiveStar: reviews.filter(r => r.rating === 5).length,
    fourStar: reviews.filter(r => r.rating === 4).length,
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Product Reviews</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage all customer reviews</p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto mt-4 sm:mt-0">
          <MessageSquare className="w-4 h-4 mr-2" />
          Export Reviews
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600">Total Reviews</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600">Average Rating</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600">5 Star Reviews</p>
            <p className="text-lg sm:text-2xl font-bold text-blue-600">{stats.fiveStar}</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600">4 Star Reviews</p>
            <p className="text-lg sm:text-2xl font-bold text-purple-600">{stats.fourStar}</p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List - Directly after stats */}
      <Card className="w-full">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg sm:text-xl">Customer Reviews</CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1">
                {filteredReviews.length} reviews found
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
          <div className="space-y-4">
            {currentReviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                {/* Mobile View */}
                <div className="block sm:hidden space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-base">{review.product}</h3>
                      <p className="text-xs text-gray-500">by {review.customer}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  
                  <p className="text-sm text-gray-700">{review.comment}</p>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 flex-1">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden sm:flex sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{review.product}</h3>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">by {review.customer}</span>
                      <span className="text-sm text-gray-500">• {review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {filteredReviews.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <p className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredReviews.length)} of {filteredReviews.length} reviews
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

export default Reviews