import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Store,
  Layers,
  Package,
  ClipboardList,
  MessageSquare,
  Users,
  CreditCard,
  LogOut,
  User,
  Menu
} from "lucide-react";

const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile) {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "relative"
        }`}
      >
        <div className="flex flex-col h-full w-64 bg-blue-900 text-white">

          {/* Logo */}
          <div className="px-6 py-6 border-b border-blue-800">
            <h1 className="text-2xl font-bold">VYOMA</h1>
          </div>

          {/* Links */}
          <div className="flex-1 px-4 py-6 space-y-2">

            <SidebarLink name="Dashboard" path="/vendor/dashboard" icon={<LayoutDashboard size={18} />} />
            <SidebarLink
  name="Profile"
  path="/vendor/profile"
  icon={<User size={18} />}
/>
            <SidebarLink name="Create Shop" path="/vendor/shop-create" icon={<Store size={18} />} />
            <SidebarLink name="Categories" path="/vendor/categories" icon={<Store size={18} />} />
            <SidebarLink name="Disable Products" path="/vendor/disabled-products" icon={<Layers size={18} />} />
            <SidebarLink name="Products" path="/vendor/products" icon={<Package size={18} />} />
            <SidebarLink name="Pending Orders" path="/vendor/pending-orders" icon={<ClipboardList size={18} />} />
            <SidebarLink
  name="Delivered Orders"
  path="/vendor/delivered-orders"
  icon={<ClipboardList size={18} />}
/>
            <SidebarLink name="Reviews" path="/vendor/reviews" icon={<MessageSquare size={18} />} />
            <SidebarLink name="Customers" path="/vendor/customers" icon={<Users size={18} />} />
            <SidebarLink name="Payments" path="/vendor/payments" icon={<CreditCard size={18} />} />
            
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-blue-800">
            <button className="w-full flex items-center gap-2 bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg">
              <LogOut size={16} />
              Logout
            </button>
          </div>

        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {isMobile && (
          <header className="flex items-center justify-between p-4 bg-white shadow">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold">Vendor Dashboard</h1>
          </header>
        )}

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;

const SidebarLink = ({
  name,
  path,
  icon
}: {
  name: string;
  path: string;
  icon: React.ReactNode;
}) => {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
            isActive ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          {icon}
          <span>{name}</span>
        </div>
      )}
    </NavLink>
  );
};