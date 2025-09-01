import { getProducts, ProductsResponse } from "@/actions/product";
import { useEffect, useState } from "react";

/* ✅ Custom hooks with loading state */
export function useProducts(page?: number) {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProducts(page)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  return { data, loading, error };
}