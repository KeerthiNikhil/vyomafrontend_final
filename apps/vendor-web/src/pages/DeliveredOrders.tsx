import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: number;
  orderId: string;
  customer: string;
  total: number;
  date: string;
}

const DeliveredOrders = () => {
  const [orders] = useState<Order[]>([
    {
      id: 1,
      orderId: "#1024",
      customer: "Sneha Rao",
      total: 480,
      date: "19 Mar 2025",
    },
    {
      id: 2,
      orderId: "#1025",
      customer: "Rahul Kumar",
      total: 1250,
      date: "20 Mar 2025",
    },
  ]);

  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-2xl font-bold">Delivered Orders</h1>
        <p className="text-muted-foreground">
          Successfully completed orders
        </p>
      </div>

      <Card>
        <CardContent className="p-6">

          {orders.length === 0 ? (
            <p className="text-muted-foreground">
              No delivered orders yet.
            </p>
          ) : (
            <div className="space-y-4">

              {orders.map(order => (
                <div
                  key={order.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {order.orderId}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {order.customer} • {order.date}
                    </p>
                    <p className="font-semibold mt-1">
                      ₹{order.total}
                    </p>
                  </div>

                  <Badge className="bg-green-100 text-green-700">
                    Delivered
                  </Badge>
                </div>
              ))}

            </div>
          )}

        </CardContent>
      </Card>

    </div>
  );
};

export default DeliveredOrders;