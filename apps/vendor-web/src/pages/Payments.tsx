import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

interface Payment {
  id: number;
  orderId: string;
  amount: number;
  date: string;
  method: string;
  status: "Paid" | "Pending";
}

const weeklyData = [
  { day: "Mon", revenue: 1200 },
  { day: "Tue", revenue: 900 },
  { day: "Wed", revenue: 1500 },
  { day: "Thu", revenue: 800 },
  { day: "Fri", revenue: 1800 },
  { day: "Sat", revenue: 2200 },
  { day: "Sun", revenue: 1700 },
];

const monthlyData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 14000 },
  { month: "May", revenue: 21000 },
  { month: "Jun", revenue: 25000 },
];

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      orderId: "#1024",
      amount: 480,
      date: "20 Mar 2025",
      method: "UPI",
      status: "Paid",
    },
    {
      id: 2,
      orderId: "#1025",
      amount: 1250,
      date: "19 Mar 2025",
      method: "Card",
      status: "Paid",
    },
    {
      id: 3,
      orderId: "#1026",
      amount: 300,
      date: "18 Mar 2025",
      method: "COD",
      status: "Pending",
    },
    {
      id: 4,
      orderId: "#1027",
      amount: 950,
      date: "17 Mar 2025",
      method: "UPI",
      status: "Pending",
    },
  ]);

  const [showPending, setShowPending] = useState(false);

  const totalRevenue = payments
    .filter((p) => p.status === "Paid")
    .reduce((acc, p) => acc + p.amount, 0);

  const pendingPayments = payments.filter(
    (p) => p.status === "Pending"
  );

  const handleMarkAsPaid = (id: number) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id
          ? { ...payment, status: "Paid" }
          : payment
      )
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-gray-500">
          Track your earnings and revenue analytics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <Card className="bg-white">
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-2xl font-bold text-green-600">
              ₹{totalRevenue}
            </h2>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">
              Total Transactions
            </p>
            <h2 className="text-2xl font-bold">
              {payments.length}
            </h2>
          </CardContent>
        </Card>

        <Card
          onClick={() => setShowPending(!showPending)}
          className={`cursor-pointer transition ${
            showPending
              ? "bg-orange-50 border border-orange-400"
              : "bg-white hover:shadow-md"
          }`}
        >
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">
              Pending Payments
            </p>
            <h2 className="text-2xl font-bold text-orange-500">
              {pendingPayments.length}
            </h2>
          </CardContent>
        </Card>

      </div>

      {/* Pending Table */}
      {showPending && (
        <Card className="bg-white">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">
              Pending Payment Details
            </h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Order ID</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {pendingPayments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="py-2">
                      {payment.orderId}
                    </td>
                    <td>{payment.date}</td>
                    <td>{payment.method}</td>
                    <td className="text-orange-600 font-semibold">
                      ₹{payment.amount}
                    </td>
                    <td>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          handleMarkAsPaid(payment.id)
                        }
                      >
                        Mark as Paid
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card className="bg-white">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">
              Weekly Revenue
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="revenue"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">
              Monthly Revenue
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
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

    </div>
  );
};

export default Payments;