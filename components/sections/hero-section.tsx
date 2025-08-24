"use client"

import { useRef, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const heroContent = [
    {
      image: "/products/rice.png",
      alt: "Fresh Papaya",
      title: "পাহাড় রেড লোড পেঁপে",
      description:
        "পাহাড়ি লোড পেঁপের প্রাকৃতিক পুষ্টি এবং স্বাদ উপভোগ করুন। প্রতিদিনের সুস্থ খাবারের জন্য এটি উপযুক্ত এবং পুষ্টিগুণে ভরপুর।",
      link: "/products/rice",
    },
    {
      image: "/products/mango.png",
      alt: "Fresh Mango",
      title: "সুস্বাদু পাহাড়ি আম",
      description:
        "মিষ্টি আর রসালো পাহাড়ি আম খেয়ে সতেজ হোন। এটি গ্রীষ্মের শ্রেষ্ঠ ফল।",
      link: "/products/mango",
    },
  ]

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="bg-gradient-to-r from-orange-100 to-blue-100 py-2">
      <div className="px-4">
        <Carousel className="w-full" plugins={[plugin.current]}>
          <CarouselContent>
            {heroContent.map((item, index) => (
              <CarouselItem
                key={index}
                className="flex items-center justify-between gap-2 lg:gap-8"
              >
                <div className="flex-1 flex justify-center">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={400}
                    height={200}
                    priority
                    className="w-full max-w-md h-auto object-contain drop-shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center px-2 lg:text-left">
                  <h2
                    className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight"
                    style={{ fontFamily: "serif" }}
                  >
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mb-6 max-w-xl mx-auto lg:mx-0 text-sm lg:text-base">
                    {item.description}
                  </p>
                  <Link href={item.link}>
                    <Button className="px-4 py-1.5 lg:px-8 lg:py-3 font-semibold shadow-md hover:scale-105 transition-transform">
                      SHOP NOW
                    </Button>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {heroContent.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`size-2 lg:size-3 rounded-full transition-colors ${
                  activeIndex === i ? "bg-primary" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  )
}
