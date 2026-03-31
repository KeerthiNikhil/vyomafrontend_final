import { useState } from "react";
import axios from "@/lib/axios";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NotificationCard from "@/components/NotificationCard";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/auth/register", form);

      setNotification({
        title: "Registration Successful 🎉",  
        message: "Your account has been created. Please login to continue.",
        onAction: () => navigate("/login"),
      });

    } catch (error: any) {
      if (error.response?.data?.message === "Phone already registered") {
        setNotification({
          title: "Account Exists ⚠️",
          message: "Please login instead",
          onAction: () => navigate("/login"),
        });
      } else {
        setNotification({
          title: "Registration Failed ❌",
          message: "Try again",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">

      {notification && (
        <NotificationCard
          {...notification}
          onClose={() => setNotification(null)}
        />
      )}

      <Card className="w-[400px] shadow-lg rounded-2xl">
        <CardContent className="p-6 space-y-5">

          <h2 className="text-2xl font-bold">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <Input
              name="phone"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  );
};

export default Register;