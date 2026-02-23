import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";

/* product images */
import p1 from "@/assets/images/product/redchilli.jpg";
import p2 from "@/assets/images/product/turmeric.jpg";
import p3 from "@/assets/images/product/mobile.jpg";
import p4 from "@/assets/images/product/laptop.jpg";
import p5 from "@/assets/images/product/tablet.jpg";
import p6 from "@/assets/images/product/vitamin.jpg";
import p7 from "@/assets/images/product/books.jpg";
import p8 from "@/assets/images/product/pen.jpg";
import p9 from "@/assets/images/product/rice.jpg";
import p10 from "@/assets/images/product/dal.jpg";
import p11 from "@/assets/images/product/food1.jpg";
import p12 from "@/assets/images/product/biriyani.jpg";

/* ---------- TYPES ---------- */

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

/* ---------- SHOP BASED PRODUCT DATA ---------- */

const shopProducts: Record<string, Product[]> = {
  "sri-lakshmi": [
    { id: 1, name: "Basmati Rice", price: 450, image: p9, category: "rice" },
    { id: 2, name: "Sona Masoori Rice", price: 380, image: p9, category: "rice" },
    { id: 3, name: "Brown Rice", price: 420, image: p9, category: "rice" },

    { id: 4, name: "Sunflower Oil", price: 180, image: p2, category: "oils" },
    { id: 5, name: "Coconut Oil", price: 220, image: p2, category: "oils" },

    { id: 6, name: "Chilli Powder", price: 120, image: p1, category: "spices" },
    { id: 7, name: "Turmeric Powder", price: 90, image: p2, category: "spices" },

    { id: 8, name: "Chicken Biriyani", price: 150, image: p12, category: "food" },
  ],

  "apollo-pharmacy": [
    { id: 9, name: "Paracetamol", price: 30, image: p5, category: "pharmacy" },
    { id: 10, name: "Vitamin Tablets", price: 120, image: p6, category: "pharmacy" },
  ],
};

/* ---------- COMPONENT ---------- */

const CategoryProducts = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();

  // Scroll to top when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get products for selected shop & category
  const filteredProducts =
    shopProducts[id as keyof typeof shopProducts]?.filter(
      (item) => item.category === slug
    ) || [];

  return (
    <section className="py-6 sm:py-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-bold capitalize mb-5">
          {slug?.replace("-", " ")} varieties
        </h1>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <p className="text-gray-500 text-sm">
            No products available in this category.
          </p>
        )}

        {/* Products Grid */}
        <div
          className="
            grid grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            gap-4 sm:gap-6
          "
        >
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryProducts;
