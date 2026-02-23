import ShopCard from "./ShopCard";

import shop1 from "@/assets/images/cafe.jpg";
import shop2 from "@/assets/images/coffee.jpg";
import shop3 from "@/assets/images/general.jpg";
import shop4 from "@/assets/images/hotel.jpg";

const shops = [
  { name: "Cafe", image: shop1 },
  { name: "Coffee shop", image: shop2 },
  { name: "Street Food", image: shop3 },
  { name: "Restaurant", image: shop4 },
  { name: "Cafe", image: shop1 },
  { name: "Coffee shop", image: shop2 },
];

const TopShops = () => {
  return (
    <section className="mt-6 mb-8">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl sm:text-2xl font-bold text-royal">
      Top Shops
    </h2>
  </div>

  {/* Scroll Row */}
 <div
  className="
    flex gap-5.5
    overflow-x-auto
    scrollbar-hide
    snap-x snap-mandatory
    scroll-smooth
    pb-2
    ml-1
  "
  style={{ WebkitOverflowScrolling: "touch" }}
>
  {shops.map((shop, index) => (
    <div
      key={index}
      className={`
        snap-start flex-shrink-0
        w-[130px] sm:w-[170px]
        ${index === 0 ? "ml-1" : ""}
        ${index === shops.length - 1 ? "mr-1" : ""}
      `}
    >
      <ShopCard name={shop.name} image={shop.image} />
    </div>
  ))}
</div>




</section>
  );
};

export default TopShops;
