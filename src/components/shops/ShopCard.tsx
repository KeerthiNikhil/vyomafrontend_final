import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Shop {
  _id: string;
  shopName: string;
  ownerName?: string;
  businessType: string;
  address: string;
  phone: string;
  shopImage?: string;
}

interface ShopCardProps {
  shop: Shop;
  isLive?: boolean;
}

const ShopCard = ({ shop, isLive = false }: ShopCardProps) => {

  const navigate = useNavigate();

  const imageUrl = shop.shopImage
    ? shop.shopImage.startsWith("http")
      ? shop.shopImage
      : `http://localhost:8000${shop.shopImage}`
    : "https://via.placeholder.com/400x300?text=Shop";
   

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">

      {/* IMAGE */}
      <div className="relative h-44 w-full overflow-hidden">
  <img
    src={imageUrl}
    alt={shop.shopName}
    className="w-full h-full object-cover transition duration-300 hover:scale-105"
  />

  <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-medium shadow">
    {shop.businessType}
  </div>


        {/* LIVE badge */}
        {isLive && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            LIVE
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">

        {/* SHOP NAME */}
        <h3 className="text-sm sm:text-base font-semibold mb-1">
          {shop.shopName}
        </h3>

        {/* LOCATION */}
        <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          {shop.address}
        </div>

        {/* BOTTOM */}
        <div className="flex items-center justify-between">

          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
            ⭐ 4.5
          </span>

          <button
            onClick={() => navigate(`/shop/${shop._id}`)}
            className="bg-black text-white text-xs px-4 py-1.5 rounded-md hover:bg-gray-800 transition"
          >
            View
          </button>

        </div>

      </div>
    </div>
  );
};

export default ShopCard;