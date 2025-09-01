import { CategoriesResponse, getCategories } from "@/actions/category";
import { useEffect, useState } from "react";

/* ✅ Custom hook for categories with loading + error state */
export function useCategories(page?: number) {
  const [data, setData] = useState<CategoriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getCategories(page)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  return { data, loading, error };
}
