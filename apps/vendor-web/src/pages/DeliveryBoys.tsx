import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Phone, Mail, Trash2, Edit } from "lucide-react";
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

import { deliveryBoysData } from "../data/deliveryBoysData";

const DeliveryBoys = () => {
  const [deliveryBoys, setDeliveryBoys] = useState(deliveryBoysData);
  const [selectedBoy, setSelectedBoy] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  const [newBoy, setNewBoy] = useState({
    name: "",
    phone: "",
    email: "",
  });

  /* ================= ADD ================= */
  const handleAddBoy = () => {
    if (!newBoy.name || !newBoy.phone) return;

    const newEntry = {
      id: deliveryBoys.length + 1,
      name: newBoy.name,
      phone: newBoy.phone,
      email: newBoy.email,
      rating: 4.5,
      status: "Available",
      assignedOrders: 0,
      completedOrders: 0,
      pendingPayment: 0,
      totalEarnings: 0,
      attendance: 22,
      image: `https://i.pravatar.cc/150?img=${deliveryBoys.length + 20}`,
    };

    setDeliveryBoys([...deliveryBoys, newEntry]);
    setNewBoy({ name: "", phone: "", email: "" });
  };

  /* ================= DELETE ================= */
  const handleDelete = (id: number) => {
    setDeliveryBoys(deliveryBoys.filter((boy) => boy.id !== id));
    if (selectedBoy?.id === id) setSelectedBoy(null);
  };

  /* ================= UPDATE ================= */
  const handleUpdate = () => {
    setDeliveryBoys(
      deliveryBoys.map((boy) =>
        boy.id === selectedBoy.id ? selectedBoy : boy
      )
    );
    setEditMode(false);
  };

  /* ================= ATTENDANCE GENERATOR ================= */
  const generateAttendance = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      present: Math.random() > 0.2,
    }));
  };

  /* ================= SALARY CALCULATION ================= */
  const calculateSalary = (boy: any) => {
    const baseSalary = 8000;
    const perDelivery = 20;
    const attendanceBonus = 1000;

    const attendanceDays = boy.attendance || 22;
    const deliveryIncome = boy.completedOrders * perDelivery;
    const bonus = attendanceDays >= 25 ? attendanceBonus : 0;

    return baseSalary + deliveryIncome + bonus;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Delivery Boys</h1>
        <p className="text-gray-500">
          Manage performance, attendance, heatmap & salary
        </p>
      </div>

      {/* ADD DELIVERY BOY */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-lg">Add Delivery Boy</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <Input
            placeholder="Name"
            value={newBoy.name}
            onChange={(e) =>
              setNewBoy({ ...newBoy, name: e.target.value })
            }
          />
          <Input
            placeholder="Phone"
            value={newBoy.phone}
            onChange={(e) =>
              setNewBoy({ ...newBoy, phone: e.target.value })
            }
          />
          <Input
            placeholder="Email"
            value={newBoy.email}
            onChange={(e) =>
              setNewBoy({ ...newBoy, email: e.target.value })
            }
          />
        </div>

        <Button onClick={handleAddBoy} className="bg-blue-900 hover:bg-blue-800">
          Add Delivery Boy
        </Button>
      </div>

      {/* DELIVERY BOY CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {deliveryBoys.map((boy) => (
          <div
            key={boy.id}
            className="bg-white shadow rounded-xl p-6 space-y-4 hover:shadow-lg transition"
          >
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => setSelectedBoy(boy)}
            >
              <img
                src={boy.image}
                alt={boy.name}
                className="w-14 h-14 rounded-full"
              />
              <div>
                <h2 className="font-semibold">{boy.name}</h2>
                <p className="text-sm text-gray-500">
                  ⭐ {boy.rating}
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Phone size={14} /> {boy.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} /> {boy.email}
              </p>
            </div>

            <div className="flex justify-between pt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelectedBoy(boy);
                  setEditMode(true);
                }}
              >
                <Edit size={14} /> Edit
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
                onClick={() => handleDelete(boy.id)}
              >
                <Trash2 size={14} /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* PERFORMANCE SECTION */}
      {selectedBoy && (
        <div className="bg-white shadow rounded-xl p-8 space-y-10">

          <h2 className="text-xl font-semibold">
            {selectedBoy.name} - Performance Dashboard
          </h2>

          {/* EDIT MODE */}
          {editMode && (
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                value={selectedBoy.name}
                onChange={(e) =>
                  setSelectedBoy({ ...selectedBoy, name: e.target.value })
                }
              />
              <Input
                value={selectedBoy.phone}
                onChange={(e) =>
                  setSelectedBoy({ ...selectedBoy, phone: e.target.value })
                }
              />
              <Input
                value={selectedBoy.email}
                onChange={(e) =>
                  setSelectedBoy({ ...selectedBoy, email: e.target.value })
                }
              />
              <Button onClick={handleUpdate}>Save Changes</Button>
            </div>
          )}

          {/* DELIVERY STATS GRAPH */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { name: "Assigned", value: selectedBoy.assignedOrders },
                { name: "Completed", value: selectedBoy.completedOrders },
                { name: "Pending ₹", value: selectedBoy.pendingPayment },
              ]}
            >
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" fill="#1e3a8a" />
            </BarChart>
          </ResponsiveContainer>

          {/* RATING TREND */}
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={[
                { month: "Jan", rating: 4.2 },
                { month: "Feb", rating: 4.4 },
                { month: "Mar", rating: 4.5 },
                { month: "Apr", rating: 4.6 },
                { month: "May", rating: 4.7 },
                { month: "Jun", rating: selectedBoy.rating },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[3.5, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="rating" stroke="#1e3a8a" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>

          {/* ATTENDANCE CALENDAR */}
          <div>
            <h3 className="font-semibold mb-3">Attendance Calendar</h3>
            <div className="grid grid-cols-10 gap-2">
              {generateAttendance().map((day) => (
                <div
                  key={day.day}
                  className={`h-8 w-8 flex items-center justify-center text-xs rounded ${
                    day.present
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {day.day}
                </div>
              ))}
            </div>
          </div>

          {/* DELIVERY HEATMAP */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { area: "North", deliveries: 20 },
                { area: "South", deliveries: 35 },
                { area: "East", deliveries: 15 },
                { area: "West", deliveries: 28 },
              ]}
            >
              <XAxis dataKey="area" />
              <Tooltip />
              <Bar dataKey="deliveries" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>

          {/* SALARY SECTION */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="font-semibold mb-3">Salary Breakdown</h3>
            <p>Base Salary: ₹8000</p>
            <p>Delivery Incentive: ₹{selectedBoy.completedOrders * 20}</p>
            <p>Attendance Bonus: ₹1000 (if 25+ days)</p>
            <hr className="my-2" />
            <p className="font-bold text-lg">
              Total Salary: ₹{calculateSalary(selectedBoy)}
            </p>
          </div>

        </div>
      )}

    </div>
  );
};

export default DeliveryBoys;