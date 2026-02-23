import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Order {
  id: number;
  orderId: string;
  customer: string;
  total: number;
  date: string;
  address: string;
  payment: string;
  status: "Pending" | "Out for Delivery";
  deliveryBoy?: string;
}

const deliveryStaff = ["Ravi", "Imran", "Suresh"];

const PendingOrders = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderId: "#1026",
      customer: "Ananya Shetty",
      total: 850,
      date: "21 Mar 2025",
      address: "Bejai, Mangalore",
      payment: "UPI",
      status: "Pending",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedBoy, setSelectedBoy] = useState("");

  const assignDelivery = () => {
    if (!selectedOrder || !selectedBoy) return;

    setOrders(prev =>
      prev.map(order =>
        order.id === selectedOrder.id
          ? {
              ...order,
              deliveryBoy: selectedBoy,
              status: "Out for Delivery",
            }
          : order
      )
    );

    setSelectedOrder(null);
    setSelectedBoy("");
  };

  const markDelivered = (id: number) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Pending Orders</h1>

      {orders.map(order => (
        <Card key={order.id} className="rounded-2xl shadow-sm">
          <CardContent className="p-6 flex justify-between items-start">

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{order.orderId}</h3>
              <p className="text-sm text-muted-foreground">
                {order.customer} • {order.date}
              </p>
              <p className="text-sm">📍 {order.address}</p>
              <p className="text-sm">💳 {order.payment}</p>

              {order.deliveryBoy && (
                <p className="text-sm text-blue-600">
                  🚚 Assigned to: {order.deliveryBoy}
                </p>
              )}

              <p className="font-bold text-lg mt-2">
                ₹{order.total}
              </p>
            </div>

            <div className="flex flex-col gap-3 items-end">

              <Badge
                className={
                  order.status === "Pending"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-blue-100 text-blue-700"
                }
              >
                {order.status}
              </Badge>

              {order.status === "Pending" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedOrder(order)}
                >
                  Assign Delivery
                </Button>
              )}

              {order.status === "Out for Delivery" && (
                <Button
                  size="sm"
                  onClick={() => markDelivered(order.id)}
                >
                  Mark Delivered
                </Button>
              )}

            </div>

          </CardContent>
        </Card>
      ))}

      {/* Assign Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Delivery Boy</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">

            <Select onValueChange={setSelectedBoy}>
              <SelectTrigger>
                <SelectValue placeholder="Select Delivery Person" />
              </SelectTrigger>
              <SelectContent>
                {deliveryStaff.map((boy, index) => (
                  <SelectItem key={index} value={boy}>
                    {boy}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="w-full" onClick={assignDelivery}>
              Confirm Assignment
            </Button>

          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default PendingOrders;