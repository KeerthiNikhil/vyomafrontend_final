import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("http://localhost:8000/api/v1/auth/register", {
        name: form.name,
        phone: form.phone,
      });

      alert("Registered successfully ✅");
      navigate("/login");
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <Card className="w-[400px] shadow-lg rounded-2xl">
        <CardContent className="p-6 space-y-5">

          <div>
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-sm text-muted-foreground">
              Join Vyoma and start exploring
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Input
              name="phone"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>

          </form>

          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  );
};

export default Register;