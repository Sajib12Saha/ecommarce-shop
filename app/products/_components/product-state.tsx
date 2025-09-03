"use client";

import { useState } from "react";
import FilterSideBar from "./filter-sidebar";
import { ProductsContent } from "./products-content";
import { HeadingTitle } from "@/components/heading-title";

interface Props {
  productName?:string
}

export const ProductState = ({productName}:Props) => {
  // Sorting state
  const [sortBy, setSortBy] = useState<"price" | "category" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Price filter state
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  // Category filter state
  const [categoryIds, setCategoryIds] = useState<string[]>([]);

  return (
    <div className="flex gap-6 w-full">
      <FilterSideBar
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={(newSortBy, newSortOrder) => {
          setSortBy(newSortBy);
          setSortOrder(newSortOrder);
        }}
        onPriceChange={(min, max) => {
          setMinPrice(min);
          setMaxPrice(max);
        }}
        categoryIds={categoryIds}
        onCategoryChange={(ids) => setCategoryIds(ids)}
      />

      <div className="flex-1 min-h-screen py-10">
        <div className="space-y-8 px-4 lg:px-8">
          <HeadingTitle title="Browse Products" />
          <ProductsContent
            sortBy={sortBy}
            sortOrder={sortOrder}
            minPrice={minPrice}
            maxPrice={maxPrice}
            categoryIds={categoryIds}
            productName={productName}
          />
        </div>
      </div>
    </div>
  );
};
