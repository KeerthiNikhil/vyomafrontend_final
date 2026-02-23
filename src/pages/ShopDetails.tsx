<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/product";

interface Shop {
  _id: string;
  name: string;
  description?: string;
  address: string;
}

const ShopDetail = () => {
  const { id } = useParams(); // shopId from URL

  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        // 1️⃣ Get shop details
        const shopRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/shops/${id}`
        );

        setShop(shopRes.data.data);

        // 2️⃣ Get products of that shop
        const productRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products/shop/${id}`
        );

        setProducts(productRes.data.data);
      } catch (err) {
        console.error("Shop fetch error:", err);
        setError("Failed to load shop data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchShopData();
  }, [id]);

  if (loading) {
    return (
      <section className="py-10 text-center">
        <p>Loading shop...</p>
      </section>
    );
  }

  if (error || !shop) {
    return (
      <section className="py-10 text-center">
        <p className="text-red-500">{error || "Shop not found"}</p>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Shop Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">{shop.name}</h1>
          <p className="text-gray-500">{shop.address}</p>
        </div>

        {/* Products */}
        <h2 className="text-xl font-semibold mb-4">
          Products Available
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No products available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
=======
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Star, Search } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

/* ---------------- IMAGES ---------------- */

import shop1 from "@/assets/images/shops/shop1.jpg";
import shop2 from "@/assets/images/shops/shop2.jpg";

import p1 from "@/assets/images/image.jpg";
import p2 from "@/assets/images/image2.jpg";
import p3 from "@/assets/images/image2.jpg";
import p4 from "@/assets/images/image4.jpg";

import banner2 from "@/assets/images/banner2.jpg.jpeg";
import banner3 from "@/assets/images/banner3.jpg";

import logo from "@/assets/images/logo.jpg.png";

import cat1 from "@/assets/images/categories/grocery.png";
import cat2 from "@/assets/images/categories/snacks.png";
import cat3 from "@/assets/images/categories/juice.png";
import cat4 from "@/assets/images/categories/fruits.png";
import cat5 from "@/assets/images/categories/vegitable.png.jpg";

/* ---------------- TYPES ---------------- */

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Shop = {
  shopId: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  products: Product[];
};

type Category = {
  name: string;
  slug: string;
  icon: string;
};

type ProductCategory = {
  name: string;
  slug: string;
  image: string;
};

/* ---------------- CATEGORY DATA ---------------- */

const categories: Category[] = [
  { name: "Grocery", slug: "grocery", icon: cat1 },
  { name: "Snacks", slug: "snacks", icon: cat2 },
  { name: "Drinks", slug: "drinks", icon: cat3 },
  { name: "Fruits", slug: "fruits", icon: cat4 },
  { name: "Vegetables", slug: "vegetables", icon: cat5 },
];

const productCategories: ProductCategory[] = [
  {
    name: "Rice",
    slug: "rice",
    image: p1,
  },
  {
    name: "Cooking Oils",
    slug: "oils",
    image: p2,
  },
  {
    name: "Masalas",
    slug: "masalas",
    image: p3,
  },
  {
    name: "Groceries",
    slug: "groceries",
    image: p4,
  },
];

/* ---------------- SHOP DATA ---------------- */

const shops: Shop[] = [
  {
    shopId: "sri-lakshmi",
    name: "Sri Lakshmi Stores",
    location: "Hampankatta, Mangalore",
    rating: 4.6,
    image: shop1,
    products: [
      { id: 1, name: "Rice 5kg", price: 550, image: p1 },
      { id: 2, name: "Cooking Oil", price: 320, image: p2 },
      { id: 3, name: "Sugar", price: 55, image: p3 },
      { id: 4, name: "Wheat Flour", price: 240, image: p4 },
      { id: 5, name: "Tea Powder", price: 180, image: p1 },
      { id: 6, name: "Salt", price: 30, image: p2 },
      { id: 7, name: "Masala", price: 90, image: p3 },
      { id: 8, name: "Dal", price: 140, image: p4 },
    ],
  },
  {
    shopId: "apollo-pharmacy",
    name: "Apollo Pharmacy",
    location: "Bejai, Mangalore",
    rating: 4.7,
    image: shop2,
    products: [
      { id: 9, name: "Paracetamol", price: 40, image: p2 },
      { id: 10, name: "Vitamin Tablets", price: 190, image: p3 },
    ],
  },
];

/* ---------------- COMPONENT ---------------- */

const ShopDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shop = shops.find((s) => s.shopId === id);

  if (!shop) {
    return (
      <div className="py-20 text-center text-gray-500">
        Shop not found
      </div>
    );
  }

  /* 🔍 FILTER PRODUCTS */
  const filteredProducts = shop.products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <h2 className="text-xl sm:text-2xl font-bold text-royal pb-6">
          Shop Details
        </h2>

        {/* SHOP INFO */}
        <div className="flex flex-col sm:flex-row gap-5 mb-6">
          <img
            src={shop.image}
            alt={shop.name}
            className="w-full sm:w-56 h-40 object-cover rounded-xl"
          />

          <div>
            <div className="flex items-center gap-3 mb-1">
              <img
                src={logo}
                alt="Shop Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
              />
              <h1 className="text-xl sm:text-2xl font-bold">
                {shop.name}
              </h1>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {shop.location}
            </div>

            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs mt-2 w-fit">
              <Star className="w-3 h-3 fill-green-600" />
              {shop.rating}
            </div>
          </div>
        </div>

        {/* CATEGORY SCROLL */}
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide mb-5">
  {categories.map((category) => (
    <button
      key={category.slug}
      onClick={() =>
        navigate(`/shop/${shop.shopId}/category/${category.slug}`)
      }
      className="flex flex-col items-center flex-shrink-0"
    >
      <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm">
        <img
          src={category.icon}
          className="w-full h-full object-cover"
        />
      </div>

      <span className="text-xs mt-1">{category.name}</span>
    </button>
  ))}
</div>


        {/* 🔍 Animated Search */}
<div className="flex justify-center my-4 sm:my-6">

  <div className="relative w-full max-w-full group">

    {/* Search Icon */}
    <Search className="
      absolute left-3 top-1/2 -translate-y-1/2
      text-gray-900 w-4 h-4 sm:w-5 sm:h-5
      transition-all duration-300
      group-focus-within:text-blue-500
    " />

    {/* Input */}
    <Input
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="
        pl-9 sm:pl-11
        pr-4
        h-10 sm:h-11
        text-sm
        rounded-full

        bg-gray-300
        border border-transparent

        transition-all duration-300 ease-in-out
        focus:bg-white
        focus:border-blue-200
        focus:shadow-md

        focus-visible:ring-0
        outline-none

        overflow-hidden
        text-ellipsis
        whitespace-nowrap
      "
    />

  </div>
</div>


        {/* BANNER */}
        <img src={banner2} className="w-full rounded-xl mb-6" />

        {/* 🛒 Available Product Categories */}
<h2 className="text-lg sm:text-xl font-semibold mb-4">
  Available Products
</h2>

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
  {productCategories.map((category) => (
    <div
      key={category.slug}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
    >
      {/* Image */}
      <div className="h-28 w-full overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex items-center justify-between">
        <h3 className="text-sm font-medium">{category.name}</h3>

        <button
          onClick={() =>
            navigate(`/shop/${shop.shopId}/category/${category.slug}`)
          }
          className="text-xs font-medium px-3 py-1.5 bg-black text-white rounded-md hover:bg-gray-800"
        >
          View
        </button>
      </div>
    </div>
  ))}
</div>


        {/* MORE BANNERS */}
        
        <img src={banner3} className="w-full rounded-xl my-6" />

>>>>>>> origin/main
      </div>
    </section>
  );
};

<<<<<<< HEAD
export default ShopDetail;
=======
export default ShopDetails;
>>>>>>> origin/main
