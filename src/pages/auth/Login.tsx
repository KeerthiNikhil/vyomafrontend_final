import { useState } from "react";
import axios from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NotificationCard from "@/components/NotificationCard";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const [notification, setNotification] = useState<{
    title: string;
    message: string;
    type?: "otp" | "success" | "error";
  } | null>(null);

  // SEND OTP
  const sendOtp = async () => {
    try {
      await axios.post("/auth/send-otp", { phone, name,type: "user",});

      setNotification({
        title: "OTP Sent 📩",
        message: "Enter OTP to continue",
        type: "otp",
      });

      setStep(2);
    } catch {
      setNotification({
        title: "Error ❌",
        message: "Failed to send OTP",
        type: "error",
      });
    }
  };

  // VERIFY OTP
  const verifyOtp = async () => {
  try {
    const res = await axios.post("/auth/verify-otp", {
      phone,
      otp,
      name,
      type: "user",
    });

    const token = res.data.token;
    const user = res.data.user;

    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);

    // ✅ ONLY show popup (NO redirect here)
    setNotification({
      title: "Welcome 🎉",
      message: "Login successful",
      type: "success",
    });

  } catch {
    setNotification({
      title: "Invalid OTP ❌",
      message: "Please try again",
      type: "error",
    });
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen">

      {/* Notification */}
      {notification && (
        <NotificationCard
          {...notification}
          type={notification.type}
          onClose={() => setNotification(null)}
          onAction={
            notification.type === "success"
              ? () => {
                  window.location.href = "http://localhost:5173";
                }
              : undefined
          }
        />
      )}

      <Card className="w-[400px]">
        <CardContent className="p-6 space-y-4">

          <h2 className="text-2xl font-bold">Login / Signup</h2>

          {step === 1 ? (
            <>
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Button onClick={sendOtp} className="w-full">
                Continue
              </Button>
            </>
          ) : (
            <>
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button onClick={verifyOtp} className="w-full">
                Verify & Login
              </Button>
            </>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default Login;