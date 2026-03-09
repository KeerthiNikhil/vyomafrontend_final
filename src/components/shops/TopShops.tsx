import { useEffect, useState } from "react";
import axios from "axios";
import ShopCard from "./ShopCard";

const TopShops = () => {

  const [shops, setShops] = useState<any[]>([]);

  useEffect(() => {

    const fetchShops = async () => {

      try {

        const res = await axios.get(
          "http://localhost:8000/api/v1/shops"
        );

        setShops(res.data.data);

      } catch (error) {
        console.log("Failed to load shops", error);
      }

    };

    fetchShops();

  }, []);

  return (

    <section className="py-10">

      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-2xl font-bold mb-6">
          Top Shops
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

          {shops.map((shop) => (

            <ShopCard
              key={shop._id}
              shop={shop}
            />

          ))}

        </div>

      </div>

    </section>

  );

};

export default TopShops;