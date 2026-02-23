import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VendorLayout from "../layouts/VendorLayout";

import VendorDashboard from "../pages/VendorDashboard";
import CreateShop from "../pages/CreateShop";
import ShopDetails from "../pages/ShopDetails";
import Categories from "../pages/Categories";
import AllProducts from "../pages/AllProducts";
import DisabledProducts from "../pages/DisabledProducts";
import PendingOrders from "../pages/PendingOrders";
import DeliveredOrders from "../pages/DeliveredOrders";
import Reviews from "../pages/Reviews";
import Customers from "../pages/Customers";
import Payments from "../pages/Payments";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Vendor Routes */}
        <Route path="/vendor" element={<VendorLayout />}>

          {/* Default when visiting /vendor */}
          <Route index element={<VendorDashboard />} />

          <Route path="create-shop" element={<CreateShop />} />
          <Route path="shop-details" element={<ShopDetails />} />

          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="disabled-products" element={<DisabledProducts />} />

          <Route path="orders">
            <Route path="pending" element={<PendingOrders />} />
            <Route path="delivered" element={<DeliveredOrders />} />
          </Route>

          <Route path="reviews" element={<Reviews />} />
          <Route path="customers" element={<Customers />} />
          <Route path="payments" element={<Payments />} />

        </Route>

        {/* Redirect root to vendor */}
        <Route path="/" element={<Navigate to="/vendor" />} />

      </Routes>
    </BrowserRouter>
  );
}