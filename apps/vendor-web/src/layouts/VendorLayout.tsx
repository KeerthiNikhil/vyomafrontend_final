import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  User,
  Store,
  Package,
  Layers,
  ClipboardList,
  CreditCard,
  Truck,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
} from "lucide-react";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";

const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [openProducts, setOpenProducts] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [openDelivery, setOpenDelivery] = useState(false);

  const goToUserApp = () => {
  const token = localStorage.getItem("token");

  window.location.href = `http://localhost:5173?token=${token}`;
};

  const handleVendorLogout = () => {
  localStorage.removeItem("vendorToken");

  // redirect to user app with flag
  window.location.href = "http://localhost:5173/?showVendorModal=true";
};
  
   useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile) setSidebarOpen(true);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navigate = useNavigate();

useEffect(() => {
  const checkVendor = async () => {
    try {
      const res = await axios.get("/auth/me");

      // ✅ correct check
      if (res.data.user.role !== "vendor") {
        window.location.href = "/vendor/verify";
      }

    } catch (err) {
      // ✅ only redirect once safely
      window.location.href = "/";
    }
  };

  checkVendor();
}, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

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
            : ""
        }`}
      >
        <div className="w-64 bg-blue-900 text-white h-screen sticky top-0 flex flex-col">

          {/* Logo */}
          <div className="px-6 py-6 border-b border-blue-800">
            <h1 className="text-2xl font-bold">VYOMA</h1>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2 text-sm">
            <button
  onClick={goToUserApp}
  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg transition mt-2 bg-blue-500/20 hover:bg-blue-500/30 text-white"
>
  🏠 Switch to User App
</button>

            <SidebarLink name="Dashboard" path="/vendor/dashboard" icon={<LayoutDashboard size={18} />} />
            <SidebarLink name="Profile" path="/vendor/profile" icon={<User size={18} />} />
            <SidebarLink name="Create Shop" path="/vendor/create-shop" icon={<Store size={18} />} />

            <ExpandableMenu title="Products" icon={<Package size={18} />} isOpen={openProducts} setIsOpen={setOpenProducts}>
              <SidebarLink name="Add Product" path="/vendor/products/add" />
              <SidebarLink name="Manage Product" path="/vendor/products/manage" />
            </ExpandableMenu>

            <ExpandableMenu title="Category" icon={<Layers size={18} />} isOpen={openCategories} setIsOpen={setOpenCategories}>
              <SidebarLink name="Add Category" path="/vendor/category/add" />
              <SidebarLink name="Edit Category" path="/vendor/category/edit" />
            </ExpandableMenu>

            <ExpandableMenu title="Orders" icon={<ClipboardList size={18} />} isOpen={openOrders} setIsOpen={setOpenOrders}>
              <SidebarLink name="Pending Orders" path="/vendor/orders/pending" />
              <SidebarLink name="Delivered Orders" path="/vendor/orders/delivered" />
            </ExpandableMenu>

            <SidebarLink name="Payments" path="/vendor/payments" icon={<CreditCard size={18} />} />

            <ExpandableMenu title="Delivery" icon={<Truck size={18} />} isOpen={openDelivery} setIsOpen={setOpenDelivery}>
              <SidebarLink name="Delivery Boys" path="/vendor/delivery/boys" />
              <SidebarLink name="Assign Delivery" path="/vendor/delivery/assign" />
            </ExpandableMenu>

            <SidebarLink name="Reviews" path="/vendor/reviews" icon={<MessageSquare size={18} />} />
            <SidebarLink 
               name="Subscription" 
              path="/vendor/subscription" 
              icon={<IndianRupee size={18} />} 
              />
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-blue-800">
           <button
  onClick={handleVendorLogout}
  className="w-full flex items-center gap-2 bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
>
  <LogOut size={16} />
  Logout
</button>
          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col flex-1 min-h-screen">

        {isMobile && (
          <header className="flex items-center justify-between p-4 bg-white shadow">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold">Vendor Dashboard</h1>
          </header>
        )}

        {/* Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-600 py-4 border-t bg-white">
          <p>© 2026 VYOMA Marketplace. All Rights Reserved.</p>
          <p>Developed by • Email: vinyasagroup@gmail.com</p>
        </footer>

      </div>

    </div>
  );
};

export default VendorLayout;

/* Sidebar Link */
const SidebarLink = ({ name, path, icon }: any) => (
  <NavLink to={path}>
    {({ isActive }) => (
      <div
        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition cursor-pointer ${
          isActive ? "bg-white/20" : "hover:bg-white/10"
        }`}
      >
        {icon}
        <span>{name}</span>
      </div>
    )}
  </NavLink>
);

/* Expandable Menu */
const ExpandableMenu = ({ title, icon, isOpen, setIsOpen, children }: any) => (
  <div>
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-white/10 transition"
    >
      <div className="flex items-center gap-3">
        {icon}
        {title}
      </div>

      {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </button>

    {isOpen && <div className="ml-8 mt-2 space-y-1 text-sm">{children}</div>}
  </div>
);