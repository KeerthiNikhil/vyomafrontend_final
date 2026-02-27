import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VendorLayout from "../layouts/VendorLayout";

import ShopDashboard from "../pages/ShopDashboard";
import ShopCreate from "../pages/ShopCreate";
import Profile from "../pages/Profile";

import AddProduct from "../pages/AddProduct";
import ManageProduct from "../pages/ManageProduct";

import AddCategory from "../pages/AddCategory";
import EditCategory from "../pages/EditCategory";

import PendingOrders from "../pages/PendingOrders";
import DeliveredOrders from "../pages/DeliveredOrders";

import Payments from "../pages/Payments";
import Reviews from "../pages/Reviews";

import AsignDelivery from "../pages/AsignDelivery";
import DeliveryBoys from "../pages/DeliveryBoys";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Vendor Layout */}
        <Route path="/vendor" element={<VendorLayout />}>

          {/* Default */}
          <Route index element={<ShopDashboard />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<ShopDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shop-create" element={<ShopCreate />} />

          {/* Products */}
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/manage" element={<ManageProduct />} />

          {/* Category */}
          <Route path="category/add" element={<AddCategory />} />
          <Route path="category/edit" element={<EditCategory />} />

          {/* Orders */}
          <Route path="orders/pending" element={<PendingOrders />} />
          <Route path="orders/delivered" element={<DeliveredOrders />} />

          {/* Payments */}
          <Route path="payments" element={<Payments />} />

          {/* Delivery Section */}
          <Route path="delivery/boys" element={<DeliveryBoys />} />
          <Route path="delivery/assign" element={<AsignDelivery />} />

          {/* Reviews */}
          <Route path="reviews" element={<Reviews />} />

        </Route>

        {/* Root Redirect */}
        <Route path="/" element={<Navigate to="/vendor" />} />

      </Routes>
    </BrowserRouter>
  );
}