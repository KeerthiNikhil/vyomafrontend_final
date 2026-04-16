import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const PendingOrders = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  // ✅ FETCH FROM BACKEND (ONLY ONCE)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/orders"
        );

        console.log("API RESPONSE 👉", res.data);

        setOrders(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  // ✅ FILTER PENDING
  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  );

  const filteredOrders = pendingOrders.filter((order) =>
    order._id?.toLowerCase().includes(search.toLowerCase())
  );

  const pendingCount = pendingOrders.length;

  const totalRevenue = orders.reduce(
    (acc, o) => acc + (o.totalAmount || 0),
    0
  );

  // ✅ MARK DELIVERED
  const handleMarkDelivered = async (id: string) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/orders/${id}/deliver`
      );

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status: "Delivered" } : o
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ NAVIGATE WITH REAL DATA
  const handleAssignDelivery = (order: any) => {
    navigate("/vendor/delivery/assign", {
      state: {
        orderId: order._id,
        amount: order.totalAmount,
        date: new Date(order.createdAt).toLocaleDateString(),

        address:
          order.shippingAddress?.fullAddress ||
          order.shippingAddress?.city ||
          "No address available",

        lat: order.shippingAddress?.lat || "12.9716",
        lng: order.shippingAddress?.lng || "77.5946",
      },
    });
  };

  // ✅ CHART DATA
  const ordersTrend = orders.map((o, i) => ({
    name: `#${i + 1}`,
    orders: 1,
  }));

  const revenueTrend = orders.map((o, i) => ({
    name: `#${i + 1}`,
    revenue: o.totalAmount || 0,
  }));

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold">Pending Orders</h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            Total Orders: {orders.length}
          </CardContent>
        </Card>

        <Card onClick={() => setShowModal(true)}>
          <CardContent className="p-4 text-orange-500">
            Pending: {pendingCount}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-green-600">
            Revenue: ₹{totalRevenue}
          </CardContent>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Orders</h2>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ordersTrend}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>

          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Revenue</h2>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line dataKey="revenue" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>

          </CardContent>
        </Card>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-5xl">

            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Pending Orders
              </h2>

              <button onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>

                    <td>{order._id}</td>

                    <td>
                      {new Date(order.createdAt).toDateString()}
                    </td>

                    <td>₹{order.totalAmount}</td>

                    <td className="flex gap-3">

                      <button
                        onClick={() =>
                          handleAssignDelivery(order)
                        }
                        className="text-blue-600"
                      >
                        Assign Delivery
                      </button>

                      <button
                        onClick={() =>
                          handleMarkDelivered(order._id)
                        }
                        className="text-green-600"
                      >
                        Delivered
                      </button>

                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
      )}

    </div>
  );
};

export default PendingOrders;