import { useState, useEffect } from 'react'
import API from '@/services/api'

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await API.get("/admin/reviews")
        setReviews(res.data.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="border p-4 mb-2">
            <p>{r.comment}</p>
            <p>⭐ {r.rating}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Reviews