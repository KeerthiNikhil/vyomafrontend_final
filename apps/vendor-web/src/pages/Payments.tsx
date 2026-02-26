import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
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
  const [payments] = useState<Payment[]>([
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
  ]);

  const totalRevenue = payments
    .filter((p) => p.status === "Paid")
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-3xl font-bold">
          Payments
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Track your earnings and revenue analytics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

        <Card className="rounded-xl shadow-sm bg-white">
          <CardContent className="p-3 sm:p-4">
            <p className="text-muted-foreground text-xs sm:text-sm">
              Total Revenue
            </p>
            <h2 className="text-lg sm:text-2xl font-bold text-green-600 mt-1">
              ₹{totalRevenue}
            </h2>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm bg-white">
          <CardContent className="p-3 sm:p-4">
            <p className="text-muted-foreground text-xs sm:text-sm">
              Total Transactions
            </p>
            <h2 className="text-lg sm:text-2xl font-bold mt-1">
              {payments.length}
            </h2>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm bg-white col-span-2 lg:col-span-1">
          <CardContent className="p-3 sm:p-4">
            <p className="text-muted-foreground text-xs sm:text-sm">
              Pending Payments
            </p>
            <h2 className="text-lg sm:text-2xl font-bold text-orange-500 mt-1">
              {payments.filter(p => p.status === "Pending").length}
            </h2>
          </CardContent>
        </Card>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* Weekly Chart */}
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <h2 className="font-semibold mb-4 text-sm sm:text-base">
              Weekly Revenue
            </h2>
            <ResponsiveContainer width="100%" height={220}>
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

        {/* Monthly Chart */}
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <h2 className="font-semibold mb-4 text-sm sm:text-base">
              Monthly Revenue
            </h2>
            <ResponsiveContainer width="100%" height={220}>
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