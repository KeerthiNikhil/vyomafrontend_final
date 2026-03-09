import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { deliveryBoysData } from "../data/deliveryBoysData";
import { useLocation } from "react-router-dom";

const deliveryBoys = deliveryBoysData;

const Delivery = () => {
  const [selectedBoy, setSelectedBoy] = useState<any>(null);
  const [km, setKm] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);

  const [latitude] = useState("12.9716");
  const [longitude] = useState("77.5946");

  const location = useLocation();
  const orderData: any = location.state || null;

  const total = km * rate;

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Delivery Assignment</h1>
        <p className="text-gray-500">
          Assign delivery partner, preview map and calculate delivery cost
        </p>
      </div>

      {/* ⭐ ORDER DETAILS FROM PENDING PAGE */}
      {orderData && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="font-medium">
            Assigning delivery for Order{" "}
            <span className="font-bold">{orderData.orderId}</span>
          </p>

          <p className="text-sm text-gray-500">
            Amount: ₹{orderData.amount} • Date: {orderData.date}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-6">

            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-sm text-gray-500">Distance</p>
              <h2 className="text-2xl font-bold">{km || 0} KM</h2>
            </div>

            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-sm text-gray-500">Rate per KM</p>
              <h2 className="text-2xl font-bold">₹{rate || 0}</h2>
            </div>

            <div className="bg-blue-900 text-white shadow rounded-xl p-6">
              <p className="text-sm text-blue-200">Total</p>
              <h2 className="text-3xl font-bold">₹{total}</h2>
            </div>

          </div>

          {/* Form */}
          <div className="bg-white shadow rounded-xl p-8 space-y-6">

            {/* Delivery Boy Select */}
            <div className="relative">
              <select
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 appearance-none"
                value={selectedBoy?.id || ""}
                onChange={(e) =>
                  setSelectedBoy(
                    deliveryBoys.find(
                      (boy) => boy.id === Number(e.target.value)
                    )
                  )
                }
              >
                <option value="">Select Delivery Boy</option>

                {deliveryBoys.map((boy) => (
                  <option key={boy.id} value={boy.id}>
                    {boy.name}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                ▼
              </div>
            </div>

            {/* Distance + Rate */}
            <div className="grid grid-cols-2 gap-6">
              <Input
                type="number"
                placeholder="Distance (KM)"
                onChange={(e) => setKm(Number(e.target.value))}
              />

              <Input
                type="number"
                placeholder="Rate per KM"
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border">
              <iframe
                width="100%"
                height="300"
                loading="lazy"
                src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
              />
            </div>

            {/* Assign Button */}
            <Button
              disabled={!selectedBoy || total <= 0}
              className="px-6 py-2 border-2 border-blue-900 text-blue-900 bg-white rounded-lg hover:bg-blue-50 hover:shadow-sm transition"
            >
              Assign Delivery
            </Button>

          </div>

        </div>

        {/* RIGHT SIDE DELIVERY BOY CARD */}
        <div>
          {selectedBoy && (
            <div className="bg-white shadow rounded-xl p-6 space-y-4">

              <div className="flex items-center gap-4">
                <img
                  src={selectedBoy.image}
                  alt="delivery boy"
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h2 className="text-lg font-bold">
                    {selectedBoy.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    ⭐ {selectedBoy.rating} Rating
                  </p>
                </div>
              </div>

              <div className="text-sm space-y-1">
                <p>
                  <strong>Phone:</strong> {selectedBoy.phone}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-600 font-medium">
                    {selectedBoy.status}
                  </span>
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p>
                  <strong>Total Earnings Today:</strong> ₹1200
                </p>

                <p>
                  <strong>Completed Deliveries:</strong> 8
                </p>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Delivery;