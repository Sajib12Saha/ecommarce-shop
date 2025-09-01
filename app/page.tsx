
import { BestSelling } from "@/components/sections/best-selling-products"
import { HeroSection } from "@/components/sections/hero-section"
import { NewProducts } from "@/components/sections/new-products"
import { PromotionalBanners } from "@/components/sections/promotional-banners"
import { TopCategories } from "@/components/sections/top-categories"


export default async function  HomePage () {
 

  return (
    <div className="min-h-screen">
      <HeroSection/>
      <NewProducts/>
      <TopCategories/>
      <PromotionalBanners />
      <BestSelling/>
    </div>
  )
}
