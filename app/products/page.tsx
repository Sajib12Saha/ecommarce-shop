"use client";

import { HeadingTitle } from "@/components/heading-title";
import { ProductCard } from "@/components/ui/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/use-products";
import { dbProduct } from "@/types/type";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import FilterSideBar from "./_components/filter-sidebar";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const pageStr = searchParams.get("page");
  const currentPage = Number(pageStr) || 1;

  const { data: products, loading} = useProducts(currentPage);

  return (
      <div className="flex gap-x-2 w-full   px-4">
 <FilterSideBar/>
   <div className="min-h-screen flex-1  py-10">
      <div className="w-full space-y-8 px-4 lgpx-8">
       <HeadingTitle title="Browse Products" />
   
        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 lg:gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-60 w-full rounded-xl" />
            ))}
          </div>
        ) : products?.data && products?.data.length > 0 ? (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-2">
              {products.data.map((product: dbProduct, index: number) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 pt-10">
              <Link
                href={`?page=${currentPage - 1}`}
                className={`px-4 py-2 shadow rounded ${
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-primary transition"
                }`}
              >
                Previous
              </Link>

              <span className="text-sm text-muted-foreground font-medium">
                Page {currentPage} of {products.totalPages}
              </span>

              <Link
                href={`?page=${currentPage + 1}`}
                className={`px-4 py-2 shadow rounded ${
                  currentPage >= products.totalPages
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-primary transition"
                }`}
              >
                Next
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 py-20">
            No products found.
          </p>
        )}
      </div>
    </div>
      </div>
           
  
  );
};

export default ProductsPage;
