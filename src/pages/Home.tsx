import HeroCarousel from "@/components/carousel/HeroCarousel";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import FeaturedCategories from "@/components/categories/FeaturedCategories";
import TopShops from "@/components/shops/TopShops";
import NearbyShops from "@/components/shops/NearbyShops";
import HotSelling from "@/components/products/HotSelling";
import Recommended from "@/components/products/Recommended";
import MidAdCarousel from "@/components/carousel/MidAdCarousel";
import axios from "@/lib/axios";
import NotificationCard from "@/components/NotificationCard";
import { useState } from "react";
import VendorWarningModal from "@/components/VendorWarningModal";
import VendorSuccessModal from "@/components/VendorSuccessModal";
import { toast } from "sonner";
import VendorEntryModal from "@/components/VendorEntryModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
const [showWarning, setShowWarning] = useState(false);
const [showEntry, setShowEntry] = useState(false);


const handleAgree = () => {
  setShowWarning(false);
  setShowEntry(true);
}; 
const navigate = useNavigate();
  return (
    <>
      <div className="p-4 text-right">
        <button
          onClick={() => setShowWarning(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Become a Vendor
        </button>
      </div>

      {/* 🔥 WARNING MODAL */}
      <VendorWarningModal
  open={showWarning}
  onClose={() => setShowWarning(false)}
  onConfirm={handleAgree}
/>

      {/* 🔥 SUCCESS MODAL */}
      <VendorEntryModal
  open={showEntry}
  onClose={() => setShowEntry(false)}
/>

      <HeroCarousel />
      <ServiceHighlights />
      <FeaturedCategories />
      <TopShops />
      <MidAdCarousel />
      <NearbyShops />
      <HotSelling />
      <Recommended />
    </>
  );
};

export default Home;