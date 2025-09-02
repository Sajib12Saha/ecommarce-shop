import { getProducts, ProductsResponse } from "@/actions/product";
import { useEffect, useState } from "react";

/* ✅ Custom hook with loading state and full filters */
export function useProducts(
  page?: number,
  sortBy?: "price" | "category" | "createdAt",
  sortOrder?: "asc" | "desc",
  productName?: string,
  minPrice?: number,
  maxPrice?: number,
  categoryIds?: string[]
) {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProducts(page, sortBy, sortOrder, productName, minPrice, maxPrice, categoryIds)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, sortBy, sortOrder, productName, minPrice, maxPrice, categoryIds]);

  return { data, loading, error };
}
