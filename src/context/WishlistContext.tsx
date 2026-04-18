import { createContext, useContext, useState, useEffect } from "react";
import axios from "@/lib/axios";

const WishlistContext = createContext<any>(null);

export const WishlistProvider = ({ children }: any) => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  // 🔥 FETCH
 const fetchWishlist = async () => {
  try {
    const res = await axios.get("/wishlist");

    const formatted = res.data.data
  .map((item: any) => item.product)
  .filter((item: any) => item && item._id);

    setWishlist(formatted);
  } catch (err) {
    console.log("Wishlist fetch error", err);
  }
};

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ➕ ADD
  // ➕ ADD (instant UI)
const addToWishlist = async (product: any) => {
  setWishlist((prev) => {
  if (!product || !product._id) return prev;

  if (prev.some((item) => item?._id === product._id)) return prev;

  return [...prev, product];
});

  try {
    await axios.post("/wishlist", { productId: product._id });
  } catch (err) {
    fetchWishlist();
  }
};

// ❌ REMOVE (instant UI)
const removeFromWishlist = async (id: string) => {
 setWishlist((prev) => prev.filter((item) => item && item._id !== id)); 

  try {
    await axios.delete(`/wishlist/${id}`);
  } catch (err) {
    fetchWishlist(); // rollback
  }
};

  // ❤️ CHECK
  const isInWishlist = (id: string) => {
  return wishlist.some((item) => item && item._id === id);
};

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);