import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { deliveryBoysData } from "@/data/deliveryBoysData";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Delivery = () => {
  const [selectedBoy, setSelectedBoy] = useState<any>(null);
  const [km, setKm] = useState(0);
  const [rate, setRate] = useState(0);

  const location = useLocation();
  const orderData: any = location.state;

  const address = orderData?.address || "No address";
  const lat = Number(orderData?.lat) || 12.9716;
const lng = Number(orderData?.lng) || 77.5946;

  const total = km * rate;

  // ✅ SAVE DELIVERY TO BACKEND
  const handleAssignDelivery = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/api/v1/orders/${orderData.orderId}/assign-delivery`,
        {
          deliveryBoy: selectedBoy.name,
          deliveryBoyId: selectedBoy.id,
          distance: km,
          rate,
          totalDeliveryCost: total,
        }
      );

      alert("✅ Delivery Assigned Successfully");
    } catch (err: any) {
    console.log("ERROR 👉", err.response?.data || err.message);
      alert(
      err.response?.data?.message || "❌ Failed to assign delivery"
    );
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <h1 className="text-3xl font-bold">
        Delivery Assignment
      </h1>

      {/* ORDER + ADDRESS */}
      {orderData && (
        <div className="bg-yellow-50 p-4 rounded-lg space-y-2">

          <p>
            Order: <b>{orderData.orderId}</b>
          </p>

          <p>
            Amount: ₹{orderData.amount}
          </p>

          {/* ✅ CLEAN ADDRESS UI */}
         <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
  <p className="text-sm font-semibold text-gray-700 mb-1">
    📍 Delivery Address
  </p>

  <p className="text-sm text-gray-600 leading-relaxed">
    {address || "Address not available"}
  </p>
</div>

        </div>
      )}

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl space-y-6">

        {/* DELIVERY BOY */}
        <select
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setSelectedBoy(
              deliveryBoysData.find(
                (b) => b.id === Number(e.target.value)
              )
            )
          }
        >
          <option>Select Delivery Boy</option>

          {deliveryBoysData.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        {/* INPUTS */}
        <div className="grid grid-cols-2 gap-4">
          <Input
  placeholder="KM"
  type="number"
  min="0"
  onChange={(e) => setKm(Math.max(0, Number(e.target.value)))}
/>

<Input
  placeholder="Rate"  
  type="number"
  min="0"
  onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
/>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex justify-between items-center">
  <p className="text-sm text-gray-600">
    Delivery Cost
  </p>

  <p className="text-xl font-bold text-blue-900">
    ₹{total}
  </p>
</div>

        {/* MAP */}
        <iframe
  width="100%"
  height="300"
  className="rounded-lg border"
  src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
/>

        {/* BUTTON */}
        <Button
          disabled={!selectedBoy || total <= 0}
          onClick={handleAssignDelivery}
        >
          Assign Delivery
        </Button>

      </div>

    </div>
  );
};

export default Delivery;