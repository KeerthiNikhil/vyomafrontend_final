import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ShopProducts = () => {
  const { id } = useParams();

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
        ...new Set(data.map((p: any) => p.category))
      ];

      setCategories(uniqueCategories);
      setActiveCategory(uniqueCategories[0]);

    } catch (err) {
      console.log(err);
    }

  };

  fetchData();

}, [id]);
  const filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto">

      {/* SHOP BANNER */}
      <div className="relative h-56 rounded-xl overflow-hidden mt-4">

  {/* Banner Image */}
  {shop?.shopImage && (
    <img
      src={`http://localhost:8000${shop.shopImage}`}
      className="absolute inset-0 w-full h-full object-cover"
    />
  )}

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Shop Info */}
  <div className="relative z-10 h-full flex items-center px-6 text-white">

    <div>
      <h1 className="text-3xl font-bold">
        {shop?.shopName}
      </h1>

      <p className="text-sm mt-1">
        ⭐ 4.5 • {shop?.businessType}
      </p>
    </div>

  </div>

</div>

      {/* CATEGORY TABS */}
      <div className="flex gap-3 mt-6 overflow-x-auto pb-2">

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeCategory === cat
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">

        {filteredProducts.map((product) => (

          <div
            key={product._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
          >

            {/* IMAGE */}
            <div className="relative">

              <img
                src={`http://localhost:8000${product.images?.[0]}`}
                className="w-full h-40 object-cover rounded-md"
              />

              {product.discountValue > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.discountValue}% OFF
                </span>
              )}

            </div>

            {/* NAME */}
            <h3 className="font-semibold text-sm mt-3">
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

            {/* ADD BUTTON */}
            <button className="mt-3 w-full bg-blue-600 text-white text-sm py-1 rounded-md hover:bg-blue-700">
              Add to Cart
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ShopProducts;