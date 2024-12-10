'use client'

import { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Re-export CarouselItem for convenience
export { CarouselItem }

interface CarouselWrapperProps {
  children: React.ReactNode
  autoplay?: boolean
  interval?: number
}

export function CarouselWrapper({ children, autoplay = true, interval = 5000 }: CarouselWrapperProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (autoplay && emblaApi) {
      const intervalId = setInterval(() => {
        emblaApi.scrollNext()
      }, interval)

      return () => clearInterval(intervalId)
    }
  }, [emblaApi, autoplay, interval])

  return (
    <Carousel opts={{ align: "start", loop: true }} ref={emblaRef}>
      <CarouselContent className="-ml-1">
        {children}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
} 