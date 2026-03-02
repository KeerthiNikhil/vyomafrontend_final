import { useEffect, useState } from "react";
import axios from "axios";

import HeroCarousel from "@/components/carousel/HeroCarousel";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import TopShops from "@/components/shops/TopShops";
import NearbyShops from "@/components/shops/NearbyShops";
import FeaturedCategories from "@/components/categories/FeaturedCategories";
import HotSelling from "@/components/products/HotSelling";
import Recommended from "@/components/products/Recommended";
import AdCarousel from "@/components/carousel/AdCarousel";
import QuickExplore from "@/components/home/QuickExplore";
import MidAdCarousel from "@/components/carousel/MidAdCarousel";

import ShopCard from "@/components/shops/ShopCard";

interface Shop {
  _id: string;
  ownerName: string;
  businessType: string;
  address: string;
  phone: string;
  shopImage?: string;
}

const Home = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/shops"
      );

      if (res.data.success) {
        setShops(res.data.data);
      }
    } catch (error) {
      console.error("Failed to load shops");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <HeroCarousel />

      {/* SERVICE HIGHLIGHTS */}
      <ServiceHighlights />

      {/* FEATURED STATIC CONTENT */}
      <div className="max-w-7xl mx-auto px-4">
        <TopShops />
        <QuickExplore />
        <FeaturedCategories />
        <AdCarousel />
        <HotSelling />
        <MidAdCarousel />
        <Recommended />
      </div>

      {/* 🔥 LIVE SHOPS SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-16">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            Live Shops Near You
          </h2>

          <span className="text-sm text-green-600 font-semibold">
            ● Updated in real-time
          </span>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading shops...</p>
        ) : shops.length === 0 ? (
          <p className="text-gray-500">No live shops available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {shops.map((shop) => (
              <ShopCard
                key={shop._id}
                shop={shop}
                isLive={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* NEARBY SECTION (If You Use It) */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <NearbyShops />
      </div>

    </div>
  );
};

export default Home;