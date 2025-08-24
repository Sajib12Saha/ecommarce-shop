import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "../ui/product-card"

interface ProductGridProps {

  title: string
  products: Array<{
    id:string;
    image: string
    title: string
    weight: string
    price: string
    originalPrice?: string
    rating: number
    reviewCount: number
    discountBadge?: string
  }>
  backgroundColor?: string
}

export function ProductGrid({ title, products, backgroundColor = "bg-gray-50" }: ProductGridProps) {
  return (
    <div className={`py-16 ${backgroundColor}`}>
      <div className="">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">{title}</h3>
        <div className="relative">
          {/* Navigation Arrows */}
          <button className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg">
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          {/* Products Grid */}
          <div
            className="
              grid 
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
              2xl:grid-cols-7
              gap-2 
              px-4 sm:px-8 lg:px-14
            "
          >
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
