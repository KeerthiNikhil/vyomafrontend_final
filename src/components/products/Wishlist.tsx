import { useWishlist } from "@/context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-center">
      <h2 className="text-2xl font-semibold mb-4">
        Your wishlist is empty ❤️
      </h2>

      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Start Shopping 🛍️
      </button>
    </div>
  );
}

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <h1 className="text-2xl font-bold mb-8">
        My Wishlist ({wishlist.length})
      </h1>

      {/* Main container */}
      <div className="bg-white rounded-lg shadow-sm divide-y-5 divide-gray-100">


        {wishlist.map((item) => (
          <div
            key={item._id}
            className="flex gap-6 p-6 relative hover:bg-gray-50 transition"
          >
            {/* IMAGE */}
            <div
              onClick={() => navigate(`/product/${item._id}`)}
              className="w-28 h-28 bg-gray-50 rounded-md overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* DETAILS */}
            <div
              className="flex-1 cursor-pointer"
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <h3 className="text-lg font-medium mb-2">
                {item.name}
              </h3>

              {/* Assured label */}
              <p className="text-blue-600 text-sm font-semibold mb-2">
                Assured
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-3">
                <span className="text-xl font-semibold">
                  ₹{item.price}
                </span>

                {/* Optional old price */}
                <span className="text-gray-400 line-through">
                  ₹{item.price + 500}
                </span>

                <span className="text-green-600 text-sm font-medium">
                  40% off
                </span>
              </div>
            </div>

            {/* REMOVE BUTTON */}
            {/* ACTIONS RIGHT SIDE */}
<div className="flex flex-col items-end justify-center gap-3 ml-auto w-[160px]">

  {/* MOVE TO CART */}
  <button
    onClick={() => {
      addToCart({
        id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });

      removeFromWishlist(item._id);
    }}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium shadow-sm transition flex items-center justify-center gap-2"
  >
    🛒 Move to Cart
  </button>

  {/* REMOVE */}
  <button
    onClick={() => removeFromWishlist(item._id)}
    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium shadow-sm transition flex items-center justify-center gap-2"
  >
    <Trash2 size={16} />
    Remove
  </button>

</div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Wishlist;
