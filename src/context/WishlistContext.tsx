import { createContext, useContext, useState, useEffect } from "react";
import axios from "@/lib/axios";

const WishlistContext = createContext<any>(null);

export const WishlistProvider = ({ children }: any) => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  // 🔥 FETCH
  const fetchWishlist = async () => {
    try {
      const res = await axios.get("/wishlist");
      setWishlist(res.data.data || []);
    } catch (err) {
      console.log("Wishlist fetch error", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ➕ ADD
  // ➕ ADD (instant UI)
const addToWishlist = async ({ id }: { id: string }) => {
  setWishlist((prev) => [...prev, { _id: id }]); // instant UI

  try {
    await axios.post("/wishlist", { productId: id });
  } catch (err) {
    fetchWishlist(); // rollback
  }
};

// ❌ REMOVE (instant UI)
const removeFromWishlist = async (id: string) => {
  setWishlist((prev) => prev.filter((item) => item._id !== id));

  try {
    await axios.delete(`/wishlist/${id}`);
  } catch (err) {
    fetchWishlist(); // rollback
  }
};

  // ❤️ CHECK
  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item._id === id);
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