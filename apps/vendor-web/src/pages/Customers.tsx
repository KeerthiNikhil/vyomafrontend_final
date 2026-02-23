import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: number;
  active: boolean;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Ananya Shetty",
      email: "ananya@gmail.com",
      phone: "9876543210",
      orders: 12,
      spent: 5400,
      active: true,
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      phone: "9123456780",
      orders: 4,
      spent: 980,
      active: true,
    },
    {
      id: 3,
      name: "Sneha Rao",
      email: "sneha@gmail.com",
      phone: "9988776655",
      orders: 1,
      spent: 200,
      active: false,
    },
  ]);

  const [selected, setSelected] = useState<Customer | null>(null);
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: number) => {
    setCustomers(prev =>
      prev.map(c =>
        c.id === id ? { ...c, active: !c.active } : c
      )
    );
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Customer Details</h1>
        <p className="text-muted-foreground">
          Manage your store customers
        </p>
      </div>

      {/* Search */}
      <Input
        placeholder="Search customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {/* Customer Grid */}
      <div className="grid md:grid-cols-3 gap-6">

        {filteredCustomers.map(customer => (
          <Card key={customer.id} className="rounded-2xl shadow-sm hover:shadow-xl transition-all">
            <CardContent className="p-6 space-y-4">

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {customer.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {customer.email}
                  </p>
                </div>

                <Badge
                  className={
                    customer.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }
                >
                  {customer.active ? "Active" : "Blocked"}
                </Badge>
              </div>

              <div className="text-sm space-y-1">
                <p>📦 Orders: {customer.orders}</p>
                <p>💰 Total Spent: ₹{customer.spent}</p>
                <p>📞 {customer.phone}</p>
              </div>

              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelected(customer)}
                >
                  <Eye size={16} className="mr-1" />
                  View
                </Button>

                <Button
                  size="sm"
                  variant={customer.active ? "outline" : "default"}
                  onClick={() => toggleStatus(customer.id)}
                >
                  {customer.active ? "Block" : "Unblock"}
                </Button>
              </div>

            </CardContent>
          </Card>
        ))}

      </div>

      {/* View Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-3 mt-4">
              <p><strong>Name:</strong> {selected.name}</p>
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Phone:</strong> {selected.phone}</p>
              <p><strong>Total Orders:</strong> {selected.orders}</p>
              <p><strong>Total Spent:</strong> ₹{selected.spent}</p>
              <p>
                <strong>Status:</strong>{" "}
                {selected.active ? "Active" : "Blocked"}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Customers;