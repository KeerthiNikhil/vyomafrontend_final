import { useParams } from "react-router-dom";
import { useState } from "react";
import { Minus, Plus, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT IMAGE SECTION */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="h-[350px] flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="h-full object-contain"
            />
          </div>

          {/* Thumbnail Row */}
          <div className="flex gap-3 mt-4">
            <div className="w-16 h-16 border rounded-md" />
            <div className="w-16 h-16 border rounded-md" />
            <div className="w-16 h-16 border rounded-md" />
          </div>
        </div>

        {/* CENTER PRODUCT INFO */}
        <div className="space-y-5">

          <h1 className="text-2xl font-bold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 text-yellow-500">
            <Star size={18} fill="currentColor" />
            <span className="text-sm text-gray-700">4.4 (78 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-black">
              ₹{product.price}
            </span>
            <span className="text-gray-400 line-through">
              ₹{product.price + 500}
            </span>
            <span className="text-green-600 text-sm font-medium">
              20% off
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-1"
              >
                <Minus size={16} />
              </button>
              <span className="px-4">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-1"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add to Cart
            </Button>

            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
              Buy Now
            </Button>
          </div>

          {/* Features Accordion */}
          <div className="border rounded-xl divide-y mt-6">
            <details className="p-4 cursor-pointer">
              <summary className="font-medium">Description</summary>
              <p className="text-sm text-gray-600 mt-2">
                {product.description}
              </p>
            </details>

            <details className="p-4 cursor-pointer">
              <summary className="font-medium">Specifications</summary>
              <p className="text-sm text-gray-600 mt-2">
                Weight: {product.weight}
              </p>
            </details>

            <details className="p-4 cursor-pointer">
              <summary className="font-medium">Warranty</summary>
              <p className="text-sm text-gray-600 mt-2">
                1 Year Manufacturer Warranty
              </p>
            </details>
          </div>
        </div>

        {/* RIGHT OFFER BOX */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Available Offers</h3>
            <p className="text-sm text-gray-600">
              Buy 2 or more & get extra 5% off
            </p>
            <p className="text-sm text-gray-600">
              Free Delivery Available
            </p>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-blue-600 text-white">
              Go to Cart
            </Button>

            <Button className="w-full bg-orange-500 text-white">
              Buy Now
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Payment Options</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <p>✔ UPI</p>
              <p>✔ Cards</p>
              <p>✔ COD</p>
              <p>✔ Net Banking</p>
            </div>
          </div>
        </div>

      </div>

      {/* REVIEWS SECTION */}
      <div className="mt-16 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">
          Ratings & Reviews
        </h2>

        <div className="flex items-center gap-6 mb-6">
          <span className="text-3xl font-bold">4.4</span>
          <span className="text-sm text-gray-600">
            78 Reviews
          </span>
        </div>

        <div className="space-y-4">
          <div className="border-t pt-4">
            <p className="font-medium">Dr. Sharma</p>
            <p className="text-sm text-gray-600">
              Excellent product. Very reliable and easy to use.
            </p>
          </div>

          <div className="border-t pt-4">
            <p className="font-medium">Dr. Patel</p>
            <p className="text-sm text-gray-600">
              Good quality product. Works as expected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
