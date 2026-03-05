import HeroCarousel from "@/components/carousel/HeroCarousel";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import FeaturedCategories from "@/components/categories/FeaturedCategories";
import TopShops from "@/components/shops/TopShops";
import NearbyShops from "@/components/shops/NearbyShops";
import HotSelling from "@/components/products/HotSelling";
import Recommended from "@/components/products/Recommended";
import MidAdCarousel from "@/components/carousel/MidAdCarousel";

const Home = () => {
  return (
    <>
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