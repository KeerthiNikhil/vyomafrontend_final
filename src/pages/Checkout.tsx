import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import AddressModal from "@/components/checkout/AddressModal";
import {
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, fetchCart } = useCart();
  const formatPrice = (value: number) =>
  Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [openAddress, setOpenAddress] = useState(false);
const [address, setAddress] = useState<any>(null);

 const subtotal = Number(
  cart
    .reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    .toFixed(2)
);

const deliveryFee = subtotal > 499 ? 0 : 95;

const total = Number(
  (subtotal + deliveryFee).toFixed(2)
);

  const fetchAddress = async () => {
  try {
    const res = await axios.get("/address");

    if (res.data.success && res.data.data) {
      setAddress(res.data.data);
    }
  } catch (err) {
    console.log("No address yet");
  }
};

useEffect(() => {
  fetchAddress();
}, []);

  const handlePlaceOrder = async () => {
    try {
      if (!cart.length) {
        toast.error("Cart is empty ❌");
        return;
      }

      if (paymentMethod === "COD") {
        const res = await axios.post("/orders", {
  paymentMethod,
  totalAmount: total,
  deliveryCharge: deliveryFee,

  shippingAddress: address,

  items: cart.map((item) => ({
    product: item.productId || item._id,
    name: item.name,
    image: item.image,
    quantity: item.quantity,
    price: item.price,
    shop: item.shop,
  })),
});

        if (res.data.success) {
          toast.success("Order placed 🎉");
          await fetchCart();
          navigate("/order-success");
        }
        return;
      }

      

      const { data } = await axios.post("/orders/create-order", {
        amount: total,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Vyoma",
        description: "Order Payment",
        order_id: data.order.id,

        handler: async (response: any) => {
          const verify = await axios.post("/orders/verify-payment", {
  ...response,

  totalAmount: total,

  deliveryCharge: deliveryFee,

  shippingAddress: address,

  items: cart.map((item) => ({
    product: item.productId || item._id,
    name: item.name,
    image: item.image,
    quantity: item.quantity,
    price: item.price,
    shop: item.shop,
  })),
});

          if (verify.data.success) {
            toast.success("Payment successful 🎉");
            await fetchCart();
            navigate("/order-success");
          }
        },

        theme: {
          color: "#f97316",
        },
      };

      new window.Razorpay(options).open();
    } catch (err: any) {
  console.log("CHECKOUT ERROR 👉", err);
  console.log("RESPONSE 👉", err?.response?.data);

  toast.error(
    err?.response?.data?.message || "Something went wrong ❌"
  );
}
  };

  return (
  <section className="bg-slate-50 min-h-screen py-8">
    <div className="max-w-7xl mx-auto px-4 lg:px-6 grid lg:grid-cols-3 gap-6">

      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-5">

        {/* ADDRESS */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="
px-6
py-5
border-b
border-slate-100
bg-slate-50/50
">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MapPin size={18} />
              Delivery Address
            </h2>
          </div>

          <div className="p-6">

            {address ? (

              <div
                className="
                rounded-2xl
                border
                border-blue-100

               bg-white
shadow-sm
hover:shadow-md
transition
                p-5
                "
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="font-semibold text-lg">
                      {address.name}
                    </h3>

                    <p className="text-sm text-slate-600 mt-2">
                      {address.house}, {address.area}
                    </p>

                    {address.landmark && (
                      <p className="text-sm text-slate-600">
                        {address.landmark}
                      </p>
                    )}

                    <p className="text-sm text-slate-600">
                      {address.city}, {address.state}
                      {" - "}
                      {address.pincode}
                    </p>

                    <p className="text-sm text-slate-600 mt-2">
                      📞 {address.phone}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setOpenAddress(true)
                    }
                    className="
                    text-blue-600
                    font-medium
                    hover:underline
                    "
                  >
                    Change
                  </button>

                </div>

              </div>

            ) : (

              <button
                onClick={() =>
                  setOpenAddress(true)
                }
                className="
                w-full
                border-2
                border-dashed
                rounded-2xl
                py-10
                text-slate-500
                hover:border-blue-500
                hover:text-blue-600
                transition
                "
              >
                + Add Delivery Address
              </button>

            )}

          </div>

        </div>

        {/* ORDER ITEMS */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="
px-6
py-5
border-b
border-slate-100
bg-slate-50/50
">
            <h2 className="font-semibold flex items-center gap-2">
              <ShoppingBag size={18} />
              Order Items ({cart.length})
            </h2>
          </div>

          <div>

            {cart.map((item) => (

              <div
                key={item.id}
                className="
flex
gap-4
px-6
py-5
shadow-[0_1px_0_0_#f1f5f9]
last:shadow-none
hover:bg-slate-50/60
transition
"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                  w-20
                  h-20
                  rounded-xl
                  border
                  object-cover
                  "
                />

                <div className="flex-1">

                  <h3 className="font-medium text-slate-800">
                    {item.name}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-green-600 text-sm mt-1">
                    In Stock
                  </p>

                </div>

                <div className="font-semibold">
                  ₹
                  {formatPrice(
                    item.price * item.quantity
                  )}
                </div>

              </div>

            ))}

          </div>

        </div>

        {/* PAYMENT */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="
px-6
py-5
border-b
border-slate-100
bg-slate-50/50
">

            <h2 className="text-lg font-semibold flex items-center gap-2">
              <CreditCard size={18} />
              Payment Method
            </h2>

          </div>

          <div className="
p-6
space-y-4
bg-slate-50/30
">

            <label
              className={`
              border
              rounded-2xl
              p-5
              flex
              items-center
              gap-3
              cursor-pointer
              transition
              ${
                paymentMethod === "COD"
                  ? "border-orange-500 bg-orange-50"
                  : "border-slate-200"
              }
              `}
            >

              <input
                type="radio"
                value="COD"
                checked={
                  paymentMethod === "COD"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <Truck size={18} />

              <div>

                <p className="font-medium">
                  Cash On Delivery
                </p>

                <p className="text-sm text-slate-500">
                  Pay after delivery
                </p>

              </div>

            </label>

            <label
              className={`
              border
              rounded-2xl
              p-5
              flex
              items-center
              gap-3
              cursor-pointer
              transition
              ${
                paymentMethod === "ONLINE"
                  ? "border-orange-500 bg-orange-50"
                  : "border-slate-200"
              }
              `}
            >

              <input
                type="radio"
                value="ONLINE"
                checked={
                  paymentMethod === "ONLINE"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <CreditCard size={18} />

              <div>

                <p className="font-medium">
                  UPI / Card / Net Banking
                </p>

                <p className="text-sm text-slate-500">
                  Razorpay Secure Payment
                </p>

              </div>

            </label>

          </div>

        </div>

        {/* TRUST BADGES */}
        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-white
rounded-2xl
p-5
border
border-slate-100
shadow-sm
hover:shadow-md
transition text-center">
            <ShieldCheck
              className="mx-auto text-green-600"
              size={24}
            />
            <p className="font-medium mt-2">
              Secure Payment
            </p>
          </div>

          <div className="bg-white
rounded-2xl
p-5
border
border-slate-100
shadow-sm
hover:shadow-md
transition text-center">
            <Truck
              className="mx-auto text-blue-600"
              size={24}
            />
            <p className="font-medium mt-2">
              Fast Delivery
            </p>
          </div>

          <div className="bg-white
rounded-2xl
p-5
border
border-slate-100
shadow-sm
hover:shadow-md
transition text-center">
            <CheckCircle
              className="mx-auto text-orange-500"
              size={24}
            />
            <p className="font-medium mt-2">
              Trusted Seller
            </p>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="sticky top-24 h-fit">

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b">

            <h3 className="text-lg font-semibold">
              Order Summary
            </h3>

          </div>

          <div className="p-6 space-y-5">

            <div className="flex justify-between">

              <span className="text-slate-600">
                Items Total
              </span>

              <span className="font-medium">
                ₹{formatPrice(subtotal)}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-600">
                Delivery Fee
              </span>

              {deliveryFee === 0 ? (
                <span className="text-green-600 font-semibold">
                  FREE
                </span>
              ) : (
                <span>
                  ₹{formatPrice(deliveryFee)}
                </span>
              )}

            </div>

<div className="
flex
justify-between
text-sm
text-green-600
font-medium
">

  <span>You Saved</span>

  <span>
    ₹
    {formatPrice(
      cart.reduce(
        (sum,item)=>
          sum +
          ((item.originalPrice || item.price) - item.price)
          * item.quantity,
        0
      )
    )}
  </span>

</div>
            <div
className="
border-t
border-slate-100
pt-5
flex
justify-between
text-xl
font-bold
"
>

              <span>Total</span>

              <span>
                ₹{formatPrice(total)}
              </span>

            </div>

            <button
              disabled={!cart.length}
              onClick={handlePlaceOrder}
              className="
              w-full
              bg-orange-500
              hover:bg-orange-600
              text-white
              rounded-xl
              py-4
              font-semibold
              transition
              "
            >
              Proceed To Pay →
            </button>

          </div>

          <div className="bg-green-50 px-6 py-5">

            <p className="text-green-700 font-semibold">
              🎉 Free Delivery Applied
            </p>

            <p className="text-green-600 text-sm mt-1">
              Eligible orders above ₹499
            </p>

          </div>

        </div>

      </div>

    </div>

    <AddressModal
      open={openAddress}
      onClose={() =>
        setOpenAddress(false)
      }
      onSaved={fetchAddress}
    />
  </section>
);
};
export default Checkout;