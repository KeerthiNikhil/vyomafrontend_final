import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VendorLayout from "../layouts/VendorLayout";

import ShopDashboard from "../pages/ShopDashboard";
import ShopCreate from "../pages/ShopCreate";
import Profile from "../pages/Profile";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
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

        <Route path="/vendor" element={<VendorLayout />}>

          <Route index element={<ShopDashboard />} />

          <Route path="dashboard" element={<ShopDashboard />} />
          <Route path="shop-create" element={<ShopCreate />} />
          <Route path="profile" element={<Profile />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="disabled-products" element={<DisabledProducts />} />
          <Route path="pending-orders" element={<PendingOrders />} />
          <Route path="delivered-orders" element={<DeliveredOrders />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="customers" element={<Customers />} />
<Route path="payments" element={<Payments />} />

        </Route>

        <Route path="/" element={<Navigate to="/vendor" />} />

      </Routes>
    </BrowserRouter>
  );
}