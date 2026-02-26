import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const productData = [
  { name: "Active", value: 12 },
  { name: "Disabled", value: 4 },
];

const ratingData = [
  { rating: "5★", count: 8 },
  { rating: "4★", count: 6 },
  { rating: "3★", count: 3 },
  { rating: "2★", count: 1 },
  { rating: "1★", count: 0 },
];

const COLORS = ["#3b82f6", "#ef4444"];

const DisabledProducts = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold">
          Disable Products
        </h1>
        <p className="text-gray-500 text-sm">
          Manage and monitor disabled products
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Total Products</p>
            <h2 className="text-2xl font-bold mt-1">16</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Disabled Products</p>
            <h2 className="text-2xl font-bold text-red-500 mt-1">4</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500 text-sm">Total Reviews</p>
            <h2 className="text-2xl font-bold mt-1">18</h2>
          </CardContent>
        </Card>

      </div>

      {/* Graph Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Active vs Disabled Chart */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">
              Product Status Overview
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={productData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {productData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ratings Distribution */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">
              Ratings Distribution
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ratingData}>
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Item name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Reviews</th>
              <th className="p-3 text-left">Ratings</th>
              <th className="p-3 text-left">Disable</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">1</td>
              <td className="p-3">Sample Product</td>
              <td className="p-3">₹500</td>
              <td className="p-3">5</td>
              <td className="p-3">4.5★</td>
              <td className="p-3 text-red-500 font-medium">Yes</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DisabledProducts;