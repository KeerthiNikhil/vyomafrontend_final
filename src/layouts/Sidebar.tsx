import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Image,
  Package,
  Star,
  CreditCard,
  Users,
  LogOut,
  X
} from "lucide-react";
import { Button } from "../components/ui/button";

interface SidebarProps {
  closeSidebar?: () => void;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {

  const navigate = useNavigate();

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/banners", icon: Image, label: "Banners" },
    { to: "/products", icon: Package, label: "Products" },
    { to: "/reviews", icon: Star, label: "Reviews" },
    { to: "/payments", icon: CreditCard, label: "Payments" },
    { to: "/vendors", icon: Users, label: "Vendors" }
  ];

  const handleNavClick = () => {
    if (closeSidebar) {
      closeSidebar();
    }
  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

    if (closeSidebar) {
      closeSidebar();
    }

  };

  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col h-full">

      {/* Header */}
      <div className="p-4 sm:p-6 relative">

        <div className="bg-white rounded-lg p-3 shadow-md">
          <div className="flex items-center gap-2">

            <img
              src="/logo-for-web-blue.png"
              alt="VYOMA Logo"
              className="w-8 h-8 object-contain"
            />

            <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
              VYOMA
            </h1>

          </div>
        </div>

        {closeSidebar && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 sm:hidden text-white hover:bg-gray-800"
            onClick={closeSidebar}
          >
            <X className="w-5 h-5" />
          </Button>
        )}

      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">

        {navItems.map((item) => (

          <NavLink
            key={item.to}
            to={item.to}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors text-sm sm:text-base ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-blue-800"
              }`
            }
          >

            <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />

            <span>{item.label}</span>

          </NavLink>

        ))}

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-blue-800">

        <Button
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center justify-start w-full px-4 py-3 text-gray-300 hover:bg-blue-800 hover:text-white"
        >

          <LogOut className="w-5 h-5 mr-3" />

          Logout

        </Button>

      </div>

    </div>
  );
};

export default Sidebar;