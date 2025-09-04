"use client";

import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ui/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeadingTitle } from "../heading-title";

export function BestSelling() {
  const { data: products, isLoading, error } = useProducts({page:1});

  return (
    <div className="py-16">
      <div className="space-y-8">

        <HeadingTitle title="  Best Selling"/>
    

        {/* Loading State */}
        {isLoading ? (
          <div
            className="
             grid 
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-6
                gap-4 
                px-4 sm:px-8 lg:px-14
                mb-8"
          >
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-60 w-full rounded-xl" />
            ))}
          </div>
        ) : products?.data &&  products?.data?.length > 0 ? (
          <>
      
            <div
              className="
                grid 
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-6
                gap-4 
                px-4 sm:px-8 lg:px-14
                mb-8"
            >
              {products.data.slice(0, 8).map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>

            {/* View All Button */}
            {products.data.length > 8 && (
              <div className="text-center">
                <Link href="/products">
                  <Button
                    variant="outline"
                    className="px-8 py-2 text-foreground transition-colors"
                  >
                    View All
                  </Button>
                </Link>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600 py-10">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
