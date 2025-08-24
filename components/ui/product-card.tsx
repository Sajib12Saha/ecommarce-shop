'use client';

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  id: string // or slug: string
  image: string
  title: string
  weight: string
  price: string
  originalPrice?: string
  rating: number
  reviewCount: number
  discountBadge?: string
}

export function ProductCard({
  id,
  image,
  title,
  weight,
  price,
  originalPrice,
  rating,
  reviewCount,
  discountBadge,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="block">
      <Card className="relative shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
        <CardContent className="p-4">
          {/* Discount badge */}
          {discountBadge && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              {discountBadge}
            </div>
          )}

          {/* Product Image */}
          <div className="w-full h-40 mb-4 relative rounded-xl overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-contain"
            />
          </div>

          {/* Rating */}
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-2">({reviewCount})</span>
          </div>

          {/* Title & Weight */}
          <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
            {title}
          </h4>
          <p className="text-xs text-gray-500 mb-3">{weight}</p>

          {/* Price and Buy Button */}
          <div className="flex flex-col lg:flex-row gap-y-2 text-wrap lg:items-center lg:justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-base lg:text-lg font-bold text-gray-900">
                {price}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {originalPrice}
                </span>
              )}
            </div>
            <Button
              className="text-xs px-4 py-1 h-7 rounded-md"
              onClick={(e) => e.stopPropagation()}
            >
              BUY NOW
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )

  
}
