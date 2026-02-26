import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { month: "Jan", orders: 12, revenue: 4000 },
  { month: "Feb", orders: 18, revenue: 6200 },
  { month: "Mar", orders: 25, revenue: 8900 },
  { month: "Apr", orders: 15, revenue: 5200 },
  { month: "May", orders: 30, revenue: 11000 },
];

const ShopDashboard = () => {
  return (
    <div className="space-y-10">

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold">Shop Dashboard</h1>
        <p className="text-gray-500">Overview of your shop performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <CardItem title="Total Products" value="12" />
        <CardItem title="Confirmed Orders" value="8" />
        <CardItem title="Pending Orders" value="3" />
        <CardItem title="Confirmed Payments" value="7" />
        <CardItem title="Pending Payments" value="2" />
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Orders Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Monthly Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#1e3a8a" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

const CardItem = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <p className="text-gray-500">{title}</p>
    <h3 className="text-3xl font-bold mt-2">{value}</h3>
  </div>
);

export default ShopDashboard;