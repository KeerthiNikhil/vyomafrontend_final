import NearbyShopCard from "./NearbyShopCard";

// ✅ SHOP IMAGES
import shop1 from "@/assets/images/shops/shop1.jpg";
import shop2 from "@/assets/images/shops/shop2.jpg";
import shop3 from "@/assets/images/shops/shop3.jpg";
import shop4 from "@/assets/images/shops/shop4.jpg";
import shop5 from "@/assets/images/shops/shop5.jpg";
import shop6 from "@/assets/images/shops/shop6.jpg";

// ✅ SHOP DATA (later replace with API)
const shops = [
  {
    shopId: "sri-lakshmi",
    name: "Sri Lakshmi Stores",
    location: "Hampankatta, Mangalore",
    rating: 4.6,
    image: shop1,
  },
  {
    shopId: "apollo-pharmacy",
    name: "Apollo Pharmacy",
    location: "Bejai, Mangalore",
    rating: 4.7,
    image: shop2,
  },
  {
    shopId: "fresh-mart",
    name: "Fresh Mart",
    location: "Surathkal",
    rating: 4.5,
    image: shop3,
  },
  {
    shopId: "daily-needs",
    name: "Daily Needs",
    location: "Kankanady",
    rating: 4.4,
    image: shop4,
  },
  {
    shopId: "quick-buy",
    name: "Quick Buy",
    location: "Bendoor",
    rating: 4.6,
    image: shop5,
  },
    {
    shopId: "Super Market",
    name: "Quick Buy",
    location: "Balmata",
    rating: 5.0,
    image: shop6,
  },
];

const NearbyShops = () => {
  return (
    <section className="pt-0 pb-8 bg-royal-light mb-4">
      <div className="max-w-7xl mx-auto px-0">

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold mb-1">

          Shops Near You
        </h2>

        <p className="text-gray-500 text-xs sm:text-base mb-4">

          Trusted stores around Mangalore & Surathkal
        </p>

        {/* Shop Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {shops.map((shop) => (
            <NearbyShopCard
              key={shop.shopId}
              shopId={shop.shopId}
              name={shop.name}
              location={shop.location}
              rating={shop.rating}
              image={shop.image}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default NearbyShops;
