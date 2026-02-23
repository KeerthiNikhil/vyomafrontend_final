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
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ================= VENDOR ================= */}
         <Route
           path="/vendor"
           element={
           <ProductProvider>
           <VendorLayout />
           </ProductProvider>
           }
           >

        {/* Dashboard */}
        <Route index element={<VendorDashboard />} />
        <Route path="dashboard" element={<VendorDashboard />} />

        {/* Shop */}
        <Route path="create-shop" element={<CreateShop />} />
        <Route path="shop-details" element={<ShopDetails />} />

        {/* Catalog */}
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="disabled-products" element={<DisabledProducts />} />

        {/* Orders */}
        <Route path="orders/pending" element={<PendingOrders />} />
        <Route path="orders/delivered" element={<DeliveredOrders />} />

        {/* Other */}
        <Route path="reviews" element={<Reviews />} />
        <Route path="customers" element={<Customers />} />
        <Route path="payments" element={<Payments />} />

      </Route>

    </Routes>
  );
};

export default AppRoutes;