"use client"

import { useRef, useState, useEffect } from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useBillboards } from "@/hooks/use-billboards"
import { Skeleton } from "@/components/ui/skeleton"

export const HeroSection = () => {
  const { data: billboards, loading, error } = useBillboards()
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  const [api, setApi] = useState<CarouselApi | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!api) return
    setActiveIndex(api.selectedScrollSnap())
    api.on("select", () => setActiveIndex(api.selectedScrollSnap()))
  }, [api])

  return (
    <section className="bg-gradient-to-r from-orange-100 to-blue-100 py-4">
      <div className="px-4">
    
        <Carousel className="w-full" plugins={[plugin.current]} setApi={setApi}>
          <CarouselContent>
            {loading
              ? // 🔹 Skeleton slide
                [...Array(1)].map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="flex flex-row items-center justify-between gap-6 lg:gap-12"
                  >
                    <div className="flex-1 flex justify-center">
                      <Skeleton className="w-full max-w-lg h-64 rounded-xl" />
                    </div>
                    <div className="flex-1 text-center px-2 lg:text-left space-y-4">
                      <Skeleton className="h-10 w-3/4 mx-auto lg:mx-0 rounded" />
                      <Skeleton className="h-4 w-full max-w-md mx-auto lg:mx-0 rounded" />
                      <Skeleton className="h-4 w-2/3 max-w-sm mx-auto lg:mx-0 rounded" />
                    </div>
                  </CarouselItem>
                ))
              : billboards?.data?.map((item, index) => (
                  <CarouselItem
                    key={item.id ?? index}
                    className="flex flex-row items-center justify-between gap-6 lg:gap-12"
                  >
                    {/* Image */}
                    <div className="flex-1 flex justify-center">
                      {item.billboardImage ? (
                        <Image
                          src={item.billboardImage}
                          alt={item.title}
                          width={500}
                          height={300}
                          priority
                          className="w-full max-w-lg h-auto object-contain drop-shadow-lg"
                        />
                      ) : (
                        <Skeleton className="w-full max-w-lg h-64 rounded-xl" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 text-center px-2 lg:text-left">
                      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 mb-6 max-w-xl mx-auto lg:mx-0 text-xs md:text-base">
                        {item.description}
                      </p>
                      {item.productLink && (
                        <Link href={item.productLink}>
                          <Button className="px-4 py-1.5 lg:px-8 lg:py-3 font-semibold shadow-md hover:scale-105 transition-transform">
                            SHOP NOW
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CarouselItem>
                ))}
          </CarouselContent>

          {/* Navigation Dots */}
          {!loading && billboards?.data && billboards?.data?.length > 0 && (
            <div className="flex justify-center mt-6 gap-2">
              {billboards.data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={`size-2 lg:size-3 rounded-full transition-colors ${
                    activeIndex === i ? "bg-primary" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </Carousel>
      </div>
    </section>
  )
}
