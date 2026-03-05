import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const ShopCreate = () => {
  const [step, setStep] = useState(1);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [gstNumber, setGstNumber] = useState("");
  const [udyamNumber, setUdyamNumber] = useState("");
  const [tradeLicenseNumber, setTradeLicenseNumber] = useState("");
  const [fssaiNumber, setFssaiNumber] = useState("");

  const [shopImage, setShopImage] = useState<File | null>(null);

  useEffect(() => {
    if (businessType !== "Food & Beverages") {
      setFssaiNumber("");
    }
  }, [businessType]);

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    setIsFetching(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
        setIsFetching(false);
        toast.success("Location detected successfully ✅");
      },
      () => {
        toast.error("Unable to retrieve location");
        setIsFetching(false);
      }
    );
  };

  const handleSubmit = async () => {
    if (!shopImage) {
      toast.error("Please upload shop image");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("shopName", shopName);
      formData.append("ownerName", ownerName);
      formData.append("businessType", businessType);
      formData.append("description", description);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("gstNumber", gstNumber);
      formData.append("udyamNumber", udyamNumber);
      formData.append("fssaiNumber", fssaiNumber);
      formData.append("tradeLicenseNumber", tradeLicenseNumber);
      formData.append("shopImage", shopImage);

      await axios.post(
        "http://localhost:8000/api/v1/shops/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Shop created successfully 🎉");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderBlueInfo = () => {
    if (step === 1)
      return (
        <>
          <h1 className="text-3xl font-bold mb-4">Build Your Shop 🚀</h1>
          <p className="text-blue-100">
            Enter your business details to start selling products.
          </p>
        </>
      );

    if (step === 2)
      return (
        <>
          <h1 className="text-3xl font-bold mb-4">Set Your Location 📍</h1>
          <p className="text-blue-100">
            Help customers find your shop easily.
          </p>
        </>
      );

    return (
      <>
        <h1 className="text-3xl font-bold mb-4">Verification Details 📄</h1>
        <p className="text-blue-100">
          Add legal information to complete shop setup.
        </p>
      </>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">

      {/* LEFT INFO PANEL */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center p-10">
        <div className="max-w-md">{renderBlueInfo()}</div>
      </div>

      {/* FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 min-h-[620px] flex flex-col justify-between">

          <div className="space-y-5">

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <Input
                  placeholder="Shop Name"
                  value={shopName}
                  onChange={(e)=>setShopName(e.target.value)}
                />

                <Input
                  placeholder="Owner Name"
                  value={ownerName}
                  onChange={(e)=>setOwnerName(e.target.value)}
                />

                <select
                  value={businessType}
                  onChange={(e)=>setBusinessType(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select Business Type</option>
                  <option>Food & Beverages</option>
                  <option>Clothing</option>
                  <option>Electronics</option>
                  <option>Pharmacy</option>
                  <option>Beauty & Personal Care</option>
                  <option>Grocery</option>
                  <option>Home Appliances</option>
                  <option>Sports & Fitness</option>
                  <option>Books</option>
                  <option>Toys</option>
                </select>

                <Textarea
                  placeholder="Business Description"
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                />

                <Input
                  type="email"
                  placeholder="Business Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />

                <Input
                  placeholder="Shop Contact Number"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                />
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <Textarea
                  placeholder="Shop Address"
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
                />

                <button
                  onClick={handleFetchLocation}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md flex items-center gap-2"
                >
                  <MapPin size={16}/> Detect Location
                </button>

                <Input value={latitude} readOnly placeholder="Latitude"/>
                <Input value={longitude} readOnly placeholder="Longitude"/>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e)=> e.target.files && setShopImage(e.target.files[0])}
                />
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <Input
                  placeholder="GST Number (Optional)"
                  value={gstNumber}
                  onChange={(e)=>setGstNumber(e.target.value)}
                />

                <Input
                  placeholder="Udyam Number"
                  value={udyamNumber}
                  onChange={(e)=>setUdyamNumber(e.target.value)}
                />

                <Input
                  placeholder="FSSAI Number"
                  value={fssaiNumber}
                  onChange={(e)=>setFssaiNumber(e.target.value)}
                  disabled={businessType !== "Food & Beverages"}
                  className={businessType !== "Food & Beverages" ? "bg-gray-100 cursor-not-allowed" : ""}
                />

                <Input
                  placeholder="Trade License Number"
                  value={tradeLicenseNumber}
                  onChange={(e)=>setTradeLicenseNumber(e.target.value)}
                />
              </>
            )}

          </div>

          {/* BUTTONS */}
          <div className="flex justify-between mt-6">

            {step > 1 && (
              <button
                onClick={()=>setStep(step-1)}
                className="px-4 py-2 border rounded-md"
              >
                ← Back
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={()=>setStep(step+1)}
                className="ml-auto px-6 py-2 bg-blue-700 text-white rounded-md"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="ml-auto px-6 py-2 bg-blue-700 text-white rounded-md"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default ShopCreate;