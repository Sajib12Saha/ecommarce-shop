



import { HeroSection } from "@/components/sections/hero-section"

import { ProductGrid } from "@/components/sections/product-grid"
import { PromotionalBanners } from "@/components/sections/promotional-banners"

import { TopCategories } from "@/components/sections/top-categories"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ui/product-card"
import { bestSellingProducts, newProducts} from "@/data"

export default function HomePage() {
 


  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <TopCategories />

      <ProductGrid title="New Products" products={newProducts} backgroundColor="bg-gray-50" />

      <PromotionalBanners />


      {/* Best Selling Products with View All Button */}
    <div className="py-16 bg-white">
  <div>
    <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
      Best Selling
    </h3>

    {/* Responsive Grid */}
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
        mb-8
      "
    >
      {bestSellingProducts.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>

    {/* View All Button */}
    <div className="text-center">
      <Button
        variant="outline"
        className="px-8 py-2 text-foreground transition-colors"
      >
        View All
      </Button>
    </div>
  </div>
</div>
    </div>
  )
}
