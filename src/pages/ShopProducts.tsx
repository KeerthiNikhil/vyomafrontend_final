import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ShopProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [shop, setShop] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopRes = await axios.get(
          `http://localhost:8000/api/v1/shops/${id}`
        );

        setShop(shopRes.data.data);

        const productRes = await axios.get(
          `http://localhost:8000/api/v1/products/shop/${id}`
        );

        const data = productRes.data.data;

        setProducts(data);

        const uniqueCategories = [
          ...new Set(data.map((p: any) => p.category)),
        ];

        setCategories(uniqueCategories);
setActiveCategory(uniqueCategories[0] || "");      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* SHOP HEADER */}
      <div className="relative h-48 overflow-hidden mb-6">

        {shop?.shopImage && (
  <img
    src={
      shop.shopImage
        ? `http://localhost:8000${shop.shopImage}`
        : "/placeholder.png"
    }
    className="absolute inset-0 w-full h-full object-cover"
  />
)}

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 h-full flex items-end px-6 pb-4 text-white">
          <div>
            <h1 className="text-2xl font-bold">{shop?.shopName}</h1>
            <p className="text-sm mt-1">
              ⭐ 4.5 • {shop?.businessType}
            </p>
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

        {filteredProducts.map((product) => (

          <div
            key={product._id}
           className="bg-white rounded-lg border shadow-sm hover:shadow-md transition p-2 flex flex-col"          >

            <div className="relative overflow-hidden rounded-lg">

              <img
                onClick={() => navigate(`/product/${product._id}`)}
src={
  product.images?.[0]
    ? `http://localhost:8000${product.images[0]}`
    : "/placeholder.png"
}                alt={product.name}
                className="w-full h-[170px] object-cover cursor-pointer rounded"
              />

              {product.discountValue > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.discountValue}% OFF
                </span>
              )}

            </div>

            <h3 className="font-semibold text-sm mt-3 line-clamp-2">
              {product.name}
            </h3>

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

            <div className="flex gap-2 mt-3">

              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="flex-1 border text-xs py-1.5 rounded hover:bg-gray-100"
              >
                View
              </button>

              <button className="flex-1 bg-blue-600 text-white text-xs py-1.5 rounded hover:bg-blue-700">
                Add to Cart
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ShopProducts;