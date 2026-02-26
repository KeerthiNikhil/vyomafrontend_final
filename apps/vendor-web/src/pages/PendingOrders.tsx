import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const pendingTrend = [
  { day: "Mon", orders: 4 },
  { day: "Tue", orders: 6 },
  { day: "Wed", orders: 5 },
  { day: "Thu", orders: 8 },
  { day: "Fri", orders: 7 },
  { day: "Sat", orders: 9 },
  { day: "Sun", orders: 6 },
];

const PendingOrders = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Pending Orders
        </h1>
        <p className="text-gray-500 text-sm">
          Manage and track all pending deliveries
        </p>
      </div>

      {/* Animated Warning Alert */}
      <div className="animate-pulse bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow">
        ⚠ You have 6 pending orders. Update tracking details to avoid delays.
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Total Pending</p>
            <h2 className="text-2xl font-bold text-yellow-600 mt-1">6</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Total Discount</p>
            <h2 className="text-2xl font-bold mt-1">₹450</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Average Processing Time</p>
            <h2 className="text-2xl font-bold mt-1">2.5 Days</h2>
          </CardContent>
        </Card>

      </div>

      {/* Trend Graph */}
      <Card>
        <CardContent className="p-6">
          <h2 className="font-semibold mb-4">
            Weekly Pending Trend
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={pendingTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#f59e0b"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Order Date</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Tracking ID</th>
              <th className="p-3 text-left">Update</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="p-3">#2001</td>
              <td className="p-3">22 Feb 2026</td>
              <td className="p-3">₹50</td>
              <td className="p-3 text-yellow-600 font-medium">Pending</td>
              <td className="p-3">TRK12345</td>
              <td className="p-3">
                <button className="bg-blue-900 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs">
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default PendingOrders;