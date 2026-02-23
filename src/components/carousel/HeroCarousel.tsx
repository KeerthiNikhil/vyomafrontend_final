import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import banner1 from "@/assets/images/banner1.jpg"
import banner2 from "@/assets/images/banner2.jpg.jpeg"

const banners = [banner1, banner2]

const HeroCarousel = () => {
  const autoplay = React.useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    })
  )

  return (
    <section className="max-w-7xl mx-auto mt-6 mb-2">
      
      <div className="rounded-2xl overflow-hidden shadow-lg">

        <Carousel
          opts={{ loop: true }}
          plugins={[autoplay.current]}
          onMouseEnter={() => autoplay.current.stop()}
          onMouseLeave={() => autoplay.current.reset()}
          className="w-full"
        >
          <CarouselContent>
            {banners.map((img, index) => (
              <CarouselItem key={index}>
                
                {/* ⭐ Aspect ratio preserves full image */}
                <div className="relative w-full aspect-[3/1] bg-gray-100">

                  <img
                    src={img}
                    alt={`Banner ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-contain"
                  />

                </div>

              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

      </div>
    </section>
  )
}

export default HeroCarousel
