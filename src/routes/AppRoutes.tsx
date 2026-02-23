import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import VendorLayout from "apps/vendor-web/src/layouts/VendorLayout";

/* ================= PUBLIC ================= */
import Home from "@/pages/Home";
import SearchResults from "@/pages/SearchResults";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

/* ================= VENDOR ================= */
import VendorDashboard from "@/pages/vendor/VendorDashboard";
import CreateShop from "@/pages/vendor/CreateShop";
import Categories from "@/pages/vendor/Categories";
import DisabledProducts from "@/pages/vendor/DisabledProducts";
import PendingOrders from "@/pages/vendor/PendingOrders";
import DeliveredOrders from "@/pages/vendor/DeliveredOrders";
import Reviews from "@/pages/vendor/Reviews";
import Customers from "@/pages/vendor/Customers";
import Payments from "@/pages/vendor/Payments";
import ShopDetails from "@/pages/vendor/ShopDetails";
import AllProducts from "apps/vendor-web/src/pages/AllProducts";
import { ProductProvider } from "apps/vendor-web/src/context/ProductContext";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />


      </Route>

    </Routes>
  );
};

export default AppRoutes;