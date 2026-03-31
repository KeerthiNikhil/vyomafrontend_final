import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import Home from "./pages/Home";
import ShopProducts from "./pages/ShopProducts";
import CategoryProducts from "@/pages/CategoryProducts";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ProductDetails from "@/pages/ProductDetails";
import Wishlist from "@/components/products/Wishlist";
import SearchPage from "./pages/SearchPage";
    

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<MainLayout />}>

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Product Details */}
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Cart + Wishlist */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Shop Page */}
          <Route path="/shop/:id" element={<ShopProducts />} />
          <Route path="/search" element={<SearchPage />} />

          {/* Category inside shop */}
          <Route
            path="/shop/:id/category/:slug"
            element={<CategoryProducts />}
          />

          {/* Checkout */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;