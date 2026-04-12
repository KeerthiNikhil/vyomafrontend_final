import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "@/lib/axios";
import { toast } from "sonner";



type CartItem = {
  id: string; // ✅ USE id everywhere
  name: string;
  price: number;
  image: string;
  quantity: number;
  shop?: string;
};

type CartContextType = {
  cart: CartItem[];
  fetchCart: () => void;
  addToCart: (item: any) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ FETCH + NORMALIZE DATA
  const fetchCart = async () => {
    const res = await axios.get("/cart");

    const formatted = res.data.data.map((item: any) => ({
      id: item.productId, // 🔥 CONVERT HERE
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));

    setCart(formatted);
  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    fetchCart();
  }
}, []);

  // ADD
  const addToCart = async (item: any) => {
  try {
    await axios.post("/cart", {
      productId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      shop: item.shop,
    });

    toast.success("Added to cart 🛒");

    fetchCart();
  } catch (err) {
    console.error("❌ Add to cart failed", err);
  } 
};

  // INC
  const increaseQty = async (id: string) => {
    await axios.put("/cart", { productId: id, type: "inc" });
    fetchCart();
  };

  // DEC
  const decreaseQty = async (id: string) => {
    await axios.put("/cart", { productId: id, type: "dec" });
    fetchCart();
  };

  // REMOVE
  const removeFromCart = async (id: string) => {
    await axios.delete(`/cart/${id}`);
    fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("Cart error");
  return ctx;
};