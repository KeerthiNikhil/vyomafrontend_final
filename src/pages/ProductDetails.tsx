import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Minus, Plus, Star, Heart } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";

import StockIndicator from "@/components/products/StockIndicator";
import EmiCalculator from "@/components/products/EmiCalculator";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/products/${id}`
        );

        const productData = res.data.data;
        setProduct(productData);

        const related = await axios.get(
          `http://localhost:8000/api/v1/products/shop/${productData.shop}`
        );

        setRelatedProducts(related.data.data || []);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center">Not found</div>;

  const images = product.images || [];

  const handleAddToCart = async () => {
  try {
    await addToCart({
  id: product._id,
  name: product.name,
  price: product.finalPrice,
  image: `http://localhost:8000${images?.[0]}`,
  shop: product.shop, // ✅ ADD THIS
});
  } catch (err) {
    console.log("Add to cart error", err);
  }
};

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  const formattedDate = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT → IMAGE */}
        <div className="flex flex-col items-center gap-4">

          <div className="relative">
            <button
              onClick={() => setWishlist(!wishlist)}
              className="absolute right-3 top-3 bg-white p-2 rounded-full shadow"
            >
              <Heart className={wishlist ? "text-red-500 fill-red-500" : ""}/>
            </button>

            <img
              onClick={() => setShowPreview(true)}
              src={
                images?.[activeImage]
                  ? `http://localhost:8000${images[activeImage]}`
                  : "/placeholder.png"
              }
              className="w-[320px] h-[420px] object-contain bg-white rounded-lg"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-2">
            {images.map((img: string, i: number) => (
              <img
                key={i}
                src={`http://localhost:8000${img}`}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 rounded cursor-pointer border ${
                  activeImage === i ? "border-black" : ""
                }`}
              />
            ))}
          </div>

        </div>

        {/* CENTER → PRODUCT INFO */}
        <div className="space-y-5">

          <h1 className="text-2xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-2 text-yellow-500">
            <Star size={16} fill="currentColor"/>
            <span className="text-sm text-gray-600">
              4.4 (78 reviews)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">
              ₹{product.finalPrice}
            </span>

            {product.discountValue > 0 && (
              <span className="line-through text-gray-400">
                ₹{product.price}
              </span>
            )}
          </div>

          <StockIndicator stock={product.stock} />

          <EmiCalculator price={product.finalPrice} />

          {/* QTY */}
          <div className="flex items-center gap-4">
            <span>Quantity</span>

            <div className="flex border rounded">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus size={16}/>
              </button>

              <span className="px-4">{qty}</span>

              <button onClick={() => setQty(qty + 1)}>
                <Plus size={16}/>
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <Button onClick={handleAddToCart} className="flex-1 bg-blue-600">
              Add to Cart
            </Button>

           <Button
  className="flex-1 bg-orange-500"
  onClick={() => setShowPayment(true)}
>
  Buy Now
</Button>
          </div>

          {/* ACCORDION */}
          <div className="bg-white border rounded-lg divide-y">

            <details className="p-4 cursor-pointer">
              <summary className="font-semibold text-sm">
                Description
              </summary>

              <p className="text-sm text-gray-600 mt-2">
                {product.description || "No description available"}
              </p>
            </details>

            <details className="p-4 cursor-pointer">
              <summary className="font-semibold text-sm">
                Specifications
              </summary>

              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <p>Category: {product.category || "N/A"}</p>
                <p>Stock: {product.stock}</p>
                <p>Brand: {product.brand || "N/A"}</p>
              </div>
            </details>

          </div>

        </div>

        {/* RIGHT → BUY BOX */}
        <div className="sticky top-20 h-fit">

          <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">

            <h3 className="font-semibold text-lg">
              Available Offers
            </h3>

            <p className="text-sm">
              Buy 2 & get 5% extra off
            </p>

            <p className="text-green-600 text-sm">
              Delivery by <b>{formattedDate}</b>
            </p>

          </div>

        </div>

      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">
          You may also like
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

          {relatedProducts.slice(0,5).map((item:any) => (

            <div
              key={item._id}
              className="bg-white rounded-lg border hover:shadow-md transition p-2 cursor-pointer"
            >

              <div className="w-full h-40 flex items-center justify-center bg-white rounded-md">
                <img
                  src={
                    item.images?.[0]
                      ? `http://localhost:8000${item.images[0]}`
                      : "/placeholder.png"
                  }
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="mt-2 text-sm font-medium line-clamp-2">
                {item.name}
              </p>

              <p className="text-sm font-semibold text-green-600">
                ₹{item.finalPrice}
              </p>

            </div>

          ))}

        </div>
      </div>

      {/* FULLSCREEN IMAGE */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center"
          onClick={() => setShowPreview(false)}
        >
          <img
            src={`http://localhost:8000${images[activeImage]}`}
            className="max-h-[90vh]"
          />
        </div>
      )}

      {showPayment && (
<div
  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  onClick={() => setShowPayment(false)}
>
<div
  className="bg-white w-full max-w-md rounded-xl p-6 space-y-5"
  onClick={(e) => e.stopPropagation()}
></div>

    <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-5">

      <h2 className="text-lg font-semibold">Checkout</h2>

      {/* PRODUCT SUMMARY */}
      <div className="flex items-center gap-3 border p-3 rounded-lg">
        <img
          src={`http://localhost:8000${images[0]}`}
          className="w-14 h-14 object-contain"
        />
        <div>
          <p className="text-sm font-medium">{product.name}</p>
          <p className="text-sm text-gray-600">
            ₹{product.finalPrice} × {qty}
          </p>
        </div>
      </div>

      {/* ADDRESS (dummy for now) */}
      <div className="border p-3 rounded-lg text-sm">
        <p className="font-medium">Delivery Address</p>
        <p className="text-gray-600">
          Mangalore, Karnataka - 575001
        </p>
      </div>

      {/* PAYMENT METHODS */}
      <div className="space-y-2">
        <p className="font-medium text-sm">Select Payment</p>

        {["COD", "UPI"].map((method) => (
          <label
            key={method}
            className="flex items-center gap-2 border p-2 rounded cursor-pointer"
          >
            <input
              type="radio"
              checked={paymentMethod === method}
              onChange={() => setPaymentMethod(method)}
            />
            {method === "COD" ? "Cash on Delivery" : "UPI Payment"}
          </label>
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>₹{product.finalPrice * qty}</span>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowPayment(false)}
          className="flex-1 border py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            alert(`Order placed via ${paymentMethod}`);
            setShowPayment(false);
          }}
          className="flex-1 bg-blue-600 text-white py-2 rounded"
        >
          Place Order
        </button>
      </div>

    </div>
  </div>
)}

    </section>
  );
};

export default ProductDetails;