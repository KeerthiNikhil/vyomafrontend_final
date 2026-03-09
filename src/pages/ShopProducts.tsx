import { useParams,useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ShopProducts = () => {

  const { id } = useParams();

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [shop, setShop] = useState<any>(null);
  const navigate = useNavigate();

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
    <div className="max-w-7xl mx-auto px-4">

      {/* SHOP HEADER */}

<div className="sticky top-0 z-30 bg-white">

  <div className="relative h-48 overflow-hidden">

    {shop?.shopImage && (
      <img
        src={`http://localhost:8000${shop.shopImage}`}
        className="absolute inset-0 w-full h-full object-cover"
      />
    )}

    <div className="absolute inset-0 bg-black/40"></div>

    <div className="relative z-10 h-full flex items-end px-6 pb-4 text-white">

      <div>
        <h1 className="text-2xl font-bold">
          {shop?.shopName}
        </h1>

        <p className="text-sm mt-1">
          ⭐ 4.5 • {shop?.businessType}
        </p>
      </div>

    </div>

  </div>

</div>


      {/* CATEGORY SCROLL */}

<div className="sticky top-48 z-20 bg-white py-3 border-b">

  <div className="flex gap-3 overflow-x-auto px-2">

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

</div>

      {/* PRODUCTS GRID */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">

        {filteredProducts.map((product) => (

          <div
            key={product._id}
            className="bg-white rounded-xl border shadow-sm hover:shadow-md transition p-3 flex flex-col"
          >

            {/* IMAGE */}

            <div className="relative overflow-hidden rounded-lg">

              <img
  onClick={() => navigate(`/product/${product._id}`)}
  src={`http://localhost:8000${product.images?.[0]}`}
  alt={product.name}
  className="w-full aspect-[4/5] object-cover cursor-pointer"
/>

              {product.discountValue > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.discountValue}% OFF
                </span>
              )}

            </div>


            {/* PRODUCT NAME */}

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
    className="flex-1 border text-gray-700 text-sm py-2 rounded-md hover:bg-gray-100"
  >
    View
  </button>

  <button
    className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700"
  >
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