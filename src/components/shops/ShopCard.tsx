import { MapPin, Phone } from "lucide-react";

interface Shop {
  _id: string;
  ownerName: string;
  businessType: string;
  address: string;
  phone: string;
  shopImage?: string;
}

interface ShopCardProps {
  shop?: Shop;
  isLive?: boolean;
}

const ShopCard = ({ shop, isLive = false }: ShopCardProps) => {
  // 🛡 Prevent crash if shop is undefined
  if (!shop) return null;

  const imageUrl = shop.shopImage
    ? `http://localhost:8000${shop.shopImage}`
    : "https://via.placeholder.com/400x300?text=Shop+Image";

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer">

      {/* IMAGE SECTION */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={shop.ownerName}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Business Type Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
          {shop.businessType}
        </div>

        {/* 🔥 LIVE Badge */}
        {isLive && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold animate-pulse shadow">
            LIVE
          </div>
        )}
      </div>

      {/* DETAILS SECTION */}
      <div className="p-5 space-y-2">

        <h2 className="text-lg font-bold text-gray-800">
          {shop.ownerName}
        </h2>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={14} />
          <span className="truncate">{shop.address}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Phone size={14} />
          {shop.phone}
        </div>

      </div>
    </div>
  );
};

export default ShopCard;