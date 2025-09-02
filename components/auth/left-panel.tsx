"use client"

import { Badge } from "@/components/ui/badge"
import { Star, Shield, Truck, Heart, Sparkles } from "lucide-react"


const trustSignals = [
  {
    icon: Shield,
    title: 'Secure Shopping',
    description: '256-bit SSL encryption protects your data',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $50 worldwide',
  },
  {
    icon: Heart,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy',
  },
];

const stats = [
  {
    value: '50K+',
    label: 'Happy Customers',
  },
  {
    value: '10K+',
    label: 'Products',
  },
  {
    value: '4.9',
    label: 'Rating',
    icon: Star,
  },
];

const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports'];

export function EcommerceLeftPanel() {
  return (
    <div className="hidden md:flex md:w-1/3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-yellow-500 " />
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/10  to-yellow-400/60" />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />

      <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-3xl rotate-12 backdrop-blur-sm border border-white/20" />
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-white/5 rounded-full backdrop-blur-sm border border-white/10" />
      <div className="absolute top-1/2 right-12 w-16 h-16 bg-white/15 rounded-2xl -rotate-12 backdrop-blur-sm border border-white/20" />

      <div className="relative z-10 flex flex-col justify-center px-4 xl:px-8 py-16 text-white">
        <div className="mb-8">   
        </div>

      </div>
    </div>
  )
}
