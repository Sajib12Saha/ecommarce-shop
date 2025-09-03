"use client";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { Skeleton } from "@/components/ui/skeleton";

import { useProducts } from "@/hooks/use-products";
import { dbProduct } from "@/types/type";

import {useState } from "react";

interface Props {
  sortBy?: "price" | "category" | "createdAt";
  sortOrder?: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
  categoryIds?: string[];
  productName?:string;
}

export const ProductsContent = ({
  sortBy,
  sortOrder,
  minPrice,
  maxPrice,
  categoryIds,
  productName
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: products, loading } = useProducts(
    currentPage,
    sortBy,
    sortOrder,
    productName,
    minPrice,
    maxPrice,
    categoryIds
  );

  return (
    <>
      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 w-full">
          {[...Array(8)].map((_, i) => (
      
             <div
              key={i}
              className="p-3 border rounded-xl  space-y-3"
            >
              {/* Image */}
              <Skeleton className="h-40 w-full rounded-lg" />
              {/* Title */}
              <Skeleton className="h-4 w-3/4" />
              {/* Price */}
              <Skeleton className="h-4 w-1/2" />
              {/* Button */}
              <Skeleton className="h-8 w-full rounded-lg" />
            </div>
   
          
          ))}
        </div>
      ) : products?.data && products?.data.length > 0 ? (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
            {products.data.map((product: dbProduct, index: number) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 pt-10">
            <Button
              variant={"outline"}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>

            <span className="text-sm text-muted-foreground font-medium">
              Page {currentPage} of {products.totalPages}
            </span>

            <Button
              variant={"outline"}
              disabled={currentPage >= products.totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 py-20 h-screen">
          No products found.
        </p>
      )}
    </>
  );
};
