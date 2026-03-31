import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import img1 from "@/assets/images/banner2.jpeg"
import img2 from "@/assets/images/banner1.jpg"
import img3 from "@/assets/images/banner3.jpg"
import img4 from "@/assets/images/banner4_fruits.jpeg"
import img5 from "@/assets/images/banner5_Furnitures.jpeg"
import img6 from "@/assets/images/banner6_Food.jpeg"
import img7 from "@/assets/images/banner7_Electronics.jpeg"
import img8 from "@/assets/images/banner8_Clothing.jpeg"

const ads = [img1, img2, img3,img4,img5,img6,img7,img8]

const AdCarousel = () => {
  const autoplay = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
    })
  )

  return (
    <section className="mb-8">
      <div className="max-w-7xl mx-auto px-4">

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
                  <div className="relative w-full h-[300px] bg-gray-100">

                    <img
                      src={img}
                      alt={`Advertisement ${index + 1}`}
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

export default AdCarousel