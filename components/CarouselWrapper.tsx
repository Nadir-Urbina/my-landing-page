'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from '@/lib/utils'

// Re-export CarouselItem for convenience
export { CarouselItem }

interface CarouselWrapperProps {
  children: React.ReactNode
  autoplay?: boolean
  interval?: number
  showDots?: boolean
}

export function CarouselWrapper({
  children,
  autoplay = true,
  interval = 5000,
  showDots = false,
}: CarouselWrapperProps) {
  // Use the Carousel's own Embla instance rather than creating a second one —
  // a separate useEmblaCarousel() here would attach to the wrong element and
  // its scrollNext() would silently do nothing.
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap())
    setScrollSnaps(api.scrollSnapList())
    onSelect()

    api.on('select', onSelect)
    api.on('reInit', onSelect)
    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  useEffect(() => {
    if (!autoplay || !api || isPaused) return

    const intervalId = setInterval(() => api.scrollNext(), interval)
    return () => clearInterval(intervalId)
  }, [api, autoplay, interval, isPaused])

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api])

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Carousel opts={{ align: "start", loop: true }} setApi={setApi}>
        <CarouselContent className="-ml-6 items-stretch">
          {children}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Dots live outside <Carousel> so they don't offset the vertically
          centered prev/next arrows */}
      {showDots && scrollSnaps.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === selectedIndex
                  ? 'w-6 bg-blue-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
