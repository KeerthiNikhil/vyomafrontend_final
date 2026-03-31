import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

const VendorVerify = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
const type = new URLSearchParams(location.search).get("type");

  // 📩 SEND OTP
  const handleSendOtp = async () => {
    if (!phone) {
      toast.error("Enter mobile number");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/auth/send-otp", { phone });

      toast.success("OTP sent 📩");
      setStep("otp");
    } catch (err: any) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY + BECOME VENDOR
  const handleVerify = async () => {
  try {
    setLoading(true);

    const res = await axios.post("/auth/verify-otp", {
      phone,
      otp,
    });

    // 🔥 check if already vendor
    if (!res.data.isVendor) {
      await axios.put("/vendor/become-vendor");
      toast.success("🎉 You are now a vendor!");
    } else {
      toast.success("Welcome back vendor 👋");
    }

    navigate("/vendor/dashboard");

  } catch (err) {
    toast.error("Invalid OTP ❌");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-6">

          <h2 className="text-2xl font-bold text-center">
            Verify to Continue 🔐
          </h2>

          {/* STEP 1 → PHONE */}
          {step === "phone" && (
            <>
              <Input
                type="tel"
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full bg-blue-900 text-white"
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          )}

          {/* STEP 2 → OTP */}
          {step === "otp" && (
            <>
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button
                onClick={handleVerify}
                disabled={loading}
                className="w-full bg-green-600 text-white"
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </Button>
            </>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default VendorVerify;