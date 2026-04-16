import React, { createContext, useContext, useState } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  active: boolean;
  image: string;
}

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Basmati Rice",
      price: 120,
      stock: 50,
      category: "Groceries",
      active: true,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31b",
    },
    {
      id: 2,
      name: "Coca Cola",
      price: 40,
      stock: 120,
      category: "Beverages",
      active: true,
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505",
    },
    {
      id: 3,
      name: "Potato Chips",
      price: 20,
      stock: 0,
      category: "Snacks",
      active: false,
      image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60",
    },
  ]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};