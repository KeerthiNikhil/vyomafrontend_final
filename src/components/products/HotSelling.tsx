<<<<<<< HEAD
import { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { getAllProducts } from "@/services/product.service";
import type  { Product } from "@/types/product";

const HotSelling = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();

        // Backend already formatted the structure
        setProducts(data);

      } catch (err) {
        console.error("Product fetch error:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-10 text-center">
        <p className="text-gray-500">Loading products...</p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-10 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-royal pb-6">
          Hot Selling
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center">
            No products available.
          </p>
        ) : (
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
=======
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

const HotSelling = () => {
  return (
    <section className="py-1 overflow-hidden">
      <div className="max-w-7xl mx-auto px-0">
<h2 className="text-xl sm:text-2xl font-bold mb-1 pb-4">

          Hot Selling
        </h2>

        <div className="relative overflow-hidden">
          <div className="marquee flex">
            {[...products, ...products].map((item, index) => (
              <div key={index} className="mr-6 shrink-0">
                <ProductCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  weight={item.weight}
                />
              </div>
            ))}
          </div>
        </div>
>>>>>>> origin/main
      </div>
    </section>
  );
};

export default HotSelling;
