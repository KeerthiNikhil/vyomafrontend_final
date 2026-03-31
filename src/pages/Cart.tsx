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
    <section className="bg-gray-100 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">
            Shopping Cart
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-5 py-6 border-b border-gray-200"
            >
              {/* IMAGE */}
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  className="w-28 h-28 object-contain bg-gray-50 rounded-lg p-2"
                />
              </Link>

              {/* DETAILS */}
              <div className="flex-1">
                <Link
                  to={`/product/${item.id}`}
                  className="font-medium text-lg hover:text-blue-600"
                >
                  {item.name}
                </Link>

                <p className="text-green-600 text-sm mt-1">
                  In stock
                </p>

                {/* QTY */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 border rounded"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="px-3">{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 border rounded"
                  >
                    <Plus size={14} />
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-6 flex items-center gap-1 text-red-500"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>

              {/* PRICE */}
              <div className="font-semibold text-lg">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}

          <div className="text-right mt-6 font-semibold text-lg">
            Subtotal ({cart.length} items): ₹{subtotal}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-xl p-6 shadow-sm h-fit sticky top-20">
          <div className="text-lg font-semibold mb-4">
            Subtotal ({cart.length} items): ₹{subtotal}
          </div>

          <Button
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
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