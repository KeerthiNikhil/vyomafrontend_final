import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

import Home from "./pages/Home";
import ShopDetails from "./pages/ShopDetails";
import CategoryProducts from "@/pages/CategoryProducts";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ProductDetails from "@/pages/ProductDetails";
import Wishlist from "@/pages/Wishlist";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            
            {/* Pages WITH navbar */}
            <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
             <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
             <Route path="/wishlist" element={<Wishlist />} />
             <Route path="/shop/:id" element={<ShopDetails />} />
             <Route
  path="/shop/:id/category/:slug"
  element={<CategoryProducts />}
/>

             
            </Route>

            {/* <Route path="/shop/:id" element={<ShopDetails />} />
             <Route path="/category/:slug" element={<CategoryProducts />} /> */}
             

          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
