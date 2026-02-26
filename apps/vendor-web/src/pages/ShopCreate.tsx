import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

const ShopCreate = () => {
  const [step, setStep] = useState(1);

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
    } catch (err) {
      toast.error("Server error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const totalSteps = 4;
const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ===== LEFT BLUE PANEL ===== */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white items-center justify-center p-16">
        <div>
          <h1 className="text-4xl font-bold mb-6">
            Build Your Business 🚀
          </h1>
          <p className="text-lg text-blue-100">
            Start your digital journey and reach more local customers with Vyoma.
          </p>
        </div>
      </div>

      {/* ===== RIGHT FORM ===== */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">

          <h2 className="text-lg font-semibold mb-6">
            Step {step} of 4 — Shop Registration
          </h2>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <Input placeholder="Owner Name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
              <Input placeholder="Business Type" value={businessType} onChange={(e) => setBusinessType(e.target.value)} />
              <Textarea placeholder="Business Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <Button onClick={() => setStep(2)} className="w-full">Next →</Button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Textarea placeholder="Shop Address" value={address} onChange={(e) => setAddress(e.target.value)} />
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Next →</Button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <Input placeholder="GST Registration Number (Optional)" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
              <Input placeholder="Years of Operation (Optional)" value={yearsOfOperation} onChange={(e) => setYearsOfOperation(e.target.value)} />
              <Input placeholder="Shop & Establishment License Number" value={shopLicenseNumber} onChange={(e) => setShopLicenseNumber(e.target.value)} />
              <Input placeholder="Udyam Registration (MSME) Number" value={udyamNumber} onChange={(e) => setUdyamNumber(e.target.value)} />
              <Input placeholder="FSSAI License Number" value={fssaiNumber} onChange={(e) => setFssaiNumber(e.target.value)} />
              <Input placeholder="Trade License Number" value={tradeLicenseNumber} onChange={(e) => setTradeLicenseNumber(e.target.value)} />
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={() => setStep(4)}>Next →</Button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={handleFetchLocation}
                disabled={isFetching}
                className="flex items-center gap-2"
              >
                <MapPin size={16} />
                {isFetching ? "Detecting..." : "Detect My Location"}
              </Button>

              <Input value={latitude} readOnly placeholder="Latitude" />
              <Input value={longitude} readOnly placeholder="Longitude" />

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Shop"}
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ShopCreate;