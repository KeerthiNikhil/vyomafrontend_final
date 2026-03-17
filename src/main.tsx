import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Toaster } from "sonner";

import App from "./App";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

ReactDOM.createRoot(document.getElementById("root")!).render(

    <CartProvider>
      <WishlistProvider>

        <App />

        <Toaster position="top-right" richColors />

      </WishlistProvider>
    </CartProvider>
);