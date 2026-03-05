import { useEffect, useState } from "react";
import axios from "axios";
import ShopCard from "./ShopCard";

interface Shop {
  _id: string;
  shopName: string;
  ownerName?: string;
  businessType: string;
  address: string;
  phone: string;
  shopImage?: string;
}

const NearbyShops = () => {

  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchShops = async () => {

      try {

        const res = await axios.get(
          "http://localhost:8000/api/v1/shops"
        );

        if (res.data.success) {
          setShops(res.data.data);
        }

      } catch (error) {
        console.error("Fetch shops error:", error);
      }

      setLoading(false);
    };

    fetchShops();

  }, []);

  return (
    <section className="pt-0 pb-8 bg-royal-light mb-4">

      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-xl sm:text-2xl font-bold mb-1">
          Shops Near You
        </h2>

        <p className="text-gray-500 text-xs sm:text-base mb-4">
          Trusted stores around Mangalore & Surathkal
        </p>

        {loading ? (
          <p className="text-gray-400">Loading shops...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

            {shops.map((shop) => (
              <ShopCard
                key={shop._id}
                shop={shop}
              />
            ))}

          </div>
        )}

      </div>

    </section>
  );
};

export default NearbyShops;