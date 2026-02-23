import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  LayoutDashboard,
  Store,
  Layers,
  Package,
  ClipboardList,
  MessageSquare,
  Users,
  CreditCard,
  LogOut,
  ChevronDown,
  ChevronRight
} from "lucide-react";

const VendorLayout = () => {
  const [open, setOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  const location = useLocation();

  /* 🔥 AUTO OPEN DROPDOWN WHEN INSIDE ROUTE */
  useEffect(() => {
    if (location.pathname.includes("/vendor/categories") ||
        location.pathname.includes("/vendor/products") ||
        location.pathname.includes("/vendor/disabled-products")) {
      setCatalogOpen(true);
    }

    if (location.pathname.includes("/vendor/orders")) {
      setOrdersOpen(true);
    }
  }, [location.pathname]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-700 to-indigo-800 text-white p-6 w-64">

      <h2 className="text-2xl font-bold mb-8">Vyoma Vendor</h2>

      <nav className="space-y-2 flex-1">

        <SidebarLink
          name="Dashboard"
          path="/vendor"
          icon={<LayoutDashboard size={18} />}
          onClick={() => setOpen(false)}
        />

        <SidebarLink
          name="Create Shop"
          path="/vendor/create-shop"
          icon={<Store size={18} />}
          onClick={() => setOpen(false)}
        />

        <SidebarLink
          name="Shop Details"
          path="/vendor/shop-details"
          icon={<Store size={18} />}
          onClick={() => setOpen(false)}
        />

        {/* CATALOG */}
        <div>
          <Button
            variant="ghost"
            onClick={() => setCatalogOpen(!catalogOpen)}
            className="w-full justify-between text-white hover:bg-white/10 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <Package size={18} />
              Catalog
            </span>
            {catalogOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </Button>

          {catalogOpen && (
            <div className="ml-6 mt-2 space-y-2">
              <SidebarLink
                name="Categories"
                path="/vendor/categories"
                icon={<Layers size={16} />}
                onClick={() => setOpen(false)}
              />
              <SidebarLink
                name="All Products"
                path="/vendor/products"
                icon={<Package size={16} />}
                onClick={() => setOpen(false)}
              />
              <SidebarLink
                name="Disabled Products"
                path="/vendor/disabled-products"
                icon={<Package size={16} />}
                onClick={() => setOpen(false)}
              />
            </div>
          )}
        </div>

        {/* ORDERS */}
        <div>
          <Button
            variant="ghost"
            onClick={() => setOrdersOpen(!ordersOpen)}
            className="w-full justify-between text-white hover:bg-white/10 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <ClipboardList size={18} />
              Orders
            </span>
            {ordersOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </Button>

          {ordersOpen && (
            <div className="ml-6 mt-2 space-y-2">
              <SidebarLink
                name="Pending Orders"
                path="/vendor/orders/pending"
                icon={<ClipboardList size={16} />}
                onClick={() => setOpen(false)}
              />
              <SidebarLink
                name="Delivered Orders"
                path="/vendor/orders/delivered"
                icon={<ClipboardList size={16} />}
                onClick={() => setOpen(false)}
              />
            </div>
          )}
        </div>

        <SidebarLink
          name="Reviews"
          path="/vendor/reviews"
          icon={<MessageSquare size={18} />}
          onClick={() => setOpen(false)}
        />

        <SidebarLink
          name="Customers"
          path="/vendor/customers"
          icon={<Users size={18} />}
          onClick={() => setOpen(false)}
        />

        <SidebarLink
          name="Payments"
          path="/vendor/payments"
          icon={<CreditCard size={18} />}
          onClick={() => setOpen(false)}
        />
      </nav>

      <SidebarLink
        name="Logout"
        path="/login"
        icon={<LogOut size={18} />}
        onClick={() => setOpen(false)}
      />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-muted/30">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarContent />
      </div>

      {/* Mobile */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between p-4 bg-white shadow">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <h1 className="font-semibold text-lg">Vendor Panel</h1>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;

/* SidebarLink */

const SidebarLink = ({
  name,
  path,
  icon,
  onClick
}: {
  name: string;
  path: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <NavLink
      to={path}
      end={path === "/vendor"}
      onClick={onClick}
    >
      {({ isActive }) => (
        <Button
          variant="ghost"
          className={`
            w-full justify-start gap-2 
            text-white 
            rounded-lg 
            transition-all duration-200
            ${
              isActive
                ? "bg-white/20 backdrop-blur-sm"
                : "hover:bg-white/10"
            }
          `}
        >
          {icon}
          {name}
        </Button>
      )}
    </NavLink>
  );
};