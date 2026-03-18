import HeroCarousel from "@/components/carousel/HeroCarousel";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import FeaturedCategories from "@/components/categories/FeaturedCategories";
import TopShops from "@/components/shops/TopShops";
import NearbyShops from "@/components/shops/NearbyShops";
import HotSelling from "@/components/products/HotSelling";
import Recommended from "@/components/products/Recommended";
import MidAdCarousel from "@/components/carousel/MidAdCarousel";
import axios from "@/lib/axios";
import Swal from "sweetalert2";

const becomeVendor = async () => {
  try {
    const res = await axios.put("/vendor/become-vendor");

    await Swal.fire({
      icon: "success",
      title: "Now you are a Vendor 🎉",
    });

    localStorage.setItem("token", res.data.token); // 🔥 IMPORTANT
localStorage.setItem("role", res.data.user.role);
    
    const token = res.data.token; // use fresh vendor token

window.location.href = `http://localhost:5174?token=${token}`;

  } catch {
    Swal.fire({
      icon: "error",
      title: "Failed to become vendor",
    });
  }
};
const Home = () => {
  return (
    <>
      <div className="p-4 text-right">
        <button
          onClick={becomeVendor}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Become a Vendor
        </button>
      </div>

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