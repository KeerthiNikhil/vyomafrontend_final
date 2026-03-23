import { useState, useEffect } from 'react'
import API from '@/services/api'

const DisabledProducts = () => {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    API.get("/admin/products/disabled").then(res => {
      setProducts(res.data.data)
    })
  }, [])

  return (
    <div className="p-6">
      <h1>Disabled Products</h1>

      {products.map((p) => (
        <div key={p._id}>{p.name}</div>
      ))}
    </div>
  )
}

export default DisabledProducts