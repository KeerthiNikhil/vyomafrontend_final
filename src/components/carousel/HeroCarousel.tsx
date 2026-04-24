import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import banner4 from "@/assets/images/banner4_fruits.jpeg"
import banner2 from "@/assets/images/banner2.jpeg"
import banner3 from "@/assets/images/banner3.jpg" 
import banner1 from "@/assets/images/banner1.jpg"
import banner5 from "@/assets/images/banner5_Furnitures.jpeg"
import banner6 from "@/assets/images/banner6_Food.jpeg"
import banner7 from "@/assets/images/banner7_Electronics.jpeg"
import banner8 from "@/assets/images/banner8_Clothing.jpeg"

const banners = [banner4, banner5,banner6,banner7,banner8,banner1,banner2,banner3,]

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
                <div className="w-full h-[340px] md:h-[380px]">

                  <img
                    src={img}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover"                  />
                    loading="lazy"
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