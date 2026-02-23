import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import img1 from "@/assets/images/banner2.jpg.jpeg"
import img2 from "@/assets/images/banner1.jpg"
import img3 from "@/assets/images/banner3.jpg"

const ads = [img1, img2, img3]

const AdCarousel = () => {
  const autoplay = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
    })
  )

  return (
    <section className="mb-10">
      <div className="max-w-7xl mx-auto">

        <div className="rounded-2xl overflow-hidden shadow-lg">

          <Carousel
            opts={{ loop: true }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent>
              {ads.map((img, index) => (
                <CarouselItem key={index}>

                  {/* ⭐ Maintain 1200x400 ratio */}
                  <div className="relative w-full aspect-[3/1] bg-gray-100">

                    <img
                      src={img}
                      alt={`Advertisement ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-contain"
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

export default AdCarousel
