import { useState, useEffect } from 'react'
import API from '@/services/api'

const Banners = () => {
  const [banners, setBanners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await API.get("/admin/banners")
        setBanners(res.data.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Banners</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        banners.map((b) => (
          <div key={b._id} className="mb-4">
            <img src={b.image} className="h-32" />
            <p>{b.title}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Banners