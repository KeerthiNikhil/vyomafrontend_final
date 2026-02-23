import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    .filter(p => p.status === "Paid")
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Payments</h1>
        <p className="text-muted-foreground">
          Track your earnings and revenue analytics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Total Revenue</p>
            <h2 className="text-3xl font-bold text-green-600">
              ₹{totalRevenue}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Total Transactions</p>
            <h2 className="text-3xl font-bold">
              {payments.length}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Pending Payments</p>
            <h2 className="text-3xl font-bold text-orange-500">
              {payments.filter(p => p.status === "Pending").length}
            </h2>
          </CardContent>
        </Card>

      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Weekly Bar Chart */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Weekly Revenue</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Line Chart */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Monthly Revenue</h2>
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