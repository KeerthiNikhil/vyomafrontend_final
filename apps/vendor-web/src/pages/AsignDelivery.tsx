import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const Delivery = () => {

  const [deliveryBoys, setDeliveryBoys] = useState<any[]>([]);
  const [selectedBoy, setSelectedBoy] = useState<any>(null);
  const [km, setKm] = useState(0);
  const [rate, setRate] = useState(0);

  const location = useLocation();
  const orderData: any = location.state;

  const address = orderData?.address || "No address";
  const lat = Number(orderData?.lat) || 12.9716;
  const lng = Number(orderData?.lng) || 77.5946;

  const total = km * rate;

  useEffect(() => {
    fetchDeliveryBoys();
  }, []);

  const fetchDeliveryBoys = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/delivery-boys", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDeliveryBoys(res.data.data);
    } catch {
      console.log("Failed to fetch delivery boys");
    }
  };

  const handleAssignDelivery = async () => {
    try {
      await axios.put("/delivery-boys/assign", {
        orderId: orderData?.orderId,
        deliveryBoyId: selectedBoy?._id,
        km,
        rate,
        total,
        address,
        lat,
        lng,
      });

      alert("✅ Delivery Assigned Successfully");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <h1 className="text-3xl font-bold">Delivery Assignment</h1>

      {/* ORDER INFO */}
      {orderData && (
        <div className="bg-yellow-50 p-4 rounded-lg space-y-2">
          <p>Order: <b>{orderData.orderId}</b></p>
          <p>Amount: ₹{orderData.amount}</p>

          <div className="bg-white border p-4 rounded-lg">
            <p className="text-sm font-semibold">📍 Address</p>
            <p className="text-sm text-gray-600">{address}</p>
          </div>
        </div>
      )}

      {/* MAIN CARD */}
      <div className="bg-white p-6 rounded-xl space-y-6">

        {/* SELECT DELIVERY BOY */}
        <select
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setSelectedBoy(
              deliveryBoys.find(b => b._id === e.target.value)
            )
          }
        >
          <option>Select Delivery Boy</option>

          {deliveryBoys
            .filter(b => b.status === "Available")
            .map((b) => (
              <option key={b._id} value={b._id}>
                {b.name} ({b.phone})
              </option>
            ))}
        </select>

        {/* ✅ SELECTED BOY CARD */}
        {selectedBoy && (
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">

            <img
              src={`http://localhost:8000${selectedBoy.image}`}
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold">{selectedBoy.name}</h2>
              <p className="text-sm text-gray-500">
                ⭐ {selectedBoy.rating || 4.5}
              </p>
              <p className="text-sm text-gray-500">
                📞 {selectedBoy.phone}
              </p>
            </div>

            <span className="ml-auto text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
              {selectedBoy.status}
            </span>
          </div>
        )}

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

        {/* ✅ DELIVERY COST UI */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex justify-between items-center">
          <p className="text-sm text-gray-600">Delivery Cost</p>
          <p className="text-xl font-bold text-blue-900">₹{total}</p>
        </div>

        {/* ✅ MAP BACK */}
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