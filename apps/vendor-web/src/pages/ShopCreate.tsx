import { useState } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

const ShopCreate = () => {
  const [step, setStep] = useState(1);

  const totalSteps = 4;
  const progressPercentage = (step / totalSteps) * 100;

  // ================= STATE =================
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [ownerName, setOwnerName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [description, setDescription] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [gstNumber, setGstNumber] = useState("");
  const [yearsOfOperation, setYearsOfOperation] = useState("");
  const [shopLicenseNumber, setShopLicenseNumber] = useState("");
  const [udyamNumber, setUdyamNumber] = useState("");
  const [fssaiNumber, setFssaiNumber] = useState("");
  const [tradeLicenseNumber, setTradeLicenseNumber] = useState("");

  // ================= FETCH LOCATION =================
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
      },
      () => {
        toast.error("Unable to retrieve location");
        setIsFetching(false);
      }
    );
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (
      !ownerName ||
      !businessType ||
      !description ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !shopLicenseNumber ||
      !udyamNumber ||
      !fssaiNumber ||
      !tradeLicenseNumber
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!latitude || !longitude) {
      toast.error("Please detect your shop location");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "http://localhost:8000/api/v1/shops/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ownerName,
            businessType,
            description,
            email,
            password,
            phone,
            address,
            latitude,
            longitude,
            gstNumber,
            yearsOfOperation,
            shopLicenseNumber,
            udyamNumber,
            fssaiNumber,
            tradeLicenseNumber,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Shop created successfully 🎉");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-y-auto">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white items-center justify-center p-16">
        <div>
          <h1 className="text-4xl font-bold mb-6">
            Build Your Business 🚀
          </h1>
          <p className="text-lg text-blue-100">
            Start your digital journey and reach more local customers with Vyoma.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full lg:w-1/2 justify-center p-6">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-700 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-6">
            Step {step} of {totalSteps} — Shop Registration
          </h2>

          <div className="space-y-4">

            {step === 1 && (
              <>
                <Input placeholder="Owner Name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />

                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Business Type</option>
                  <option>Grocery Store</option>
                  <option>Food & Beverages</option>
                  <option>Pharmacy</option>
                  <option>Clothing Store</option>
                  <option>Electronics</option>
                  <option>Salon</option>
                  <option>Hardware Store</option>
                  <option>Other</option>
                </select>

                <Textarea placeholder="Business Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </>
            )}

            {step === 2 && (
              <>
                <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Textarea placeholder="Shop Address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </>
            )}

            {step === 3 && (
              <>
                <Input placeholder="GST Number (Optional)" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
                <Input placeholder="Years of Operation (Optional)" value={yearsOfOperation} onChange={(e) => setYearsOfOperation(e.target.value)} />
                <Input placeholder="Shop License Number" value={shopLicenseNumber} onChange={(e) => setShopLicenseNumber(e.target.value)} />
                <Input placeholder="Udyam Number" value={udyamNumber} onChange={(e) => setUdyamNumber(e.target.value)} />
                <Input placeholder="FSSAI Number" value={fssaiNumber} onChange={(e) => setFssaiNumber(e.target.value)} />
                <Input placeholder="Trade License Number" value={tradeLicenseNumber} onChange={(e) => setTradeLicenseNumber(e.target.value)} />
              </>
            )}

            {step === 4 && (
              <>
                <button
                  onClick={handleFetchLocation}
                  disabled={isFetching}
                  className="px-4 py-1.5 text-sm border border-blue-600 text-blue-600 rounded-md bg-white hover:bg-blue-50 transition flex items-center gap-2"
                >
                  <MapPin size={14} />
                  {isFetching ? "Detecting..." : "Detect Location"}
                </button>

                <Input value={latitude} readOnly placeholder="Latitude" />
                <Input value={longitude} readOnly placeholder="Longitude" />
              </>
            )}
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="flex justify-between mt-8">

            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition"
              >
                ← Back
              </button>
            )}

            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                className="ml-auto px-5 py-1.5 text-sm border border-blue-600 text-blue-600 rounded-md bg-white hover:bg-blue-50 transition"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="ml-auto px-5 py-1.5 text-sm bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
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