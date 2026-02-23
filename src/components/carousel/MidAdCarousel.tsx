import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import ad1 from "@/assets/images/banner1.jpg"
import ad2 from "@/assets/images/banner2.jpg.jpeg"
import ad3 from "@/assets/images/banner1.jpg"
import ad4 from "@/assets/images/banner3.jpg"

const carouselAds = [ad3, ad4]

const MidAdCarousel = () => {
  const autoplay = React.useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
    })
  )

  return (
    <section className="mt-2">
      <div className="max-w-7xl mx-auto space-y-3">

        {/* ⭐ TOP BANNERS */}
        <div className="grid grid-cols-2 gap-2">

          {[ad1, ad2].map((img, i) => (
            <div
              key={i}
              className="rounded-xl sm:rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Maintain banner ratio */}
              <div className="relative w-full aspect-[3/1] bg-gray-100">
                <img
                  src={img}
                  alt="Advertisement"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          ))}

        </div>

        {/* ⭐ FULL WIDTH CAROUSEL */}
        <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
          <Carousel
            opts={{ loop: true }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent>
              {carouselAds.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full aspect-[3/1] bg-gray-100">
                    <img
                      src={img}
                      alt="Advertisement"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

      </div>
    </section>
  )
}

export default MidAdCarousel
