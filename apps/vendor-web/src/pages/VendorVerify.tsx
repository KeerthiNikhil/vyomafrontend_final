import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import NotificationCard from "../../../../src/components/NotificationCard";

const VendorVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timer, setTimer] = useState(0);

  const [notification, setNotification] = useState<any>(null);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [phone, setPhone] = useState(storedUser.phone || "");

  const isCreateFlow =
    location.state?.redirectTo === "/vendor/create-shop";

  // ✅ SEND OTP
  const handleSendOtp = async () => {
    if (!phone || phone.length !== 10) {
      setNotification({
        title: "Error ❌",
        message: "Enter valid 10-digit mobile number",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      await axios.post("/auth/send-otp", {
        phone,
        type: "vendor",
      });

      setNotification({
        title: "OTP Sent 📩",
        message: "Enter OTP to continue",
        type: "success",
      });

      setTimeout(() => {
  setNotification(null);
}, 1500);

      setStep("otp");
      setTimer(60);
    } catch (err: any) {
      setNotification({
        title: "Error ❌",
        message: err?.response?.data?.message || "Failed to send OTP",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
  if (timer === 0) return;

  const interval = setInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer]);

  // ✅ VERIFY OTP
  const handleVerify = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/auth/verify-otp", {
        phone,
        otp,
        type: "vendor",
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("🎉 You are now a vendor!");

      const redirectTo = location.state?.redirectTo;
      navigate(redirectTo || "/vendor/dashboard");

    } catch (err: any) {
      setNotification({
        title: "Invalid OTP ❌",
        message: err?.response?.data?.message || "Try again",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      {notification && (
        <NotificationCard
          {...notification}
          onClose={() => setNotification(null)}
        />
      )}

      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-6">

          <h2 className="text-2xl font-bold text-center">
            Vendor Verification 🔐
          </h2>

          {step === "phone" && (
            <>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
               disabled={!isCreateFlow && !!storedUser.phone}// 🔥 key logic
                placeholder="Enter mobile number"
              />

              <Button
  onClick={handleSendOtp}
  disabled={loading || timer > 0}
  className="w-full bg-blue-900 text-white"
>
  {timer > 0
    ? `Resend OTP in ${timer}s`
    : loading
    ? "Sending..."
    : "Send OTP"}
</Button>
            </>
          )}

          {step === "otp" && (
            <>
              <Input
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