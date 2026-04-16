import { useState,useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState<any>({});

  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/vendor/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProfile(res.data.data);

    } catch (err) {
      console.log("PROFILE ERROR:", err);
    }
  };

  fetchProfile();
}, []);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Profile Settings
        </h1>
        <p className="text-gray-500">
          Manage your shop account information
        </p>
      </div>

     {/* PROFILE OVERVIEW */}
<Card>
  <CardContent className="p-6 flex items-center justify-between">

    {/* LEFT SIDE */}
    <div className="flex items-center gap-5">

      {/* Avatar */}
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full flex items-center justify-center text-2xl font-semibold shadow-md">
          V
        </div>

        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
      </div>

      {/* Store Info */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">
         {profile.name || "Loading..."} 
        </h2>

      <p className="text-sm text-gray-500">
  {profile.email || "Loading..."}
</p>

        <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
          Active Account
        </span>
      </div>

    </div>

    {/* RIGHT SIDE BUTTON */}
    <div>
      <Button
        variant="outline"
        size="sm"
        className="px-4"
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? "Cancel" : "Edit Profile"}
      </Button>
    </div>

  </CardContent>
</Card>
      {/* ACCOUNT DETAILS */}
      <Card>
        <CardContent className="p-6 space-y-6">

          <h2 className="text-lg font-semibold">
            Account Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="text-sm text-gray-500">
                Shop Name
              </label>
              <Input
                value={profile.name || ""}
                disabled={!editMode}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Email
              </label>
              <Input
                value={profile.email || ""}
                disabled={!editMode}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Phone
              </label>
              <Input
                value={profile.phone || ""}
                disabled={!editMode}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Address
              </label>
              <Input
                value={profile.address || ""}
                disabled={!editMode}
                onChange={(e) =>
                  handleChange("address", e.target.value)
                }
              />
            </div>

          </div>

          {editMode && (
            <div className="flex justify-end">
              <Button className="bg-blue-900 hover:bg-blue-800">
                Save Changes
              </Button>
            </div>
          )}

        </CardContent>
      </Card>

      {/* STORE STATS */}
      <div className="grid md:grid-cols-3 gap-6">

        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500 text-sm">
              Total Products
            </p>
            <h2 className="text-2xl font-bold">
              48
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500 text-sm">
              Total Orders
            </p>
            <h2 className="text-2xl font-bold">
              326
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500 text-sm">
              Total Revenue
            </p>
            <h2 className="text-2xl font-bold text-green-600">
              ₹85,240
            </h2>
          </CardContent>
        </Card>

      </div>

      {/* SECURITY */}
      <Card>
        <CardContent className="p-6 space-y-4">

          <h2 className="text-lg font-semibold">
            Security Settings
          </h2>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">
                Change Password
              </p>
              <p className="text-sm text-gray-500">
                Update your account password regularly
              </p>
            </div>

            <Button variant="outline">
              Change
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            Last login: Today at 2:45 PM
          </div>

        </CardContent>
      </Card>

    </div>
  );
};

export default Profile;