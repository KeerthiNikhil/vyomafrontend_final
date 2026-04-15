import { useState,useEffect } from "react";
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

  useEffect(() => {
  const loginTime = localStorage.getItem("loginTime");

  if (loginTime) {
    const now = Date.now();
    const diff = now - Number(loginTime);

    const remainingTime = 15 * 60 * 1000 - diff;

    if (remainingTime <= 0) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      setTimeout(() => {
  localStorage.clear();
  window.location.href = "/login";
}, remainingTime);
    }
  }
}, []);

  const [notification, setNotification] = useState<{
    title: string;
    message: string;
    type?: "otp" | "success" | "error";
  } | null>(null);

  const validateInputs = () => {
  if (!name.trim()) {
  setNotification({
    title: "Error ❌",
    message: "Name required",
    type: "error",
  });
  return false;
}

if (!/^[6-9]\d{9}$/.test(phone)) {
  setNotification({
    title: "Error ❌",
    message: "Enter valid mobile number",
    type: "error",
  });
  return false;
}

  return true;
};

  // SEND OTP
  const sendOtp = async () => {
  if (!validateInputs()) return; // ✅ ADD THIS

  try {
    await axios.post("/auth/send-otp", {
      phone,
      name,
    });

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
    if (!/^\d{4,6}$/.test(otp)) {
  setNotification({
    title: "Invalid OTP ❌",
    message: "Enter valid OTP",
    type: "error",
  });
  return;
}

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
    localStorage.setItem("name", user.name);

    // ✅ STORE LOGIN TIME
    // ✅ STORE LOGIN TIME
localStorage.setItem("loginTime", Date.now().toString());


// ✅ AUTO REDIRECT AFTER 1.5s
setTimeout(() => {
  window.location.href = "/";
}, 1000);

  } catch {
    setNotification({
      title: "Invalid OTP ❌",
      message: "Please try again",
      type: "error",
    });
  }
};

  return (
  <div className="min-h-screen flex">

    {/* 🔥 LEFT SIDE (BRANDING) */}
    <div
      className="hidden md:flex w-1/2 bg-blue-900 text-white flex-col justify-center items-center px-12 relative"
      style={{
        backgroundImage: "url('/vyoma_market_image.jpg')", // put image in public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/80"></div>

      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-4xl font-bold">VYOMA</h1>

        <p className="text-lg">
          Discover and shop from your nearby local stores 🛍️
        </p>

        <p className="text-sm opacity-90">
          Vyoma is a marketplace connecting customers with local vendors —
          bringing small businesses online.
        </p>

        <div className="border border-white px-6 py-2 rounded-full inline-block">
          Support Local. Shop Smart.
        </div>
      </div>
    </div>

    {/* 🔥 RIGHT SIDE (LOGIN) */}
    <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
   
  {notification && notification.type !== "success" && (
  <NotificationCard
    {...notification}
    onClose={() => setNotification(null)}
  />
)}
    

      <div className="w-[350px] space-y-6">

        <h2 className="text-3xl font-bold text-center">
          Login / Signup
        </h2>

        {step === 1 ? (
          <>
            <Input
              className="border-2 focus:border-blue-900"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              className="border-2 focus:border-blue-900"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Button
              onClick={sendOtp}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white"
            >
              Continue
            </Button>
          </>
        ) : (
          <>
            <Input
              className="border-2 focus:border-blue-900"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button
              onClick={verifyOtp}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white"
            >
              Verify & Login
            </Button>
          </>
        )}

      </div>
    </div>
  </div>
);
};

export default Login;