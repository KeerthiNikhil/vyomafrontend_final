import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type Props = {
  products: any[];
};

const RelatedProducts = ({ products }: Props) => {

  return (
    <div className="mt-16">

      <h2 className="text-xl font-semibold mb-6">
        You may also like
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={4}
      >
        {products.map((p) => (

          <SwiperSlide key={p._id}>

            <div className="border rounded-lg p-3 hover:shadow cursor-pointer">

              <img
                src={`http://localhost:8000${p.images[0]}`}
                className="h-48 object-cover w-full"
              />

              <p className="mt-2 text-sm font-medium">
                {p.name}
              </p>

              <p className="font-semibold">
                ₹{p.finalPrice}
              </p>

            </div>

          </SwiperSlide>

        ))}
      </Swiper>

    </div>
  );
};

export default RelatedProducts;