import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import { useWishlist } from "@/context/WishlistContext";
import ShopCarousel from "@/components/shops/ShopCarousel";

const ShopProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist } = useWishlist();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [shop, setShop] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const shopRes = await axios.get(
          `http://localhost:8000/api/v1/shops/${id}`
        );

        const productRes = await axios.get(
          `http://localhost:8000/api/v1/products/shop/${id}`
        );

        const data = productRes.data.data;

        setShop(shopRes.data.data);
        setProducts(data);

        const uniqueCategories = [
          ...new Set(data.map((p: any) => p.category)),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ================= IMAGES FIX =================
  const images =
    shop?.shopImages?.length > 0
      ? shop.shopImages.map(
          (img: string) => `http://localhost:8000${img}`
        )
      : shop?.shopImage
      ? [`http://localhost:8000${shop.shopImage}`]
      : ["/placeholder.png"];

  // GROUP PRODUCTS
  const groupedProducts = categories.map((cat) => ({
    category: cat,
    items: products.filter((p) => p.category === cat),
  }));

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-72 bg-gray-300 rounded-xl mb-6"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">

      {/* ================= HEADER CAROUSEL ================= */}
      <ShopCarousel images={images} />

      {/* TEXT OVERLAY */}
      <div className="relative -mt-32 mb-10 px-6 text-white z-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          {shop?.shopName}
        </h1>

        <p className="text-sm opacity-90 mt-1">
          {shop?.businessType} • Mangalore
        </p>

        <div className="flex gap-3 mt-3">
          <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
            ⭐ 4.5
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            Open Now
          </span>
        </div>
      </div>

      {/* ================= TRUST STRIP ================= */}
      <div className="mb-8 flex justify-center">
        <div className="w-full max-w-5xl bg-blue-100 rounded-full px-6 py-3 flex justify-between">
          <p>📦 20,000+ Products</p>
          <p>⭐ 450+ Trusted Brands</p>
          <p>✔️ 100% Original</p>
          <p>💰 Best Prices</p>
        </div>
      </div>

      {/* ================= TOP BRANDS ================= */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Top Brands</h2>
        <div className="flex gap-4 overflow-x-auto">
          {categories.map((cat) => (
            <div key={cat} className="min-w-[120px] border p-4 rounded">
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      {groupedProducts.map(({ category, items }) => (
        <div key={category} className="mb-12">

          <h2 className="text-xl font-bold mb-4">{category}</h2>

          <div className="flex gap-4 overflow-x-auto">
            {items.map((product) => (
              <div
                key={product._id}
                className="min-w-[200px] border rounded-xl p-3 hover:shadow"
              >
                <img
                  onClick={() => navigate(`/product/${product._id}`)}
                  src={`http://localhost:8000${product.images?.[0]}`}
                  className="h-36 w-full object-cover rounded"
                />

                <p className="mt-2">{product.name}</p>

                <p className="text-green-600 font-semibold">
                  ₹{product.finalPrice}
                </p>

                <button
                  onClick={() =>
                    addToCart({
                      id: product._id,
                      name: product.name,
                      price: product.finalPrice,
                      image: product.images?.[0],
                      shop: id,
                      quantity: 1,
                    })
                  }
                  className="mt-2 w-full bg-blue-600 text-white py-1 rounded"
                >
                  Add to Cart
                </button>

              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
};

export default ShopProducts;