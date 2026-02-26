import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const [shopName, setShopName] = useState("Vyoma Store");
  const [email, setEmail] = useState("vendor@gmail.com");
  const [phone, setPhone] = useState("9876543210");
  const [address, setAddress] = useState("Mangalore, Karnataka");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUpdated(true);
      setTimeout(() => setUpdated(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Profile Settings
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your shop account information
        </p>
      </div>

      {/* Profile Summary */}
      <Card>
        <CardContent className="p-6 flex items-center gap-6">
          <div className="h-16 w-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-xl font-bold">
            V
          </div>
          <div>
            <h2 className="text-lg font-semibold">{shopName}</h2>
            <p className="text-sm text-gray-500">{email}</p>
            <p className="text-sm text-gray-500">{phone}</p>
          </div>
        </CardContent>
      </Card>

      {/* Editable Form */}
      <Card>
        <CardContent className="p-6 space-y-6">

          <div>
            <label className="text-sm text-gray-500">Shop Name</label>
            <Input
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Address</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">New Password</label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800"
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>

          {updated && (
            <p className="text-green-600 text-sm text-center">
              Profile updated successfully ✅
            </p>
          )}

        </CardContent>
      </Card>

    </div>
  );
};

export default Profile;