import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/auth/send-otp", { phone });
      await Swal.fire({
  icon: "success",
  title: "OTP Sent",
  text: "Check backend console",
});

setStep(2);
    } catch {
  Swal.fire({
    icon: "error",
    title: "Failed to send OTP",
  });
}
  };

  const verifyOtp = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/auth/verify-otp",
      { phone, otp }
    );

    const token = res.data.token;
    const user = res.data.user;

    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("name", user.name);

    // SUCCESS POPUP
    await Swal.fire({
      icon: "success",
      title: "Login Successful 🎉",
      timer: 1500,
      showConfirmButton: false,
    });

    // ROLE BASED REDIRECT
    if (user.role === "vendor") {
      window.location.href = "http://localhost:5174";
    } 
    else if (user.role === "admin") {
      window.location.href = "http://localhost:3000";
    } 
    else {
      window.location.href = "http://localhost:5173";
    }

  } catch {
    Swal.fire({
      icon: "error",
      title: "Invalid OTP",
    });
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">Login</h2>

          {step === 1 ? (
            <>
              <Input
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button onClick={sendOtp} className="w-full">
                Send OTP
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
                Verify OTP
              </Button>
            </>
          )}

          <p className="text-sm text-muted-foreground">
            New to Vyoma?{" "}
            <Link to="/register" className="text-blue-600">
              Create account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;