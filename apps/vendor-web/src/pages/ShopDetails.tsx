import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Store, FileText } from "lucide-react";

const ShopDetails = () => {
  // Later this will come from API
  const shop = {
    name: "Vyoma Mart",
    owner: "Chinthan",
    type: "Grocery",
    phone: "9876543210",
    address: "Bejai, Mangalore",
    area: "Mangalore",
    status: "Active",
    gst: "29ABCDE1234F1Z5",
    description: "Your trusted local grocery store with fresh products daily.",
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{shop.name}</h1>
          <p className="text-muted-foreground">
            Manage your shop information
          </p>
        </div>

        <div className="flex gap-3">
          <Badge variant="secondary">{shop.status}</Badge>
          <Button>Edit Shop</Button>
        </div>
      </div>

      {/* Main Info Card */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 grid md:grid-cols-2 gap-6">

          <div className="space-y-4">
            <Info label="Owner" value={shop.owner} icon={<Store size={18} />} />
            <Info label="Business Type" value={shop.type} icon={<FileText size={18} />} />
            <Info label="Phone" value={shop.phone} icon={<Phone size={18} />} />
            <Info label="GST Number" value={shop.gst} icon={<FileText size={18} />} />
          </div>

          <div className="space-y-4">
            <Info label="Address" value={shop.address} icon={<MapPin size={18} />} />
            <Info label="Area" value={shop.area} icon={<MapPin size={18} />} />
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">
                {shop.description}
              </p>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Location Map (Simple iframe for now) */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Shop Location</h3>

          <div className="rounded-xl overflow-hidden h-64">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src={`https://maps.google.com/maps?q=Mangalore&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

const Info = ({ label, value, icon }: any) => (
  <div className="flex items-start gap-3">
    <div className="text-primary mt-1">{icon}</div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default ShopDetails;