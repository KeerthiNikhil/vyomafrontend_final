import { type LucideIcon } from 'lucide-react' // Add 'type' keyword
import { Card, CardContent } from '../ui/card'

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  change: string
}

const StatCard = ({ title, value, icon: Icon, change }: StatCardProps) => {
  const isPositive = change.startsWith('+')
  
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