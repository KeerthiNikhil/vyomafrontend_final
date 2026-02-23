import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

const Recommended = () => {
  const groceryProducts = products.filter(
    (item) => item.category === "grocery"
  );

  return (
    <section className="py-1 ">
      <div className="max-w-7xl mx-auto px-0">

        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-1">

            Recommended For You
          </h2>

          <p className="text-gray-600">
            Personalized picks just for you 🚀
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">

          {groceryProducts.map((item) => (
           <ProductCard
  id={item.id}
  name={item.name}
  price={item.price}
  image={item.image}
  weight="200 g"
 
/>

          ))}
        </div>

      </div>
    </section>
  );
};

export default Recommended;
