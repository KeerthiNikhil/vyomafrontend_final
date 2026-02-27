import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

interface Order {
  id: number;
  orderId: string;
  deliveryCharge: number;
  date: string;
  discount: number;
  amount: number;
  status: "Delivered";
}

const deliveryTrend = [
  { day: "Mon", deliveries: 5 },
  { day: "Tue", deliveries: 8 },
  { day: "Wed", deliveries: 6 },
  { day: "Thu", deliveries: 10 },
  { day: "Fri", deliveries: 7 },
  { day: "Sat", deliveries: 12 },
  { day: "Sun", deliveries: 9 },
];

const revenueTrend = [
  { day: "Mon", revenue: 2500 },
  { day: "Tue", revenue: 3200 },
  { day: "Wed", revenue: 1800 },
  { day: "Thu", revenue: 4000 },
  { day: "Fri", revenue: 2900 },
  { day: "Sat", revenue: 5000 },
  { day: "Sun", revenue: 3700 },
];

const DeliveredOrders = () => {
  const [search, setSearch] = useState("");

  const [orders] = useState<Order[]>([
    {
      id: 1,
      orderId: "#6001",
      deliveryCharge: 50,
      date: "27 Mar 2025",
      discount: 100,
      amount: 1500,
      status: "Delivered",
    },
    {
      id: 2,
      orderId: "#6002",
      deliveryCharge: 30,
      date: "26 Mar 2025",
      discount: 0,
      amount: 900,
      status: "Delivered",
    },
    {
      id: 3,
      orderId: "#6003",
      deliveryCharge: 70,
      date: "25 Mar 2025",
      discount: 50,
      amount: 2200,
      status: "Delivered",
    },
  ]);

  const filteredOrders = orders.filter((order) =>
    order.orderId.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = orders.reduce(
    (acc, o) => acc + o.amount,
    0
  );

  const totalDeliveryCharges = orders.reduce(
    (acc, o) => acc + o.deliveryCharge,
    0
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Delivered Orders
        </h1>
        <p className="text-gray-500">
          Track completed deliveries & revenue
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">
              Total Delivered
            </p>
            <h2 className="text-2xl font-bold">
              {orders.length}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">
              Total Revenue
            </p>
            <h2 className="text-2xl font-bold text-green-600">
              ₹{totalRevenue}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">
              Delivery Charges Collected
            </p>
            <h2 className="text-2xl font-bold text-blue-600">
              ₹{totalDeliveryCharges}
            </h2>
          </CardContent>
        </Card>

      </div>

      {/* Graph Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Delivery Trend */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">
              Weekly Delivery Trend
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deliveryTrend}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="deliveries"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">
              Revenue Trend
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* Search */}
      <div>
        <Input
          placeholder="Search by Order ID..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="max-w-xs"
        />
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Order ID</th>
                <th>Delivery Charge</th>
                <th>Date</th>
                <th>Discount</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3 font-medium">
                    {order.orderId}
                  </td>
                  <td className="text-blue-600 font-semibold">
                    ₹{order.deliveryCharge}
                  </td>
                  <td>{order.date}</td>
                  <td>₹{order.discount}</td>
                  <td className="font-semibold">
                    ₹{order.amount}
                  </td>
                  <td>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Delivered
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </CardContent>
      </Card>

    </div>
  );
};

export default DeliveredOrders;