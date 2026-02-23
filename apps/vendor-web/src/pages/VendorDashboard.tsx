import {
  DollarSign,
  Package,
  ShoppingCart,
  Star,
  Plus,
  ClipboardList,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your shop performance and activity.
          </p>
        </div>

        <Button
          onClick={() => navigate("/vendor/add-product")}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Today's Sales"
          value="₹12,480"
          growth="+10% from yesterday"
          icon={<DollarSign />}
        />

        <StatCard
          title="Total Products"
          value="86"
          growth="4 inactive"
          icon={<Package />}
        />

        <StatCard
          title="Total Orders"
          value="214"
          growth="12 pending"
          icon={<ShoppingCart />}
        />

        <StatCard
          title="Average Rating"
          value="4.6"
          growth="Based on 148 reviews"
          icon={<Star />}
        />

      </div>

      {/* LOWER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* RECENT ORDERS */}
        <Card className="lg:col-span-2 rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-6">

            <div>
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <p className="text-muted-foreground text-sm">
                Latest orders placed in your shop
              </p>
            </div>

            <OrderItem name="Order #1024" status="Delivered" amount="₹480" />
            <OrderItem name="Order #1025" status="Pending" amount="₹1,250" />
            <OrderItem name="Order #1026" status="Processing" amount="₹760" />

          </CardContent>
        </Card>

        {/* QUICK ACTIONS */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-6">

            <div>
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <p className="text-muted-foreground text-sm">
                Frequently used features
              </p>
            </div>

            <QuickAction
              label="Manage Products"
              onClick={() => navigate("/vendor/products")}
            />

            <QuickAction
              label="View Orders"
              onClick={() => navigate("/vendor/orders")}
            />

            <QuickAction
              label="Check Reviews"
              onClick={() => navigate("/vendor/reviews")}
            />

            <QuickAction
              label="Update Shop Details"
              onClick={() => navigate("/vendor/shop-details")}
            />

          </CardContent>
        </Card>

      </div>

    </div>
  );
};

export default VendorDashboard;

/* ================= COMPONENTS ================= */

const StatCard = ({ title, value, growth, icon }: any) => (
  <Card className="rounded-2xl shadow-sm">
    <CardContent className="p-6 flex justify-between items-center">

      <div>
        <p className="text-muted-foreground text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p className="text-green-500 text-sm mt-1">{growth}</p>
      </div>

      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
        {icon}
      </div>

    </CardContent>
  </Card>
);

const OrderItem = ({ name, status, amount }: any) => {
  const statusColor =
    status === "Delivered"
      ? "text-green-600"
      : status === "Pending"
      ? "text-yellow-600"
      : "text-blue-600";

  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl">
      <div>
        <p className="font-medium">{name}</p>
        <p className={`text-sm ${statusColor}`}>{status}</p>
      </div>
      <p className="font-semibold">{amount}</p>
    </div>
  );
};

const QuickAction = ({ label, onClick }: any) => (
  <button
    onClick={onClick}
    className="w-full text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-xl transition"
  >
    {label}
  </button>
);