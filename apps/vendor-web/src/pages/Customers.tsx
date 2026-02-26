import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const customerGrowth = [
  { month: "Jan", customers: 10 },
  { month: "Feb", customers: 18 },
  { month: "Mar", customers: 25 },
  { month: "Apr", customers: 32 },
  { month: "May", customers: 40 },
  { month: "Jun", customers: 55 },
];

const Customers = () => {
  const [search, setSearch] = useState("");

  const customers = [
    {
      id: 1,
      name: "Rohit Sharma",
      email: "rohit@gmail.com",
      phone: "9876543210",
      address: "Mangalore",
      status: "Active",
    },
    {
      id: 2,
      name: "Ananya Shetty",
      email: "ananya@gmail.com",
      phone: "9123456780",
      address: "Udupi",
      status: "Active",
    },
    {
      id: 3,
      name: "Rahul B",
      email: "rahul@gmail.com",
      phone: "9000000000",
      address: "Manipal",
      status: "Inactive",
    },
  ];

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Customers
        </h1>
        <p className="text-gray-500 text-sm">
          Manage and monitor your customer base
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Total Customers</p>
            <h2 className="text-2xl font-bold mt-1">
              {customers.length}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Active Customers</p>
            <h2 className="text-2xl font-bold text-green-600 mt-1">
              {customers.filter(c => c.status === "Active").length}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Inactive Customers</p>
            <h2 className="text-2xl font-bold text-red-500 mt-1">
              {customers.filter(c => c.status === "Inactive").length}
            </h2>
          </CardContent>
        </Card>

      </div>

      {/* Customer Growth Chart */}
      <Card>
        <CardContent className="p-6">
          <h2 className="font-semibold mb-4">
            Customer Growth
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={customerGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <div className="max-w-sm">
        <Input
          placeholder="Search customer by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Customers Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 font-medium">{customer.name}</td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.phone}</td>
                <td className="p-3">{customer.address}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Customers;