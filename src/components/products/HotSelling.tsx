import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

const HotSelling = () => {
  return (
    <section className="py-1 overflow-hidden">
      <div className="max-w-7xl mx-auto px-0">
        <h2 className="text-xl sm:text-2xl font-bold mb-1 pb-4">
          Hot Selling
        </h2>

        <div className="relative overflow-hidden">
          <div className="marquee flex">
            {[...products, ...products].map((item, index) => (
              <div key={index} className="mr-6 shrink-0">
                <ProductCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  weight={item.weight}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotSelling;