import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ShopCarousel = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!images?.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative h-72 md:h-80 lg:h-[380px] rounded-xl overflow-hidden mb-8">

      {/* IMAGE */}
      <img
        src={images[current]}
        className="absolute inset-0 w-full h-full object-cover transition duration-700"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      {/* LEFT */}
      <button
        onClick={() =>
          setCurrent((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
          )
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-20"
      >
        <ChevronLeft size={18} />
      </button>

      {/* RIGHT */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev + 1) % images.length)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-20"
      >
        <ChevronRight size={18} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              current === i ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCarousel;