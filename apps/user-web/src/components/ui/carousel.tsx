import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1] | null

type CarouselProps = {
  opts?: Parameters<typeof useEmblaCarousel>[0]
  plugins?: Parameters<typeof useEmblaCarousel>[1]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

const CarouselContext = React.createContext<CarouselApi>(null)

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ opts, plugins, orientation = "horizontal", setApi, className, children }, ref) => {
  const [viewportRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  return (
    <CarouselContext.Provider value={api}>
      <div ref={ref} className={cn("relative", className)}>
        <div ref={viewportRef} className="overflow-hidden">
          {children}
        </div>
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex", className)} {...props} />
))
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
    {...props}
  />
))
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = () => {
  const api = React.useContext(CarouselContext)

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => api?.scrollPrev()}
      className="
        absolute left-6 top-1/2 -translate-y-1/2
        bg-transparent
        hover:bg-transparent
        text-white
      "
    >
      <ChevronLeft className="h-6 w-6" />
    </Button>
  )
}

const CarouselNext = () => {
  const api = React.useContext(CarouselContext)

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => api?.scrollNext()}
      className="
        absolute right-6 top-1/2 -translate-y-1/2
        bg-transparent
        hover:bg-transparent
        text-white
      "
    >
      <ChevronRight className="h-6 w-6" />
    </Button>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
