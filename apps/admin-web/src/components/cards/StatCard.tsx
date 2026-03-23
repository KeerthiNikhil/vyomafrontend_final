import { type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: string   // ✅ make optional
}

const StatCard = ({ title, value, icon: Icon, change = "0%" }: StatCardProps) => {
  
  const isPositive = change?.startsWith('+') // ✅ safe check

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>

            <p className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change} from last month
            </p>
          </div>

          <div className={`p-3 rounded-full ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
            <Icon className={`w-6 h-6 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
          </div>

        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard