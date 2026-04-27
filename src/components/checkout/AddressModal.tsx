import { useState } from "react";
import { X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

const AddressModal = ({
  open,
  onClose,
  onSaved,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    house: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.house ||
      !form.area ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      toast.error("Fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/address", form);

      toast.success("Address saved successfully ✅");

      onSaved();
      onClose();

      setForm({
        name: "",
        phone: "",
        house: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to save address ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div className="flex items-center gap-2">
            <MapPin size={20} />
            <h2 className="text-xl font-semibold">
              Add Delivery Address
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name *"
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number *"
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            name="house"
            value={form.house}
            onChange={handleChange}
            placeholder="House / Flat No *"
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 md:col-span-2"
          />

          <input
            name="area"
            value={form.area}
            onChange={handleChange}
            placeholder="Area / Street *"
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 md:col-span-2"
          />

          <input
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            placeholder="Landmark (optional)"
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 md:col-span-2"
          />

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City *"
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State *"
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Pincode *"
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 md:col-span-2"
          />

        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {loading ? "Saving..." : "Save Address"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;