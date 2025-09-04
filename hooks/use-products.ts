import { useQuery } from "@tanstack/react-query";
import { getProducts, ProductsResponse } from "@/actions/product";

interface UseProductsOptions {
  page?: number;
  sortBy?: "price" | "category" | "createdAt";
  sortOrder?: "asc" | "desc";
  productName?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryIds?: string[];
}

export const useProducts = (options: UseProductsOptions = {}) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", options], // cache key depends on filters
    queryFn: () =>
      getProducts(
        options.page,
        options.sortBy,
        options.sortOrder,
        options.productName,
        options.minPrice,
        options.maxPrice,
        options.categoryIds
      ),
    staleTime: 120 * 1000,     // 2 min: don’t refetch
    gcTime: 5 * 60 * 1000,     // v5: replaces cacheTime
    placeholderData: (prev) => prev, // replaces keepPreviousData
  });
};
