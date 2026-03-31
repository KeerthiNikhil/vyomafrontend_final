import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import ad1 from "@/assets/images/banner1.jpg";
import ad2 from "@/assets/images/banner2.jpeg";
import ad3 from "@/assets/images/banner3.jpg";
import ad4 from "@/assets/images/banner4_fruits.jpeg";
import ad5 from "@/assets/images/banner5_Furnitures.jpeg";
import ad6 from "@/assets/images/banner6_Food.jpeg";
import ad7 from "@/assets/images/banner7_Electronics.jpeg";
import ad8 from "@/assets/images/banner8_Clothing.jpeg";

const ads = [ad1, ad2, ad3, ad4, ad5, ad6, ad7, ad8];

const createPlugin = (delay: number) =>
  Autoplay({
    delay,
    stopOnInteraction: false,
  });

const ImageCarousel = ({ delay }: { delay: number }) => {
  const plugin = React.useRef(createPlugin(delay));

  return (
    <Carousel opts={{ loop: true }} plugins={[plugin.current]}>
      <CarouselContent>
        {ads.map((img, i) => (
          <CarouselItem key={i}>
            <div className="relative w-full h-full">
              <img
                src={img}
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const MidAdCarousel = () => {
  return (
    <section className="my-10">
      <div className="max-w-7xl mx-auto space-y-2">

        {/* TOP */}
        <div className="grid grid-cols-2 gap-2">

          {/* IMAGE 1 */}
          <div className="rounded-xl overflow-hidden shadow-sm aspect-[3/1]">
            <ImageCarousel delay={3000} />
          </div>

          {/* IMAGE 2 (delayed) */}
          <div className="rounded-xl overflow-hidden shadow-sm aspect-[3/1]">
            <ImageCarousel delay={4000} />
          </div>

        </div>

        {/* BOTTOM IMAGE */}
        <div className="rounded-xl overflow-hidden shadow-sm aspect-[4/1]">
          <ImageCarousel delay={5000} />
        </div>

      </div>
    </section>
  );
};

export default MidAdCarousel;