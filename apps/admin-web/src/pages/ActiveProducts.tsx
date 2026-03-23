import { useState, useEffect } from 'react'
import API from '@/services/api'

const ActiveProducts = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/admin/products/active")
        setProducts(res.data.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="p-6">
      <h1>Active Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        products.map((p) => (
          <div key={p._id}>{p.name}</div>
        ))
      )}
    </div>
  )
}

export default ActiveProducts