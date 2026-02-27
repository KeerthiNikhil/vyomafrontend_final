import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const initialProducts = [
  {
    id: 1,
    name: "Premium Rice",
    price: 500,
    status: "Active",
    stock: 120,
    image: "https://picsum.photos/60?random=1",
  },
  {
    id: 2,
    name: "Organic Apples",
    price: 250,
    status: "Disabled",
    stock: 8,
    image: "https://picsum.photos/60?random=2",
  },
  {
    id: 3,
    name: "Laptop",
    price: 45000,
    status: "Active",
    stock: 0,
    image: "https://picsum.photos/60?random=3",
  },
];

const COLORS = ["#1d4ed8", "#ef4444"];

const ManageProduct = () => {
  const [products, setProducts] = useState(initialProducts);

  const stockChartData = products.map((p) => ({
    name: p.name,
    stock: p.stock,
  }));

  const statusData = [
    {
      name: "Active",
      value: products.filter((p) => p.status === "Active").length,
    },
    {
      name: "Disabled",
      value: products.filter((p) => p.status === "Disabled").length,
    },
  ];

  const getStockBadge = (stock: number) => {
    if (stock === 0)
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
          Out of Stock
        </span>
      );

    if (stock < 10)
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
          Low Stock
        </span>
      );

    return (
      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
        In Stock
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <p className="text-gray-500 mt-1">
          Monitor stock levels and product performance
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500 text-sm">Total Products</p>
          <h2 className="text-2xl font-bold mt-1">
            {products.length}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500 text-sm">Active Products</p>
          <h2 className="text-2xl font-bold mt-1 text-green-600">
            {statusData[0].value}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500 text-sm">Low / Out Stock</p>
          <h2 className="text-2xl font-bold mt-1 text-red-600">
            {
              products.filter((p) => p.stock < 10).length
            }
          </h2>
        </div>

      </div>

      {/* GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* STOCK GRAPH */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold mb-4">
            Stock Overview
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#1d4ed8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* STATUS PIE CHART */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold mb-4">
            Product Status Distribution
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                outerRadius={80}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg"
                  />
                  <span className="font-medium">
                    {product.name}
                  </span>
                </td>

                <td className="p-4">₹{product.price}</td>

                <td className="p-4">
                  {getStockBadge(product.stock)}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      product.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

                <td className="p-4 text-right space-x-3">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageProduct;