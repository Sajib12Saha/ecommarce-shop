"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Minus, Plus, Search } from "lucide-react"
import RelatedProducts from "../_components/relatedProducts"

type Props = {
  params: Promise<{ productId: string }>
}

const ProductIdPage = ({ params }: Props) => {
  const { productId } = React.use(params) // unwrap params for Next.js 15+
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const productImages = ["/brown-rice-container.png", "/brown-rice-container.png"]

  const relatedProducts = [
    "/brown-rice-bowl.png",
    "/yellow-rice-bowl.png",
    "/white-rice-bowl.png",
    "/placeholder-tugdz.png",
    "/placeholder-n00h9.png",
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Product ID */}
      <div className="mb-4 p-2 bg-gray-100 rounded">
        <span className="text-sm text-gray-600">Product ID: {productId}</span>
      </div>

      {/* Product Images and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative bg-gray-50 rounded-lg p-4">
            <Image
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt="Product Image"
              width={400}
              height={400}
              className="w-full h-auto rounded-lg"
            />
            <Button size="icon" variant="ghost" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border-2 rounded-lg p-1 ${selectedImage === index ? "border-primary" : "border-gray-200"}`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  width={60}
                  height={60}
                  className="rounded"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">শাহজাদী কালোজিরার তেল (২ কেজি)</h1>
            <div className="text-3xl font-bold text-orange-500 mb-4">Tk 350</div>
            <p className="text-gray-600 leading-relaxed mb-4">
              শাহজাদী কালোজিরা তেলটি ১০০% খাঁটি প্রাকৃতিক তেল। কালোজিরা তেল অনেক উপকারী একটি তেল। আমাদের এই তেল ১০০% খাঁটি
              এবং প্রাকৃতিক পদ্ধতিতে তৈরি। এই তেলটি আপনার স্বাস্থ্যের জন্য অত্যন্ত উপকারী এবং নিরাপদ।
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            <Badge>Rice</Badge>
          </div>

          <div className="space-y-4">
            <div>
              <span className="font-semibold">QTY</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button>ADD TO CART</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md gap-4">
          <TabsTrigger value="description">
            Description
          </TabsTrigger>
          <TabsTrigger value="reviews">Reviews (0)</TabsTrigger>
          <TabsTrigger value="questions">Questions (0)</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card className="border-primary">
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p>
                  ই- শপিং এর মাধ্যমে আমাদের কাছে প্রাকৃতিক তেল পেতে পারবেন। আমাদের সকল তেল ১০০% খাঁটি এবং প্রাকৃতিক।
                  আমাদের তেলগুলো সম্পূর্ণ প্রাকৃতিক পদ্ধতিতে তৈরি করা হয় এবং কোন প্রকার রাসায়নিক ব্যবহার করা হয় না।
                </p>
                <p>
                  🔸 আমাদের কালোজিরা তেল ১০০% খাঁটি প্রাকৃতিক তেল এবং উৎকৃষ্ট মানের। এই তেলটি আপনার স্বাস্থ্যের জন্য অত্যন্ত
                  উপকারী এবং নিরাপদ। আমাদের পণ্যটি ব্যবহার করে আপনি নিশ্চিত থাকতে পারেন যে এটি সম্পূর্ণ প্রাকৃতিক এবং খাঁটি।
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500">No reviews yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500">No questions yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

export default ProductIdPage
