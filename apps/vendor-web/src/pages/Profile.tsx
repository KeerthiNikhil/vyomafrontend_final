import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const [shopName, setShopName] = useState("Vyoma Store");
  const [email, setEmail] = useState("vendor@gmail.com");
  const [phone, setPhone] = useState("9876543210");
  const [address, setAddress] = useState("Mangalore, Karnataka");
  const [password, setPassword] = useState("");

  const handleUpdate = () => {
    toast.success("Profile updated successfully ✅");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Profile Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your shop account information
        </p>
      </div>

      {/* PROFILE CARD */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 flex items-center gap-6">

          {/* Avatar */}
          <div className="h-20 w-20 rounded-full bg-blue-700 text-white flex items-center justify-center text-2xl font-bold shadow">
            V
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">{shopName}</h2>
            <p className="text-gray-500 text-sm">{email}</p>
            <p className="text-gray-500 text-sm">{phone}</p>
          </div>

          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <Pencil size={14} />
            Edit
          </Button>

        </CardContent>
      </Card>

      {/* ACCOUNT DETAILS */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

          </div>

          {/* PASSWORD SECTION */}
          <div className="pt-6 border-t">
            <h3 className="font-semibold mb-4">Change Password</h3>
            <div className="flex gap-4">
              <Input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="flex justify-end pt-4">
            <Button className="bg-blue-700 hover:bg-blue-800">
              Save Changes
            </Button>
          </div>

        </CardContent>
      </Card>

    </div>
  );
};

export default Profile;