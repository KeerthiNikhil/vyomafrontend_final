import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Phone, Mail, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
} from "recharts";

const DeliveryBoys = () => {

  const [deliveryBoys, setDeliveryBoys] = useState<any[]>([]);
  const [selectedBoy, setSelectedBoy] = useState<any>(null);
  const [salary, setSalary] = useState<any>(null);

  const [image, setImage] = useState<File | null>(null);

  const [newBoy, setNewBoy] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const token = localStorage.getItem("token");

  /* ================= FETCH DELIVERY BOYS ================= */

  useEffect(() => {
    fetchDeliveryBoys();
  }, []);

  const fetchDeliveryBoys = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8000/api/v1/delivery-boys",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setDeliveryBoys(res.data.data);

    } catch {

      toast.error("Failed to load delivery boys");

    }

  };

  /* ================= FETCH SALARY ================= */

  const fetchSalary = async (boyId: string) => {

    try {

      const res = await axios.get(
        `http://localhost:8000/api/v1/delivery-boys/salary/${boyId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSalary(res.data);

    } catch {

      toast.error("Failed to fetch salary");

    }

  };

  /* ================= ADD DELIVERY BOY ================= */

  const handleAddBoy = async () => {

    if (!newBoy.name || !newBoy.phone) return;

    try {

      const formData = new FormData();

      formData.append("name", newBoy.name);
      formData.append("phone", newBoy.phone);
      formData.append("email", newBoy.email);

      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        "http://localhost:8000/api/v1/delivery-boys",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Delivery boy added");

      setNewBoy({
        name: "",
        phone: "",
        email: "",
      });

      setImage(null);

      fetchDeliveryBoys();

    } catch {

      toast.error("Failed to add delivery boy");

    }

  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {

    try {

      await axios.delete(
        `http://localhost:8000/api/v1/delivery-boys/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Deleted");

      fetchDeliveryBoys();

    } catch {

      toast.error("Delete failed");

    }

  };

  return (

    <div className="max-w-7xl mx-auto space-y-10">

      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold">Delivery Boys</h1>
        <p className="text-gray-500">
          Manage delivery team, attendance & earnings
        </p>
      </div>

      {/* ADD DELIVERY BOY */}

      <div className="bg-white shadow rounded-xl p-6 space-y-4">

        <h2 className="font-semibold text-lg">
          Add Delivery Boy
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <Input
            placeholder="Name"
            value={newBoy.name}
            onChange={(e)=>
              setNewBoy({...newBoy,name:e.target.value})
            }
          />

          <Input
            placeholder="Phone"
            value={newBoy.phone}
            onChange={(e)=>
              setNewBoy({...newBoy,phone:e.target.value})
            }
          />

          <Input
            placeholder="Email"
            value={newBoy.email}
            onChange={(e)=>
              setNewBoy({...newBoy,email:e.target.value})
            }
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e)=>setImage(e.target.files?.[0] || null)}
            className="border rounded-md px-3 py-2"
          />

        </div>

        <Button
          onClick={handleAddBoy}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          + Add Delivery Boy
        </Button>

      </div>

      {/* DELIVERY BOY CARDS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {deliveryBoys.map((boy)=>{

          const status = boy.status || "Available";

          return (

            <div
              key={boy._id}
              className="bg-white rounded-xl shadow p-5 space-y-4"
            >

              <div className="flex items-center gap-3">

                <img
                  src={`http://localhost:8000${boy.image}`}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>

                  <h2 className="font-semibold">
                    {boy.name}
                  </h2>

                  <p className="text-xs text-gray-500">
                    ⭐ {boy.rating || 4.5} Rating
                  </p>

                </div>

              </div>

              <div className="text-sm text-gray-600">

                <p className="flex gap-2 items-center">
                  <Phone size={14}/> {boy.phone}
                </p>

                <p className="flex gap-2 items-center">
                  <Mail size={14}/> {boy.email}
                </p>

              </div>

              <div className="flex justify-between items-center">

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {status}
                </span>

                <span className="text-xs text-gray-500">
                  Orders: {boy.completedOrders || 0}
                </span>

              </div>

              <div className="bg-gray-50 p-3 rounded-lg text-sm">

                <p>
                  Earnings Today: ₹{boy.earningsToday || 0}
                </p>

                <p>
                  Completed Deliveries: {boy.completedOrders || 0}
                </p>

              </div>

              <div className="flex justify-between">

                <button
                  className="text-blue-600 text-sm flex items-center gap-1"
                  onClick={()=>{
                    setSelectedBoy(boy);
                    fetchSalary(boy._id);
                  }}
                >
                  <Edit size={14}/> View
                </button>

                <button
                  className="text-red-600 text-sm flex items-center gap-1"
                  onClick={()=>handleDelete(boy._id)}
                >
                  <Trash2 size={14}/> Delete
                </button>

              </div>

            </div>

          )

        })}

      </div>

      {/* PERFORMANCE DASHBOARD */}

      {selectedBoy && (

        <div className="bg-white shadow rounded-xl p-8 space-y-8">

          <h2 className="text-xl font-semibold">
            {selectedBoy.name} Performance
          </h2>

          <ResponsiveContainer width="100%" height={250}>

            <BarChart
              data={[
                { name: "Assigned", value: selectedBoy.assignedOrders || 0 },
                { name: "Completed", value: selectedBoy.completedOrders || 0 },
                { name: "Pending", value: selectedBoy.pendingPayment || 0 },
              ]}
            >

              <XAxis dataKey="name"/>
              <Tooltip/>
              <Bar dataKey="value" fill="#2563eb"/>

            </BarChart>

          </ResponsiveContainer>

          {/* SALARY FROM BACKEND */}

          {salary && (

            <div className="bg-blue-50 p-6 rounded-xl">

              <h3 className="font-semibold mb-3">
                Salary Breakdown
              </h3>

              <p>Base Salary: ₹{salary.baseSalary}</p>

              <p>
                Delivery Incentive: ₹{salary.deliveryIncome}
              </p>

              <p>
                Attendance Bonus: ₹{salary.attendanceBonus}
              </p>

              <hr className="my-2"/>

              <p className="font-bold text-lg">
                Total Salary: ₹{salary.totalSalary}
              </p>

            </div>

          )}

        </div>

      )}

    </div>

  );

};

export default DeliveryBoys;