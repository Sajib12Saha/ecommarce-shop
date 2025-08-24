import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface RelatedProductsProps {
  products: string[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-6">Related Items</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-0">
              <Image
                src={product || "/placeholder.svg"}
                alt={`Related Product ${index + 1}`}
                width={150}
                height={150}
                className="w-full h-32 object-cover"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
