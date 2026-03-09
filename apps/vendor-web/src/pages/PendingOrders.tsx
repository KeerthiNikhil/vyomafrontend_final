import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
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
  date: string;
  discount: number;
  amount: number;
  status: "Pending" | "Processing" | "Delivered";
  deliveryBoy?: string;
}

const ordersTrend = [
  { day: "Mon", orders: 5 },
  { day: "Tue", orders: 8 },
  { day: "Wed", orders: 6 },
  { day: "Thu", orders: 10 },
  { day: "Fri", orders: 7 },
  { day: "Sat", orders: 12 },
  { day: "Sun", orders: 9 },
];

const revenueTrend = [
  { day: "Mon", revenue: 1200 },
  { day: "Tue", revenue: 1800 },
  { day: "Wed", revenue: 900 },
  { day: "Thu", revenue: 2200 },
  { day: "Fri", revenue: 1600 },
  { day: "Sat", revenue: 2500 },
  { day: "Sun", revenue: 2000 },
];

const PendingOrders = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderId: "#5001",
      date: "27 Mar 2025",
      discount: 50,
      amount: 1200,
      status: "Pending",
      deliveryBoy: "Rahul",
    },
    {
      id: 2,
      orderId: "#5002",
      date: "26 Mar 2025",
      discount: 0,
      amount: 850,
      status: "Processing",
    },
    {
      id: 3,
      orderId: "#5003",
      date: "25 Mar 2025",
      discount: 100,
      amount: 2000,
      status: "Pending",
    },
  ]);

  const pendingOrders = orders.filter((o) => o.status === "Pending");

  const filteredOrders = pendingOrders.filter((order) =>
    order.orderId.toLowerCase().includes(search.toLowerCase())
  );

  const pendingCount = pendingOrders.length;

  const totalRevenue = orders.reduce((acc, o) => acc + o.amount, 0);

  /* Mark as Delivered */
  const handleMarkDelivered = (id: number) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "Delivered" } : order
      )
    );
  };

  /* Navigate to Assign Delivery Page */
  const handleAssignDelivery = (order: Order) => {
    navigate("/vendor/delivery/assign", {
      state: {
        orderId: order.orderId,
        amount: order.amount,
        date: order.date,
        deliveryBoy: order.deliveryBoy || null,
      },
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Pending Orders</h1>
        <p className="text-gray-500">
          Monitor incoming orders & performance
        </p>
      </div>

      {/* Warning */}
      {pendingCount > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-yellow-800 font-medium">
            ⚠ You have {pendingCount} pending orders that need attention.
          </p>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-2xl font-bold">{orders.length}</h2>
          </CardContent>
        </Card>

        <Card
          onClick={() => setShowModal(true)}
          className="cursor-pointer hover:shadow-lg transition"
        >
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <h2 className="text-2xl font-bold text-orange-500">
              {pendingCount}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-2xl font-bold text-green-600">
              ₹{totalRevenue}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Weekly Order Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ordersTrend}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#3b82f6" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Revenue Trend</h2>
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

      {/* Pending Orders Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-6xl rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Pending Orders Details
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-black text-lg"
              >
                ✕
              </button>
            </div>

            <Input
              placeholder="Search by Order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4 max-w-xs"
            />

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3">Order ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Delivery</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{order.orderId}</td>

                      <td>{order.date}</td>

                      <td>₹{order.amount}</td>

                      <td>
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                          Pending
                        </span>
                      </td>

                      <td>
                        {order.deliveryBoy ? (
                          <span className="text-blue-600 font-medium">
                            {order.deliveryBoy}
                          </span>
                        ) : (
                          <span className="text-gray-400">
                            Not Assigned
                          </span>
                        )}
                      </td>

                      <td className="flex gap-4 items-center">
                        <button
                          className="text-blue-600 hover:underline text-sm"
                          onClick={() => handleAssignDelivery(order)}
                        >
                          {order.deliveryBoy
                            ? "Reassign Delivery"
                            : "Assign Delivery"}
                        </button>

                        <button
                          className="text-green-600 hover:underline text-sm"
                          onClick={() =>
                            handleMarkDelivered(order.id)
                          }
                        >
                          Mark as Delivered
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingOrders;