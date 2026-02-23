import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/auth/send-otp", { phone });
      setStep(2);
    } catch {
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/verify-otp",
        { phone, otp }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate("/");
    } catch {
      alert("Invalid OTP");
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