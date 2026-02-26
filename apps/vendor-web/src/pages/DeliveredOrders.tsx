import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const deliveryTrend = [
  { day: "Mon", orders: 5 },
  { day: "Tue", orders: 8 },
  { day: "Wed", orders: 6 },
  { day: "Thu", orders: 10 },
  { day: "Fri", orders: 7 },
  { day: "Sat", orders: 12 },
  { day: "Sun", orders: 9 },
];

const DeliveredOrders = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Delivered Orders
        </h1>
        <p className="text-gray-500 text-sm">
          Overview of successfully delivered orders
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Total Delivered</p>
            <h2 className="text-2xl font-bold text-green-600 mt-1">57</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-2xl font-bold mt-1">₹24,500</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Total Discount Given</p>
            <h2 className="text-2xl font-bold text-red-500 mt-1">₹1,200</h2>
          </CardContent>
        </Card>

      </div>

      {/* Delivery Trend Graph */}
      <Card>
        <CardContent className="p-6">
          <h2 className="font-semibold mb-4">
            Weekly Delivery Performance
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deliveryTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="orders"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Delivery Charges</th>
              <th className="p-3 text-left">Order Date</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="p-3">#1001</td>
              <td className="p-3">₹50</td>
              <td className="p-3">22 Feb 2026</td>
              <td className="p-3">₹20</td>
              <td className="p-3 text-green-600 font-medium">Delivered</td>
            </tr>

            <tr className="border-t hover:bg-gray-50 transition">
              <td className="p-3">#1002</td>
              <td className="p-3">₹0</td>
              <td className="p-3">21 Feb 2026</td>
              <td className="p-3">₹10</td>
              <td className="p-3 text-green-600 font-medium">Delivered</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DeliveredOrders;