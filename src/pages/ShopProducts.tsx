import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import { useWishlist } from "@/context/WishlistContext";
import { Heart } from "lucide-react";

const ShopProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
 const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [shop, setShop] = useState<any>(null);
   
  console.log("wishlist", wishlist);
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

      setShop(shopRes.data.data);

      const data = productRes.data.data;
      setProducts(data);

      const uniqueCategories = [
        ...new Set(data.map((p: any) => p.category)),
      ];

      setCategories(uniqueCategories);
      setActiveCategory(uniqueCategories[0] || "");

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData(); // ✅ THIS WAS MISSING

}, [id]); // ✅ ADD DEPENDENCY

  const filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );

  if (loading) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="h-64 bg-gray-200 rounded-xl animate-pulse mb-6"></div>

      <div className="flex gap-3 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* SHOP HEADER */}
      <div className="relative h-72 md:h-80 lg:h-[380px] rounded-xl overflow-hidden mb-8">

  <img
    src={
      shop?.shopImage
        ? `http://localhost:8000${shop.shopImage}`
        : "/placeholder.png"
    }
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

  {/* Content */}
  <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">

    <h1 className="text-3xl md:text-4xl font-bold">
      {shop?.shopName}
    </h1>

    <p className="text-sm opacity-90 mt-1">
      {shop?.businessType} • Mangalore
    </p>

    <div className="flex items-center gap-3 mt-3">
      <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
        ⭐ 4.5
      </span>

      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
        Open Now
      </span>
    </div>

  </div>
</div>

      {/* CATEGORY FILTER */}
      <div className="sticky top-0 bg-white z-20 flex gap-3 overflow-x-auto py-3 border-b mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
              activeCategory === cat
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">

        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <h2 className="text-xl font-semibold text-gray-700">
              No Products Available 😔
            </h2>

            <p className="text-gray-500 mt-2">
              This shop has not added any products yet.
            </p>

            <p className="mt-4 text-green-600 font-medium">
              Add some products to start earning fast 🚀
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const inWishlist = isInWishlist(product._id);
      

            return (
              <div
                key={product._id}
                className="bg-white rounded-lg border shadow-sm hover:shadow-md transition p-2 flex flex-col"
              >
                {/* IMAGE + WISHLIST */}
                <div className="relative overflow-hidden rounded-lg">

                  {/* ❤️ Wishlist */}
              <button
  onClick={() => {
    if (!product?._id) return;

    inWishlist
      ? removeFromWishlist(product._id)
      : addToWishlist({
          _id: product._id,
          name: product.name,
          price: product.finalPrice,
          image: product.images?.[0]
            ? `http://localhost:8000${product.images[0]}`
            : "/placeholder.png",
        });
  }}
  className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow"
>
  <Heart
    className={`w-4 h-4 ${
      inWishlist
        ? "text-red-500 fill-red-500"
        : "text-gray-500"
    }`}
  />
</button>

                  <img
                    onClick={() => navigate(`/product/${product._id}`)}
                    src={
                      product.images?.[0]
                        ? `http://localhost:8000${product.images[0]}`
                        : "/placeholder.png"
                    }
                   className="w-full h-[170px] object-cover rounded transition-transform duration-300 hover:scale-105"
                  />

                  {product.discountValue > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {product.discountValue}% OFF
                    </span>
                  )}
                </div>

                {/* NAME */}
                <h3 className="font-semibold text-sm mt-3 line-clamp-2">
                  {product.name}
                </h3>

                {/* PRICE */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-green-600 font-semibold">
                    ₹{product.finalPrice}
                  </span>

                  {product.discountValue > 0 && (
                    <span className="text-xs line-through text-gray-400">
                      ₹{product.price}
                    </span>
                  )}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="flex-1 border text-xs py-1.5 rounded hover:bg-gray-100"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      addToCart({
                        id: product._id,
                        name: product.name,
                        price: product.finalPrice,
                        image: product.images?.[0]
                          ? `http://localhost:8000${product.images[0]}`
                          : "/placeholder.png",
                        shop: id,
                        quantity: 1,
                      })
                    }
                    className="flex-1 bg-blue-600 text-white text-xs py-1.5 rounded hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ShopProducts;