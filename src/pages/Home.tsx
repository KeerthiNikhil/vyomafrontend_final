import HeroCarousel from "@/components/carousel/HeroCarousel";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import TopShops from "@/components/shops/TopShops";
import NearbyShops from "@/components/shops/NearbyShops";
import FeaturedCategories from "@/components/categories/FeaturedCategories";
import HotSelling from "@/components/products/HotSelling";
import Recommended from "@/components/products/Recommended";
import AdCarousel from "@/components/carousel/AdCarousel";
import QuickExplore from "@/components/home/QuickExplore";
import MidAdCarousel from "@/components/carousel/MidAdCarousel"


const Home = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="space-y-16">
      <HeroCarousel />
      <ServiceHighlights />
      <TopShops />
      <NearbyShops />
      <AdCarousel />
      <FeaturedCategories />
      <HotSelling />
      <MidAdCarousel />
      <Recommended />
       <QuickExplore />
    </div>
    </section>
  );
};

export default Home;
