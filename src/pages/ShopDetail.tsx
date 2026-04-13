import { useParams } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { useCart } from "@/context/CartContext";

/* ---------------- SHOP + PRODUCT DATA ---------------- */

import shop1 from "@/assets/images/shops/shop1.jpg";
import shop2 from "@/assets/images/shops/shop2.jpg";
import shop3 from "@/assets/images/shops/shop3.jpg";
import shop4 from "@/assets/images/shops/shop4.jpg";
import shop5 from "@/assets/images/shops/shop5.jpg";
import shop6 from "@/assets/images/shops/shop6.jpg";

import p1 from "@/assets/images/image.jpg";
import p2 from "@/assets/images/image2.jpg";
import p3 from "@/assets/images/image2.jpg";
import p4 from "@/assets/images/image4.jpg";

/* ---------------- SHOP DATA ---------------- */

const shops = [
  {
    shopId: "sri-lakshmi",
    name: "Sri Lakshmi Stores",
    location: "Hampankatta, Mangalore",
    rating: 4.6,
    image: shop1,
    products: [
      { id: "1", name: "Rice 5kg", price: 550, image: p1 },
      { id: "2", name: "Cooking Oil", price: 320, image: p2 },
      { id: "3", name: "Sugar 1kg", price: 55, image: p3 },
      { id: "4", name: "Wheat Flour", price: 240, image: p4 },
      { id: "5", name: "Tea Powder", price: 180, image: p1 },
    ],
  },
  {
    shopId: "apollo-pharmacy",
    name: "Apollo Pharmacy",
    location: "Bejai, Mangalore",
    rating: 4.7,
    image: shop2,
    products: [
      { id: "6", name: "Paracetamol", price: 40, image: p2 },
      { id: "7", name: "Vitamin Tablets", price: 190, image: p3 },
      { id: "8", name: "Cough Syrup", price: 120, image: p4 },
      { id: "9", name: "Pain Relief Gel", price: 90, image: p1 },
      { id: "10", name: "Hand Sanitizer", price: 60, image: p2 },
    ],
  },
  {
    shopId: "fresh-mart",
    name: "Fresh Mart",
    location: "Surathkal",
    rating: 4.5,
    image: shop3,
    products: [
      { id: "11", name: "Apples", price: 120, image: p1 },
      { id: "12", name: "Bananas", price: 60, image: p2 },
      { id: "13", name: "Tomatoes", price: 45, image: p3 },
      { id: "14", name: "Potatoes", price: 40, image: p4 },
      { id: "15", name: "Onions", price: 55, image: p1 },
    ],
  },
  {
    shopId: "daily-needs",
    name: "Daily Needs",
    location: "Kankanady",
    rating: 4.4,
    image: shop4,
    products: [
      { id: "16", name: "Bread Pack", price: 35, image: p2 },
      { id: "17", name: "Milk Packet", price: 50, image: p3 },
      { id: "18", name: "Eggs (12)", price: 75, image: p4 },
      { id: "19", name: "Butter", price: 110, image: p1 },
      { id: "20", name: "Cheese Slice", price: 95, image: p2 },
    ],
  },
  {
    shopId: "quick-buy",
    name: "Quick Buy",
    location: "Bendoor",
    rating: 4.6,
    image: shop5,
    products: [
      { id: "21", name: "Chips Pack", price: 30, image: p3 },
      { id: "22", name: "Soft Drink", price: 40, image: p4 },
      { id: "23", name: "Chocolate", price: 55, image: p1 },
      { id: "24", name: "Cookies", price: 65, image: p2 },
      { id: "25", name: "Energy Drink", price: 90, image: p3 },
    ],
  },
  {
    shopId: "super-market",
    name: "Super Market",
    location: "Balmata",
    rating: 5.0,
    image: shop6,
    products: [
      { id: "26", name: "Chips Pack", price: 30, image: p3 },
      { id: "27", name: "Soft Drink", price: 40, image: p4 },
      { id: "28", name: "Chocolate", price: 55, image: p1 },
      { id: "29", name: "Cookies", price: 65, image: p2 },
      { id: "30", name: "Energy Drink", price: 90, image: p3 },
    ],
  },
];

/* ---------------- COMPONENT ---------------- */

const ShopDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const shop = shops.find((s) => s.shopId === id);

  if (!shop) {
    return (
      <div className="py-20 text-center text-gray-500">
        Shop not found
      </div>
    );
  }

  return (
    <section className="bg-gray-50 pb-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* ---------------- SHOP BANNER ---------------- */}

        <div className="relative h-[220px] rounded-xl overflow-hidden mb-6">

          <img
            src={shop.image}
            alt={shop.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex items-end p-6">
            <div className="text-white">

              <h1 className="text-3xl font-bold">
                {shop.name}
              </h1>

              <div className="flex items-center gap-2 text-sm mt-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {shop.rating}
              </div>

            </div>
          </div>

        </div>

        {/* ---------------- SHOP LOCATION ---------------- */}

        <div className="flex items-center text-gray-600 mb-8">
          <MapPin className="w-4 h-4 mr-1" />
          {shop.location}
        </div>

        {/* ---------------- CATEGORY BUTTONS ---------------- */}

        <div className="flex gap-3 overflow-x-auto mb-10">

          <button className="px-4 py-2 rounded-full bg-black text-white text-sm">
            All
          </button>

          <button className="px-4 py-2 rounded-full bg-white border text-sm">
            Snacks
          </button>

          <button className="px-4 py-2 rounded-full bg-white border text-sm">
            Drinks
          </button>

          <button className="px-4 py-2 rounded-full bg-white border text-sm">
            Grocery
          </button>

        </div>

        {/* ---------------- PRODUCTS GRID ---------------- */}

        <h2 className="text-xl font-semibold mb-6">
          Products Available
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-14">

          {shop.products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              shop={shop.shopId}
            />
          ))}

        </div>

        {/* ---------------- RELATED PRODUCTS ---------------- */}

        <h2 className="text-xl font-semibold mb-6">
          You may also like
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {shop.products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default ShopDetail;