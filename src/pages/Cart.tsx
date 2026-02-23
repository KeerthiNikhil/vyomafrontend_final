import { useNavigate, Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-2">Your Cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Add some products to continue shopping
        </p>

        <Button onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT – CART ITEMS */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Shopping Cart
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 py-6 border-b-4 border-gray-200 last:border-b-0"
            >
              {/* IMAGE (CLICKABLE) */}
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-contain  rounded cursor-pointer"
                />
              </Link>

              {/* DETAILS */}
              <div className="flex-1">
                {/* NAME (CLICKABLE) */}
                <Link
                  to={`/product/${item.id}`}
                  className="font-medium text-lg hover:text-blue-600"
                >
                  {item.name}
                </Link>

                <p className="text-green-600 text-sm mt-1">
                  In stock
                </p>

                {/* QUANTITY CONTROLS */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="px-3 font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Plus size={14} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-6 flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>

              {/* PRICE */}
              <div className="font-semibold text-lg">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}

          {/* SUBTOTAL */}
          <div className="text-right mt-6 font-semibold text-lg">
            Subtotal ({cart.length} items): ₹{subtotal}
          </div>
        </div>

        {/* RIGHT – SUMMARY */}
        <div className="bg-white rounded-lg p-6 h-fit">
          <p className="text-green-700 text-sm mb-3">
            ✔ Your order qualifies for FREE Delivery
          </p>

          <div className="text-lg font-semibold mb-4">
            Subtotal ({cart.length} items): ₹{subtotal}
          </div>

          <Button
            className="w-full rounded-full text-lg py-6 bg-yellow-300 hover:bg-yellow-400 text-black"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Buy
          </Button>
        </div>

      </div>
    </section>
  );
};

export default Cart;
