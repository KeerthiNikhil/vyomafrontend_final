import FeaturedCategoryCard from "./FeaturedCategoryCard";

import spice from "@/assets/images/categories/spice.jpg";
import electronic from "@/assets/images/categories/electronic.jpg";
import pharmacy from "@/assets/images/categories/pharmacy.jpg";
import stationary from "@/assets/images/categories/stationary.jpg";
import local from "@/assets/images/categories/local.jpg";
import foods from "@/assets/images/categories/foods.jpg";

const FeaturedCategories = () => {
  return (
    <section className="pt-2 py-10 mb-0">
      <div className="max-w-7xl mx-auto px-0">

       <h2 className="text-xl sm:text-2xl font-bold mb-1 pb-4">

          Featured Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          <FeaturedCategoryCard
            title="Spices"
            subtitle="Chilli, Turmeric, Masala"
            image={spice}
            slug="spices"
          />

          <FeaturedCategoryCard
            title="Electronic Brands & Devices"
            subtitle="Phones, Laptops, TVs"
            image={electronic}
            slug="electronics"
          />

          <FeaturedCategoryCard
            title="Pharmacy Products"
            subtitle="Medicines & Healthcare"
            image={pharmacy}
            slug="pharmacy"
          />

          <FeaturedCategoryCard
            title="Stationary Products"
            subtitle="Pens, Books, Office items"
            image={stationary}
            slug="stationary"
          />

          <FeaturedCategoryCard
           title="General Stores"
           subtitle="Grains, Milks, Medit & More"
           image={local}
           slug="general"
           />

           <FeaturedCategoryCard
           title="Food and Beverages"
           subtitle="Meals, Staters, Juice & More"
           image={foods}
           slug="food"
           />

        </div>

      </div>
    </section>
  );
};

export default FeaturedCategories;
