import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { toast } from 'sonner'
import API from '@/services/api'

const Payments = () => {
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await API.get("/admin/payments")
        setPayments(res.data.data)
      } catch (err) {
        toast.error("Failed to load payments")
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        payments.map((p) => (
          <Card key={p._id} className="mb-2">
            <CardContent className="p-4 flex justify-between">
              <p>{p.vendorName}</p>
              <p>₹{p.amount}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

export default Payments