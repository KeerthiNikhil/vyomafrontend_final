import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, fetchCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = 117;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
  try {
    if (cart.length === 0) {
      toast.error("Cart is empty ❌");
      return;
    }

    // ================= COD =================
    if (paymentMethod === "COD") {
      const res = await axios.post("/orders", {
        paymentMethod,
        totalAmount: total,
      });

      if (res.data.success) {
        toast.success("Order placed successfully 🎉");
        await fetchCart();
        navigate("/order-success");
      } else {
        toast.error("Order failed ❌");
      }
    }

    // ================= ONLINE =================
    else {
      const { data } = await axios.post("/orders/create-order", {
        amount: total,
      });

      if (!data.success) {
        toast.error("Failed to create Razorpay order ❌");
        return;
      }

      const { order } = data;

      if (!window.Razorpay) {
        toast.error("Razorpay not loaded ❌");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Vyoma",
        description: "Order Payment",
        order_id: order.id,

        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled ❌");
          },
        },

        handler: async function (response: any) {
          console.log("🔥 HANDLER CALLED", response);

          // 🚨 IMPORTANT FIX
          if (!response.razorpay_payment_id) {
            toast.error("Payment failed ❌");
            return;
          }

          try {
            const res = await axios.post("/orders/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              totalAmount: total,
            });

            if (res.data.success) {
              toast.success("Payment successful 🎉");
              await fetchCart();
              navigate("/order-success");
            } else {
              toast.error("Payment verification failed ❌");
            }
          } catch (err: any) {
            toast.error(
              err?.response?.data?.message || "Order saving failed ❌"
            );
          }
        },

        theme: {
          color: "#FACC15",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function () {
        toast.error("Payment failed ❌");
      });

      rzp.open();
    }
  } catch (err: any) {
    toast.error("Something went wrong ❌");
  }
};

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
          <p className="text-sm text-gray-600">
            Reshu Kunder, Udupi, Karnataka
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            Payment Method
          </h2>

          {/* COD */}
          <label className="flex items-center gap-2 mt-2">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          {/* ONLINE */}
          <label className="flex items-center gap-2 mt-2">
            <input
              type="radio"
              name="payment"
              value="ONLINE"
              checked={paymentMethod === "ONLINE"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Pay Online (UPI / Card)
          </label>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-lg p-6 h-fit">
          <p>Items: ₹{subtotal}</p>
          <p>Delivery: ₹{deliveryFee}</p>

          <hr className="my-3" />

          <p className="font-semibold text-lg">
            Order Total: ₹{total}
          </p>

          <Button
            disabled={cart.length === 0}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
            onClick={handlePlaceOrder}
          >
            Place your order
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;